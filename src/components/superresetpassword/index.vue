<template>
  <div>
    
  </div>
</template>
<script>
import {superResetPassword, signout} from 'api/user'
import {ERR_OK} from 'api/config'
export default {
  data () {
    return {
      password: '',
      empNo: ''
    }
  },
  mounted () {
    this._superResetPassword()
  },
  methods: {
    _superResetPassword () {
      let returnUrl = window.location.origin + window.location.pathname
      superResetPassword(returnUrl).then((res) => {
        if (res.data.code === ERR_OK) {
          signout().then((gg) => {
            window.location.href = res.data.data
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