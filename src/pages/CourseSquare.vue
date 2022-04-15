<template>
  <el-main>
    <div class="mainPage">
      <CourseCaseroul></CourseCaseroul>
      <MainRecommendPart :course-list="classicCourseList"></MainRecommendPart>
      <MainRecommendPart title="最近上新"></MainRecommendPart>
    </div>
  </el-main>
</template>

<script>
import CourseCaseroul from "@/components/CourseCaseroul";
import MainRecommendPart from "@/components/MainRecommendPart";

export default {
  name: "CourseSquare",
  components: {
    MainRecommendPart,
    CourseCaseroul
  },
  created() {
    this.getClassicRecommend()
  },
  data() {
    return {
      classicCourseList: []
    }
  },
  methods: {
    getClassicRecommend() {
      if (!this.$store.getters.tokenNotExist) {
        this.$axios({
          url: '/class/get_recommend',
          params: {
            uid: this.$store.getters.getCurUser.uid
          },
          method: 'get'
        }).then((res)=>{
          this.classicCourseList = res.data.courseList;
        }).catch((err)=>{
          console.log(err);
        })
      }
      else this.$axios.get('/class/get_recommend')
      .then((res)=>{
        this.classicCourseList = res.data.courseList;
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
.mainPage {
  margin-left: 7%;
  margin-right: 7%;
}

</style>