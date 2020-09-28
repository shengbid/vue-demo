<template>
  <div>
    <h2>案例使用的是utils文件下的vue-print-nb组件</h2>
    <p>博客地址:<a target="_blank" href="https://www.cnblogs.com/steamed-twisted-roll/p/10683680.html">https://www.cnblogs.com/steamed-twisted-roll/p/10683680.html</a></p>
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
        <li style="padding: 20px"><el-input
          v-model="textarea"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
        /></li>
        <li class="noprint">
          <p>不需要打印的内容</p>
          <p>不需要打印的内容</p>
          <p>不需要打印的内容</p>
        </li>
      </ul>
      <div>
        <ul>
          <li>轻轻的我走了，</li>
          <li>轻轻的我走了，</li>
          <li>轻轻的我走了，</li>
          <li>轻轻的我走了，</li>
          <li>轻轻的我走了，</li>
        </ul>
      </div>
        <div style="padding: 30px" class="noprint">
        <p>不需要打印的内容</p>
        <p>不需要打印的内容</p>
        <p>不需要打印的内容</p>
      </div>
    </div>
    <el-button type="primary" @click="toImg">转图片打印</el-button>
    <el-button v-print="printObj" type="primary">直接打印</el-button>
    <img style="margin-top:20px;" :src="img" alt="">
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import printJS from 'print-js'
export default {
  data() {
    return {
      img: '',
      printObj: {
        id: 'printMe',
        popTitle: '打印',
        ignoreClass: 'noprint',
        endCallback: (e) => {
          console.log(e, 5555)
        }
        // extraCss: 'https://www.google.com,https://www.google.com',
        // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      textarea: '轻轻的我走了，'
    }
  },
  watch: {
  },

  created() {
  },
  methods: {
    toImg() {
      html2canvas(this.$refs.printContent, {
        backgroundColor: null,
        useCORS: true,
        windowHeight: document.body.scrollHeight
      }).then((canvas) => {
        // let url = canvas.toDataURL('image/jpeg', 1.0)
        const url = canvas.toDataURL()
        this.img = url
        printJS({
          printable: url,
          type: 'image',
          documentTitle: '打印图片'
        })
        // console.log(url)
      })
    }
  }
}
</script>
<style>
.content {
  width: 300px;
  border: 1px solid #000;
  text-align: center;
  margin-bottom: 200px;
  padding-top: 20px;
}
.content li {
  padding: 10px 0;
}
</style>
