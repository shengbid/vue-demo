<template>
  <div>
    <h2>控制可选择的层级</h2>
    <p>
      使用mockjs获取数据,针对动态数据添加禁止选择属性,适用场景:添加层级时,控制添加的层级数.
      本例是超过三级节点不能选择, 第四级的节点不能选择
    </p>
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
    </el-form>

      <!--放在弹框里  -->
    <!-- <el-button @click="dialogVisible = true">新增</el-button> -->
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
  import { getClassify } from '@/service/list'

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
        // mockjs获取数据
        getClassify().then(res => {
          if (res.data) {
            this.setDisable(1, res.data, 3)
            this.typeOptions = res.data
            console.log(this.typeOptions)
          }
        })
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
              const _count = count + 1
              this.setDisable(_count, v.childs, maxNum)
            } else {
              delete v.childs
            }
          })
        }
      },

      handleChange (val) {
        console.log(val)
      }
    }
  }
  </script>
  
  <style>

  
  </style>
  