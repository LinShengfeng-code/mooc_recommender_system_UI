<template>
  <el-popover placement="bottom" trigger="hover" v-model="infoPopperVisible" popper-class="info-div" width="80">
    <div style="text-align: center; margin: 0; padding: 0">
      <el-button type="text" class="info-button"><router-link to="/me">个人主页</router-link></el-button>
      <el-divider class="infotip-divider"></el-divider>
      <el-button type="text" class="info-button" v-if="$store.getters.getCurUser.type === 1"><router-link to="/courseUpload">上传课程</router-link></el-button>
      <el-button type="text" class="info-button" v-if="$store.getters.getCurUser.type === 0"><router-link to="/audit">审核</router-link></el-button>
      <el-divider class="infotip-divider" v-if="$store.getters.getCurUser.type === 1 || $store.getters.getCurUser.type === 0"></el-divider>
      <el-button type="text" class="info-button" @click="logOut">退出登录</el-button>
    </div>
    <el-button class="nav-userinfo" slot="reference">
      <el-avatar :src="'http://localhost:8000/media/' + (this.$store.getters.getCurUser.avatar === undefined ? 'web/img/avatar/default.jpg':this.$store.getters.getCurUser.avatar)"></el-avatar>
    </el-button>
  </el-popover>
</template>

<script>
export default {
  name: "UserInfoNav",
  data() {
    return {
      infoPopperVisible: false
    }
  },
  methods: {
    logOut() {
      this.$store.commit('setToken', '')
      this.$store.commit('setCurUser', {})
      if(this.$route.path !== '/') this.$router.push('/')
    }
  }
}
</script>
<style>
.info-div {
  padding: 0;
  min-width: 0;
}
.info-div > .info-button {
  width: 1px;
}
.info-button > span > a {
  text-decoration: none;
  color: #409EFF;
}
</style>
<style scoped>
.nav-userinfo {
  background: none;
  border: none;
  padding: 0;
}
div > .infotip-divider {
  margin-top: 0;
  margin-bottom: 0;
}
</style>