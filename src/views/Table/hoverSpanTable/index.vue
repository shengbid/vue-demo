<template>
  <div style="padding:30px;">
    <h2>后台返回数据动态合并hover样式处理</h2>
    <p>鼠标移入其他行,合并部分高亮.博客连接:<a href="https://www.cnblogs.com/steamed-twisted-roll/p/10469887.html" target="_blank">https://www.cnblogs.com/steamed-twisted-roll/p/10469887.html</a></p>
    <p>
      两层数据合并
    </p>
    <el-table
      :data="tableData2"
      :span-method="arraySpanMethod2"
      :row-class-name="setCellClass"
      border
      @cell-mouse-enter="handleMouse"
      @cell-mouse-leave="handleMouseLeve"
      style="width: 100%;"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="180"
      />
      <el-table-column
        prop="region"
        label="地区"
      />
      <el-table-column
        prop="type"
        label="类型"
      />
    </el-table>
    <!-- 表格2 -->
    <p style="margin-top: 40px">
      三层数据合并
    </p>
    <el-table
      :data="tableData"
      :span-method="arraySpanMethod"
      :row-class-name="isCell2 ? setCellClass2 : ''"
      border
      @cell-mouse-enter="handleMouse2"
      @cell-mouse-leave="handleMouseLeve2"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="180"
      />
      <el-table-column
        prop="region"
        label="地区"
      />
      <el-table-column
        prop="type"
        label="类型"
      />
      <el-table-column
        prop="name"
        label="产业"
      />
      <el-table-column
        prop="price"
        label="价格"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'hoverSpanTable',
  data() {
    return {
      tableData: [],
      tableData2: [],
      cellIndex: null,
      isCell: false,
      isCell2: false,
      twoCellIndex: null,
      thirdCellIndex: null
    }
  },
  created() {
    this.getTable()
  },
  methods: {
    getTable() {
      const tableData = [{
        id: 1,
        region: '中国',
        type: [{
          sortName: '器械',
          sortList: [{
            name: '器械1',
            price: 7888
          }, {
            name: '器械2',
            price: 7888
          }]
        }, {
          sortName: '器械',
          sortList: [{
            name: '器械2',
            price: 67555
          }, {
            name: '器械3',
            price: 1233
          }]
        }, {
          sortName: '软件',
          sortList: [{
            name: '软件1',
            price: 5666
          }, {
            name: '软件2',
            price: 78885
          }, {
            name: '软件3',
            price: 10000
          }]
        }]
      }, {
        id: 2,
        region: '美国',
        type: [{
          sortName: '器械',
          sortList: [{
            name: '器械1',
            price: 2000
          }, {
            name: '器械2',
            price: 3333
          }]
        }, {
          sortName: '软件',
          sortList: [{
            name: '软件1',
            price: 23333
          }, {
            name: '软件2',
            price: 7000
          }]
        }]
      }, {
        id: 3,
        region: '加拿大',
        type: [{
          sortName: '器械',
          sortList: [{
            name: '器械1',
            price: 3000
          }]
        }]
      }]
      this.dealTable(tableData)
      this.dealTable(tableData, 2)
    },
    // 处理表格数据(level,表格合并的层级)
    dealTable(tableData, level = 3) {
      const getDate = [] // 存储新表格数据
      let a // id,地区需要合并的行是所有类型的长度
      let firstIndex = 0 // 储存需要设置hover背景色的单元行(两层)
      // let firstIndex2 = 0 // 储存需要设置hover背景色的单元行(三层)
      tableData.forEach((v, index) => {
        if (v.type && v.type.length) {
          a = 0
          v.type.forEach((subV, i, typeData) => {
            if (level === 2) { // 处理两层合并数据
              const obj = {
                id: v.id,
                region: v.region,
                type: subV.sortName
              }
              obj.index = getDate.length
              if (i === 0) {
                obj.typeIndex = typeData.length
                firstIndex = obj.index
              } else {
                obj.firstIndex = firstIndex // 存储第一行索引
              }
              getDate.push(obj)
            } else if (subV.sortList && subV.sortList.length) {
              subV.sortList.forEach((ss, k, data) => {
                const obj = {
                  id: v.id,
                  region: v.region,
                  type: subV.sortName,
                  name: ss.name,
                  price: ss.price
                }
                obj.index = getDate.length
                if (k === 0) {
                  obj.typeIndex = data.length
                  firstIndex = obj.index
                } else {
                  obj.firstIndex = firstIndex // 存储两层合并的第一行索引
                }
                getDate.push(obj)
                if (k === data.length - 1) {
                  a += data.length // 把所有类型下面的数据长度相加
                  if (i === typeData.length - 1) {
                    getDate[getDate.length - a ].nameIndex = a
                    // 存储三层合并的第一行索引
                    for (let i = getDate.length - a + 1; i < getDate.length; i++) {
                      getDate[i].firstIndex2 = getDate.length - a
                    }
                  }
                }
              })
            }
          })
        }
      })
      if (level === 2) {
        this.tableData2 = getDate
      } else {
        this.tableData = getDate
      }
      console.log(getDate)
    },
    // 表格合并方法(三层数据)
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        if (row.nameIndex) { // 如果有值,说明需要合并
          return [row.nameIndex, 1]
        } else return [0, 0]
      }
      if (columnIndex === 2) {
        if (row.typeIndex) {
          return [row.typeIndex, 1]
        } else return [0, 0]
      }
    },
    // 表格合并方法(两层数据)
    arraySpanMethod2({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        if (row.typeIndex) { // 如果有值,说明需要合并
          return [row.typeIndex, 1]
        } else return [0, 0]
      }
    },
    /** ------------------两层合并鼠标移入----------------- */
    // 单元格移入事件
    handleMouse (row, column, cell, event) {
      if (!row.typeIndex) { // 不符合合并行的条件手动加class
        // 只能给第一行加才有效, 把之前保存的第一行的索引存起来
        this.cellIndex = row.firstIndex
        // console.log(99, this.cellIndex, row.firstIndex)
        this.isCell = true
      }
    },
    // 单元格移除事件
    handleMouseLeve () {
      this.isCell = false
    },
    // 设置行样式
    setCellClass ({row, column, rowIndex, columnIndex}) {
      // 给当前鼠标移入的合并行第一行加上样式名
      // console.log(55, this.cellIndex, row.firstIndex)
      if (this.isCell && row.index === this.cellIndex) {
        return 'cellClass'
      }
    },
    /** ----------------------end----------------------------- */
    /** ------------------三层合并鼠标移入----------------- */
    // 单元格移入事件
    handleMouse2 (row, column, cell, event) {
      if (!row.nameIndex) { // 不符合合并行的条件手动加class
        // 只能给第一行加才有效, 把之前保存的第一行的索引存起来
        this.twoCellIndex = row.firstIndex
        this.thirdCellIndex = row.firstIndex2
        this.isCell2 = true
      }
    },
    // 单元格移除事件
    handleMouseLeve2 () {
      this.isCell2 = false
    },
    // 设置行样式
    setCellClass2 ({row, column, rowIndex, columnIndex}) {
      // 给当前鼠标移入的合并行第一行加上样式名
      let cssName = ''
      if (row.index === this.twoCellIndex) { // 两层合并的行添加样式
        cssName = 'twoCellClass'
      }
      if (row.index === this.thirdCellIndex) { // 三层合并的行添加样式
        cssName += ' thirdCellClass'
      }
      return cssName
    }
  }
}
</script>

<style lang="less">
.el-table {
  // 两层合并的样式部分
  .cellClass {
    td:nth-child(1) {
      background-color: #f5f7fa;
    }
    td:nth-child(2) {
      background-color: #f5f7fa;
    }
  }
  // 三层合并的样式部分
  .twoCellClass {
    td:nth-child(1) {
      background-color: #f5f7fa;
    }
    &.thirdCellClass {
       td:nth-child(3) {
        background-color: #f5f7fa;
      }
    }
  }
  .thirdCellClass {
    td:nth-child(1) {
      background-color: #f5f7fa;
    }
    td:nth-child(2) {
      background-color: #f5f7fa;
    }
  }
}
</style>