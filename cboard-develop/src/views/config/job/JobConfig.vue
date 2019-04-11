<template>
    <div class="job">
      <div class="header">
        <el-row>
          <el-col :span="4" class="title">定时任务</el-col>
          <el-col :span="5" :offset="14">
            <el-form :inline="true" :model="form">
              <el-form-item>
                <el-button type="primary" class="createBtn" @click="onCreate" circle size="small" icon="el-icon-plus"></el-button>
              </el-form-item>
              <el-form-item>
                <el-input type="text" v-model="form.id" placeholder="Search" size="small" clearable/>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-search" size="small"></el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <el-table
        :data="jobData"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="jobType"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="daterange"
          label="有效期"
        />
        <el-table-column
          prop="lastExecTime"
          label="最后执行时间"
        />
        <el-table-column
          prop="jobStatus"
          label="状态"
        />
        <el-table-column
          prop="userName"
          label="创建人"
        />
        <el-table-column
          label="操作"
          fixed="right"
          width="220"
        >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="执行" placement="top-start">
              <el-button type="success" icon="el-icon-caret-right" circle size="small"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <el-button type="primary" icon="el-icon-edit" circle size="small" @click="onEdit(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <el-button type="danger" icon="el-icon-delete" circle size="small" @click="onDelete(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看" placement="top-start">
              <el-button type="info" icon="el-icon-view" circle size="small" @click="onView(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <job-config-detail :visible-dialog="visibleDialog" :update-item="updateItem" @closeDialog="closeDialog"/>
      <el-dialog
        title="提示"
        :visible.sync="tipDialogVisible"
        :modal="false">
        <div>{{ execLog }}</div>
      </el-dialog>
    </div>
</template>

<script>
import JobConfigDetail from './jobConfigDetail'
import { mapActions } from 'vuex'
export default {
  name: 'JobConfig',
  components: {
    JobConfigDetail
  },
  data () {
  	return {
  	  form: {id: ''},
      visibleDialog: false,
      updateItem: {},
      execLog: '',
      tipDialogVisible: false
  	  // list: [
      //   {
      //     id: 0,
      //     name: '邮件',
      //     jobType: 'Send Mail',
      //     daterange: '2019-03-26 ~ 2019-05-01',
      //     lastExecTime: '2019-03-26 15:07:42',
      //     jobStatus: '失败',
      //     userName: 'Administrator'
      //   }
      // ]
  	}
  },
  computed: {
    jobData () {
      return this.$store.state.job.jobData
    }
  },
  created () {
    this.$store.dispatch('getJobData')
  },
  methods: {
    ...mapActions([
      'deleteJob'
    ]),
    onCreate () {
      this.visibleDialog = true
      this.updateItem = null
    },
    onEdit (item) {
      this.visibleDialog = true
      this.updateItem = item
      console.log('edit job', item)
    },
    onDelete (item) {
      console.log('delete job', item)
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteJob(item.id)
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    onView (item) {
      this.execLog = item.execLog
      this.tipDialogVisible = true
      console.log('view execLog', item)
    },
    closeDialog () {
      this.visibleDialog = false
    }
  }
}
</script>

<style scoped>
  .job{
    margin: 0 15px;
  }
  .job .header{
    background: white;
    padding: 15px 5px;
  }
  .job .header .title{
    font-size: 20px;
  }
  .job .createBtn{
    margin: 0 8px;
  }
</style>
<style>
  .job .el-dialog__header{
    border-bottom: 1px solid #DCDFE5;
  }
  .job .el-table th, .el-table tr{
    text-align: center;
  }
</style>
