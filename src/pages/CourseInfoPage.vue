<template>
  <div>
    <div class="courseTop">
      <div class="wrap"></div>
      <div class="courseDash">
        <div class="headInfo">
          <div>
            <p class="title">{{course.name}}</p>
          </div>
          <div >
            <span class="provide">
              <i class="el-icon-upload"></i> Provided By<br/>
            </span>
            <p class="school">{{course.school}}</p>
          </div>
        </div>
        <div class="headInfo">
          <div>
            <span class="infoTitle">上传时间:</span>
            <p class="infoContent">{{changeTimeFormat(course.time)}}</p>
          </div>
          <div>
            <span class="infoTitle">主讲教师:</span>
            <p class="infoContent">{{course.teacher}}</p>
          </div>
        </div>
        <div class="headInfo">
          <div>
            <span class="audience">{{course.audience}}人已报名</span>
          </div>
          <div>
            <el-button class="join" v-on:click="enroll" :disabled="enrolled">加入学习</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="introduction">
        <div class="abstract">
          <div class="shortInfo">
            <p class="abstractTitle">课程介绍</p>
            <p class="abstractContent" style="margin-top: 24px">这是一段关于本课程的介绍，现在还没有内容，后续会发布，请持续关注，谢谢！关注 Go MOOC, 获取最新慕课，谢谢！</p>
          </div>
          <div class="video">
            <el-image :src="course.imgUrl" style="border-radius: 4px"></el-image>
          </div>
        </div>
      </div>
      <div class="relative">
        <MainRecommendPart title="相关推荐" :course-list="relativeCoursesList"></MainRecommendPart>
      </div>
      <div class="commentBoard">
        <p class="abstractTitle">课程评论
          <span v-if="!enrolled" style="color: #999999; font-size: 14px"> 参与课程学习后方可发表</span>
        </p>
        <AddComment v-if="enrolled" @add="add_comments"></AddComment>
        <CourseCommentBoard :comments.sync="comments"></CourseCommentBoard>
      </div>
    </div>
  </div>
</template>

<script>
import CourseCommentBoard from "@/components/CourseCommentBoard";
import AddComment from "@/components/AddComment";
import MainRecommendPart from "@/components/MainRecommendPart";
export default {
  name: "CourseInfoPage",
  components: {MainRecommendPart, AddComment, CourseCommentBoard},
  async created() {
    await this.getCourseInfo(this.$route.params.courseId)
    this.getEnrolled()
    this.getRelativeCourses()
    this.getComments()
  },
  data() {
    return {
      course: {},
      enrolled: false,
      comments: [],
      relativeCoursesList: []
    }
  },
  methods: {
    enroll() {
      if (this.$store.getters.tokenNotExist) this.$message.error('请先登录')
      else {
        let formData = new FormData()
        formData.append('uid', this.$store.getters.getCurUser.uid)
        formData.append('courseid', this.$route.params.courseId)
        this.$axios({
          url: 'class/enroll',
          data: formData,
          method: 'POST'
        }).then((res) => {
          if (res.data.respMsg === 'succeed') {
            this.enrolled = true
            this.$notify.success({
              title: '成功!',
              message: '您已加入' + this.course.name + '课程学习!',
              showClose: true
            });
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    getEnrolled() {
      if (this.$store.getters.getCurUser.nick === this.course.teacher) {
        this.enrolled = true
      }
      else if(!this.$store.getters.tokenNotExist) {
        this.$axios({
          url: 'class/check_enrolled',
          params: {
            uid: this.$store.getters.getCurUser.uid,
            courseid: this.$route.params.courseId
          },
          method: 'get'
        }).then((res) => {
          this.enrolled = res.data.respMsg
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    async getCourseInfo(id) {
      await this.$axios.get('/class/get_single_course/' + id)
      .then((res) => {
        this.course = res.data.course;
      }).catch((err) => {
        console.log(err);
      })
    },
    changeTimeFormat(t) {
      if (typeof(t) === 'string') t = t.split('T')[0]
      return t;
    },
    getRelativeCourses() {
      this.$axios({
        url: 'class/get_relative_courses',
        params: {
          cid: this.$route.params.courseId
        },
        method: 'get'
      }).then((res) => {
        this.relativeCoursesList = res.data.courseList
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    getComments() {
      this.$axios({
        url: 'class/show_comments',
        params: {
          courseid: this.$route.params.courseId
        },
        method: 'get'
      }).then((res) => {
        for (let i in res.data.comments) res.data.comments[i].avatarUrl = 'http://localhost:8000/media/' + res.data.comments[i].avatarUrl
        res.data.comments.sort((a, b) => {
          if (a.id < b.id) return 1;
          else if (a.id > b.id) return -1;
          else return 0;
        })
        this.comments = res.data.comments
      })
    },
    add_comments(c) {
      this.comments.push(c)
    }
  }
}
</script>

<style scoped>
.join {
  padding: 13px 0;
  width: 10vw;
  cursor: pointer;
  border-radius: 4px;
  background: #fcfcfc;
  border: none;
}
.courseTop {
  width: 100vw;
  height: 365px;
  background: url("../assets/course_background.png");
  background-size: cover;
  z-index: 0;
  position: relative;
}
.infoTitle {
  color: #f5f7fa;
}
.audience {
  font-size: 16px;
  color: #f5f7fa;
}
.infoContent {
  margin-block-start: 0;
  margin-block-end: 0;
  font-family: "Apple Braille",serif;
  font-size: 18px;
  color: #e6e6e6;
  min-height: 100px;
}
.courseDash {
  margin-left: 11%;
  margin-right: 11%;
  width: 78%;
  z-index: 2;
  position: absolute;
  top: 0
}
.headInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/*.meng {
  width: 100%;
  height: 365px;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.5);
  z-index: 1;
}*/
.title {
  color: #f5f7fa;
  font-size: 32px;
  min-height: 90px;
}
.school {
  color: #f5f7fa;
  font-size: 24px;
  margin-block-start: 0;
  margin-block-end: 0;
  font-family: Kai,serif;
  min-height: 90px;
}
.wrap {
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  z-index: 1;
}
.provide {
  font-family: "Apple Braille",serif;
  color: aliceblue;
  background-image: -webkit-linear-gradient(right, #96c93d, rgba(116, 253, 3, 0.99), #00b09b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.info {
  margin: 0 auto;
  padding: 0 16px;
  /*max-width: 83.5%;*/
  max-width: 1202px;
}
.abstract {
  margin-top: 64px;
  display: flex;
}
.shortInfo {
  width: 50%;
  padding-right: 20px;
}
.abstractTitle {
  font-size: 34px;
  color: #333;
  line-height: 1.4;
  margin: 0;
}
.abstractContent {
  color: #999;
  line-height: 23px;
  font-size: 14px;
  font-family: '.AppleSystemUIFont',serif;
}
.video {
  width: 50%;
  border-radius: 4px;
  padding-left: 20px;
  position: relative;
  display: flex;
  justify-content: center;
}
.commentBoard {
  margin-top: 40px;
}
.commentBoard > .abstractTitle {
  border-bottom: 1px solid #e3e3e3;
}
.relative {
  margin-top: 20px;
}
</style>