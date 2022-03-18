<template>
  <div>
    <h3>el-table异步树形表格
    </h3>
    <p>博客链接:
      <a href="https://www.cnblogs.com/steamed-twisted-roll/p/16018046.html" target="_blank">https://www.cnblogs.com/steamed-twisted-roll/p/16018046.html</a>
    </p>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      lazy
      :load="loadData"
      :tree-props="{hasChildren: 'hasChildren'}">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button
            size="mini"
            >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTableData } from '@/service/list'

export default {
  data () {
    return {
      tableData: []
    }
  },

  created() {
    this.getData()
  },

  methods: {
    // 获取表格数据
    async getData () {
      const { data } = await getTableData()
      this.tableData = data.map((item, i) => {
        if (i === 2) {
          return {
            ...item,
            hasChildren: false
          }
        }
        return {
          ...item,
          hasChildren: true
        }
      })
    },

    // 获取子级数据
    loadData (row, treeNode, resolve) {
      console.log(row, treeNode)
      getTableData({id: row.id, level: row.level}).then(res => {
        // 懒加载延时效果
        // setTimeout(() => {
        //   resolve(res.data)
        // }, 1000)
        resolve(res.data.map((item, i) => {
          if (i === 1 && row.level < 4) {
            return {
              ...item,
              hasChildren: true
            }
          }
          return item
        }))
      })
    }
  }
}
</script>