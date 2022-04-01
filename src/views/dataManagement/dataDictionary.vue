<template>
  <div>
    <div class="topDiv">
      <div class="topBtnDiv">
        <el-select v-model="StateValue" size="mini" placeholder="状态" style="width: 80px" @change="selectChange">
          <el-option
            v-for="item in dataDictionaryStateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!--        &lt;!&ndash;<el-input-->
        <!--          v-model="searchStr"-->
        <!--          size="mini"-->
        <!--          placeholder="请输入关键字搜索"-->
        <!--          class="input-with-select"-->
        <!--          style="width: 200px;margin-left: 5px">-->
        <!--          <el-button slot="append" icon="el-icon-search" @click="searchSubmit"></el-button>-->
        <!--        </el-input>&ndash;&gt;-->
      </div>
      <div class="btn_div">
        <el-button type="primary" size="mini" @click="adddata">新增参数</el-button>
      </div>
      <div class="btn_div">
        <el-button type="danger" size="mini" @click="delectData">批量作废</el-button>
      </div>
    </div>
    <div style="float:left;height: 100%;width: 100%;margin-top: 10px">
      <div style="height: 90%;width: 97%;margin: auto">
        <el-table
          border
          stripe
          :data="tableData"
          :height="tableHeight"
          :row-style="{height: '40px'}"
          :cell-style="{padding: '0'}"
          row-key="dataid"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          @select="handleSelect"
          @select-all="selectAll"
        >
          <el-table-column sortable type="index" label="序号" width="50" />
          <el-table-column type="selection" :selectable="checkSelectable" width="50" />
          <el-table-column sortable prop="dataname" label="参数名称" />
          <!--          <el-table-column sortable prop="pname" label="上级名称" />-->
          <el-table-column sortable prop="label" label="参数状态" />
          <el-table-column sortable prop="dremarks" label="备注" />
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <div v-if="scope.row.dstate !== 4">
                <el-button type="primary" icon="el-icon-edit-outline" size="mini" @click="dialogupdatedata(scope.index,scope.row)">修改</el-button>
              </div>
              <div v-else>
                <el-button size="mini" icon="el-icon-edit-outline" type="primary" disabled @click="dialogupdatedata(scope.index,scope.row)">修改</el-button>
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
    </div>
    <!--增加参数类型-->
    <el-dialog
      title="新增参数类型"
      :visible.sync="dialogFormVisible"
      width="40%"
      style="font-size: 18px"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" style="font-size: 18px">
        <el-form-item label="上级名称:" prop="value" style="margin-left: 78px">
          <el-select v-model="form.dataOptionValue" placeholder="请选择" value="0" clearable>
            <el-option
              v-for="item in pnames"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参数名称:" label-width="150px" prop="dataname">
          <el-input v-model="form.dataname" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-form-item label="备注:" label-width="150px" prop="dremarks">
          <el-input v-model="form.dremarks" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-input v-model="form.dstate" type="hidden" />
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
        <el-form-item label="参数名称:" label-width="150px" prop="dataname">
          <el-input v-model="formup.dataname" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-form-item label="备注:" label-width="150px" prop="dremarks">
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
import '../../styles/kLayout.css'
import { getOption } from '../../api/qiniu'

export default {
  name: 'DataDictionary',
  data() {
    return {
      selectArr: [],
      dataidArry: [],
      pnames: [],
      searchStr: '',
      sectionValue: '',
      sectionName: [],
      tableData: [],
      nowPage: 1,
      pageSize: 10,
      totalCum: 0,
      dialogFormVisible: false,
      dialogupdate: false,
      form: {
        dataid: '',
        dataname: '',
        dremarks: '',
        dstate: '',
        dataOptionValue: '' // 新增参数的value值
      },
      formup: {
        pname: '',
        dataid: '',
        pid: '',
        dataname: '',
        dremarks: ''
      },
      rules: {
        dataname: [{ required: true, message: '请输入参数名称', trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' }
        ],
        dremarks: [{ max: 50, message: '输入的内容过长', trigger: 'blur' }]
      },
      rulesup: {
        dataname: [{ required: true, message: '请输入参数名称', trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' }
        ],
        dremarks: [{ max: 50, message: '输入的内容过长', trigger: 'blur' }]
      },
      StateValue: '',
      dataDictionaryStateOptions: [],
      tableHeight: window.innerHeight * 0.72 // 表格高度
    }
  },
  mounted() {
    datatree(this)
    this.tableHeight = window.innerHeight * 0.72 // 表格动态高度，根据屏幕分辨率
    // initTbl(this)
    getOption({ dataid: '1' }).then(res => {
      this.dataDictionaryStateOptions = res.dataList
    })
  },
  methods: {
    checkSelectable(row, index) {
      return row.dstate !== 4
    },
    selectAll(selection) { // 第一个表格全选方法
      this.selectArr = selection
      pushSelection(this, selection)
    },
    handleSelect(selection, row) { // 表格多选方法
      this.selectArr = selection
      pushSelection(this, selection)
    },
    delectData() {
      if (this.dataidArry.length > 0) {
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
    adddata() {
      this.pnames.length = 0
      this.dialogFormVisible = true
      request.post('/data/selpnames', {}).then(res => {
        var pnameList = res.list // 这个数组是从后台获得的
        pnameList.forEach(item => {
          const pname = {
            value: item.dataid,
            label: item.dataname,
            pid: item.pid
          }
          this.pnames.push(pname)
        })
      })
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          request.post('/data/addData', this.form).then(res => {
            if (res.sign === '1') {
              this.dialogFormVisible = false
              this.$refs[form].resetFields()
              datatree(this)
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
          request.post('/data/updateData', this.formup).then(res => {
            if (res.sign === '1') {
              this.dialogupdate = false
              datatree(this)
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
    dialogclean(form) {
      this.$refs[form].resetFields()
      this.dialogFormVisible = false
    },
    handleSizeChange(val) {
      this.pageSize = val
      datatree(this)
    },
    handleCurrentChange(val) {
      this.nowPage = val
      datatree(this)
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
      datatree(this)
    },
    searchSubmit() {
      this.nowPage = 1
      datatree(this)
    }
  }
}
function pushSelection(vue, selection) {
  vue.dataidArry = []
  for (var i = 0; i < selection.length; i++) {
    if (selection[i].dname === '作废') {
      vue.$message({
        message: '包含已作废的参数，该参数不会被改变',
        type: 'warning'
      })
    } else {
      vue.dataidArry.push(selection[i].dataid)
    }
  }
}
function setstate(vue, dstate) {
  if (vue.dataidArry.length > 0) {
    request.post('/data/setDataState', {
      dataidArry: vue.dataidArry,
      dstate: dstate
    }).then(res => {
      vue.$message({
        message: res.msg,
        type: 'success'
      })
      if (res.code === 1) {
        datatree(vue)
      }
    })
  } else {
    vue.$message({ message: '必须选择一个', type: 'warning' })
  }
  vue.dataidArry = []
}
function datatree(vue) {
  request.post('/data/selectAllData', {
    // 当前页
    nowPage: (vue.nowPage - 1) * vue.pageSize,
    pageSize: vue.pageSize * vue.nowPage,
    searchStr: vue.searchStr,
    StateValue: vue.StateValue
  }).then(res => {
    vue.tableData = res.dataList
    vue.totalCum = res.totalCum
  })
}
</script>

<style scoped>

</style>
