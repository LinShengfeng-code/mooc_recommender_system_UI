<template>
  <div v-loading="courseList.length === 0">
      <span class="title1">检索到
        <span style="color: #333333">{{totalCourse}}门</span>
        相关课程</span>
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
  name: "CourseSearchMain",
  components: {MainRecommendCourse},
  props: {
    t: {
      type: String,
      default: '0'
    },
  },
  watch: {
    t() {
      this.curPage = 1
      this.getRecommend()
    }
  },
  data() {
    return {
      courseList: [],
      curPage: 1,
      totalCourse: 0,
      currentType: '0',
    }
  },
  beforeMount() {
    this.getRecommend()
  },
  methods: {
    getRecommend() {
      if (this.$route.query.keyword === '' || this.$route.query.keyword === undefined){
        let recommendUrl = '/class/get_all_recommends/' + this.$store.getters.getCurUser.uid + '/' + ((this.curPage - 1) * 20) + '/' + this.t;
        this.$axios.get(recommendUrl)
            .then((res) => {
              this.courseList = res.data.courseList;
              this.totalCourse = res.data.total;
            }).catch((err) => {
          console.log(err)
        })
      }
      else {
        this.$axios({
          url: '/class/search_courses',
          params: {
            keyWord: this.$route.query.keyword,
            start: this.curPage
          },
          method: 'get'
        }).then((res) => {
          this.courseList = res.data.courseList;
          this.totalCourse = res.data.total;
        })
      }
    }
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