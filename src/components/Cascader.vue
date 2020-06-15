<template>
  <div>
    <el-button @click="dialogVisible = true">新增</el-button>
    <el-dialog
      title="添加分类"
      :visible.sync="dialogVisible"
      width="500px">
      <div class="role_contanier">
        <el-form label-width="80px" :model="typeInfo">
          <el-form-item label="分类名称">
            <el-input v-model="typeInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="分类组">
            <el-cascader
              v-model="typeInfo.group"
              :options="typeOptions"
              :props="props"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
  <script>
  export default {
    props: {
      
    },
    data() {
      return {
        dialogVisible: false,
        typeInfo: {
          group: '',
          name: ''
        },
        typeOptions: [], // 分类层级选项
        props: {
          label: 'name', // 显示的选项
          value: 'id', // 选择的value值
          children: 'childs', // 子级属性名
          checkStrictly: true // 可以选择任意一级
        } // 指定层级属性
      }
    },
    created() {
      this.getTypeOptions()
    },
    mounted() {
     
    },
    methods: {
      // 获取分类级别
      getTypeOptions () {
        // 假设后台返回的数据 4级
        let resDate = [{
          id: 1,
          name: '食品',
          childs: [
            {id: 3, name: '进口食品', childs: [
                {id: 5, name: '果干', childs: [{id: 7, name: '坚果',}]}, 
                {id: 6, name: '面包'}
              ]
            }, 
            {id: 4, name: '国内食品'}
          ]
          }, {id: 2, name: '清洁'}
        ]
        // 限制只能添加4级分类
        this.setDisable (1, resDate, 3)
        console.log(resDate)
        this.typeOptions = resDate
      },

      // 超过3级,不能选中,子级分类最多4级
      /**
       * count: 当前层级
       * data: 当前层级的数据
       * maxNum: 最多不能超过几级
      */
      setDisable (count, data, maxNum) {
        if (count > maxNum) { //最多几级就写几
          data.forEach(v => {
            v.disabled = true // 超过设定的最大级数,给这一集的数据添加disabled属性
          })
        } else {
          data.forEach(v => {
            if (v.childs && v.childs.length) {
              count++
              this.setDisable(count, v.childs)
            }
          })
        }
      },
      // 添加分类
      submitForm () {

      },
      handleChange (val) {
        console.log(val)
      }
    }
  }
  </script>
  
  <style>

  
  </style>
  