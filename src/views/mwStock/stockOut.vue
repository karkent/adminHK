<template>
  <div>
    <div class="topDiv">
      <div class="topBtnDiv" style="width: 760px">
        <el-select v-model="ruleForm.selectName" placeholder="请选择医院" size="mini" style="float:left;width: 160px">
          <el-option selected label="请选择" value="0" />
          <el-option
            v-for="item in hospitalName"
            :key="item.hid"
            :label="item.hname"
            :value="item.hid"
            size="mini"
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
          style="width: 250px;float:left;margin-left: 5px"
        />
        <el-select v-model="ruleForm.selectType" placeholder="请选择废物类型" size="mini" style="float:left;width: 160px;margin-left: 5px">
          <el-option selected label="请选择" value="0" />
          <el-option
            v-for="item in medicalWasteType"
            :key="item.tid"
            :label="item.tname"
            :value="item.tid"
            size="mini"
          />
        </el-select>
        <el-input v-model="ruleForm.number" placeholder="请输入批次编号查询" size="mini" style="float:left;width: 170px;margin-left: 5px" autocomplete="off" oninput="value=value.replace(/[^\d]/g,'')" maxlength="40" />
      </div>
      <div class="btn_div">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="queryInfo">查 询</el-button>
      </div>
      <div class="btn_div">
        <el-button type="success" size="mini" @click="outExcel()">导出EXCEL</el-button>
      </div>
      <div class="btn_div">
        <el-button type="success" size="mini" @click="detailedList">出库清单</el-button>
      </div>
    </div>
    <!--    :span-method=""-->
    <div style="float:left;height: 100%;width: 100%;margin-top: 10px">
      <div id="table" style="height: 90%;width: 97%;margin: auto">
        <el-table
          border
          stripe
          :data="tableData"
          :height="tableHeight"
          :row-style="{height:&quot;40px&quot;}"
          :cell-style="{padding:&quot;0&quot;}"
        >
          <el-table-column
            type="selection"
            width="50"
            align="left"
          />
          <el-table-column
            label="序"
            type="index"
            width="50"
            align="center"
          />
          <el-table-column sortable width="80" label="状态" prop="dataname" /><!--:formatter='formatState'-->
          <el-table-column sortable width="110" label="医废分类" prop="tname" />
          <el-table-column sortable width="110" label="入库重量" prop="enterweight" />
          <el-table-column sortable width="120" label="科室交接人" prop="handover" />
          <el-table-column sortable width="110" label="交接科室" prop="dname" />
          <el-table-column sortable width="90" label="收集人" prop="collector" />
          <el-table-column sortable width="170" label="出库时间" prop="outdate" />
          <el-table-column sortable width="110" label="出库重量" prop="outweight" />
          <el-table-column sortable width="100" label="出库人" prop="outman" />
          <el-table-column sortable width="110" label="物流人员" prop="logistics" />
          <el-table-column sortable label="医废条形码" width="180" prop="bagcode" />
          <el-table-column sortable label="医废箱条码" width="150" prop="boxcode" />
          <el-table-column sortable width="150" label="所属院区" prop="hname" />
          <el-table-column sortable width="110" label="批次编号" prop="outbatchnum" />
        </el-table>
      </div>
      <div class="block" style="text-align: center;margin-top: 5px">
        <el-pagination
          :current-page="nowPage"
          :page-sizes="[10, 20,100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCum"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
