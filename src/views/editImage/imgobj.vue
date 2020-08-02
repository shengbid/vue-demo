<template>
  <div>
    <div class="box">
      <div class="header">
        <h1>图形编辑(旋转,拉伸移动)</h1>
      </div>
      <div id="container"></div>
    </div>
  </div>
</template>
<script>
import './imageobj/index.css'
import EditImage from './imageobj/imgobj'
import url from '@/assets/imgs/rotate5.jpg'

export default {
  mounted() {
    this.inintImage()
  },
  methods: {
    inintImage() {
      new EditImage({
       id: 'container',
       width: 350, // 图片宽
       height: 350, // 图片高
       imgUrl: url, // 图片路径
       miniWidth: 40, // 旋转元素宽
       miniHeight: 40, // 旋转元素高
       flatContent: '翻转', // 翻转元素内容(可以传入元素)
       rotate1Content: '旋转', // 右下角旋转元素内容(可以传入元素)
       rotate2Content: '<i class="el-icon-refresh-right" style="font-size: 20px" />', // 左下角旋转元素内容
     })
    }
  }
}
</script>