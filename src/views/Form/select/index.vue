<template>
 <div>
   <h2>延时搜索,防抖与节流</h2>
  <p>从服务器搜索数据，输入关键字进行查找,防抖处理(debounce),输入1s后进行搜索</p>
  <div>
    <el-select
      v-model="value"
      multiple
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button @click="clickme">click</el-button>
    <el-button @click="debounced">click2</el-button>
    <div>调用第{{count}}次</div>
  </div>
  <p>从服务器搜索数据，输入关键字进行查找,节流处理(throttle),1s内最多搜索一次</p>
  <div>
    <el-select
      v-model="value2"
      multiple
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethodThrottle"
      :loading="loading">
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
 </div>
</template>

<script>
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import { getProductNameList } from '@/service/list'

export default {
  data () {
    return {
      options: [],
      options2: [],
      value: [],
      value2: [],
      list: [],
      loading: false,
      count: 0,
      debounced: debounce(() => {
        console.log(9999)
        this.count++
      }, 400)
    }
  },

  created(){
    
  },

  methods: {
    clickme() {
      // console.log(11)
      debounce(() => {
        console.log(9999)
        this.count++
      }, 500)()
    },
    // 防抖搜索
    remoteMethod(query) {
      const loadOptions = () => {
        console.log('发送请求啦---')
        if (query !== '') {
          this.loading = true;
          getProductNameList({name: query}).then(res => {
            console.log(2, res)
            this.loading = false
            this.options = res.data
          })
        } else {
          this.options = [];
        }
      } 
      debounce(loadOptions, 1000)()
    },

    // 节流搜索
    remoteMethodThrottle(query) {
      const loadOptions = () => {
        console.log('发送请求啦---')
        if (query !== '') {
          this.loading = true;
          getProductNameList({name: query}).then(res => {
            console.log(2, res)
            this.loading = false
            this.options2 = res.data
          })
        } else {
          this.options2 = [];
        }
      } 
      throttle(loadOptions, 1000)()
    }
  }
}
</script>
