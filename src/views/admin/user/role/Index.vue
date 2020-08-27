<template>
  <div>
    <el-button @click="handleLogin(param)">登录</el-button>
    <div id="login" style="width: 200px;height: 200px;"></div>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      :props="defaultProps">
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        },
        {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        },
        {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      param: {
        redirect_uri: encodeURI('https://www.dink.xyz/'),
        state: 'STATE'
      }
    }
  },
  methods: {
    handleLogin (value) {
      value.appid = this.$config.login.wechat.appId
      this.$dink.login.wechat(value)
    }
  }
}
</script>

<style lang='stylus' scoped></style>
