<template>
    <el-form :model="uploadCourse" label-width="80px" :rules="uploadRules">
      <div class="courseUploadForm">
        <div class="courseUploadFormLeft">
          <el-form-item label="课程名称" prop="name">
            <el-input v-model="uploadCourse.name" placeholder="请输入课程名称"></el-input>
          </el-form-item>
          <el-form-item label="课程类型" prop="type">
            <el-select v-model="uploadCourse.type" placeholder="请选择">
              <el-option
                  v-for="item in options"
                  :key="item.index"
                  :label="item.name"
                  :value="item.index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程图片">
            <el-upload
                class="upload-demo"
                action="/"
                v-model="courseImgFile"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :http-request="saveCourseImg"
                list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </div>
        <div class="courseUploadFormRight">
          <el-form-item label="课程链接">
            <el-input v-model="uploadCourse.link"></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="uploadCourse.abstract">
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="bottomSlot">
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </div>
          </el-form-item>
        </div>
      </div>
    </el-form>
</template>

<script>
export default {
  name: "CourseUploadForm",
  mounted() {
    this.getAllTypes()
  },
  data() {
    let validateCourseName = async (rule, value, callback) => {
      await this.$axios
          .get('/class/valid_name', {
            params: {
              name: this.uploadCourse.name
            }
          })
          .then((res) => {
            if (res.data.respMsg === false) callback(new Error('课程名称已被注册'))
          }).catch((err) => {
            console.log(err)
            callback(new Error('网络错误'))
          })
      callback();
    };
    return {
      uploadCourse: {
        name: '',
        type: '',
        abstract: '',
        link: '',
      },
      uploadRules: {
        name: [
          {required: true, message: '请输入课程名称', trigger: 'blur'},
          {validator: validateCourseName, trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择课程类型', trigger: 'change'}
        ]
      },
      courseImgFile: '',
      courseFormData: new FormData(),
      options: [],
      fileList: []
    }
  },
  methods: {
    getAllTypes() {
      this.$axios.get('/class/get_all_types')
      .then((res) => {
        console.log(res.data.typeList)
        this.options = res.data.typeList
      }).catch((err)=>{
        console.log(err)
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    saveCourseImg(params) {
      console.log(params)
      this.courseFormData.append('courseImgFile', params.file);
    },
    onSubmit() {
      if (this.$store.getters.tokenNotExist){
        this.$message.error('您尚未登录!')
      }
      else if (this.$store.getters.getCurUser.type !== 1) {
        this.$message.error('您无此权限')
      }
      else{
        this.uploadCourse.tid =  this.$store.getters.getCurUser.uid
        for (let key in this.uploadCourse){
          this.courseFormData.append(key, this.uploadCourse[key])
        }
        this.$axios({
          url: '/class/create',
          method: 'POST',
          data: this.courseFormData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res)
          this.$notify.success({
            title: '感谢上传!',
            message: '您的课程已提交给系统管理员, 将尽快审核!',
            showClose: true
          });
          this.$router.push({path: '/'})
        }).catch((err)=>{
          this.$message.error(err)
          console.log(err)
        })
      }
    }
  }
}
</script>

<style scoped>
.courseUploadForm {
  display: flex;
  width: 100%;
}
.courseUploadFormLeft {
  flex: 1;
  padding-left: 3%;
}
.courseUploadFormRight {
  flex: 1;
  padding-left: 5%;
  /*float: top;*/
}
.bottomSlot {
  float: right;
}
</style>