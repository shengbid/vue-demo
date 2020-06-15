<template>
  <div class="rotate_contanier">
    <div class="header">
      <span @click="handleImg(1)">上一张</span>
      <span @click="handleImg(2)">下一张</span>
      <span @click="rotate">旋转</span>
    </div>
    <div class="picture_contaner">
      <div class="img_box" ref="rotate">
        <img :src="fileInfo.fileUrl" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import rotate1 from '@/assets/imgs/rotate1.jpg'
import rotate2 from '@/assets/imgs/rotate2.jpg'
import rotate3 from '@/assets/imgs/rotate3.jpg'
import rotate4 from '@/assets/imgs/rotate4.jpg'
import rotate5 from '@/assets/imgs/rotate5.jpg'

export default {
  props: {
    
  },
  data() {
    return {
      pictureList1: [
        {fileUrl: 'http://mp.ofweek.com/Upload/News/Img/member645/201711/17170046839337.jpg'},
        {fileUrl: 'http://img2.imgtn.bdimg.com/it/u=1239081181,1433383585&fm=26&gp=0.jpg'},
        {fileUrl: 'http://img1.imgtn.bdimg.com/it/u=3502008475,4132115356&fm=26&gp=0.jpg'},
        {fileUrl: 'http://img12.360buyimg.com/n5/s450x450_jfs/t9952/98/2269407420/279171/6137fe2f/59f28b2bN6959e086.jpg'},
        {fileUrl: 'http://img2.imgtn.bdimg.com/it/u=2681505513,370839281&fm=26&gp=0.jpg'},
        {fileUrl: 'http://img2.imgtn.bdimg.com/it/u=1153377230,3978893548&fm=26&gp=0.jpg'}
      ],
      pictureList: [
        {fileUrl: rotate1},
        {fileUrl: rotate2},
        {fileUrl: rotate3},
        {fileUrl: rotate4},
        {fileUrl: rotate5},
        {fileUrl: rotate3},
      ],
      fileInfo: {
        fileUrl: '',
        deg: 0
      },
      currentPage: 0
    }
  },
  created() {
    // 设置图片初始旋转角度
    this.pictureList.forEach(item => {
      item.deg = 0
    })
    this.fileInfo = this.pictureList[this.currentPage]
  },
  mounted() {
   
  },
  methods: {
    handleImg (type) {
      if (type === 1) { // 上一张
        this.currentPage++
        if (this.currentPage >= this.pictureList.length) {
          this.currentPage = 0
        }
      } else { // 下一张
        this.currentPage--
        if (this.currentPage < 0) {
          this.currentPage = this.pictureList.length - 1
        }
      }
      // 获取图片当前信息
      this.fileInfo = this.pictureList[this.currentPage]
      this.$refs.rotate.style.transform = `rotate(${this.fileInfo.deg}deg)`
    },
    // 旋转图片
    rotate () {
      this.fileInfo = this.pictureList[this.currentPage]
      this.fileInfo.deg += 90
      if (this.fileInfo.deg >= 360) {
        this.fileInfo.deg = 0
      }
      this.$refs.rotate.style.transform = `rotate(${this.fileInfo.deg}deg)`
    }
  }
}
</script>

<style>
.rotate_contanier {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #909399;
  width: 600px;
  height: 670px;
}
.header {
  height: 50px;
  margin-bottom: 10px;
  text-align: center;
  background-color: #fff;
  padding-top: 20px;
}
.header span {
  padding: 5px 8px;
  color: #fff;
  background-color: #409eff;
  border-radius: 4px;
  margin-right: 5px;
  cursor: pointer;
}
.picture_contaner {
  height: 600px;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
}
.picture_contaner .img_box {
  width: 100%;
  height: 100%;
  position: relative;
}
.picture_contaner .img_box img {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

</style>
