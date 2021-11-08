<template>
  <div style="float: left;margin-left: 2%;width: 96%">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有用户" name="all">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="创建日期" prop="insertdata" :formatter="ToStr" />
          <el-table-column label="用户名称" prop="uname" />
          <el-table-column label="账号" prop="uaccount" />
          <el-table-column label="电话" prop="phone" />
          <el-table-column label="邮箱" prop="uemail" />
          <el-table-column label="性别" prop="usex" :formatter="Tosex" />
          <el-table-column label="年龄" prop="uage" />
          <el-table-column label="身份证" prop="ucardid" />
          <el-table-column label="地址" prop="uaddressid" />
          <el-table-column label="状态" prop="ustate" :formatter="ToState" />
          <el-table-column label="积分" prop="integral" />
          <el-table-column label="头像" prop="photourl" />
          <el-table-column align="right" width="200px">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="updateAcc(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" @click="DisableAcc(scope.$index, scope.row)">禁用</el-button>
              <el-button size="mini" type="danger" @click="EnableAcc(scope.$index, scope.row)">启用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div class="block">
      <el-pagination :current-page="nowPage" :page-sizes="[5, 10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCum" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>
<script>
import request from '../../utils/request'
import { dateToStr } from '../../utils/kaihangTool'
export default {
  name: 'UserManage',
  data() {
    return {
      activeName: 'all',
      tableData: [],
      nowPage: 1,
      pageSize: 5,
      totalCum: 100,
      search: ''
    }
  },
  mounted() {
    // 页面加载初始化的方法
    initTbl(this)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    updateAcc(index, row) {
      console.log(index, row)
    },
    DisableAcc(index, row) {
      console.log(index, row)
    },
    EnableAcc(index, row) {
      console.log(index, row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      initTbl(this)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.nowPage = val
      initTbl(this)
    },
    ToStr(row) {
      return dateToStr(row)
    },
    Tosex(row) {
      return (row.usex === 1) ? ('男') : ('女')
    },
    ToState(row) { // 0=禁用 1=启用 2=删除 3=注销
      if (row.ustate === 0) {
        return '禁用'
      } else if (row.ustate === 1) {
        return '启用'
      } else if (row.ustate === 2) {
        return '删除'
      } else if (row.ustate === 3) {
        return '注销'
      }
    }
  }
}
function initTbl(vue) {
  request.post('/admin/getUserTbl', {
    nowPage: vue.nowPage,
    pageSize: vue.pageSize,
    tableData: vue.tableData,
    activeName: vue.activeName
  }).then(res => {
    console.log(res)
    vue.tableData = res.tableData
    vue.totalCum = res.totalCum
  })
}
</script>

<style scoped>

</style>
