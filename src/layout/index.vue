<template>
  <div class="contanier">
    <div class="left-contanier">
      <SiderMenu />
    </div>
    <div class="right-contanier">
      <div class="bread">
        <div class="left-bread">
          <BreadCrumb />
        </div>
        <div class="right-bread">
          <el-dropdown @command="clickDropdown">
            <span class="el-dropdown-link">
              潇潇羽西<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="img-view">
          <el-avatar class="img-icon" icon="el-icon-user-solid"></el-avatar>
        </div>
      </div>
      <div class="view-container">
        <div class="view-main">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SiderMenu from './components/sider'
  import BreadCrumb from './components/breadcrumb'

  export default {
    components: {
      SiderMenu,
      BreadCrumb
    },
    methods: {
      clickDropdown(command) {
        // console.log(44, command)
        if (command === '1') {
          sessionStorage.removeItem('login')
          this.$router.push({name: 'login'})
        }
      }
    }
  }
</script>

<style scoped lang="less">
.contanier {
  display: flex;
  position: relative;
  height: 100%;
  .left-contanier {
    flex-basis: 250px;
    height: 100%;
    ul {
      height: 100%;
    }
  }
  .right-contanier {
    flex: 1;
    background-color: #e0e0e0;
    height: 100%;
    overflow: auto;
    .bread {
      padding: 0 20px;
      background-color: #fff;
      height: 60px;
      .left-bread {
        float: left;
        padding-top: 20px;
      }
      .img-view {
        padding-top: 15px;
        float: right;
        .img-icon {
          width: 30px;
          height: 30px;
          line-height: 30px;
          margin-right: 15px;
        }
      }
      .right-bread {
        float: right;
        padding-top: 20px;
      }
    }
    .view-container {
      padding: 20px;
      max-height: ~"calc(100% - 100px)";
      height: ~"calc(100% - 100px)";
      overflow-y: scroll;
      .view-main {
        background-color: #fff;
        padding: 20px;
        min-height: ~"calc(100% - 50px)";
      }
    }
  }
}
</style>