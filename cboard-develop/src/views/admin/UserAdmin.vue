<template>
	<div class="userAdmin">
    <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5">
			<div class="grid-content">
				<div class="actBar">
					<i class="fa fa-user"></i>
					<p>用户管理</p>
					<i class="fa fa-user-plus" @click="addUser"></i>
					<i class="fa fa-pencil-square-o" @click="editUser"></i>
					<i class="fa fa-trash-o" @click="delUser('user')"></i>
				</div>
				<div class="searchBar">
					<el-switch v-model="searchBy" active-text="角色" inactive-text="名称"></el-switch>
					<el-select v-if="searchBy" v-model="activeRoleOption" placeholder="请选择">
						<el-option
							v-for="item in roleList" :key="item.$id"
							:label="item.$name" :value="item.$id">
						</el-option>
					</el-select>
					<el-input v-else v-model="inputName" placeholder="请输入"
						@keyup.native="filterUser('user')"></el-input>
				</div>
				<ul class="content-list">
					<li v-for="item in userList" :key="item.$id" @click="pickUser(item.$id, 'user')"
					:class="{selected: item.selected, hide: !item.show}">{{item.$name}}
					</li>
				</ul>
				<div class="btn-group">
					<el-button type="primary" @click="delUser('user')">移除用户</el-button>
					<el-button type="success" @click="addUserToRole">添加到角色组</el-button>
				</div>
			</div>
		</el-col>
  	<el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5">
			<div class="grid-content">
				<div class="actBar">
					<i class="fa fa-user"></i>
					<p>角色管理</p>
					<i class="fa fa-plus" @click="addRole"></i>
					<i class="fa fa-pencil-square-o" @click="activeBoard = 'role'"></i>
					<i class="fa fa-trash-o" @click="delUser('role')"></i>
				</div>
				<div class="searchBar">
					<el-input placeholder="请输入" v-model="inputRole" class="input-with-select"
						@keyup.native="filterUser('role')">
						<template slot="prepend">查找</template>
					</el-input>
				</div>
				<ul class="content-list">
					<li v-for="item in roleList" :key="item.$id" @click="pickUser(item.$id, 'role')"
					:class="{selected: item.selected, hide: !item.show}">{{item.$name}}</li>
				</ul>
				<div class="btn-group">
					<el-button type="success" @click="updateUserInfo">更新角色资源权限</el-button>
				</div>
			</div>
		</el-col>
  	<el-col :xs="24" :sm="24" :md="8" :lg="12" :xl="14">
			<div class="grid-content bg-purple-light">
				<div v-if="activeBoard === 'user'" class="broad-wrapper">
					<div class="broad-title">用户管理</div>
					<el-form label-width="40px" :model="userForm">
						<el-form-item label="账号">
							<el-input v-model="userForm.account"></el-input>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input v-model="userForm.name"></el-input>
						</el-form-item>
						<el-form-item label="密码">
							<el-input v-model="userForm.password" type="password"></el-input>
						</el-form-item>
					</el-form>
					<div class="broad-footer">
						<el-button type="success" @click="submitUser">保存</el-button>
					</div>
				</div>
				<div v-if="activeBoard === 'role'" class="broad-wrapper">
					<div class="broad-title">角色管理</div>
					<el-form label-width="60px" :model="roleForm">
						<el-form-item label="角色名">
							<el-input v-model="roleForm.name"></el-input>
						</el-form-item>
						<el-form-item label="管理员">
							<el-select v-model="roleForm.user" placeholder="请选择" style="width:100%;">
								<el-option v-for="item in userList" :key="item.$name"
									:value="item.$id" :label="item.$name"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<div class="broad-footer">
						<el-button type="success" @click="submitRole">保存</el-button>
					</div>
				</div>
				<div v-if="activeBoard === 'config'" class="broad-wrapper">
					<el-tabs v-model="activeTab" type="card" @tab-click="changeTab">
						<el-tab-pane label="菜单" name="first">
							菜单
						</el-tab-pane>
						<el-tab-pane label="看板" name="second">
							看板
						</el-tab-pane>
						<el-tab-pane label="数据源" name="third">
							数据源
						</el-tab-pane>
						<el-tab-pane label="数据集" name="fourth">
							数据集
						</el-tab-pane>
						<el-tab-pane label="图表" name="fifth">
							图表
						</el-tab-pane>
						<el-tab-pane label="定时任务" name="sixth">
							定时任务
						</el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</el-col>
	</div>
