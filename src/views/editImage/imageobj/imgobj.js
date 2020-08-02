import $ from 'jquery'

export default function EditImage(params) {
  if (!params.id) {
    return
  }
  this.imgUrl = params.imgUrl
  this.width = params.width || 400
  this.height = params.height || 400
  this.miniWidth = params.miniWidth || 40
  this.miniHeight = params.miniHeight || 40
  this.flatContent = params.flatContent || '翻转'
  this.rotate1Content = params.rotate1Content || '旋转'
  this.rotate2Content = params.rotate2Content || '旋转'
  var box = $(` <div class="imgobj-box">
    <div class="imgobj-img-box">
      <div class="imgobj-minibox imgobj-flat"></div>
      <div class="imgobj-minibox imgobj-rotate"></div>
      <div class="imgobj-minibox imgobj-rotate1"></div>
      <img src="${this.imgUrl}" alt="" class="imgobj-img">
    </div>
  </div>`)
  console.log(this.rotate2Content)
  $(`#${params.id}`).addClass('imgobj-container-box')
  $(`#${params.id}`).append(box)
  $(`#${params.id} .imgobj-flat`).html(this.flatContent)
  $(`#${params.id} .imgobj-rotate`).html(this.rotate1Content)
  $(`#${params.id} .imgobj-rotate1`).html(this.rotate2Content)

  $('.imgobj-container-box .imgobj-box').css({
    'width': this.width,
    'height': this.height
  })
  $('.imgobj-container-box .imgobj-minibox').css({
    'width': this.miniWidth,
    'height': this.miniHeight,
    'line-height': this.miniHeight + 'px'
  })
  $('.imgobj-container-box .imgobj-flat').css({
    'right': -this.miniWidth / 2,
    'top': -this.miniHeight / 2
  })
  $('.imgobj-container-box .imgobj-rotate').css({
    'right': -this.miniWidth / 2,
    'bottom': -this.miniHeight / 2
  })
  $('.imgobj-container-box .imgobj-rotate1').css({
    'left': -this.miniWidth / 2,
    'bottom': -this.miniHeight / 2
  })

  this.pointA = { // 元素中心点 元素1/2自身宽高 + 元素的定位
    X: $(`#${params.id} .imgobj-box`).width() / 2 + $(`#${params.id} .imgobj-box`).offset().left,
    Y: $(`#${params.id} .imgobj-box`).height() / 2 + $(`#${params.id} .imgobj-box`).offset().top
  }
  this.pointB = {};
  this.pointC = {}; // A,B,C分别代表中心点，起始点，结束点坐标
  this.typeMouse = false // 旋转拉伸
  this.moveMouse = false // 移动
  this.allA = 0 // 存放鼠标旋转总共的度数
  this.count = 0 // 计算存放pointB点的次数
  this.mPointB = {} // 移动的B点距离
  this.flat = -1 // 镜像翻转的方向
  this.init = {
    count: 0 // 计算元素移动的次数
  }
  this.oldTarget = { // 区分旋转位置
    target: null,
    angle: 0
  }
  // 
  this.flatImg()
  this.rotate()
  this.move()
  this.mouseup()
}

// 翻转
EditImage.prototype.flatImg = function () {
  var _this = this
  $(".imgobj-container-box .imgobj-flat").click(function() {
    $(".imgobj-container-box .imgobj-img").css("transform", "scaleX("+_this.flat+")")
    _this.flat = -_this.flat
  })
}

