<template>
  <div>
    <el-form :inline="true">
      <div class="searchDiv">
        <el-row>
          <el-col :span="3.5">
            <el-form-item label="医院名称：" size="15">
              <el-select v-model="ruleForm.selectName" placeholder="请选择" size="small" style="width: 160px">
                <el-option selected label="请选择" value="0" />
                <el-option
                  v-for="item in hospitalName"
                  :key="item.hid"
                  :label="item.hname"
                  :value="item.hid"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6.1">
            <el-row>
              <el-form-item label="入库时间：" size="15">
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker
                      v-model="beginAndEndTime"
                      value-format="yyyy-MM-dd hh:mm:ss"
                      type="datetimerange"
                      range-separator="~"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      :default-time="['00:00:00', '23:59:59']"
                      size="small"
                    />
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-row>
          </el-col>
          <el-col :span="6.1">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="queryInfo">查 询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div style="width: 100%;">
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple" style="text-align: center;padding-top: 33px"><span>{{ produceKG }}KG</span>&nbsp;&nbsp;<span>{{ produceNum }}箱</span><br><span>产生</span></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple" style="text-align: center;padding-top: 33px"><span>{{ transportKG }}KG</span>&nbsp;&nbsp;<span>{{ transportNum }}箱</span><br><span>转运</span></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple" style="text-align: center;padding-top: 33px"><span>{{ stockInKG }}KG</span>&nbsp;&nbsp;<span>{{ stockInNum }}箱</span><br><span>入库</span></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple" style="text-align: center;padding-top: 33px"><span>{{ stockOutKG }}KG</span>&nbsp;&nbsp;<span>{{ stockOutNum }}箱</span><br><span>出库</span></div></el-col>
      </el-row>
    </div>
    <div style="height: 100%">
      <h2 style="margin-left: 45%">医废日报</h2>
      <el-table
        border
        stripe
        :data="tableData"
        :height="tableHeight"
        :row-style="{height: '40px'}"
        :cell-style="{padding:0}"
      >
        <el-table-column
          label="序号"
          type="index"
          width="50"
          align="center"
        />
        <el-table-column label="医院" prop="hname" /><!--:formatter='formatState'-->
        <el-table-column label="医废总量" prop="infoAll" />
        <el-table-column label="感染性废物" prop="value1" />
        <el-table-column label="损伤性废物" prop="value2" />
        <el-table-column label="病理性废物" prop="value3" />
        <el-table-column label="化学性废物" prop="value4" />
        <el-table-column label="药物性废物" prop="value5" />
        <el-table-column label="输液瓶、袋" prop="value6" />
      </el-table>
      <div class="block" style="text-align: center;margin-top: 5px">
        <el-pagination :current-page="nowPage" :page-sizes="[10, 20,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCum" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <div id="main" style="width: 100%;height: 500px;" />
  </div>
</template>

<script>
import request from '../../utils/request'
import { dateToStr } from '../../utils/kaihangTool'