</template>

<script>
/* eslint-disable-next-line */
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'UserAdmin',
  data () {
    return {
      searchBy: false,
      inputName: '',
      activeRoleOption: '',
      inputRole: '',
      selectedUser: '',
      selectedRole: '',
      activeBoard: '',
      activeTab: 'first'
    }
  },
  computed: {
    ...mapGetters({
      userList: 'user/userList',
      roleList: 'user/roleList'
    }),
    userForm () {
      let obj = this.userList.find((item) => {
        return item.$id === this.selectedUser
      })
      return {
        account: obj && obj.$id,
        name: obj && obj.$name,
        password: obj && obj.userPassword
      }
    },
    roleForm () {
      let obj = this.roleList.find((item) => {
        return item.$id === this.selectedRole
      })
      return {
        user: '',
        name: obj && obj.$name
      }
    }
  },
  methods: {
    // 点选用户
    pickUser (id, flag) {
      let list = flag === 'user' ? this.userList : this.roleList
      for (let i = 0, item; item = list[i++];) {
        this.$set(item, 'selected', item.$id === id)
      }
      let userId = list.find((item) => {
        return item.selected
      }).$id
      flag === 'user' ? this.selectedUser = userId : this.selectedRole = userId
      this.activeBoard = 'config'
    },
    // 搜索过滤
    filterUser (flag) {
      let list = flag === 'user' ? this.userList : this.roleList
      let str = flag === 'user' ? this.inputName : this.inputRole
      for (let i = 0, item; item = list[i++];) {
        this.$set(item, 'show', item.$name.includes(str))
      }
    },
    // 删除用户
    delUser (flag) {
      let userId = flag === 'user' ? this.selectedUser : this.selectedRole

      userId && this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addUserToRole () {

    },
    updateUserInfo () {

    },
    // 添加用户
    addUser () {
      this.activeBoard = 'user'
      this.selectedUser = ''
    },
    // 编辑用户
    editUser () {
      if (!this.selectedUser) {
        this.activeBoard = ''
        return this.$message({
          type: 'info',
          message: '请先选则用户'
        })
      }
      this.activeBoard = 'user'
    },
    // 添加角色
    addRole () {
      this.activeBoard = 'role'
      this.selectedRole = ''
    },
    // 编辑角色
    editRole () {
      if (!this.selectedRole) {
        this.selectedRole = ''
        return this.$message({
          type: 'info',
          message: '请先选则角色'
        })
      }
      this.selectedRole = 'role'
    },
    // 提交保存用户信息
    submitUser () {

    },
    // 提交保存角色信息
    submitRole () {

    },
    changeTab () {

    }
  },
  created () {
    this.$store.dispatch('user/getUserList')
    this.$store.dispatch('user/getRoleList')
  }
}
</script>

<style scoped>
.userAdmin{
	padding: 1rem;
}
.el-col{
	padding: 1rem;
}
.actBar{
	display: flex;
	font-size: 20px;
	line-height: 20px;
}
.actBar p{
	flex: 1;
}
.searchBar{
	display: flex;
	align-items: center;
}
.el-switch{
	margin-right: .5rem;
}
.el-input, .el-select {
	flex: 1;
}
.fa{
	cursor: pointer;
}
.content-list{
	height: 600px;
	margin-top: 1rem;
	border: 1px solid #ccc;
	background-color: #fff;
	overflow: auto;
}
.content-list li{
	margin: .2rem .5rem;
	cursor: pointer;
}
.content-list li:hover{
	background-color: #eee;
}
.content-list li.selected{
	background-color: #166fb1;
}
.content-list li.hide{
	display: none;
}
.btn-group{
	display: flex;
	justify-content: space-around;
}
.broad-wrapper{
	padding: .5rem;
	background-color: #fff;
	border-radius: 3px;
	border-top: 3px solid #d2d6de;
	box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}
.broad-title{
	font-size: 20px;
	padding: 0 0 .5rem .5rem;
	border-bottom: 1px solid #eee;
}
.el-form {
	padding: 1rem .5rem;
}
.broad-footer{
	padding: .5rem .5rem;
	text-align: right;
	border-top: 1px solid #eee;
}
</style>
