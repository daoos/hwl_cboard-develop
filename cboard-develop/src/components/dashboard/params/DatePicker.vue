<template>
    <div  style="padding:0">
      <el-date-picker
          v-model="value"
          :default-value="defaultValue"
          @change="handleChange"
          type="daterange"
          :value-format="valueFormat"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
    </div>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    param: {
      type: Object,
      required: true
    },
    filterId: String,
    currentValue: String
  },
  watch: {
    param () {
      this.init()
    }
  },
  created () {
    this.valueFormat = this.param.cfg.format
    this.width = this.param.cfg.width

    this.init()
  },
  data () {
  	return {
  		value: '',
      defaultValue: '2018-01-01',
      options: [],
      valueFormat: 'yyyy-MM-dd',
      width: '4'
  	}
  },
  methods: {
    init () {
      this.options = []
      this.param.col.forEach(col => {
        let params = {
          datasetId: col.datasetId,
          colmunName: col.column
        }
        this.$store.dispatch('params/getDimensionValues', params)
          .then((data) => {
            this.options = this.options.concat(data)
            if (this.options[0]) {
              this.defaultValue = this.options[0]
            }
          })
          .catch(() => {})
      })
    },
    handleChange (value) {
      let filter
      if (value) {
        filter = {
          col: this.param.col[0].column,
          type: '[a,b]',
          filterId: this.filterId,
          paramType: 'DatePicker',
          values: value
        }
      } else {
        filter = {
          col: this.param.col[0].column,
          type: '[a,b]',
          filterId: this.filterId,
          paramType: 'DatePicker',
          values: ''
        }
      }
      this.$store.commit('params/setFilter', filter)
    }
  }
}
</script>

<style>

</style>
