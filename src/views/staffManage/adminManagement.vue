<template>
  <div>
    <div class="Topdiv" style="margin-top: 10px">
      <div class="topBtnDiv" style="float: left;margin-left: 20px">
        <template>
          <el-select v-model="astate" placeholder="状态" size="mini" style="width: 80px" @change="statechange()">
            <el-option
              v-for="item in stateSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input v-model="inputarr" size="mini" placeholder="请输入姓名搜索" class="input-with-select" style="width: 200px;margin-left: 5px">
            <el-button slot="append" icon="el-icon-search" @click="allsearch" />
          </el-input>
        </template>
      </div>
      <div class="btn_div" style="float: left;margin-left: 20px">
        <el-button type="primary" size="mini" @click="handleAddRole">新增人员</el-button>
      </div>
    </div>
    <div style="float:left;height: 75%;width: 100%;margin-top: 10px">
      <div style="height: 90%;width: 97%;margin: auto">
        <!--    表格-->
        <el-table
          ref="multipleTable"
          border
          stripe
          :data="tableData"
          :height="tableHeight"
          :row-style="{height: '40px'}"
          :cell-style="{padding: '0'}"
        >
          <el-table-column label="序号" type="index" width="50" align="center" />
          <el-table-column type="selection" width="50" align="left" />
          <el-table-column label="状态" prop="astate" width="60px">
            <template slot-scope="scope">
              {{ scope.row.astate === 2 ? '启用' : '禁用' }}
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="aname" />
          <el-table-column label="用户工号" prop="ajobnum" />
          <el-table-column label="电话" prop="aphone" />
          <el-table-column label="医院" prop="tblhospitalinfo.hname" />
          <el-table-column label="角色" prop="tblrole.rolename" />
          <el-table-column align="center" label="操作" width="200px">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope)">修改</el-button>
              <el-button type="danger" size="small" @click="restpwd(scope)">重置密码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--        分页-->
        <div class="block" style="text-align: center;margin-top: 5px">
          <el-pagination
            :current-page="nowPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <!--  :title="dialogType==='edit'?'修改人员':'新增人员'"-->
    <!--  width="80%" style="margin-top: -50px"-->
    <!--        对话框弹出-->
    <div>
      <el-dialog :visible.sync="chiocedilog" :title="dialogType==='edit'?'修改人员':'新增人员'" :before-close="handleClose" width="600px">
        <div style="height: 450px">
          <el-form ref="form" :model="form" :inline="true" :rules="rules">
            <!--            左侧栏-->
            <div style="width: 65%;height:75%;float: left">
              <el-form-item label="姓名" :label-width="formLabelWidth" prop="aname">
                <el-input v-model="form.aname" autocomplete="off" style="width: 200px" />
              </el-form-item>
              <el-form-item label="工号" :label-width="formLabelWidth" prop="ajobnum">
                <el-input v-model="form.ajobnum" autocomplete="off" style="width: 200px" />
              </el-form-item>
              <el-form-item label="短号" :label-width="formLabelWidth" prop="acornet">
                <el-input v-model="form.acornet" autocomplete="off" style="width: 200px" />
              </el-form-item>
              <el-form-item label="身份证" :label-width="formLabelWidth" prop="acardnum">
                <el-input v-model="form.acardnum" autocomplete="off" style="width: 200px" />
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth" prop="aphone">
                <el-input v-model="form.aphone" autocomplete="off" style="width: 200px" />
              </el-form-item>
              <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
                <el-select v-model="form.role" filterable placeholder="请选择" style="width: 200px">
                  <el-option
                    v-for="item in options.roleList"
                    :key="item.roleid"
                    :label="item.rolename"
                    :value="item.roleid"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="所属医院" :label-width="formLabelWidth" prop="hid">
                <el-select v-model="form.hid" filterable placeholder="请选择" style="width: 200px">
                  <el-option
                    v-for="item in hosipital"
                    :key="item.hid"
                    :label="item.hname"
                    :value="item.hid"
                  />
                </el-select>
              </el-form-item>
            </div>
          </el-form>
          <!--          弹出框按钮-->
          <div style="float: left;height: 15%;width: 100%;margin-top: -15px;margin-left: -40px">
            <el-button type="primary" style="float: right;margin-left: 20px" @click="confirmperson('form')">确定</el-button>
            <el-button type="danger" style="float: right" @click="close('form')">取消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { getOption } from '@/api/qiniu'

