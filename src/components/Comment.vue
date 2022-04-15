<template>
  <div class="comment">
    <div class="head">
      <el-avatar :src="comment.avatarUrl"></el-avatar>
      <span style="margin-left: 10px; font-size: 13px; color: #666666">{{comment.nick}}</span>
    </div>
    <p class="commentContent">{{comment.content}}</p>
    <div class="commentFoot">
      <span style="margin-left: 15px; font-size: 10px; color: #8c939d; flex: 2">{{ comment.timeleft.substr(0,comment.timeleft.length - 1).replace(/T/, ' ') }}</span>
      <span class="alarm" v-on:click="alarm" v-if="!$store.getters.tokenNotExist">
        <span v-if="$store.getters.getCurUser.type !== 0">举报</span>
        <span v-else>删除</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: {
      type: Object,
      /*default: () => {
        return {
          id: 0,
          avatarUrl: 'http://localhost:8000/media/web/img/avatar/default.jpg',
          nick: 'pan33',
          content: '欢迎各位同学!',
          timeleft: new Date()
        }
      }*/
    }
  },
  methods: {
    alarm() {
      if (this.$store.getters.getCurUser.type !== 0) this.$axios({
        url: 'class/alarm_comment',
        params: {
          id: this.comment.id
        },
        method: 'get'
      }).then((res) => {
        if (res.data.respMsg === 'succeed') {
          this.$notify.success({
            title: '感谢反馈!',
            message: '您的举报已上传给系统管理员, 将尽快受理!',
            showClose: true
          });
          this.$emit('alarm', this.comment)
        }
        else throw "反馈失败!"
      }).catch((err)=>{
        this.$message.error(err)
      })
      else {
        this.$axios({
          url: 'class/delete_comment',
          params: {
            id: this.comment.id
          },
          method: 'get'
        }).then((res) => {
          if (res.data.respMsg === 'succeed') {
            this.$message.success('删除成功');
            this.$emit('alarm', this.comment)
          }
          else throw "删除失败!"
        }).catch((err)=>{
          this.$message.error(err)
        })
      }
    }
  }
}
</script>

<style scoped>
.comment {
  margin-top: 15px;
  border-bottom: 1px solid #e3e3e3;
}
.head {
  display: flex;
  align-items: center;
}
.commentContent {
  font-size: 18px;
  margin-inline-start: 1.5em;
  margin-block-end: 0.5em;
  margin-block-start: 0.5em;
  font-family: "微软雅黑", serif;
}
.commentFoot {
  display: flex;
  margin-bottom: 10px;
}
.alarm {
  font-size: 10px;
  color: #8c939d;
  margin-right: 15px;
}
.alarm:hover {
  cursor: pointer;
}
</style>