<template>
  <div>
    <el-button type="text" @click="openDialog">新建</el-button>
    <el-button type="text" @click="editDialog">编辑</el-button>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="品类">
          <el-input v-model="form.castory"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="品种">
          <el-checkbox-group v-model="checkboxGroup" @change="changeBoxGroup">
            <el-checkbox-button v-for="item in categrorys" :label="item.label" :disabled="item.disabled" :key="item.id">{{item.label}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'checkbox',
  data() {
    return {
      dialogVisible: false,
      form: {
        castory: '',
        number: null,
      },
      categrorys: [],
      checkboxGroup: [],
      oldCheckeds: [],
      isEdit: false,
      count: 0
    }
  },
  created() {

  },
  watch: {
    'form.number': function (newVal, oldVal) {
      console.log('numer', newVal, oldVal)
      if (this.isEmtry(newVal)) {
        this.categrorys = this.categrorys.filter(item => {
          if (this.checkboxGroup.includes(item.label)) {
            item.disabled = false
          } else {
            item.disabled = true
          }
          return item
        })
      } else {
        this.categrorys = this.categrorys.filter(item => {
          item.disabled = false
          return item
        })
      }
    },
    'checkboxGroup': function (newVal, oldVal) {
      console.log('checkboxGroup', newVal, oldVal)
      if (this.count < 1) {
        if (this.isEdit) {
          oldVal = this.oldCheckeds
        } else {
          oldVal = []
        }
      }
      if (newVal.length > oldVal.length) { // 新增
        newVal.some(item => {
          if (!oldVal.includes(item)) {
            let text = item + this.form.number
            text = this.form.castory ? this.form.castory + ',' + text : text
            this.form.castory = text
            this.form.number = ''
          }
        })
      } else { // 取消
        oldVal.some(item =>{
          if (!newVal.includes(item)) {
            let arr = this.form.castory.split(',')
            arr = arr.filter(ss => {
              return ss.indexOf(item) < 0
            })
            this.form.castory = arr.join(',')
          }
        })
        this.categrorys = this.categrorys.filter(item => {
          if (!newVal.includes(item.label) && this.isEmtry(this.form.number)) {
            item.disabled = true
          } else {
            item.disabled = false
          }
          return item
        })
        // console.log(555, this.categrorys)
      }
    }
  },
  methods: {
    // 新建
    openDialog() {
      this.dialogVisible = true
      this.form.number = ''
      this.form.castory = ''
      this.checkboxGroup = []
      this.count = 0
      this.getCatrgorys()
    },
    submit() {

    },
    // 获取多选框值
    getCatrgorys() {
      const promise = new Promise((resolve, reject) => {
        const data = {
          msg: 'success',
          data: [{
            label: '大衣',
            id: '1'
          }, {
            label: '外套',
            id: '2'
          }, {
            label: '毛衣',
            id: '3'
          }, {
            label: '连衣裙',
            id: '4'
          }, {
            label: '裤子',
            id: '5'
          }]
        }
        resolve(data)
      })
      promise.then((res) => {
        // console.log(res);
        this.categrorys = []
        res.data.forEach(item => {
          item.disabled = true
          this.categrorys.push(item)
        })
      })
    },
    // 多选框选择
    changeBoxGroup(val) {
      this.count++
      console.log('checked', val, this.count)
      this.checkboxGroup = val
    },
    // 编辑弹框
    editDialog() {
      this.dialogVisible = true
      this.isEdit = true

      this.form.number = ''
      this.form.castory = ''
      this.checkboxGroup = []
      this.count = 0
      setTimeout(()=> {
        this.form.castory = '大衣2, 裤子5'
      }, 400)
      this.getCatrgorys()
      this.getCheckBox()
    },
    // 模拟获取选择的多选框值
    getCheckBox() {
      setTimeout(() => {
        this.checkboxGroup = ['大衣', '裤子' ]
        this.oldCheckeds = ['大衣', '裤子']
      }, 1000)
    },
    onSubmit() {},
    // 字符是否为空
    isEmtry(val) {
      if (val === 'undefind' || val === '' || val === null) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>