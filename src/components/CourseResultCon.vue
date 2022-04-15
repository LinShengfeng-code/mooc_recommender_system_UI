<template>
  <div class="resultCon">
    <div class="leftImg" :style="{backgroundImage: 'url(' + course.imgUrl + ')'}">
      <el-image :src="require('../assets/transparent.png')"></el-image>
    </div>
    <div class="rightCon">
      <p>{{course.name}}</p>
      <p>{{course.teacher}} | {{course.school}}</p>
      <p>{{course.abstract}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseResultCon",
  props: {
    course: {
      type: Object,
      default: () => {
        return {
          id: 2,
          name: '心理学概论',
          abstract: '这是心理学概论的摘要',
          teacher: 'pan33',
          school: '浙江工业大学',
          imgUrl: 'http://localhost:8000/media/web/img/class/2.jpg',
          audience: 1000
        }
      }
    }
  }
}
</script>

<style scoped>

</style>