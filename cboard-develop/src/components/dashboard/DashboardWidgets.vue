<template>
  <div>

    <div v-for="(widget,index) in widgets" :class="'col-md-'+widget.width" :key="index">
      <div v-if="widget.type === 'column'">
        <div v-for="(row,index2) in widget.rows" :key="index2">
          <div v-if="row.type === 'widget'">
            <dashboard-widgets :widgets="row.widgets" :height="row.height" class="row"></dashboard-widgets>
          </div>
        </div>
      </div>
      <component v-else
                 :is="currentComponent(widget)"
                 :widget="widget"
                 :filters="filters"
                 :height="height"></component>
    </div>

  </div>
</template>

<script>
export default {
  name: 'DashboardWidgets',
  props: {
    widgets: {
      type: Array,
      required: true
    },
    height: {
      type: String
    }
  },
  components: {
    KpiContent: () => import('./widgets/KpiContent'),
    ChartContent: () => import('./widgets/ChartContent'),
    TableContent: () => import('./widgets/TableContent'),
    MapContent: () => import('./widgets/MapContent'),
    RadarContent: () => import('@/components/dashboard/widgets/RadarContent'), // 雷达图
    FunnelContent: () => import('@/components/dashboard/widgets/FunnelContent'), // 漏斗图
    ScatterContent: () => import('@/components/dashboard/widgets/ScatterContent'),
    ChinaMapContent: () => import('@/components/dashboard/widgets/ChinaMapContent')
  },
  created () {

  },
  data () {
    return {
    }
  },
  methods: {
    currentComponent (widget) {
      switch (widget.widget.data.config.chart_type) {
        case 'line':
        case 'pie':
        case 'contrast':
          return 'ChartContent'
        case 'kpi':
          return 'KpiContent'
        case 'table':
          return 'TableContent'
        case 'map':
          return 'MapContent'
        case 'radar':
          return 'RadarContent'
        case 'funnel':
          return 'FunnelContent'
        case 'chinaMap':
          return 'ChinaMapContent'
        case 'scatter':
          return 'ScatterContent'
        default:
          return 'ChartContent'
      }
    }
  },
  computed: {
    filters () {
      /* eslint-disable-next-line */
      this.loadComplete = false
      return this.$store.state.params.filters
    }
  }
}
</script>

<style>

</style>
