<template>
  <div>
    <div>
      <div style="float: left;margin-top: 10px">
        &ensp;&ensp;<a style="font-size: 18px;margin-left: 15px">科室状态:</a>
        <el-select v-model="departmentState" clearable size="small" style="width: 155px;margin-left: 10px" @change="selectChange">
          <el-option
            v-for="item in options"
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
      </div>
      <div style="float: left;margin-top: 5px;margin-left: 10px">
        <el-button type="success" icon="el-icon-takeaway-box" round @click="openAdd">增加</el-button>
        <!--        增加隐藏框-->
        <el-dialog
          title="新增科室"
          :visible.sync="dialogVisible"
          width="750px"
          center
          :before-close="handleClose"
        >
          <div class="free-panel-body" style="height: 500px;width: 700px;overflow:scroll">
            <el-form ref="form" :model="form" :rules="rules" label-width="200px">
              <el-form-item label="科室内码" prop="nei">
                <el-input v-model="form.nei" :disabled="true" style="width: 400px" />
              </el-form-item>
              <el-form-item label="科室编码(院内)" prop="dcode">
                <el-input v-model="form.dcode" style="width: 400px" />
              </el-form-item>
              <el-form-item label="科室名称(院内)" prop="dname">
                <el-input v-model="form.dname" style="width: 400px" />
              </el-form-item>
              <el-form-item label="科室编码(国际)" prop="kname">
                <el-input v-model="form.kname" style="width: 400px" />
              </el-form-item>
              <el-form-item label="科室名称(国际)" prop="num">
                <el-select v-model="form.value" clearable placeholder="请选择" @change="selectAddGuoChange">
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
              <el-form-item label="是否涉疫" prop="depidemic">
                <el-select v-model="form.depidemic" placeholder="请选择">
                  <el-option label="是" value="是" style="height: 50px" />
                  <el-option label="否" value="否" style="height: 50px" />
                </el-select>
              </el-form-item>
              <el-form-item label="打印次数" prop="dprintnum">
                <el-input v-model="form.dprintnum" type="text" style="width: 400px" />
              </el-form-item>
              <el-form-item label="是否有胎盘" prop="dplacenta">
                <el-select v-model="form.dplacenta" placeholder="请选择">
                  <el-option label="是" value="是" style="height: 50px" />
                  <el-option label="否" value="否" style="height: 50px" />
                </el-select>
              </el-form-item>
              <el-form-item label="胎盘个数预警值(天)" prop="pwarning">
                <el-input v-model="form.pwarning" type="text" style="width: 400px" />
              </el-form-item>
              <el-form-item label="归集方式" prop="collecmode">
                <el-select v-model="form.collecmode" placeholder="请选择">
                  <el-option label="本院产生" value="本院产生" style="height: 50px" />
                  <el-option label="外院收集" value="外院收集" style="height: 50px" />
                </el-select>
              </el-form-item>
              <el-form-item label="序号" prop="ordernum">
                <el-input v-model="form.ordernum" type="text" style="width: 400px" />
              </el-form-item>
              <el-form-item label="科室所在楼号" prop="dfloornum">
                <el-input v-model="form.dfloornum" type="text" style="width: 400px" />
              </el-form-item>
              <el-form-item label="科室所在楼层" prop="dfloor">
                <el-input v-model="form.dfloor" type="text" style="width: 400px" />
              </el-form-item>
              <el-form-item label="科室房间" prop="droomNum">
                <el-input v-model="form.droomNum" type="text" style="width: 400px" />
              </el-form-item>
              <el-input v-model="form.dstate" type="hidden" style="width: 400px" />
              <el-form-item label="该科室是否产生医废" prop="dproduce">
                <el-select v-model="form.dproduce" placeholder="请选择">
                  <el-option label="是" value="是" style="height: 50px" />
                  <el-option label="否" value="否" style="height: 50px" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="Addclean('form')">取 消</el-button>
            <el-button type="primary" @click="AddsubmitForm('form')">确 定</el-button>
          </span>
        </el-dialog>
        <el-button style="margin-left: 10px" type="success" icon="el-icon-edit-outline" round>初始化导入</el-button>
      </div>
    </div>
    <!--表格数据-->
    <div>
      <el-table
        ref="multipleTable"
        height="600"
        :data="tableData.filter(data => !search || (data.dname +='').toLowerCase().includes(search.toLowerCase()) || (data.dspell +='').toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" sortable label="序" width="100" />
        <el-table-column type="selection" width="50" />
        <el-table-column sortable prop="tbldata.dataname" label="状态" width="180" />
        <el-table-column sortable prop="dname" width="180" label="科室名称" />
        <el-table-column sortable prop="dcode" label="科室编码" width="180" />
        <el-table-column sortable prop="kname" label="国际科室名称" width="180" />
        <el-table-column sortable prop="num" label="国际科室编码" width="180" />
        <el-table-column sortable prop="dspell" label="拼音码" width="180" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.tbldata.dataname !== '作废'">
              <el-button type="primary" icon="el-icon-shopping-bag-1" round @click="upToDate(scope.index,scope.row)">修改</el-button>
              <!--            修改的隐藏框-->
              <el-dialog
                title="修改科室"
                :visible.sync="dialogUpVisible"
                width="750px"
                center
                :before-close="handleClose"
              >
                <div class="free-panel-body" style="height: 500px;width: 700px;overflow:scroll">
                  <el-form ref="forms" :model="forms" :rules="rulesUp" label-width="200px">
                    <el-input v-model="forms.did" :disabled="true" type="hidden" style="width: 400px" />
                    <el-form-item label="科室内码" prop="nei">
                      <el-input v-model="forms.nei" :disabled="true" style="width: 400px" />
                    </el-form-item>
                    <el-form-item label="科室编码(院内)" prop="dcode">
                      <el-input v-model="forms.dcode" style="width: 400px" />
                    </el-form-item>
                    <el-form-item label="科室名称(院内)" prop="dname">
                      <el-input v-model="forms.dname" style="width: 400px" />
                    </el-form-item>
                    <el-form-item label="科室编码(国际)" prop="kname">
                      <el-input v-model="forms.kname" style="width: 400px" />
                    </el-form-item>
                    <el-form-item label="科室名称(国际)" prop="num">
                      <el-select v-model="forms.value" clearable placeholder="请选择" @change="selectUpdGuoChange">
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
                    <el-form-item label="是否涉疫" prop="depidemic">
                      <el-select v-model="forms.depidemic" placeholder="请选择">
                        <el-option label="是" value="是" style="height: 50px" />
                        <el-option label="否" value="否" style="height: 50px" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="打印次数" prop="dprintnum">
                      <el-input v-model="forms.dprintnum" type="text" style="width: 400px" />
                    </el-form-item>
                    <el-form-item label="是否有胎盘" prop="dplacenta">
                      <el-select v-model="forms.dplacenta" placeholder="请选择">
                        <el-option label="是" value="是" style="height: 50px" />
                        <el-option label="否" value="否" style="height: 50px" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="胎盘个数预警值(天)" prop="pwarning">
                      <el-input v-model="forms.pwarning" type="text" style="width: 400px" />
                    </el-form-item>
                    <el-form-item label="归集方式" prop="collecmode">
                      <el-select v-model="forms.collecmode" placeholder="请选择">
                        <el-option label="本院产生" value="本院产生" style="height: 50px" />
                        <el-option label="外院收集" value="外院收集" style="height: 50px" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="序号" prop="ordernum">
                      <el-input v-model="forms.ordernum" type="text" style="width: 400px" />
                    </el-form-item>
                    <el-form-item label="科室所在楼号" prop="dfloornum">
                      <el-input v-model="forms.dfloornum" type="text" style="width: 400px" />
                    </el-form-item>
                    <el-form-item label="科室所在楼层" prop="dfloor">
                      <el-input v-model="forms.dfloor" type="text" style="width: 400px" />
                    </el-form-item>
                    <el-form-item label="科室房间" prop="droomNum">
                      <el-input v-model="forms.droomNum" type="text" style="width: 400px" />
                    </el-form-item>
                    <el-form-item label="该科室是否产生医废" prop="dproduce">
                      <el-select v-model="forms.dproduce" placeholder="请选择">
                        <el-option label="是" value="是" style="height: 50px" />
                        <el-option label="否" value="否" style="height: 50px" />
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
                <div />
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="UpsubmitForm('forms')">保存</el-button></span>
              </el-dialog>
              <el-button type="warning" icon="el-icon-edit-outline" round @click="stopToDate(scope.index,scope.row)">禁用</el-button>
              <el-button type="danger" icon="el-icon-edit-outline" round @click="outToDate(scope.index,scope.row)">作废</el-button>
              <el-button type="success" icon="el-icon-shopping-bag-1" round @click="startToDate(scope.index,scope.row)">启用</el-button>
            </div>
            <div v-else />
          </template>
        </el-table-column>
      </el-table>
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
</template>

