<template>
  <div style="padding:30px;">
    <h2>后台返回数据动态合并(根据后台返回的数据进行表格合并)</h2>
    <p>博客连接:<a href="https://www.cnblogs.com/steamed-twisted-roll/p/9921867.html" target="_blank">https://www.cnblogs.com/steamed-twisted-roll/p/9921867.html</a></p>
    <p>
      两层数据合并
    </p>
    <el-table
      :data="tableData2"
      :span-method="arraySpanMethod2"
      border
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
      border
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
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      tableData2: []
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
            name: '器械1'
          }, {
            name: '器械2'
          }]
        }, {
          sortName: '软件',
          sortList: [{
            name: '软件1'
          }, {
            name: '软件2'
          }, {
            name: '软件3'
          }]
        }]
      }, {
        id: 2,
        region: '美国',
        type: [{
          sortName: '器械',
          sortList: [{
            name: '器械1'
          }, {
            name: '器械2'
          }]
        }, {
          sortName: '软件',
          sortList: [{
            name: '软件1'
          }, {
            name: '软件2'
          }]
        }]
      }, {
        id: 3,
        region: '加拿大',
        type: [{
          sortName: '器械',
          sortList: [{
            name: '器械1'
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
              if (i === 0) {
                obj.typeIndex = typeData.length
              }
              getDate.push(obj)
            } else if (subV.sortList && subV.sortList.length) {
              subV.sortList.forEach((ss, k, data) => {
                const obj = {
                  id: v.id,
                  region: v.region,
                  type: subV.sortName,
                  name: ss.name
                }
                if (k === 0) {
                  obj.typeIndex = data.length
                }
                getDate.push(obj)
                if (k === data.length - 1) {
                  a += data.length // 把所有类型下面的数据长度相加
                  if (i === typeData.length - 1) {
                    getDate[getDate.length - a ].nameIndex = a
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
      // 0: {id: 1, name: "器械1", nameIndex: 5, region: "中国", type: "器械", typeIndex: 2},
      // 1: {id: 1, name: "器械2", region: "中国", type: "器械"}
      // ....
      // 5: {id: 2, name: "器械1", nameIndex: 4, region: "美国", type: "器械", typeIndex: 2}
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
    }
  }
}
</script>
