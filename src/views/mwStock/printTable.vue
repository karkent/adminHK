<template>
  <div>
    <div style="width: 1080px;margin: auto">
      <el-button v-print="printObj">打印</el-button>
    </div>
    <div id="printtable" style="width: 1000px;margin: auto;padding: 2px">
      <div style="text-align: center;height: 20px;font-weight:bold">{{ tablename }}</div>
      <hr style="border: 1px solid #808080">

      <!-- 废物类型一 -->
      <div v-if="tablisshow1" style="margin-top: 5px">
        <p>医废物类：感染性废物</p>
        <div style="border: 1px solid #8c939d">
          <el-table
            border
            stripe
            :data="tableData1"
            :summary-method="getSummaries"
            show-summary
            :row-style="{height:&quot;40px&quot;}"
            :cell-style="{padding:&quot;0&quot;}"
          >
            <el-table-column
              label="序"
              type="index"
              align="center"
            />
            <el-table-column label="医废包编码" prop="bagcode" width="170px" />
            <el-table-column label="重量（KG）" prop="weight" width="100px" />
            <el-table-column label="交接科室" prop="dname" width="100px" />
            <el-table-column label="交接人" prop="sname" width="80px" />
            <el-table-column label="收集人" prop="sname2" width="80px" />
            <el-table-column label="出库时间" prop="outdate" width="160px" />
            <el-table-column label="出库人" prop="outman" />
            <el-table-column label="出库交接人" prop="outgetmnan" />
          </el-table>
        </div>
        <hr style="border: 1px solid #808080; margin-top: 10px">
      </div>
      <!-- 废物类型二 -->
      <div v-if="tablisshow2" style="margin-top: 5px">
        <p>医废物类：损伤性废物</p>
        <div style="border: 1px solid #8c939d">
          <el-table
            border
            stripe
            :data="tableData2"
            :summary-method="getSummaries"
            show-summary
            :row-style="{height:&quot;40px&quot;}"
            :cell-style="{padding:&quot;0&quot;}"
          >
            <el-table-column
              label="序"
              type="index"
              align="center"
            />
            <el-table-column label="医废包编码" prop="bagcode" width="170px" />
            <el-table-column label="重量（KG）" prop="weight" width="100px" />
            <el-table-column label="交接科室" prop="dname" width="100px" />
            <el-table-column label="交接人" prop="sname" width="80px" />
            <el-table-column label="收集人" prop="sname2" width="80px" />
            <el-table-column label="出库时间" prop="outdate" width="160px" />
            <el-table-column label="出库人" prop="outman" />
            <el-table-column label="出库交接人" prop="outgetmnan" />
          </el-table>
        </div>
        <hr style="border: 1px solid #808080; margin-top: 10px">
      </div>
      <!-- 废物类型三 -->
      <div v-if="tablisshow3" style="margin-top: 5px">
        <p>医废物类：病理性废物</p>
        <div style="border: 1px solid #8c939d">
          <el-table
            border
            stripe
            :data="tableData3"
            :summary-method="getSummaries"
            show-summary
            :row-style="{height:&quot;40px&quot;}"
            :cell-style="{padding:&quot;0&quot;}"
          >
            <el-table-column
              label="序"
              type="index"
              align="center"
            />
            <el-table-column label="医废包编码" prop="bagcode" width="170px" />
            <el-table-column label="重量（KG）" prop="weight" width="100px" />
            <el-table-column label="交接科室" prop="dname" width="100px" />
            <el-table-column label="交接人" prop="sname" width="80px" />
            <el-table-column label="收集人" prop="sname2" width="80px" />
            <el-table-column label="出库时间" prop="outdate" width="160px" />
            <el-table-column label="出库人" prop="outman" />
            <el-table-column label="出库交接人" prop="outgetmnan" />
          </el-table>
        </div>
        <hr style="border: 1px solid #808080; margin-top: 10px">
      </div>
      <!-- 废物类型四 -->
      <div v-if="tablisshow4" style="margin-top: 5px">
        <p>医废物类：化学性废物</p>
        <div style="border: 1px solid #8c939d">
          <el-table
            border
            stripe
            :data="tableData4"
            :summary-method="getSummaries"
            show-summary
            :row-style="{height:&quot;40px&quot;}"
            :cell-style="{padding:&quot;0&quot;}"
          >
            <el-table-column
              label="序"
              type="index"
              align="center"
            />
            <el-table-column label="医废包编码" prop="bagcode" width="170px" />
            <el-table-column label="重量（KG）" prop="weight" width="100px" />
            <el-table-column label="交接科室" prop="dname" width="100px" />
            <el-table-column label="交接人" prop="sname" width="80px" />
            <el-table-column label="收集人" prop="sname2" width="80px" />
            <el-table-column label="出库时间" prop="outdate" width="160px" />
            <el-table-column label="出库人" prop="outman" />
            <el-table-column label="出库交接人" prop="outgetmnan" />
          </el-table>
        </div>
        <hr style="border: 1px solid #808080; margin-top: 10px">
      </div>
      <!-- 废物类型五 -->
      <div v-if="tablisshow5" style="margin-top: 5px">
        <p>医废物类：药物性废物</p>
        <div style="border: 1px solid #8c939d">
          <el-table
            border
            stripe
            :data="tableData5"
            :summary-method="getSummaries"
            show-summary
            :row-style="{height:&quot;40px&quot;}"
            :cell-style="{padding:&quot;0&quot;}"
          >
            <el-table-column
              label="序"
              type="index"
              align="center"
            />
            <el-table-column label="医废包编码" prop="bagcode" width="170px" />
            <el-table-column label="重量（KG）" prop="weight" width="100px" />
            <el-table-column label="交接科室" prop="dname" width="100px" />
            <el-table-column label="交接人" prop="sname" width="80px" />
            <el-table-column label="收集人" prop="sname2" width="80px" />
            <el-table-column label="出库时间" prop="outdate" width="160px" />
            <el-table-column label="出库人" prop="outman" />
            <el-table-column label="出库交接人" prop="outgetmnan" />
          </el-table>
        </div>
        <hr style="border: 1px solid #808080; margin-top: 10px">
      </div>
      <!-- 废物类型六 -->
      <div v-if="tablisshow6" style="margin-top: 5px">
        <p>医废物类：输液瓶、袋、其他</p>
        <div style="border: 1px solid #8c939d">
          <el-table
            border
            stripe
            :data="tableData6"
            :summary-method="getSummaries"
            show-summary
            :row-style="{height:&quot;40px&quot;}"
            :cell-style="{padding:&quot;0&quot;}"
          >
            <el-table-column
              label="序"
              type="index"
              align="center"
            />
            <el-table-column label="医废包编码" prop="bagcode" width="170px" />
            <el-table-column label="重量（KG）" prop="weight" width="100px" />
            <el-table-column label="交接科室" prop="dname" width="100px" />
            <el-table-column label="交接人" prop="sname" width="80px" />
            <el-table-column label="收集人" prop="sname2" width="80px" />
            <el-table-column label="出库时间" prop="outdate" width="160px" />
            <el-table-column label="出库人" prop="outman" />
            <el-table-column label="出库交接人" prop="outgetmnan" />
          </el-table>
        </div>
        <hr style="border: 1px solid #808080; margin-top: 10px">
      </div>

      <div style="margin-top: 30px">
        <div style="margin-left: 20px">
          打印日期：{{ this.nowday }}
        </div>
        <div style="margin-top: 15px; display: flex ; justify-content: end">
          医院负责人签名：___________________
        </div>
        <div style="margin-top: 15px; display: flex ; justify-content: end">
          医废公司负责人签名：_______________
        </div>
        <hr style=" margin-top: 5px; border: 1px solid #808080; margin-top: 10px">
        <div style="margin-top: 35px" />
      </div>
    </div>
  </div>
