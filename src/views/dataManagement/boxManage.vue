<template>
  <div>
    <div class="topDiv">
      <div class="topBtnDiv">
        <el-select v-model="boxStateValue" size="mini" placeholder="状态" value="0" clearable style="width: 90px" @change="selectChange">
          <el-option
            v-for="item in stateList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input v-model="searchStr" size="mini" placeholder="请输入关键字搜索" class="input-with-select" style="width: 200px;margin-left: 10px" /></div>
      <div style="float: left;margin-left: 5px;margin-top: 6px">
        <el-date-picker
          v-model="time"
          style="margin-left: 5px;height: 27px"
          size="small"
          value-format="timestamp"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
      <div style="float: left;margin-left: 20px;margin-top: 5px">
        <el-button slot="append" size="mini" type="primary" icon="el-icon-search" @click="searchSubmit">查询</el-button>
      </div>
      <div class="btn_div">
        <el-button type="primary" size="mini" @click="dialogFormVisible = true">新增</el-button>
      </div>
      <div class="btn_div">
        <el-button size="mini" type="danger" @click="deletebox">批量作废</el-button>
      </div>
      <div class="btn_div">
        <el-button type="success" size="mini" @click="printbox">打印</el-button>
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
          >
          <el-table-column sortable type="index" label="序号" width="50" />
          <el-table-column type="selection" :selectable="checkSelectable" width="50" />
          <el-table-column sortable prop="tbldata.dataname" label="状态" />
          <el-table-column sortable prop="boxcode" label="箱条码" />
          <el-table-column sortable prop="fullName" label="创建人" />
          <el-table-column sortable prop="insterdate" label="创建时间" :formatter="ToStr" />
          <el-table-column sortable prop="usedate" label="使用时间" />
        </el-table>
      </div>
      <div class="block" style="text-align: center;margin-top: 5px">
        <el-pagination
          :current-page="nowPage"
          :page-sizes="[10, 40,100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCum"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!--新增周转箱隐藏框-->
    <el-dialog
      title="新增周转箱"
      :visible.sync="dialogFormVisible"
      width="500px"
      style="font-size: 18px"
      :before-close="handleClose"
    >
      <el-form ref="form" :rules="rules" :model="form" style="font-size: 18px">
        <el-form-item label="箱条码个数:" label-width="150px" prop="num">
          <el-input-number v-model="form.num" controls-position="right" placeholder="箱条码个数一次不要超过1000" :min="1" :max="1000" style="width: 300px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogclean('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
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
  name: 'BoxManage',
  data() {
    var checkNum = (rule, value, callback) => {
      const mailReg = /^\d+$/
      setTimeout(() => {
        if (mailReg.test(value) || value === '') {
          callback()
        } else {
          callback(new Error('只允许输入数字'))
        }
      })
    }
    return {
      num: 1,
      time: '',
      boxStateValue: '',
      stateList: [],
      selectArr: [],
      boxidArry: [],
      searchStr: '',
      tableData: [],
      nowPage: 1,
      pageSize: 10,
      totalCum: 0,
      dialogFormVisible: false,
      tableHeight: window.innerHeight * 0.72, // 表格高度
      form: {
        num: ''
      },
      rules: {
        num: [
          { validator: checkNum, trigger: 'blur' },
          { required: true, message: '请输入数量,一次不要超过1000', trigger: 'blur' }]
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  mounted() {
    this.tableHeight = window.innerHeight * 0.72
    initTbl(this)
    getOption({ dataid: '23' }).then(res => {
      this.stateList = res.dataList
    })
  },
  methods: {
    checkSelectable(row, index) {
      return row.tbldata.dataname !== '已作废'
    },
    selectAll(selection) {
      this.selectArr = selection
      pushSelection(this, selection)
    },
    handleSelect(selection) {
      this.selectArr = selection
      pushSelection(this, selection)
    },
    submitForm(form) {
      this.form['hid'] = getHospitalId() // 添加医院id
      this.form['fullName'] = getName() // 根据业务修改
      this.$refs[form].validate((valid) => {
        if (valid) {
          request.post('/Tblbox/addbox', this.form).then(res => {
            if (res.sign === '1') {
              this.dialogFormVisible = false
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
      initTbl(this)
    },
    searchSubmit() {
      this.nowPage = 1
      initTbl(this)
    },
    ToStr(row) {
      return dateToStr(row.insterdate)
    },
    deletebox() { // 作废状态
      if (this.boxidArry.length > 0) {
        this.$confirm('此操作将永久作废该周转箱, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setstate(this, 44)
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
    printbox() { // 打印
      if (this.selectArr.length > 0) {
        var route = this.$router.resolve({
          name: 'BoxEr'
        })
        // 主要实现存储参数的功能
        const obj = JSON.stringify(this.selectArr)
        sessionStorage.setItem('selectArr', obj)
        window.open(route.href, '_blank')
        setstate(this, 25)
      } else {
        this.$message({ message: '请先选择至少一个暂周转箱', type: 'warning' })
      }
    }
  }
}
function date(value) { // 日期
  const date = new Date(value)
  const y = date.getFullYear()
  let MM = date.getMonth() + 1
  MM = MM < 10 ? ('0' + MM) : MM
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  let h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  let m = date.getMinutes()
  m = m < 10 ? ('0' + m) : m
  let s = date.getSeconds()
  s = s < 10 ? ('0' + s) : s
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
}
function pushSelection(vue, selection) { // 上传选中的数据
  vue.boxidArry = []
  for (var i = 0; i < selection.length; i++) {
    if (selection[i].tbldata.dataname === '已作废') {
      vue.$message({
        message: '包含已作废的周转箱，该周转箱不会被改变',
        type: 'warning'
      })
    } else {
      vue.boxidArry.push(selection[i].boxid)
    }
  }
}
function setstate(vue, bstate) { // 修改状态
  if (vue.boxidArry.length > 0) {
    request.post('/Tblbox/setBoxState', {
      boxidArry: vue.boxidArry,
      bstate: bstate
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
  vue.boxidArry = []
}
function initTbl(vue) { // 初始化
  if (vue.time === null) {
    vue.time = []
  }
  if (vue.time.length !== 0) {
    vue.time[0] = date(vue.time[0])
    vue.time[1] = date(vue.time[1])
  }
  request.post('/Tblbox/boxList', {
    nowPage: (vue.nowPage - 1) * vue.pageSize,
    pageSize: vue.pageSize,
    searchStr: vue.searchStr,
    bstate: vue.boxStateValue,
    insterdate: vue.time,
    startdate: vue.time[0],
    enddate: vue.time[1]
  }).then(res => {
    vue.tableData = res.list
    vue.totalCum = res.totalCum
  })
}
</script>

<style scoped>

</style>
