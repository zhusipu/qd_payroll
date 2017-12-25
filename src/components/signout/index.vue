<template>
  <div>
    
  </div>
</template>
<script>
import {signout} from 'api/user'
import {ERR_OK} from 'api/config'
export default {
  data () {
    return {
      password: '',
      empNo: ''
    }
  },
  mounted () {
    this._signout()
  },
  methods: {
    _signout () {
      signout().then((res) => {
        if (res.data.code === ERR_OK) {
          this.$router.push({
            path: '/signin'
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