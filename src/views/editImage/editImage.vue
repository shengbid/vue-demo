<template>
  <div>
    <div class="header">
      <h2>图形编辑</h2>
      <p>示例博客链接<a href="https://www.cnblogs.com/steamed-twisted-roll/p/13408245.html" target="_blank">https://www.cnblogs.com/steamed-twisted-roll/p/13408245.html</a></p>
    </div>
    <div class="container">
      <div class="box">
        <div class="img-box">
          <div class="flat">翻转</div>
          <div class="rotate">旋转</div>
          <div class="rotate1">旋转</div>
          <img src="@/assets/imgs/rotate1.jpg" alt="" class="img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  mounted() {
    this.initImage()
  },
  methods: {
    initImage() {
      var flat = -1
      // 镜像翻转
      $(".flat").click(function() {
        $(".img").css("transform", "scaleX("+flat+")")
        flat = -flat
      })

      var pointA = { // 元素中心点 元素1/2自身宽高 + 元素的定位
        X: $('.box').width() / 2 + $('.box').offset().left,
        Y: $('.box').height() / 2 + $('.box').offset().top
      };
      console.log(pointA, $('.box').position())

      var pointB = {};
      var pointC = {}; // A,B,C分别代表中心点，起始点，结束点坐标
      // 这里通过鼠标的移动获取起始点和结束点
      var typeMouse = false;
      var moveMouse = false;
      var allA = 0; // 存放鼠标旋转总共的度数
      var count = 0;
      var mPointB = {} // 移动的B点距离
      var init = {
        count: 0
      }
      var oldTarget = {
        target: null,
        angle: 0
      }

      // 元素跟随鼠标移动旋转拉伸
      $(".rotate, .rotate1").on('mousedown', function (e) {
        e.preventDefault()
        e.stopPropagation()
        // 计算两个旋转方块之间的角度
        var tanA = $('.box').width() / $('.box').height()
        var d = Math.round(Math.atan(tanA) * 180 / Math.PI)

        if (oldTarget.target && oldTarget.target != e.currentTarget) {
          if (e.currentTarget == $('.rotate')[0]) {
            oldTarget.angle = 2 * d
          } else {
            oldTarget.angle = -2 * d
          }
        } else {
          oldTarget.angle = 0
        }

        typeMouse = true; //获取起始点坐标
        if (count < 1) { // 以鼠标第一次落下的点为起点
          pointB.X = e.pageX;
          pointB.Y = e.pageY;
          init.count = 0
          oldTarget.target = e.currentTarget
          count++
        }
        if (mPointB.flag) { // 如果移动后,元素的B点也需要加上平移的距离
          pointB.X += mPointB.X
          pointB.Y += mPointB.Y
          mPointB.flag = false
          init.count = 0
        }
        console.log(5, pointA, pointB)

        $(document).on('mousemove', function (e) {
          e.preventDefault()
          if (typeMouse) {
            pointC.X = e.pageX;
            pointC.Y = e.pageY; // 获取结束点坐标
            // 计算每次移动元素的半径变化,用作拉伸
            var scalX1 = pointB.X - pointA.X
            var scalY1 = pointB.Y - pointA.Y
            var scalX = pointC.X - pointA.X
            var scalY = pointC.Y - pointA.Y

            // 计算出旋转角度
            var AB = {};
            var AC = {};
            AB.X = (pointB.X - pointA.X);
            AB.Y = (pointB.Y - pointA.Y);
            AC.X = (pointC.X - pointA.X);
            AC.Y = (pointC.Y - pointA.Y); // 分别求出AB,AC的向量坐标表示
            var direct = (AB.X * AC.Y) - (AB.Y * AC.X); // AB与AC叉乘求出逆时针还是顺时针旋转
            var lengthAB = Math.sqrt(Math.pow(pointA.X - pointB.X, 2) +
                Math.pow(pointA.Y - pointB.Y, 2)),
              lengthAC = Math.sqrt(Math.pow(pointA.X - pointC.X, 2) +
                Math.pow(pointA.Y - pointC.Y, 2)),
              lengthBC = Math.sqrt(Math.pow(pointB.X - pointC.X, 2) +
                Math.pow(pointB.Y - pointC.Y, 2));
            var cosA = (Math.pow(lengthAB, 2) + Math.pow(lengthAC, 2) - Math.pow(lengthBC, 2)) /
              (2 * lengthAB * lengthAC); //   余弦定理求出旋转角
            var angleA = Math.round(Math.acos(cosA) * 180 / Math.PI);
            if (direct < 0) {
              allA = -angleA; //叉乘结果为负表示逆时针旋转， 逆时针旋转减度数
            } else {
              allA = angleA; //叉乘结果为正表示顺时针旋转，顺时针旋转加度数
            }

            allA += oldTarget.angle
            // $('.img-box').css('transform', 'rotate('+allA+'deg)')

            // 计算出拉伸比例
            var sa = Math.sqrt(scalX1 * scalX1 + scalY1 * scalY1)
            var ss = Math.sqrt(scalX * scalX + scalY * scalY)
            var sc = ss / sa
            // console.log(allA, sc)
            $('.img-box').css('transform', 'rotate('+allA+'deg) scale('+sc+')')
          }
        });
      });

      // 元素移动
      $('.img').mousedown(function (e) {
        e.preventDefault()
        e.stopPropagation()
        moveMouse = true
        if (init.count < 1) {
          init = {
            X: e.pageX,
            Y: e.pageY,
            count: 1
          }
        }
        var dis = {
          X: e.pageX - $('.box').position().left,
          Y: e.pageY - $('.box').position().top
        }
        $(document).on('mousemove', function (event) {
          event.preventDefault()
          event.stopPropagation()
          if (moveMouse) {
            var end = {}
            end.X = event.pageX - dis.X
            end.Y = event.pageY - dis.Y
            $('.box').css({
              'left': end.X,
              'top': end.Y
            })
            // console.log($('.box').offset(), $('.box').position(), end, dis)

            pointA = { // 移动后,重新计算元素中心点 元素1/2自身宽高 + 元素的定位
              X: $('.box').width() / 2 + $('.box').offset().left,
              Y: $('.box').height() / 2 + $('.box').offset().top
            };
            if (count > 0) {
              mPointB.X = event.pageX - init.X
              mPointB.Y = event.pageY - init.Y
              mPointB.flag = true
            }
            // console.log(pointA, mPointB)
          }
        })
      })
      $(document).on('mouseup', function (e) {
        typeMouse = false;
        moveMouse = false
      })
    }
  }
}
</script>
<style scoped>
html, body {
    margin: 0;
    font-size: 14px;
  }
  .container {
    position: relative;
  }
  .box {
    position: absolute;
    left: 200px;
    top: 100px;
    width: 400px;
    height: 400px;
    color: #fff;
  }
  .img-box {
    position: absolute;
    width: 400px;
    height: 400px;
    background-color: sandybrown;
  }
  .flat {
    position: absolute;
    right: -20px;
    top: -20px;
    width: 40px;
    height: 40px;
    background-color: seagreen;
    z-index: 3;
    line-height: 40px;
    text-align: center;
    cursor: default;
  }
  .rotate, .rotate1 {
    position: absolute;
    right: -20px;
    bottom: -20px;
    width: 40px;
    height: 40px;
    background-color: royalblue;
    z-index: 3;
    cursor: se-resize;
    line-height: 40px;
    text-align: center;
  }
  .rotate1 {
    left: -20px;
    right: auto;
  }
  .img {
    width: 100%;
    height: 100%;
    cursor: move;
  }
  .header {
    height: 60px;
  }
</style>