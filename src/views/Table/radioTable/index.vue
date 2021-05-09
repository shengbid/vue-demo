<template>
  <div class="radiotable-container">
    <h2>单选表格</h2>
    <p>博客连接:<a href="https://www.cnblogs.com/steamed-twisted-roll/p/10120106.html#4859837" target="_blank">https://www.cnblogs.com/steamed-twisted-roll/p/10120106.html#4859837</a></p>
    <p>样式切换后,选择数据会保留,因为这里只是展示两种效果,数据没有过多处理</p>

    <div style="padding-bottom:20px">
      <el-radio v-model="type" label="1">checkbox</el-radio>
      <el-radio v-model="type" label="2">radio</el-radio>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      highlight-current-row
      style="width: 100%"
      class="radiotable"
      @current-change="handleSelectionChange">
      <el-table-column
        label="操作"
        width="55">
        <template slot-scope="scope">
          <el-checkbox v-if="type==='1'" v-model="scope.row.checked"></el-checkbox>
          <el-radio v-else v-model="checked" :label="scope.row.id"></el-radio>
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div style="padding-top: 20px">
      <el-button v-if="type==='1'" @click="save" type="primary">保存数据</el-button>
      <el-button v-else @click="save2" type="primary">保存数据</el-button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'shopInfo',

    data () {
      return {
        tableData3: [],
        type: '1',
        checked: null, // 如果使用单选框,定义一个model值
        currentSelectItem: {} // 当前选中的值
      }
    },

    created () {
      this.setTable()
    },

    methods: {
      setTable () {
        let resdata = [{
          id: 44,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 89,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 23,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 88,
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
        // 后台数据返回后,手动添加一个checked属性控制选中与否 如果是使用el-rodio单选框,不需要这一步
        resdata.forEach(item => {
          item.checked = false
        })
        this.tableData3 = resdata
      },

      handleSelectionChange (row) {
        // el-radio单选框,不需要这一步
        this.tableData3.forEach(item => {
          // 排他,每次选择时把其他选项都清除
          if (item.id !== row.id) {
            item.checked = false
          }
        })
        // console.log(row)
        // 如果使用单选框,这里可以把当前选中的这一项先保存起来
        this.currentSelectItem = row
      },

      // 保存数据
      save() {
        // 多选框
        const arr = this.tableData3.filter(item => {
          return item.checked
        })
        console.log(arr)
        if (!arr.length) {
          this.$message('请先选择一条数据')
        }
      },

      save2 () {
        // 单选框
        if (!this.checked) {
          this.$message('请先选择一条数据')
        }
        console.log(this.currentSelectItem)
      }
    }
  }
</script>

<style lang="less">
.radiotable-container {
  .radiotable {
    .el-radio__label {
      display: none;
    }
  }
}
</style>