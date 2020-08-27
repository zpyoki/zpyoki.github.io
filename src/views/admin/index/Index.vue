<template>
  <div id="index">
    dinkjs：{{$dink.version}}
    <br>
    version：{{version}}
  </div>
</template>

<script>
import project from '@/../package.json'

export default {
  name: 'Index',
  data () {
    return {
      version: project.version
    }
  },
  activated () {
    console.log(this.$dink.getStorage('token'))
  }
}
</script>

<style lang='stylus' scoped></style>
