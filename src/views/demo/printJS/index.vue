<template>
  <div>
    <p>图片打印</p>
    <img src="@/assets/imgs/rotate2.jpg" alt="">
    <el-button type="primary" @click="printImg">打印图片</el-button>

    <p>多张图片打印</p>
    <img src="https://printjs.crabbly.com/images/print-03.jpg" alt="">
    <img src="https://printjs.crabbly.com/images/print-04.jpg" alt="">
    <img src="https://printjs.crabbly.com/images/print-03.jpg" alt="">
    <el-button type="primary" @click="printMuchImg">打印多张图片</el-button>
  </div>
</template>

<script>
import printJS from 'print-js'
import rotate2 from '@/assets/imgs/rotate2.jpg'

export default {
  data() {
    return {

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
      console.log(555)
      printJS({
        printable: ['https://printjs.crabbly.com/images/print-03.jpg', 'https://printjs.crabbly.com/images/print-04.jpg', 'https://printjs.crabbly.com/images/print-03.jpg'],
        type: 'image',
        header: '多张图片',
        imageStyle: 'width:50%;margin-bottom:20px;'
      })
    }
  }

}
</script>