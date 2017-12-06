<template>
  <div>
    <el-alert
    title="上下拖拽字段调整字段顺序，点击保存按钮进行提交"
    type="info"
    :closable="false">
    </el-alert>
    <div class="field-list">
      <div class="field-item" v-for="field in fields" v-dragging="{ item: field, list: fields, group: 'field' }" :key="field.id">
        <span>{{field.chineseName}}</span>
      </div>
    </div>
    <el-button type="primary" @click="save">保存</el-button>
  </div>
</template>
<script>
import {getList, save} from 'api/sort'
import {ERR_OK} from 'api/config'
export default {
  data () {
    return {
      fields: []
    }
  },
  mounted () {
    this._getList()
  },
  methods: {
    _getList () {
      getList().then((res) => {
        if (res.data.code === ERR_OK) {
          this.fields = res.data.data
        }
      })
    },
    save () {
      save(this.fields).then((res) => {
        if (res.data.code === ERR_OK) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.field-list{
  padding: 20px;
  padding-left: 0px;
}
.field-item{
  margin-bottom: 10px;
  line-height: 25px;
}
.field-item:last-child{
  margin-bottom: 0px;
}
.field-item span{
  background: #eee;
  border: 2px dotted #ccc;
  padding: 5px;
  border-radius: 5px;
}
</style>
