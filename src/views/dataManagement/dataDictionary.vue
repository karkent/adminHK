<template>
  <div>
    <div style="float: left;margin-top: 10px">
      &ensp;&ensp;<a style="font-size: 20px">参数:</a>
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
      <el-button icon="el-icon-search" size="small">搜索</el-button>
      <el-button type="success" icon="el-icon-edit" round @click="dialogFormVisible = true">新增</el-button>
    </div>
    <el-table
      border
      stripe
      :data="tableData"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      style="width: 100%;min-height: 652px;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column sortable type="index" label="序号" width="75px" />
      <el-table-column type="selection" />
      <el-table-column sortable prop="pid" label="父级id" width="200px" />
      <el-table-column sortable prop="dataname" label="参数名称" width="200px" />
      <el-table-column sortable prop="dremarks" label="备注" width="200px" />
      <el-table-column label="操作" width="">
        <template>
          <el-button type="primary" icon="el-icon-edit-outline" round @click="dialogupdate">修改</el-button>
          <el-button type="warning" icon="el-icon-close" round>禁用</el-button>
          <el-button type="primary" icon="el-icon-check" round>恢复使用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, sizes, total"
      :page-sizes="[ 12, 20]"
      :page-size="pageSize"
      :total="tableData.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <!--增加分类-->
    <el-dialog title="新增参数类型" :visible.sync="dialogFormVisible" width="40%" style="font-size: 18px" :before-close="handleClose">
      <el-form :model="form" style="font-size: 18px">
        <el-form-item label="父级id:" label-width="150px">
          <el-input v-model="form.tname" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-form-item label="参数名称:" label-width="150px">
          <el-input v-model="form.tname" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-form-item label="备注:" label-width="150px">
          <el-input v-model="form.dremarks" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DataDictionary',
  data() {
    return {
      sectionValue: '',
      sectionName: [],
      time: [],
      tableData: [{ tname: 'a' }],
      pageSize: 12,
      currPage: 1,
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        pid: '',
        dataname: '',
        dremarks: ''
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getselectdata() {
    },
    handleSizeChange(val) {
      this.getselectdata()
    },
    handleCurrentChange(val) {
      this.getselectdata()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>

</style>
