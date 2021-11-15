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
    <div style="float: left;margin-top: 10px;margin-left: 15px">
      <span>查询：</span><el-input v-model="search" size="small" style="width: 300px" placeholder="请输入参数名称查找参数" />
    </div>
    <div style="float: left;margin-top: 10px;margin-left: 20px">
      <el-button type="success" icon="el-icon-edit" round @click="dialogFormVisible = true">新增</el-button>
    </div>
    <el-table
      border
      stripe
      :data="tableData.filter(data => !search || (data.dataname +='').toLowerCase().includes(search.toLowerCase()))"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      style="width: 100%;height: 600px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column sortable type="index" label="序号" width="75px" />
      <el-table-column type="selection" />
      <el-table-column sortable prop="pid" label="父级id" width="200px" />
      <el-table-column sortable prop="dataname" label="参数名称" width="200px" />
      <el-table-column sortable prop="dremarks" label="备注" width="200px" />
      <el-table-column label="操作" width="">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit-outline" round @click="dialogupdatedata(scope.index,scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      :total="totalCum"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <!--增加分类-->
    <el-dialog
      title="新增参数类型"
      :visible.sync="dialogFormVisible"
      width="40%"
      style="font-size: 18px"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" style="font-size: 18px">
        <el-form-item label="父级id:" label-width="150px" prop="pid">
          <el-input v-model="form.pid" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-form-item label="参数名称:" label-width="150px">
          <el-input v-model="form.dataname" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-form-item label="备注:" label-width="150px">
          <el-input v-model="form.dremarks" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogclean('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改分类-->
    <el-dialog
      title="修改参数类型"
      :visible.sync="dialogupdate"
      width="40%"
      style="font-size: 18px"
      :before-close="handleClose"
    >
      <el-form ref="formup" :model="formup" :rules="rulesup" style="font-size: 18px">
        <el-input v-model="formup.dataid" type="hidden" />
        <el-form-item label="父级id:" label-width="150px" prop="pid">
          <el-input v-model="formup.pid" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-form-item label="参数名称:" label-width="150px">
          <el-input v-model="formup.dataname" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-form-item label="备注:" label-width="150px">
          <el-input v-model="formup.dremarks" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateForm('formup')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  name: 'DataDictionary',
  data() {
    return {
      search: '',
      sectionValue: '',
      sectionName: [],
      tableData: [],
      nowPage: 1,
      pageSize: 5,
      totalCum: 0,
      dialogFormVisible: false,
      dialogupdate: false,
      form: {
        dataid: '',
        pid: '',
        dataname: '',
        dremarks: ''
      },
      formup: {
        dataid: '',
        pid: '',
        dataname: '',
        dremarks: ''
      },
      rules: {
        pid: [{ required: true, message: '请输入父级id', trigger: 'blur' }]
      },
      rulesup: {
        pid: [{ required: true, message: '请输入父级id', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    initTbl(this)
  },
  methods: {
    dialogupdatedata(index, row) {
      this.dialogupdate = true
      this.formup.dataid = row.dataid
      this.formup.dataname = row.dataname
      this.formup.pid = row.pid
      this.formup.dremarks = row.dremarks
    },
    updateForm(formup) {
      this.$refs[formup].validate((valid) => {
        if (valid) {
          this.$axios.post('/data/updateData', this.formup).then(res => {
            if (res.data.code === '1') {
              this.dialogupdate = false
              initTbl(this)
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              })
            }
          }).catch(err => {
            this.$message(err)
            this.$refs[formup].resetFields()// 清空
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$axios.post('/data/addData', this.form).then(res => {
            if (res.data.code === '1') {
              this.dialogFormVisible = false
              initTbl(this)
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              })
            }
          }).catch(err => {
            this.$message(err)
            this.$refs[form].resetFields()// 清空
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    dialogclean(form) {
      this.$refs[form].resetFields()
      this.dialogFormVisible = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.pageSize = val
      initTbl(this)
    },
    handleCurrentChange(val) {
      this.nowPage = val
      initTbl(this)
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
function initTbl(vue) {
  request.post('/data/dataList', {
    // 当前页
    nowPage: (vue.nowPage - 1) * vue.pageSize,
    pageSize: vue.pageSize,
    // 表格数据
    tableData: vue.dataList
  }).then(res => {
    vue.tableData = res.dataList
    vue.totalCum = res.totalCum
  })
}
</script>

<style scoped>

</style>
