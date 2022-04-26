<template>
  <div class="cardBorderStyle" @click="$router.push({path: '/course/' + course.id})">
    <a class="cardLink">
      <el-card shadow="hover" :body-style="cardBodyStyle">
<!--        <img :src="course.imgUrl" class="courseImg" alt="加载失败"/>-->
        <div :style="{backgroundImage: 'url(' + course.imgUrl + ')', backgroundSize: 'cover', backgroundPosition: 'center center'}">
          <img src="../assets/transparent.png" alt="加载失败" class="courseImg"/>
        </div>
<!--        <el-image :src="course.imgUrl"></el-image>-->
        <div style="padding: 14px;">
          <span class="courseTitle">{{course.name.length > 10 ? course.name.substring(0, 10) + '...' : course.name}}</span><br/>
          <span class="courseAbstract">{{course.abstract === ''?'这是一段默认的摘要内容' : course.abstract}}</span>
          <div class="cardBottom">
            <div class="bottomSchool"><span>{{course.school}}</span></div>
            <div class="bottomButton">
              <i class="el-icon-user"></i><span>{{audienceReformat(course.audience)}}</span>
            </div>
          </div>
        </div>
      </el-card>
    </a>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    course: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: function (){
        return {
          id: 2,
          name: '心理学',
          abstract: '这是心理学概论的摘要',
          school: '清华大学',
          imgUrl: 'http://localhost:8000/media/web/img/class/2.jpg',
          audience: 1000
      }}
    }
  },
  data() {
    return {
      currentDate: new Date(),
      cardBodyStyle: {
        padding: '0px',
      },
    }
  },
  methods: {
    audienceReformat(nums) {
      if (nums < 10000) return nums;
      else return parseInt(nums/10000) + '万+';
    },
  }
}
</script>
<style>
.cardLink {
  text-decoration: none;
}
</style>

<style scoped>
.courseImg {
  width: 100%;
  /*width: 18rem;
  height: 10rem;*/
}
.cardBorderStyle {
  padding: 15px 5px 0px;
}
.cardBorderStyle:hover {
  transform: translate(0, -2%);
  cursor: pointer;
}
.courseTitle {
  font-family: "PingFang SC",serif;
  font-size: 18px;
}
.courseAbstract {
  font-family: "Songti SC",serif;
  font-size: 12px;
  color: #666;
}
.cardBottom {
  margin-top: 7px;
  display: flex;
  align-items: center;
}
.cardBottom > .bottomSchool {
  justify-content: flex-start;
  flex: 2;
  color: #999;
  font-size: 14px;
}
.cardBottom > .bottomButton {
  justify-content: flex-end;
  font-size: 14px;
  color: #999999;
}
</style>