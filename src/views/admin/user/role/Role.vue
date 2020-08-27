<template>
  <div id="role">
    <!--操作-->
    <el-row class="operate-list" :gutter="20">
      <el-col :span="8" class="operate-item">
        <el-input class="input-search" placeholder="请输入名称" v-model="search" clearable
          @keyup.enter.native="searchItem">
        </el-input>
      </el-col>
      <el-button type="primary" icon="el-icon-search" @click="searchItem">搜索</el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addItem" v-permission="18">添加</el-button>
      <template v-if="currentRow">
        <el-button type="primary" icon="el-icon-edit" @click="editItem" v-permission="19">修改</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="deleteItem" v-permission="20">删除</el-button>
        <el-button type="primary" icon="el-icon-user" @click="setPower" v-if="currentRow.id" v-permission="21">设置权限</el-button>
      </template>
    </el-row>
    <!--表格-->
    <el-table ref="table" :data="roleList" border highlight-current-row
              @current-change="handleCurrentChange"
    >
      <el-table-column type="index" label="ID" width="50"></el-table-column>
      <el-table-column prop="project_name" label="项目"></el-table-column>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination v-if="totalNum" background layout="prev, pager, next" @current-change="changePage"
                   :total="totalNum" :current-page="currentPage" :page-size="pageSize"
    >
    </el-pagination>
    <!--dialog-->
    <transition name="fade-dialog" mode="out-in">
      <el-dialog v-if="dialogShow" :visible.sync="dialogShow" :title="dialogTitle" :modal="false" top="1">
        <!--设置项目权限-->
        <template v-if="dialogTitle == '设置权限'">
          <power-set :currentRow="currentRow"></power-set>
        </template>
        <!--角色添加/编辑-->
        <template v-else>
          <role-add :title="dialogTitle"  :currentRow="currentRow"></role-add>
        </template>
      </el-dialog>
    </transition>
  </div>
</template>

<script>
import RoleAdd from './components/RoleAdd'
import PowerSet from './components/PowerSet'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Role',
  components: { RoleAdd, PowerSet },
  data () {
    return {
      search: '',
      currentPage: 1,
      pageSize: 10,
      currentRow: '',
      dialogTitle: '未定义'
    }
  },
  computed: {
    ...mapState('admin/user/role', [
      'roleList', 'totalNum'
    ]),
    dialogShow: {
      get () {
        return this.$store.state.admin.user.role.dialogShow
      },
      set (value) {
        this.setDialogShow(value)
      }
    }
  },
  activated () {
    this.$store.dispatch('admin/checkActivated').then((res) => {
      if (res) {
        this.init()
        this.search = ''
        this.getRoleList({ page: this.currentPage, pageSize: this.pageSize, search: this.search })
      }
    })
  },
  methods: {
    ...mapActions('admin/user/role', [
      'getRoleList', 'deleteRole'
    ]),
    ...mapMutations('admin/user/role', [
      'setDialogShow'
    ]),
    init () {
      this.currentPage = 1
      this.pageSize = 10
      this.currentRow = ''
    },
    searchItem () {
      this.init()
      this.getRoleList({ page: 1, pageSize: this.pageSize, search: this.search })
    },
    changePage (page) {
      this.currentPage = page
      this.getRoleList({ page: this.currentPage, pageSize: this.pageSize, search: this.search })
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    addItem () {
      this.dialogTitle = '添加角色'
      this.setDialogShow(true)
    },
    editItem () {
      this.dialogTitle = '编辑角色'
      this.setDialogShow(true)
    },
    deleteItem () {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRole({
          data: { id: this.currentRow.id },
          cond: { page: this.currentPage, pageSize: this.pageSize, search: this.search }
        })
      }).catch(() => {})
    },
    setPower () {
      this.dialogTitle = '设置权限'
      this.setDialogShow(true)
    }
  }
}
</script>

<style lang='stylus' scoped>
  #role
    height 100%
    .operate-list
      margin-bottom 20px
    .el-pagination
      margin-top 20px
</style>