</template>

<script>
// import printJS from "print-js";
import { dateToStr } from '../../utils/kaihangTool'
export default {
  name: 'PrintTable',
  data() {
    return {
      printObj: {
        id: 'printtable',
        popTitle: ''
      },
      tableData: [],
      tablename: '出库清单',
      tableData1: [],
      tablisshow1: false,
      tableData2: [],
      tablisshow2: false,
      tableData3: [],
      tablisshow3: false,
      tableData4: [],
      tablisshow4: false,
      tableData5: [],
      tablisshow5: false,
      tableData6: [],
      tablisshow6: false,
      nowday: ''
    }
  },
  created() {
    this.nowday = dateToStr(new Date())
    const that = this
    const obj = sessionStorage.getItem('tableData')
    this.selectArr = JSON.parse(obj)
    this.tableData = this.selectArr
    this.tablename = this.tableData[0].hname + this.tablename
    // 处理返回到数据进行类别上的区分
    var proData = this.tableData
    proData.forEach((item, index, arr) => {
      if (item.typeid === 1) {
        that.tableData1.push(item)
        that.tablisshow1 = true
      }
      if (item.typeid === 2) {
        that.tableData2.push(item)
        that.tablisshow2 = true
      }
      if (item.typeid === 3) {
        that.tableData3.push(item)
        that.tablisshow3 = true
      }
      if (item.typeid === 4) {
        that.tableData4.push(item)
        that.tablisshow4 = true
      }
      if (item.typeid === 5) {
        that.tableData5.push(item)
        that.tablisshow5 = true
      }
      if (item.typeid === 6 || item.typeid === 7 || item.typeid === 8 || item.typeid === 9) {
        that.tableData6.push(item)
        that.tablisshow6 = true
      }
    })
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      const sums2 = []
      columns.forEach((column, index) => {
        if (index === 1) {
          // + this.tableData[0].outman
          sums[index] = '合计出库重量:'
          return
        }
        // if (index === 3) {
        //   sums[index] = '物流人员:' + this.tableData[0].logistics;
        //   return;
        // }
        // if (index === 5) {
        //   sums[index] = '';
        //   return;
        // }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] = sums[index].toFixed(2)
          sums[index] += ' KG'
          if (index === 2) {
            sums[index] = sums[index]
          } else if (index === 4) {
            sums[index] = sums[index]
          }
        } else {
          sums[index] = ''
        }
      })

      columns.forEach((column, index) => {
        if (index === 1) {
          sums2[index] = '入库人:'
          return
        }
      })
      return sums
    }
  }
}
</script>

<style scoped>

</style>
