<template>
  <div id="root-set">
    <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="80px" @submit.native.prevent>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" @keyup.enter.native="submitData('form')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitData('form')">提交</el-button>
        <el-button @click="$refs['form'].resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'RootSet',
  props: ['currentRow'],
  data () {
    return {
      form: {
        email: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.project_id = this.currentRow.id
          this.form.etime = this.$dink.now()
          this.$store.dispatch('admin/root/project/setRoot', { data: this.form, loading: '.el-form' })
        }
      })
    }
  }
}
</script>

<style lang='stylus' scoped></style>
