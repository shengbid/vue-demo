<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
let _ = require('lodash')
export default {
  name: 'app',
  data() {
    return {
    }
  },
  created() {
    // this.test()
    // this.getData()
  },
  mounted() {
  },
  methods: {
    
    test () {
      // console.log(_.gt(3, 1))
      // console.log(_.gt(3, 3))
      // var users = [
      //   { 'user': 'barney',  'active': true },
      //   { 'user': 'fred',    'active': false },
      //   { 'user': 'pebbles', 'active': true }
      // ];
      // var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }]
      // var array2 = [{ 'x': 1 }, { 'x': 4 }]

      // let testtr = _.dropRightWhile(users, {'active': false});
      // let testtr2 = _.dropRightWhile(users, {'active': true});
      // let testtr3 = _.dropWhile(users, {'active': false});
      // let testtr4 = _.intersectionWith(users,[{'user': 'pebbles', 'active': true}], {'user': 'pebbles', 'active': true});
      let testtr5 = _.zip([11, 12], [21, 22, 23], [31, 32]);
      // console.log(testtr, testtr3)
      console.log(testtr5)
    },
    getData () {
      // let list = [
      //   {title: 'color', subList: ['red', 'yellow', 'green']},
      //   {title: 'size', subList: ['small', 'middle']},
      //   {title: 'price', subList: [100, 200, 300]}
      // ]
      // let arrs = this.recoursion(list)
      // 测试的数据
      let arrs = [['红','黄', '蓝'], ['大', '中', '小']]

      /**
       * 思路: 以第一项为基础,循环合并之后的每一项再循环的值
       * @param {*} acc 累计的值
       * @param {*} cur 当前遍历项
       * @param {*} index 当前遍历索引
       */ 
      let result = arrs.reduce((acc, cur, index) => {
        // 从第二项开始合并值
        if (index > 0) {
          let saveArr = []
          acc.forEach(item => {
            cur.forEach(subItem => {
              saveArr.push(`${item},${subItem}`)
            })
          })
          acc = saveArr
        }
        return acc
      }, arrs[0]) // 把数组的第一项传入作为初始值
      console.log(result)
    },
    recoursion (list, arr) {
      let curArr = []
      if (list.length) {
        list.some(item => {
          let str = ''
          let curSubArr = []
          item.subList && item.subList.some(subItem => {
            str = `${item.title}:${subItem}`
            curSubArr.push(str)
          })
          curArr.push(curSubArr)
        })
      }
      return curArr
    },
    mathData (list) {
      list.reduce((acc, cur) => {
        let arr = []
        acc.forEach(item => {
          cur.forEach(subItem => {
            arr.push(`${item},${subItem}`)
          })
        })
        acc = arr
        return acc
      }, list[0])
    }
  }
}
</script>

<style>
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;
}
ul {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
