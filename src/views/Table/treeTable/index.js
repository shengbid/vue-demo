import "./index.less";
import template from "./index.html";

export default {
  template,

  data () {
    return {
      props: {
        label: 'accountNo', // 需要指定的节点渲染对象属性
        children: 'orderInvoiceAssemblyList' // 指定的子级
      },
      tableData: [] // tree组件渲染的数据
    }
  },

  created() {
    this.getSupplierPayInvoice()
  },
  // 方法集合
  methods: {
    // tree组件渲染的数据列表
    getSupplierPayInvoice () {
      this.tableData = [{
        accountId: 13,
        accountNo: `66`,
        orderNo: '444',
        totalReconciledAmount: 1000,
        confirmAccountDate: 1548482834000,
        span: true,
        orderInvoiceAssemblyList: [{
          invoiceNo: '67448',
          orderNo: '444',
          totalAmountTax: 1999,
          billingDate: 1548482834000,
          forCollection: 999,
          requestStatus: '未付款',
          receiptDate: '2019-1-30',
          accountInvoiceId: 11
        }, {
          orderNo: '55',
          totalAmountTax: 2999,
          billingDate: 1548482834000,
          forCollection: 5555,
          requestStatus: 1,
          accountInvoiceId: 12
        }]
      }, {
        accountId: 14,
        accountNo: '789',
        orderNo: '444',
        totalReconciledAmount: 2000,
        confirmAccountDate: 1548482834000,
        span: true,
        orderInvoiceAssemblyList: [{
          orderNo: '888',
          totalAmountTax: 3999,
          billingDate: 1548482834000,
          forCollection: 999,
          requestStatus: 2,
          accountInvoiceId: 13
        }, {
          orderNo: '999',
          totalAmountTax: 4888,
          billingDate: 1548482834000,
          forCollection: 5555,
          requestStatus: 1,
          accountInvoiceId: 14
        }, {
          orderNo: '889',
          totalAmountTax: 4888,
          billingDate: 1548482834000,
          forCollection: 5555,
          requestStatus: 1,
          accountInvoiceId: 15
        }]
      }]

    },

    // tree组件选择改变事件
    handleCheckChange () {
      // console.log(val)
      // 使用getCheckedNodes可以获取当前被选中的节点数据
      let selected = this.$refs.treeData.getCheckedNodes()
      console.log(33, selected)
    }
  }
};
