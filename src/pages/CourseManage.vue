<template>
  <el-main>
    <el-tabs tab-position="left">
      <el-tab-pane label="课程上传">
        <h1 style="padding-left: 3%">课程上传</h1>
        <div>
          <CourseUploadForm></CourseUploadForm>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我上传的">
        <CourseManagePart></CourseManagePart>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
import CourseUploadForm from "@/components/CourseUploadForm";
import CourseManagePart from "@/components/CourseManagePart";
export default {
  name: "CourseUpload",
  components: {
    CourseUploadForm,
    CourseManagePart
  }
}
</script>

<style scoped>
.el-main {
  margin-right: 5%;
  margin-left: 5%;
}
.el-tabs__content {
  overflow-y: auto;
}
</style>