export default {
  name: 'DailyReport',
  data() {
    return {
      // 表格数据
      tableData: [],
      // 表格内总重量数量
      infoAll: '',
      // 医院名字下拉框
      hospitalName: [],
      // 表单数据
      ruleForm: {
        // 选择的医院名
        selectName: ''
      },
      // 表格高度
      tableHeight: window.innerHeight * 0.25,
      // 当前页数
      nowPage: 1,
      // 当前页显示数量
      pageSize: 16,
      // 当前总页数
      totalCum: 10,
      // 当天时间
      today: new Date(),
      // 开始结束时间
      beginAndEndTime: [],
      // 开始时间
      beginTime: '',
      // 结束时间
      endTime: '',
      // 产生袋数
      produceNum: '',
      // 转运袋数
      transportNum: '',
      // 入库袋数
      stockInNum: '',
      // 出库袋数
      stockOutNum: '',
      // 产生重量
      produceKG: '',
      // 转运重量
      transportKG: '',
      // 入库重量
      stockInKG: '',
      // 出库重量
      stockOutKG: '',
      // 报表中医院名称
      hospitalData: [],
      // 报表中医废信息
      typeInfo: []
    }
  },
  computed: {
    maxval: function() {
      var val = 0
      if (this.typeInfo != null) {
        this.typeInfo.forEach(item => {
          const intval = parseFloat(item.data[0])
          if (intval > val) {
            val = intval
          }
        })
        return Math.ceil(val / 100) * 100
      } else {
        return 1200
      }
    }
  },
  mounted() {
    var dateStr = dateToStr(new Date())
    var dateArr = dateStr.split(' ')
    var beginTimeStr = dateArr[0] + ' 00:00:00'
    var endTimeStr = dateArr[0] + ' 23:59:59'
    this.beginAndEndTime = [beginTimeStr, endTimeStr]
    this.tableHeight = window.innerHeight * 0.25 // 表格动态高度，根据屏幕分辨率
    this.beginTime = beginTimeStr
    this.endTime = endTimeStr
    getStockInInfo(this)
    getHospitalName(this)
    getDailyReportWeight(this)
    getDailyReportNum(this)
    getEchartsInfo(this)
    // this.myEcharts()
  },
  methods: {
    // 查询按钮
    queryInfo() {
      if (this.beginAndEndTime !== null) {
        this.beginTime = this.beginAndEndTime[0]
        this.endTime = this.beginAndEndTime[1]
      } else {
        this.beginTime = ''
        this.endTime = ''
      }
      getDailyReportWeight(this)
      getDailyReportNum(this)
      getStockInInfo(this)
      getEchartsInfo(this)
      // this.myEcharts()
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
    // 报表
    myEcharts() {
      var myChart = this.$echarts.init(document.getElementById('main'))
      myChart.clear()
      var option = {
        grid: {
          left: '13%',
          right: '13%',
          bottom: '6%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: true },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['感染性废物', '损伤性废物', '病理性废物', '化学性废物', '药物性废物', '输液瓶、袋']
        },
        xAxis: [
          {
            type: 'category',
            data: ['厦门第一医院'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: this.maxval,
            interval: 100,
            axisLabel: {
              formatter: '{value} kg'
            }
          },
          {
            type: 'value',
            min: 0,
            max: this.maxval,
            interval: 100,
            axisLabel: {
              formatter: '{value} kg'
            }
          }
        ],
        series: this.typeInfo
      }
      myChart.setOption(option)
    }
  }
}
// 获取表格中的数据
function getStockInInfo($this) {
  request.post('/Report/getDailyReportTypeInfo', {
    hospitalName: $this.ruleForm.selectName,
    beginTime: $this.beginTime,
    endTime: $this.endTime
  }).then(res => {
    $this.tableData = res.list
    $this.infoAll = res.all
    // $this.tableData.add('infoAll', $this.infoAll)
  })
}

// 获取医院名称
function getHospitalName($this) {
  request.post('/StockIn/getHospitalName').then(res => {
    $this.hospitalName = res.hospitalList
    $this.ruleForm.selectName = res.hospitalList[0].hid
  })
}

// 获取产生 转运 入库 出库重量
function getDailyReportWeight($this) {
  request.post('/Report/getDailyReportWeight', {
    hospitalName: $this.ruleForm.selectName,
    beginTime: $this.beginTime,
    endTime: $this.endTime
  }).then(res => {
    if (res.list != null) {
      $this.produceKG = res.list.weight
      $this.transportKG = res.list.weight
      $this.stockInKG = res.stockInWeight
      $this.stockOutKG = res.stockOutWeight
    }
  })
}

// 获取日报表的 产生和转运的箱数
function getDailyReportNum($this) {
  request.post('/Report/getDailyReportNum', {
    hospitalName: $this.ruleForm.selectName,
    beginTime: $this.beginTime,
    endTime: $this.endTime
  }).then(res => {
    $this.produceNum = res.list
    $this.transportNum = res.list
    $this.stockInNum = res.stockInNum
    $this.stockOutNum = res.stockOutNum
  })
}
// 获取日报表 报表的数据
function getEchartsInfo($this) {
  setTimeout(function() {
    request.post('/Report/getEchartsInfo', {
      hospitalName: $this.ruleForm.selectName,
      beginTime: $this.beginTime,
      endTime: $this.endTime
    }).then(res => {
      $this.hospitalData = res.hospitalName
      $this.typeInfo = res.list
      $this.myEcharts()
    })
  }, 500)
}
</script>

<style scoped>
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 100px;
  }
  .el-date-editor{
    margin-top: 3px;
  }
  .el-range-editor{
    padding:3px 10px 0;
  }
</style>
