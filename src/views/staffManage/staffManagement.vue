<template>
  <div>
    <div class="topDiv">
      <div class="topBtnDiv">
        <template>
          <el-select v-model="statevalue" placeholder="状态" size="mini" style="width: 80px" @change="statechange()">
            <el-option
              v-for="item in stateSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input v-model="inputarr" size="mini" placeholder="请输入关键字搜索" class="input-with-select" style="width: 200px;margin-left: 5px">
            <el-button slot="append" icon="el-icon-search" @click="allsearch" />
          </el-input>
        </template>
      </div>
      <div class="btn_div">
        <el-button type="primary" size="mini" @click="handleAddRole">新增人员</el-button>
      </div>
      <div class="btn_div">
        <el-button type="success" size="mini" @click="allEnable">批量启用</el-button>
      </div>
      <div class="btn_div">
        <el-button type="warning" size="mini" @click="allban">批量禁用</el-button>
      </div>
      <div class="btn_div">
        <el-button type="primary" size="mini" @click="handsure">确认选择</el-button>
      </div>
    </div>
    <div style="float:left;height: 75%;width: 75%;margin-top: 10px">
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
          @select="handleSelect"
          @select-all="selectAll"
        >
          <el-table-column label="序号" type="index" width="50" align="center" />
          <el-table-column type="selection" width="50" align="left" />
          <el-table-column sortable label="状态" prop="sstate" width="80px">
            <template slot-scope="scope">
              {{ scope.row.sstate === 2 ? '启用' : '禁用' }}
            </template>
          </el-table-column>
          <el-table-column sortable label="短号" prop="scornet" width="80px" />
          <el-table-column sortable label="工号" prop="sjobnum" />
          <el-table-column sortable label="姓名" prop="sname" />
          <!-- <el-table-column sortable label="拼音码" prop="spinyin" /> -->
          <el-table-column sortable label="电话" prop="sphone" />
          <el-table-column sortable label="科室" prop="dname" />
          <el-table-column sortable label="角色">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p v-for="(item, i) in scope.row.rolenamelist.slice(1, scope.row.rolenamelist.length)" :key="i" style="text-align: center">{{ item.rolename }}</p>
                <div slot="reference">
                  <span v-for="(item, i) in scope.row.rolenamelist.slice(0,1)" :key="i">{{ item.rolename }}</span>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200px">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope,'form')">修改</el-button>
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
    <!--      对话框弹出-->
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'修改人员':'新增人员'" :before-close="handleClose" width="80%" style="margin-top: -50px">
      <div style="height: 500px">
        <el-form ref="form" :model="form" :inline="true" :rules="rules">
          <!--            左侧栏-->
          <div style="width: 65%;height:75%;float: left">
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="sname">
              <el-input v-model="form.sname" autocomplete="off" style="width: 200px" />
            </el-form-item>
            <el-form-item label="工号" :label-width="formLabelWidth" prop="sjobnum">
              <el-input v-model="form.sjobnum" autocomplete="off" style="width: 200px" />
            </el-form-item>
            <el-form-item label="短号" :label-width="formLabelWidth" prop="scornet">
              <el-input v-model="form.scornet" autocomplete="off" style="width: 200px" />
            </el-form-item>
            <el-form-item label="身份证" :label-width="formLabelWidth" prop="sidentitycard">
              <el-input v-model="form.sidentitycard" autocomplete="off" style="width: 200px" />
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth" prop="sphone">
              <el-input v-model="form.sphone" autocomplete="off" style="width: 200px" />
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth" prop="value">
              <el-select v-model="form.value" multiple placeholder="请选择" style="width: 200px">
                <!--                multiple 关键词 是多选-->
                <el-option
                  v-for="item in options.roleList"
                  :key="item.roleid"
                  :label="item.rolename"
                  :value="item.roleid"
                />
              </el-select>
            </el-form-item>
            <!--                    <el-form-item label="所属医院" :label-width="formLabelWidth">-->
            <!--                      <el-input v-model="form.phsotipal" autocomplete="off" style="width: 200px" />-->
            <!--                    </el-form-item>-->
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
            <el-form-item label="主科室" :label-width="formLabelWidth" prop="depvalue">
              <el-select v-model="form.depvalue" filterable placeholder="请选择" style="width: 200px" @change="depvalueSelect">
                <el-option
                  v-for="item in department"
                  :key="item.did"
                  :label="item.dname"
                  :value="item.did"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="企业微信账户" :label-width="formLabelWidth" prop="wechatnum">
              <el-input v-model="form.wechatnum" autocomplete="off" style="width: 200px" />
            </el-form-item>
            <el-form-item label="电子签名" :label-width="formLabelWidth" prop="uploadFile">
              <el-upload
                ref="upload"
                class="avatar-uploader"
                action="/file/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-change="handlechange"
                :file-list="filelist"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <!-- <el-upload
                ref="upload"
                class="upload-demo"
                drag
                :on-preview="handlePreview"
                :data="{'staffid': uploadid}"
                action="/file/upload"
                multiple
                :auto-upload="false"
                :on-change="handlechange"
                :file-list="filelist"
              >
                <i class="el-icon-upload" />
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload> -->
            </el-form-item>
          </div>
          <!--            右侧栏-->
          <div style="width: 35%;height:75%;float: left;margin-left: -10px;">
            <el-form-item label="附属科室" :label-width="formLabelWidth">
              <div style=" width: 250px;height: 350px;overflow-y:auto">
                <el-tree
                  ref="tree"
                  :data="department"
                  node-key="did"
                  :props="defaultProps"
                  highlight-current
                  show-checkbox
                  @check="getSelectTree"
                />
              </div>
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

    <div style="width: 20%;float: left;margin-left: 1%;height: 30px;margin-top: -30px">
      <div class="btn_div">
        <el-button type="primary" size="mini" @click="allempty">清空</el-button>
      </div>
      <div class="btn_div">
        <el-button type="primary" size="mini" @click="Print">打印</el-button>
      </div>
    </div>
    <div class="rightPrint">
      <div style="height: 90%;width: 97%;margin: auto">
        <!--    右边所选择表格-->
        <el-table :data="multipleSelection" style="width: 100%; overflow-y:auto" :height="tableHeight">
          <!--        <el-table-column label="序号" prop="staffid" />-->
          <el-table-column label="用户工号" prop="sjobnum" />
          <el-table-column label="姓名" prop="sname" />
          <el-table-column align="center" label="操作">
            <template slot-scope="val">
              <el-button type="primary" size="small" @click="choicedelete(val)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>

