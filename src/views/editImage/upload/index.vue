<template>
  <div>
    <h2>多upload文件上传</h2>
    <p>案例适用页面需要多个upload控制文件上传,上传接口返回的图片是用mockjs随机生成的.
      可以上传,点击文件预览,删除,提交时会打印出当前文件列表.  
      博客原文: https://www.cnblogs.com/steamed-twisted-roll/p/9473644.html</p>
    <div>
      <ul class="test">
        <li v-for="(item, index) in processList" :key="item.id">
          <p>{{ item.title }}</p>
          <el-upload
            class="upload-demo"
            :action="getAction(item.id)"
            :on-success="function onSuccess(response, file, fileList) {return handleSuccess(response, file, fileList, index)}"
            :on-remove="function onRemove(file, fileList) {return handleRemove(file, fileList, index)}"
            :on-preview="handlePreview"
            multiple
            :limit="3"
            :file-list="item.fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </li>
      </ul>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
    <el-dialog
      title="文件预览"
      :visible.sync="dialogVisible2"
      width="50%"
    >
      <div>
        <img :src="imgUrl" alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getFileList } from '@/service/file'
export default {
  data() {
    return {
      imgUrl: '',
      dialogVisible2: false,
      processList: [
        {
          id: 1,
          title: '流程1',
          fileList: []
        },
        {
          id: 2,
          title: '流程2',
          fileList: []
        },
        {
          id: 3,
          title: '流程3',
          fileList: []
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取文件列表
    getList() {
      getFileList().then(res => {
        // console.log(res)
        if (res.data) {
          this.processList = res.data.processList
        }
      })
    },

    // 获取上传地址
    getAction(id) {
      return `/upload/file?id=${id}`
    },
    // 上传成功
    handleSuccess(response, file, fileList, index) {
      // console.log('success', response, file, fileList, index)
      this.processList[index].fileList = fileList
    },
    // 删除文件
    handleRemove(file, fileList, index) {
      // console.log('remove', file, fileList, index)
      this.processList[index].fileList = fileList
    },
    // 文件预览
    handlePreview(file) {
      if (file.response) {
        this.imgUrl = file.response.data.file
      } else {
        this.imgUrl = file.url
      }
      this.dialogVisible2 = true
    },
    // 提交
    handleSave() {
      console.log(this.processList)
    }
  }
}
</script>
<style scoped lang="less">
    .test li {
      padding: 20px 0;
    }
    .test {
      margin-bottom: 30px;
    }
</style>
