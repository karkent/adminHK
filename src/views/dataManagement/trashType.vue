<template>
  <div>
    <div style="float: left;margin-top: 10px">
      &ensp;&ensp;<a style="font-size: 18px">医废分类:</a>
      <el-select v-model="trashValue" placeholder="请选择" size="small" style="width: 60%">
        <el-option
          v-for="item in tableOne.trashType"
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
    <!--表格-->
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
      <el-table-column sortable prop="tname" label="医废分类名称" width="200px" />
      <el-table-column sortable prop="tcode" label="医废分类编码" width="200px" />
      <el-table-column sortable prop="tstate" label="医废分类状态" width="200px" />
      <el-table-column label="操作" width="">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit-outline" round @click="dialogupdate=true,handleselect(scope.row)">修改</el-button>
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
    <!--新增分类隐藏框-->
    <el-dialog title="新增医废类型" :visible.sync="dialogFormVisible" width="40%" style="font-size: 18px" :before-close="handleClose">
      <el-form ref="ruleForm" :rules="rules" :model="form" style="font-size: 18px">
        <el-form-item label="医废分类名称:" label-width="150px">
          <el-input v-model="form.tname" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-form-item label="医废分类编码:" label-width="150px">
          <el-input v-model="form.tcode" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
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
  name: 'TrashType',
  data() {
    return {
      trashValue: '',
      tableOne: {
        trashType: [{}]
      },
      tableData: [{ tname: 'a' }],
      pageSize: 12,
      currPage: 1,
      dialogFormVisible: false,
      dialogVisible: false,
      dialogupdate: false,
      form: {
        tname: '',
        tcode: ''
      },
      rules: {
        tname: [
          { required: true, message: '请输入废物类型', trigger: 'blur' }
        ]
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
