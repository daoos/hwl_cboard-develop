<template>
  <div>
    <el-tabs tab-position="left">

      <el-tab-pane label="Legend">
        <div class="option-wrapper">
          <div class="option-item row">
            <div class="col-md-6">
              <label>Align:</label>
              <el-select v-model="option.legend.align" size="small" placeholder="请选择">
                <el-option
                  v-for="item in alignOptions"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
            <div class="col-md-6">
              <label>Orient:</label>
              <el-select v-model="option.legend.orient" size="small" placeholder="请选择">
                <el-option
                  v-for="item in orientOptions"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="option-item row">
            <div class="col-md-6">
              <label>Top:</label>
              <el-input v-model="option.legend.top" size="small" placeholder="输入 n%/number/string"></el-input>
            </div>
            <div class="col-md-6">
              <label>Bottom:</label>
              <el-input v-model="option.legend.bottom" size="small" placeholder="输入 n%/number/string"></el-input>
            </div>
          </div>
          <div class="option-item row">
            <div class="col-md-6">
              <label>Left:</label>
              <el-input v-model="option.legend.left" size="small" placeholder="输入 n%/number/string"></el-input>
            </div>
            <div class="col-md-6">
              <label>Right:</label>
              <el-input v-model="option.legend.right" size="small" placeholder="输入 n%/number/string"></el-input>
            </div>
          </div>
          <div class="option-item">
            <el-button size="mini" @click="clearOption('legend')">清除</el-button>
            <el-button type="primary" size="mini" @click="applyOption('legend')">应用</el-button>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Value">
        <div class="option-wrapper">
          <div class="option-item row">
            <div class="col-md-12">
              <label>Color:</label>
              <el-input style="width: 300px" v-model="option.value.color" size="small" placeholder="输入颜色代码，英文逗号隔开"></el-input>
            </div>
          </div>
          <div class="option-item">
            <el-button size="mini" @click="clearOption('value')">清除</el-button>
            <el-button type="primary" size="mini" @click="applyOption('value')">应用</el-button>
          </div>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'ScatterOption',
  data () {
    return {
      option: {
        legend: {
          align: '',
          orient: '',
          top: '',
          bottom: '',
          left: '',
          right: ''
        },
        value: {
          color: ''
        }
      },
      orientOptions: ['horizontal', 'vertical'],
      alignOptions: ['auto', 'left', 'right'],
      sortOptions: ['descending', 'ascending', 'none']
    }
  },
  methods: {
    applyOption (type) {
      let obj = {}
      obj[type] = this.option[type]
      this.$emit('apply-option', obj)
    },
    clearOption (type) {
      let obj = {}
      obj[type] = {}
      for (let prop in this.option[type]) {
        obj[type][prop] = ''
        this.option[type][prop] = ''
      }
      this.$emit('clear-option', obj)
    }
  }
}
</script>

<style scoped>
.option-wrapper {
  padding: 10px;
}
.option-item {
  margin-right: 0px;
  margin-left: 0px;
  margin-bottom: 20px;
}
.option-item label {
  width: 55px;
}
.option-item .el-input {
  width: 180px;
}
.option-item .el-button {
  float: right;
  margin-right: 30px;
  margin-top: 10px;
}

</style>