</template>

<script>

import request from '@/utils/request'
import '../../styles/kLayout.css'
import { getHospitalId } from '@/utils/auth'
import { getOption } from '../../api/qiniu'
export default {
  name: 'Management',
  data() {
    const checkworkid = (rule, value, callback) => {
      const mailReg = /^[A-Za-z0-9]+$/
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的号码'))
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
      hosipital: [],
      imageUrl: '',
      stateSelect: [],
      statevalue: '',
      inputarr: '',
      input: '',
      dialogVisible: false,
      tableData: [],
      nowPage: 1,
      pageSize: 16,
      totalCum: 0,
      pid: '',
      dialogType: 'new',
      index: 0,
      multipleSelection: [],
      options: [],
      department: [],
      defaultProps: {
        children: 'children',
        label: 'dname'
      },
      selectArr: [],
      allSelectArr: [],
      upload: '',
      filelist: [],
      checkedArr: [],
      uploadid: 1,
      form: {
        staffid: '',
        sname: '',
        sjobnum: '',
        scornet: '',
        sidentitycard: '',
        sphone: '',
        wechatnum: '',
        uploadFile: '',
        value: [],
        depvalue: '',
        TreeSelect: [],
        hid: '',
        spwd: ''
      },
      formLabelWidth: '120px',
      rules: {
        sname: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        sjobnum: [
          { required: true, message: '请输入工号', trigger: 'blur' },
          { min: 3, max: 50, message: '字母加数字', trigger: 'blur' },
          { validator: checkworkid, trigger: 'blur', required: true }
        ],
        scornet: [
          // { required: false, message: '请输入短号', trigger: 'blur' },
          { validator: checkcode, trigger: 'blur', required: false }
        ],
        sidentitycard: [
          // { required: false, message: '请输入正确的身份证', trigger: 'blur' },
          { validator: checkcardid, trigger: 'blur', required: false }
        ],
        sphone: [
          // { required: false, message: '电话', trigger: 'blur' },
          { validator: checkphone, trigger: 'blur', required: false }
        ],
        value: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ],
        depvalue: [
          { required: true, message: '请选择主科室', trigger: 'blur' }
        ]
      },
      tableHeight: window.innerHeight * 0.72 // 表格高度
    }
  },
  created() {
    this.tableHeight = window.innerHeight * 0.72 // 表格高度
  },
  mounted() {
    getOption({ dataid: '1' }).then(res => {
      let list = []
      list = res.dataList
      this.stateSelect = list.filter(function(item, index) {
        return item.label !== '作废'
      })
    })
    // 页面创建获取所有科室列表
    setTimeout(() => {
      getDepartment(this)
    }, 300)
    // 页面创建时获取角色列表
    setTimeout(() => {
      getRoles(this)
    }, 300)
    // 初始化页面人员表格
    setTimeout(() => {
      initTbl(this)
    }, 300)
    setTimeout(() => {
      getHospital(this)
    }, 300)
    // var scrollDiv= document.getElementsByClassName("el-select__tags")[0];
    // var element =  document.documentElement;
    if (navigator.userAgent.indexOf('Chrome') > 0) {
      // element = document.body
    }
    document.addEventListener('DOMMouseScroll', this.handleScroll, false)
    window.addEventListener('mousewheel', this.handleScroll, false)
  },
  methods: {
    handleScroll(e) {
      var scrollDiv = document.getElementsByClassName('el-select__tags')[0]
      var detail = e.wheelDelta || e.detail // 判断鼠标是向上滚动还是向下滚动 detail=120 向下 detail=-120 向上
      var moveForwardStep = 1
      var moveBackStep = -1
      var step = 0
      if (detail > 0) {
        step = moveForwardStep * 80
      } else {
        step = moveBackStep * 75
      }
      if (scrollDiv !== null) {
        scrollDiv.scrollLeft += step
      }
    },
    // 主科室选取方法 、 选择主科室后 附属科室将变为不可选择
    depvalueSelect(val) {
      this.form.depvalue = val
      this.department.map((item, index) => {
        if (item.did === this.form.depvalue) {
          this.$set(item, 'disabled', true)
        } else {
          this.$set(item, 'disabled', false)
        }
      })
    },
    // 状态栏改变
    statechange() {
      initTbl(this)
    },
    // 打印按钮功能
    Print() {
      if (this.multipleSelection !== undefined && this.multipleSelection.length > 0) {
        var route = this.$router.resolve({
          name: 'infoQcorde'
        }) // 主要实现存储参数的功能
        const obj = JSON.stringify(this.multipleSelection)
        sessionStorage.setItem('multipleSelection', obj)
        window.open(route.href, '_blank')
      } else {
        this.$message({
          type: 'warning',
          message: '至少选择一个'
        })
      }
    },
    allsearch() { // 搜索方法
      this.nowPage = 1
      this.input = this.inputarr
      initTbl(this)
    },
    // 确定按钮 将表格多选的数据渲染到右边表格
    // 右边表格去重  a.saffid 是第一个表格选中表格行的唯一值  确定后传值到multipleSelection
    // multipleSelection是第二个表格渲染的数据
    handsure() {
      const res = new Map()
      const selectwoArr = this.multipleSelection
      for (let i = 0; i < this.selectArr.length; i++) {
        selectwoArr.push(this.selectArr[i])
      }
      this.multipleSelection = selectwoArr.filter((a) => !res.has(a.staffid) && res.set(a.staffid, 1))
    },
    // 多选框方法 暂时无用
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row)
    //     })
    //   } else {
    //     this.$refs.multipleTable.clearSelection()
    //   }
    // },
    // handleSelectionChange(val) {
    //   if (val.length !== 0) {
    //     this.multipleSelection.push(val[this.index])
    //     this.index = this.index + 1
    //   }
    // },
    // 第一个表格全选方法
    selectAll(selection) {
      // 批量启用禁用数组
      this.allSelectArr = selection
      // this.allSelectArr = selection
      if (selection.length !== -1) {
        // 循环所选放入过滤数组selectArr中
        this.selectArr = selection
        // for (let i = 0; i < selection.length; i++) {
        //   // this.selectArr.push(selection[i])
        // }
      }
      // else {
      //   this.selectArr = []
      // }
    },
    // 表格多选方法
    handleSelect(selection, row) {
      // 批量启用禁用数组
      this.allSelectArr = selection
      this.selectArr = selection
      // const selected = selection.length && selection.indexOf(row) !== -1
      // if (selected) {
      //   // 所选择行放入中间数组
      //   this.selectArr.push(row)
      // }
    },
    // 右表格删除方法
    choicedelete(val) {
      // const array = []
      // for (var i = 0; i < this.multipleSelection.length; i++) {
      //   if (val.row.sjobnum !== this.multipleSelection[i]) {
      //     array.push(this.multipleSelection[i])
      //   }
      // }
      // this.multipleSelection = a=ray
      this.multipleSelection.splice(val.$index, 1)
      // this.selectArr.splice(val.$index, 1)
    },
    // 弹出框右上角X关闭方法
    handleClose(done, formname) {
      this.$confirm('确认关闭？')
        .then(res => {
          this.$refs.upload.clearFiles()
          clearForm(this)
          this.$refs.tree.setCheckedKeys(this.form.TreeSelect)
          // this.$refs[formname].resetFields()
          done()
        })
        .catch(_ => {})
    },
    // 弹出框取消按钮方法
    close(formname) {
      this.$refs[formname].resetFields()
      this.$refs.upload.clearFiles()
      clearForm(this)
      this.$refs.tree.setCheckedKeys(this.form.TreeSelect)
      this.dialogVisible = false
    },
    // 表格修改方法
    handleEdit(val, formname) {
      // 修改标题类型 给弹出框赋值
      this.dialogType = 'edit'
      // 所选角色赋值
      const roleList = []
      for (let i = 0; i < val.row.rolenamelist.length; i++) {
        roleList.push(val.row.rolenamelist[i].roleid)
      }
      this.form.value = roleList
      // 主科室赋值
      this.form.depvalue = val.row.did
      // 附属科室主科室禁选
      this.department.map((item, index) => {
        if (item.did === this.form.depvalue) {
          this.$set(item, 'disabled', true)
        } else {
          this.$set(item, 'disabled', false)
        }
      })

      // 所选人员id赋值
      this.form.staffid = val.row.staffid
      // 名称赋值
      this.form.sname = val.row.sname
      // 身份证赋值
      this.form.sidentitycard = val.row.sidentitycard
      // 工号赋值
      this.form.sjobnum = val.row.sjobnum
      // 短号赋值
      this.form.scornet = val.row.scornet
      // 电话赋值
      this.form.sphone = val.row.sphone
      // 微信赋值
      this.form.wechatnum = val.row.wechatnum
      request.post('person/getPersonDepartment', {
        id: val.row.staffid
      }).then(res => {
        // 附属科室赋值
        this.form.TreeSelect = res.data
        // for (let i = 0; i < res.length; i++) {
        //   this.checkedArr.push(res[i].did)
        // }
        this.$refs.tree.setCheckedKeys(this.form.TreeSelect)
      })
      this.dialogVisible = true
    },
    // 重置密码方法
    restpwd(val) {
      this.$confirm('确定重置密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const password = this.$md5('123456')
        request.post('/person/restpwd', {
          password: password,
          pid: val.row.staffid
        }).then(res => {
          if (res.code > 0) {
            this.$message({
              type: 'success',
              message: '重置密码成功!默认密码为123456'
            })
          } else {
            console.log(res)
          }
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 禁用人员方法
    allban(val) {
      if (this.allSelectArr.length > 0) {
        this.$confirm('确定禁用该人员?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const banselect = []
          for (let i = 0; i < this.allSelectArr.length; i++) {
            banselect.push(this.allSelectArr[i].staffid)
          }
          request.post('/person/personBan', {
            pidarr: banselect
          }).then(res => {
            if (res.code > 0) {
              initTbl(this)
              this.$message({
                type: 'success',
                message: '禁用成功!'
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '至少选择一行'
        })
      }
    },
    // 启用人员方法
    allEnable(val) {
      if (this.allSelectArr.length > 0) {
        this.$confirm('是否要启用该人员?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const Enablearr = []
          for (let i = 0; i < this.allSelectArr.length; i++) {
            Enablearr.push(this.allSelectArr[i].staffid)
          }
          request.post('/person/personEnable', {
            pidarr: Enablearr
          }).then(res => {
            if (res.code > 0) {
              initTbl(this)
              this.$message({
                type: 'success',
                message: '启用成功!'
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '至少选择一行'
        })
      }
    },
    // 新增人员按钮方法
    handleAddRole() {
      // this.$refs[formname].resetFields()
      this.dialogType = 'new'
      this.department.map((item, index) => {
        this.$set(item, 'disabled', false)
      })
      this.dialogVisible = true
    },
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
    getSelectTree(nodeObj, SelectedObj) {
      this.form.TreeSelect = SelectedObj.checkedKeys
    },
    // 弹出框确认方法 根据弹出框类型执行不同方法  文件上传有BUG 未完成 在解决 思路 异步上传文件流和表单数据
    confirmperson(formname) {
      if (this.dialogType === 'new') {
        this.$refs[formname].validate((valid) => {
          if (valid) {
            // 默认密码123456
            const code = '123456'
            this.form.spwd = this.$md5(code)
            if (this.form.hid === undefined || this.form.hid === '') {
              this.form.hid = getHospitalId()
            }
            // this.form.hid = getHospitalId()
            request.post('/person/AddPerson', this.form).then(res => {
              if (res.code > 0) {
                initTbl(this)
                this.uploadid = res
                // this.$refs.upload.submit()
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                })
                clearForm(this)
                this.$refs.tree.setCheckedKeys(this.form.TreeSelect)
                this.$refs[formname].resetFields()
                this.$refs.upload.clearFiles()
                this.dialogVisible = false
              } else {
                this.$message({
                  type: 'warning',
                  message: '添加失败,请联系技术人员'

                })
                this.$refs[formname].resetFields()
                this.dialogVisible = false
              }
            })
          } else {
            clearForm(this)
            this.$refs.tree.setCheckedKeys(this.form.TreeSelect)
            this.$refs[formname].resetFields()
            this.$refs.upload.clearFiles()
            this.department.map((item, index) => {
              this.$set(item, 'disabled', false)
            })
            this.$message({
              type: 'warning',
              message: '填入信息有误'
            })
          }
        })
      } else {
        this.$refs[formname].validate((valid) => {
          if (valid) {
            request.post('/person/UpdataPerson', this.form
            ).then(res => {
              if (res.code > 0) {
                initTbl(this)
                this.uploadid = this.form.staffid
                // this.$refs.upload.submit()
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                })
                clearForm(this)
                this.$refs.tree.setCheckedKeys(this.form.TreeSelect)
                this.$refs[formname].resetFields()
                this.$refs.upload.clearFiles()
                this.dialogVisible = false
              }
            })
          } else {
            clearForm(this)
            this.$refs.tree.setCheckedKeys(this.form.TreeSelect)
            this.$refs[formname].resetFields()
            this.$refs.upload.clearFiles()
            this.department.map((item, index) => {
              this.$set(item, 'disabled', false)
            })
            this.$message({
              type: 'warning',
              message: '填入信息有误'
            })
            clearForm(this)
            this.$refs[formname].resetFields()
            this.dialogVisible = false
          }
        })
      }
    },
    // 文件上传获取文件流方法
    handlechange(res, filelist) {
      // 默认只上传一个文件
      if (filelist.length > 0) {
        this.filelist = [filelist[filelist.length - 1]]
        this.form.uploadFile = filelist[0]
      } else {
        this.form.uploadFile = res
      }
    },
    handlePreview(file) {

    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 右方表格清空方法
    allempty() {
      this.multipleSelection = []
    }
  }
}
// 表格渲染方法
async function initTbl(vue) {
  request.post('/person/getPersonTbl', {
    // 当前页
    page: (vue.nowPage - 1) * vue.pageSize,
    limit: vue.pageSize,
    // 查询数据
    info: vue.input,
    // 表格数据
    // tableData: vue.tableData,
    // 状态
    state: vue.statevalue
  }).then(res => {
    vue.tableData = res.tableData
    vue.totalCum = res.totalCum
  })
}
// 角色列表获取方法
async function getRoles(vue) {
  request.post('/person/findRole', { type: 'getAllrole' }).then(res => {
    vue.options = res
  })
}
// 科室获取方法
async function getDepartment(vue) {
  request.post('/person/getDepartment').then(res => {
    vue.department = res.data
  })
}
async function getHospital(vue) {
  request.post('/person/getHospital').then(res => {
    vue.hosipital = res.hospital
  })
}
// 清空form表单
function clearForm(vue) {
  vue.form.value = []
  vue.form.staffid = ''
  vue.form.scornet = ''
  vue.form.sname = ''
  vue.form.sjobnum = ''
  vue.form.sidentitycard = ''
  vue.form.sphone = ''
  vue.form.wechatnum = ''
  vue.form.uploadFile = ''
  vue.form.depvalue = ''
  vue.form.TreeSelect = []
}
</script>

<style scoped>
.rightPrint{
  width: 20%;
  float: left;
  margin-left: 1%;
  height: 100%;
  margin-top: 10px;
  border: 1px solid #97a8be ;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}
</style>
<style>
.el-select__tags {
  flex-wrap: nowrap;
  overflow: hidden;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

