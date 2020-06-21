<template>
  <div>
    <div class="login-content">
      <div class="login-info">
        <h2>登陆</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="account">
            <el-input
            v-model="ruleForm.account"
            :maxlength="50"
            placeholder="账号admin"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input 
            v-model="ruleForm.password" 
            :maxlength="30"
            placeholder="密码123456"
            auto-complete="new-password"
            show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
            <el-button class="forget" type="text" @click="forgetPass.visible=true">忘记密码?</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
          <p>账号密码错误将弹出验证码弹窗</p>
        </el-form>
      </div>
    </div>

  <!-- 忘记密码弹框 -->
  <el-dialog
      append-to-body
      :visible.sync="puzzePass.visible"
      :show-close="false"
      :close-on-click-modal="false"
      width="450px">
      <slideverify 
        :l="42"  ref="dialogopen"
        :r="10"
        :w="410"
        :h="200"
        :block_y="puzzePass.block_y"
        :imgurl="puzzePass.imgurl"
        :miniimgurl="puzzePass.miniimgurl"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
        :slider-text="puzzePass.text"
      ></slideverify>
    </el-dialog>
  </div>
</template>

<script>
  import slideverify from '@/components/Newcap.vue'
  import img1 from '@assets/imgs/rotate1.jpg'
  import img2 from '@assets/imgs/rotate2.jpg'
  import img3 from '@assets/imgs/rotate3.jpg'
  import img4 from '@assets/imgs/rotate4.jpg'
  export default {
    components: {
      slideverify
    },
    data() {
      return {
        ruleForm: {
          account: '',
          password: ''
        },
        forgetPass: {
          visible: false,
          form: {

          },
          rules: {

          }
        }, // 忘记密码字段
        puzzePass: {
          visible: false,
          block_y: 20,
          imgurl: img1,
          miniimgurl: img2,
          text: '右滑',
        }, // 滑块字段
        rules: {
          account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.ruleForm.account !== 'admin'
            || this.ruleForm.password !== '123456') {
              this.$message.error('账号或密码错误')
              this.puzzePass.visible = true
              const h = Math.floor((Math.random()*150))
              console.log(h)
              this.$refs.dialogopen && this.$refs.dialogopen.reset(h)
            } else {
              sessionStorage.setItem('login', 'login')
              this.$router.push('home')
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },

      getImageVerifyCode () {
        const imgobj = {
          // bigImage: 'https://picsum.photos/300/150/?image=248',
          // smallImage: 'https://picsum.photos/300/150/?image=198'
          bigImage: img3, // 大图
          smallImage: img4, // 小图
          yHeight: 100 // 初始y坐标
        }
        this.puzzePass.block_y = imgobj.yHeight
        this.puzzePass.imgurl = imgobj.bigImage
        this.puzzePass.miniimgurl = imgobj.smallImage
         this.$refs.dialogopen && this.$refs.dialogopen.reset(this.puzzePass.block_y)
        // 如果图标是后台获取,base64图片赋值
        // this.imgurl =  'data:image/png;base64,' + imgobj.bigImage
        // this.miniimgurl = 'data:image/png;base64,' + imgobj.smallImage
      },
      onFail () {
        console.log('fail')
      },
      // 验证码拉动距离返回
      onSuccess (left) {
        console.log('succss', left)
        if (left > 20 && left < 160) {
          this.$refs.dialogopen.handleSuccess()
          setTimeout(() => {
            this.puzzePass.visible = false
          }, 1000)
        } else {
          this.$refs.dialogopen.handleFail()
        }
      },
      
      // 刷新验证码
      onRefresh() {
        this.puzzePass.imgurl = ''
        this.puzzePass.miniimgurl = ''
        this.getImageVerifyCode()
      },

      // 忘记密码
      resetPass() {

      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped lang='less'>
.login-content {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(#000, 0.5);
  .login-info {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -180px;
    width: 500px;
    height: 360px;
    background-color: #fff;
    padding-top: 30px;
    padding-right: 40px;
    h2 {
      text-align: center;
      margin-bottom: 30px;
    }
    .forget {
      margin-left: 264px;
    }
  }
}
</style>