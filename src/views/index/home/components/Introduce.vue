<template>
  <div class="introduce">
    <div class="introduce-en">{{en}}</div>
    <div class="introduce-zh" :style="{fontSize: $store.state.platform === 'mobile' ? '14px' : '30px'}">
      <template v-if="zh.split('，').length === 2">
        <span>{{zh.split('，')[0]}}，</span>
        <span>{{zh.split('，')[1]}}</span>
      </template>
      <template v-else>
        <span>{{zh}}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Introduce',
  props: ['en', 'zh']
}
</script>

<style lang='stylus' scoped>
  .introduce
    display flex
    flex-direction column
    align-items center
    padding-top 20px
    .introduce-en
      letter-spacing 3px
      color #888
      font-size 14px
    .introduce-zh
      margin-top 10px
      font-size 30px
      span
        &:nth-child(2)
          color $theme-index
</style>
