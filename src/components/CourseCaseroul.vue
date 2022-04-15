<template>
  <div class="my-course-caseroul">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(img, item) in images" :key="item">
        <div><img :src="img.url" alt="" /></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Caseroul",
  data() {
    return {
      images: [
        {url: require("../assets/home_page_ 1.png")},
        {url: require("../assets/home_page_ 2.png")},
        {url: require("../assets/home_page_ 3.png")},
        {url: require("../assets/home_page_ 4.png")},
      ]
    }
  }
}
</script>

<style scoped>
.my-course-caseroul {

  text-align: center;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-carousel__item img {
  height: auto;
  width: 100%;
}
.el-carousel__item:nth-child(2n) {
  background-color: #d3dce6;
  /*background-color: #99a9bf;*/
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>