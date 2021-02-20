<template>
  <div class="tree-contanier" id="tree" ref="treeContainer">
    <p>1.类型为公司可以添加,编辑,删除;类型为个人和其他不能添加 2.方向支持横向和竖向 3.只读模式不能添加,编辑等操作</p>
    <TreeChart 
      :json="treeData"
      :class="{landscape: isVertical}"
      :isDetail="isDetail"
      @add="addStock"
      @delete="deleteStock" 
    />
    <div style="float: right">
      <el-button type="primary" @click="isVertical = !isVertical">切换方向</el-button>
      <el-button type="primary" @click="isDetail=!isDetail">切换只读模式</el-button>
    </div>
    <!-- 添加编辑弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      @close="clearDialog"
      :close-on-click-modal="false"
      width="500px">
      <div class="tips">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="类型" @change="changeType">
              <el-option
                v-for="item in shareholderTypeOptions"
                :key="item.value"
                :label="item.labelZh"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="partnerName">
            <el-input placeholder="输入姓名" :maxlength="32" v-model="ruleForm.partnerName"></el-input>
          </el-form-item>
          <el-form-item label="占比" prop="proportionShares">
            <el-input placeholder="输入占比" :maxlength="5" v-model="ruleForm.proportionShares"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="tip-left">
          <el-button type="info" @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </span>
    </el-dialog>

    <!-- 删除提示弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      width="30%">
      <div class="tips">
        <p style="text-align: left">确定删除该股东信息?</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="tip-left">
          <el-button type="info" @click="dialogVisible2=false">取消</el-button>
          <el-button type="primary" @click="confimdelete">确定</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import TreeChart from '@/components/TreeData'
  import { Loading } from "element-ui";

  export default {
    name: 'tree',
    components: {
      TreeChart
    },
    data() {
      return {
        treeData: {
          partnerName: '大米科技公司',
          proportionShares: '100',
          partnerType: 2,
          id: 1,
          childers: [{
            partnerName: '股东1',
            proportionShares: '50',
            partnerType: 1,
            id: 2,
            partnerCode: 1
          }, {
            partnerName: '股东2',
            proportionShares: '20',
            partnerType: 1,
            id: 4,
            partnerCode: 1
          }, {
            partnerName: '股东3',
            proportionShares: '20',
            partnerType: 2,
            id: 5,
            partnerCode: 1
          }, {
            partnerName: '其他',
            proportionShares: '10',
            partnerType: 3,
            id: 6,
            partnerCode: 1
          }]
        },
        isVertical: false, // 是否是竖方向,只给最外层的添加
        isDetail: false, // 是否是详情,不可编辑操作
        dialogVisible: false, // 添加股东弹框
        dialogVisible2: false, // 删除提示弹框
        ruleForm: {
          type: 1,
          partnerName: "",
          proportionShares: null
        },
        rules: {
          proportionShares: [
            { required: true, message: '请输入比例', trigger: "blur" }
          ],
          partnerName: [
            { required: true, message: "请输入股东名称", trigger: "blur" }
          ],
          cardId: [
            { required: true, message: "请输入证件号", trigger: "blur" }
          ],
          type: [
            { required: true, message: "请选择类型", trigger: "blur" }
          ]
        },
        shareholderTypeOptions: [
          {
            labelEn: "Individual",
            labelZh: "个人",
            value: 1
          },
          {
            labelEn: "Company",
            labelZh: "公司",
            value: 2
          },
          {
            labelEn: "Other",
            labelZh: "其他",
            value: 3
          }
        ], // 股东类型
        lastId: 11, // 最后一级id
        currentTreeData: {}
      }
    },
    methods: {
      // 新增编辑股东,val: 0 新增, 1 编辑
      addStock(data) {
        // console.log(data)
        if (data.val) {
          // 不使用=赋值,内存相同,改变后,treeData数据也会改变
          // this.ruleForm = data.data;
          this.ruleForm = Object.assign(this.ruleForm, data.data);
          this.ruleForm.type = data.data.partnerType;
        }
        this.isEdit = data.val
        // 使用=赋值,编辑时改变currentTreeData, 源数据treeData也会改变
        this.currentTreeData = data.data
        this.dialogVisible = true;
      },
      // 删除
      deleteStock(data) {
        // console.log(data)
        this.currentTreeData = data
        this.dialogVisible2 = true
      },
      // 确定删除
      confimdelete() {
        // 前端删除 遍历原数据,删除匹配id数据
        const deleteData = (data) => {
          data.some((item, i) => {
            if (item.id === this.currentTreeData.id) {
              data.splice(i, 1)
              return
            } else if (item.childers) {
              deleteData(item.childers)
            }
          })
        }
        let arr = [this.treeData]
        deleteData(arr)
        this.treeData = arr[0] ? arr[0] : {}
        // console.log(this.treeData)
        this.dialogVisible2 = false
        this.$message({
          type: "success",
          message: "成功"
        });
      },

      // 保存添加股东
      confirm() {
        let loading = Loading.service();
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.sendData();
          } else {
            loading.close();
          }
        });
      },

      // 发送添加股东数据
      sendData() {
        let loading = Loading.service();
        let data = {
          partnerType: this.ruleForm.type,
          partnerName: this.ruleForm.partnerName,
          proportionShares: this.ruleForm.proportionShares
        };
        if (this.isEdit) { // 编辑
          // data.id = this.treeData.id;
          this.currentTreeData.partnerType = data.partnerType
          this.currentTreeData.partnerName = data.partnerName
          this.currentTreeData.proportionShares = data.proportionShares
          // 前端编辑数据
          this.$message({
            type: "success",
            message: "成功"
          });
          this.clearDialog();
          loading.close()
        } else { // 添加
          // 前端添加数据,需要自己生成子级id,可以传数据的时候把最后一级id传过来,进行累加
          data.id = this.lastId ++
          data.partnerCode = this.currentTreeData.id
          data.extend = true
          const render = (formData) => {
            formData.some(item => {
              if (item.id === this.currentTreeData.id) {
                if (item.childers) {
                  item.childers.push(data)
                } else {
                  this.$set(item, 'childers', [data])
                }
                return
              } else if (item.childers) {
                render(item.childers)
              }

            })
          }
          let arr = [this.treeData]
          render(arr)
          this.treeData = arr[0]
  
          this.$message({
            type: "success",
            message: "成功"
          });
          this.clearDialog();
          loading.close()
        }
        // console.log(this.treeData, this.currentTreeData)
        // 后台调用接口添加编辑数据
        // console.log(data, this.treeData);
        // const url = apiPath.shareholder.addShareHolder;
        // this.$post(url, data)
        //   .then(res => {
        //     loading.close();
        //     if (res && res.success) {
        //       this.$message({
        //         type: "success",
        //         message: "成功"
        //       });
        //       this.clearDialog();
        //     }
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      },
      // 清除表单信息
      clearDialog() {
        this.ruleForm = {
          type: 1,
          partnerName: "",
          proportionShares: null
        }
        this.$refs.ruleForm.resetFields();
        this.dialogVisible = false;
      },

      changeType(){}
    }
  }
</script>
