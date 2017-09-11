<template>
  <transition name="fade">
    <div class="modal" v-show="showFlag">
      <div class="slot_wrapper">
        <slot></slot>
      </div>
      <div class="mask" @click="onHide"></div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "modal",
    props:{
      showFlag: {
        type: Boolean,
        default: true
      }
    },
    methods:{
      onHide(){
        this.$emit('onHide')
      }
    }
  }
</script>

<style scoped lang="stylus">
  .fade-enter-active, .fade-leave-active
    transition opacity .3s 
  .fade-enter, .fade-leave-to
    opacity 0
  .modal
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    .slot_wrapper
      position absolute
      top 40%
      left 50%
      transform translate(-50%,-50%)
    .mask
      width 100%
      height 100%
      background rgba(0,0,0,.4)
</style>