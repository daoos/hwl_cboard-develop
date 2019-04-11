<template>
  <div class="dashboard-warpper">
    <div class="actBar">
      <el-button type="primary" @click="myLike">我的收藏</el-button>
      <el-button type="primary" @click="like">收藏</el-button>
    </div>
    <div class="actPanel">
      <div class="input">
        输入:<i class="fa fa-plus-square-o" @click="input"></i>
      </div>
      <div class="output">
        输出:<i class="fa fa-plus-square-o" @click="output"></i>
      </div>
    </div>
    <div class="funBar">
      <el-button type="primary" @click="clear">清空</el-button>
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="dataPanel">
      <div class="actBar">
        <el-button type="primary" @click="download">下载</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboardWarpper',
  data () {
    return {
      routerId: this.$router.currentRoute.path.split('/').reverse()[0]
    }
  },
  computed: {

  },
  methods: {
    // 我的收藏
    myLike () {

    },
    // 收藏
    like () {

    },
    // 输入
    input () {

    },
    // 输出
    output () {

    },
    // 清空
    clear () {

    },
    // 查询
    search () {

    },
    // 下载
    download () {

    }
  },
  created () {
    console.log(this.routerId, '------------------------')
  },
  beforeRouteUpdate (to, from, next) {
    this.routerId = to.path.split('/').reverse()[0]
    next()
  }
}
</script>

<style scoped>
.dashboard-warpper{
  padding: 1rem;
}
.actBar{
  text-align: right;
}
.actPanel{
  margin: .5rem 0;
  padding: .5rem 1rem;
  background-color: #fff;
  font-size: 20px;
}
.input, .output{
  padding: .5rem 0;
}
.output{
  border-top: 1px solid #eee;
}
.fa{
  cursor: pointer;
  color: #409EFF;
}
.funBar{
  margin: 1rem;
  text-align: center;
}
.dataPanel{
  padding: 1rem;
  min-height: 400px;
  background-color: #fff;
}
</style>
