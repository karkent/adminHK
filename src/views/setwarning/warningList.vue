<template>
  <div>
    <div class="topDiv">
      <div class="topBtnDiv" style="width: 640px">
        <el-select v-model="ruleForm.selectName" placeholder="请选择医院名称" size="mini" style="float:left;width: 140px;margin-left: 5px">
          <el-option selected label="请选择" value="0" />
          <el-option
            v-for="item in hospitalName"
            :key="item.hid"
            :label="item.hname"
            :value="item.hid"
          />
        </el-select>
        <el-date-picker
          v-model="beginAndEndTime"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          style="float:left;width: 250px;margin-left: 5px"
        />
        <el-select v-model="ruleForm.selectWarningStatus" placeholder="预警发送环节" size="mini" style="float:left;width: 120px">
          <el-option selected label="请选择" value="" />
          <el-option label="入库" value="34" />
          <el-option label="出库" value="35" />
          <el-option label="其他" value="36" />
        </el-select>
        <el-select v-model="ruleForm.selectActionStatus" placeholder="请选择处理状态" size="mini" style="float:left;width: 120px">
          <el-option selected label="请选择" value="" />
          <el-option label="未处理" value="0" />
          <el-option label="已处理" value="1" />
        </el-select>
      </div>
      <div class="btn_div">
        <el-button type="primary" size="mini" @click="queryInfo">查 询</el-button>
      </div>
    </div>
    <!--    :span-method=""-->
    <div style="float:left;height: 100%;width: 100%;margin-top: 10px">
      <div style="height: 90%;width: 97%;margin: auto">
        <el-table
          border
          stripe
          :data="tableData"
          :height="tableHeight"
          :row-style="{height: '40px'}"
          :cell-style="{padding: '0'}"
          @select="selectCheckbox"
          @select-all="selectableAll"
        >
          <el-table-column
            type="selection"
            width="50"
            align="left"
            :selectable="selectable"
          />
          <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center"
          />
          <!-- <el-table-column sortable width="80" label="状态" prop="handlestate" />:formatter="formatState" -->
          <el-table-column sortable width="110" label="预警原因" prop="wcase" />
          <el-table-column sortable width="170" label="预警时间" prop="wtime" />
          <el-table-column sortable width="140" label="处理人" prop="aname" />
          <el-table-column sortable width="110" label="处理意见" prop="handleidea" />
          <el-table-column sortable width="110" label="处理状态" prop="handlestate">
            <template slot-scope="scope">
              <div v-if="scope.row.handlestate == 0">
                <lable>未处理</lable>
              </div>
              <div v-else>
                <lable>已处理</lable>
              </div>
            </template>
          </el-table-column>
          <el-table-column sortable width="170" label="处理时间" prop="handletime" />
          <el-table-column sortable label="所属院区" prop="hname" />
          <el-table-column align="center" prop="placeNum" label="操作" width="120">
            <template slot-scope="scope">
              <div v-if="scope.row.handlestate == 0">
                <el-button size="mini" type="primary" @click="update(scope.$index, scope.row)">处理</el-button>
                <el-dialog
                  title="预警处理"
                  :visible.sync="dialogFormVisible2"
                  width="300px"
                  :before-close="handleClose"
                >
                  <div style="width: 100%;height: 200px;margin-top: -20px;margin-left: 2%">
                    <el-form ref="form2" class="el-form-1" :model="form2" :rules="rules2" size="mini">
                      <!-- <div class="infoDiv1"> -->
                      <!-- <div class="text-div">
                        预警处理
                      </div> -->
                      <el-input v-model="form2.noteid" type="hidden" style="width: 1px" />
                      <div style="margin-top: 10px">
                        <el-form-item label="处理意见" prop="handleidea">
                          <el-input v-model="form2.handleidea" autocomplete="off" style="float: left" />
                        </el-form-item>
                      </div>
                      <div style="float: right;margin-top: 30px;margin-right: 15px">
                        <el-button @click="close('form2')">取 消</el-button>
                        <el-button type="primary" @click="submit2('form2')">保 存</el-button>
                      </div>
                      <!-- </div> -->
                    </el-form>
                  </div>
                </el-dialog>
              </div>
              <div v-else>
                <el-button size="mini" type="primary" disabled @click="update(scope.$index, scope.row)">处理</el-button>
              </div>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div class="block" style="text-align: center;margin-top: 5px">
        <el-pagination :current-page="nowPage" :page-sizes="[10, 20,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCum" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import '@/styles/kLayout.css'
