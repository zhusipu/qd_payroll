<template>
  <div>
    <el-form class="import-form" :inline="true" label-width="80px">
      <el-form-item label="员工编号">
        <el-input v-model="empNo" name="empno" placeholder="请输入员工编号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" name="password"  type="password" placeholder="请输入新密码"></el-input>
      </el-form-item>
        <el-button type="primary" @click="_resetPassword">立即重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {resetPassword} from 'api/user'
import {ERR_OK} from 'api/config'
export default {
  data () {
    return {
      password: '',
      empNo: ''
    }
  },
  methods: {
    _resetPassword () {
      resetPassword(this.empNo, this.password).then((res) => {
        if (res.data.code === ERR_OK) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>