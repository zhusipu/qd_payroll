<template>
  <el-container>
    <el-aside width="200px">
      <sidebar></sidebar>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>
<script>
import sidebar from 'components/sidebar'
export default {
  components: {
    sidebar
  },
  created () {
    console.log(123)
  }
}
</script>
