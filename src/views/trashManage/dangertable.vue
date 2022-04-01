<template>
  <div>
    <div style="width: 900px;margin: auto">
      <el-button v-print="printObj">打印</el-button>
    </div>
    <div id="printtable" style="width: 900px;margin: auto;">
      <div style="text-align: center;height: 40px;font-weight:bold;font-size: 20px">医疗废弃物交接清单</div>
      <div style="width: 850px;margin: auto;">
        <div style="float: left" prop="dname">医疗卫生机构名称：{{ tableData[0].dname }}</div>
        <div style="margin-left: 600px">时间：{{ time }}</div>
      </div>
      <div style="border: 1px solid #808080;width: 904px">
        <el-table
          border
          stripe
          :data="tableData"
          style="width: 905px"
        >
          <el-table-column prop="dd" label="日期" width="55" />
          <el-table-column label="感染性">
            <el-table-column label="数量">
              <el-table-column prop="ganweight" label="KG" width="70" />
              <el-table-column prop="ganbagNum" label="袋" width="40" />
            </el-table-column>
          </el-table-column>
          <el-table-column label="损伤性">
            <el-table-column label="数量">
              <el-table-column prop="sunweight" label="KG" width="70" />
              <el-table-column prop="sunbagNum" label="袋" width="40" />
            </el-table-column>
          </el-table-column>
          <el-table-column label="病理性">
            <el-table-column label="数量">
              <el-table-column prop="bingweight" label="KG" width="70" />
              <el-table-column prop="bingagNum" label="袋" width="40" />
            </el-table-column>
          </el-table-column>
          <el-table-column label="化学性">
            <el-table-column label="数量">
              <el-table-column prop="huaweight" label="KG" width="70" />
              <el-table-column prop="huabagNum" label="袋" width="40" />
            </el-table-column>
          </el-table-column>
          <el-table-column label="药品性">
            <el-table-column label="数量">
              <el-table-column prop="yaohweight" label="KG" width="70" />
              <el-table-column prop="yaobagNum" label="袋" width="40" />
            </el-table-column>
          </el-table-column>
          <el-table-column label="输液性">
            <el-table-column label="数量">
              <el-table-column prop="shuweight" label="KG" width="70" />
              <el-table-column prop="shubagNum" label="袋" width="40" />
            </el-table-column>
          </el-table-column>
          <el-table-column prop="sname" label="收集人" width="91" />
          <el-table-column prop="sname2" label="交接人" width="91" />
        </el-table>
        <table border="1" style="border-collapse: collapse">
          <tbody>
            <tr>
              <td width="55">合计</td>
              <td width="70">{{ this.sum }}</td>
              <td width="40">{{ this.sum1 }}</td>
              <td width="70">{{ this.sum2 }}</td>
              <td width="40">{{ this.sum3 }}</td>
              <td width="70">{{ this.sum4 }}</td>
              <td width="40">{{ this.sum5 }}</td>
              <td width="70">{{ this.sum6 }}</td>
              <td width="40">{{ this.sum7 }}</td>
              <td width="70">{{ this.sum8 }}</td>
              <td width="40">{{ this.sum9 }}</td>
              <td width="70">{{ this.sum10 }}</td>
              <td width="40">{{ this.sum11 }}</td>
              <td width="91" />
              <td width="95" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dangertable',
  data() {
    return {
      printObj: {
        id: 'printtable',
        popTitle: ''
      },
      time: '',
      sum: '',
      // totalweight: [],
      // tableAry: [],
      // status: false,
      tableData: []
    }
  },
  created() {
    // 传进来的表格数据
    const list = sessionStorage.getItem('list')
    const time = sessionStorage.getItem('time')

    const sum = sessionStorage.getItem('sum')

    const sum1 = sessionStorage.getItem('sum1')
    const sum2 = sessionStorage.getItem('sum2')
    const sum3 = sessionStorage.getItem('sum3')
    const sum4 = sessionStorage.getItem('sum4')
    const sum5 = sessionStorage.getItem('sum5')
    const sum6 = sessionStorage.getItem('sum6')
    const sum7 = sessionStorage.getItem('sum7')
    const sum8 = sessionStorage.getItem('sum8')
    const sum9 = sessionStorage.getItem('sum9')
    const sum10 = sessionStorage.getItem('sum10')
    const sum11 = sessionStorage.getItem('sum11')

    this.tableData = JSON.parse(list)
    this.time = time
    this.sum = sum
    this.sum1 = sum1
    this.sum2 = sum2
    this.sum3 = sum3
    this.sum4 = sum4
    this.sum5 = sum5
    this.sum6 = sum6
    this.sum7 = sum7
    this.sum8 = sum8
    this.sum9 = sum9
    this.sum10 = sum10
    this.sum11 = sum11
  },
  methods: {
    // isZero1(row) {
    //   return this.getStr(row.type1);
    // },
    // isZero2(row) {
    //   return this.getStr(row.type2);
    // },
    // isZero3(row) {
    //   return this.getStr(row.type3);
    // },
    // isZero4(row) {
    //   return this.getStr(row.type4);
    // },
    // isZero5(row) {
    //   return this.getStr(row.type5);
    // },
    // isZero6(row) {
    //   return this.getStr(row.type6);
    // },
    // getStr(str){
    //   if (str === '' || str === null){
    //     return '0.0'
    //   }else {
    //     return str
    //   }
    // }
  }
}
</script>

<style scoped>
  .asd {
    width: 90px;
  }
</style>
