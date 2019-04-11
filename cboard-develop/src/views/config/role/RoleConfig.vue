<template>
    <div class="role">
      <el-row>
        <el-col :span="10">
          <el-card class="box-card">
            <div slot="header" class="header">
              <span><i class="el-icon-share"></i>你的资源</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <el-tree
              :data="data2"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps">
            </el-tree>
          </el-card>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-card class="box-card">
            <div slot="header">
             <el-row>
               <el-col :span="3"><el-button size="small">查找</el-button></el-col>
               <el-col :span="21"><el-input type="text" placeholder="角色管理" size="small"></el-input></el-col>
             </el-row>
            </div>
            <div>
              <li>
                <ul>BI小组</ul>
                <ul>分析师</ul>
                <ul>看板用户</ul>
                <ul>管理员</ul>
              </li>
            </div>
          </el-card>
          <div style="text-align: right; margin: 5px">
            <el-button type="primary" size="small">分享</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'RoleConfig',
  computed: {
    ...mapState([
      'widgetListUser',
      'datasetListUser'
    ])
  },
  data () {
    return {
      defaultProps: {},
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }]
    }
  },
  created () {
    this.getWidgetListUser()
    this.getDatasetListUser()
  },
  methods: {
    ...mapActions([
      'getWidgetListUser',
      'getDatasetListUser'
    ])
  }
}
</script>
<style>
  .role label{
    margin-bottom: 0 !important;
  }
</style>
<style scoped>
.role{
  margin: 0 15px;
}
.role .el-card{
  margin-top: 15px;
}
.role .el-card .header{
  font-size: 18px;
  font-weight: bold;
}
</style>
