<template>
  <div>
    <div style="width: 1000px;margin: auto">
      <el-button v-print="printObj">打印</el-button>
    </div>
    <div id="printtable">
      <div style="text-align: center;height: 40px;font-weight:bold;font-size: 20px">厦门大学附属第一医院医疗废物院内交接清单</div>
      <div style="width: 950px;margin: auto;">统计时间：{{ startdate }} ~ {{ enddate }}</div>
      <div style="width: 1000px;margin: auto;border: 1px solid #a8a9a9">
        <el-table
          :data="tableData"
          border
          style="width: 1000px"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column label="院内产生点" prop="dname">
            <template slot="header">
              <div>院内</div>
              <div>产生点</div>
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row.dname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="感染性(kg)" prop="type1" :formatter="isZero1">
            <template slot="header">
              <div>感染性</div>
              <div>(kg)</div>
            </template>
          </el-table-column>
          <el-table-column label="损伤性(kg)" prop="type2" :formatter="isZero2">
            <template slot="header">
              <div>损伤性</div>
              <div>(kg)</div>
            </template>
          </el-table-column>
          <el-table-column label="病理性(kg)" prop="type3" :formatter="isZero3">
            <template slot="header">
              <div>病理性</div>
              <div>(kg)</div>
            </template>
          </el-table-column>
          <el-table-column label="化学性(kg)" prop="type4" :formatter="isZero4">
            <template slot="header">
              <div>化学性</div>
              <div>(kg)</div>
            </template>
          </el-table-column>
          <el-table-column label="药物性(kg)" prop="type5" :formatter="isZero5">
            <template slot="header">
              <div>药物性</div>
              <div>(kg)</div>
            </template>
          </el-table-column>
          <el-table-column label="输液类(kg)" prop="type6" :formatter="isZero6">
            <template slot="header">
              <div>输液类</div>
              <div>(kg)</div>
            </template>
          </el-table-column>
          <el-table-column label="合计(kg)" prop="totalweight" :formatter="isTotalWeight">
            <template slot="header">
              <div>合计</div>
              <div>(kg)</div>
            </template>
          </el-table-column>
          <el-table-column label="周转箱(箱)" prop="boxnum" :formatter="isZero7">
            <template slot="header">
              <div>周转箱</div>
              <div>(箱)</div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="医疗废物交接者签名">
            <template slot="header">
              <div>医疗废物</div>
              <div>交接者签名</div>
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row.isZero1 }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="科室（部门）" prop="sname">
            <template slot="header">
              <div>科室</div>
              <div>(部门)</div>
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row.sname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="收集者" prop="sname2">
            <template slot="header">
              <div>收集者</div>
              <!-- <div>(kg)</div> -->
            </template>
            <template slot-scope="scope">
              <span>{{ scope.row.sname2 }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <table border="1" style="width: 1000px;margin: auto;border-collapse: collapse;border: 1px solid #a8a9a9;border-top: 0px;color: #3C3D3D">
        <tbody>
          <tr>
            <td rowspan="5" style="width: 50px">汇总</td>
          </tr>
          <tr>
            <td class="asd" style="width: 90px">重量(KG)</td>
            <td class="asd" style="width: 86px">{{ totalweight[0]===null || totalweight[0]==='' || totalweight[0]==='undefined' ? '0' : getStr(totalweight[0]) }}</td>
            <td class="asd" style="width: 86px">{{ totalweight[1]===null || totalweight[1]==='' || totalweight[1]==='undefined' ? '0' : getStr(totalweight[1]) }}</td>
            <td class="asd" style="width: 86px">{{ totalweight[2]===null || totalweight[2]==='' || totalweight[2]==='undefined' ? '0' : getStr(totalweight[2]) }}</td>
            <td class="asd" style="width: 86px">{{ totalweight[3]===null || totalweight[3]==='' || totalweight[3]==='undefined' ? '0' : getStr(totalweight[3]) }}</td>
            <td class="asd" style="width: 86px">{{ totalweight[4]===null || totalweight[4]==='' || totalweight[4]==='undefined' ? '0' : getStr(totalweight[4]) }}</td>
            <td class="asd" style="width: 86px">{{ totalweight[5]===null || totalweight[5]==='' || totalweight[5]==='undefined' ? '0' : getStr(totalweight[5]) }}</td>
            <td class="asd" style="width: 86px">{{ totalweight[6]===null || totalweight[6]==='' || totalweight[6]==='undefined' ? '0' : getStr(totalweight[6]) }}</td>
            <td rowspan="4" style="width: 86px" />
            <td rowspan="4" style="width: 86px" />
            <td rowspan="4" style="width: 86px" />
          </tr>
          <tr>
            <td>体积(箱)</td>
            <td>{{ boxlist[0] }}</td>
            <td>{{ boxlist[1] }}</td>
            <td>{{ boxlist[2] }}</td>
            <td>{{ boxlist[3] }}</td>
            <td>{{ boxlist[4] }}</td>
            <td>{{ boxlist[5] }}</td>
            <td>{{ boxlist[6] }}</td>
          </tr>
          <tr>
            <td>体积(袋)</td>
            <td>{{ baglist[0] }}</td>
            <td>{{ baglist[1] }}</td>
            <td>{{ baglist[2] }}</td>
            <td>{{ baglist[3] }}</td>
            <td>{{ baglist[4] }}</td>
            <td>{{ baglist[5] }}</td>
            <td>{{ baglist[6] }}</td>
          </tr>
          <tr>
            <td>胎盘数量</td>
            <td>{{ placentalist[0] }}</td>
            <td>{{ placentalist[1] }}</td>
            <td>{{ placentalist[2] }}</td>
            <td>{{ placentalist[3] }}</td>
            <td>{{ placentalist[4] }}</td>
            <td>{{ placentalist[5] }}</td>
            <td>{{ placentalist[6] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import {dateToStr} from "@/utils/kaihangTool";
export default {
  data() {
    return {
      printObj: {
        id: 'printtable',
        popTitle: ''
      },
      startdate: '',
      enddate: '',
      totalweight: [],
      tableAry: [],
      boxlist: [],
      baglist: [],
      placentalist: [],
      status: false,
      tableData: []
    }
  },
  created() {
    // 传进来的表格数据
    const tableAry = sessionStorage.getItem('tableAry')

    const d1 = sessionStorage.getItem('d1')
    const d2 = sessionStorage.getItem('d2')
    const d3 = sessionStorage.getItem('d3')
    const d4 = sessionStorage.getItem('d4')
    const d5 = sessionStorage.getItem('d5')
    const d6 = sessionStorage.getItem('d6')
    const dt = sessionStorage.getItem('dt')
    const start = sessionStorage.getItem('startdate')
    const end = sessionStorage.getItem('enddate')
    const boxlist = sessionStorage.getItem('boxlist')
    const baglist = sessionStorage.getItem('baglist')
    const placentalist = sessionStorage.getItem('placentalist')

    if (start !== 'undefined' && start !== '' && start !== null) {
      this.startdate = start.replace('"', '').replace('"', '')
      this.enddate = end.replace('"', '').replace('"', '')
    }
    this.tableData = JSON.parse(tableAry)
    this.boxlist = JSON.parse(boxlist)
    this.totalweight.push(d1, d2, d3, d4, d5, d6, dt)
    this.baglist = JSON.parse(baglist)
    this.placentalist = JSON.parse(placentalist)
  },
  methods: {
    isZero1(row) {
      return this.getStr(row.type1)
    },
    isZero2(row) {
      return this.getStr(row.type2)
    },
    isZero3(row) {
      return this.getStr(row.type3)
    },
    isZero4(row) {
      return this.getStr(row.type4)
    },
    isZero5(row) {
      return this.getStr(row.type5)
    },
    isZero6(row) {
      return this.getStr(row.type6)
    },
    isZero7(row) {
      return this.getStr(row.boxnum)
    },
    isTotalWeight(row) {
      return this.getStr(row.totalweight)
    },
    getStr(str) {
      if (str === '' || str === null) {
        return '0.0'
      } else {
        return parseFloat(str).toFixed(2)
      }
    }
  }
}
</script>

<style scoped>
  .asd {
    width: 90px;
  }
</style>
