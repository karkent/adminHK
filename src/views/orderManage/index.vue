<template>
  <div style="float: left;margin-left: 2%;width: 96%">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有用户" name="all">
        <el-table :data="tableData.filter(data => !search || (data.compname +='').toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
          <el-table-column label="订单号" prop="orderid" />
          <el-table-column label="服务信息" prop="tblserveinfo.servercontent" />
          <el-table-column label="订单价格" prop="orderprice" />
          <el-table-column label="订单状态" prop="orderstate" />
          <el-table-column label="服务方名称" prop="compname" />
          <!--          <el-table-column label="服务方" prop="compid" />-->
          <el-table-column label="服务人员" prop="housekid" />
          <el-table-column label="服务类型" prop="servertype" />
          <el-table-column label="服务事项" prop="serveritem" />
          <el-table-column label="评价人" prop="tbluser.uname" />
          <el-table-column label="订单评价" prop="orderappraise" />
          <el-table-column label="评价等级" prop="appraiserank" />
          <el-table-column label="订单时间" prop="insertdata" />
          <el-table-column label="最后修改时间" prop="lastupdata" />
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" @change="scope" />
            </template>
            <template slot-scope="scope">
              <el-button v-if="scope.row.orderstate ===1 " size="mini" @click="dialogFormVisible = true">修改</el-button>
              <el-dialog title="订单修改" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="服务信息" :label-width="formLabelWidth">
                    <el-input v-model="form.orderprice" autocomplete="off" />
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
              </el-dialog>
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
import request from '@/utils/request'

export default {
  name: 'OrderManage',
  data() {
    return {
      activeName: 'all',
      tableData: [],
      nowPage: 1,
      pageSize: 5,
      totalCum: 0,
      dialogTableVisible: false,
      dialogFormVisible: false,
      search: '',
      form: {
        orderprice: ''

      },
      formLabelWidth: '120px'
      // search: ''
    }
  },
  mounted() {
    initTbl(this)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
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
    }
  }
}
function initTbl(vue) {
  request.post('/user/getOrderTbl', {
    // 当前页
    nowPage: vue.nowPage,
    pageSize: vue.pageSize,
    // 表格数据
    tableData: vue.tableData,
    activeName: vue.activeName
  }).then(res => {
    vue.tableData = res.tableData
    vue.totalCum = res.totalCum
  })
}
</script>
<style scoped>

</style>
