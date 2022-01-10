<template>
  <div style="padding:30px;">
    <h2>可折叠可选择表格(奇奇怪怪的需求)</h2>
    <div class="contanier">

      <div class="flat-contanier">
        <el-table
          ref="checkTable"
          :data="tableData"
          border
          style="width: 100%"
          :row-style="rowStyle"
        >
          <el-table-column
            label="一级"
            prop="firstName"
          >
            <template slot-scope="scope">
              <el-checkbox 
                v-if="scope.row.threeRowSpan"
                v-model="scope.row.firstchecked" 
                :indeterminate="scope.row.firstindeterminate"
                @change="(val) => changeFirst(val, scope.row.firstId)"
              ></el-checkbox>
              {{scope.row.threeRowSpan ? scope.row.firstName : ''}}
              <i 
                v-if="scope.row.threeRowSpan" 
                @click="clickFirstCell(scope.row)"
                :class="scope.row.firstCollpase ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
            </template>
          </el-table-column>
          <el-table-column
            label="二级"
            prop="secondName"
          >
            <template slot-scope="scope">
              <el-checkbox 
                v-if="scope.row.twoRowSpan"
                v-model="scope.row.secondtchecked" 
                :indeterminate="scope.row.seconddeterminate"
                @change="(val) => changeTwo(val, scope.row)"
              ></el-checkbox>
              {{scope.row.twoRowSpan ? scope.row.secondName : ''}}
              <i 
                v-if="scope.row.twoRowSpan" 
                @click="clickSecondCell(scope.row)"
                :class="scope.row.secondCollpase ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
              ></i>
            </template>
          </el-table-column>
          <el-table-column
            label="三级"
            prop="thirdName"
          >
            <template slot-scope="scope">
              <el-checkbox 
                v-model="scope.row.threechecked"
                @change="(val) => changeThree(val, scope.row)"
              ></el-checkbox>
              {{scope.row.thirdName}}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      table: [
        {
          id: '1-1',
          name: '一级模块名称1-1',
          children: [
            {
              id: '1-1-1',
              name: '二级模块名称1',
              children: [
                {
                  id: '1-1-1-1',
                  name: '三级模块名称1',
                },
                {
                  id: '1-1-1-2',
                  name: '三级模块名称2',
                },
                {
                  id: '1-1-1-3',
                  name: '三级模块名称3',
                }
              ]
            },
            {
              id: '1-1-2',
              name: '二级模块名称1',
              children: [
                {
                  id: '1-1-2-1',
                  name: '三级模块名称1',
                },
                {
                  id: '1-1-2-2',
                  name: '三级模块名称2',
                },
                {
                  id: '1-1-2-3',
                  name: '三级模块名称3',
                }
              ]
            }
          ]
        },
        {
          id: '1-2',
          name: '一级模块名称1-2',
          children: [
            {
              id: '1-2-1',
              name: '二级模块名称1',
              children: [
                {
                  id: '1-2-1-1',
                  name: '三级模块名称1',
                },
                {
                  id: '1-2-1-2',
                  name: '三级模块名称2',
                },
                {
                  id: '1-2-1-3',
                  name: '三级模块名称3',
                }
              ]
            },
            {
              id: '1-2-2',
              name: '二级模块名称1',
              children: [
                {
                  id: '1-2-2-1',
                  name: '三级模块名称1',
                },
              ]
            }
          ]
        },
        {
          id: '2-1',
          name: '一级模块名称2',
          children: [
            {
              id: '2-1-1',
              name: '二级模块名称2',
              children: [
                {
                  id: '2-1-1-1',
                  name: '三级模块名称1',
                },
                {
                  id: '2-1-1-2',
                  name: '三级模块名称2',
                },
                {
                  id: '2-1-1-3',
                  name: '三级模块名称3',
                }
              ]
            },
            {
              id: '2-1-2',
              name: '二级模块名称1',
              children: [
                {
                  id: '2-1-2-1',
                  name: '三级模块名称1',
                },
                {
                  id: '2-1-2-2',
                  name: '三级模块名称2',
                }
              ]
            }
          ]
        }
      ]
    }
  },
  created() {
    this.getTableData(this.table)
  },
  mounted() {
  },
  methods: {
    // 获取表格数据
    getTableData(table) {

      const newData = []

      table.map((item, i) => {
        if (item.children && item.children.length) {
          item.children.map((ss, si) => {
            if (ss.children && ss.children.length) {
              ss.children.map((tt, ti) =>{
                const newItem = {
                  index: i + 1,
                  firstId: item.id, // 第一级id
                  secondId: ss.id, // 第二级id
                  threeId: tt.id, // 第三级id
                  firstindeterminate: item.indeterminate, // 第一级未全选样式
                  firstchecked: item.checked, // 第一级是否选中
                  firstCollpase: item.collpase || false,
                  seconddeterminate: ss.indeterminate,
                  secondtchecked: ss.checked,
                  secondCollpase: ss.collpase || false,
                  threechecked: tt.checked,
                  firstName: item.name,
                  secondName: ss.name,
                  thirdName: tt.name,
                  threeCollpase: tt.collpase || false
                }
                // 三级合并的行数,当前item所有子级children的长度, 第一列, 层级3
                if (si === 0 && ti === 0) {
                  newItem.threeRowSpan = item.children.reduce((a, b) => {
                    // console.log(a, b)
                    return a + b.children.length
                  }, 0)
                }
                // 二级合并的行,当前子级children的长度, 第二列, 层级2
                if (ti === 0) {
                  newItem.twoRowSpan = ss.children.length
                }

                newData.push(newItem)
              })
            }
          })
        }
      })

      this.tableData = newData
      // console.log(this.tableData)
    },

    // 点击第一列多选框
    changeFirst(val, id) {
      // console.log('选中的表格', val)
      const isCheck = val
      let arr = []
      const reducer = (table, isChild) => {
        arr = table.map(item => {
          if(item.id === id || isChild) {
            if (item.children) {
              reducer(item.children, 1)
            }
            item.checked = isCheck
            item.indeterminate = false
          }
          return item
        })
      }
      reducer(this.table, 0)
      this.table = arr
      this.getTableData(arr)
    },
    // 点击第二列多选框
    changeTwo(val, row) {
      // console.log('选中的表格', val)
      const isCheck = val
      let arr = []
      arr =this.table.map(item => {
        if(item.id === row.firstId) {
          const reducer = (table, isChild) => {
            table.map(ss => {
              if (ss.id === row.secondId || isChild){
                if (ss.children) {
                  reducer(ss.children, 1)

                }
                ss.checked = isCheck
                ss.indeterminate = false
              }
            })
          }
          reducer(item.children, 0)
        }
        return item
      })

      arr.map(item => {
        if(item.id === row.firstId) {
          let count = 0
          item.children.map(ss => {
            if (ss.checked) count++
          })
          if (count === item.children.length) {
            item.checked = true
            item.indeterminate = false
          } else if (count > 0 && count < item.children.length) {
            item.checked = false
            item.indeterminate = true
          } else {
            item.checked = false
            item.indeterminate = false
          }
        }
      })
      this.table = arr
      this.getTableData(arr)
    },
    // 点击第三级列多选框
    changeThree(val, row) {
      // console.log('选中的表格', val, row)
      const isCheck = val
      let arr = JSON.parse(JSON.stringify(this.table))
      const reducer = (data) => {
        data.map(item => {
          if (item.children) {
            reducer(item.children)
          } else if (item.id === row.threeId) {
            item.checked = isCheck
          }
        })
      }
      reducer(arr)

      arr.map(item => {
        if(item.id === row.firstId) {
          let count = 0
          let indeterminate = false
          item.children.map(ss => {
            if (ss.id === row.secondId) {
              let tcount = 0
              ss.children.map(tt => {
                if (tt.checked) {
                  tcount++
                }
              })
              if (tcount === ss.children.length) {
                ss.checked = true
                ss.indeterminate = false
              } else if (tcount > 0 && tcount < ss.children.length) {
                ss.checked = false
                ss.indeterminate = true
              } else {
                ss.checked = false
                ss.indeterminate = false
              }
            }
            if (ss.indeterminate) {
              indeterminate = true
            }
            if (ss.checked) {
              count++
            }
          })
          if (indeterminate) {
            item.checked = false
            item.indeterminate = true
          } else if (count === item.children.length) {
            item.checked = true
            item.indeterminate = false
          } else if (count > 0 && count < item.children.length) {
            item.checked = false
            item.indeterminate = true
          } else {
            item.checked = false
            item.indeterminate = false
          }
        }
        return item
      })
      this.table = arr
      this.getTableData(arr)
    },

    // 点击折叠第一列
    clickFirstCell(row) {
      // console.log(row)
      const isCollpase = !row.firstCollpase
      this.table.map(item => {
        if (item.id === row.firstId) {
          item.collpase = isCollpase
          item.children.map((ss, si) => {
            ss.collpase = isCollpase
            ss.children.map((tt, ti) => {
              if (!(si === 0 && ti === 0)) {
                tt.collpase = isCollpase
              }
            })
          })
        }
      })
      this.getTableData(this.table)

    },
    // 点击折叠第二列
    clickSecondCell(row) {
      // console.log(row)
      const isCollpase = !row.secondCollpase
      this.table.map(item => {
        item.children.map(ss => {
          if (ss.id === row.secondId) {
            ss.collpase = isCollpase
            ss.children.map((tt, ti) => {
              if (ti !== 0) {
                tt.collpase = isCollpase
              }
            })
          }
        })
      })
  
      this.getTableData(this.table)
    },
    // 表格显示与隐藏
    rowStyle({ row }) {
      if (row.threeCollpase) {
        return {display: 'none'}
      }
      return ''
    }
  }
}

</script>

<style scoped>
.flat-contanier {
  margin-top: 20px;
}
</style>
