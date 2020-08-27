<template>
  <div>
    <el-carousel :height="height" trigger="click" arrow="never" :interval="5000">
      <el-carousel-item v-for="item in bannerList" :key="item">
        <img :src="item" :style="{ width: '100%', height: height }">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<!--<template>-->
  <!--<div>-->
    <!--<el-carousel :height="$store.state.platform === 'mobile' ? height : '375px'" trigger="click" arrow="never" :interval="5000">-->
      <!--<el-carousel-item v-for="item in bannerList" :key="item">-->
        <!--<img :src="item" :style="{ width: '100%', height: $store.state.platform === 'mobile' ? height : '375px' }">-->
      <!--</el-carousel-item>-->
    <!--</el-carousel>-->
  <!--</div>-->
<!--</template>-->

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      height: '',
      widthAll: document.documentElement.clientWidth,
      bannerList: [
        require('@/static/img/banner1.png'),
        require('@/static/img/banner2.png'),
        require('@/static/img/banner3.png')
      ]
    }
  },
  created () {
    this.height = this.widthAll * 0.4 + 'px'
    window.onresize = () => {
      return (() => {
        this.widthAll = document.documentElement.clientWidth
        this.height = this.widthAll * 0.4 + 'px'
      })()
    }
  }
}
</script>

<style lang='stylus' scoped></style>
