<template>
  <div id="power">
    <!--操作-->
    <el-row class="operate-list" :gutter="20">
      <el-col :span="8" class="operate-item">
        <el-input placeholder="输入名称进行过滤" v-model="search" ></el-input>
      </el-col>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPower" v-permission="5">添加</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="editPower" v-permission="6">修改</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="deletePower" v-permission="7">删除</el-button>
    </el-row>
    <!--tree-->
    <el-tree ref="tree" :data="powerList" :filter-node-method="handleFilter" :props="defaultProps" node-key="id">
    </el-tree>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'Power',
  data () {
    return {
      search: '',
      defaultProps: {
        children: 'menu',
        label: 'title'
      }
    }
  },
  computed: {
    powerList: {
      get () {
        return this.$dink.ota(this.$store.state.admin.root.power.powerList)
      },
      set () {
        this.getMenuList()
      }
    }
  },
  watch: {
    search (val) {
      this.$refs.tree.filter(val)
    }
  },
  activated () {
    this.$store.dispatch('admin/checkActivated').then((res) => {
      if (res) {
        this.getMenuList()
      }
    })
  },
  methods: {
    ...mapActions('admin/root/power', [ 'getPowerList' ]),
    ...mapMutations('admin/root/power', [ 'setPowerList' ]),
    getMenuList () {
      let uid = JSON.parse(this.$dink.decrypt(this.$dink.getStorage('ui'))).id
      let data = { id: uid, role_id: 1, for: 'power' }
      this.getPowerList({ url: '/api/power/getMenuList', data: data, loading: '.el-tree' }).then((res) => {
        this.setPowerList(res)
      })
    },
    handleFilter (value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    },
    addPower () {
      console.log(111)
    },
    editPower () {
      console.log(222)
    },
    deletePower () {
      console.log(333)
    }
  }
}
</script>

<style lang='stylus' scoped>
  #power
    height 100%
    .el-tree
      height calc(100% - 50px)
      margin-top 10px
      overflow auto
      box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
</style>
