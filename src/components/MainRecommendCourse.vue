<template>
  <div class="mainRecommendPart">
    <el-row v-for="(row, idx) in Math.ceil(getTotal()/4)" :key="idx">
      <el-col :span="6" v-for="(o, index) in Math.min(4, getTotal() - (row - 1) * 4)" :key="index">
        <CourseCard :course="courseList[(o - 1) + (row - 1) * 4]"></CourseCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CourseCard from "@/components/CourseCard";
export default {
  name: "MainRecommendCourse",
  components: {CourseCard},
  props: {
    courseList: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => [{
          id: 0,
          name: '中国建筑史（上）',
          abstract: '这是中国建筑史（上）的摘要',
          school: '清华大学',
          imgUrl: 'http://localhost:8000/media/web/img/class/0.jpg',
          audience: 30005
        }, {
        id: 1,
        name: '外国工艺美术史',
        abstract: '这是外国工艺美术史的摘要',
        school: '清华大学',
        imgUrl: 'http://localhost:8000/media/web/img/class/1.jpg',
        audience: 3005
        }, {
          id: 2,
          name: '心理学概论',
          abstract: '这是心理学概论的摘要',
          school: '清华大学',
          imgUrl: 'http://localhost:8000/media/web/img/class/2.jpg',
          audience: 50005
        }, {
        id: 3,
        name: '经济学原理',
        abstract: '这是经济学原理的摘要',
        school: '清华大学',
        imgUrl: 'http://localhost:8000/media/web/img/class/3.jpg',
        audience: 34452
      }, {
        id: 4,
        name: '经济学原理',
        abstract: '这是经济学原理的摘要',
        school: '清华大学',
        imgUrl: 'http://localhost:8000/media/web/img/class/4.jpg',
        audience: 10000
      },{
        id: 5,
        name: '中国建筑史（上）',
        abstract: '这是中国建筑史（上）的摘要',
        school: '清华大学',
        imgUrl: 'http://localhost:8000/media/web/img/class/0.jpg',
        audience: 30005
      }, {
        id: 6,
        name: '外国工艺美术史',
        abstract: '这是外国工艺美术史的摘要',
        school: '清华大学',
        imgUrl: 'http://localhost:8000/media/web/img/class/1.jpg',
        audience: 3005
      }, {
        id: 7,
        name: '心理学概论',
        abstract: '这是心理学概论的摘要',
        school: '清华大学',
        imgUrl: 'http://localhost:8000/media/web/img/class/2.jpg',
        audience: 50005
      }, {
        id: 8,
        name: '经济学原理',
        abstract: '这是经济学原理的摘要',
        school: '清华大学',
        imgUrl: 'http://localhost:8000/media/web/img/class/3.jpg',
        audience: 34452
      }, {
        id: 9,
        name: '经济学原理',
        abstract: '这是经济学原理的摘要',
        school: '清华大学',
        imgUrl: 'http://localhost:8000/media/web/img/class/4.jpg',
        audience: 10000
      },{
        id: 10,
        name: '中国建筑史（上）',
        abstract: '这是中国建筑史（上）的摘要',
        school: '清华大学',
        imgUrl: 'http://localhost:8000/media/web/img/class/0.jpg',
        audience: 30005
      }, {
        id: 11,
        name: '外国工艺美术史',
        abstract: '这是外国工艺美术史的摘要',
        school: '清华大学',
        imgUrl: 'http://localhost:8000/media/web/img/class/1.jpg',
        audience: 3005
      }, {
        id: 12,
        name: '心理学概论',
        abstract: '这是心理学概论的摘要',
        school: '清华大学',
        imgUrl: 'http://localhost:8000/media/web/img/class/2.jpg',
        audience: 50005
      }, {
        id: 13,
        name: '经济学原理',
        abstract: '这是经济学原理的摘要',
        school: '清华大学',
        imgUrl: 'http://localhost:8000/media/web/img/class/3.jpg',
        audience: 34452
      }, {
        id: 14,
        name: '经济学原理',
        abstract: '这是经济学原理的摘要',
        school: '清华大学',
        imgUrl: 'http://localhost:8000/media/web/img/class/4.jpg',
        audience: 10000
      },{
        id: 15,
        name: '中国建筑史（上）',
        abstract: '这是中国建筑史（上）的摘要',
        school: '清华大学',
        imgUrl: 'http://localhost:8000/media/web/img/class/0.jpg',
        audience: 30005
      }]
    },
    N: {
      type: String,
      default: '5'
    }
  },
  methods: {
    getTotal() {
      if (this.N === 'infinite') return this.courseList.length;
      else return Math.min(this.courseList.length, parseInt(this.N));
    }
  }
}
</script>

<style scoped>
.mainRecommendPart {
  margin-top: 1%;
}
</style>