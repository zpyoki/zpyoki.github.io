<template>
  <div id="role-add">
    <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="80px"
      @keyup.enter.native="submitData('form')">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description"></el-input>
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
  name: 'RoleAdd',
  props: ['title', 'currentRow'],
  data () {
    return {
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, message: '项目名称不能少于3个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    if (this.title === '编辑角色') {
      this.form.name = this.currentRow.name
      this.form.description = this.currentRow.description
      this.form.id = this.currentRow.id
    }
  },
  methods: {
    submitData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.project_id = this.$store.state.admin.projectId
          if (this.title === '添加角色') {
            this.$store.dispatch('admin/user/role/addRole', { data: this.form, loading: '.el-form' })
          } else if (this.title === '编辑角色') {
            this.$store.dispatch('admin/user/role/editRole', { data: this.form, loading: '.el-form' })
          }
        }
      })
    }
  }
}
</script>

<style lang='stylus' scoped></style>
