<template>
  <div class="slide-verify" id="slideVerify" ref="dialogopen" :style="widthlable" onselectstart="return false;">
    <canvas :width="w" :height="h" ref="canvas"></canvas>

    <canvas :width="w" :height="h" ref="block" class="slide-verify-block"></canvas>
    <div @click="refresh" class="slide-verify-refresh-icon el-icon-refresh"></div>
    <div @click="refresh" class="slide-verify-info" :class="{fail: fail, show: showInfo}">{{infoText}}</div>
    <div
      class="slide-verify-slider"
      :style="widthlable"
      :class="{'container-active': containerActive, 'container-success': containerSuccess, 'container-fail': containerFail}"
    >
      <div class="slide-verify-slider-mask" :style="{width: sliderMaskWidth}">
        <!-- slider -->
        <div
          @mousedown="sliderDown"
          @touchstart="touchStartEvent"
          @touchmove="touchMoveEvent"
          @touchend="touchEndEvent"
          class="slide-verify-slider-mask-item"
          :style="{left: sliderLeft}"
        >
          <div class="slide-verify-slider-mask-item-icon"></div>
        </div>
      </div>
      <span class="slide-verify-slider-text">{{sliderText}}</span>
    </div>
  </div>
</template>
<script>
function sum(x, y) {
  return x + y;
}

function square(x) {
  return x * x;
}
export default {
  name: "SlideVerify",
  props: {
    // block length
    // l: { // 小图宽高
    //   type: Number,
    //   default: 42
    // },
    // block radius
    // r: { // 图形radius
    //   type: Number,
    //   default: 10
    // },
    // canvas width
    w: {
      type: Number, // 大图的宽
      default: 310
    },
    // canvas height
    h: {
      type: Number, // 大图的高
      default: 180
    },
    block_y: { // 小图初始的y距离
      type: Number,
      default: 20
    },
    sliderText: { // 底部滑块的文字
      type: String,
      default: "右滑"
    },
    imgurl: { // 大图的地址
      type: String,
      default: ""
    },
    miniimgurl: { // 小图的地址
      type: String,
      default: ""
    }
  },

  data() {
    return {
      containerActive: false, // container active class
      containerSuccess: false, // container success class
      containerFail: false, // container fail class
      canvasCtx: null,
      blockCtx: null,
      block: null,
      canvasStr: null,
      // L: this.l + this.r * 2 + 3, // block real lenght
      img: undefined,
      originX: undefined,
      originY: undefined,
      isMouseDown: false,
      trail: [],
      widthlable: "",
      sliderLeft: 0, // block right offset
      sliderMaskWidth: 0, // 移动滑块的面积蒙层
      dialogVisible: false,
      infoText: '验证成功',
      fail: false,
      showInfo: false
    };
  },
  mounted() {
    //随机生成数
    this.init();
  },
  methods: {
    init() {
      this.initDom();
      this.bindEvents();
      this.widthlable = "width:" + this.w + "px;";
    },
    initDom() {
      this.block = this.$refs.block;
      this.canvasStr = this.$refs.canvas;

      this.canvasCtx = this.canvasStr.getContext("2d");
      this.blockCtx = this.block.getContext("2d");
      this.initImg()
    },
    initImg(h) {
      var that = this;
      const img = document.createElement("img");
      img.onload = onload;
      img.onerror = () => {
        img.src = that.imgurl;
      };
      img.src = that.imgurl;
      img.onload = function() {
        that.canvasCtx.drawImage(img, 0, 0, that.w, that.h);
      };

      this.img = img;
      const img1 = document.createElement("img");
      var blockCtx = that.blockCtx;
      var block_y = h || that.block_y;
      img1.onerror = () => {
        img1.src = that.miniimgurl;
      };
      img1.src = that.miniimgurl;
      img1.onload = function() {
        blockCtx.drawImage(img1, 0, block_y, 60, 60); // 小图宽高60
      };
      // console.log(img, img1, that.imgurl, that.miniimgurl)
    },
    refresh() {
      this.$emit("refresh");
    },
    sliderDown(event) {
      this.originX = event.clientX;
      this.originY = event.clientY;
      this.isMouseDown = true;
    },
    touchStartEvent(e) {
      this.originX = e.changedTouches[0].pageX;
      this.originY = e.changedTouches[0].pageY;
      this.isMouseDown = true;
    },
    bindEvents() {
      document.addEventListener("mousemove", e => {
        if (!this.isMouseDown) return false;
        const moveX = e.clientX - this.originX;
        const moveY = e.clientY - this.originY;
        if (moveX < 0 || moveX + 38 >= this.w) return false;
        this.sliderLeft = moveX + "px";
        // 小图的距离计算: 由于滑块和小图的宽可能不一致,所以不能直接把滑块的left赋值给小图的left
        // 当前示例: 小图宽60,滑块宽40, 
        // 计算出两者的比例(滑块和小图的宽,相差不要太大,否则可能会有对不齐的现象)
        let blockLeft = ((this.w - 60) / (this.w - 40)) * moveX;
        this.block.style.left = blockLeft + "px";

        this.containerActive = true; // add active
        this.sliderMaskWidth = moveX + "px";
        this.trail.push(moveY);
      });
      document.addEventListener("mouseup", e => {
        if (!this.isMouseDown) return false;
        this.isMouseDown = false;
        if (e.clientX === this.originX) return false;
        this.containerActive = false; // remove active
        this.verify();
      });
    },
    touchMoveEvent(e) {
      if (!this.isMouseDown) return false;
      const moveX = e.changedTouches[0].pageX - this.originX;
      const moveY = e.changedTouches[0].pageY - this.originY;
      if (moveX < 0 || moveX + 38 >= this.w) return false;
      this.sliderLeft = moveX + "px";
      let blockLeft = ((this.w - 60) / (this.w - 40)) * moveX;
      this.block.style.left = blockLeft + "px";

      this.containerActive = true;
      this.sliderMaskWidth = moveX + "px";
      this.trail.push(moveY);
    },
    touchEndEvent(e) {
      if (!this.isMouseDown) return false;
      this.isMouseDown = false;
      if (e.changedTouches[0].pageX === this.originX) return false;
      this.containerActive = false;
      this.verify();
    },
    verify() {
      const arr = this.trail; // drag y move distance
      const average = arr.reduce(sum) / arr.length; // average
      const deviations = arr.map(x => x - average); // deviation array
      const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length); // standard deviation
      const left = parseInt(this.block.style.left);
      this.$emit("success", left);
    },
    reset(h) {
      this.containerActive = false;
      this.containerSuccess = false;
      this.containerFail = false;
      this.sliderLeft = 0;
      this.block.style.left = 0;
      this.sliderMaskWidth = 0;
      this.canvasCtx.clearRect(0, 0, this.w, this.h);
      this.blockCtx.clearRect(0, 0, this.w, this.h);
      this.initImg(h);
    },
    handleFail() {
      this.fail = true
      this.showInfo = true
      this.infoText = '验证失败,请重试'
      this.containerFail = true
      // console.log(6666)
      setTimeout(() => {
        this.block.style.left = 0;
        this.sliderMaskWidth = 0;
        this.sliderLeft = 0;
        this.fail = false
        this.showInfo = false
        this.containerFail = false
      }, 500)
    },
    handleSuccess() {
      // console.log(777)
      this.showInfo = true
      this.infoText = '验证成功'
      this.containerSuccess = true
      setTimeout(() => {
        this.block.style.left = 0;
        this.sliderMaskWidth = 0;
        this.sliderLeft = 0;
        this.fail = false
        this.showInfo = false
        this.containerSuccess = false
      }, 1000)
    }
  }
};
</script>
<style scoped>
.slide-verify {
  position: relative;
  width: 310px;
}

