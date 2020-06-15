import common from "@/utils/common";
import "./tree.less";
import template from "./tree.html";
// import apiPath from "@api/api"; // 引入api.json文件
import { Loading } from "element-ui";

export default {
  template,
  name: "TreeChart",
  props: {
    json: {}, // 渲染数据
    oldTreeData: {}, // 原始数据
    totalRates: 0, // 股东占股比例
    isDetail: {
      default: true // 是否是详情
    },
    id: null // 最后一级id,前端添加数据需要
  },

  data() {
    var checkShare = (rule, value, callback) => {
      let zero = /^0+\d*$/;
      let dublue = /^0{2,}\.\d+$/;
      var point = /^\d+\.?\d+$/;
      var reg = /^[1-9]{1}$/;
      if (value !== 0 && !value) {
        callback(new Error("请输入占股比例(%)"));
      }
      setTimeout(() => {
        if (zero.test(value) || dublue.test(value)) {
          callback(new Error("输入正确的数字格式"));
        } else if (point.test(value) || reg.test(value)) {
          this.ruleForm.proportionShares = Number(value);
          callback();
        } else {
          callback(new Error("输入正确的数字格式"));
        }
        callback();
      }, 100);
    };
    return {
      treeData: {},
      // oldTreeData: {},
      rateCount: 0, // 股东占比总和
      oldCount: 0, // 编辑之前的总和
      oldRate: 0, // 编辑之前的单个值
      dialogVisible: false, // 添加股东弹框
      dialogVisible2: false, // 删除提示弹框
      isEdit: 0, // 是否编辑 0 新增 1 编辑
      ruleForm: {
        type: 1,
        partnerName: "",
        proportionShares: null
      },
      rules: {
        proportionShares: [
          { required: true, validator: checkShare, trigger: "blur" }
        ]
      },
      isCompany: true, // 添加类型是否为企业
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
      isDisable: false,
      totalRate: 0,
      lastId: null // 最后一级id
    };
  },

  created() {
    // 设置语言
    this.setRule();
    this.lastId = Number(this.id)
    console.log(this.json)
  },

  watch: {
    isDetail: function(val) { // 是否是详情,详情不能添加编辑
      this.isDetail = val;
    },
    json: {
      // 遍历当前的数据
      handler: function(Props) {
        let extendKey = function(jsonData) {
          jsonData.extend =
            jsonData.extend === void 0 ? true : !!jsonData.extend;
          if (Array.isArray(jsonData.children) && jsonData.children.length) {
            jsonData.children.forEach(c => {
              extendKey(c);
            });
          }
          return jsonData;
        };
        if (Props) {
          this.treeData = extendKey(Props);
        }
      },
      immediate: true
    }
  },
  methods: {
    // 设置规则
    setRule() {
      let getRule = {
        partnerName: [
          { required: true, message: "请输入股东名称", trigger: "blur" }
        ],
        cardId: [
          { required: true, message: "请输入证件号", trigger: "blur" }
        ],
        type: [
          { required: true, message: "请选择类型", trigger: "blur" }
        ]
      };
      this.rules = Object.assign(this.rules, getRule);
    },

    toggleExtend(treeData) {
      treeData.extend = !treeData.extend;
      this.$forceUpdate();
    },

    // 改变添加类型
    changeType(val) {
      if (Number(val) === 3) {
        this.isDisable = true;
        this.ruleForm.partnerName = "其他";
      } else {
        this.isDisable = false;
        this.ruleForm.partnerName = "";
      }
    },

    // 新增股东,val: 0 新增, 1 编辑
    addStock(val) {
      // console.log(this.treeData)
      this.isDisable = false;
      // 如果是新增,直接循环当前节点数据下的子级,
      // 如果是编辑,要通过当前节点数据的parentID遍历原始数据

      this.isEdit = val;
      if (val) {
        // this.$emit('click-node', {flag: 2, id: this.treeData.parentId})
        this.rateCount = 0;
        this.rateCount = this.getRate(
          this.oldTreeData,
          this.treeData.prePartnerCode
        );
        // 不使用=赋值,内存相同,改变后,treeData数据也会改变
        this.ruleForm = Object.assign(this.ruleForm, this.treeData);
        this.ruleForm.type = this.treeData.partnerType;
        if (Number(this.ruleForm.type === 3)) {
          this.isDisable = true;
          this.ruleForm.partnerName = "其他";
        }
        this.oldRate = this.treeData.proportionShares;
      } else {
        let obj = this.forData(this.treeData);
        this.rateCount = obj.totalRate;
      }
      this.dialogVisible = true;
    },

    // 循环股东树形图 获得股东比例和个数
    forData(data) {
      let obj = {
        totalRate: 0,
        leg: 0
      };
      if (data.childers && data.childers.length) {
        data.childers.forEach(v => {
          obj.totalRate += v.proportionShares;
        });
        obj.leg = data.childers.length;
      }
      return obj;
    },

    // 循环股东树形图 获得股东比例
    getRate(data, id) {
      // 如果是第一级
      if (!id || data.partnerCode === id) {
        if (data.childers && data.childers.length) {
          data.childers.forEach(v => {
            this.rateCount += v.proportionShares;
          });
        }
        return this.rateCount;
      } else if (data.childers && data.childers.length) {
        data.childers.some(v => {
          this.getRate(v, id);
        });
      }
    },

    // 编辑
    editStock() {
      this.dialogVisible = true;
      this.ruleForm = this.treeData;
    },

    // 删除股东
    deleteStock() {
      // const loading = Loading.service();
      // 前端删除
      // 前端删除这里不好操作,需要遍历整个原始数据删除,再赋值,比较麻烦

      // 后端删除
      // const url = apiPath.shareholder.deleteHolder(this.treeData.id);
      // this.$post(url).then(res => {
      //   if (res.success) {
      //     loading.close();
      //     this.treeData = {};
      //     this.dialogVisible2 = false;
      //     this.$emit("click-node", { flag: 1 });
      //     this.$message({
      //       type: "success",
      //       message: "删除成功"
      //     });
      //   } else loading.close();
      // });
    },

    // 限制只能输入数字
    limitNumber() {
      this.ruleForm.proportionShares = common.limitInputPointNumber(
        this.ruleForm.proportionShares
      );
    },

    // 验证比例
    checkRate() {
      if (this.isEdit) {
        if (
          Number(this.ruleForm.proportionShares) +
            Number(this.rateCount) -
            Number(this.oldRate) >
          100
        ) {
          this.$message({
            type: "warning",
            message: "股东占股比例之和不能大于100"
          });
          this.ruleForm.proportionShares = "";
        }
        this.ruleForm.proportionShares = this.ruleForm.proportionShares;
      } else {
        if (
          Number(this.ruleForm.proportionShares) + Number(this.rateCount) >
          100
        ) {
          this.$message({
            type: "warning",
            message: "股东占股比例之和不能大于100"
          });
          this.ruleForm.proportionShares = "";
        }
      }
    },

    // 保存添加股东
    confirm() {
      // this.checkRate()
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
      if (this.isEdit) {
        // data.id = this.treeData.id;
        // 前端编辑数据
        this.treeData.partnerType = data.partnerType
        this.treeData.partnerName = data.partnerName
        this.treeData.proportionShares = data.proportionShares
        this.$message({
          type: "success",
          message: "成功"
        });
        this.clearDialog();
        loading.close()
      } else {
        // 前端添加数据,需要自己生成子级id,可以传数据的时候把最后一级id传过来,进行累加
        data.prePartnerCode = this.treeData.partnerCode;
        data.id = this.lastId ++
        if (this.treeData.childers) {
          this.treeData.childers.push(data)
        } else {
          this.treeData.childers = [data]
        }
        console.log(this.lastId, this.treeData)
        this.$message({
          type: "success",
          message: "成功"
        });
        this.clearDialog();
        loading.close()
      }
      // 后台添加编辑数据
      // console.log(data, this.treeData);
      // const url = apiPath.shareholder.addShareHolder;
      // this.$post(url, data)
      //   .then(res => {
      //     loading.close();
      //     if (res && res.success) {
      //       this.$emit("click-node", { flag: 1, id: data.parentId });
      //       this.$message({
      //         type: "success",
      //         message: "成功"
      //       });
      //       this.clearDialog();
      //     } else {
      //       this.rateCount = this.oldCount;
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },

    // 清除表单信息
    clearDialog() {
      // this.ruleForm = {}
      this.$refs.ruleForm.resetFields();
      this.dialogVisible = false;
    },

    changeOpen() {}
  }
};
