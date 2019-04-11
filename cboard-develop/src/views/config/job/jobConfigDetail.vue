<template>
  <div class="jobConfigDetail">
    <el-dialog title="定时任务" :visible="outerVisible" @close="onCancel" @open="openOuter" :modal="false" width="40%">
      <el-form :model="form" label-width="110px" size="small">
        <el-form-item label="名称：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select v-model="form.jobType" placeholder="请选择活动区域">
            <el-option label="Send mail" value="mail"></el-option>
          </el-select>
          <el-button type="primary" @click="innerVisible = true">配置</el-button>
        </el-form-item>
        <el-form-item label="有效期：">
          <el-date-picker
            v-model="form.daterange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <!--定时任务时间选择-->
        <!--<el-form-item label="每：">-->
          <!--<el-row>-->
            <!--<el-col :span="5">-->
              <!--<el-select v-model="form.time.cycle" placeholder="请选择">-->
                <!--<el-option-->
                  <!--v-for="item in timeOptions"-->
                  <!--:key="item.value"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</el-col>-->
            <!--<el-col :span="18" :offset="1" v-if="form.time.cycle === 'hours'">-->
            <!--<el-select v-model="form.time.date" placeholder="请选择" clearable>-->
              <!--<el-option-->
                <!--v-for="item in minutesOptions()"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
            <!--<span>分</span>-->
          <!--</el-col>-->
            <!--<el-col :span="18" :offset="1"  v-if="form.time.cycle === 'day'">-->
              <!--<el-time-select-->
                <!--v-model="form.time.date"-->
                <!--:picker-options="{ start: '00:00', step: '00:05', end: '24:00'}"-->
                <!--placeholder="选择时间"-->
                <!--clearable-->
              <!--&gt;</el-time-select>-->
            <!--</el-col>-->
            <!--<el-col :span="18" :offset="1" v-if="form.time.cycle === 'week'">-->
              <!--<el-select v-model="form.time.day" placeholder="请选择" clearable>-->
                <!--<el-option-->
                  <!--v-for="item in weekOptions"-->
                  <!--:key="item.value"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
              <!--<el-time-select-->
                <!--v-model="form.time.date"-->
                <!--:picker-options="{ start: '00:00', step: '00:05', end: '24:00'}"-->
                <!--placeholder="选择时间"-->
                <!--clearable-->
              <!--&gt;</el-time-select>-->
            <!--</el-col>-->
            <!--<el-col :span="18" :offset="1" v-if="form.time.cycle === 'month'">-->
              <!--<el-select v-model="form.time.day" placeholder="请选择" clearable>-->
                <!--<el-option-->
                  <!--v-for="item in monthOptions"-->
                  <!--:key="item.value"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
              <!--<el-time-select-->
                <!--v-model="form.time.date"-->
                <!--:picker-options="{ start: '00:00', step: '00:05', end: '24:00'}"-->
                <!--placeholder="选择时间"-->
                <!--clearable-->
              <!--&gt;</el-time-select>-->
            <!--</el-col>-->
          <!--</el-row>-->
        <!--</el-form-item>-->
      </el-form>
      <el-dialog
        width="30%"
        title="邮件"
        :visible.sync="innerVisible"
        append-to-body>
        <el-form :model="mailConfig" size="small">
          <el-form-item label="收件人：" label-width="80px">
            <el-input type="text" placeholder="" clearable v-model="mailConfig.to"></el-input>
          </el-form-item>
          <el-form-item label="抄送：" label-width="80px">
            <el-input type="text" placeholder="" clearable v-model="mailConfig.cc"></el-input>
          </el-form-item>
          <el-form-item label="秘送：" label-width="80px">
            <el-input type="text" placeholder="" clearable v-model="mailConfig.bcc"></el-input>
          </el-form-item>
          <el-form-item label="主题：" label-width="80px">
            <el-input type="text" placeholder="" clearable v-model="mailConfig.subject"></el-input>
          </el-form-item>
          <el-form-item label="xls密码：" label-width="80px">
            <el-input type="text" placeholder="" clearable v-model="mailConfig.xlspwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addBoard">添加看板</el-button>
          </el-form-item>
          <!--添加看板 start-->
          <el-row class="boardsWarp" v-if="mailConfig.boards.length !== 0">
            <div >
              <el-col :span="7" :offset="3"><div class="boards">看板</div></el-col>
              <el-col :span="9" :offset="3"><div class="boards">类型</div></el-col>
            </div>
          </el-row>
          <el-row  v-for="(item, index) in mailConfig.boards" :key="index">
            <el-col :span="10" :offset="2">
              <el-form-item>
                <el-select v-model="item.id" placeholder="请选择">
                  <el-option-group
                    v-for="group in boardsOptions"
                    :key="group.label"
                    :label="group.label">
                    <el-option
                      v-for="item in group.options"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id">
                    </el-option>
                  </el-option-group>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="2">
              <el-form-item>
              <el-select v-model="item.type" placeholder="请选择">
                <el-option
                  v-for="item in boardsTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="1" :offset="1">
              <el-form-item>
                <el-button icon="el-icon-delete" circle @click="deleteBoard"></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <!--添加看板 end-->
        </el-form>
        <div slot="footer">
          <el-button size="small" @click="OnCancelInner">取消</el-button>
          <el-button type="primary" size="small" @click="onSubmitMailConfig">确定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel" size="small">取 消</el-button>
        <el-button type="primary" @click="onSubmitEditJob" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: 'JobConfigDetail',
  props: {
    visibleDialog: {
      type: Boolean,
      default: false
    },
    updateItem: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      innerVisible: false,
      form: {
        name: '',
        jobType: 'mail',
        time: {
          cycle: '',
          day: '',
          date: ''
        }
      },
      mailConfig: {
        boards: [
          {
            id: '',
            type: ''
          }
        ]
      },
      timeOptions: [
        {
          value: 'minutes',
          label: '分'
        },
        {
          value: 'hours',
          label: '小时'
        },
        {
          value: 'day',
          label: '天'
        },
        {
          value: 'week',
          label: '周'
        },
        {
          value: 'month',
          label: '月'
        }
      ],
      boardsOptions: [
        {
          label: '我创建的看板',
          options: [
            {
              id: 15,
              label: '直播作业-时间序列'
            },
            {
              id: 25,
              label: '群体客户分析-时间序列'
            }
          ]
        },
        {
          label: 'BI预警统计',
          options: [
            {
              id: 1,
              label: '预警周维度统计'
            },
            {
              id: 2,
              label: '预警日维度统计'
            },
            {
              id: 3,
              label: '预警日维度统计_copy'
            }
          ]
        }
      ],
      boardsTypeOptions: [
        {
          value: 'xls',
          label: 'XLS'
        },
        {
          value: 'img',
          label: 'image'
        },
        {
          value: 'xls,img',
          label: 'Both'
        }
      ],
      weekOptions: [
        {
          label: 'Sunday',
          value: 'Sunday'
        },
        {
          label: 'Monday',
          value: 'Monday'
        },
        {
          label: 'Tuesday',
          value: 'Tuesday'
        },
        {
          label: 'Wednesday',
          value: 'Wednesday'
        },
        {
          label: 'Thursday',
          value: 'Thursday'
        },
        {
          label: 'Friday',
          value: 'Friday'
        },
        {
          label: 'Saturday',
          value: 'Saturday'
        }
      ],
      monthOptions: [
        {
          label: '1st',
          value: '1st'
        },
        {
          label: '2nd',
          value: '2nd'
        }
      ]
    }
  },
  computed: {
    outerVisible () {
      console.log(this.visibleDialog)
      return this.visibleDialog
    }
  },
  methods: {
    ...mapActions([
      'saveJob',
      'updateJob'
    ]),
    /**
     * 添加看板
     */
    addBoard () {
      this.mailConfig.boards.push({
        id: '',
        type: ''
      })
    },
    /**
     * 删除看板
     */
    deleteBoard () {
      this.mailConfig.boards.pop()
    },
    /**
     * 外层dialog打开时的回调
     */
    openOuter () {
      this.form = this.updateItem || {
        name: '',
        jobType: 'mail',
        time: {
          cycle: '',
          day: '',
          date: ''
        }
      }
      this.mailConfig = (this.updateItem && this.updateItem.config) || {boards: []}
      console.log('open', this.form, this.mailConfig)
    },
    minutesOptions () {
      const arr = []
      for (let i = 0; i < 60; i = i + 5) {
        arr.push({
          label: i,
          value: i
        })
      }
      return arr
    },
    onCancel () {
      this.$emit('closeDialog')
    },
    OnCancelInner () {
      this.innerVisible = false
    },
    onSubmitMailConfig () {
      this.innerVisible = false
      this.form = Object.assign(this.form, { config: this.mailConfig })
      console.log('mailConfig', this.mailConfig)
    },
    onSubmitEditJob () {
      if (!this.updateItem) {
        console.log('create job', this.form)
        this.saveJob(this.form)
          .then(() => {
            this.$emit('closeDialog')
          })
      } else {
        console.log('edit job', this.form)
        this.updateJob(this.form)
          .then(() => {
            this.$emit('closeDialog')
          })
      }
    }
  }
}
</script>
<style scoped>
  .boardsWarp{
    border-bottom: 1px solid #DCDFE5;
    margin-bottom: 10px;
  }
  .boards{
    text-align: center;
    padding-bottom: 10px;
  }
</style>