export default {
  name: 'AdminManagement',
  data() {
    const checkworkid = (rule, value, callback) => {
      const mailReg = /^[A-Za-z0-9]+$/
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的号码,格式为字母加数字'))
        }
      })
    }
    const checkcode = (rule, value, callback) => {
      const mailReg = /^\d+$/
      setTimeout(() => {
        if (mailReg.test(value) || value === '' || value === null) {
          callback()
        } else {
          callback(new Error('只允许输入数字'))
        }
      })
    }
    const checkcardid = (rule, value, callback) => {
      const mailReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
      setTimeout(() => {
        if (mailReg.test(value) || value === '' || value === null) {
          callback()
        } else {
          callback(new Error('证件号码格式有误！'))
        }
      })
    }
    const checkphone = (rule, value, callback) => {
      const mailReg = /^1\d{10}$/
      setTimeout(() => {
        if (mailReg.test(value) || value === '' || value === null) {
          callback()
        } else {
          callback(new Error('手机号格式有误'))
        }
      })
    }
    return {
      inputarr: '',
      tableData: [],
      nowPage: 1,
      pageSize: 10,
      tableHeight: window.innerHeight * 0.72,
      totalCum: 0,
      chiocedilog: false,
      dialogType: '',
      formLabelWidth: '120px',
      form: {
        adminid: '',
        aname: '',
        ajobnum: '',
        acornet: '',
        acardnum: '',
        aphone: '',
        role: '',
        hid: '',
        apwd: ''
      },
      hosipital: [],
      options: [],
      astate: '',
      stateSelect: [],
      statevalue: '',
      rules: {
        aname: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        ajobnum: [
          { required: true, message: '请输入工号', trigger: 'blur' },
          { min: 3, max: 50, message: '长度为3 到 50个字符', trigger: 'blur' },
          { validator: checkworkid, trigger: 'blur', required: true }
        ],
        acornet: [
          // { required: false, message: '请输入短号', trigger: 'blur' },
          { validator: checkcode, trigger: 'blur', required: false }
        ],
        acardnum: [
          // { required: false, message: '请输入正确的身份证', trigger: 'blur' },
          { validator: checkcardid, trigger: 'blur', required: false }
        ],
        aphone: [
          // { required: false, message: '电话', trigger: 'blur' },
          { validator: checkphone, trigger: 'blur', required: false }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ],
        hid: [
          { required: true, message: '请选择主科室', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    getOption({ dataid: '1' }).then(res => {
      let list = []
      list = res.dataList
      this.stateSelect = list.filter(function(item, index) {
        return item.label !== '作废'
      })
    })
    setTimeout(() => {
      initTbl(this)
    }, 300)
    setTimeout(() => {
      getRoles(this)
    }, 300)
    setTimeout(() => {
      getHospital(this)
    }, 300)
  },
  methods: {
    // 分页方法
    handleSizeChange(val) {
      this.selectArr = []
      this.pageSize = val
      initTbl(this)
    },
    handleCurrentChange(val) {
      this.selectArr = []
      this.nowPage = val
      initTbl(this)
    },
    // 新增人员方法
    handleAddRole() {
      this.dialogType = 'new'
      this.chiocedilog = true
    },
    // 修改人员方法
    handleEdit(val) {
      this.form.aname = val.row.aname
      this.form.ajobnum = val.row.ajobnum
      this.form.acornet = val.row.acornet
      this.form.acardnum = val.row.acardnum
      this.form.aphone = val.row.aphone
      this.form.role = val.row.tblrole.roleid
      this.form.hid = val.row.tblhospitalinfo.hid
      this.form.adminid = val.row.adminid
      this.dialogType = 'edit'
      this.chiocedilog = true
    },
    // // 重置密码方法
    restpwd(val) {
      this.$confirm('确定重置密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const password = this.$md5('123456')
        request.post('/person/restAdmin', {
          adminid: val.row.adminid,
          password: password
        }).then(res => {
          if (res.code > 0) {
            this.$message({
              type: 'success',
              message: '重置密码成功!默认密码为123456'
            })
          } else {

          }
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 弹窗关闭方法
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(res => {
          // Form表单清空
          clearForm(this)
          // this.$refs[formname].resetFields()
          done()
        })
        .catch(_ => {})
    },
    // 弹窗确认方法
    confirmperson(formname) {
      // 新增人员
      if (this.dialogType === 'new') {
        this.$refs[formname].validate((valid) => {
          if (valid) {
            const code = '123456'
            this.form.apwd = this.$md5(code)
            request.post('/person/addAdmin', this.form).then(res => {
              if (res.code > 0) {
                initTbl(this)
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                })
                clearForm(this)
                this.chiocedilog = false
              }
            })
          } else {
            clearForm(this)
            this.$refs[formname].resetFields()
            this.$message({
              type: 'warning',
              message: '填入信息有误'
            })
          }
        })
      } else {
        // 修改人员
        this.$refs[formname].validate((valid) => {
          if (valid) {
            request.post('/person/updataAdmin', this.form).then(res => {
              if (res.code > 0) {
                initTbl(this)
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                })
                clearForm(this)
                this.chiocedilog = false
              }
            })
          } else {
            clearForm(this)
            this.$refs[formname].resetFields()
            this.$message({
              type: 'warning',
              message: '填入信息有误'
            })
          }
        })
      }
    },
    close(formname) {
      clearForm(this)
      this.chiocedilog = false
    },
    statechange() {
      initTbl(this)
    },
    allsearch() { // 搜索方法
      this.nowPage = 1

      initTbl(this)
    }
  }
}
async function initTbl(vue) {
  request.post('/person/getadmin', {
    // 当前页
    page: (vue.nowPage - 1) * vue.pageSize,
    limit: vue.pageSize,
    astate: vue.astate,
    info: vue.inputarr
  }).then(res => {
    vue.tableData = res.adminList

    vue.totalCum = res.totalCum
  })
}
async function getRoles(vue) {
  request.post('/person/findRole').then(res => {
    vue.options = res
  })
}
async function getHospital(vue) {
  request.post('/person/getHospital').then(res => {
    vue.hosipital = res.hospital
  })
}

function clearForm(vue) {
  vue.form.adminid = ''
  vue.form.acornet = ''
  vue.form.aname = ''
  vue.form.ajobnum = ''
  vue.form.acardnum = ''
  vue.form.aphone = ''
  vue.form.role = []
  vue.form.hid = ''
}
</script>

<style scoped>

</style>
