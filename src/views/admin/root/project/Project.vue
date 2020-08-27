<template>
  <div id="project">
    <!--操作-->
    <el-row class="operate-list" :gutter="20">
      <el-col :span="8" class="operate-item">
        <el-input class="input-search" placeholder="请输入项目名称" v-model="search" clearable
          @keyup.enter.native="searchItem"></el-input>
      </el-col>
      <el-button type="primary" icon="el-icon-search" @click="searchItem">搜索</el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addItem" v-permission="5">添加</el-button>
      <template v-if="currentRow">
        <el-button type="primary" icon="el-icon-edit" @click="editItem" v-permission="6">修改</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="deleteItem" v-permission="7">删除</el-button>
        <el-button type="primary" icon="el-icon-user" @click="setRoot" v-if="!currentRow.root" v-permission="8">设置管理员</el-button>
        <el-button type="primary" icon="el-icon-user" @click="setPower" v-if="currentRow.root" v-permission="9">设置权限</el-button>
      </template>
    </el-row>
    <!--表格-->
    <el-table ref="table" :data="projectList" border highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column type="index" label="ID" width="50"></el-table-column>
      <el-table-column prop="name" label="项目名称"></el-table-column>
      <el-table-column prop="email" label="管理员"></el-table-column>
      <el-table-column prop="ctime" label="创建日期">
        <template slot-scope="scope">{{$dink.utd(scope.row.ctime)}}</template>
      </el-table-column>
      <el-table-column prop="description" label="描述" width=""></el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination v-if="totalNum" background layout="prev, pager, next" @current-change="changePage"
      :total="totalNum" :current-page="currentPage" :page-size="pageSize"
    >
    </el-pagination>
    <!--dialog-->
    <transition name="fade-dialog" mode="out-in">
      <el-dialog v-if="dialogShow" :visible.sync="dialogShow" :title="dialogTitle" :modal="false" top="1">
        <!--设置管理员-->
        <template v-if="dialogTitle == '设置管理员'">
          <root-set :currentRow="currentRow"></root-set>
        </template>
        <!--设置项目权限-->
        <template v-else-if="dialogTitle == '设置权限'">
          <power-set :currentRow="currentRow"></power-set>
        </template>
        <!--项目添加/编辑-->
        <template v-else>
          <project-add :title="dialogTitle" :currentRow="currentRow"></project-add>
        </template>
      </el-dialog>
    </transition>
  </div>
</template>

<script>
import ProjectAdd from './components/ProjectAdd'
import RootSet from './components/RootSet'
import PowerSet from './components/PowerSet'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Project',
  components: { ProjectAdd, RootSet, PowerSet },
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
    ...mapState('admin/root/project', [
      'projectList', 'totalNum'
    ]),
    dialogShow: {
      get () {
        return this.$store.state.admin.root.project.dialogShow
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
        this.getProjectList({ page: this.currentPage, pageSize: this.pageSize, search: this.search })
      }
    })
  },
  methods: {
    ...mapActions('admin/root/project', [
      'getProjectList', 'deleteProject'
    ]),
    ...mapMutations('admin/root/project', [
      'setDialogShow'
    ]),
    init () {
      this.currentPage = 1
      this.pageSize = 10
      this.currentRow = ''
    },
    searchItem () {
      this.init()
      this.getProjectList({ page: 1, pageSize: this.pageSize, search: this.search })
    },
    changePage (page) {
      this.currentPage = page
      this.getProjectList({ page: this.currentPage, pageSize: this.pageSize, search: this.search })
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    addItem () {
      this.dialogTitle = '添加项目'
      this.setDialogShow(true)
    },
    editItem () {
      this.dialogTitle = '编辑项目'
      this.setDialogShow(true)
    },
    deleteItem () {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteProject({
          data: { id: this.currentRow.id },
          cond: { page: this.currentPage, pageSize: this.pageSize, search: this.search }
        })
      }).catch(() => {})
    },
    setRoot () {
      this.dialogTitle = '设置管理员'
      this.setDialogShow(true)
    },
    setPower () {
      this.dialogTitle = '设置权限'
      this.setDialogShow(true)
    }
  }
}
</script>

<style lang='stylus' scoped>
  #project
    height 100%
    .operate-list
      margin-bottom 20px
    .el-pagination
      margin-top 20px
</style>
