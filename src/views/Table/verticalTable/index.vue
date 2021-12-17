<template>
  <div class="table-container">
    <h2>纵向表格</h2>
    <el-table
      :data="tableData3"
      style="width: 100%"
      border
      :header-cell-class-name="handleHeaderName"
      :cell-class-name="handleCellName"
      class="verticaltable">
      <el-table-column
        prop="title"
        width="160">
         <template slot="header">
           <div class="line-box">日期
             <div class="line"></div>
           </div>
         </template>
      </el-table-column>
      <template v-for="(item, i) in titles">
        <el-table-column
          :key="i"
          :label="item.label"
          :prop="item.prop">
        </el-table-column>
      </template>
      <!-- <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
    name: 'verticalTable',

    data () {
      return {
        titles: [],
        tableData3: [],
      }
    },

    created () {
      this.setTable()
    },

    methods: {
      setTable () {
        let resdata = [{
          id: 44,
          date: '2016-07-03',
          name: '王小虎1',
          count: 900,
          status: '正常',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 89,
          date: '2016-06-02',
          name: '王小虎2',
          count: 400,
          status: '正常',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 23,
          date: '2016-05-04',
          name: '王小虎3',
          count: 900.88,
          status: '正常',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 88,
          date: '2016-04-07',
          name: '王小虎4',
          count: 9880,
          status: '正常',
          address: '中国上海市普陀区金沙江路往里小区3A栋9层0918号***********'
        }]
        const keys = [
          { key: '名称', prop: 'name'},
          { key: '数量', prop: 'count'},
          { key: '状态', prop: 'status'},
          { key: '地址', prop: 'address'},
        ]
        // 后台数据返回后,手动添加一个checked属性控制选中与否 如果是使用el-rodio单选框,不需要这一步
        resdata.forEach((item, i) => {
          this.titles.push({
            label: item.date,
            prop: `year${i}`
          })
        })
        const arr = []
        keys.forEach((item, i) => {
          const obj = {
            title: item.key
          }
          this.titles.forEach((ss, si) => {
            obj[`year${si}`] = resdata[si][item.prop]
          })
          arr.push(obj)
        })
        console.log(arr);
        this.tableData3 = arr
      },

      // 处理表格左侧标题样式
      handleCellName({columnIndex}) {
        if (columnIndex === 0) {
          return 'titlecss'
        }
      },
      // 处理表格头左侧标题样式
      handleHeaderName({columnIndex}) {
        if (columnIndex === 0) {
          return 'alltitle titlecss'
        }
        return 'titlecss'
      }
    }
  }
</script>

<style lang="less">
.table-container {
  .verticaltable {
    .titlecss {
      background-color: #a6c5f3;
      font-weight: bold;
    }
    .alltitle {
      .cell {
        overflow: unset;
      }
    }
    .line-box {
      position: relative;
      text-align: right;
      .line {
        position: absolute;
        width: 200px;
        height: 1px;
        top: 13px;
        left: -23px;
        background-color: #fff;
        transform: rotate(16deg);
      }
    }
    .el-table__row:hover {
      .titlecss {
        background-color: #a6c5f3;
      }
    }
  }
}
</style>