<template>
  <div class="container">
    <h3>vue2-org-tree组件</h3>
    <div class="box1">
      <vue2-org-tree
        :data="richMediaData"
        :props="props"
        labelClassName="labelcss"
      />
    </div>
    <div class="box1">
      <vue2-org-tree
        :data="treedata"
        :horizontal="true"
        collapsable
        @on-expand="onExpand"
        labelClassName="labelcss2"
      />
    </div>
  </div>
</template>

<script>
import Vue2OrgTree from 'vue2-org-tree'
import 'vue2-org-tree/dist/style.css'

export default {
  name: 'treemap',
  components: { Vue2OrgTree },
  data() {
    return {
      treedata: {
        id: 0,
        label: "XXX科技有限公司",
        children: [
          {
            id: 2,
            label: "产品研发部",
            children: [
              {
                id: 5,
                label: "研发-前端"
              },
              {
                id: 6,
                label: "研发-后端"
              },
              {
                id: 9,
                label: "UI设计"
              },
              {
                id: 10,
                label: "产品经理"
              }
            ]
          },
          {
            id: 3,
            label: "销售部",
            children: [
              {
                id: 7,
                label: "销售一部"
              },
              {
                id: 8,
                label: "销售二部"
              }
            ]
          },
          {
            id: 4,
            label: "财务部"
          },
          {
            id: 9,
            label: "HR人事"
          }
        ]
      },
      richMediaData: {
        name: 'James',
        id: 800,
        children: [
          {
            name: 'Bob',
            id: 400,
            children: [
              {
                name: 'C1',
                id: 100
              },
              {
                name: 'C2',
                id: 300
              },
              {
                name: 'C3',
                id: 200
              }
            ]
          },
          {
            name: 'Smith',
            id: 200,
            children: [
              {
                name: 'S1',
                id: 230
              }
            ]
          },
          {
            name: 'Jackson',
            id: 300
          }
        ]
      },
      props: { label: 'name', children: 'children', expand: 'expand' }
    }
  },
  created() {
    this.handleExpand()
  },
  methods: {
    // 默认展开
    handleExpand() {
      this.$set(this.treedata, "expand", true)
      this.collapse(this.treedata.children, 'init')
    },
    collapse(list, isInit) {
      var _this = this;
      list.forEach(function(child) {
        if (child.expand) {
          this.$set(child, "expand", false)
          // child.expand = false
        }
        if (isInit) {
          this.$set(child, "expand", true)
        }
        child.children && _this.collapse(child.children)
      })
      console.log(this.treedata)
    },
    // 点击折叠
    onExpand(e,data) {
      console.log(2, data)
      if ("expand" in data) {
        data.expand = !data.expand
        if (!data.expand && data.children) {
          this.collapse(data.children)
        }
      } else {
        this.$set(data, "expand", true)
      }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .box1 {
    border: 1px solid gray;
    margin-bottom: 20px;
  }
}

.rich-media-node {
  width: 80px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: white;
  background-color: #f7c616;
  border-radius: 4px;
}
</style>

<style>
.labelcss {
  padding: 8px;
  color: white;
  background-color: #f7c616;
  border-radius: 4px;
}
.labelcss2 {
  padding: 8px;
  color: white;
  background-color: #e211e2;
  border-radius: 4px;
}
</style>
