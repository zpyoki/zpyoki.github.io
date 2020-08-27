<template>
  <div id="layout">
    <el-container style="height: 100%;">
      <el-header class="layout-header" style="padding: 0;">
        <layout-header @changeCollapse="changeCollapse" :isCollapse="isCollapse"></layout-header>
      </el-header>
      <el-container style="padding: 0;">
        <el-aside :width="isCollapse ? '56px' : '200px'">
          <side-menu :isCollapse="isCollapse"></side-menu>
        </el-aside>
        <!--<el-header class="layout-tab" style="padding: 0;">-->
          <!--<layout-tab></layout-tab>-->
        <!--</el-header>-->
        <el-main>
          <layout-tab class="layout-tab"></layout-tab>
          <layout-body class="layout-body"></layout-body>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu'
import LayoutHeader from './components/LayoutHeader'
import LayoutTab from './components/LayoutTab'
import LayoutBody from './components/LayoutBody'

export default {
  name: 'Layout',
  components: { SideMenu, LayoutHeader, LayoutTab, LayoutBody },
  // components: { SideMenu, LayoutHeader, LayoutBody },
  data () {
    return {
      isCollapse: false,
      widthAll: document.documentElement.clientWidth
    }
  },
  created () {
    // if (this.widthAll <= 1060) { this.isCollapse = true }
    window.onresize = () => {
      return (() => {
        this.widthAll = document.documentElement.clientWidth
      })()
    }
  },
  watch: {
    widthAll: function (val) {
      if (val <= 1060) {
        // this.isCollapse = true
        this.isCollapse = false
      } else {
        this.isCollapse = false
      }
    }
  },
  methods: {
    changeCollapse (e) {
      this.isCollapse = e
    }
  }
}
</script>

<style lang='stylus' scoped>
  #layout
    height 100%
    .el-header
      height $layout-header-height!important
    .el-aside
      transition width .4s
    .el-main
      position relative
      .layout-tab
        position absolute
        top 0
        left 0
        right 0
      .layout-body
        margin-top $layout-tab-height
</style>
