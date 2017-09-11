<template>
  <div class="drop_down" v-show="showFlag">
    <div v-if="data.length">
      <div class="item" @click="onSelected(item)" v-for="(item,index) in data" :key="index">
       {{item.name}}--{{item.group_name}}
     </div>
    </div>
    <div class="item" v-else>没有搜索到相关内容</div>
  </div>
</template>

<script>
  export default {
    name: 'drop_down',
    props:['data','showFlag'],
    methods:{
      onSelected(item){
        this.$emit('redirect')
        setTimeout(()=>{
          window.open(item.url)
        },10)
      }
    }
  }
</script>

<style scoped>
 .drop_down{
   position: absolute;
   top: 10px;
   right: 0;
   left: 0;
   padding: 10px 0;
   max-height: 200px;
   border-radius: 2px;
   background-color: #fff;
   z-index: 100;
   overflow-y: auto;
 }
 .drop_down .item{
   padding-left: 20px;
   height: 40px;
   line-height: 40px;
   font-size: 12px;

   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
 }
 .drop_down .item:hover{
   background-color: #ccc;
 }
</style>