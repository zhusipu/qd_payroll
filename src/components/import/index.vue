<template>
  <div>
    <el-alert
    title="导入员工薪资数据。"
    type="info"
    :closable="false">
    </el-alert>
    <el-form class="import-form" label-width="80px">
      <el-form-item label="模板">
        <a href="javascript:void(0)" @click="handleDownload">点击下载导入模板</a>
      </el-form-item>
      <el-form-item label="薪资月份">
        <el-date-picker
          v-model="date"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="文件">
        <el-upload
          ref="upload"
          class="upload-demo"
          drag
          name="file"
          :data="{date:date, isSendNotice: isSendNotice}"
          :action="uploadUrl"
          :auto-upload="false"
          :limit="1"
          :on-exceed="onExceed"
          :on-success="onSuccess"
          :on-error="onError"
          accept=".xls,.xlsx"
          :before-upload="beforeUpload">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传xls、xlsx文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="isSendNotice">导入成功后发送企业微信通知！</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即上传</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
import {getList} from 'api/sort'
import {getUploadUrl} from 'api/import'
import {ERR_OK} from 'api/config'

import { checkResponse } from 'assets/js/util/auth'
export default {
  data () {
    return {
      date: null,
      isSendNotice: true,
      uploadUrl: ''
    }
  },
  mounted () {
    this._initDate()
    this._getUploadUrl()
  },
  methods: {
    _initDate () {
      let myDate = new Date()
      let month = myDate.getMonth()
      let year = null
      if (month === 12) {
        year = myDate.getFullYear() - 1
      } else {
        year = myDate.getFullYear()
      }
      this.date = year + '-' + month
    },
    _getUploadUrl () {
      this.uploadUrl = getUploadUrl()
    },
    handleDownload () {
      require.ensure([], () => {
        const { my_export_json_to_excel } = require('assets/js/util/Export2Excel')
        getList().then((res) => {
          if (res.data.code === ERR_OK) {
            var tHeader = []
            for (var i = 0; i < res.data.data.length; i++) {
              tHeader[i] = res.data.data[i].chineseName
            }
            my_export_json_to_excel(tHeader, '导入模板')
          }
        })
      })
    },
    onSubmit () {
      this.$refs.upload.submit()
    },
    onExceed () {
      this.$message({
        message: '一次只能上传一个文件',
        type: 'error'
      })
    },
    onSuccess (data) {
      checkResponse(data)
      if (data.code === ERR_OK) {
        this.$message({
          message: data.msg,
          type: 'success'
        })
        this.$refs.upload.clearFiles()
      } else {
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    onError () {
      this.$message({
        message: '上传失败',
        type: 'error'
      })
    },
    beforeUpload (file) {
      console.log(file)
    }
  }
}
</script>
<style scoped>
.import-form{
  padding: 20px;
}
</style>
