<template>
  <div class="mainCommentForm">
    <el-form v-model="commentForm">
      <el-form-item>
        <div style="display: flex">
          <div style="flex: 2; padding-right: 20px"><el-input placeholder="我来说一句……" v-model="commentForm.content" clearable></el-input></div>
          <div><el-button type="primary" v-on:click="onSubmit">发送</el-button></div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddComment",
  data() {
    return {
      commentForm: {
        content: '',
        uid: this.$store.getters.getCurUser.uid,
        courseid: this.$route.params.courseId
      }
    }
  },
  methods: {
    onSubmit() {
      let commentFormData = new FormData()
      for (let key in this.commentForm) {
        commentFormData.append(key, this.commentForm[key])
      }
      this.$axios({
        url: 'class/leave_comment',
        data: commentFormData,
        method: 'post'
      }).then((res) => {
        res.data.comment.avatarUrl = 'http://localhost:8000/media/' + res.data.comment.avatarUrl
        this.$emit('add', res.data.comment)
        this.$notify.success({
          title: '留言成功!',
          message: '感谢您的留言!',
          showClose: true
        })
      }).catch((err) => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style scoped>
.mainCommentForm {
  width: 98%;
  margin: 20px auto 20px;
  border-bottom: 1px solid #e3e3e3;
}
</style>