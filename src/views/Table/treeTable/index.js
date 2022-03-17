import "./index.less";
import template from "./index.html";
import { getTreeData } from '@/service/list'
import { isEmpty } from 'lodash'

export default {
  template,

  data () {
    return {
      props: {
        label: 'accountNo', // 需要指定的节点渲染对象属性
        children: 'orderInvoiceAssemblyList' // 指定的子级
      },
      tableData: [], // tree组件渲染的数据
      tableData2: [],
      checkedAll: false, // 是否全选
    }
  },

  created() {
    this.getSupplierPayInvoice()
    this.getTree()
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

    async getTree () {
      const { data } = await getTreeData()
      console.log(data)
      this.tableData2 = data
    },

    // tree组件选择改变事件
    handleCheckChange () {
      // console.log(val)
      // 使用getCheckedNodes可以获取当前被选中的节点数据
      let selected = this.$refs.treeData.getCheckedNodes()
      console.log(33, selected)
    },

    // 选择表格(全选)
    changeAllSelect (val) {
      // console.log(val)
      const loop = (data) => {
        data.forEach(item => {
          item.checked = val
          if ('indeterminate' in item) {
            item.indeterminate = false
          }
          if (item.childs) {
            loop(item.childs)
          }
        })
      }
      loop(this.tableData2)
    },

    // 选择表格(表格行选择)
    changeRowSelect (val) {
      // console.log(val)
      if (!isEmpty(val.childs)) {
        val.childs.forEach(ss => {
          ss.checked = val.checked
        })
      } else {
        let checkedLeg = 0
        this.tableData2.some(item => {
          if (item.id === val.parentId) {
            // 获取当前父级下子级选中条数
            const leg = item.childs.length
            checkedLeg = item.childs.filter(ss => ss.checked).length
            // 根据条数改变父级的indeterminate和checked
            if (checkedLeg === 0) {
              item.indeterminate = false
              item.checked = false
            } else if (checkedLeg < leg) {
              item.indeterminate = true
              item.checked = false
            } else if (checkedLeg === leg) {
              item.indeterminate = false
              item.checked = true
            }

            return
          }
        })
        // console.log(this.tableData2)
      }
    },

    // 表格样式,子级的选择框右移
    cellStyle ({row, column, rowIndex, columnIndex}) {
      // console.log(row, column, rowIndex, columnIndex)
      if (!row.childs && columnIndex === 0) {
        return 'text-align: right'
      }
      return ''
    }
  }
};
