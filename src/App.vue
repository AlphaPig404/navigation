<template>
  <div id="app" :class="{app_scroll:show_addCard}">
    <div id="left">
      <section class="title_wrapper">
        <v-title @searchInput="onSearch"></v-title>
        <section class="drop_wrapper">
          <v-dropDown :data="search_data" :showFlag="show_drop" @redirect="show_drop=false"></v-dropDown>
        </section>
      </section>
      <section class="nav_wrapper">
        <v-navMenu @onTap="onTap" @onTapFolder="onTapFolder" @edit="onEdit" :data="nav_data"></v-navMenu>
      </section>
      <v-footer class="footer_wrapper"></v-footer>
    </div>
    <div id="right">
      <v-content ref="content" @delete="deleteCard" @getGroupTops="storeTops" @add="onAddCard" :data="content_data"></v-content>
    </div>
    <div class="button_wrapper">
      <v-button :isTop="isTop" @onButton="onButton" :class="{button_scroll:show_addCard}"></v-button>
    </div>
    <v-modal :showFlag="show_modal" @onHide="hideModal">
      <v-comp :is="comp" @cancel="onCancelModal" @comfirm="onComfirmModal" :title="modal_title" :placeholder="modal_placeholder"></v-comp>
    </v-modal>
    <transition name="slide">
      <div class="addCard_wrapper" v-show="show_addCard">
        <v-addCard @close="closeAddCard" @add="commitCard" :group="group" :options="options"></v-addCard>
      </div>
    </transition>
  </div>
</template>

<script>

import navMenu from '@/components/navMenu'
import title from '@/components/title'
import content from '@/components/content'
import button from '@/components/button'
import modal from '@/components/modal'
import deleteModal from '@/components/deleteModal'
import addCard from '@/components/addCard'
import footer from '@/components/footer'
import mixin from '@/assets/js/mixin'
import editModal from '@/components/editModal'
import dropDown from '@/components/dropDown'

