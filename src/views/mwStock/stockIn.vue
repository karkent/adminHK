<template>
  <div>
    <div class="topDiv">
      <div class="topBtnDiv" style="width: 520px">
        <el-select v-model="ruleForm.selectStatus" placeholder="请选择状态" size="mini" style="float:left;width: 120px">
          <el-option selected label="请选择" value="0" />
          <el-option label="已出库" value="8" />
          <el-option label="未出库" value="7" />
        </el-select>
        <el-select v-model="ruleForm.selectName" placeholder="请选择医院名称" size="mini" style="float:left;width: 140px;margin-left: 5px">
          <el-option selected label="请选择" value="0" />
          <el-option
            v-for="item in hospitalName"
            :key="item.hid"
            :label="item.hname"
            :value="item.hid"
          />
        </el-select>
        <el-date-picker
          v-model="beginAndEndTime"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          style="float:left;width: 250px;margin-left: 5px"
        />
      </div>
      <div class="btn_div">
        <el-button type="primary" size="mini" @click="queryInfo">查 询</el-button>
      </div>
      <div class="btn_div">
        <el-button type="success" size="mini" @click="outExcel()">导出EXCEL</el-button>
      </div>
      <div class="btn_div">
        <el-button type="success" size="mini" @click="batchOutLibrary">批量勾选出库</el-button>
      </div>
      <div class="btn_div">
        <el-button type="success" size="mini" @click="batchOutLibraryAll">批量全部出库</el-button>
      </div>
    </div>
    <!--    :span-method=''-->
    <div style="float:left;height: 100%;width: 100%;margin-top: 10px">
      <div style="height: 90%;width: 97%;margin: auto">
        <el-table
          border
          stripe
          :data="tableData"
          :height="tableHeight"
          :row-style="{height: '40px'}"
          :cell-style="{padding: '0'}"
          @select="selectCheckbox"
          @select-all="selectableAll"
        >
          <el-table-column
            type="selection"
            width="50"
            align="left"
            :selectable="selectable"
          />
          <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center"
          />
          <el-table-column sortable width="80" label="状态" prop="dataname" /><!--:formatter='formatState'-->
          <el-table-column sortable width="110" label="医废分类" prop="tname" />
          <el-table-column sortable width="170" label="医废条形码" prop="bagcode" />
          <el-table-column sortable width="140" label="医废箱条码" prop="boxcode" />
          <el-table-column sortable width="110" label="科室重量" prop="weight" />
          <el-table-column sortable width="120" label="科室交接人" prop="handover" />
          <el-table-column sortable width="110" label="交接科室" prop="dname" />
          <el-table-column sortable width="100" label="收集人" prop="collector" />
          <el-table-column sortable width="170" label="入库时间" prop="enterdate" />
          <el-table-column sortable width="110" label="入库重量" prop="enterweight" />
          <el-table-column sortable width="100" label="入库人" prop="warehouser" />
          <el-table-column sortable label="所属院区" prop="hname" />
        </el-table>
      </div>
      <div class="block" style="text-align: center;margin-top: 5px">
        <el-pagination :current-page="nowPage" :page-sizes="[10, 20,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCum" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
