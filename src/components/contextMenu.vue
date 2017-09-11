<template>
  <div class="contextMenu" @click="selectAction">
    <section class="row" v-for="(item,index) in data" :key="index" :data-id="index">
      <i class="iconfont" :class="item.icon"></i>
      <span>{{item.name}}</span>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          name: '编辑',
          icon: 'icon-bianji2',
        },
        {
          name: '删除',
          icon: 'icon-delete2',
        },
        {
          name: '添加',
          icon: 'icon-zengjia',
        }
      ]
    }
  },
  methods:{
    selectAction(e){
      let target = this.getNode(e.target,'SECTION')
      let id = target.dataset.id
      this.$emit('selectAction',id)
    },
    getNode(node,name){
      return node.nodeName === name ? node : this.getNode(node.parentNode,name)
    }
  }
}
</script>

<style scoped lang="stylus">
  .contextMenu
    width 80px
    border-radius 4px
    background-color #fff
    padding 4px 0
    text-align left
    color #333
    .row
      height 30px
      line-height 30px
      padding-left 10px
      cursor pointer
      &:hover 
        background-color #ccc
      .iconfont
        margin-right 6px
</style>