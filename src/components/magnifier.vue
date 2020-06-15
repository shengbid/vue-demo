<template>
  <div class="magnify">
    <div class="left_contaner">
      <div class="middle_img" @mouseover="boxMouseOver" @mouseleave="boxMouseLeave">
        <img :src="middleImg" alt="">
        <div class="shade" @mouseover="shadeMouseOver" @mousemove="shadeMouseMove" ref="shade" v-show="isShade"></div>
      </div>
      <div class="carousel">
        <div class="left_arrow arrow" @click="leftArrowClick"></div>
        <div class="show_box">
          <ul class="picture_container" ref="middlePicture">
            <li class="picture_item" @mouseover="tabPicture(item)" v-for="(item, index) in pictureList" :key="index">
              <img :src="item.url" class="small_img" alt="">
            </li>
          </ul>
        </div>
        <div class="right_arrow arrow" @click="rightArrowClick"></div>
      </div>
    </div>
    <div class="right_contanier" v-show="isBig">
      <img :src="middleImg" ref="bigImg" class="big_img" alt="">
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  props: {
    middleImgWidth: {
      default: 350,
      type: Number
    }, // 产品图片宽
    middleImgHeight: {
      default: 400,
      type: Number
    }, // 产品图片高
    thumbnailHeight: {
      default: 100,
      type: Number
    }, // 缩略图容器高度
    imgList: Array, // 图片数据
    zoom: {
      default: 2, // 缩略比例,放大比例
      type: Number
    }
  },
  data() {
    return {
      pictureList: [
        {url: 'http://mp.ofweek.com/Upload/News/Img/member645/201711/17170046839337.jpg'},
        {url: 'http://image.buy.ccb.com/merchant/201703/904919627/1522929521661_4.jpg'},
        {url: 'http://image5.suning.cn/uimg/b2c/newcatentries/0070130691-000000000826244625_5_800x800.jpg'},
        {url: 'http://img12.360buyimg.com/n5/s450x450_jfs/t9952/98/2269407420/279171/6137fe2f/59f28b2bN6959e086.jpg'},
        {url: 'http://d.ifengimg.com/w600/p0.ifengimg.com/pmop/2017/1213/A4037864F6728F006B67AAEC51EC8A485F320FD2_size93_w1024_h734.jpeg'},
        {url: 'http://d.ifengimg.com/w600/p0.ifengimg.com/pmop/2017/1213/A4037864F6728F006B67AAEC51EC8A485F320FD2_size93_w1024_h734.jpeg'}
      ],
      middleImg: '', // 中图图片地址
      bigImg: '', // 大图图片地址
      isShade: false, // 控制阴影显示与否
      isBig: false, // 控制放大图显示与否
      initX: 0, // 初始clientX值
      initY: 0, // 初始clientY值
      leftX: 0, // 初始定位left
      topY: 0, // 初始定位top
      middleLeft: 0, // 当前放置小图盒子的定位left值,
      itemWidth: 80, // 缩略图每张的宽度
    }
  },
  created() {
    if (this.imgList && this.imgList.length) {
      this.pictureList = this.imgList
    }
    this.middleImg = this.pictureList[0].url
    // 计算缩略图的宽度,默认是显示4张图片,两边箭头的宽度和为50
    this.itemWidth = (this.middleImgWidth-50) / 4
  },
  mounted() {
    this.$nextTick(() => {
      // 容器的高
      const imgWidth = this.middleImgHeight + this.thumbnailHeight + 20
      // 设置容器宽高
      $('.magnify').css({
        width: this.middleImgWidth,
        height: imgWidth
      })
      // 设置产品图宽高
      $('.middle_img').css({
        width: this.middleImgWidth,
        height: this.middleImgHeight
      })
      // 设置移动阴影图宽高
      $('.middle_img .shade').css({
        width: this.middleImgWidth/this.zoom,
        height: this.middleImgHeight/this.zoom
      })
      // 设置缩略图容器高
      $('.carousel').css({
        height: this.thumbnailHeight
      })
      // 设置每个缩略图宽
      $('.picture_item').css({
        width: this.itemWidth
      })
      // 设置放大后图片容器的宽高,left
      $('.right_contanier').css({
        left: this.middleImgWidth,
        width: imgWidth,
        height: imgWidth
      })
      // 设置放大图片的宽高(图片的放大倍数)
      $('.right_contanier .big_img').css({
        width: imgWidth * this.zoom,
        height: imgWidth * this.zoom
      })
    })
  },
  methods: {
    // 产品图片鼠标移入事件,显示阴影,显示大图
    boxMouseOver (e) {
      e.preventDefault();
      e.stopPropagation();
      this.isShade = true
      this.isBig = true
      // 计算阴影的位置
      let x = e.offsetX - $('.shade').width()/2
      let y = e.offsetY - $('.shade').height()/2
      let maxLeft = $('.middle_img').width() - $('.shade').width() 
      let maxTop = $('.middle_img').height() - $('.shade').height()
      x = x <= 0 ? 0 : x
      x = x >= maxLeft ? maxLeft : x
      y = y <= 0 ? 0 : y
      y = y >= maxTop ? maxTop : y
      $('.shade').css({
        left: x,
        top: y
      })
    },
    // 鼠标在阴影移动
    shadeMouseMove (e) {
      e.preventDefault();
      e.stopPropagation();

      //用页面x - 父盒子的offsetLeft - 父盒子的左边框宽度
      var x = this.getEventPage(e).pageX - $('.middle_img')[0].offsetParent.offsetLeft - $('.middle_img')[0].offsetParent.clientLeft;
      //用页面y - 父盒子的offsetTop - 父盒子的上边框宽度
      var y = this.getEventPage(e).pageY - $('.middle_img')[0].offsetParent.offsetTop - $('.middle_img')[0].offsetParent.clientTop;

      //让阴影的坐标居中
      x -= $('.shade').width() / 2;
      y -= $('.shade').height() / 2;

      // 移动边界限制
      let maxLeft = $('.middle_img').width() - $('.shade').width()
      let maxTop = $('.middle_img').height() - $('.shade').height()
      x = x <= 0 ? 0 : x
      x = x >= maxLeft ? maxLeft : x
      y = y <= 0 ? 0 : y
      y = y >= maxTop ? maxTop : y
      // 重新赋值当前的定位值
      $('.shade').css({
        left: x,
        top: y
      })
      // 计算出实时的大图的定位,首先计算出比例
      // 比例为x:大图宽度/小图宽度 y: 大图高度/小图高度,将小图的定位乘以比例就是大图的定位
      const xRate = $('.big_img').width() / $('.middle_img').width()
      const yRate = $('.big_img').height() / $('.middle_img').height()
      $('.big_img').css({
        left: -x*xRate,
        top: -y*yRate
      })
      // console.log(e, x, y, xRate, yRate, 66677)
    },
    // 鼠标移入阴影,去除自定义事件
    shadeMouseOver (e) {
      e.preventDefault();
      e.stopPropagation();
      // console.log(88888, e)
    },
    // 图片移出隐藏阴影和大图
    boxMouseLeave () {
      this.isShade = false
      this.isBig = false
    },
    // 切换图片
    tabPicture (item) {
      this.middleImg = item.url
    },
    // 点击左边箭头
    leftArrowClick () {
      if (this.middleLeft < 0) {
        // 每次向右平移一个图片盒子的宽度
        this.middleLeft += this.itemWidth
        $('.picture_container').animate({
          left: this.middleLeft
        }, 500)
      }
    },
    // 点击右边箭头
    rightArrowClick () {
      // 每次向左平移一个盒子的宽度,最多移动的宽度为(图片数组长度-4)*每张缩略图的宽度
      if (this.middleLeft > -this.itemWidth*(this.pictureList.length-4)) {
        this.middleLeft -= this.itemWidth
        $('.picture_container').animate({
          left: this.middleLeft
        }, 500)
      }
    },
    /**
     * 获取网页滚出去的距离（包括上面滚出去的部分和左边滚出去的部分）
     * @returns {{scrollTop: (Number|number), scrollLeft: (Number|number)}}
     */
    getPageScroll() {
      return {
        scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
      }
    },

    /**
    * 获取事件对象点击的点，相对于文档左上角的坐标
    * @param e
    * @returns {{pageX: *, pageY: *}}
    */
    getEventPage(e) {
      return {
        pageX: e.clientX + this.getPageScroll().scrollLeft,
        pageY: e.clientY + this.getPageScroll().scrollTop
      }
    }
  }
}
</script>

