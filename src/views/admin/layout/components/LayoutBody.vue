<template>
  <div id="layout-body">
    <transition name="fade-page" mode="out-in">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'LayoutBody'
}
</script>

<style lang='stylus' scoped>
  #layout-body
    height 100%
    position relative
</style>