export default {
  name: 'app',
  mixins: [mixin],
  components: {
    'v-navMenu': navMenu,
    'v-title': title,
    'v-content': content,
    'v-button': button,
    'v-modal': modal,
    'v-footer': footer,
    'v-addCard': addCard,
    'v-dropDown': dropDown
  },
  data() {
    return {
      isTop: true,
      show_modal: false,
      comp: deleteModal,
      tops: [],
      nav_data:[],
      content_data: [],
      check_folder: '',
      show_addCard: false,
      group: {
        folder_id: 0,
        id: 0
      },
      modal_title: '',
      modal_placeholder: '',
      options:[],
      search_data:[],
      cards_data:[],
      show_drop: false,
      onComfirmModal: ()=>{}
    }
  },
  mounted() {
    this.$right = document.querySelector('#right')
    this.onScoll()
    this.onTapFolder(1)
    this.initNavData(data=>{
      this.nav_data = data
    })
    this.initNavData(data=>{
      this.options = this.format(data)
    })
  },
  methods: {
    onSearch(keyword){
      this.show_drop = !!keyword.length
      if(!this.cards_data.length){
         this.db.cards.where('id').above(0).toArray().then(data=>{
          this.cards_data = data
          this.search_data = this.filterByKeyword(this.cards_data,keyword)
          console.log(this.search_data)
        })
      }else{
        this.search_data = this.filterByKeyword(this.cards_data,keyword)
        console.log(this.search_data)
      }
    },
    filterByKeyword(data,keyword){
      const reg = new RegExp(keyword,'i')
      console.log(reg)
      return data.filter(item=>{
        return reg.test(item.name)
      })
    },
    onScoll() {
      let self = this
      this.$right.addEventListener('scroll', function() {
        if (+this.scrollTop > 500) {
          self.isTop = false
        } else {
          self.isTop = true
        }
      })
    },
    onButton(type) {
      return type ? this.addCard() : this.scrollTop(0)
    },
    closeAddCard() {
      this.group = {
        folder_id: 0,
        id: 0
      }
      this.show_addCard = false
      this.show_modal = false
    },
    commitCard(data) {
      // 提交添加
      this.db.cards.add(data).then(() => {
        this.onTapFolder(data.folder_id)
        this.closeAddCard()
      })
    },
    format(data) {
      let arr = []
      data.forEach(item => {
        arr.push({
          value: item.id,
          label: item.name,
          children: (() => {
            let arr2 = []
            item.groups.forEach(i => {
              arr2.push({
                value: i.id,
                label: i.name
              })
            })
            return arr2
          })()
        })
      })
      return arr
    },
    scrollTop(target_top) {

      let $right = this.$right
      let max_top = $right.scrollHeight - $right.offsetHeight
      let now_top = $right.scrollTop
      let step = (now_top - target_top) / 20

      if (target_top > max_top) { target_top = max_top }
      let animation = function() {
        // debugger
        if (Math.abs($right.scrollTop - target_top) <= Math.abs(step)) {
          return $right.scrollTop = target_top
        }
        $right.scrollTop -= step
        requestAnimationFrame(animation)
      }
      requestAnimationFrame(animation)
    },
    addCard() {
      // 点击”+“号
      this.show_addCard = !this.show_addCard
      this.show_modal = !this.show_modal
      this.comp = ''
      this.group = {
        folder_id: 0,
        id: 0
      }
    },
    hideModal() {
      if (this.show_addCard) {
        this.show_addCard = false
      }
      this.show_modal = false
    },
    deleteCard(card) {
      // 删除card弹窗
      this.card = card
      this.comp = deleteModal
      this.show_modal = true
      this.onComfirmModal = ()=>this.deleteCardHandle(card)
    },
    onCancelModal() {
      console.log('cancel')
      this.show_modal = false
    },
    deleteCardHandle(item){
      this.db.cards.delete(item.id).then((data) => {
        this.onTapFolder(item.folder_id)
      })
      this.show_modal = false
    },
    deleteGroupHandle(item){
      this.db.groups.delete(item.id).then((data) => {
        this.nav_data.map(folder=>{
          if(folder.id===item.folder_id){
            folder.groups.map((group,index)=>{
              if(group.id===item.id){      
                folder.groups.splice(index,1)
              }
            })
            this.onTapFolder(item.folder_id)
          }
        })
      })
      this.show_modal = false
    },
    deleteFolderHandle(item,index){
      this.db.folders.delete(item.id).then((data) => {
        this.nav_data.splice(index,1)
        this.onTapFolder(1)
      })
      this.show_modal = false
    },
    addGroupHandle(content,item,index){
      this.db.groups.add({name:content,folder_id:item.id,icon:"lianjie"}).then((data) => {
        console.log(data)
        this.nav_data[index].groups.push({name:content,folder_id:item.id,icon:"lianjie",id:data})
        this.onTapFolder(item.id)
      })
      this.show_modal = false
    },
    addFolderHandle(content){
      this.db.folders.add({name:content}).then((data) => {
        this.nav_data.push({name:content,id:data})
      })
      this.show_modal = false
    },
    updateGroupHandle(content,item,index){
      console.log(content,item,index)
      this.db.groups.update(item.id, {name: content}).then(data=>{
        this.nav_data.map((folder,i)=>{
          if(folder.id===item.folder_id){
            // this.$set(this.nav_data[i].groups[index],name,content)
            folder.groups[index].name = content
            this.onTapFolder(item.folder_id)
          }
        })
      })
      this.show_modal = false
    },
    updateFolderHandle(content,item,index){
      // 修改导航名字
      this.db.folders.update(item.id, {name: content}).then(data=>{
        this.nav_data[index].name = content
      })
      this.show_modal = false
    },
    onTap(index) {
      this.scrollTop(this.tops[index])
    },
    storeTops(top_arr) {
      this.tops = top_arr
    },
    onTapFolder(id) {
      this.initContentData(id, data => {
        this.content_data = data
        if (this.check_folder !== id) {
          this.check_folder = id
          this.$right.scrollTop = 0
        }
      })
    },
    onAddCard(card){
      console.log(card)
      this.show_modal = true
      this.comp = ''
      this.show_addCard = true
      this.group = card || {
        folder_id: 0,
        id: 0
      }
    },
    onEdit(dir, context_index, nav_index) {
      this._navIndex = nav_index
      switch (context_index) {
        case "0":
          // 编辑操作
          this.comp = editModal
          this.show_modal = true
          this.modal_placeholder = dir.name
          if (dir.folder_id) {
            this.modal_title = '编辑组别'
            this.onComfirmModal = content=>this.updateGroupHandle(content,dir,nav_index)
          } else {
            this.modal_title = '编辑分类'
            this.onComfirmModal = content=>this.updateFolderHandle(content,dir,nav_index)
          }
          break
        case "1":
          // 删除操作
          this.comp = deleteModal
          this.show_modal = true
          if (dir.folder_id) {
            this.onComfirmModal = ()=>this.deleteGroupHandle(dir,nav_index)
          } else {
            this.onComfirmModal = ()=>this.deleteFolderHandle(dir,nav_index)
          }
          break
        case "2":
          // 添加操作
          console.log(context_index)
          if(!dir){
            this.show_modal = true
            this.comp = editModal
            this.modal_title = '增加分类'
            this.onComfirmModal = content=>this.addFolderHandle(content,dir,nav_index)
            return 
          }
          if (dir.folder_id) {
            this.initNavData(data=>{
              this.options = this.format(data)
              console.log(this.options)
            })
            this.onAddCard(dir)
          } else {
            this.show_modal = true
            this.comp = editModal
            this.modal_title = '增加组别'
            this.onComfirmModal = content=>this.addGroupHandle(content,dir,nav_index)
          }
          break
      }

    }
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  font-size 14px
  width 100%
  height 100%
  transition transform 0.4s
  // overflow hidden
  &.app_scroll
    transform translate3D(-340px,0,0)
  #left
    position fixed
    left 0
    top 0
    bottom 0
    width 248px
    text-align left
    background-color #30333c
    overflow hidden
    .title_wrapper
      position absolute
      top 0
      left 0
      width 100%
      height 100px
      .drop_wrapper
        position relative
        width 200px
        margin 0 auto
    .nav_wrapper
      position absolute
      top 100px
      left 24px
      bottom 40px
      width 240px
      overflow auto
    .footer_wrapper
      position absolute
      left 0
      right 0
      bottom 0
  #right
    height 100%
    margin-left 248px
    background-color #f3f6f8
    overflow auto
  .button_wrapper
    position fixed
    right 32px
    bottom 32px
    z-index 1
    .button_scroll
      transform rotate(-180deg)
  .addCard_wrapper
    position fixed
    top 0 
    bottom 0 
    right -340px 
    width 300px
    padding 0 20px
    background-color #30333c
  .slide-enter-active, .slide-leave-active
    transition transform .4s 
  .slide-enter, .slide-leave-to
    transform translate3D(340px,0,0)
</style>
