<template>
  <div>
    <introduce en="WHAT CAN WE DO?" zh="通过我们的事业，将惊喜提供给每一位合作伙伴"></introduce>
    <div class="service-list">
      <div class="service-item" v-for="(item, index) of serviceList" :key="index"
           :style="{width: $store.state.platform === 'mobile' ? '45vw' : '20vw'}"
      >
        <img :src="item.img" :style="{width: $store.state.platform === 'mobile' ? '20vw' : '10vw'}">
        <div class="service-title" :style="{fontSize: $store.state.platform === 'mobile' ? '12px' : '17px'}">{{item.title}}</div>
        <div class="service-desc" :style="{fontSize: $store.state.platform === 'mobile' ? '12px' : '13px'}">{{item.desc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Introduce from './Introduce'

export default {
  name: 'Service',
  components: { Introduce },
  data () {
    return {
      serviceList: [
        { title: '软件订制开发', img: require('@/static/img/service1.png'), desc: '专业定制各类软件，包括OA办公系统、ERP系统、网盘管理、进度计划管理、物流系统等。' },
        { title: '微信小程序', img: require('@/static/img/service2.png'), desc: '根据企业需求来规划微信小程序开发方案，突出企业品牌、社交便捷分享，帮助企业快速步入小程序红利时代！' },
        { title: '技术支持', img: require('@/static/img/service3.png'), desc: '我们为商户量身打造专属自主创业平台，助力合作伙伴实现高效创收' },
        { title: '后期维护', img: require('@/static/img/service4.png'), desc: '安全维护、漏洞修复、后台管理培训、技术支持。' }
      ]
    }
  }
}
</script>

<style lang='stylus' scoped>
  .service-list
    display flex
    justify-content center
    flex-wrap wrap
    padding-top 20px
    .service-item
      text-align center
      padding-bottom 10px
      img
        cursor pointer
      .service-title
        font-weight bolder
        color #666
        margin-top 10px
      .service-desc
        font-weight bold
        color #999
        padding 10px 15px 15px 15px
</style>
