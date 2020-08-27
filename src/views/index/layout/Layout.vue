<template>
  <div id="layout">
    <layout-header></layout-header>
    <layout-body></layout-body>
  </div>
</template>

<script>
import LayoutHeader from './components/LayoutHeader'
import LayoutBody from './components/LayoutBody'

export default {
  name: 'Layout',
  components: { LayoutHeader, LayoutBody }
}
</script>

<style lang='stylus' scoped>
  #layout
    height 100%
    .layout-header
      height $layout-header-height!important
</style>
