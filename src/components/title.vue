<template>
  <div class="title">
    <h2>
      <i class="iconfont icon-daohanghaiwaigou"></i>
      <span>个人导航页</span>
    </h2>
    <section class="search">
      <i class="iconfont icon-sousuo"></i>
      <input type="search" @input="showDrop" v-model="keyword" placeholder="输入名称查询">
      <!-- <i class="iconfont icon-tianjiawenjian"></i> -->
    </section>
  </div>
</template>

<script>
  export default {
    name:'title',
    data() {
      return {
        keyword: ''
      }
    },
    methods:{
      showDrop(){
        this.$emit('searchInput',this.keyword)
      },
    }
  }
</script>

<style scoped lang="stylus">
  .title
    text-align center
    color #fff
    h2
      font-size 18px
      height 50px
      line-height 50px
      .icon-daohanghaiwaigou
        display inline-block
        font-size 24px !important 
        vertical-align middle
        margin-top -4px
    .search
      position relative
      .icon-sousuo
        position absolute
        top 8px
        left 34px
        color #1f2d3d
        font-size 16px !important
      input
        width 200px
        border none
        height 30px
        padding 0 20px 0 30px
        border-radius 20px
        outline none
        &::placeholder
          color #1f2d3d
</style>