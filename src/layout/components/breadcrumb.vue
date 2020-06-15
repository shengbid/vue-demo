<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(item, i) in breadList"
      :key="i"
    >{{ item }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  import menus from '@/router/menu'

  export default {
    data() {
      return {
        breadList: []
      }
    },
    watch: {
      $route(route) {
        // console.log(77, route.path)
        this.getBreadData(route)
      }
    },
    created() {
      // console.log(66, this.$route)
      this.getBreadData(this.$route)
    },
    methods: {
      getBreadData(route) {
        this.breadList = []
        const matchs = route.path.split('/')
        matchs.shift()
        if (matchs.length < 2) {
          this.breadList.push(route.meta.title)
          return
        }
        const newMatch = []
        matchs.map((item, i) => {
          if (matchs[i - 1]) {
            item = newMatch[i - 1] + '/' + item
          }
          newMatch.push(item)
        })
        const arr = []
        newMatch.forEach(item => {
          const matchFun = (menusData) => {
            menusData.some(subItem => {
              if (subItem.path === `/${item}`) {
                arr.push(subItem.meta.title)
                return true
              } else if (subItem.children && subItem.children) {
                matchFun(subItem.children)
              }
            })
          }
          matchFun(menus)
        })
        this.breadList = arr
        // this.breadList.push(route.meta.title)
        // console.log(88, arr, this.breadList)
      }
    }
  }
</script>