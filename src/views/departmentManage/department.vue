<template>
  <div>
    <div class="topDiv">
      <div class="topBtnDiv">
        <el-select
          v-model="departmentState"
          size="mini"
          placeholder="状态"
          style="width: 80px"
          @change="selectChange"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input
          v-model="searchStr"
          size="mini"
          placeholder="请输入关键字搜索"
          class="input-with-select"
          style="width: 200px;margin-left: 5px"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchSubmit" />
        </el-input>
      </div>
      <el-button class="btn_div" type="primary" size="mini" @click="openAdd">新增科室</el-button>
      <el-upload
        class="btn_div"
        action="/department/upfile"
        list-type="picture"
        accept=".xls"
        :show-file-list="false"
        :on-success="successfile"
      >
        <el-button type="success" size="mini">初始化导入</el-button>
      </el-upload>
      <el-button class="btn_div" type="sucess" size="mini" @click="downFile">模板下载</el-button>
      <el-button class="btn_div" type="success" size="mini" @click="startToDate">批量启用</el-button>
      <el-button class="btn_div" type="warning" size="mini" @click="stopToDate">批量禁用</el-button>
      <el-button class="btn_div" type="danger" size="mini" @click="outToDate">批量作废</el-button>
      <!--        <download-excel class = "export-excel-wrapper"-->
      <!--                        :data = "json_data"-->
      <!--                        :fields = "json_fields"-->
      <!--                        type="xls"-->
      <!--                        name="模板.xls">-->
      <!--          <el-button style="margin-left: 15px" type="sucess" mini >模板下载</el-button>-->
      <!--        </download-excel>-->
      <!--        <a style="margin-left: 15px" href="/department/downfile/static/excel/03.xls">模板下载</a>-->
    </div>
    <!--表格数据-->
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
          <el-table-column label="序号" type="index" width="50" align="center" />
          <el-table-column type="selection" :selectable="checkSelectable" width="50" align="left" />
          <el-table-column sortable prop="dname" label="科室名称" />
          <el-table-column sortable prop="dcode" label="科室编码" />
          <el-table-column sortable prop="tblkname.kname" label="国际科室名称" />
          <el-table-column sortable prop="tblkname.knum" label="国际科室编码" />
          <el-table-column sortable prop="dspell" label="拼音码" />
          <el-table-column sortable prop="tbldata.dataname" label="状态" />
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.tbldata.dataname !== '作废'">
                <!--            修改的隐藏框-->
                <el-button type="primary" size="mini" @click="upToDate(scope.index,scope.row)">修改</el-button>
              </div>
              <div v-else>
                <el-button disabled type="primary" size="mini" @click="upToDate(scope.index,scope.row)">修改</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
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
    </div>
    <!--        增加隐藏框-->
    <el-dialog
      title="新增科室"
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose"
    >
      <div style="height: 380px;width: 98%;margin-top: -15px;margin-left: 1%">
        <el-form ref="form" size="mini" :model="form" :rules="rules" label-width="150px">
          <el-input v-model="form.kid" type="hidden" style="width: 1px" />
          <el-input v-model="form.dstate" type="hidden" style="width: 1px" />
          <div class="infoDiv">
            <div class="text-div" />
            <div style="float: left;width: 50%;height: 100%;margin-top: 10px">
              <el-form-item label="科室名称(院内)" prop="dname">
                <el-input v-model="form.dname" style="width: 150px" />
              </el-form-item>
              <el-form-item label="科室编码(院内)" prop="dcode">
                <el-input v-model="form.dcode" style="width: 150px" />
              </el-form-item>
              <el-form-item label="科室名称(国际)" prop="value">
                <el-select
                  v-model="form.value"
                  style="width: 150px"
                  clearable
                  placeholder="请选择"
                  @change="selectAddGuoChange"
                >
                  <el-option
                    v-for="item in cities"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="科室编码(国际)" prop="kname">
                <el-input v-model="form.kname" disabled style="width: 150px" />
              </el-form-item>
              <el-form-item label="科室所在楼号" prop="dfloornum">
                <el-input v-model="form.dfloornum" style="width: 150px" />
              </el-form-item>
              <el-form-item label="科室所在楼层" prop="dfloor">
                <el-input v-model="form.dfloor" style="width: 150px" />
              </el-form-item>
              <el-form-item label="科室房间" prop="droomNum">
                <el-input v-model="form.droomNum" style="width: 150px" />
              </el-form-item>
            </div>
            <div style="float: left;width: 50%;height: 100%;margin-top: 10px">
              <el-form-item label="序号" prop="ordernum">
                <el-input v-model="form.ordernum" style="width: 150px" />
              </el-form-item>
              <el-form-item label="是否涉疫" prop="depidemic">
                <el-select v-model="form.depidemic" style="width: 150px" placeholder="请选择">
                  <el-option label="是" value="1" />
                  <el-option label="否" value="0" />
                </el-select>
              </el-form-item>
              <el-form-item label="是否有胎盘" prop="dplacenta">
                <el-select v-model="form.dplacenta" style="width: 150px" placeholder="请选择">
                  <el-option label="是" value="1" />
                  <el-option label="否" value="0" />
                </el-select>
              </el-form-item>
              <el-form-item label="归集方式" prop="collecmode">
                <el-select v-model="form.collecmode" style="width: 150px" placeholder="请选择">
                  <el-option label="本院产生" value="本院产生" style="height: 50px" />
                  <el-option label="外院收集" value="外院收集" style="height: 50px" />
                </el-select>
              </el-form-item>
              <el-form-item label="打印次数" prop="dprintnum">
                <el-input v-model="form.dprintnum" style="width: 150px" />
              </el-form-item>
              <el-form-item label="胎盘个数预警值(天)" prop="pwarning">
                <el-input v-model="form.pwarning" style="width: 150px" />
              </el-form-item>
              <el-form-item label="该科室是否产生医废" prop="dproduce">
                <el-select v-model="form.dproduce" style="width: 150px" placeholder="请选择">
                  <el-option label="是" value="1" />
                  <el-option label="否" value="0" />
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div style="float:left;margin-left: 38%;height: 18%;width: 100%;margin-top: 10px">
            <el-button @click="Addclean('form')">取 消</el-button>
            <el-button type="primary" @click="AddsubmitForm('form')">确 定</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <!--              修改科室-->
    <el-dialog
      title="修改科室"
      :visible.sync="dialogUpVisible"
      width="700px"
      :before-close="handleClose"
    >
      <div style="height: 380px;width: 98%;margin-top: -15px;margin-left: 1%">
        <el-form ref="forms" size="mini" :model="forms" :rules="rulesUp" label-width="150px">
          <el-input v-model="forms.kid" type="hidden" style="width: 1px" />
          <el-input v-model="forms.did" type="hidden" style="width: 1px" />
          <div class="infoDiv">
            <div class="text-div" />
            <div style="float: left;width: 50%;height: 100%;margin-top: 10px">
              <el-form-item label="科室名称(院内)" prop="dname">
                <el-input v-model="forms.dname" style="width: 150px" />
              </el-form-item>
              <el-form-item label="科室编码(院内)" prop="dcode">
                <el-input v-model="forms.dcode" style="width: 150px" />
              </el-form-item>
              <el-form-item label="科室名称(国际)" prop="value">
                <el-select
                  v-model="forms.value"
                  style="width: 150px"
                  clearable
                  placeholder="请选择"
                  @change="selectUpdGuoChange"
                >
                  <el-option
                    v-for="item in cities"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="科室编码(国际)" prop="kname">
                <el-input v-model="forms.kname" disabled style="width: 150px" />
              </el-form-item>
              <el-form-item label="科室所在楼号" prop="dfloornum">
                <el-input v-model="forms.dfloornum" type="text" style="width: 150px" />
              </el-form-item>
              <el-form-item label="科室所在楼层" prop="dfloor">
                <el-input v-model="forms.dfloor" type="text" style="width: 150px" />
              </el-form-item>
              <el-form-item label="科室房间" prop="droomNum">
                <el-input v-model="forms.droomNum" type="text" style="width: 150px" />
              </el-form-item>
            </div>
            <div style="float: left;width: 50%;height: 100%;margin-top: 10px">
              <el-form-item label="序号" prop="ordernum">
                <el-input v-model="forms.ordernum" type="text" style="width: 150px" />
              </el-form-item>
              <el-form-item label="是否涉疫" prop="depidemic">
                <el-select v-model="forms.depidemic" style="width: 150px" placeholder="请选择">
                  <el-option label="是" value="1" />
                  <el-option label="否" value="0" />
                </el-select>
              </el-form-item>
              <el-form-item label="是否有胎盘" prop="dplacenta">
                <el-select v-model="forms.dplacenta" style="width: 150px" placeholder="请选择">
                  <el-option label="是" value="1" />
                  <el-option label="否" value="0" />
                </el-select>
              </el-form-item>
              <el-form-item label="归集方式" prop="collecmode">
                <el-select v-model="forms.collecmode" style="width: 150px" placeholder="请选择">
                  <el-option label="本院产生" value="本院产生" />
                  <el-option label="外院收集" value="外院收集" />
                </el-select>
              </el-form-item>
              <el-form-item label="打印次数" prop="dprintnum">
                <el-input v-model="forms.dprintnum" type="text" style="width: 150px" />
              </el-form-item>
              <el-form-item label="胎盘个数预警值(天)" prop="pwarning">
                <el-input v-model="forms.pwarning" type="text" style="width: 150px" />
              </el-form-item>
              <el-form-item label="该科室是否产生医废" prop="dproduce">
                <el-select v-model="forms.dproduce" style="width: 150px" placeholder="请选择">
                  <el-option label="是" value="1" />
                  <el-option label="否" value="0" />
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div style="float:left;margin-left: 38%;height: 18%;width: 100%;margin-top: 10px">
            <el-button @click="Upclean('forms')">取 消</el-button>
            <el-button type="primary" @click="UpsubmitForm('forms')">确定</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '../../utils/request'
