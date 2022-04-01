<template>
  <div>
    <div class="topDiv">
      <div class="topBtnDiv">
        <el-select v-model="StateValue" size="mini" placeholder="状态" style="width: 80px" @change="selectChange">
          <el-option
            v-for="item in trashTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input v-model="searchStr" size="mini" placeholder="请输入关键字搜索" class="input-with-select" style="width: 200px;margin-left: 5px">
          <el-button slot="append" icon="el-icon-search" @click="searchSubmit" />
        </el-input>
      </div>
      <div class="btn_div">
        <el-button type="primary" size="mini" @click="dialogFormVisible = true">新增类型</el-button>
      </div>
      <div class="btn_div">
        <el-button type="success" size="mini" @click="startTrash">批量启用</el-button>
      </div>
      <div class="btn_div">
        <el-button type="warning" size="mini" @click="stopTrash">批量禁用</el-button>
      </div>
      <div class="btn_div">
        <el-button type="danger" size="mini" @click="delectTrash">批量作废</el-button>
      </div>
    </div>
    <div style="float:left;height: 100%;width: 100%;margin-top: 10px">
      <div style="height: 90%;width: 97%;margin: auto">
        <el-table
          border
          stripe
          :data="tableData"
          style="width: 100%;height: 450px"
          :row-style="{height: '40px'}"
          :cell-style="{padding: '0'}"
          @selection-change="handleSelectionChange"
          @select="handleSelect"
          @select-all="selectAll"
        >
          <el-table-column sortable type="index" label="序号" width="50" />
          <el-table-column type="selection" :selectable="checkSelectable" width="50" />
          <el-table-column sortable prop="tname" label="医废分类名称" />
          <!--      <el-table-column sortable prop="tcode" label="医废分类编码"/>-->
          <el-table-column sortable prop="tbldata.dataname" label="医废分类状态" />
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <div v-if="scope.row.tstate !== 3">
                <el-button type="primary" icon="el-icon-edit-outline" size="mini" @click="dialogupdateTrash(scope.index,scope.row)">修改</el-button>
              </div>
              <div v-else>
                <el-button size="mini" icon="el-icon-edit-outline" type="primary" disabled @click="dialogupdateTrash(scope.index,scope.row)">修改</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block" style="text-align: center;margin-top: 5px">
        <el-pagination
          :current-page="nowPage"
          :page-sizes="[10, 20,100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCum"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!--新增分类隐藏框-->
      <el-dialog
        width="500px"
        style="font-size: 18px"
        title="新增医废类型"
        :visible.sync="dialogFormVisible"
      >
        <el-input v-model="form.tstate" type="hidden" width="1px" />
        <el-form ref="form" :rules="rules" :model="form" style="font-size: 18px">
          <el-form-item label="医废分类名称:" label-width="150px" prop="tname">
            <el-input v-model="form.tname" autocomplete="off" placeholder="请输入医废分类名称" style="width: 250px" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogclean('form')">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>
      <!--修改分类隐藏框-->
      <el-dialog
        title="修改医废类型"
        :visible.sync="dialogupdate"
        width="500px"
        style="font-size: 18px"
        :before-close="handleClose"
      >
        <el-input v-model="formup.tid" type="hidden" width="1px" />
        <el-form ref="formup" :rules="rulesup" :model="formup" style="font-size: 18px">
          <el-form-item label="医废分类名称:" label-width="150px" prop="tname">
            <el-input v-model="formup.tname" autocomplete="off" placeholder="请输入医废分类名称" style="width: 250px" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updateForm('formup')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
