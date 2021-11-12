<template>
  <div>
    <div style="float: left;margin-top: 10px">
      &ensp;&ensp;<a style="font-size: 20px">科室名称:</a>
      <el-select v-model="sectionValue" placeholder="请选择" size="small" style="width: 155px">
        <el-option
          v-for="item in sectionName"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
          style="height: 50px"
        />
      </el-select>
    </div>
    <div style="float: left;margin-top: 10px">
      <el-button icon="el-icon-search" size="small">搜索</el-button></div>
    <el-table border stripe :data="tableData" height="500px" style="width: 100%">
      <el-table-column header-align="center" align="center" type="index" label="序号" width="50px" />
      <el-table-column header-align="center" align="center" type="selection" />
      <el-table-column prop="dname" label="科室名称" />
      <el-table-column prop="dcode" label="科室编码" />
      <el-table-column header-align="center" align="center" label="打印科室分类码" width="250">
        <template slot-scope="scope">
          <el-button type="primary" @click="dialogFormVisible = true,handleselect(scope.row)">打印科室分类码</el-button>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="打印科室码" width="250">
        <template slot-scope="scope">
          <el-button type="primary" @click="dialogFormVisible = true,handleselect(scope.row)">打印科室码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :page-sizes="[50, 100, 200, 300]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'TrashPrint',
  data() {
    return {
      sectionValue: '',
      sectionName: [],
      input: '',
      tableData: [{}],
      currentPage: 1,
      pageSize: 50,
      total: 0
    }
  },
  methods: {
    getselectdata() {
    },
    handleSizeChange(val) {
      this.getselectdata()
    },
    handleCurrentChange(val) {
      this.getselectdata()
    }
  }
}
</script>

<style scoped>

</style>
