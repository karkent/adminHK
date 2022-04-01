<template>
  <div>
    <div style="width: 900px;margin: auto">
      <el-button v-print="printObj">打印</el-button>
    </div>
    <div id="printtable" style="width: 900px;margin: auto;border: 1px solid #808080">
      <div style="text-align: center;height: 40px;font-weight:bold;font-siz: 20px;margin-top: 5px">本科室医疗废物记录表</div>
      <div style="float: left">
        <div style="float: left;margin-left: 20px">医疗卫生机构名称：{{ hosname }}</div>
        <div style="width: 850px;margin-left: 500px">统计时间：{{ time }}</div>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 900px"
      >
        <el-table-column prop="dd" width="50">
          <template slot="header">
            <div>日期</div>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.dd }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dname">
          <template slot="header">
            <div>院内</div>
            <div>产生点</div>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.dname }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="aa">
          <template slot="header">
            <div>感染性</div>
            <div>(kg)</div>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.aa }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bb">
          <template slot="header">
            <div>损伤性</div>
            <div>(kg)</div>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.bb }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cc">
          <template slot="header">
            <div>病理性</div>
            <div>(kg)</div>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.cc }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ee">
          <template slot="header">
            <div>化学性</div>
            <div>(kg)</div>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.ee }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ff">
          <template slot="header">
            <div>药物性</div>
            <div>(kg)</div>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.ff }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="gg">
          <template slot="header">
            <div>输液类</div>
            <div>(kg)</div>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.gg }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合计" prop="ww" />
        <el-table-column label="收集者" prop="collection" />
        <el-table-column label="交接人" prop="sname" />
      </el-table>
      <table border="1" style="border-collapse: collapse">
        <tbody>
          <!--        <tr>-->
          <!--          <td rowspan="5" style="width: 50px">汇总</td>-->
          <!--        </tr>-->
          <tr>
            <td style="width: 50px" />
            <td class="asd" style="width: 90px">汇总</td>
            <td class="asd" style="width: 85px">{{ totalweight[0]===null || totalweight[0]==='' || this.totalweight[0]==='undefined' ? '0' : totalweight[0] }}</td>
            <td class="asd" style="width: 85px">{{ totalweight[1]===null || totalweight[1]==='' || this.totalweight[1]==='undefined' ? '0' : totalweight[1] }}</td>
            <td class="asd" style="width: 85px">{{ totalweight[2]===null || totalweight[2]==='' || this.totalweight[2]==='undefined' ? '0' : totalweight[2] }}</td>
            <td class="asd" style="width: 85px">{{ totalweight[3]===null || totalweight[3]==='' || this.totalweight[3]==='undefined' ? '0' : totalweight[3] }}</td>
            <td class="asd" style="width: 85px">{{ totalweight[4]===null || totalweight[4]==='' || this.totalweight[4]==='undefined' ? '0' : totalweight[4] }}</td>
            <td class="asd" style="width: 85px">{{ totalweight[5]===null || totalweight[5]==='' || this.totalweight[5]==='undefined' ? '0' : totalweight[5] }}</td>
            <td class="asd" style="width: 85px">{{ totalweight[6]===null || totalweight[6]==='' || this.totalweight[6]==='undefined' ? '0' : totalweight[6] }}</td>
            <td rowspan="4" style="width: 85px" />
            <td rowspan="4" style="width: 84px" />
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      printObj: {
        id: 'printtable',
        popTitle: ''
      },
      totalweight: [],
      tableAry: [],
      status: false,
      tableData: [],
      hosname: '',
      time: ''
    }
  },
  created() {
    // 传进来的表格数据
    const tableAry = sessionStorage.getItem('tableAry')

    // let d1 = sessionStorage.getItem('d1')
    // let d2 = sessionStorage.getItem('d2')
    // let d3 = sessionStorage.getItem('d3')
    // let d4 = sessionStorage.getItem('d4')
    // let d5 =  sessionStorage.getItem('d5')
    // let d6 =  sessionStorage.getItem('d6')
    // let dt = sessionStorage.getItem('dt')

    this.tableData = JSON.parse(tableAry)

    let count1 = 0
    for (let i = 0; i < this.tableData.length; i++) {
      count1 += parseFloat(this.tableData[i].aa)
    }

    let count2 = 0
    for (let i = 0; i < this.tableData.length; i++) {
      count2 += parseFloat(this.tableData[i].bb)
    }
    let count3 = 0
    for (let i = 0; i < this.tableData.length; i++) {
      count3 += parseFloat(this.tableData[i].cc)
    }
    let count4 = 0
    for (let i = 0; i < this.tableData.length; i++) {
      count4 += parseFloat(this.tableData[i].ee)
    }
    let count5 = 0
    for (let i = 0; i < this.tableData.length; i++) {
      count5 += parseFloat(this.tableData[i].ff)
    }
    let count6 = 0
    for (let i = 0; i < this.tableData.length; i++) {
      count6 += parseFloat(this.tableData[i].gg)
    }
    let count7 = 0
    for (let i = 0; i < this.tableData.length; i++) {
      count7 += parseFloat(this.tableData[i].ww)
    }
    this.totalweight.push(count1.toFixed(2), count2.toFixed(2), count3.toFixed(2), count4.toFixed(2), count5.toFixed(2), count6.toFixed(2), count7.toFixed(2))

    this.hosname = sessionStorage.getItem('hosname')
    this.time = sessionStorage.getItem('time')
  },
  methods: {

  }
}
</script>

<style scoped>
  .asd {
    width: 90px;
  }
</style>
