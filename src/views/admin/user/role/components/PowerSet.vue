<template>
  <div id="power-set">
    <!--<el-input placeholder="输入关键字进行过滤" v-model="search"></el-input>-->
    <el-tree class="filter-tree" ref="tree" :data="powerList" show-checkbox
             default-expand-all  :filter-node-method="handleFilter" :props="defaultProps"
             node-key="id" :default-checked-keys="checkedList"
    >
    </el-tree>
    <el-button type="primary" @click="setPower">设置</el-button>
  </div>
</template>

<script>
export default {
  name: 'PowerSet',
  props: ['currentRow'],
  data () {
    return {
      search: '',
      powerList: [],
      checkedList: [],
      defaultProps: {
        children: 'menu',
        label: 'title'
      }
    }
  },
  watch: {
    search (val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted () {
    this.getMenuList()
  },
  methods: {
    getMenuList () {
      const uid = JSON.parse(this.$dink.decrypt(this.$dink.getStorage('ui'))).id
      const data = { id: uid, role_id: this.currentRow.id, for: 'power' }
      this.$store.dispatch('admin/root/power/getPowerList', { data: data, loading: '.el-tree' }).then((res) => {
        this.powerList = this.$dink.ota(res.powerList)
        this.checkedList = res.checkedList
      })
    },
    handleFilter (value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    },
    setPower () {
      const data = {
        role_id: this.currentRow.id,
        checked_full: this.$refs.tree.getCheckedKeys().join(','),
        checked_half: this.$refs.tree.getHalfCheckedKeys().join(','),
        powers: this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()).join(',')
      }
      this.$store.dispatch('admin/root/power/setPower', { data: data, loading: '#power-set' }).then((res) => {
        this.$store.dispatch('admin/user/role/getRoleList')
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
  #power-set
    .el-tree
      height 200px
      margin-top -20px
      overflow auto
      box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    .el-button
      width 100%
      margin-top 20px
</style>
