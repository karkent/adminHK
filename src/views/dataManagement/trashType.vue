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
    <div style="float: left;margin-top: 10px;margin-left: 15px">
      <span>查询：</span><el-input v-model="search" size="small" style="width: 300px" placeholder="请输入科室名称、拼音码查找科室" />
      <el-button type="success" icon="el-icon-edit" round @click="dialogFormVisible = true">新增</el-button>
    </div>
    <!--表格-->
    <el-table
      border
      stripe
      :data="tableData.filter(data => !search || (data.tname +='').toLowerCase().includes(search.toLowerCase()) || (data.tcode +='').toLowerCase().includes(search.toLowerCase()))"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      style="width: 100%;min-height: 600px;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column sortable type="index" label="序号" width="75px" />
      <el-table-column type="selection" />
      <el-table-column sortable prop="tname" label="医废分类名称" width="200px" />
      <el-table-column sortable prop="tcode" label="医废分类编码" width="200px" />
      <el-table-column sortable prop="tbldata.dataname" label="医废分类状态" width="200px" />
      <el-table-column label="操作" width="">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit-outline" round @click="dialogupdateTrash(scope.index,scope.row)">修改</el-button>
          <el-button type="warning" icon="el-icon-close" round @click="ban(scope.index,scope.row)">禁用</el-button>
          <el-button type="danger" icon="el-icon-close" round>作废</el-button>
          <el-button type="primary" icon="el-icon-check" round @click="start(scope.index,scope.row)">启用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      :total="totalCum"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <!--新增分类隐藏框-->
    <el-dialog
      title="新增医废类型"
      :visible.sync="dialogFormVisible"
      width="40%"
      style="font-size: 18px"
      :before-close="handleClose"
    >
      <el-form ref="form" :rules="rules" :model="form" style="font-size: 18px">
        <el-form-item label="医废分类名称:" label-width="150px" prop="tname">
          <el-input v-model="form.tname" autocomplete="off" placeholder="请输入医废分类名称" style="width: 300px" />
        </el-form-item>
        <el-form-item label="医废分类编码:" label-width="150px">
          <el-input v-model="form.tcode" autocomplete="off" disabled placeholder="自动生成" style="width: 300px" />
        </el-form-item>
        <el-input v-model="form.tstate" type="hidden" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogclean('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改分类隐藏框-->
    <el-dialog
      title="新增医废类型"
      :visible.sync="dialogupdate"
      width="40%"
      style="font-size: 18px"
      :before-close="handleClose"
    >
      <el-form ref="formup" :rules="rulesup" :model="formup" style="font-size: 18px">
        <el-input v-model="formup.tid" type="hidden" />
        <el-form-item label="医废分类名称:" label-width="150px" prop="tname">
          <el-input v-model="formup.tname" autocomplete="off" placeholder="请输入医废分类名称" style="width: 300px" />
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
  name: 'TrashType',
  data() {
    return {
      search: '',
      trashValue: '',
      tableOne: {
        trashType: [{}]
      },
      tableData: [],
      nowPage: 1,
      pageSize: 5,
      totalCum: 0,
      dialogFormVisible: false,
      dialogVisible: false,
      dialogupdate: false,
      form: {
        tname: '',
        tcode: '',
        tstate: 2
      },
      formup: {
        tname: ''
      },
      rules: {
        tname: [{ required: true, message: '请输入医废类型', trigger: 'blur' }]
      },
      rulesup: {
        tname: [{ required: true, message: '请输入医废类型', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    initTbl(this)
  },
  methods: {
    start(index, row) {
      if (row.tbldata.dataname === '启用') {
        this.$message.warning('已经启用')
      } else {
        this.$confirm('是否启用?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success('启用成功!')
          request.get('/trash/updateState', {
            params: {
              tstate: row.tbldata.dataname,
              tid: row.tid
            }
          }).then(res => {
            initTbl(this)
          }).catch(err => {
            alert(err)
          })
        }).catch(() => {
          this.$message.info('已取消启用')
        })
      }
    },
    ban(index, row) {
      if (row.tbldata.dataname === '禁用') {
        this.$message.warning('已经禁用')
      } else {
        this.$confirm('是否禁用?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success('禁用成功!')
          request.get('/trash/updateState', {
            params: {
              tstate: row.tbldata.dataname,
              tid: row.tid
            }
          }).then(res => {
            initTbl(this)
          }).catch(err => {
            alert(err)
          })
        }).catch(() => {
          this.$message.info('已取消禁用')
        })
      }
    },
    dialogupdateTrash(index, row) {
      this.dialogupdate = true
      this.formup.tid = row.tid
      this.formup.tname = row.tname
    },
    updateForm(formup) {
      this.$refs[formup].validate((valid) => {
        if (valid) {
          this.$axios.post('/trash/updateTrash', this.formup).then(res => {
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
          this.$axios.post('/trash/addTrash', this.form).then(res => {
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
  request.post('/trash/seltstate', {
    // 当前页
    nowPage: (vue.nowPage - 1) * vue.pageSize,
    pageSize: vue.pageSize,
    // 表格数据
    tableData: vue.list
  }).then(res => {
    vue.tableData = res.list
    vue.totalCum = res.totalCum
  })
}
</script>

<style scoped>

</style>