import '../../styles/kLayout.css'
import { getOption } from '../../api/qiniu'
export default {
  name: 'Department',
  data() {
    var checkAddName = (rule, value, callback) => {
      const mailReg = /^[\u4e00-\u9fa5]+$/
      setTimeout(() => {
        request.post('department/checkdname', {
          dname: this.form.dname
        }).then(res => {
          if (res.sign === 1) {
            callback()
          } else {
            callback(new Error('您所输入的科室名称已被存在'))
          }
        })
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
    var checkAddcode = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else {
        const mailReg = /^[A-Za-z0-9]+$/
        setTimeout(() => {
          if (mailReg.test(value)) {
            request.post('department/checkdcode', {
              dcode: this.form.dcode
            }).then(res => {
              if (res.sign === 1) {
                callback()
              } else {
                callback(new Error('您所输入的科室编号已被存在'))
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            callback(new Error('科室编码只允许输入字母和数字'))
          }
        })
      }
    }
    var checkUpdName = (rule, value, callback) => {
      // const mailReg = /^[\u4e00-\u9fa5]+$/
      setTimeout(() => {
        if (this.clude === this.forms.dname) {
          callback()
        } else {
          request.post('department/checkdname', {
            dname: this.forms.dname
          }).then(res => {
            if (res.sign === 1) {
              callback()
            } else {
              callback(new Error('您所输入的科室名称已被存在'))
            }
          })
        }
      })
    }
    var checkUpdcode = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else {
        const mailReg = /^[A-Za-z0-9]+$/
        setTimeout(() => {
          if (mailReg.test(value)) {
            if (this.content === this.forms.dcode) {
              callback()
            } else {
              request.post('department/checkdcode', {
                dcode: this.forms.dcode
              }).then(res => {
                if (res.sign === 1) {
                  callback()
                } else {
                  callback(new Error('您所输入的科室编号已被存在'))
                }
              }).catch(err => {
                console.log(err)
              })
            }
          } else {
            callback(new Error('科室编码只允许输入字母和数字'))
          }
        })
      }
    }
    return {
      tableHeight: window.innerHeight * 0.72, // 高度
      clude: '',
      content: '',
      form: {
        kname: '',
        dname: '',
        dcode: '',
        kid: '',
        value: '',
        dprintnum: '1',
        depidemic: '0',
        dplacenta: '0',
        pwarning: '0',
        collecmode: '',
        ordernum: '',
        dfloornum: '',
        dstate: 2,
        dfloor: '',
        droomNum: '',
        dproduce: '1'
      },
      rules: {
        dproduce: [{ required: true, message: '请选择该科室是否产生医废', trigger: 'blur' }],
        droomNum: [{ max: 30, message: '输入的内容过长', trigger: 'blur' }],
        dfloor: [{ max: 30, message: '输入的内容过长', trigger: 'blur' }],
        dfloornum: [{ max: 30, message: '输入的内容过长', trigger: 'blur' }],
        ordernum: [{ validator: checkNum, trigger: 'blur' }],
        dprintnum: [{ validator: checkNum, trigger: 'blur' }],
        depidemic: [{}],
        value: [{}],
        dcode: [
          { validator: checkAddcode, trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' }
        ],
        pwarning: [{ validator: checkNum, trigger: 'blur' }],
        dname: [
          { required: true, message: '请输入科室名称(院内)', trigger: 'blur' },
          { required: true, validator: checkAddName, trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' }
        ],
        dplacenta: [{}],
        collecmode: [{ required: true, message: '请选择该科室的归集方式', trigger: 'blur' }]
      },
      forms: {
        dproduce: '',
        droomNum: '',
        dfloor: '',
        dfloornum: '',
        ordernum: '',
        collecmode: '',
        pwarning: '',
        dplacenta: '',
        dprintnum: '',
        depidemic: '',
        kname: '',
        dname: '',
        dcode: '',
        value: '',
        kid: ''
      },
      rulesUp: {
        dproduce: [{ required: true, message: '请选择该科室是否产生医废', trigger: 'blur' }],
        droomNum: [{ max: 30, message: '输入的内容过长', trigger: 'blur' }],
        dfloor: [{ max: 30, message: '输入的内容过长', trigger: 'blur' }],
        dfloornum: [{ max: 30, message: '输入的内容过长', trigger: 'blur' }],
        ordernum: [{ validator: checkNum, trigger: 'blur' }],
        dprintnum: [{ validator: checkNum, trigger: 'blur' }],
        depidemic: [{}],
        value: [{}],
        dcode: [
          { validator: checkUpdcode, trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' }
        ],
        pwarning: [{ validator: checkNum, trigger: 'blur' }],
        dname: [
          { required: true, message: '请输入科室名称(院内)', trigger: 'blur' },
          { validator: checkUpdName, trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' }
        ],
        dplacenta: [{}],
        collecmode: [{ required: true, message: '请选择该科室的归集方式', trigger: 'blur' }]
      },
      dialogVisible: false,
      dialogUpVisible: false,
      departmentState: '',
      searchStr: '',
      tableData: [],
      cities: [],
      departrmentIdArray: [],
      nowPage: 1,
      pageSize: 16,
      totalCum: 0,
      options: []
    }
  },
  mounted() {
    this.tableHeight = window.innerHeight * 0.72 // 表格动态高度，根据屏幕分辨率
    initTbl(this)
    getOption({ dataid: '1' }).then(res => {
      this.options = res.dataList
    })
    getGuoname(this)
  },
  methods: {
    checkSelectable(row, index) {
      return row.tbldata.dataname !== '作废'
    },
    downFile() {
      this.loading = true
      const aTag = document.createElement('a')
      aTag.href = 'excel/Department.xls'
      aTag.click()
      // request.post('/department/downfile', {
      //   a: 'a'
      // }).then(res => { // 可以传参，让后台识别是谁下载
      //   const content = res
      //   const blob = new Blob(['\ufeff', content], { type: 'text/plain' }) // 构造一个blob对象来处理数据
      //   const fileName = 'monthAssess.xlsx' // 导出文件名
      //   // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
      //   // IE10以上支持blob但是依然不支持download
      //   if ('download' in document.createElement('a')) { // 支持a标签download的浏览器
      //     const link = document.createElement('a') // 创建a标签
      //     link.download = fileName // a标签添加属性
      //     link.style.display = 'none'
      //     link.href = URL.createObjectURL(blob)
      //     document.body.appendChild(link)
      //     link.click() // 执行下载
      //     URL.revokeObjectURL(link.href) // 释放url
      //     document.body.removeChild(link) // 释放标签
      //   } else { // 其他浏览器
      //     navigator.msSaveBlob(blob, fileName)
      //   }
      // }).catch((error) => {
      //   console.log(error)
      //   // 关闭loading
      //   this.loading = false
      //   this.btnSendTem = false
      // })
    },
    openAdd() {
      this.dialogVisible = true
    },
    AddsubmitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          request.post('/department/getAdd', this.form).then(res => {
            this.$message.success(res.msg)
            this.$refs[form].resetFields()
            this.form.kid = ''
            this.dialogVisible = false
            initTbl(this)
          })
        } else {
          this.$message.warning('信息尚未填写完整')
          return false
        }
      })
    },
    Addclean(form) {
      this.$refs[form].resetFields()
      this.dialogVisible = false
    },
    upToDate(index, row) {
      this.dialogUpVisible = true
      this.forms.did = row.did
      this.forms.dproduce = row.dproduce
      this.forms.droomNum = row.droomNum
      this.forms.dfloor = row.dfloor
      this.forms.dfloornum = row.dfloornum
      this.forms.ordernum = row.ordernum
      this.forms.collecmode = row.collecmode
      this.forms.pwarning = row.pwarning
      this.forms.dplacenta = row.dplacenta
      this.forms.dprintnum = row.dprintnum
      this.forms.depidemic = row.depidemic
      this.forms.dproduce = row.dproduce
      this.forms.dcode = row.dcode
      this.forms.dname = row.dname
      this.clude = row.dname // 设置两个中间值
      this.content = row.dcode
      if (row.tblkname !== undefined) {
        this.forms.value = row.tblkname.kname
        this.forms.kname = row.tblkname.knum
      } else {
        this.forms.value = ''
        this.forms.kname = ''
      }
    },
    UpsubmitForm(forms) {
      this.$refs[forms].validate((valid) => {
        if (valid) {
          request.post('/department/UpDate', this.forms).then(res => {
            this.$message.success(res.msg)
            this.$refs[forms].resetFields()
            this.dialogUpVisible = false
            initTbl(this)
          })
        } else {
          this.$message.success('信息尚未填写完整')
          return false
        }
      })
      this.dialogUpVisible = false
    },
    Upclean(forms) {
      this.$refs[forms].resetFields()
      this.dialogUpVisible = false
    },
    startToDate() {
      selectState(this, 2)
    },
    stopToDate() {
      selectState(this, 3)
    },
    outToDate() {
      if (this.departrmentIdArray.length > 0) {
        this.$confirm('此操作将永久作废该科室, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          selectState(this, 4)
        }).catch(() => {
          this.$message.info('已取消作废')
        })
      } else {
        this.$message({ message: '必须选择一个', type: 'warning' })
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
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        this.form = {}
        done()
      }).catch(_ => {})
    },
    selectChange(val) { // 状态的下拉框改变值的时候，重载表格
      initTbl(this)
    },
    selectAddGuoChange(val) {
      this.form.kname = val
      this.cities.forEach(item => {
        var nowStr = item.value
        if (nowStr.trim() === val.trim()) {
          this.form.kid = item.kid
        }
      })
    },
    selectUpdGuoChange(val) {
      this.forms.kname = val
      this.cities.forEach(item => {
        var nowStr = item.value
        if (nowStr.trim() === val.trim()) {
          this.forms.kid = item.kid
        }
      })
    },
    successfile(res, file, fileList) {
      this.$message({
        message: res.msg,
        type: 'success'
      })
      initTbl(this)
    },
    selectAll(selection) {
      pushSelection(this, selection)
    },
    handleSelect(selection) {
      pushSelection(this, selection)
    },
    searchSubmit() { // 搜索框提交
      this.nowPage = 1 // 从第一页开始
      initTbl(this)
    }
  }
}
function pushSelection(vue, selection) { // 将选中的push到科室id数组中
  vue.departrmentIdArray = []
  for (var i = 0; i < selection.length; i++) {
    if (selection[i].tbldata.dataname === '作废') {
      // vue.$message({
      //   message: '包含已作废的科室，该科室不会被改变',
      //   type: 'warning'
      // })
    } else {
      vue.departrmentIdArray.push(selection[i].did)
    }
  }
}
function selectState(vue, dstate) { // 批量修改状态的方法
  if (vue.departrmentIdArray.length > 0) {
    request.post('/department/updStateDate', {
      departrmentIdArray: vue.departrmentIdArray,
      dstate: dstate
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
  // 不管什么结果，全部清空集合
  vue.departrmentIdArray = []
}

function getGuoname(vue) {
  vue.cities.length = 0
  request.post('/department/getKname', {}).then(res => {
    var citiesList = res.list // 这个数组是从后台获得的
    citiesList.forEach(item => {
      const citie = {
        value: item.knum,
        label: item.kname,
        kid: item.kid
      }
      vue.cities.push(citie)
    })
  })
}
function initTbl(vue) { // 初始化显示数据
  request.post('/department/getdepartmentState', {
    // 当前页
    nowPage: (vue.nowPage - 1) * vue.pageSize,
    pageSize: vue.pageSize,
    dstate: vue.departmentState,
    searchStr: vue.searchStr
  }).then(res => {
    vue.tableData = res.TbldepartrmentList
    vue.totalCum = res.totalCum
  })
}
</script>

<style scoped>
  ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }
  .infoDiv{
    float: left;
    width: 100%;
    border: 1px solid #808080;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    height: 80%;
    margin-top: -40px;
  }
</style>
