<template>
  <el-main>
    <div class="auditPage">
      <h1 style="border-bottom: 1px solid #e3e3e3; padding-bottom: 10px">评论审核</h1>
      <CourseCommentBoard :comments.sync="commentsAlarm"></CourseCommentBoard>
    </div>
  </el-main>
</template>

<script>
import CourseCommentBoard from "@/components/CourseCommentBoard";
export default {
  name: "AuditComments",
  components: {CourseCommentBoard},
  async created() {
    await this.getAlarmComments()
  },
  data() {
    return {
      commentsAlarm: []
    }
  },
  methods: {
    async getAlarmComments() {
      await this.$axios({
        url: 'class/obtain_alarmed_comments',
        method: 'get'
      }).then((res) => {
        for (let i in res.data.comments) res.data.comments[i].avatarUrl = 'http://localhost:8000/media/' + res.data.comments[i].avatarUrl
        this.commentsAlarm = res.data.comments
      }).catch((err) => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style scoped>
.auditPage {
  margin-left: 7%;
  margin-right: 7%;
}
</style>