<style>
.magnify {
  position: relative;
}
.left_contaner {
  width: 100%;
  height: 100%;
}
.left_contaner .middle_img {
  border: 1px solid #ccc;
  box-sizing: border-box;
  position: relative;
}
.left_contaner .shade {
  background-color: rgba(	135,206,235, .5);
  position: absolute;
  top: 0;
  left: 0;
  cursor: move;
}
.left_contaner .middle_img img {
  width: 100%;
  height: 100%;
}
.left_contaner .carousel {
  width: 100%;
  margin-top: 20px;
  display: -webkit-flex;
}
.left_contaner .carousel .show_box {
  flex: 1;
  overflow: hidden;
  position: relative;
}
.left_contaner .carousel .arrow {
  flex-basis: 25px;
  cursor: pointer;
}
.left_contaner .carousel .left_arrow {
  background: url('http://www.jq22.com/demo/jQuery-fdj201705051102/images/btn_prev.png') no-repeat;
  background-position: center center;
}
.left_contaner .carousel .right_arrow {
  background: url('http://www.jq22.com/demo/jQuery-fdj201705051102/images/btn_next.png') no-repeat;
  background-position: center right;
}
.left_contaner .carousel .picture_container {
  width: 200%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
}
.left_contaner .picture_container .picture_item {
  height: 100%;
  float: left;
  padding: 5px;
  box-sizing: border-box;
}
.left_contaner .picture_container .picture_item:hover {
  border: 2px solid #f2019f;
}
.left_contaner .picture_container .picture_item img {
  width: 100%;
  height: 100%;
}
.right_contanier {
  overflow: hidden;
  position: absolute;
  top: 0;
  border: 1px solid #ccc;
}
.right_contanier .big_img {
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>
