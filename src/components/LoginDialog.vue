<template>
  <el-dialog title="登录/注册" :visible="LoginDialogVisible" @close="closeLoginDialog()" width="40%" center>
    <div style="display: flex; justify-content: center; align-items: center">
      <el-tabs v-model="activeName" @tab-click="loadSchools">
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginForm" label-position="left" ref="loginForm" :rules="rulesLogin" @keyup.enter.native="loginOrRegister">
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="mail">
              <el-input v-model="loginForm.mail" autocomplete="off" type="email"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" prop="pwd">
              <el-input v-model="loginForm.pwd" autocomplete="off" type="password"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form :model="registerForm" label-position="left" ref="registerForm" :rules="rulesRegister" @keyup.enter.native="loginOrRegister">
            <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
              <el-radio-group v-model="registerForm.type" @change="changeType">
                <el-radio :label="1">教师</el-radio>
                <el-radio :label="2">学生</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="学校" :label-width="formLabelWidth" prop="sid">
              <el-select v-model="registerForm.sid" filterable placeholder="请选择学校" @change="queryCollege">
                <el-option
                    v-for="item in schools"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学院" :label-width="formLabelWidth" prop="cid">
              <el-select v-model="registerForm.cid" filterable placeholder="请选择学院">
                <el-option
                    v-for="item in colleges"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="mail">
              <el-autocomplete v-model="registerForm.mail" placeholder="请输入正确格式的邮箱" :fetch-suggestions="querySearchMail" :trigger-on-focus="false" clearable></el-autocomplete>
            </el-form-item>
            <el-form-item label="昵称" :label-width="formLabelWidth" prop="nick">
              <el-input v-model="registerForm.nick" type="text" autocomplete="off" maxlength="10" minlength="3" clearable show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" prop="pwd">
              <el-input v-model="registerForm.pwd" autocomplete="off" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth" prop="pwdConfirm">
              <el-input v-model="registerForm.pwdConfirm" autocomplete="off" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="入学年份" :label-width="formLabelWidth">
              <el-date-picker type="year" value-format="yyyy" format="yyyy" :placeholder="intimePlaceHolder" v-model="registerForm.intime" :disabled="stuDisabled"></el-date-picker>
            </el-form-item>
            <el-form-item label="学生类型" :label-width="formLabelWidth">
              <el-radio-group v-model="registerForm.degree" :disabled="stuDisabled">
                <el-radio :label="0">本科</el-radio>
                <el-radio :label="1">硕士</el-radio>
                <el-radio :label="2">博士</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm()">重 置</el-button>
      <el-button type="primary" @click="loginOrRegister">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "LoginDialog",
  props: {
    LoginDialogVisible: Boolean
  },
  inject: ['reload'],
  data() {
    let validateMailFormat = async (rule, value, callback) => {
      if (!this.mailRE.test(this.registerForm.mail)) callback(new Error('邮箱格式不正确'));
      else {
        await this.$axios
            .get('/users/mail_repeat', {
              params: {
                mail: this.registerForm.mail
              }
            })
            .then((res) => {
              if (res.data.respMsg === false) callback(new Error('邮箱已被注册'))
            })
            .catch((err) => {
              console.log(err)
              callback(new Error('网络错误'))
            })
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if(value === '') callback(new Error('请输入密码'));
      else if(!this.pwdFormatCheck(this.registerForm.pwd)) callback(new Error('长6-18位, 需含大小写字母及数字'));
      else {
        if (this.registerForm.pwdConfirm !== '') {
          this.$refs.registerForm.validateField('pwdConfirm');
        }
        callback();
      }
    };
    let validPassConfirm = (rule, value, callback) => {
      if(value === '') callback(new Error('请再次输入密码'));
      else if(value !== this.registerForm.pwd) callback(new Error('两次输入的密码不一致!'));
      else callback();
    }
    let validateNick = async (rule, value, callback) => {
      await this.$axios
          .get('/users/nick_repeat', {
            params: {
              nick: this.registerForm.nick
            }
          })
          .then((res) => {
            if (res.data.respMsg === false) callback(new Error('昵称已被注册'))
          })
          .catch((err) => {
            console.log(err)
            callback(new Error('未知错误'))
          })
      callback()
    };
    return {
      activeName: 'login',
      intimePlaceHolder: '选择入学年份',
      stuDisabled: false,
      formLabelWidth: '80px',
      mailRE: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
      mailList: [
        {'value': "@qq.com"},
        {'value': "@163.com"},
        {'value': "@gmail.com"},
        {'value': "@firefox.com"}
      ],
      loginForm: {
        mail: '',
        pwd: ''
      },
      registerForm: {
        type: 2,
        mail: '',
        sid: undefined,
        cid: undefined,
        intime: undefined,
        degree: undefined,
        nick: '',
        pwd: '',
        pwdConfirm: '',
      },
      rulesRegister: {
        type: [
          {required: true, message: '请选择类型', trigger: 'change'}
        ],
        mail: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: validateMailFormat, trigger: 'change'}
        ],
        sid: [
          {required: true, message: '请选择学校', trigger: 'change'}
        ],
        cid: [
          {required: true, message: '请选择学院', trigger: 'change'}
        ],
        nick: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},
          {validator: validateNick, trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        pwdConfirm: [
          {required: true, message: '请确认密码', trigger: 'blur'},
          {validator: validPassConfirm, trigger: 'blur'}
        ]
      },
      rulesLogin: {
        type: [
          {required: true, message: '请选择类型', trigger: 'change'}
        ],
        mail: [
          {required: true, message: '请填写邮箱', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      schools: [],
      colleges: []
    }
  },
  methods: {
    closeLoginDialog() {
      this.$parent.closeLoginDialog()
    },
    changeType(t) {
      if (t === '1') {
        this.intimePlaceHolder = '您无需选择';
        this.stuDisabled = true;
      } else {
        this.intimePlaceHolder = '选择入学年份';
        this.stuDisabled = false;
      }
    },
    loadSchools(tab) {
      if (tab.index === "1"){
        this.$axios
            //1. 向目标url发起请求
            .get('/users/show_schools')
            //2. 成功时的回调函数
            .then((res) => {
              this.schools = [];
              for (let i = 0; i < res.data.list.length; i++) {
                let newSchool = {value: res.data.list[i].pk, label: res.data.list[i].fields.sname};
                this.schools.push(newSchool);
              }
            })
            //3. 失败时的回调函数
            .catch((err) => {
              console.log(err)
              this.$message.error('未知错误');
            })
      }
    },
    loginOrRegister() {
      if (this.activeName === 'register') { // 注册
        this.$refs['registerForm'].validate((valid) => {
          if (valid) {
            // 使用axios传输数据
            this.$axios({
              url: 'users/add_new_user',
              method: 'post',
              data: JSON.stringify(this.registerForm),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((res)=>{
              res.data.cur_user = JSON.parse(res.data.cur_user)
              res.data.cur_user.avatar = 'web/img/avatar/default.jpg'
              this.$store.commit('setToken', res.data.token)
              this.$store.commit('setCurUser', res.data.cur_user)
              this.$notify.success({
                title: '注册成功!',
                message: '请尽快进入个人主页定义您的兴趣，祝您学习愉快!',
                showClose: true
              });
              this.reload()
              this.closeLoginDialog()
            })
            .catch((err) => {
              console.log(err)
              this.$message.error(err)
            })
          } else {
            this.$message.error('提交信息错误!');
            return false;
          }
        })
      }
      else { // 登录
        this.$refs['loginForm'].validate((valid)=>{
          if (valid) {
            // 使用axios传输数据
            this.$axios({
              url: 'users/log_in',
              method: 'post',
              data: JSON.stringify(this.loginForm),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((res)=>{
              if(typeof(res.data.token) == 'undefined') this.$message.error(res.data.code + ': ' + res.data.errmsg);
              else {
                this.$store.commit('setToken', res.data.token)
                if (typeof(res.data.cur_user.avatar) == 'undefined') {
                  res.data.cur_user = JSON.parse(res.data.cur_user)
                  res.data.cur_user.avatar = 'web/img/avatar/default.jpg'
                }
                this.$store.commit('setCurUser', res.data.cur_user)
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                this.reload()
                this.closeLoginDialog()
              }
            }).catch((err) => this.$message.error(err))
          }
        })
      }
    },
    queryCollege(school) {
      this.$axios
        .get('/users/show_colleges',{
          params: {
            sid: school
          }
        })
        .then((res) => {
          this.colleges = []
          for (let i = 0 ;i < res.data.list.length; i++) {
            let newCollege = {value: res.data.list[i].pk, label: res.data.list[i].fields.cname};
            this.colleges.push(newCollege)
          }
        })
      .catch((err) => {
        console.log(err)
      })
    },
    querySearchMail(queryMail, callback) {
      let mailList = this.mailList;
      let results = JSON.parse(JSON.stringify(mailList))
      for (let item in results) {
        results[item].value = queryMail + '' + mailList[item].value;
      }
      callback(results);
    },
    pwdFormatCheck(pwd) {
      if (pwd.length < 6 || pwd.length > 18) return false;
      // eslint-disable-next-line no-unused-vars
      let lower = 0, upper = 0, digit = 0;
      for (let i = 0; i < pwd.length; i++) {
        if ('a' <= pwd[i] && 'z' >= pwd[i]) lower++;
        else if('A' <= pwd[i] && 'Z' >= pwd[i]) upper++;
        else if('0' <= pwd[i] && '9' >= pwd[i]) digit++;
      }
      return !(lower === 0 || upper === 0 || digit === 0);
    },
    resetForm() {
      let formName = this.activeName === 'login'?'loginForm':'registerForm';
      this.intimePlaceHolder = '选择入学年份';
      this.stuDisabled = false;
      this.$nextTick(()=>{
        this.$refs[formName].resetFields();
      })
      this.pwdConfirm = '';
      this.registerForm.degree = undefined;
      this.registerForm.intime = undefined;
    }
  }
}
</script>

<style scoped>

</style>