// 旋转
EditImage.prototype.rotate = function () {
  var _this = this
  $(".imgobj-container-box .imgobj-rotate, .imgobj-container-box .imgobj-rotate1").on('mousedown', function (e) {
    e.preventDefault()
    e.stopPropagation()

    if (_this.oldTarget.target && _this.oldTarget.target != e.currentTarget) {
      // 计算两个旋转方块之间的角度
      var tanA = _this.width / _this.height
      var d = Math.round(Math.atan(tanA) * 180 / Math.PI)

      if (e.currentTarget == $('.imgobj-container-box .imgobj-rotate')[0]) {
        _this.oldTarget.angle = 2 * d
      } else {
        _this.oldTarget.angle = -2 * d
      }
    } else {
      _this.oldTarget.angle = 0
    }

    _this.typeMouse = true; //获取起始点坐标
    if (_this.count < 1) { // 以鼠标第一次落下的点为起点
      _this.pointB.X = e.pageX;
      _this.pointB.Y = e.pageY;
      _this.init.count = 0
      _this.oldTarget.target = e.currentTarget
      _this.count++
    }
    if (_this.mPointB.flag) {
      _this.pointB.X += _this.mPointB.X
      _this.pointB.Y += _this.mPointB.Y
      _this.mPointB.flag = false
      _this.init.count = 0
    }

    console.log(_this.pointA, _this.pointB)
    $(document).on('mousemove', function (e) {
      e.preventDefault()
      if (_this.typeMouse) {
        _this.pointC.X = e.pageX;
        _this.pointC.Y = e.pageY; // 获取结束点坐标
        // 计算每次移动元素的半径变化,用作拉伸
        var scalX1 = _this.pointB.X - _this.pointA.X
        var scalY1 = _this.pointB.Y - _this.pointA.Y
        var scalX = _this.pointC.X - _this.pointA.X
        var scalY = _this.pointC.Y - _this.pointA.Y

        // 计算出旋转角度
        var AB = {};
        var AC = {};
        AB.X = (_this.pointB.X - _this.pointA.X);
        AB.Y = (_this.pointB.Y - _this.pointA.Y);
        AC.X = (_this.pointC.X - _this.pointA.X);
        AC.Y = (_this.pointC.Y - _this.pointA.Y); // 分别求出AB,AC的向量坐标表示
        var direct = (AB.X * AC.Y) - (AB.Y * AC.X); // AB与AC叉乘求出逆时针还是顺时针旋转
        var lengthAB = Math.sqrt(Math.pow(_this.pointA.X - _this.pointB.X, 2) +
            Math.pow(_this.pointA.Y - _this.pointB.Y, 2)),
          lengthAC = Math.sqrt(Math.pow(_this.pointA.X - _this.pointC.X, 2) +
            Math.pow(_this.pointA.Y - _this.pointC.Y, 2)),
          lengthBC = Math.sqrt(Math.pow(_this.pointB.X - _this.pointC.X, 2) +
            Math.pow(_this.pointB.Y - _this.pointC.Y, 2));
        var cosA = (Math.pow(lengthAB, 2) + Math.pow(lengthAC, 2) - Math.pow(lengthBC, 2)) /
          (2 * lengthAB * lengthAC); //   余弦定理求出旋转角
        var angleA = Math.round(Math.acos(cosA) * 180 / Math.PI);
        if (direct < 0) {
          _this.allA = -angleA; //叉乘结果为负表示逆时针旋转， 逆时针旋转减度数
        } else {
          _this.allA = angleA; //叉乘结果为正表示顺时针旋转，顺时针旋转加度数
        }

        _this.allA += _this.oldTarget.angle
        // $('.img-box').css('transform', 'rotate('+allA+'deg)')

        // 计算出拉伸比例
        var sa = Math.sqrt(scalX1 * scalX1 + scalY1 * scalY1)
        var ss = Math.sqrt(scalX * scalX + scalY * scalY)
        var sc = ss / sa
        // console.log(allA, sc)
        $('.imgobj-container-box .imgobj-img-box').css('transform', 'rotate('+_this.allA+'deg) scale('+sc+')')
      }
    })
  })
}

// 移动
EditImage.prototype.move = function () {
  var _this = this
  $(`.imgobj-container-box .imgobj-img`).mousedown(function (e) {
    // e.preventDefault()
    // e.stopPropagation()
    _this.moveMouse = true
    if (_this.init.count < 1) {
      _this.init = {
        X: e.pageX,
        Y: e.pageY,
        count: 1
      }
    }
    var dis = {
      X: e.pageX - $(`.imgobj-container-box .imgobj-box`).position().left,
      Y: e.pageY - $(`.imgobj-container-box .imgobj-box`).position().top
    }
    $(document).on('mousemove', function (event) {
      event.preventDefault()
      event.stopPropagation()
      if (_this.moveMouse) {
        var end = {}
        end.X = event.pageX - dis.X
        end.Y = event.pageY - dis.Y
        $(`.imgobj-container-box .imgobj-box`).css({
          'left': end.X,
          'top': end.Y
        })
        // console.log($(`.imgobj-container-box .box`).offset(), $(`.imgobj-container-box .box`).position(), end, dis)

        _this.pointA = { // 元素中心点 元素1/2自身宽高 + 元素的定位
          X: $(`.imgobj-container-box .imgobj-box`).width() / 2 + $(`.imgobj-container-box .imgobj-box`).offset().left,
          Y: $(`.imgobj-container-box .imgobj-box`).height() / 2 + $(`.imgobj-container-box .imgobj-box`).offset().top
        };
        if (_this.count > 0) {
          _this.mPointB.X = event.pageX - _this.init.X
          _this.mPointB.Y = event.pageY - _this.init.Y
          _this.mPointB.flag = true
        }
        // console.log(pointA, mPointB)
      }
    })
  })
}

EditImage.prototype.mouseup = function () {
  var _this = this
  $(document).on('mouseup', function () {
    _this.typeMouse = false
    _this.moveMouse = false
  })
}