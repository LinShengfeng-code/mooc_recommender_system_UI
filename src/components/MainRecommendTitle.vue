<template>
  <el-row>
    <el-col>
      <div class="recommendTitleDiv">
        <span class="recommendTitle">{{this.title}}</span>
        <router-link to="/all" class="loadAll">查看课程库>></router-link>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "MainRecommendTitle",
  props: {
    title: {
      type: String,
      default: '经典推荐'
    }
  }
}
</script>

<style scoped>
.recommendTitle {
  font-size: 34px;
  font-family: "PingFang SC",serif;
  flex: 2;
}
.recommendTitleDiv {
  margin-top: 1%;
  margin-bottom: -15px;
  border-bottom:1px solid #409EFF;
  display: flex;
  align-items: center;
}
.loadAll {
  text-decoration: none;
  color: #409EFF;
}
</style>