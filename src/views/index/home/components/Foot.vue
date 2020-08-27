<template>
  <div id="foot">
    <div style="color: #fff;cursor: pointer;" @click="handleClick">
      粤ICP备20012575号-1 | © {{$dink.utd($dink.now()).substr(0, 4)}} 夏日已逝
    </div>
  </div>
</template>

<script>
export default {
  name: 'Foot',
  methods: {
    handleClick () {
      window.open('http://beian.miit.gov.cn')
    }
  }
}
</script>

<style lang='stylus' scoped>
  #foot
    background #282828!important
    text-align center
    font-size 12px
</style>
