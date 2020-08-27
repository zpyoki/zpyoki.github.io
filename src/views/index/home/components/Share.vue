<template>
  <div>
    <introduce en="NEWS INFORMATION" zh="将我们最近发生的，与您分享"></introduce>
    <div class="share-list">
      <el-card class="share-item" v-for="(item, index) of shareList" :key="index"
               :style="{
                 cursor: 'pointer',
                 width: $store.state.platform === 'mobile' ? '100vw' : '35vw',
                 margin: $store.state.platform === 'mobile' ? '10px 0' : '12px'
               }"
               :body-style="{
                 padding: '0px', display: 'flex',
                 flexWrap: $store.state.platform === 'mobile' ? 'wrap' : 'nowrap',
                 height: $store.state.platform === 'mobile' ? '65vw' : '180px'
               }"
      >
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
               :style="{
                 display: 'block',
                 width: $store.state.platform === 'mobile' ? '100vw' : '45%',
                 height: $store.state.platform === 'mobile' ? '50vw' : '100%',
               }"
          >
          <div class="share-item-body">
            <div class="item-title">好吃的汉堡</div>
            <div class="item-desc" v-show="$store.state.platform != 'mobile'">汉堡的描述，汉堡的描述，汉堡的描述，汉堡的描述</div>
            <div class="item-date">{{ currentDate }}</div>
          </div>
          <!--<div class="service-title" :style="{fontSize: $store.state.platform === 'mobile' ? '12px' : '17px'}">{{item.title}}</div>-->
          <!--<div class="service-desc" :style="{fontSize: $store.state.platform === 'mobile' ? '12px' : '13px'}">{{item.desc}}</div>-->
      </el-card>
    </div>
  </div>
</template>

<script>
import Introduce from './Introduce'

export default {
  name: 'Share',
  components: { Introduce },
  data () {
    return {
      currentDate: new Date(),
      shareList: [
        { title: '美妆产品', img: require('@/static/img/service1.png'), desc: '我们整合全球优质美妆资源，为合作伙伴提供物美价优的商品供销' },
        { title: '品牌管理', img: require('@/static/img/service2.png'), desc: '我们擅长品牌引进与孵化，注重品牌价值塑造及市场业绩的双向成长' },
        { title: '市场营销', img: require('@/static/img/service3.png'), desc: '我们拥有扎实的全网营销实战经验，有效提高产品曝光度及品牌影响力' },
        { title: '技术支持', img: require('@/static/img/service4.png'), desc: '我们为商户量身打造专属自主创业平台，助力合作伙伴实现高效创收' }
      ]
    }
  }
}
</script>

<style lang='stylus' scoped>
  .share-list
    display flex
    justify-content center
    flex-wrap wrap
    padding 10px 10px
    .share-item-body
      padding 0 10px
      div
        margin-bottom 8px
      .item-title
        font-weight bold
        font-size 15px
        margin-top 10px
      .item-desc
        font-size 13px
      .item-date
        font-size 12px
</style>
