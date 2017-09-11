<template>
  <div class="deleteModal">
    <h4 class="title">{{title}}</h4>
    <div class="content" >
      <input type="text" :placeholder="placeholder" v-model="content" @keydown.enter="onComfirm" @keydown.esc="onCancel">
    </div>
    <div class="footer">
      <div class="button cancel" @click="onCancel">取消</div>
      <div class="button ok" @click="onComfirm">更新</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "deleteModal",
    props:['placeholder','title'],
    data() {
      return {
        content: ''
      }
    },
    methods:{
      onCancel(){
        this.$emit('cancel')
      },
      onComfirm(){
        this.$emit('comfirm',this.content)
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
      // border-top 1px solid #eee
      // border-bottom 1px solid #eee
      padding 20px
      input
        width 100%
        appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #bfcbd9;
        box-sizing: border-box;
        color: #1f2d3d;
        font-size: inherit;
        height: 36px;
        line-height: 1;
        outline: 0;
        padding: 3px 10px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
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