import '../../styles/kLayout.css'
import { getAccId, getRoleType } from '../../utils/auth'
export default {
  name: 'StockIn',
  data() {
    return {
      // 表格数据
      tableData: [],
      // 医院名字下拉框
      hospitalName: [],
      ruleForm: {
        // 选择的医院名称
        selectName: '',
        // 选择的状态
        selectStatus: ''
      },
      // 表格高度
      tableHeight: window.innerHeight * 0.8 + 'px',
      // 当前页数
      nowPage: 1,
      // 当前页显示数量
      pageSize: 17,
      // 当前总页数
      totalCum: 10,
      // 开始结束时间
      beginAndEndTime: '',
      // 开始时间
      beginTime: '',
      // 结束时间
      endTime: '',
      value: '',
      // 被选中的集合
      selectCheckboxs: [],
      multipleSelection: [],
      // 存放所有医废信息 (无分页)
      tableDataAll: []
    }
  },
  mounted() {
    this.tableHeight = window.innerHeight * 0.8 + 'px' // 表格动态高度，根据屏幕分辨率
    getStockInInfo(this)
    getHospitalName(this)
  },
  methods: {
    // 根据状态值修改状态内容
    formatState: function(row, column) {
      return row.state === 1 ? '已入库' : '未入库'
    },
    // 查询按钮
    queryInfo() {
      if (this.beginAndEndTime !== null) {
        this.beginTime = this.beginAndEndTime[0]
        this.endTime = this.beginAndEndTime[1]
      } else {
        this.beginTime = ''
        this.endTime = ''
      }
      this.nowPage = 1
      getStockInInfo(this)
    },
    // 批量勾选出库
    batchOutLibrary() {
      if (this.selectCheckboxs.length !== 0) {
        request.post('/StockIn/batchOutLibrary', {
          stickInArray: this.selectCheckboxs,
          adminid: getAccId(),
          RoleType: getRoleType()
        }).then(res => {
          if (res.code === 1) {
            this.$message({
              message: res.msg,
              center: true,
              type: 'success'
            })
            this.nowPage = 1
            getStockInInfo(this)
          }
        })
      } else {
        this.$message.error({
          message: '您还没有选择任何数据',
          center: true
        })
      }
    },
    // 批量全部出库
    batchOutLibraryAll() {
      this.$confirm('请确认是否全部出库', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.post('/StockIn/batchOutLibraryAll', {
          adminid: getAccId(),
          RoleType: getRoleType()
        }).then(res => {
          if (res.code === 1) {
            this.$message({
              message: res.msg,
              center: true,
              type: 'success'
            })
            this.nowPage = 1
            getStockInInfo(this)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消出库'
        })
      })
    },
    // 禁用已入库的选项
    selectable(row, index) {
      if (row.dataname === '已出库') {
        return false
      } else {
        return true
      }
    },
    // 选中复选框时触发
    selectCheckbox(selection, row) {
      if (row.state === 1) {
        this.$message.error({
          message: '已出库完毕,请勿重复出库',
          center: true
        })
      } else {
        this.selectCheckboxs = []
        for (let i = 0; i < selection.length; i++) {
          this.selectCheckboxs.push(selection[i])
        }
      }
    },
    // 全选时触发
    selectableAll(selection) {
      this.selectCheckboxs = []
      for (let i = 0; i < selection.length; i++) {
        this.selectCheckboxs.push(selection[i])
      }
    },
    // 分页条数
    handleSizeChange(val) {
      this.pageSize = val
      getStockInInfo(this)
    },
    // 分页 上一页下一页
    handleCurrentChange(val) {
      this.nowPage = val
      getStockInInfo(this)
    },
    // 导出 excel
    outExcel() {
      // 获得查询到的所有医废信息
      request.post('/StockIn/queryStockInInfoAll', {}, {
        params: {
          'hname': this.ruleForm.selectName,
          'state': this.ruleForm.selectStatus,
          'beginTime': this.beginTime,
          'endTime': this.endTime
        }
      }).then(res => {
        this.tableDataAll = res.data
      })
      this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用Excel
        this.export2Excel()
      }).catch(() => {})
    },
    export2Excel() {
      var that = this
      require.ensure([], () => {
        // 这里必须使用绝对路径，根据自己的命名和路径
        const { export_json_to_excel } = require('./Export2Excel')
        const tHeader = [
          '序',
          '状态',
          '医废分类',
          '科室重量',
          '科室交接人',
          '交接科室',
          '收集人',
          '入库时间',
          '入库重量',
          '入库人',
          '医废条形码',
          '医废箱条码',
          '所属院区'
        ] // 导出的表头名
        const filterVal = [
          'row',
          'dataname',
          'tname',
          'weight',
          'handover',
          'dname',
          'collector',
          'enterdate',
          'enterweight',
          'warehouser',
          'bagcode',
          'boxcode',
          'hname'
        ] // 导出的表头字段名
        if (that.multipleSelection.length === 0) {
          this.tableDataAll.forEach(item => {
            this.$set(item, '请选择', '请选择')
            // this.$set(item,'yq','暂无')
          })
          const list = that.tableDataAll
          // that.excelData为传入的数据
          const data = that.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '医疗废弃物报表') // 导出的表格名称，根据需要自己命名
          // tHeader为导出Excel表头名称，'xxxxxx'即为导出Excel名称
        } else {
          const list = that.multipleSelection
          // that.excelData为传入的数据
          const data = that.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '医疗废弃物报表') // 导出的表格名称，根据需要自己命名
          // tHeader为导出Excel表头名称，'xxxxxx'即为导出Excel名称
        }
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}

// 获取表格中的数据
function getStockInInfo($this) {
  request.post('/StockIn/queryStockInInfo', {
    hname: $this.ruleForm.selectName,
    state: $this.ruleForm.selectStatus,
    beginTime: $this.beginTime,
    endTime: $this.endTime,
    nowPage: ($this.nowPage - 1) * $this.pageSize,
    pageSize: $this.pageSize
  }).then(res => {
    $this.tableData = res.StockInInfoList
    $this.totalCum = res.count
  })
}

// 获取医院名称
function getHospitalName($this) {
  request.post('/StockIn/getHospitalName').then(res => {
    $this.hospitalName = res.hospitalList
  })
}
</script>

<style scoped>
</style>
