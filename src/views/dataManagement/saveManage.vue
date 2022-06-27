<template>
  <div>
    <div class="topDiv">
      <div class="topBtnDiv">
        <el-select v-model="saveStateValue" size="mini" placeholder="状态" style="width: 80px" @change="selectChange">
          <el-option
            v-for="item in options"
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
        <el-button type="primary" size="mini" @click="dialogFormVisible = true">新增暂存点</el-button>
      </div>
      <div class="btn_div">
        <el-button size="mini" type="success" @click="EnableSava">批量启用</el-button>
      </div>
      <div class="btn_div">
        <el-button size="mini" type="warning" @click="DisableSava">批量禁用</el-button>
      </div>
      <div class="btn_div">
        <el-button size="mini" type="danger" @click="deleteSava">批量作废</el-button>
      </div>
      <div class="btn_div">
        <el-button type="success" size="mini" @click="printsave">打印</el-button>
      </div>
    </div>
    <!--表格-->
    <div style="float:left;height: 100%;width: 100%;margin-top: 10px">
      <div style="height: 90%;width: 97%;margin: auto">
        <el-table
          border
          stripe
          :data="tableData"
          :height="tableHeight"
          :row-style="{height: '40px'}"
          :cell-style="{padding: '0'}"
          @select="handleSelect"
          @select-all="selectAll"
        >
          <el-table-column sortable type="index" label="序号" width="50" />
          <el-table-column type="selection" :selectable="checkSelectable" width="50" />
          <el-table-column sortable prop="savecode" label="暂存点编码" />
          <el-table-column sortable prop="savename" label="暂存点名字" />
          <el-table-column sortable prop="fullName" label="创建人" />
          <el-table-column sortable prop="insterdate" label="创建时间" :formatter="ToStr" />
          <el-table-column sortable prop="tbldata.dataname" label="状态" />
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <div v-if="scope.row.savestate !== 4">
                <el-button type="primary" icon="el-icon-edit-outline" size="mini" @click="dialogupdateSave(scope.index,scope.row)">修改</el-button>
              </div>
              <div v-else>
                <el-button size="mini" icon="el-icon-edit-outline" type="primary" disabled @click="dialogupdateSave(scope.index,scope.row)">修改</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block" style="text-align: center;margin-top: 5px">
        <el-pagination :current-page="nowPage" :page-sizes="[10, 20,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCum" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <!--新增分类隐藏框-->
    <el-dialog
      title="新增暂存点"
      :visible.sync="dialogFormVisible"
      width="40%"
      style="font-size: 18px"
      :before-close="handleClose"
    >
      <el-form ref="form" :rules="rules" :model="form" style="font-size: 18px">
        <el-form-item label="暂存点名称:" label-width="150px" prop="savename">
          <el-input v-model="form.savename" placeholder="请输入暂存点名称" style="width: 300px" />
        </el-form-item>
        <el-form-item label="暂存编码:" label-width="150px" prop="savecode">
          <el-input v-model="form.savecode" placeholder="请输入编号" style="width: 300px" />
        </el-form-item>
        <el-input v-model="form.savestate" type="hidden" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogclean('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改分类隐藏框-->
    <el-dialog
      title="修改暂存点"
      :visible.sync="dialogupdate"
      width="40%"
      style="font-size: 18px"
      :before-close="handleClose"
    >
      <el-form ref="formup" :rules="rulesup" :model="formup" style="font-size: 18px">
        <el-input v-model="formup.saveid" type="hidden" />
        <el-form-item label="暂存点名称:" label-width="150px" prop="savename">
          <el-input v-model="formup.savename" autocomplete="off" style="width: 300px" />
        </el-form-item>
        <el-form-item label="暂存点编码:" label-width="150px" prop="savecode">
          <el-input v-model="formup.savecode" autocomplete="off" style="width: 300px" />
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
import '../../styles/kLayout.css'
import { dateToStr } from '../../utils/kaihangTool'
import { getOption } from '../../api/qiniu'
import { getName } from '../../utils/auth'
import { getHospitalId } from '../../utils/auth'
export default {
  name: 'SaveManage',
  data() {
    var checkSaveName = (rule, value, callback) => {
      const mailReg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
      setTimeout(() => {
        if (mailReg.test(value)) {
          request.post('save/findsavenameExsit', {
            savename: this.form.savename
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
    var checkStrNum = (rule, value, callback) => {
      const mailReg = /^[A-Za-z0-9]+$/
      setTimeout(() => {
        if (mailReg.test(value) || value === '') {
          request.post('save/findsavecodeExsit', {
            savecode: this.form.savecode
          }).then(res => {
            if (res.sign === 1) {
              callback()
            } else {
              callback(new Error('您所输入的暂存点编号已被存在'))
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          callback(new Error('只允许输入字母和数字'))
        }
      })
    }
    return {
      selectArr: [],
      saveidArry: [],
      searchStr: '',
      tableData: [],
      nowPage: 1,
      pageSize: 16,
      totalCum: 0,
      dialogFormVisible: false,
      dialogupdate: false,
      form: {
        savename: '',
        savecode: '',
        savestate: ''
      },
      formup: {
        saveid: '',
        savecode: '',
        savename: ''
      },
      rules: {
        savename: [
          { required: true, message: '请输入暂存点名称', trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' },
          { validator: checkSaveName, trigger: 'blur' }
        ],
        savecode: [
          { required: true, message: '请输入暂存点编码', trigger: 'blur' },
          { validator: checkStrNum, trigger: 'blur' }
        ]
      },
      rulesup: {
        savename: [
          { required: true, message: '请输入暂存点名称', trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' }
        ],
        savecode: [
          { required: true, message: '请输入暂存点编码', trigger: 'blur' }
        ]
      },
      saveStateValue: '',
      tableHeight: window.innerHeight * 0.72, // 表格高度
      options: []
    }
  },
  mounted() {
    this.tableHeight = window.innerHeight * 0.72 // 表格高度
    initTbl(this)
    getOption({ dataid: '1' }).then(res => {
      this.options = res.dataList
    })
  },
  methods: {
    checkSelectable(row, index) {
      return row.tbldata.dataname !== '作废'
    },
    selectAll(selection) { // 第一个表格全选方法
      this.selectArr = selection
      pushSelection(this, selection)
    },
    handleSelect(selection, row) { // 表格多选方法
      this.selectArr = selection
      pushSelection(this, selection)
    },
    deleteSava() { // 作废状态
      if (this.saveidArry.length > 0) {
        this.$confirm('此操作将永久作废该参数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setstate(this, 4)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消作废'
          })
        })
      } else {
        this.$message({ message: '必须选择一个', type: 'warning' })
      }
    },
    EnableSava() { // 启用状态
      setstate(this, 2)
    },
    DisableSava() { // 禁用状态
      setstate(this, 3)
    },
    dialogupdateSave(index, row) {
      this.dialogupdate = true
      this.formup.saveid = row.saveid
      this.formup.savename = row.savename
      this.formup.savecode = row.savecode
    },
    updateForm(formup) { // 修改
      this.$refs[formup].validate((valid) => {
        if (valid) {
          request.post('/save/updateSave', this.formup).then(res => {
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
          console.log('error submit!!')
          return false
        }
      })
    },
    submitForm(form) { // 新增确定按钮
      this.form['hid'] = getHospitalId()
      this.form['fullName'] = getName()
      this.$refs[form].validate((valid) => {
        if (valid) {
          request.post('/save/addSave', this.form).then(res => {
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
          console.log('error submit!!')
          return false
        }
      })
    },
    dialogclean(form) {
      this.$refs[form].resetFields()
      this.dialogFormVisible = false
    },
    handleSizeChange(val) {
      this.pageSize = val
      initTbl(this)
    },
    handleCurrentChange(val) {
      this.nowPage = val
      initTbl(this)
    },
    selectChange(val) { // 状态的下拉框改变值的时候，重载表格
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
    searchSubmit() {
      this.nowPage = 1
      initTbl(this)
    },
    ToStr(row) {
      return dateToStr(row.insterdate)
    },
    printsave() { // 打印
      if (this.selectArr.length > 0) {
        var route = this.$router.resolve({
          name: 'SaveEr'
        })
        // 主要实现存储参数的功能
        const obj = JSON.stringify(this.selectArr)
        sessionStorage.setItem('selectArr', obj)
        window.open(route.href, '_blank')
      } else {
        this.$message({ message: '请先选择至少一个暂存点', type: 'warning' })
      }
    }
  }
}
function pushSelection(vue, selection) { // 上传选中的数据
  vue.saveidArry = []
  for (var i = 0; i < selection.length; i++) {
    if (selection[i].tbldata.dataname === '作废') {
      // vue.$message({
      //   message: '包含已作废的暂存点，该暂存点不会被改变',
      //   type: 'warning'
      // })
    } else {
      vue.saveidArry.push(selection[i].saveid)
    }
  }
}
function setstate(vue, savestate) { // 修改状态
  if (vue.saveidArry.length > 0) {
    request.post('/save/setSaveState', {
      saveidArry: vue.saveidArry,
      savestate: savestate
    }).then(res => {
      vue.$message({
        message: res.msg,
        type: 'success'
      })
      if (res.code === 1) {
        initTbl(vue)
      }
    })
  } else {
    vue.$message({ message: '必须选择一个', type: 'warning' })
  }
  vue.saveidArry = []
}
function initTbl(vue) {
  request.post('/save/selsavestate', {
    // 当前页
    nowPage: (vue.nowPage - 1) * vue.pageSize,
    pageSize: vue.pageSize,
    savestate: vue.saveStateValue,
    searchStr: vue.searchStr
  }).then(res => {
    vue.tableData = res.list
    vue.totalCum = res.totalCum
  })
}
</script>

<style scoped>

</style>
