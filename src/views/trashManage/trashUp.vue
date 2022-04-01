<template>
  <div>
    <div class="topDiv">
      <div class="topBtnDiv" style="width: 100%;margin-top: 0px">
        <el-select v-model="hopValue" filterable clearable placeholder="请选择医院" size="mini" class="select_top" @change="hosselect">
          <el-option selected label="全部" value="0" />
          <el-option
            v-for="item in hospitalList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
        <el-select v-model="trashValue" clearable placeholder="请选择废物分类" size="mini" class="select_top">
          <el-option
            v-for="item in trashTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
        <el-select v-model="trash" clearable placeholder="请选择状态" size="mini" class="select_top">
          <el-option
            v-for="item in trashStateList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
        <el-select v-model="sectionValue" filterable clearable placeholder="请选择科室名称" size="mini" class="select_top">
          <el-option
            v-for="item in departmentList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
        <el-select v-model="collectorsValue" filterable clearable placeholder="请选择收集人" size="mini" class="select_top">
          <el-option
            v-for="item in collectList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
        <el-select v-model="infraction" clearable placeholder="请选择是否违规交接" size="mini" class="select_top">
          <el-option label="是" value="1" />
          <el-option label="否" value="0" />
        </el-select>
        <el-select v-model="value" clearable placeholder="请选择是否涉疫垃圾" size="mini" class="select_top">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
        <el-date-picker
          v-model="time"
          clearable
          size="mini"
          value-format="timestamp"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="select_top"
          style="width: 330px"
        />
        <el-input v-model="searchStr" el-input clearable placeholder="请输入医费袋(箱)条码" size="mini" class="select_top" />
        <el-button type="primary" icon="el-icon-search" size="mini" class="btn_top" @click="check()">查询</el-button>
        <el-button type="success" size="mini" class="btn_top" @click="jiaojie()">打印交接单</el-button>
        <el-button type="success" size="mini" class="btn_top" @click="outExcel()">导出Excel</el-button>
      </div>
    </div>
    <div style="float:left;height: 100%;width: 100%;margin-top: 40px">
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
          <el-table-column type="index" label="序" width="50" />
          <el-table-column type="selection" width="50" />
          <el-table-column sortable prop="dataname" label="状态" />
          <el-table-column sortable prop="tname" label="医废分类" width="160" />
          <el-table-column sortable prop="weight" label="科室重量" width="110" />
          <el-table-column sortable prop="sname" label="科室交接人(科室)" width="160" />
          <el-table-column sortable prop="dname" label="交接科室" width="110" />
          <el-table-column sortable prop="placentanum" label="胎盘数量" width="110" />
          <el-table-column sortable prop="collectdate" label="收集时间" :formatter="ToStr" width="160" />
          <el-table-column sortable prop="sname2" label="收集人" width="110" />
          <el-table-column sortable prop="bagcode" label="医废袋条码" width="160" />
          <el-table-column sortable prop="boxcode" label="医废箱条码" width="160" />
          <el-table-column sortable prop="savename" label="暂存点" width="200" />
        </el-table>
      </div>
      <div class="block" style="text-align: center;margin-top: 5px">
        <el-pagination :current-page="currPage" :page-sizes="[10, 20,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCum" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <div style="float:right;width: 100%">
      <div style="float: right;height:30px;width:100%;margin-top: 5px;">
        <el-button type="primary" size="mini" icon="el-icon-price-tag" class="btn_foot" @click="weight">称重标签</el-button>
        <el-button type="primary" icon="el-icon-date" size="mini" class="btn_foot" @click="trashtable">科室医疗废物记录表</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="mini" class="btn_foot" @click="tabledemo1">医疗废物记录表</el-button>
        <el-button type="warning" icon="el-icon-delete-solid" size="mini" class="btn_foot" @click="HazardousWasteTable">危险废物转移联单</el-button>
        <!--        手工登记隐藏框-->
        <el-dialog
          title="手工登记"
          :visible.sync="dialogVisible"
          center
          width="700px"
          :before-close="handleClose"
        >
          <div style="height: 250px;width: 720px;">
            <el-form ref="ruleForm" :inline="true" size="mini" :model="ruleForm" :rules="rules" label-width="110px">
              <el-input v-model="ruleForm.state" type="hidden" style="width: 180px" />
              <div class="infoDiv">
                <div class="text-div" />
                <div style="float: left;width: 50%;height: 100%;margin-top: 10px">
                  <el-form-item label="科室名称" prop="did">
                    <el-select v-model="ruleForm.did" filterable style="width: 180px" placeholder="请选择" @change="FindPerson">
                      <el-option
                        v-for="item in departmentList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="收集时间" prop="collectdate">
                    <el-date-picker
                      v-model="ruleForm.collectdate"
                      style="width: 180px"
                      type="datetime"
                      placeholder="选择日期时间"
                    />
                  </el-form-item>
                  <el-form-item label="所属院区" prop="hid">
                    <el-select v-model="ruleForm.hid" filterable style="width: 180px" placeholder="请选择">
                      <el-option
                        v-for="item in hospitalList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="暂存点" prop="saveid">
                    <el-select v-model="ruleForm.saveid" filterable style="width: 180px" placeholder="请选择">
                      <el-option
                        v-for="item in saveList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="医废分类" prop="typeid">
                    <el-select v-model="ruleForm.typeid" style="width: 180px" placeholder="请选择">
                      <el-option
                        v-for="item in trashTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <div style="float: left;width: 50%;height: 100%;margin-top: 10px">
                  <el-form-item label="收集人" prop="collectid">
                    <el-select v-model="ruleForm.collectid" filterable style="width: 180px" placeholder="请选择">
                      <el-option
                        v-for="item in collectList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="交接人" prop="joinid">
                    <el-select v-model="ruleForm.joinid" filterable style="width: 180px" placeholder="请选择">
                      <el-option
                        v-for="item in staffList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="重量" prop="weight">
                    <el-input v-model="ruleForm.weight" style="width: 180px" />
                  </el-form-item>
                  <el-form-item label="医废箱条码" prop="boxcode">
                    <el-select v-model="ruleForm.boxcode" filterable placeholder="请选择">
                      <el-option
                        v-for="item in boxcodeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="是否涉疫医废" prop="depidemic">
                    <el-select v-model="ruleForm.depidemic" style="width: 180px" placeholder="请选择">
                      <el-option label="是" value="1" />
                      <el-option label="否" value="0" />
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div style="float:left;margin-left: 70%;height: 18%;width: 100%;margin-top: 10px">
                <el-button @click="resetForm('ruleForm')">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
              </div>
            </el-form>
          </div>
        </el-dialog>
        <!--        修改医废类型隐藏框-->
        <el-dialog
          title="修改医废类型"
          :visible.sync="UpdialogVisible"
          center
          width="400px"
          :before-close="handleClose"
        >
          <div>
            <el-form ref="tform" :rules="rule" :model="tform" label-width="100px">
              <el-form-item label="医废分类" prop="ctype">
                <el-select v-model="tform.ctype" style="width: 160px" placeholder="请选择">
                  <el-option
                    v-for="item in trashTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="UpresetForm('tform')">取 消</el-button>
            <el-button type="primary" @click="uptrashType('tform')">确 定</el-button></span>
        </el-dialog>
        <!--        补关联入库 箱-->
        <el-dialog
          title="补关联入库(箱)"
          :visible.sync="BoxdialogVisible"
          center
          width="400px"
          :before-close="handleClose"
        >
          <div>
            <el-form ref="Boxform" :rules="Boxrule" :model="Boxform" label-width="100px">
              <el-form-item label="暂存点" prop="saveid">
                <el-select v-model="Boxform.saveid" style="width: 200px" placeholder="请选择">
                  <el-option
                    v-for="item in saveList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="BoxUpresetForm('Boxform')">取 消</el-button>
            <el-button type="primary" @click="BoxupTrashSave('Boxform')">确 定</el-button></span>
        </el-dialog>
        <!--        补关联入库 袋-->
        <el-dialog
          title="补关联入库(袋)"
          :visible.sync="BagdialogVisible"
          center
          width="400px"
          :before-close="handleClose"
        >
          <div>
            <el-form ref="Bagform" :rules="Bagrule" :model="Bagform" label-width="100px">
              <el-input v-model="Bagform.infoid" type="hidden" style="width: 1px" />
              <el-form-item label="医废箱条码" prop="boxcode">
                <el-select v-model="Bagform.boxcode" filterable placeholder="请选择">
                  <el-option
                    v-for="item in boxcodesList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="医废袋条码" prop="bagcode">
                <el-input v-model="Bagform.bagcode" style="width: 200px" />
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="BagUpresetForm('Bagform')">取 消</el-button>
            <el-button type="primary" @click="BagupTrashSave('Bagform')">确 定</el-button></span>
        </el-dialog>
      </div>
      <div style="float: right;height:30px;width:100%;margin-top: 5px">
        <el-button type="warning" size="mini" icon="el-icon-edit" class="btn_foot" @click="loseRegi">遗失登记</el-button>
        <el-button type="success" size="mini" class="btn_foot" @click="dialogVisible = true">手工登记</el-button>
        <el-button type="success" icon="el-icon-takeaway-box" size="mini" class="btn_foot" @click="BoxdialogVisible = true">补关联入库(箱)
        </el-button>
        <el-button type="success" icon="el-icon-shopping-bag-1" size="mini" class="btn_foot" @click="BagdialogVisible = true">补关联入库(袋)
        </el-button>
        <el-button type="success" icon="el-icon-edit-outline" size="mini" class="btn_foot" @click="UpdataDialogShow">修改医废分类
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
import { dateToStr } from '../../utils/kaihangTool'
import '../../styles/kLayout.css'
export default {
  name: 'TrashUp',
  data() {
    var checkweight = (rule, value, callback) => {
      const mailReg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
      setTimeout(() => {
        if (mailReg.test(value) || value === '') {
          callback()
        } else {
          callback(new Error('只允许输入整数或则小数'))
        }
      })
    }
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
      totalweight: [],
      tableAry: [],
      boxcodeList: [],
      boxcodesList: [],
      selectArr: [],
      infraction: '',
      saveList: [],
      SaveIdArray: [],
      trashIdArray: [], // 医废分类
      trashStateArray: [], // 医废状态
      departmentList: [], // 科室名称
      collectList: [], // 收集人
      collectIdList: [], // 收集列表的id集合
      hopValue: '',
      trashValue: '',
      trash: '',
      trashStateList: [],
      hospitalList: [],
      trashTypeList: [],
      sectionValue: '',
      collectorsValue: '',
      staffList: [], // 交接人options
      multipleSelection: [],
      value: '',
      options: [{ value: '1', label: '是' }, { value: '0', label: '否' }],
      changeError: '',
      trashCode: '',
      dialogVisible: false,
      UpdialogVisible: false,
      BoxdialogVisible: false,
      BagdialogVisible: false,
      time: [],
      searchStr: '',
      tableData: [],
      tableDataAll: [],
      pageSize: 10,
      currPage: 1,
      totalCum: 0,
      ruleForm: {
        saveid: '',
        state: 7,
        did: '',
        weight: '',
        hid: '',
        typeid: '',
        collectdate: '',
        collectid: '',
        joinid: '',
        boxcode: '',
        depidemic: '',
        delivery: false
      },
      rules: {
        did: [{ required: true, message: '请输入科室名称', trigger: 'blur' }],
        hid: [{ required: true, message: '请选择医院', trigger: 'blur' }],
        typeid: [{ required: true, message: '请选择医废类型', trigger: 'blur' }],
        saveid: [{ required: true, message: '请选择暂存点', trigger: 'blur' }],
        weight: [
          { required: true, message: '请输入重量', trigger: 'blur' },
          { required: true, validator: checkweight, trigger: 'blur' },
          { max: 15, message: '输入的数字太长', trigger: 'blur' }],
        collectdate: [{ required: true, message: '请输入收集时间', trigger: 'blur' }],
        collectid: [{ required: true, message: '请选择收集人', trigger: 'blur' }],
        joinid: [{ required: true, message: '请选择交接人', trigger: 'blur' }],
        boxcode: [
          { required: true, message: '请输入医废箱条码', trigger: 'blur' },
          { required: true, validator: checkNum, trigger: 'blur' },
          { max: 15, message: '输入的数字太长', trigger: 'blur' }
        ],
        depidemic: [{ required: true, message: '请选择该医废是否是涉疫医废', trigger: 'blur' }]
      },
      tform: {
        ctype: '',
        delivery: false
      },
      rule: {
        ctype: [{ required: true, message: '请选择医废分类', trigger: 'blur' }]
      },
      Boxform: {
        saveid: ''
      },
      Boxrule: {
        saveid: [{ required: true, message: '请选择暂存点', trigger: 'blur' }]
      },
      Bagform: {
        bagcode: '',
        boxcode: ''
      },
      Bagrule: {
        bagcode: [{ required: true, message: '请输入医废袋条码', trigger: 'blur' }],
        boxcode: [
          { required: true, message: '请输入医废箱条码', trigger: 'blur' },
          { required: true, validator: checkNum, trigger: 'blur' }]
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
      },
      tableHeight: window.innerHeight * 0.72 // 表格高度
    }
  },
  mounted() {
    this.tableHeight = window.innerHeight * 0.72 // 表格高度
    initboxcodesList(this)
    TblboxcodeList(this)
    trashTypeList(this)
    departmentList(this)
    hospitalList(this)
    trashStateList(this)
    staffList(this)
    TblsaveList(this)
    collectList(this)
    this.currPage = 1
    initTbl(this)
  },
  methods: {
    jiaojie() {
      var timearray = getTime(this)
      if (this.time !== '' && this.sectionValue !== '') {
        request.post('/medicaltype/findjiao', {
          did: this.sectionValue,
          // collectid: this.collectorsValue,
          // collectdate: this.time,
          start: timearray[0],
          end: timearray[1]
        }).then(res => {
          var route = this.$router.resolve({
            name: 'Dangertable'
          })
          const list = JSON.stringify(res.list)
          const sum = JSON.stringify(res.sum)
          const sum1 = JSON.stringify(res.sum1)
          const sum2 = JSON.stringify(res.sum2)
          const sum3 = JSON.stringify(res.sum3)
          const sum4 = JSON.stringify(res.sum4)
          const sum5 = JSON.stringify(res.sum5)
          const sum6 = JSON.stringify(res.sum6)
          const sum7 = JSON.stringify(res.sum7)
          const sum8 = JSON.stringify(res.sum8)
          const sum9 = JSON.stringify(res.sum9)
          const sum10 = JSON.stringify(res.sum10)
          const sum11 = JSON.stringify(res.sum11)

          sessionStorage.setItem('list', list)
          sessionStorage.setItem('time', res.enddate)

          sessionStorage.setItem('sum', sum)
          sessionStorage.setItem('sum1', sum1)
          sessionStorage.setItem('sum2', sum2)
          sessionStorage.setItem('sum3', sum3)
          sessionStorage.setItem('sum4', sum4)
          sessionStorage.setItem('sum5', sum5)
          sessionStorage.setItem('sum6', sum6)
          sessionStorage.setItem('sum7', sum7)
          sessionStorage.setItem('sum8', sum8)
          sessionStorage.setItem('sum9', sum9)
          sessionStorage.setItem('sum10', sum10)
          sessionStorage.setItem('sum11', sum11)
          window.open(route.href, '_blank')
        })
      } else {
        this.$message.warning('请选择时间和科室')
      }
    },
    outExcel() {
      // 获得查询到的所有医废收集列表信息
      var timearray = getTime(this)
      request.post('/medicaltype/findAll', {
        searchStr: this.searchStr,
        hid: this.hopValue,
        typeid: this.trashValue,
        state: this.trash,
        did: this.sectionValue,
        collectid: this.collectorsValue,
        depidemic: this.value,
        start: timearray[0],
        end: timearray[1],
        infraction: this.infraction
      }).then(res => {
        // if (res.tableData.saveid == null || res.tableData.saveid == 0 ){
        //   res.tableData.savename = null
        //   vue.tableDataAll = res.tableData
        //   console.log(vue.tableDataAll.savename)
        // }
        this.tableDataAll = res.tableData
      })
      this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.export2Excel()
      }).catch(() => {})
    },
    export2Excel() {
      var that = this
      require.ensure([], () => {
        const { export_json_to_excel } = require('./Export2Excel') // 这里必须使用绝对路径，根据自己的命名和路径
        const tHeader = [
          '序',
          '状态',
          '医废分类',
          '科室重量',
          '科室交接人',
          '交接科室',
          '胎盘数量',
          '收集时间',
          '收集人',
          '医废袋条码',
          '医废箱条码',
          '暂存点',
          '所属院区'
        ] // 导出的表头名
        const filterVal = [
          'row',
          'dataname',
          'tname',
          'weight',
          'sname',
          'dname',
          'placentanum',
          'collectdate',
          'sname2',
          'bagcode',
          'boxcode',
          'savename',
          'hname'
        ] // 导出的表头字段名
        if (that.multipleSelection.length === 0) {
          this.tableDataAll.forEach(item => {
            this.$set(item, '请选择', '请选择')
            // this.$set(item, 'yq', '暂无')
          })
          const list = that.tableDataAll
          // that.excelData为传入的数据
          const data = that.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '医疗废弃物报表') // 导出的表格名称，根据需要自己命名
          // tHeader为导出Excel表头名称，`xxxxxx`即为导出Excel名称
        } else {
          const list = that.multipleSelection
          // that.excelData为传入的数据
          const data = that.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '医疗废弃物报表') // 导出的表格名称，根据需要自己命名
          // tHeader为导出Excel表头名称，`xxxxxx`即为导出Excel名称
        }
      })
    },

    hosselect(val) {
      let obj = ''
      this.hospitalList.forEach(function(item, index) {
        if (item.value === val) {
          obj = item.label
        }
      })
      sessionStorage.setItem('hosname', obj)
    },
    tabledemo1() {
      var time1 = ''
      var time2 = ''
      if (this.time === null || this.time.length <= 0) {
        this.time = []
      } else {
        time1 = this.time[0]
        time2 = this.time[1]
      }
      request.post('/medicaltype/kstable', {
        searchStr: this.searchStr,
        hid: this.hopValue,
        typeid: this.trashValue,
        state: this.trash,
        did: this.sectionValue,
        collectid: this.collectorsValue,
        depidemic: this.value,
        collectdate: this.time,
        start: time1,
        end: time2,
        infraction: this.infraction
      }).then(res => {
        const time = res.enddate
        sessionStorage.setItem('time', time)
        // 主要实现存储参数的功能
        const tableAry = JSON.stringify(res.tableAry)
        sessionStorage.setItem('tableAry', tableAry)
        // 主要实现打开新窗口的功能
        var route = this.$router.resolve({
          name: 'Table2'
        })
        window.open(route.href, '_blank')
        // })
      })
    },
    trashtable() {
      var timearray = getTime(this)
      request.post('/medicaltype/table', {
        searchStr: this.searchStr,
        hid: this.hopValue,
        typeid: this.trashValue,
        state: this.trash,
        did: this.sectionValue,
        collectid: this.collectorsValue,
        depidemic: this.value,
        collectdate: this.time,
        start: timearray[0],
        end: timearray[1],
        infraction: this.infraction
      }).then(res => {
        // this.tableAry = res.tableAry
        // 主要实现打开新窗口的功能
        var route = this.$router.resolve({
          name: 'Table'
        })
        // this.totalweight.push(res.d1,res.d2,res.d3,res.d4,res.d5,res.d6,res.dt)
        // const obj = JSON.stringify(this.tableAry)
        // const obj2 = JSON.stringify(this.totalweight)
        // 主要实现存储参数的功能
        const tableAry = JSON.stringify(res.tableAry)
        const boxlist = JSON.stringify(res.boxlist)
        const baglist = JSON.stringify(res.baglist)
        const placentalist = JSON.stringify(res.placentalist)
        const d1 = JSON.stringify(res.d1)
        const d2 = JSON.stringify(res.d2)
        const d3 = JSON.stringify(res.d3)
        const d4 = JSON.stringify(res.d4)
        const d5 = JSON.stringify(res.d5)
        const d6 = JSON.stringify(res.d6)
        const dt = JSON.stringify(res.dt)
        const startdate = JSON.stringify(res.startdate)
        const enddate = JSON.stringify(res.enddate)

        sessionStorage.setItem('tableAry', tableAry)
        sessionStorage.setItem('boxlist', boxlist)
        sessionStorage.setItem('baglist', baglist)
        sessionStorage.setItem('placentalist', placentalist)
        sessionStorage.setItem('d1', d1)
        sessionStorage.setItem('d2', d2)
        sessionStorage.setItem('d3', d3)
        sessionStorage.setItem('d4', d4)
        sessionStorage.setItem('d5', d5)
        sessionStorage.setItem('d6', d6)
        sessionStorage.setItem('dt', dt)
        sessionStorage.setItem('startdate', startdate)
        sessionStorage.setItem('enddate', enddate)
        window.open(route.href, '_blank')
      })
    },
    weight() {
      if (this.selectArr.length === 0) {
        this.$message({
          message: '请选中至少一行数据',
          type: 'warning'
        })
      } else {
        // 主要实现打开新窗口的功能
        var route = this.$router.resolve({
          name: 'Er'
        })
        // 主要实现存储参数的功能
        const obj = JSON.stringify(this.selectArr)
        sessionStorage.setItem('tableData', obj)
        window.open(route.href, '_blank')
      }
    },
    ToStr(row) {
      return dateToStr(row.collectdate)
    },
    FindPerson(val) {
      request.post('/medicaltype/FindDpartPonser', {
        did: val
      }).then(res => {
        this.staffList = []
        res.list.forEach(item => {
          if (item != null) {
            const option = {
              value: item.staffid,
              label: item.sname
            }
            this.staffList.push(option)
          }
        })
        if (this.staffList.length > 0) {
          this.ruleForm.joinid = this.staffList[0].value
        } else {
          this.ruleForm.joinid = ''
        }
      })
    },
    loseRegi() {
      this.$confirm('此操作将该医废登记成丢失状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        selectStateList(this, 10)
      })
    }, // 遗失登记
    uptrashType(tform) {
      this.$refs[tform].validate((valid) => {
        if (valid) {
          selectState(this, this.tform.ctype)
        } else {
          return false
        }
        this.UpdialogVisible = false
      })
    }, // 修改医废分类
    UpresetForm(tform) {
      this.$refs[tform].resetFields()
      this.UpdialogVisible = false // 修改医废分类——取消
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.ruleForm.collectdate = dateToStr(this.ruleForm.collectdate)
          request.post('/medicaltype/HandaddDate', this.ruleForm).then(res => {
            this.$message.success(res.msg)
            initboxcodeList(res, this)
            initTbl(this)
            this.ruleForm.collectdate = '' // []
            this.ruleForm.typeid = ''
            this.ruleForm.weight = ''
            this.ruleForm.boxcode = ''
            this.ruleForm.depidemic = ''
          })
        } else {
          this.$message.warning('信息尚未填写完整')
          return false
        }
      })
    }, // 手工登记 增加——确认
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields()
      this.dialogVisible = false
    }, // 手工登记 增加——取消
    BoxupTrashSave(Boxform) {
      this.$refs[Boxform].validate((valid) => {
        if (valid) {
          trashsaveidList(this, this.Boxform.saveid)
        }
        this.BoxdialogVisible = false
      })
    }, // 补关联入库 箱——确定
    BoxUpresetForm(Boxform) {
      this.$refs[Boxform].resetFields()
      this.BoxdialogVisible = false
    }, // 补关联入库 箱——取消
    BagButton() {
      this.BagdialogVisible = true
    },
    BagupTrashSave(Bagform) {
      if (this.trashIdArray.length >= 2) {
        this.$message.warning('只能选择一个')
      } else if (this.trashIdArray.length <= 0) {
        this.$message.warning('必须选择一个')
      } else {
        this.$refs[Bagform].validate((valid) => {
          if (valid) {
            this.Bagform['infoid'] = this.trashIdArray[0]
            request.post('/medicaltype/upBoxcode', this.Bagform).then(res => {
              this.$message.success(res.msg)
              this.$refs[Bagform].resetFields()
              initTbl(this)
              this.BagdialogVisible = false
            })
          } else {
            this.$message.warning('信息尚未填写完整')
            return false
          }
        })
      }
    }, // 补关联入库 袋——确定
    BagUpresetForm(Bagform) {
      this.$refs[Bagform].resetFields()
      this.BagdialogVisible = false
    }, // 补关联入库 袋——取消
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleCurrentChange(cPage) {
      this.currPage = cPage
      initTbl(this)
    },
    handleSizeChange(val) {
      this.pageSize = val
      initTbl(this)
    },
    check() {
      this.currPage = 1
      initTbl(this)
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    selectAll(selection) {
      this.selectArr = selection
      pushSelection(this, selection)
    },
    handleSelect(selection) {
      this.selectArr = selection
      pushSelection(this, selection)
    },
    HazardousWasteTable() {
      var route = this.$router.resolve({
        name: 'HazardousWasteTable'
      })
      var timearray = getTime(this)
      request.post('/medicaltype/hazardousWasteTable', {
        start: timearray[0],
        end: timearray[1],
        did: this.sectionValue,
        hid: this.hopValue
      }).then(res => {
        const obj = JSON.stringify(res.tablelist)
        let hospitalName = '厦门第一附属医院'
        this.hospitalList.forEach(item => {
          if (item.value === this.hopValue) {
            hospitalName = item.label
          }
        })
        sessionStorage.setItem('tablelist', obj)
        sessionStorage.setItem('HospitalName', hospitalName)
        sessionStorage.setItem('yearMonth', res.enddate)

        window.open(route.href, '_blank')
      })
    },
    UpdataDialogShow() {
      if (this.selectArr.length === 0) {
        this.$message({
          message: '请选中至少一行数据',
          type: 'warning'
        })
      } else {
        this.UpdialogVisible = true
      }
    }
  }
}
function getTime(vue) {
  var time1 = ''
  var time2 = ''
  if (vue.time === null || vue.time.length <= 0) {
    var dataStr = dateToStr(new Date())
    var datearr = dataStr.split(' ')
    time1 = new Date(datearr[0] + ' 00:00:00').getTime()
    time2 = new Date(datearr[0] + ' 23:59:59').getTime()
    vue.time = [time1, time2]
  } else {
    time1 = vue.time[0]
    time2 = vue.time[1]
  }
  var timearray = []
  timearray.push(time1, time2)
  return timearray
}
function pushSelection(vue, selection) {
  vue.trashIdArray = []
  vue.trashStateArray = []
  vue.SaveIdArray = []
  for (var i = 0; i < selection.length; i++) {
    vue.trashIdArray.push(selection[i].infoid) // 将选中的push到科室id数组中
    vue.SaveIdArray.push(selection[i].infoid) // 将选中的push到医废分类id数组中
    vue.trashStateArray.push(selection[i].infoid) // 将选中的push到医废暂存点id数组中
  }
}
function selectState(vue, typeid) { // 批量修改医废分类的方法
  if (vue.trashIdArray.length > 0) {
    request.post('/medicaltype/upTrashType', {
      trashIdArray: vue.trashIdArray,
      typeid: typeid
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
}
function selectStateList(vue, state) { // 批量修改医废状态的方法
  if (vue.trashStateArray.length > 0) {
    request.post('/medicaltype/upTrashState', {
      trashStateArray: vue.trashStateArray,
      state: state
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
}
function trashsaveidList(vue, saveid) { // 批量修改暂存点 补关联入库（箱）的方法
  if (vue.SaveIdArray.length > 0) {
    request.post('/medicaltype/upSaveid', {
      SaveIdArray: vue.SaveIdArray,
      saveid: saveid
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
}
function collectList(vue) {
  request.post('/medicaltype/FindcollectList', {}).then(res => {
    var List = res.list // 收集人的集合
    List.forEach(item => {
      const list = {
        value: item.staffid,
        label: item.sname
      }
      vue.collectList.push(list)
    })
  })
}
function trashTypeList(vue) {
  request.post('/medicaltype/trashTypeList', {}).then(res => {
    var trashTypeList = res.list // 医废分类集合
    trashTypeList.forEach(item => {
      const list = {
        value: item.tid,
        label: item.tname
      }
      vue.trashTypeList.push(list)
    })
  })
}
function departmentList(vue) {
  request.post('/medicaltype/getdepartmentlist', {}).then(res => {
    var departmentList = res.list // 科室名称集合
    departmentList.forEach(item => {
      const list = {
        value: item.did,
        label: item.dname
      }
      vue.departmentList.push(list)
    })
  })
}
function hospitalList(vue) {
  request.post('/medicaltype/hospitalList', {}).then(res => {
    var hospitalList = res.list // 医院名称集合
    hospitalList.forEach(item => {
      const list = {
        value: item.hid,
        label: item.hname
      }
      vue.hospitalList.push(list)
    })
  })
}
function trashStateList(vue) {
  request.post('/medicaltype/trashStateList', {}).then(res => {
    var trashStateList = res.list // 状态集合
    trashStateList.forEach(item => {
      const list = {
        value: item.dataid,
        label: item.dataname
      }
      vue.trashStateList.push(list)
    })
  })
}
function staffList(vue) {
  request.post('/medicaltype/staffList', {}).then(res => {
    var staffList = res.list // 状态集合
    staffList.forEach(item => {
      const list = {
        value: item.staffid,
        label: item.sname
      }
      vue.staffList.push(list)
    })
  })
}
function TblsaveList(vue) {
  request.post('/medicaltype/TblsaveList', {}).then(res => {
    var TblsaveList = res.list // 暂存点集合
    TblsaveList.forEach(item => {
      const list = {
        value: item.saveid,
        label: item.savename
      }
      vue.saveList.push(list)
    })
  })
}
function TblboxcodeList(vue) {
  request.post('/medicaltype/TblboxcodeList', {}).then(res => {
    initboxcodeList(res, vue)
  })
}
function initboxcodeList(res, vue) {
  vue.boxcodeList = []
  var boxcodeList = res.list // 箱条码 未使用 集合
  boxcodeList.forEach(item => {
    const list = {
      value: item.boxcode,
      label: item.boxcode,
      boxid: item.boxid
    }
    vue.boxcodeList.push(list)
  })
}
function initboxcodesList(vue) {
  request.post('/medicaltype/TblboxcodesList', {}).then(res => {
    vue.boxcodesList = []
    var boxcodesList = res.list // 箱条码 已使用 集合
    boxcodesList.forEach(item => {
      const list = {
        value: item.boxcode,
        label: item.boxcode
      }
      vue.boxcodesList.push(list)
    })
  })
}
function initTbl(vue) {
  var timearray = getTime(vue)
  request.post('/medicaltype/find', {
    currPage: (vue.currPage - 1) * vue.pageSize,
    pageSize: vue.pageSize,
    searchStr: vue.searchStr,
    hid: vue.hopValue,
    typeid: vue.trashValue,
    state: vue.trash,
    did: vue.sectionValue,
    collectid: vue.collectorsValue,
    depidemic: vue.value,
    start: timearray[0],
    end: timearray[1],
    infraction: vue.infraction
  }).then(res => {
    vue.tableData = res.tableData
    vue.totalCum = res.totalCum
  })
}
</script>

<style scoped>
.el-form-item{
  margin-bottom: 15px;
}
.infoDiv{
  float: left;
  width: 90%;
  border: 1px solid #808080;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  height: 80%;
  margin-top: -40px;
}
  .btn_foot{
    margin-right: 5px;
    float: right;
  }
  .select_top{
    width: 155px;
    margin-left: 5px;
    margin-top: 5px;
  }
.btn_top{
  margin-left: 5px;
  margin-top: 5px;
}
</style>
