<template>
  <div class="button" :class="{rotate_btn: isTop}" @click="onButton">
    <i class="iconfont icon-delete2" v-if="isTop"></i>
    <i class="iconfont icon-huidingbu" v-else></i>
  </div>
</template>

<script>
  export default {
    name: 'buttons',
    props:{
      isTop:{
        type: Boolean,
        default: true,
        desc:"监听滚动状态"
      }
    },
    data() {
      return {
        // isTop: false
      }
    },
    methods:{
      onButton(){
        this.$emit('onButton',this.isTop)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .button
    width 48px
    height 48px
    border-radius 50%
    background-color #db4437
    line-height 48px
    text-align center
    box-shadow 0 6px 10px 0 rgba(0,0,0,0.3)
    &.rotate_btn
      transform rotate(45deg)
      transition all .3s .1s
    &:hover
      box-shadow: 0 6px 10px 0 rgba(0,0,0,0.4)
    .icon-delete2
      font-size 26px !important 
      color #fff
    .icon-huidingbu
      font-size 26px !important 
      color #fff
      font-weight bold
</style>