<template>
  <div id="member-add">
    <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="80px"
             @keyup.enter.native="submitData('form')">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id">
        <el-select v-model="form.role_id" placeholder="请选择角色" style="width: 100%;">
          <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitData('form')">提交</el-button>
        <el-button @click="$refs['form'].resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MemberAdd',
  props: ['title', 'currentRow'],
  data () {
    let checkMobile = (rule, value, callback) => {
      let mobileReg = /^1[3456789]\d{9}$/
      if (mobileReg.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      form: {
        name: '',
        email: '',
        mobile: '',
        role_id: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入成员名称', trigger: 'blur' },
          { min: 2, message: '成员名称不能少于2个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        role_id: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('admin/user/member', [ 'roleList' ])
  },
  created () {
    this.getRoleListByUserId()
  },
  mounted () {
    if (this.title === '编辑成员') {
      this.form.name = this.currentRow.name
      this.form.email = this.currentRow.email
      this.form.mobile = this.currentRow.mobile
      this.form.role_id = this.currentRow.role_id
      this.form.id = this.currentRow.id
    }
  },
  methods: {
    ...mapActions('admin/user/member', [ 'getRoleListByUserId' ]),
    submitData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title === '添加成员') {
            this.form.cover = '/default.gif'
            this.form.ctime = this.$dink.now()
            this.$store.dispatch('admin/user/member/addMember', { data: this.form, loading: '.el-form' })
          } else if (this.title === '编辑成员') {
            this.$store.dispatch('admin/user/member/editMember', { data: this.form, loading: '.el-form' })
          }
        }
      })
    }
  }
}
</script>

<style lang='stylus' scoped></style>
