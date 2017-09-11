<template>
  <div class="deleteModal">
    <h4 class="title">提示</h4>
    <p class="content">确定要删除吗？</p>
    <div class="footer">
      <div class="button cancel" @click="onCancel">取消</div>
      <div class="button ok" @click="onComfirm">确定</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "deleteModal",
    methods:{
      onCancel(){
        this.$emit('cancel')
      },
      onComfirm(){
        this.$emit('comfirm')
      }
    }
  }
</script>

<style scoped lang="stylus">
  .deleteModal
    display flex
    flex-direction column
    width 320px
    height 200px
    border-radius 6px
    padding 0 20px 
    background-color #fff
    text-align left 
    justify-content center
    .title
      height 48px
      line-height 48px
    .content
      flex 1
      border-top 1px solid #eee
      border-bottom 1px solid #eee
      padding 20px
    .footer
      height 48px
      line-height 48px
      text-align right 
      .button
        display inline-block
        padding 0 15px
        font-size 14px
        border-radius 4px
        height 32px
        line-height 32px
        margin-left 10px
        cursor pointer
        &.ok
          background-color #108ee9
          color #fff
        &.cancel
          border 1px solid #ccc
</style>