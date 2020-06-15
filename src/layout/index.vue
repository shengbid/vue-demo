<template>
  <div class="contanier">
    <div class="left-contanier">
      <SiderMenu />
    </div>
    <div class="right-contanier">
      <div class="bread">
        <BreadCrumb />
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
      padding: 20px;
      background-color: #fff;
    }
    .view-container {
      padding: 20px;
      .view-main {
        background-color: #fff;
        padding: 20px;
      }
    }
  }
}
</style>