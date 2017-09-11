<template>
  <div class="nav_menu" @click="hideMenu">
    <div class="sub_menu">
      <div class="folder" v-for="(dir,i) in data" :key="i">
        <section class="title" @click="toggleFe(dir,i)">
          <i class="iconfont icon-daohang"></i>
          <span>{{dir.name}}</span>
          <i class="iconfont icon-guanli" @click.stop="e=>onGuanli(e,dir,i)"></i>
        </section>
        <ul v-show="dir.show_flag">
          <li v-for="(item,index) in dir.groups" :key="index" @click="onCheckGroup(index)" :class="{checked: index===checked_index}">
            <i class="iconfont" :class="prefixIcon(item.icon)"></i>
            <span class="name">{{item.name}}</span>
            <i class="iconfont icon-guanli" @click.stop="e=>onGuanli(e,item,index)"></i>
          </li>
        </ul>
      </div>
    </div>
    <div class="add_button">
      <i class="iconfont icon-icon02" @click="addFolder"></i>
    </div>
    <div class="menu_wrapper" ref="menu_wrapper" v-show="show_menu">
       <v-contextMenu @selectAction="selectAction"></v-contextMenu>
    </div>
  </div>
</template>

<script>

import { group_data } from "@/assets/js/group_data"
import contextMenu from '@/components/contextMenu'
import mixin from '@/assets/js/mixin'

export default {
  name: 'navMenu',
  mixins: [mixin],
  props: ['data'],
  components:{
    'v-contextMenu': contextMenu
  },
  data() {
    return {
      show_list: false,
      checked_index: '',
      content_data: [],
      show_menu: false,
    }
  },
  mounted(){
    // this.initNavData(data=>{
    //   this.data = data
    // })
  },
  methods: {
    prefixIcon(icon){
      return `icon-${icon}`
    },
    toggleFe(dir,i){
      this.data.forEach((folder,index)=>{
        if(index === i){
         return this.$set(this.data[i],'show_flag',!this.data[i].show_flag)
        }
        this.$set(folder,'show_flag',false)
      })

      this.$emit('onTapFolder',dir.id)
      this.checked_index = ''
    },
    hideMenu(){
      this.show_menu = false
    },
    onCheckGroup(index){
      this.checked_index = index
      this.$emit('onTap',index)
    },
    onGuanli(e,dir,i){
      if(this.show_menu){
        this.show_menu = false
      }else{
        let $menu = this.$refs.menu_wrapper
        $menu.style.left = e.pageX - 80 + 'px'
        $menu.style.top = e.pageY + 16 + 'px'
        this.show_menu = true
        this._dir_ = dir
        this._index = i
      }
    },
    selectAction(index){
      this.show_menu = false
      this.$emit('edit',this._dir_,index,this._index)
    },
    addFolder(){
      this.$emit('edit',null,'2')
    }
  }
}
</script>

<style scoped lang="stylus">
  .nav_menu
    color: #fff
    .sub_menu
      .folder
        .title
          position relative
          height 48px
          line-height 46px
          border-top 2px solid hsla(0,0%,100%,.04)
          cursor pointer
          &:hover .icon-guanli
            display block
            right 40px
          .icon-guanli
            display none
            position absolute
            top 0
            right 0
        ul
          li
            position relative
            height 32px
            line-height 32px
            padding-left 20px
            color #60697f
            cursor pointer
            &.checked
              color #fff
            &:hover 
              color #fff
              background-color #4f5d7d
              & .icon-guanli
                display block
                right 40px
            .name
              font-size 12px
              margin-left 15px
            .icon-guanli
              display none
              position absolute
              top 0
              right 0
    .add_button
      margin-top 20px
      text-align center
      .icon-icon02
        margin-right 20px
        font-size 22px !important
        color #60697f
        &:hover
          color #fff
          cursor pointer
          font-size 24px !important
    .menu_wrapper
      position fixed
      top 200px
      left 100px
</style>