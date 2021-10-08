<template>
  <div>
    <h2>案例使用的是utils文件下的vue-print-nb组件</h2>
    <p>博客地址:<a target="_blank" href="https://www.cnblogs.com/steamed-twisted-roll/p/10683680.html">https://www.cnblogs.com/steamed-twisted-roll/p/10683680.html</a></p>
    <div id="printMe" ref="printContent">
      <ul class="content">
        <li>轻轻的我走了，</li>
        <li>轻轻的我走了，</li>
        <li>轻轻的我走了，</li>
        <li>轻轻的我走了，</li>
        <li>轻轻的我走了，</li>
        <li>轻轻的我走了，</li>
        <li>轻轻的我走了，</li>
        <li>轻轻的我走了，</li>
        <li style="padding: 20px"><el-input
          v-model="textarea"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
        /></li>
        <li class="noprint">
          <p>不需要打印的内容</p>
          <p>不需要打印的内容</p>
          <p>不需要打印的内容</p>
        </li>
      </ul>
      <div>
        <ul>
          <li>轻轻的我走了，</li>
          <li>轻轻的我走了，</li>
          <li>轻轻的我走了，</li>
          <li>轻轻的我走了，</li>
          <li>轻轻的我走了，</li>
        </ul>
      </div>
      <p>el-form表单打印</p>
      <div style="width: 60%;margin-top:20px">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <p>el-table打印</p>
      <div style="width: 100%">
        <el-table
          :data="tableData"
          :cell-style="headerCellStyle"
          border>
          <el-table-column
            prop="date"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </div>
      <div style="padding: 30px" class="noprint">
        <p>不需要打印的内容</p>
        <p>不需要打印的内容</p>
        <p>不需要打印的内容</p>
      </div>
    </div>
    <el-button type="primary" @click="toImg">转图片打印</el-button>
    <el-button v-print="printObj" type="primary">直接打印</el-button>
    <img style="margin-top:20px;" :src="img" alt="">
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import printJS from 'print-js'
export default {
  data() {
    return {
      img: '',
      printObj: {
        id: 'printMe',
        popTitle: '打印66',
        ignoreClass: 'noprint',
        endCallback: (e) => {
          // console.log(e, 5555)
        }
        // extraCss: 'https://www.google.com,https://www.google.com',
        // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      textarea: '轻轻的我走了，',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  watch: {
  },

  created() {
  },
  methods: {
    toImg() {
      html2canvas(this.$refs.printContent, {
        backgroundColor: null,
        useCORS: true,
        windowHeight: document.body.scrollHeight
      }).then((canvas) => {
        // let url = canvas.toDataURL('image/jpeg', 1.0)
        const url = canvas.toDataURL()
        this.img = url
        printJS({
          printable: url,
          type: 'image',
          documentTitle: '打印图片'
        })
        // console.log(url)
      })
    },
    headerCellStyle({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 0 || columnIndex === 1) {
        return 'min-width: 18%'
      }
      return 'min-width: 16%'
    }
  }
}
</script>
<style>
.content {
  width: 300px;
  border: 1px solid #000;
  text-align: center;
  margin-bottom: 20px;
  padding-top: 20px;
}
.content li {
  padding: 10px 0;
}
</style>
