<template>
  <div id="member">
    <!--操作-->
    <el-row class="operate-list" :gutter="20">
      <el-col :span="8" class="operate-item">
        <el-input class="input-search" placeholder="请输入内容" v-model="search" clearable
          @keyup.enter.native="searchItem">
        </el-input>
      </el-col>
      <el-button type="primary" icon="el-icon-search" @click="searchItem">搜索</el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addItem" v-permission="15">添加</el-button>
      <template v-if="currentRow">
        <el-button type="primary" icon="el-icon-edit" @click="editItem" v-permission="16">修改</el-button>
        <el-button type="primary" icon="el-icon-delete" @click="deleteItem" v-permission="17">删除</el-button>
      </template>
    </el-row>
    <!--表格-->
    <el-table ref="table" :data="userList" border highlight-current-row
              @current-change="handleCurrentChange"
    >
      <el-table-column type="index" label="ID" width="50"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column prop="ctime" label="创建日期">
        <template slot-scope="scope">{{$dink.utd(scope.row.ctime)}}</template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination v-if="totalNum" background layout="prev, pager, next" @current-change="changePage"
                   :total="totalNum" :current-page="currentPage" :page-size="pageSize"
    >
    </el-pagination>
    <!--dialog-->
    <transition name="fade-dialog" mode="out-in">
      <el-dialog v-if="dialogShow" :visible.sync="dialogShow" :title="dialogTitle" :modal="false" top="1">
        <member-add :title="dialogTitle" :currentRow="currentRow"></member-add>
      </el-dialog>
    </transition>
  </div>
</template>

<script>
import MemberAdd from './components/MemberAdd'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Member',
  components: { MemberAdd },
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
    ...mapState('admin/user/member', [
      'userList', 'totalNum'
    ]),
    dialogShow: {
      get () {
        return this.$store.state.admin.user.member.dialogShow
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
        this.getUserList({ page: this.currentPage, pageSize: this.pageSize, search: this.search })
      }
    })
  },
  methods: {
    ...mapActions('admin/user/member', [
      'getUserList', 'deleteMember'
    ]),
    ...mapMutations('admin/user/member', [
      'setDialogShow'
    ]),
    init () {
      this.currentPage = 1
      this.pageSize = 10
      this.currentRow = ''
    },
    searchItem () {
      this.init()
      this.getUserList({ page: 1, pageSize: this.pageSize, search: this.search })
    },
    changePage (page) {
      this.currentPage = page
      this.getUserList({ page: this.currentPage, pageSize: this.pageSize, search: this.search })
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    addItem () {
      this.dialogTitle = '添加成员'
      this.setDialogShow(true)
    },
    editItem () {
      this.dialogTitle = '编辑成员'
      this.setDialogShow(true)
    },
    deleteItem () {
      this.$confirm('此操作将永久删除该成员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteMember({
          data: { id: this.currentRow.id },
          cond: { page: this.currentPage, pageSize: this.pageSize, search: this.search }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang='stylus' scoped>
  #member
    height 100%
    .operate-list
      margin-bottom 20px
    .el-pagination
      margin-top 20px
</style>
