<template>
  <div>
    <MainRecommendTitle :title="title"></MainRecommendTitle>
    <MainRecommendCourse :course-list="courseList"></MainRecommendCourse>
  </div>
</template>

<script>
import MainRecommendTitle from "@/components/MainRecommendTitle";
import MainRecommendCourse from "@/components/MainRecommendCourse";

export default {
  name: "MainRecommendPart",
  components: {
    MainRecommendTitle,
    MainRecommendCourse
  },
  props: {
    title: {
      type: String,
      default: '经典推荐'
    },
    courseList: {
      type: Array
    }
  },
}
</script>

<style scoped>

</style>