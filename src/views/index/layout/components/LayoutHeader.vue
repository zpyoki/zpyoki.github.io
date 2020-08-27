<template>
  <div id="layout-header" style="padding: 10px;">
    <el-row type="flex" justify="space-around" align="middle">
      <el-col :xs="24" :sm="6">
        <img src="@/static/img/logo.png" style="height: 40px;">
      </el-col>
      <el-col class="pages hidden-xs-only" :sm="16">
        <div class="page-active">首页</div>
        <div>蜜蜂在线</div>
        <div>产品中心</div>
        <div>服务中心</div>
        <div>授权查询</div>
      </el-col>

      <el-col class="hidden-sm-and-up" :xs="2">
        <!--下拉-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'LayoutHeader'
}
</script>

<style lang='stylus' scoped>
  #layout-header
    .pages
      display flex
      font-size 12px
      margin-top 20px
      div
        cursor pointer
        margin-left 70px
        &:hover
          color $theme-index
      .page-active
        color $theme-index
</style>
