<template>
  <div>
    <el-button @click="handleSend">send</el-button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  sockets: {
    res (data) {
      console.log(data)
    }
  },
  methods: {
    handleSend () {
      this.$socket.emit('test', 'lily')
    }
  }
}
</script>

<style lang='stylus' scoped></style>
