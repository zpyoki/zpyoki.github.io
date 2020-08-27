<template>
  <div>
    <template v-for="item of list">
      <template v-if="item.children">
        <el-submenu :key="item.name" :index="item.name">
          <template slot="title">
            <i :class="item.meta.icon || 'el-icon-menu'"></i>
            <span slot="title">{{!collapse ? item.meta.title : ''}}</span>
          </template>
          <side-menu-tree :list="item.children"></side-menu-tree>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item v-if="item.meta.show" :key="item.name" :index="item.name" :route="item">
          <i :class="item.meta.icon || 'el-icon-menu'"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SideMenuTree',
  props: ['list', 'collapse']
}
</script>

<style lang='stylus' scoped></style>
