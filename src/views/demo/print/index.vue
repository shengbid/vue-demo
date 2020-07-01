<template>
<div>
  <div id="printMe" ref="printContent">
    <ul class="content">
      <li>轻轻的我走了，</li>
      <li>轻轻的我走了，</li>
      <li>轻轻的我走了，</li>
      <li>轻轻的我走了，</li>
      <li>轻轻的我走了，</li>
      <li>轻轻的我走了，</li>
      <li>轻轻的我走了，</li>
      <li>轻轻的我走了，</li>
    </ul>
  </div>
  <el-button type="primary" @click="toImg">转图片打印</el-button>
  <el-button type="primary" v-print="printObj">直接打印</el-button>
  <!-- <el-button type="primary" v-print="'#printMe'">直接打印</el-button> -->
  <img style="margin-top:20px;" :src="img" alt="">
</div>
</template>

<script>
  import html2canvas from 'html2canvas'
  import printJS from 'print-js'
  export default {
    data(){
      return {
        img: '',
        printObj: {
          id: 'printMe',
          popTitle: '打印',
          // extraCss: 'https://www.google.com,https://www.google.com', // 用逗号分隔的附加链接连接
          extraHead: '<meta http-equiv="Content-Language" content="zh-cn"/>'
        }
      }
    },
    watch: {
    },
    created() {
      
    },
    methods:{
      toImg () {
        html2canvas(this.$refs.printContent, {
          backgroundColor: null,
          useCORS: true,
          windowHeight: document.body.scrollHeight
        }).then((canvas) => {
          // let url = canvas.toDataURL('image/jpeg', 1.0)
          let url = canvas.toDataURL()
          this.img = url
          printJS(
            {
              printable: url,
              type: 'image',
              documentTitle: '打印图片'
            }
          )
          // console.log(url)
        })
      }
    }
  }
</script>
<style>
.content {
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  text-align: center;
  margin-bottom: 20px;
  padding-top: 20px;
}
.content li {
  line-height: 30px;
}
</style>