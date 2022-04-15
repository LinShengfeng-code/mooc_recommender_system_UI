<template>
  <div class="mainCommentBoard">
    <div v-if="comments.length === 0" style="margin-top: 20px">
      暂无相关评论
    </div>
    <div v-for="item in comments" :key="item.id">
      <Comment :comment="item" @alarm="deleteComment"></Comment>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment";
export default {
  name: "CourseCommentBoard",
  components: {Comment},
  props: {
    comments: {
      type: Array
    }
  },
  methods: {
    deleteComment: function (c) {
      for (let i in this.comments) {
        if (this.comments[i] === c) this.comments.splice(i, 1)
      }
      this.$emit('update:comments', this.comments)
    }
  }
}
</script>

<style scoped>
.mainCommentBoard {
  width: 98%;
  margin: 0 auto 20px;
}
</style>