<template>
  <aside class="main-sidebar">
      <div class="user-panel clearfix">
        <div class="pull-left image">
            <img src="../assets/user-male-circle-blue-128.png" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
            <p>admin</p>
        </div>
      </div>

      <div class="tip-menu">菜单</div>

      <el-menu
        router
        :collapse="collapse"
        :default-active="$route.path"
        background-color="#222d32"
        text-color="#b8c7ce"
        active-text-color="#fff">

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>BI预警统计</span>
          </template>

          <template v-for="category in categoryList">
            <el-submenu :index="'/dashboard/'+category.name" :key="category.id">
              <template slot="title"><i class="el-icon-document"></i>{{ category.name }}</template>
              <el-menu-item v-for="board in boardList"
                v-if="inTheCategory(category.id, board)"
                :index="'/dashboard/'+category.name+'/'+board.id" :key="board.id">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ board.name }}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-submenu>

        <el-submenu :index="'/'+menuItem.menuCode" v-for="menuItem in menuList" :key="menuItem.menuId">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ $t(menuItem.menuName) }}</span>
          </template>
          <el-menu-item :index="formatRouteByMenuCode(childItem.menuCode)" v-for="childItem in menuItem.children" :key="childItem.menuId">
            <i class="el-icon-document"></i>
            <span slot="title">{{$t(childItem.menuName)}}</span>
          </el-menu-item>
        </el-submenu>

      </el-menu>
    </aside>
</template>

<script>

export default {
  name: 'MainSider',
  props: {
    collapse: Boolean
  },
  computed: {
    menuList () {
      return this.$store.state.menu.menuList
    },
    categoryList () {
      return this.$store.state.menu.categoryList
    },
    boardList () {
      return this.$store.state.menu.boardList
    }
  },
  data () {
    return {

    }
  },
  methods: {
    hasChildren (category) {
      for (let i = 0, l = this.boardList.length; i < l; i++) {
        if (category.id === this.boardList[i].categoryId) return true
      }
      return false
    },
    inTheCategory (categoryId, board) {
      return categoryId === board.categoryId
    },
    formatRouteByMenuCode (menuCode) {
      const menuCodeArr = menuCode.split('.')
      return '/' + menuCodeArr[0] + '/' + menuCodeArr[1]
    }
  }
}
</script>

<style scoped>
.user-panel{
  position: relative;
  width: 100%;
  padding: 10px;
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
}
.user-panel > .image > img {
  width: 100%;
  max-width: 45px;
  height: auto;
}
.img-circle {
  border-radius: 50%;
}
.user-panel .info {
  padding: 5px 5px 5px 15px;
  line-height: 1;
  position: absolute;
  left: 55px;
  color: #fff;
  margin: 4px 0 0 5px;
}
.user-panel > .info > p {
  font-weight: 600;
  margin-bottom: 9px;
}
.tip-menu {
  position: relative;
  margin: 0;
  cursor: pointer;
  white-space: nowrap;
  padding: 10px 25px 10px 15px;
  font-size: 12px;
  background: #1a2226;
  color: #4b646f;
}
.el-menu {
  border-right: none;
}

.layout-wrapper.is-collapse .main-sidebar {
  width: 70px!important;
}

</style>
