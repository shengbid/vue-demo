<template>
  <div>
    <div class="table_box">
      <el-button type="primary" class="submit_btn" @click="addTable">添加</el-button>
      <!-- 如果不想展示错误提示信息,可以加上show-message参数,fasle不展示 -->
      <el-form :model="productRuleForm" ref="productRuleForm" :rules="productRuleForm.rules" :show-message="true">
        <el-table
          :data="productRuleForm.tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
            <template slot-scope="scope">
            <!-- prop的规则: 在普通的form表单中是一个对象,prop是对象的属性. 表格是由多个对象组成的数组,在写prop是需要根据索引给值.这里的tableData就相当于对象的属性 !-->
            <!-- rules也要单独给 -->
              <el-form-item
                :prop="'tableData.' + scope.$index + '.date'"
                :rules='productRuleForm.rules.date'>
                <el-date-picker
                  v-model="scope.row.date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
            <template slot-scope="scope">
              <el-form-item
                :prop="'tableData.' + scope.$index + '.name'"
                :rules='productRuleForm.rules.name'>
                <el-input v-model="scope.row.name"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话">
            <template slot-scope="scope">
              <el-form-item
                :prop="'tableData.' + scope.$index + '.phone'"
                :rules='productRuleForm.rules.phone'>
                <el-input v-model="scope.row.phone"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
            <template slot-scope="scope">
              <el-form-item
                :prop="'tableData.' + scope.$index + '.address'"
                :rules='productRuleForm.rules.address'>
                <el-input v-model="scope.row.address"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <el-button type="primary" class="submit_btn" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      productRuleForm: {
        tableData: [{
          date: '',
          name: '',
          phone: '',
          address: ''
        }],
        rules: {
          date: [{ required: true, message: '请选择日期', trigger: 'change' }],
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
          address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
        }
      }
    }
  },
  methods: {
    // 添加一行
    addTable () {
      this.productRuleForm.tableData.push({
        date: '',
        name: '',
        phone: '',
        address: ''
      })
    },

    // 提交数据
    submit () {
      this.$refs['productRuleForm'].validate((valid) => {
        if (valid) {
          console.log(this.productRuleForm.tableData)
        }
      })
    }
  }
}
</script>
<style scoped>
  .table_box .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }
</style>