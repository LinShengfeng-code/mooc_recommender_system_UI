<template>
  <span>
    <span style="color: #409EFF; font-size: 14px; cursor: pointer" @click="interestDialogVisible=true">定义我的兴趣</span>
    <el-dialog title="选择兴趣" :visible.sync="interestDialogVisible" width="50%">
      <el-checkbox-group v-model="interestList">
        <el-checkbox label="创业"></el-checkbox>
        <el-checkbox label="电子"></el-checkbox>
        <el-checkbox label="工程"></el-checkbox>
        <el-checkbox label="化学"></el-checkbox>
        <el-checkbox label="环境·地球"></el-checkbox>
        <el-checkbox label="公共管理"></el-checkbox>
        <el-checkbox label="经管·会计"></el-checkbox>
        <el-checkbox label="建筑"></el-checkbox>
        <el-checkbox label="教育"></el-checkbox>
        <el-checkbox label="历史"></el-checkbox>
        <el-checkbox label="汽车"></el-checkbox>
        <el-checkbox label="社科·法律"></el-checkbox>
        <el-checkbox label="生命科学"></el-checkbox>
        <el-checkbox label="医学·健康"></el-checkbox>
        <el-checkbox label="数学"></el-checkbox>
        <el-checkbox label="外语"></el-checkbox>
        <el-checkbox label="文学"></el-checkbox>
        <el-checkbox label="物理"></el-checkbox>
        <el-checkbox label="艺术·设计"></el-checkbox>
        <el-checkbox label="计算机" style="margin-right: 44px"></el-checkbox>
        <el-checkbox label="哲学"></el-checkbox>
        <el-checkbox label="职场"></el-checkbox>
        <el-checkbox label="其他"></el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="interestDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
export default {
  name: "InterestDialog",
  inject: ['reload'],
  created() {
    this.getInterests()
  },
  data() {
    return {
      interestDialogVisible: false,
      interestList: []
    }
  },
  methods: {
    getInterests() {
      this.$axios({
        url: 'users/get_interests',
        params: {
          uid: this.$store.getters.getCurUser.uid
        },
        method: 'get'
      }).then((res) => {
        this.interestList = res.data.interestList
      }).catch((err)=>{
        console.log(err)
      })
    },
    submit() {
      let f = {
        uid: this.$store.getters.getCurUser.uid,
        interestList: this.interestList
      }
      this.$axios({
        url: 'users/modify_intentions',
        data: JSON.stringify(f),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post'
      }).then((res) => {
        if (res.data.respCode === '200') {
          this.$message({
            message: '更新兴趣成功',
            type: 'success'
          })
          this.interestDialogVisible=false
          this.reload()
        }
      }).catch(() => {
        this.$message({
          message: '网络错误',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>