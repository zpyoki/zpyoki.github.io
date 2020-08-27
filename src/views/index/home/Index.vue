<template>
  <div id="home">
    <!--轮播图-->
    <carousel></carousel>
    <!--服务-->
    <service></service>
    <!--案例-->
    <!--<case style="padding: 0;"></case>-->
    <!--分享-->
    <share></share>
    <!--foot-->
    <foot></foot>
  </div>
</template>

<script>
import Carousel from './components/Carousel'
import Service from './components/Service'
// import Case from './components/Case'
import Share from './components/Share'
import Foot from './components/Foot'

export default {
  name: 'Index',
  // components: { Carousel, Service, Case, Share, Foot }
  components: { Carousel, Service, Share, Foot }
}
</script>

<style lang='stylus' scoped>
  #home
    div
      &:not(:first-child)
        padding 10px 0
      &:nth-child(odd)
        background #fff
      &:nth-child(even)
        background #f8f8f8
</style>
