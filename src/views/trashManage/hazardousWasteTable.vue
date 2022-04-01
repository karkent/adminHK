<template>
  <div>
    <div style="width: 900px;margin: auto">
      <el-button v-print="printObj">打印</el-button>
    </div>
    <div style="text-align: center;height: 40px;font-weight:bold;font-size: 20px">危险废物转移联单</div>
    <div style="width: 850px;margin: auto;">
      <div style="float: left;width: 600px">医疗卫生机构名称：{{ HospitalName }}</div>
      <div style="float: right;width: 200px">{{ yearMonth }}</div>
    </div>
    <div id="printtable" style="width: 900px;margin: auto;border: 1px solid #808080">
      <el-table
        :data="tablelist"
        style="width: 900px"
      >
        <el-table-column label="日期" prop="startdate" />
        <el-table-column label="感染性废物及其他">
          <el-table-column label="袋" prop="otherBags" />
          <el-table-column label="箱" prop="otherBoxs" />
          <el-table-column label="重量" prop="otherTotalweight" />
        </el-table-column>
        <el-table-column label="损伤性废物">
          <el-table-column label="袋" prop="bags" />
          <el-table-column label="箱" prop="boxs" />
          <el-table-column label="重量" prop="totalweight" />
        </el-table-column>
        <el-table-column label="医疗卫生机构交接人员签名" prop="collectName" />
        <el-table-column label="废物运送人员签名" prop="enterName" />
        <el-table-column label="交接时间" prop="inDate" />
      </el-table>
    </div>
    <div style="margin-top: 30px;width: 100%;height: 30px" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      yearMonth: '',
      HospitalName: '',
      totalweight: [],
      tablelist: [],
      printObj: {
        id: 'printtable',
        popTitle: ''
      }
    }
  },
  created() {
    // 传进来的表格数据
    const tablelist = sessionStorage.getItem('tablelist')
    const HospitalName = sessionStorage.getItem('HospitalName')
    // const dateStr = new Date().setTime(timearray[1])

    const dateStr = sessionStorage.getItem('yearMonth')
    this.yearMonth = dateStr.substring(0, 4) + '年' + dateStr.substring(5, 7) + '月'
    this.tablelist = JSON.parse(tablelist)
    this.HospitalName = HospitalName
  },
  methods: {}
}
</script>

<style scoped>
</style>
