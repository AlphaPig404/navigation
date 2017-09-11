<template>
  <div class="addCardModal">
    <h4 class="title">
      <span>添加导航卡</span>
    </h4>
    <form class="content" ref="cardForm">
      <p class="row">
        <el-cascader :options="options" @change="onSelect" :value="[folder_id,group_id]"></el-cascader>
      </p>
      <p class="row">
        <el-input v-model="card_name" placeholder="卡片名称" type="search"></el-input>
      </p>
      <p class="row">
        <el-input v-model="card_link" placeholder="卡片地址" type="search"></el-input>
      </p>
      <p class="row">
        <el-input v-model="card_desc" placeholder="卡片描述" type="search"></el-input>
      </p>
      <p class="row">
        <el-input v-model="card_img" placeholder="图标外链" type="search"></el-input>
      </p>
      <p class="row">
        <label for="" class="name">或者</label>
        <input type="serach" placeholder="A" class="input" v-model="bg_text">+
        <input type="search" placeholder="#ccc" class="input" v-model="bg_color">
        <label for="color" class="upload_color uploading">
          <input type="color" id="color" v-model="bg_color">
        </label>
      </p>
      <!-- <p class="row">
          <label for="" class="name">或者</label>
          <label for="upload" class="upload_img uploading">
              上传图片
              <input type="file" id="upload" v-show="false" @change="loadFile">
           </label>
           <span class="msg" v-show="show_msg">本地图片位置修改时会失效</span>
        </p> -->
      <div class="upload">
        <div class="card">
          <div class="card_title">
            <img :src="card_img" alt="" class="img" v-if="card_img">
            <span class="img" v-else :style="{background:bg_color}">{{bg_text}}</span>
            <h3>{{card_name||'名称'}}</h3>
          </div>
          <p>{{card_desc||'描述...'}}</p>
        </div>
      </div>
      <div class="footer">
        <div class="button cancel" @click="resetForm">重置</div>
        <div class="button ok" @click="onComfirm">添加</div>
      </div>
    </form>
  </div>
</template>

<script>

import mixin from '@/assets/js/mixin'

export default {
  name: "addCardModal",
  mixins: [mixin],
  props: {
    group: {
      type: Object,
      default: {
        folder_id: 0,
        id: 0
      }
    },
    options: {
      type: Array,
      default: Array
    }
  },
  data() {
    return {
      folder_id: this.group.folder_id,
      group_id: this.group.id,
      card_name: '',
      card_link: '',
      card_desc: '',
      card_img: '',
      bg_text: 'A',
      bg_color: '#5cb85c',
      card_img: '',
      show_msg: false,
    }
  },
  watch: {
    group(newData, oldData) {
      this.folder_id = newData.folder_id
      this.group_id = newData.id
    }
  },
  mounted() {

  },
  methods: {
    onSelect(data) {
      console.log(data)
      this.folder_id = data[0]
      this.group_id = data[1]
    },
    onComfirm() {
      let data = {
        name: this.card_name,
        url: this.card_link,
        desc: this.card_desc,
        img: this.card_img,
        bg_text: this.bg_text,
        bg_color: this.bg_color,
        folder_id: this.folder_id,
        group_id: this.group_id,
      }
      this.$emit('add', data)
      this.resetForm()
    },
    resetForm() {
      this.folder_id = ''
      this.group_id = ''
      this.card_name = ''
      this.card_link = ''
      this.card_desc = ''
      this.card_img = ''
      this.bg_text = 'A'
      this.bg_color = '#5cb85c'
      this.card_img = ''
      this.show_msg = false
    },
    loadFile(e) {
      let files = event.target.files, file
      if (files && files.length > 0) {
        file = files[0]
      }
      let URL = window.URL || window.webkitURL;
      // 通过 file 生成目标 url
      let imgURL = URL.createObjectURL(file);
      this.card_img = imgURL
      this.show_msg = true
    }
  }
}
</script>

<style scoped lang="stylus">
  .addCardModal
    display flex
    flex-direction column
    width 100%
    height 100%
    border-radius 6px
    text-align left 
    justify-content center
    color #fff
    .title
      display flex
      height 48px
      line-height 48px
      font-size 16px
      font-weight bold
      justify-content space-between
      .icon-delete2
        cursor pointer
    .content
      flex 1
      border-top 1px solid #eee
      padding 20px
      .row
        display  flex
        height 40px
        line-height 40px
        align-items center
        margin-top 10px
        .el-cascader
          width 100%
        .name
          display inline-block
          width 30px
          margin-right 10px
        .input
          display inline-block
          flex 1
          height 24px
          padding 0 4px
          border-radius 4px
          border 1px solid #ccc
          background-color #fff
          outline none
          overflow hidden
          &:focus 
            border 1px solid #108ee9
        .uploading
          display inline-block
          height 20px
          line-height 20px
          padding 4px
          color #108ee9
          text-decoration underline
          border-radius 4px
          font-size 12px
          #color
            vertical-align middle
            width 20px
            height 20px
            border none
            background #eee
        .msg 
          font-size 12px
          color red
      .upload
        position relative
        padding-top 10px
        .card
          position: relative;
          border-radius: 6px;
          background: #fff;
          padding: 10px;
          width: 26%;
          min-width: 200px;
          text-align: left;
          overflow: hidden;
          border: 1px solid #e4ecf3;
          -webkit-box-shadow: 1px 2px 3px #f2f6f8;
          box-shadow: 1px 2px 3px #f2f6f8;
          margin 10px auto
          .card_title
            height: 40px;
            position: relative;
            font-size: 14px;
            font-weight: 700;
            color: #3273dc;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 0.1rem;
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
            h3
              display inline-block
              vertical-align middle
          p
            margin-top 10px
            font-size 12px
            color #333
    .footer
      height 48px
      line-height 48px
      text-align center
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