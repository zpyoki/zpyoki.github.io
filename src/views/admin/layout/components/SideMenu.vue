<template>
  <el-scrollbar id="side-menu">
    <el-menu class="el-menu-vertical-demo"
             :default-active="$route.name"
             :collapse="isCollapse"
             :unique-opened="true"
             :router="true"
             background-color="#333"
             text-color="#C1C6C8"
    >
      <side-menu-tree :collapse="isCollapse" :list="menuList"></side-menu-tree>
      <!--<template v-for="item of menuList">-->
        <!--<template v-if="item.children">-->
          <!--<el-submenu :key="item.name" :index="item.name">-->
            <!--<template slot="title">-->
              <!--<i :class="item.meta.icon || 'el-icon-menu'"></i>-->
              <!--<span slot="title">{{item.meta.title}}</span>-->
            <!--</template>-->
            <!--<side-menu-tree :list="item.children"></side-menu-tree>-->
          <!--</el-submenu>-->
        <!--</template>-->
        <!--<template v-else>-->
          <!--<el-menu-item v-if="item.meta.show" :key="item.name" :index="item.name" :route="item">-->
            <!--<i :class="item.meta.icon || 'el-icon-menu'"></i>-->
            <!--<span slot="title">{{item.meta.title}}</span>-->
          <!--</el-menu-item>-->
        <!--</template>-->
      <!--</template>-->
    </el-menu>
  </el-scrollbar>
</template>

<script>
import admin from '@/routers/admin'
import SideMenuTree from './SideMenuTree'

export default {
  name: 'SideMenu',
  components: { SideMenuTree },
  props: ['isCollapse'],
  data () {
    return {
      menuList: []
    }
  },
  created () {
    this.menuList = admin[0].children
    // this.menuList = JSON.parse(this.$dink.decrypt(this.$dink.getStorage('ui'))).pl
  }
}
</script>

<style lang='stylus' scoped>
  #side-menu
    position fixed
    top $layout-header-height
    bottom 0
    left 0
  #side-menu >>> .el-scrollbar__wrap
    overflow-x hidden
    .el-menu-vertical-demo:not(.el-menu--collapse)
      width 200px
    .el-menu-vertical-demo.el-menu
      //min-height calc(100vh - % $layout-header-height)
      min-height 'calc(100vh - %s)' % $layout-header-height
      border 0
      .el-menu-item.is-active i
        color $theme
</style>
