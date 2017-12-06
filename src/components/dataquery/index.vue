<template>
  <div>
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="form.f2" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.f4" placeholder="身份证号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="form.date"
          type="month"
          placeholder="薪资月份"
          value-format="yyyy-MM">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          v-for="(field, index) in tableFields"
          :key="field.id"
          :prop="getProp(field)"
          :label="field.chineseName"
          align="center"
          :min-width="getWidth(field)">
        </el-table-column>
      </el-table>
    </template>
    <div class="block">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pagination.total"
        :page-size="pagination.pageSize"
        :current-page="pagination.currentPage"
        :page-sizes="pagination.pageSizes"
        >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {getFields, getList} from 'api/dataquery'
import {ERR_OK} from 'api/config'
export default {
  data () {
    return {
      form: {
        f2: '',
        f4: '',
        date: ''
      },
      fieldPrefix: '',
      tableFields: {},
      tableData: [
      ],
      pagination: {
        pageSize: 25,
        total: 0,
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50, 100]
      }
    }
  },
  created () {
    this._getFields()
  },
  mounted () {
    this._initDate()
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
      this.form.date = year + '-' + month
      this._getList()
    },
    onSubmit () {
      this._getList()
    },
    _getFields () {
      getFields().then((res) => {
        if (res.data.code === ERR_OK) {
          this.tableFields = res.data.data.fields
          this.fieldPrefix = res.data.data.fieldPrefix
        }
      })
    },
    _getList () {
      getList(this.form.f2, this.form.f4, this.form.date, this.pagination.currentPage, this.pagination.pageSize).then((res) => {
        if (res.data.code === ERR_OK) {
          this.tableData = res.data.data.list
          this.pagination.total = res.data.data.total
        }
      })
    },
    getWidth (field) {
      return field.chineseName.length * 14.5 + 21
    },
    getProp (field) {
      switch (field.source) {
        case 0:
          return this.fieldPrefix + field.id
        case 1:
          return this.fieldPrefix + field.id
        case 3:
          return field.name
      }
    }
  }
}
</script>