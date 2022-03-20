<template>
  <div>
    <p>printJS, 打印图片效果好一点, PDF试了页面空白;
      HTML打印没有样式,可能需要自己配置样式文件.
    </p>
    <p>
      简单的尝试,可能还没掌握正确的使用方法,
      官网地址:<a href="https://printjs.crabbly.com/" target="_blank">https://printjs.crabbly.com/</a>
      使用的可以去看看
    </p>
    <p>图片打印</p>
    <img src="@/assets/imgs/rotate2.jpg" alt="">
    <el-button type="primary" @click="printImg">打印图片</el-button>

    <p>多张图片打印</p>
    <img src="https://printjs.crabbly.com/images/print-03.jpg" alt="">
    <img src="https://printjs.crabbly.com/images/print-04.jpg" alt="">
    <img src="https://printjs.crabbly.com/images/print-03.jpg" alt="">
    <el-button type="primary" @click="printMuchImg">打印多张图片</el-button>

    <p>打印html</p>
    <div id="html-container">
      <h3>凉州词</h3>
      <ul>
        <li>葡萄美酒夜光杯</li>
        <li>欲饮琵琶马上催</li>
      </ul>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary" @click="printHtml">打印html</el-button>

  </div>
</template>

<script>
import printJS from 'print-js'
import rotate2 from '@/assets/imgs/rotate2.jpg'
// import pdf from '@/assets/finance.pdf'

export default {
  data() {
    return {
      form: {
        name: '',
        region: ''
      }
    }
  },
  methods: {
    printImg () {
      printJS({
        printable: rotate2,
        type: 'image',
        documentTitle: '打印单张图片',
        header: '打印图片',
        headerStyle: 'text-align: center;'
      })
    },
    // 打印多张图片
    printMuchImg () {
      printJS({
        printable: ['https://printjs.crabbly.com/images/print-03.jpg', 'https://printjs.crabbly.com/images/print-04.jpg', 'https://printjs.crabbly.com/images/print-03.jpg'],
        type: 'image',
        header: '多张图片',
        imageStyle: 'width:50%;margin-bottom:20px;'
      })
    },
    // 打印html
    printHtml () {
      console.log(555)
      printJS({
        printable: 'html-container',
        type: 'html',
        header: 'html打印',
      })
    },
  }

}
</script>