import '../../styles/kLayout.css'
export default {
  name: 'StockOut',
  data() {
    return {
      // 表格数据
      tableData: [],
      // 医院名字下拉框
      hospitalName: [],
      // 医废分类下拉框
      medicalWasteType: [],
      // 搜索条件表单
      ruleForm: {
        // 选择的医院名称
        selectName: '',
        // 选择的分类
        selectType: '',
        // 选择的批次编号
        number: ''
      },
      // 开始结束时间
      beginAndEndTime: '',
      // 表格高度
      tableHeight: '',
      // 当前页数
      nowPage: 1,
      // 当前页显示数量
      pageSize: 10,
      // 当前总页数
      totalCum: 10,
      // 开始时间
      beginTime: '',
      // 结束时间
      endTime: '',
      // 被选中的集合
      selectCheckboxs: [],
      multipleSelection: [],
      // 存放所有医废信息 (无分页)
      tableDataAll: [],
      // 打印时,回传的打印信息
      printList: [],
      // 存放打印的字段
      printData: []
    }
  },
  mounted() {
    this.tableHeight = window.innerHeight * 0.72 + 'px' // 表格动态高度，根据屏幕分辨率
    getStockInInfo(this)
    getHospitalName(this)
    getMedicalWasteType(this)
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      getStockInInfo(this)
    },
    handleCurrentChange(val) {
      this.nowPage = val
      getStockInInfo(this)
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
    // 打印清单
    detailedList() {
      this.printList = []
      this.printData = []
      request.post('/StockOut/queryStockInInfoAll', {
        hname: this.ruleForm.selectName,
        type: this.ruleForm.selectType,
        beginTime: this.beginTime,
        endTime: this.endTime,
        outbatchnum: this.ruleForm.number
        // nowPage: ($this.nowPage-1) * $this.pageSize,
        // pageSize: $this.pageSize
      }).then((res) => {
        this.printList = res.StockInInfoAllList || []
        for (const v of this.printList) {
          if (v.logistics === null) {
            v.logistics = ''
          }
          if (v.bagcode === null) {
            v.bagcode = ''
          }
          if (v.boxcode === null) {
            v.boxcode = ''
          }
          if (v.outbatchnum === null) {
            v.outbatchnum = ''
          }
        }
        // 主要实现打开新窗口的功能
        var route = this.$router.resolve({
          name: 'PrintTable'
        })
        // 主要实现存储参数的功能
        const obj = JSON.stringify(this.printList)
        sessionStorage.setItem('tableData', obj)
        window.open(route.href, '_blank')
      })
    },
    // 导出 excel
    outExcel() {
      // 获得查询到的所有医废信息
      request.post('/StockOut/queryStockInInfoAll', {
        hname: this.ruleForm.selectName,
        state: this.ruleForm.selectType,
        beginTime: this.beginTime,
        endTime: this.endTime,
        outbatchnum: this.ruleForm.number
      }).then(res => {
        this.tableDataAll = res.StockInInfoAllList
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
          '入库重量',
          '科室交接人',
          '交接科室',
          '收集人',
          '出库时间',
          '出库重量',
          '出库人',
          '物流人员',
          '医废条形码',
          '医废箱条码',
          '所属院区',
          '批次编号'
        ] // 导出的表头名
        const filterVal = [
          'row',
          'dataname',
          'tname',
          'enterweight',
          'handover',
          'dname',
          'collector',
          'outdate',
          'outweight',
          'outman',
          'logistics',
          'bagcode',
          'boxcode',
          'hname',
          'outbatchnum'
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
  request.post('/StockOut/queryStockInInfo', {
    hname: $this.ruleForm.selectName,
    type: $this.ruleForm.selectType,
    beginTime: $this.beginTime,
    endTime: $this.endTime,
    outbatchnum: $this.ruleForm.number,
    nowPage: ($this.nowPage - 1) * $this.pageSize,
    pageSize: $this.pageSize
  }).then(res => {
    $this.tableData = res.StockInInfoList
    $this.totalCum = res.count
  })
}

// 获取医院名称
function getHospitalName($this) {
  request.post('/StockOut/getHospitalName').then(res => {
    $this.hospitalName = res.HospitalNameList
  })
}

// 获取医废类型
function getMedicalWasteType($this) {
  request.post('/StockOut/getMedicalWasteType').then(res => {
    $this.medicalWasteType = res.MedicalWasteTypeList
  })
}
</script>

<style>

</style>
