<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="公司名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="成立时间" prop="date" required>
        <el-date-picker :picker-options="pickerOptions" type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="所属行业" prop="industry">
        <el-select v-model="ruleForm.industry" placeholder="请选择所属行业">
          <el-option label="行业一" value="food"></el-option>
          <el-option label="行业二" value="medicine"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region.country" placeholder="请选择国家">
          <el-option label="国家一" value="USA"></el-option>
          <el-option label="国家二" value="China"></el-option>
        </el-select>
        <el-select v-model="ruleForm.region.city" placeholder="请选择城市">
          <el-option label="城市一" value="shanghai"></el-option>
          <el-option label="城市二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="注册资本" required>
        <el-col :span="11">
          <el-form-item prop="amount">
            <el-input placeholder="输入金额" v-model="ruleForm.amount" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="amountUnit">
            <el-select v-model="ruleForm.amountUnit" placeholder="请选择单位">
              <el-option label="万元" value="1"></el-option>
              <el-option label="亿元" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="logo" prop="logo">
       <el-upload
          class="avatar-uploader"
          action="/upload/file?id=66"
          accept="image/png, image/jpeg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-remove="handleAvatarRemove"
          :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm.logo" :src="ruleForm.logo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <h3>关联公司<el-button type="primary" @click.prevent="addDomain">新增</el-button></h3>
      <el-form-item
        v-for="(companys, index) in ruleForm.relateCompanys"
        :label="'关联公司' + index"
        :key="companys.id"
      >
      <!-- <el-input v-model="companys.name"></el-input> -->
       <el-col :span="11">
          <el-form-item 
            :rules="{
              required: true, message: '公司名称不能为空', trigger: 'blur'
            }"
            :prop="'relateCompanys.' + index + '.name'">
            <el-input 
              placeholder="输入公司名称" 
              v-model="companys.name" 
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item 
            :rules="{
              required: true, message: '公司行业不能为空', trigger: 'change'
            }"
            :prop="'relateCompanys.' + index + '.industry'">
            <el-select 
              v-model="companys.industry"
              placeholder="请选择所属行业"
            >
              <el-option label="行业一" value="food"></el-option>
              <el-option label="行业二" value="medicine"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button @click.prevent="removeDomain(companys)">删除</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      ruleForm: {
        name: '',
        date: '',
        amount: '',
        amountUnit: '',
        industry: '',
        logo: '',
        region: {
          country: '',
          city: ''
        },
        relateCompanys: [{
          id: '1',
          name: '',
          industry: ''
        }]
      },
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      rules: {
        name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择成立日期', trigger: 'change' }
        ],
        industry: [
          { required: true, message: '请选择行业', trigger: 'change' }
        ],
        amount: [
          { required: true, message: '请输入注册资本', trigger: 'blur' }
        ],
        amountUnit: [
          { required: true, message: '请选择单位', trigger: 'change' }
        ],
        logo: [
          { type: 'url', required: true, message: '请上传公司logo', trigger: 'change' }
        ],
        region: [
          { 
            type: 'object', 
            required: true, 
            trigger: 'change',
            fields: {
              country: [{ required: true, message: '请选择国家', trigger: 'change' }],
              city: [{ required: true, message: '请选择城市', trigger: 'change' }],
            }
          }
        ]
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.ruleForm.logo = res.data.file
      this.$refs.ruleForm.validateField('logo')
    },
    handleAvatarRemove(file) {
      this.ruleForm.logo = ''
      this.$refs.ruleForm.validateField('logo')
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    // 新增关联公司
    addDomain() {
      this.ruleForm.relateCompanys.push({
        id: Date.now(),
        name: '',
        industry: ''
      })
    },
    // 删除关联公司
    removeDomain(currentItem) {
      this.ruleForm.relateCompanys = this.ruleForm.relateCompanys.filter(item => item.id !== currentItem.id)
    }
  }
}

</script>

<style lang="less">
.avatar-uploader {
  .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>