import { getOption } from '../../api/qiniu'
import '../../styles/kLayout.css'
export default {
  name: 'TrashType',
  data() {
    var checktName = (rule, value, callback) => {
      const mailReg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
      setTimeout(() => {
        if (mailReg.test(value)) {
          request.post('trash/findtnameExsit', {
            tname: this.form.tname
          }).then(res => {
            if (res.sign === 1) {
              callback()
            } else {
              callback(new Error('您所输入的暂存点名称已被存在'))
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          callback(new Error('请输入正确的科室名称，不能有非法字符'))
        }
      })
    }
    return {
      selectArr: [],
      trashidArry: [],
      tableData: [],
      searchStr: '',
      nowPage: 1,
      pageSize: 10,
      totalCum: 0,
      dialogFormVisible: false,
      dialogVisible: false,
      dialogupdate: false,
      form: {
        tname: '',
        tcode: '',
        tstate: ''
      },
      formup: {
        tname: ''
      },
      rules: {
        tname: [{ required: true, message: '请输入医废类型', trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' },
          { validator: checktName, trigger: 'blur' }
        ]
      },
      rulesup: {
        tname: [{ required: true, message: '请输入医废类型', trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' }]
      },
      trashTypeOptions: [],
      StateValue: '',
      tableHeight: window.innerHeight * 0.72 // 表格高度
    }
  },
  mounted() {
    this.tableHeight = window.innerHeight * 0.72 // 表格高度
    initTbl(this)
    getOption({ dataid: '1' }).then(res => {
      this.trashTypeOptions = res.dataList
    })
  },
  methods: {
    checkSelectable(row, index) {
      return row.tstate !== 3
    },
    selectAll(selection) { // 第一个表格全选方法
      this.selectArr = selection
      pushSelection(this, selection)
    },
    handleSelect(selection, row) { // 表格多选方法
      this.selectArr = selection
      pushSelection(this, selection)
    },
    delectTrash() {
      if (this.trashidArry.length > 0) {
        this.$confirm('此操作将永久废除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.setstate(4)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({ message: '必须选择一个', type: 'warning' })
      }
    },
    startTrash() {
      this.setstate(2)
    },
    stopTrash() {
      this.setstate(3)
    },
    dialogupdateTrash(index, row) {
      this.dialogupdate = true
      this.formup.tid = row.tid
      this.formup.tname = row.tname
    },
    updateForm(formup) {
      this.$refs[formup].validate((valid) => {
        if (valid) {
          request.post('/trash/updateTrash', this.formup).then(res => {
            if (res.sign === '1') {
              this.dialogupdate = false
              initTbl(this)
              this.$message({
                message: res.msg,
                type: 'success'
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          }).catch(err => {
            this.$message(err)
            this.$refs[formup].resetFields()// 清空
          })
        } else {
          return false
        }
      })
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          request.post('/trash/addTrash', this.form).then(res => {
            if (res.sign === '1') {
              this.dialogFormVisible = false
              this.$refs[form].resetFields()
              initTbl(this)
              this.$message({
                message: res.msg,
                type: 'success'
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          }).catch(err => {
            this.$message(err)
            this.$refs[form].resetFields()// 清空
          })
        } else {
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
          this.form = {}
          done()
        })
        .catch(_ => {})
    },
    selectChange(val) { // 状态的下拉框改变值的时候，重载表格
      this.nowPage = 1
      initTbl(this)
    },
    searchSubmit() {
      this.nowPage = 1
      initTbl(this)
    },
    setstate(tstate) {
      if (this.trashidArry.length > 0) {
        request.post('/trash/setTrashstate', {
          trashidArry: this.trashidArry,
          tstate: tstate
        }).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          if (res.code === 1) {
            initTbl(this)
          }
        })
      } else {
        this.$message({ message: '必须选择一个', type: 'warning' })
      }
      this.trashidArry = []
    }
  }
}
function pushSelection(vue, selection) {
  vue.trashidArry = []
  for (var i = 0; i < selection.length; i++) {
    if (selection[i].tbldata.dataname === '作废') {
      vue.$message({
        message: '包含已作废的类型，该类型不会被改变',
        type: 'warning'
      })
    } else {
      vue.trashidArry.push(selection[i].tid)
    }
  }
}

function initTbl(vue) {
  request.post('/trash/trashList', {
    // 当前页
    nowPage: (vue.nowPage - 1) * vue.pageSize,
    pageSize: vue.pageSize,
    tstate: vue.StateValue,
    searchStr: vue.searchStr
  }).then(res => {
    vue.tableData = res.list
    vue.totalCum = res.totalCum
  })
}
</script>

<style scoped>

</style>