<script>
import request from '../../utils/request'
export default {
  name: 'Department',
  data() {
    return {
      multipleSelection: [],
      form: {
        dproduce: '',
        droomNum: '',
        dfloor: '',
        dstate: 3,
        dfloornum: '',
        ordernum: '',
        collecmode: '',
        pwarning: '',
        dplacenta: '',
        dprintnum: '',
        depidemic: '',
        num: '',
        kname: '',
        dname: '',
        dcode: '',
        nei: ''
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
        num: '',
        kname: '',
        dname: '',
        dcode: '',
        nei: '',
        value: ''
      },
      rules: {
        dproduce: [{}],
        droomNum: [{}],
        dfloornum: [{}],
        ordernum: [{}],
        dprintnum: [{}],
        depidemic: [{}],
        num: [{}],
        dcode: [{}],
        nei: [{}],
        dfloor: [{}],
        pwarning: [{}],
        // kname: [{ required: true, message: '请输入科室名称(院内)', trigger: 'blur' }],
        dname: [{ required: true, message: '请输入科室名称(院内)', trigger: 'blur' }],
        dplacenta: [{ required: true, message: '请选择该科室是否有胎盘', trigger: 'blur' }],
        collecmode: [{ required: true, message: '请选择该科室的归集方式', trigger: 'blur' }]
      },
      rulesUp: {},
      dialogVisible: false,
      dialogUpVisible: false,
      departmentState: '全部',
      departmentValue: '',
      search: '',
      tableData: [],
      cities: [],
      nowPage: 1,
      pageSize: 5,
      totalCum: 0,
      options: [
        { value: '', label: '全部' },
        { value: '2', label: '启用' },
        { value: '3', label: '禁用' },
        { value: '4', label: '作废' }
      ]
    }
  },
  mounted() {
    initTbl(this, '')
    // guoDate(this)
  },
  methods: {
    openAdd() {
      this.cities.length = 0
      this.dialogVisible = true
      request.post('/department/getKname', {}).then(res => {
        var citiesList = res.list // 这个数组是从后台获得的
        citiesList.forEach(item => {
          const citie = {
            value: item.knum,
            label: item.kname,
            kid: item.kid
          }
          this.cities.push(citie)
        })
      })
    },
    AddsubmitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          request.post('/department/getAdd', this.form).then(res => {
            this.$message.success('增加成功')
            this.dialogVisible = false
            initTbl(this)
          })
        } else {
          alert('1')
          console.log('error submit!!')
          return false
        }
      })
    },
    Addclean(form) {
      this.$refs[form].resetFields()
      this.dialogVisible = false
    },

    upToDate(index, row) {
      this.cities.length = 0
      request.post('/department/getKname', {}).then(res => {
        var citiesList = res.list // 这个数组是从后台获得的
        citiesList.forEach(item => {
          const citie = {
            value: item.knum,
            label: item.kname,
            kid: item.kid
          }
          this.cities.push(citie)
        })
      })

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
    },
    UpsubmitForm(forms) {
      this.$refs[forms].validate((valid) => {
        if (valid) {
          request.post('/department/UpDate', this.forms).then(res => {
            initTbl(this, this.departmentValue)
          }).catch(err => {
            alert(err)
          })
        } else {
          console.log('update error submit!!')
          return false
        }
      })
      this.dialogUpVisible = false
    },
    stopToDate(index, row) {
      if (row.tbldata.dataname === '禁用') {
        this.$message.warning('此科室已经禁用')
      } else {
        this.$confirm('是否禁用此科室?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success('禁用成功!')
          request.get('/department/getUpdate', {
            params: {
              dstate: row.tbldata.dataname,
              did: row.did
            }
          }).then(res => {
            initTbl(this, this.departmentValue)
          }).catch(err => {
            alert(err)
          })
        }).catch(() => {
          this.$message.info('已取消禁用')
        })
      }
    },
    outToDate(index, row) {
      if (row.tbldata.dataname === '作废') {
        this.$message.warning('此科室已经作废')
      } else {
        this.$confirm('是否作废此科室?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success('作废成功!')
          request.get('/department/getOutState', {
            params: {
              dstate: row.tbldata.dataname,
              did: row.did
            }
          }).then(res => {
            initTbl(this, this.departmentValue)
          }).catch(err => {
            alert(err)
          })
        }).catch(() => {
          this.$message.info('已取消作废')
        })
      }
    },
    startToDate(index, row) {
      if (row.tbldata.dataname === '启用') {
        this.$message.warning('此科室已经启用')
      } else {
        this.$confirm('是否启用此科室?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success('启用成功!')
          request.get('/department/getUpdate', {
            params: {
              dstate: row.tbldata.dataname,
              did: row.did
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      initTbl(this, this.departmentValue)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.nowPage = val
      initTbl(this, this.departmentValue)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    selectChange(val) {
      this.departmentValue = val
      initTbl(this, this.departmentValue)
    },
    selectAddGuoChange(val) {
      this.form.kname = val
      console.log(val)
    },
    selectUpdGuoChange(val) {
      this.forms.kname = val
      console.log(val)
    }
  }
}
function initTbl(vue, _dstate) {
  request.post('/department/getdepartmentState', {
    // 当前页
    nowPage: (vue.nowPage - 1) * vue.pageSize,
    pageSize: vue.pageSize,
    // 科室状态
    dstate: _dstate
  }).then(res => {
    vue.tableData = res.list
    vue.totalCum = res.totalCum
  })
}
</script>

<style scoped>

</style>
