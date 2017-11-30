<template>
  <div ref="menu" class="menu">
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BScroll from 'better-scroll'
import sidebarItem from './sidebaritem'
export default {
  components: {
    sidebarItem
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    this.initScroll()
  },
  methods: {
    initScroll () {
      this.scroll = new BScroll(this.$refs.menu)
    }
  }
}
</script>