import { getAccId, getRoleType } from '@/utils/auth'
export default {
  name: 'StockIn',
  data() {
    return {
      form2: {
        handleidea: '',
        noteid: 0,
        wcase: ''
      },
      rules2: {
        handleidea: [
          { required: true, message: '请输入处理意见 ', trigger: 'blur' }
        ]
      },
      dialogFormVisible2: false,
      // 表格数据
      tableData: [],
      // 医院名字下拉框
      hospitalName: [],
      ruleForm: {
        // 选择的医院名称
        selectName: '',
        // 选择处理状态
        selectActionStatus: '',
        // 选择预警环节
        selectWarningStatus: ''
      },
      // 表格高度
      tableHeight: window.innerHeight * 0.72 + 'px',
      // 当前页数
      nowPage: 1,
      // 当前页显示数量
      pageSize: 10,
      // 当前总页数
      totalCum: 10,
      // 开始结束时间
      beginAndEndTime: '',
      // 开始时间
      beginTime: '',
      // 结束时间
      endTime: '',
      value: '',
      // 被选中的集合
      selectCheckboxs: [],
      multipleSelection: [],
      // 存放所有医废信息 (无分页)
      tableDataAll: []
    }
  },
  mounted() {
    this.tableHeight = window.innerHeight * 0.72 + 'px' // 表格动态高度，根据屏幕分辨率
    getStockInInfo(this)
    getHospitalName(this)
  },
  methods: {
    // 根据状态值修改状态内容
    formatState: function(row, column) {
      return row.state === 1 ? '已入库' : '未入库'
    },
    // 查询按钮
    queryInfo() {
      if (this.beginAndEndTime !== null) {
        this.beginTime = this.beginAndEndTime[0]
        this.endTime = this.beginAndEndTime[1]
      } else {
        this.beginTime = ''
        this.endTime = ''
      }

      this.nowPage = 1
      getStockInInfo(this)
    },
    // 批量勾选出库
    batchOutLibrary() {
      if (this.selectCheckboxs.length !== 0) {
        request.post('/StockIn/batchOutLibrary', {
          stickInArray: this.selectCheckboxs,
          adminid: getAccId(),
          RoleType: getRoleType()
        }).then(res => {
          if (res.code === 1) {
            this.$message({
              message: res.msg,
              center: true,
              type: 'success'
            })
            this.nowPage = 1
            getStockInInfo(this)
          }
        })
      } else {
        this.$message.error({
          message: '您还没有选择任何数据',
          center: true
        })
      }
    },
    // 批量全部出库
    batchOutLibraryAll() {
      this.$confirm('请确认是否全部出库', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.post('/StockIn/batchOutLibraryAll', {
          adminid: getAccId(),
          RoleType: getRoleType()
        }).then(res => {
          if (res.code === 1) {
            this.$message({
              message: res.msg,
              center: true,
              type: 'success'
            })
            this.nowPage = 1
            getStockInInfo(this)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消出库'
        })
      })
    },
    // 禁用已入库的选项
    selectable(row, index) {
      if (row.dataname === '已出库') {
        return false
      } else {
        return true
      }
    },
    // 选中复选框时触发
    selectCheckbox(selection, row) {
      if (row.state === 1) {
        this.$message.error({
          message: '已出库完毕,请勿重复出库',
          center: true
        })
      } else {
        this.selectCheckboxs = []
        for (let i = 0; i < selection.length; i++) {
          this.selectCheckboxs.push(selection[i])
        }
      }
    },
    // 全选时触发
    selectableAll(selection) {
      this.selectCheckboxs = []
      for (let i = 0; i < selection.length; i++) {
        this.selectCheckboxs.push(selection[i])
      }
    },
    // 分页条数
    handleSizeChange(val) {
      this.pageSize = val
      getStockInInfo(this)
    },
    // 分页 上一页下一页
    handleCurrentChange(val) {
      this.nowPage = val
      getStockInInfo(this)
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 关闭按钮
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          // this.form2 = []
          done()
        })
        .catch(_ => {})
    },
    // 修改按钮
    update(index, row) {
      this.dialogFormVisible2 = true
      this.form2.handleidea = row.handleidea
      this.form2.noteid = row.noteid
      this.form2.wcase = row.wcase
      console.log(this.form2.handleidea + '@' + this.form2.noteid + '@@' + this.form2.wcase)
    },
    close(formname) {
      this.dialogFormVisible2 = false
    },
    submit2(form2) {
      this.$refs[form2].validate((valid) => {
        if (valid) {
          this.form2.handletime = new Date().toLocaleString()
          this.form2.handleman = 12
          request.post('/dashboard/updateHandle', this.form2).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            getStockInInfo(this)
            this.dialogFormVisible2 = false
          })
        } else {
          this.$message({
            message: '信息尚未填写完整',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}

// 获取表格中的数据
function getStockInInfo($this) {
  request.post('/dashboard/listWarning', {
    hname: $this.ruleForm.selectName,
    handlestate: $this.ruleForm.selectActionStatus,
    warninglink: $this.ruleForm.selectWarningStatus,
    beginTime: $this.beginTime,
    endTime: $this.endTime,
    nowPage: ($this.nowPage - 1) * $this.pageSize,
    pageSize: $this.pageSize
  }).then(res => {
    $this.tableData = res.WarningList
    $this.totalCum = res.count
  })
}
// 获取医院名称
function getHospitalName($this) {
  request.post('/StockIn/getHospitalName').then(res => {
    $this.hospitalName = res.hospitalList
  })
}
</script>

<style scoped>
  .infoDiv1{
    float: left;
    width: 100%;
    border: 1px solid #808080;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
</style>