.slide-verify-block {
  position: absolute;
  left: 0;
  top: 0;
}

.slide-verify-refresh-icon {
  position: absolute;
  right: 0;
  top: 0;
  width: 34px;
  height: 34px;
  cursor: pointer;
  content: '刷新';
  font-size: 22px;
  line-height: 34px;
  text-align: center;
  font-weight: bold;
  color: #3fdeae;
  /* background: url("../../assets/move/icon_light.png") 0 -437px; */
  background-size: 34px 471px;
}
.slide-verify-refresh-icon:hover {
  transform: rotate(180deg);
  transition: all 0.2s ease-in-out;
}

.slide-verify-slider {
  position: relative;
  text-align: center;
  width: 310px;
  height: 40px;
  line-height: 40px;
  margin-top: 15px;
  background: #f7f9fa;
  color: #45494c;
  border: 1px solid #e4e7eb;
}

.slide-verify-slider-mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  border: 0 solid #1991fa;
  background: #d1e9fe;
}

.slide-verify-info {
  position: absolute;
  top: 160px;
  left: 0;
  height: 40px;
  width: 410px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  background-color: #52ccba;
  opacity: 0;
}
.slide-verify-info.fail {
  background-color: #f57a7a;
}
.slide-verify-info.show {
  animation: hide 1s ease;
}
@keyframes hide {
  0% {opacity: 0;}
  100% {opacity: 0.9;}
}
.slide-verify-slider-mask-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background 0.2s linear;
}

.slide-verify-slider-mask-item:hover {
  background: #1991fa;
}

.slide-verify-slider-mask-item:hover .slide-verify-slider-mask-item-icon {
  background-position: 0 -13px;
}

.slide-verify-slider-mask-item-icon {
  position: absolute;
  top: 15px;
  left: 13px;
  width: 14px;
  height: 12px;
  /* background: url("../../assets/move/icon_light.png") 0 -26px; */
  background-size: 34px 471px;
}
.container-active .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #1991fa;
}

.container-active .slide-verify-slider-mask {
  height: 38px;
  border-width: 1px;
}

.container-success .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #52ccba;
  background-color: #52ccba !important;
}

.container-success .slide-verify-slider-mask {
  height: 38px;
  border: 1px solid #52ccba;
  background-color: #d2f4ef;
}

.container-success .slide-verify-slider-mask-item-icon {
  background-position: 0 0 !important;
}

.container-fail .slide-verify-slider-mask-item {
  height: 38px;
  top: -1px;
  border: 1px solid #f57a7a;
  background-color: #f57a7a !important;
}

.container-fail .slide-verify-slider-mask {
  height: 38px;
  border: 1px solid #f57a7a;
  background-color: #fce1e1;
}

.container-fail .slide-verify-slider-mask-item-icon {
  top: 14px;
  background-position: 0 -82px !important;
}

.container-active .slide-verify-slider-text,
.container-success .slide-verify-slider-text,
.container-fail .slide-verify-slider-text {
  display: none;
}
</style>
