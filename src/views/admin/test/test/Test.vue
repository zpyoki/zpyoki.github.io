<template>
  <div id="test">
    <!--<div>{{item}}</div>-->
    <!--<div>{{$store.state.admin.root.test.test}}</div>-->
    <el-button @click="handlerClick(1)" @click.right.prevent.native="handlerRightClick">按钮</el-button>
    <!--<ds-dialog title="你好" :dialogShow="false">-->
      <!--<div>123456789</div>-->
    <!--</ds-dialog>-->
    <el-button type="text" @click="open">点击打开 Message Box</el-button>
  </div>
</template>

<script>
// import DsDialog from '@/components/Dialog'
// import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Test',
  // components: { DsDialog },
  activated () {
    // console.log(this.$store.state.admin.activated)
    // console.log(this.$route.name)
    // this.defaults = process.env.VUE_APP_DEFAULT
    // this.title = process.env.VUE_APP_TITLE
    // console.log(process.env)
    // console.log(this.$store.state.admin.pageMap)
  },
  computed: {
    // ...mapState('admin/root/test', {
    //   item: 'test'
    // }),
    // ...mapState('admin', ['pageList'])
  },
  methods: {
    // ...mapMutations('admin/root/test', {
    //   handlerClick: 'setTest'
    // }),
    open () {
      this.$alert('这是一段内容', '标题名称')
    }
  }
}
</script>

<style lang='stylus' scoped></style>
