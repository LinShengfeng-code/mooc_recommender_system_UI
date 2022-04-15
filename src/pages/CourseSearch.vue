<template>
  <el-container style="margin-right: 6%; margin-left: 6%; margin-top: 1px">
    <el-aside width="200px" style="border-right: 1px solid #e3e3e3;min-height: 91vh; background: transparent; overflow-x: hidden">
      <el-menu style="border-right: none" v-bind="typeList" :default-active="curType" v-on:select="handleType">
        <el-submenu index="allType">
          <template slot="title"><i class="el-icon-s-order"></i>课程分类</template>
          <el-menu-item v-for="t in typeList" :key="t.index" :index="t.index.toString()">{{t.name}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <CourseSearchMain :t="curType"></CourseSearchMain>
    </el-main>
  </el-container>
</template>

<script>
import CourseSearchMain from "@/components/CourseSearchMain";
export default {
  name: "CourseSearch",
  components: {CourseSearchMain},
  beforeMount() {
    this.getAllTypes()
  },
  data() {
    return {
      typeList: [{
        index: 0,
        name: '全部'
      }],
      curType: '0',
    }
  },
  methods: {
    getAllTypes() {
      this.$axios.get('/class/get_all_types')
      .then((res)=>{
        this.typeList = this.typeList.concat(res.data.typeList)
      }).catch((err)=>{
        console.log(err)
      })
    },
    handleType(index, indexPath) {
      this.curType = index;
      console.log(indexPath)
    }
  }
}
</script>

<style scoped>
.all {
  margin-left: 7%;
  margin-right: 7%;
}
li:hover {
  background: none;
  color: #409EFF;
}
</style>