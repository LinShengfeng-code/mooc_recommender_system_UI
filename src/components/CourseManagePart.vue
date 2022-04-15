<template>
  <div>
      <span class="title1">检索到
        <span style="color: #333333">{{totalCourse}}门</span>
        您上传的课程</span>
    <div>
      <MainRecommendCourse :N="'infinite'" :course-list="courseList"></MainRecommendCourse>
    </div>
    <div class="paginationBottom">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="20"
          :total="totalCourse"
          :current-page.sync="curPage"
          v-on:current-change="getRecommend"
          hide-on-single-page>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import MainRecommendCourse from "@/components/MainRecommendCourse";

export default {
  name: "CourseManagePart",
  components: {
    MainRecommendCourse
  },
  props: {
    tid: {
      type: String,
      default: '20'
    }
  },
  data() {
    return {
      totalCourse: 0,
      curPage: 1,
      courseList: []
    }
  },
  methods: {
    getRecommend() {
      this.$axios({
        url: 'class/get_teacher_course',
        params: {
          tid: this.$store.getters.getCurUser.uid,
          start: (this.curPage - 1) * 20
        },
        method: 'get'
      }).then((res)=>{
        this.courseList = res.data.courseList
        this.totalCourse = res.data.total
      })
    }
  },
  beforeMount() {
    this.getRecommend()
  }
}
</script>

<style scoped>
.title1 {
  color: #999999;
  padding: 0 6px;
}
.paginationBottom {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>