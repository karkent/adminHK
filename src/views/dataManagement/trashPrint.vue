<template>
  <el-container>
    <div>
      <div style="float:left;width:60%">
        <div class="topDiv">
          <div class="topBtnDiv">
            <el-input
              v-model="searchStr"
              size="mini"
              placeholder="请输入关键字搜索"
              class="input-with-select"
              style="width: 300px;margin-left: 5px"
            >
              <el-button slot="append" icon="el-icon-search" @click="searchSubmit" />
            </el-input>
          </div>
          <div class="btn_div">
            <el-button type="primary" size="mini" @click="add">添加选中</el-button>
          </div>
        </div>
        <div style="float:left;height: 100%;width: 100%;margin-top: 10px">
          <div style="height: 90%;width: 97%;margin: auto">
            <el-table
              ref="multipleTable"
              border
              stripe
              :data="tableData"
              :height="tableHeight"
              :row-style="{height: '40px'}"
              :cell-style="{padding: '0'}"
              @select="handleSelect"
              @select-all="selectAll"
            >
              <el-table-column type="index" label="序号" width="50px" />
              <el-table-column type="selection" width="50px" />
              <el-table-column prop="dname" label="科室名称" />
              <el-table-column prop="dcode" label="科室编码" />
              <el-table-column align="center" label="打印科室分类码">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handletype(scope.index,scope.row)">打印科室分类码</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" label="打印科室码" width="160">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="printdep(scope.index,scope.row)">打印科室码</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block" style="text-align: center;margin-top: 5px">
            <el-pagination
              :current-page="nowPage"
              :page-sizes="[5, 10, 20, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCum"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
      <div style="width:30%;float: left;margin-left: 50px">
        <div class="topDiv">
          <div class="btn_div">
            <el-button type="primary" size="mini" @click="cleantable">清空表格</el-button>
          </div>
          <div class="btn_div">
            <el-button type="success" size="mini" @click="printdall">批量打印</el-button>
          </div>
        </div>
        <div style="float:left;height: 100%;width: 100%;margin-top: 10px">
          <el-table
            border
            stripe
            :data="multipleSelection"
            style="width: 100%"
            :height="tableHeight"
            :row-style="{height: '40px'}"
            :cell-style="{padding: '0'}"
          >
            <el-table-column header-align="center" align="center" type="index" label="序号" width="50px" />
            <el-table-column label="操作" width="">
              <template slot-scope="scope">
                <el-button size="mini" @click="delRow(scope.index,scope.row)">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="dname" label="科室名称" />
            <el-table-column prop="dcode" label="科室编码" />
          </el-table>
        </div>
      </div>
      <!--打印科室分类码-->
      <el-dialog
        title="选择需打印的分类条码"
        :visible.sync="dialogVisible"
        width="30%"
        center
      >
        <div>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
            <el-input v-model="ruleForm.dname" type="hidden" />
            <el-input v-model="ruleForm.dcode" type="hidden" />
            <span>打印类型：</span>
            <el-form-item prop="tname">
              <el-checkbox-group v-model="ruleForm.nochange" format="changeStyle" @change="handleChange">
                <el-checkbox
                  v-for="item in tableData2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  {{ item.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogclean('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="depTypePrint('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-container>
</template>

<script>
import request from '../../utils/request'
import '../../styles/kLayout.css'
export default {
  name: 'TrashPrint',
  data() {
    return {
      printArr: [],
      searchStr: '',
      selectArr: [],
      multipleSelection: [],
      dialogVisible: false,
      search: '',
      tableData: [{}],
      tableData2: [],
      checkedData: [], // 选择多选框时的选中值
      nowPage: 1,
      pageSize: 10,
      totalCum: 0,
      ruleForm: {
        dname: '',
        dcode: '',
        nochange: []
      },
      rules: {},
      tableHeight: window.innerHeight * 0.72 // 表格高度
    }
  },
  mounted() {
    initTbl(this)
    this.tableHeight = window.innerHeight * 0.72
    // getonchange(this)
  },
  methods: {
    cleantable() { // 清空表格
      this.multipleSelection = []
    },
    searchSubmit() {
      this.nowPage = 1
      initTbl(this)
    },
    delRow(index, rows) { // 删除该行
      const array = []
      for (var i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].did !== rows.did) {
          array.push(this.multipleSelection[i])
        }
      }
      this.multipleSelection = array
    },
    dialogclean(ruleForm) {
      this.$refs[ruleForm].resetFields()
      this.dialogVisible = false
    },
    handletype(index, row) {
      console.log(row.did + '@#@#@#@')
      this.tableData2.length = 0
      this.dialogVisible = true
      request.post('/trash/typeList', {}).then(res => {
        var typelist = res.trashTypeList
        typelist.forEach(item => {
          const tname = {
            value: item.tid,
            label: item.tname
          }
          this.tableData2.push(tname)
        })
      })
      this.ruleForm.dname = row.dname
      this.ruleForm.dcode = row.did
    },
    handleChange(val) {

    },
    add() { // 添加选中的按钮方法
      const res = new Map()
      if (this.selectArr.length > 0) {
        for (var i = 0; i < this.selectArr.length; i++) {
          this.multipleSelection.push(this.selectArr[i])
        }
      } else {
        this.$message({ message: '必须选择一个', type: 'warning' })
      }
      this.multipleSelection = this.multipleSelection.filter((a) => !res.has(a.dname) && res.set(a.dname, 1))
      this.selectArr = [] // 清空
      this.$refs.multipleTable.clearSelection() // 清空复选框的选中
    },
    handleSelect(selection, row) { // 表格选中的方法
      const selected = selection.length && selection.indexOf(row) !== -1
      if (selected) {
        this.selectArr.push(row)
      }
    },
    selectAll(selection) { // 表格全选的方法
      this.selectArr = []

      for (var i = 0; i < selection.length; i++) {
        this.selectArr.push(selection[i])
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      initTbl(this)
    },
    handleCurrentChange(val) {
      this.nowPage = val
      initTbl(this)
    },
    depTypePrint(ruleForm) { // 根据医废类型打印
      console.log(ruleForm)
      this.dialogVisible = false
      var route = this.$router.resolve({
        name: 'DepTypePrintEr'
      })
      // 主要实现存储参数的功能
      var array = []
      var i = 1
      this.ruleForm.nochange.forEach(item => {
        const a = {
          tname: item,
          tid: i,
          dname: this.ruleForm.dname,
          dcode: this.ruleForm.dcode
        }
        i++
        array.push(a)
      })

      this.ruleForm['nochange'] = array
      const obj = JSON.stringify(this.ruleForm)
      sessionStorage.setItem('ruleForm', obj)

      window.open(route.href, '_blank')
      this.ruleForm.nochange = []
    },
    printdep(index, row) { // 生成当前行二维码打印
      this.printArr = []
      this.printArr.push(row)

      // 主要实现打开新窗口的功能
      var route = this.$router.resolve({
        name: 'DepPrintEr'
      })
      // 主要实现存储参数的功能
      const obj = JSON.stringify(this.printArr)
      sessionStorage.setItem('printArr', obj)
      window.open(route.href, '_blank')
    },
    printdall() { // 批量生成二维码打印
      // 主要实现打开新窗口的功能
      if (this.multipleSelection.length > 0) {
        var route = this.$router.resolve({
          name: 'DepPrintAllEr'
        })
        // 主要实现存储参数的功能
        const obj = JSON.stringify(this.multipleSelection)
        sessionStorage.setItem('multipleSelection', obj)

        window.open(route.href, '_blank')
        this.multipleSelection = []
      } else {
        this.$message({ message: '没有需要打印的科室', type: 'warning' })
      }
    }
  }
}
function initTbl(vue) {
  request.post('/department/getdepartmentState', {
    // 当前页
    nowPage: (vue.nowPage - 1) * vue.pageSize,
    pageSize: vue.pageSize,
    // 科室状态
    searchStr: vue.searchStr
  }).then(res => {
    vue.tableData = res.TbldepartrmentList
    vue.totalCum = res.totalCum
  })
}
// function getonchange(vue) {
//   request.post('/trash/typeList', {}).then(res => {
//     var typelist = res.list
//     console.log(typelist)
//     typelist.forEach(item => {
//       const tname = {
//         value: item.tid,
//         label: item.tname
//       }
//       vue.tableData2.push(tname)
//     })
//     console.log('打印复选框集合', vue.tableData2)
//   })
// }
</script>

<style scoped>

</style>
