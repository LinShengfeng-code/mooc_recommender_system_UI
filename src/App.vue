<template>
  <div id="app">
    <el-container style="width: 100%">
      <el-header>
        <Navigation></Navigation>
      </el-header>
      <router-view v-if="isRouterAlive"/>
    </el-container>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  name: 'App',
  components: {
    Navigation,
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(()=>{
        this.isRouterAlive = true;
      })
    }
  }
}
</script>
<style scoped>
#app {
  width: 100vw;
  margin: 0;
}
</style>
