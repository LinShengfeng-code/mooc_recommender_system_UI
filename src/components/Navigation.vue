<template>
  <keep-alive>
    <div>
      <div class="nav my-container">
        <div class="my-title">
          <h1>
            <img src="../assets/GoMOOCLogo.png" height="40">
            <router-link to="/">Go MOOC</router-link>
          </h1>
        </div>
        <div class="my-nav-menu">
          <el-row type="flex" justify="end">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
              <el-menu-item index="1" class="nav-character"><router-link to="/">课程广场</router-link></el-menu-item>
              <el-menu-item index="2" class="nav-character"><router-link to="/about">关于我们</router-link></el-menu-item>
              <el-menu-item>
                <el-input placeholder="搜索课程" v-model="searchContent" class="input-with-select" @keyup.enter.native="search(searchContent)">
                  <el-button slot="append" icon="el-icon-search" @click="search(searchContent)"></el-button>
                </el-input>
              </el-menu-item>
              <template v-if="this.$store.getters.tokenNotExist">
                <el-menu-item>
                  <el-button type="primary" @click="openLoginDialog('register')">登录/注册</el-button>
                </el-menu-item>
              </template>
              <template v-else>
                <el-menu-item>
                  <UserInfoNav></UserInfoNav>
                </el-menu-item>
              </template>
            </el-menu>
          </el-row>
        </div>
        <!--    </div>-->
      </div>
      <LoginDialog :login-dialog-visible.sync="loginVisible"></LoginDialog>
    </div>
  </keep-alive>
<!--  </header>-->
</template>

<script>
import LoginDialog from "@/components/LoginDialog";
import UserInfoNav from "@/components/UserInfoNav";

export default {
  name: "Navigation",
  components: {
    UserInfoNav,
    LoginDialog,
  },
  data: function () {
    return {
      activeIndex: '1',
      loginVisible: false,
      testLogin: false,
      searchContent: '',
    }
  },
  inject: ['reload'],
  methods: {
    openLoginDialog(val) {
      this.loginVisible = true
      this.activeName = val
    },
    closeLoginDialog() {
      this.loginVisible = false
    },
    search(s) {
      if (s === '') return null;
      this.$router.push({path: '/all', query:{keyword: s}})
      this.reload()
      this.searchContent = '';
    }
  }
}
</script>

<style>
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-tooltip__popper.is-light.info-div {
  border: none;
  box-shadow: 0 0 20px #e6e6e6;
}
.info-div .popper__arrow {

}
.info-div .popper__arrow::after {
  border-bottom-color: #f5f7fa !important;/*设置指向箭头的颜色*/
  border: none;
}
</style>

<style scoped>
.my-container {
  display: flex;
  align-items: center;
  margin-left: 5%;
  margin-right: 5%;
}
.my-container > .my-title {
  flex: 2;
}
.my-container > .my-nav-menu {
  flex: 4;
}
.my-container > div > h1 {
  margin: 0;
  display: flex;
  align-items: center;
}
.my-container > div > h1 > a {
  color: #333;
  margin-left: 15px;
  text-decoration: none;
  font-family: "Impact",serif;
  font-size: 32px;
}
.nav {
  border-bottom: 1px solid #e6e6e6;
  z-index: 999;
}
.nav-character > a {
  text-decoration: none;
}

</style>