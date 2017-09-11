<template>
  <div class="content" ref="content">
    <div class="card_group" v-for="(item,index) in data" :key="index">
      <h2>
        <i class="iconfont" :class="prefixIcon(item.icon)"></i>
        <span class="name">
          {{item.name}}
          <i class="iconfont icon-zengjia" @click="onAdd(item)">添加卡片</i>
        </span>
      </h2>
      <ul>
        <li class="card" v-for="(card,i) in item.links" :key="i">
          <a :href="card.url" target="_blank">
            <div class="title">
              <img :src="prefixImg(card.img)" alt="" width="40" height="40" v-if="card.img">
              <span class="img" v-else :style="{background: card.bg_color}">{{card.bg_text}}</span>
              <h3>{{card.name}}</h3>
            </div>
            <p>{{card.desc}}</p>
          </a>
          <div class="delete" @click="onDelete(card)">
            <i class="iconfont icon-delete2"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { card_data } from "@/assets/js/card_data"
import mixin from '@/assets/js/mixin'

export default {
  name: 'content',
  mixins: [mixin],
  props: {
    data:{
      type: Array,
      default: Array
    }
  },
  watch:{
    data(){
      this.$nextTick(()=>{
        this.$emit('getGroupTops',this.getTop())
      })
    }
  },
  data() {
    return {
      cards: [],
      tops: [],
      images: {
        'alloyteam-favicon': require('../assets/images/alloyteam-favicon.jpg'),
        'jkt-logo': require('../assets/images/jkt-logo.jpg'),
        'jy-logo': require('../assets/images/jy-logo.png'),
      }
    }
  },
  mounted(){
    
  },
  methods: {
    getTop(){
      let childrens = this.$refs.content.childNodes
      let arr = []
      childrens.forEach(item=>{
        arr.push(item.getBoundingClientRect().top)
      })

      return arr
    },
    prefixIcon(icon) {
      return `icon-${icon}`
    },
    prefixImg(img) {
      const str = img.match(/alloyteam-favicon|jkt-logo|jy-logo/)
      if(str){
        return this.images[str[0]]
      }
      return `http://www.alloyteam.com/nav${img}`
    },
    onDelete(card){
      console.log(card)
      this.$emit('delete',card)
    },
    onAdd(card){
      this.$emit('add',card)
    }
  }
}
</script>

<style scoped lang="stylus">
  .content
    margin 0 auto
    .card_group
      overflow hidden
      background #fff
      margin 20px 30px
      padding-bottom 20px
      h2
        height 40px
        line-height 40px
        padding-left 16px
        font-size 16px
        text-align left 
        .iconfont
          font-size 16px !important 
          margin-right 16px
        .name
          &:hover .icon-zengjia
            display inline
            text-decoration underline 
            cursor pointer
          .icon-zengjia
            display none
            margin-left 10px
      ul 
        li
          position relative
          border-radius 6px
          background #fff
          padding 10px
          width 26%
          min-width 200px
          margin 22px 0 0 2.1%
          float left
          text-align left 
          overflow hidden
          border 1px solid #e4ecf3
          box-shadow 1px 2px 3px #f2f6f8
          &:hover
           transition all 0.5s ease
           transform translate3D(0px,-5px,0px)
           box-shadow 3px 3px 6px #e4ecf3
           .delete
            display block
          .delete
            display none
            position absolute
            right 10px
            top 10px
            width 30px
            height 30px
            line-height 30px
            text-align center
            border-radius 50%
            cursor pointer
            &:hover 
              background rgba(204, 204, 204, 0.66)
            .icon-shanchu
              font-size 14px !important
          a
            .title
              height 40px
              position relative
              font-size 14px
              font-weight 700
              color #3273dc
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              padding 0 .1rem
              .img 
                display inline-block
                width 40px
                height 40px
                line-height 40px
                text-align center
                color #fff
                font-size 20px
                overflow hidden
                vertical-align middle
                border-radius 50%
              img 
                vertical-align middle
                border-radius 50%
              h3
                display inline-block
                vertical-align middle
            p
              color gray
              font-size 12px
              padding-top 10px
              height 35px
              text-align left 
              overflow hidden
              text-overflow ellipsis
              display -webkit-box
              -webkit-line-clamp 2
              -webkit-box-orient vertical

</style>