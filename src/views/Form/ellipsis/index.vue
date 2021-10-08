<template>
 <div class="ellipsis-contanier">
  <h2>超过指定行显示省略号</h2>

  <p>单行省略</p>
  <div class="singe-line box" :title="content">
    {{ content }}
  </div>
  <p>两行省略</p>
  <div class="box">
    <div class="double-line" :title="content2">
      {{ content2 }}
    </div>
  </div>
  <p>三行省略</p>
  <div class="box">
    <div class="three-line" :title="content">
      {{ content }}
    </div>
  </div>
  <p>超过元素宽高省略</p>
  <div class="box">
    <div class="over-line" :title="content">
      {{ content }}
    </div>
  </div>
  <p>字符截取省略</p>
  <div class="box">
    <div class="assign-line" :title="content">
      {{ content3 }}
    </div>
  </div>
  <div class="box">
    <div class="assign-line" :title="content">
      {{ content4 }}
    </div>
  </div>
 </div>
</template>

<script>

export default {
  data () {
    return {
      content: 'ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs. In many ways, it is similar to JSLint and JSHint with a few exceptions:',
      content2: 'vue.config.js 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。你也可以使用 package.json 中的 vue 字段，但是注意这种写法需要你严格遵照 JSON 的格式来写。',
      content3: '',
      content4: ''
    }
  },

  created(){
    this.handleontent()
  },

  methods: {
    handleontent() {
      this.content3 = `${this.content.substring(0, 80)} ...`
      this.content4 = `${this.content2.substring(0, 80)} ...`
    }
  }
}
</script>

<style lang="less" scoped>
.ellipsis-contanier {
  .box {
    width: 500px;
    border: 1px solid red;
    padding: 10px;
    line-height: 24px;
  }

  .singe-line {
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    white-space: nowrap;
  }
  .double-line {
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .three-line {
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .over-line {
    height: 65px;
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .assign-line {
    height: 45px;
    word-break: break-all;
  }
}
</style>
