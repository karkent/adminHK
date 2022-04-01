<template>
  <div>
    <div class="topDiv">
      <div class="topBtnDiv">
        <el-select v-model="StateValue" size="mini" placeholder="状态" style="width: 80px">
          <el-option
            v-for="item in hospitalStateOptions"
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
        <el-button size="mini" type="primary" @click="dialogFormVisible = true">新增医院</el-button>
      </div>
      <div class="btn_div">
        <el-button size="mini" type="success" @click="Enable()">批量启用</el-button>
      </div>
      <div class="btn_div">
        <el-button size="mini" type="warning" @click="Disable()">批量禁用</el-button>
      </div>
      <div class="btn_div">
        <el-button size="mini" type="danger" @click="down()">批量作废</el-button>
      </div>
      <el-dialog title="新增医院" :visible.sync="dialogFormVisible" width="750px" :before-close="handleClose" style="margin-top: -5%">
        <div style="width: 96%;height: 580px;margin-top: -20px;margin-left: 2%">
          <el-form ref="form" class="el-form-1" :model="form" :rules="rules" size="mini">
            <div class="infoDiv">
              <div class="text-div">
                医院信息
              </div>
              <div style="margin-top: 10px">
                <el-form-item label="医院名称" :label-width="formLabelWidth" prop="hname" style="margin-top: 4px">
                  <el-input v-model="form.hname" autocomplete="off" />
                </el-form-item>
                <el-form-item label="社会信用代码" :label-width="formLabelWidth" prop="huscc">
                  <el-input v-model="form.huscc" autocomplete="off" placeholder="组织机构代码" />
                </el-form-item>
                <div style="width:300px">
                  <el-form-item label="主要业务" :label-width="formLabelWidth" prop="hbusiness">
                    <el-input v-model="form.hbusiness" type="textarea" autocomplete="off" />
                  </el-form-item>
                </div>
                <div style="width:300px">
                  <el-form-item label="医院地址" :label-width="formLabelWidth" prop="haddress">
                    <el-input v-model="form.haddress" type="textarea" autocomplete="off" />
                  </el-form-item>
                </div>
                <el-form-item label="授权有效期至" :label-width="formLabelWidth" prop="hwarrantdate">
                  <el-date-picker v-model="form.hwarrantdate" type="datetime" autocomplete="off" />
                </el-form-item>
                <el-form-item label="级别" :label-width="formLabelWidth" prop="hlevel">
                  <el-select v-model="form.hlevel" placeholder="请选择级别">
                    <el-option label="一级" value="一级" />
                    <el-option label="二级" value="二级" />
                    <el-option label="三级" value="三级" />
                    <el-option label="未定级" value="未定级" />
                  </el-select>
                </el-form-item>
                <el-form-item label="等次" :label-width="formLabelWidth" prop="hequalorder">
                  <el-select v-model="form.hequalorder" placeholder="请选择等次">
                    <el-option label="甲等" value="甲等" />
                    <el-option label="乙等" value="乙等" />
                    <el-option label="未定级" value="未定级" />
                  </el-select>
                </el-form-item>
                <el-form-item label="法人代表" :label-width="formLabelWidth" prop="hlegal">
                  <el-input v-model="form.hlegal" autocomplete="off" />
                </el-form-item>
                <el-form-item label="法人身份证号" :label-width="formLabelWidth" prop="hlegalcard">
                  <el-input v-model="form.hlegalcard" autocomplete="off" />
                </el-form-item>
                <el-form-item label="法人办公电话" :label-width="formLabelWidth" prop="hofficephone">
                  <el-input v-model="form.hofficephone" autocomplete="off" />
                </el-form-item>
                <el-form-item label="法人办移动电话" :label-width="formLabelWidth" prop="hmobilephone">
                  <el-input v-model="form.hmobilephone" autocomplete="off" />
                </el-form-item>
                <el-form-item label="行政区划编码" :label-width="formLabelWidth" prop="hcantoncode">
                  <el-input v-model="form.hcantoncode" autocomplete="off" />
                </el-form-item>
              </div>
            </div>
            <div class="infoDiv" style="margin-left: 30px">
              <div class="text-div">
                默认管理员
              </div>
              <div style="margin-top: 10px">
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="aname" style="margin-top: 4px">
                  <el-input v-model="form.aname" autocomplete="off" />
                </el-form-item>
                <el-form-item label="工号" :label-width="formLabelWidth" prop="ajobnum">
                  <el-input v-model="form.ajobnum" autocomplete="off" />
                </el-form-item>
                <el-form-item label="身份证" :label-width="formLabelWidth" prop="acardnum">
                  <el-input v-model="form.acardnum" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="apwd">
                  <el-input v-model="form.apwd" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkpwd">
                  <el-input v-model="form.checkpwd" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth" prop="aphone">
                  <el-input v-model="form.aphone" autocomplete="off" />
                </el-form-item>
                <el-form-item label="短号" :label-width="formLabelWidth" prop="acornet">
                  <el-input v-model="form.acornet" autocomplete="off" />
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth" prop="roleid">
                  <el-select v-model="form.roleid" filterable placeholder="请选择角色">
                    <el-option
                      v-for="item in options"
                      :key="item.roleid"
                      :label="item.rolename"
                      :value="item.roleid"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div style="float: right;margin-top: 30px;margin-right: 15px">
            <el-button @click="close('form')">取 消</el-button>
            <el-button type="primary" @click="submit('form')">确 定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <div style="float:left;height: 100%;width: 100%;margin-top: 10px">
      <div style="height: 90%;width: 97%;margin: auto">
        <!-- 表格部分-->
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
          <el-table-column type="selection" width="50" align="left" :selectable="checkSelectable" />
          <el-table-column sortable prop="hname" label="医院名称" />
          <el-table-column sortable prop="hid" label="医院编码(内)" :formatter="ToRule" />
          <el-table-column sortable prop="hlegal" label="联系人" />
          <el-table-column sortable prop="hmobilephone" label="联系人电话" />
          <el-table-column sortable prop="hinsterdate" label="创建时间" width="180" :formatter="ToStr" />
          <el-table-column sortable prop="tbldata.dataname" label="状态" width="100" />
          <el-table-column align="center" prop="placeNum" label="操作" width="120">
            <template slot-scope="scope">
              <div v-if="scope.row.hstate !== 4">
                <el-button size="mini" type="primary" @click="update(scope.$index, scope.row)">修改</el-button>
                <el-dialog
                  title="修改医院信息"
                  :visible.sync="dialogFormVisible2"
                  width="800px"
                  :before-close="handleClose"
                >
                  <div style="width: 96%;height: 390px;margin-top: -20px;margin-left: 2%">
                    <el-form ref="form2" class="el-form-1" :model="form2" :rules="rules2" size="mini">
                      <div class="infoDiv">
                        <div class="text-div">
                          医院信息
                        </div>
                        <!--                        <el-input v-model="form2.hid" type="hidden" style="width: 1px"/>-->
                        <div style="margin-top: 10px">
                          <el-form-item label="医院名称" :label-width="formLabelWidth" prop="hname">
                            <el-input v-model="form2.hname" autocomplete="off" style="float: left" />
                          </el-form-item>
                          <el-form-item label="社会信用代码" :label-width="formLabelWidth" prop="huscc">
                            <el-input v-model="form2.huscc" autocomplete="off" placeholder="组织机构代码" style="float: left" />
                          </el-form-item>
                          <el-form-item label="主要业务" :label-width="formLabelWidth" prop="hbusiness" style="width: 300px">
                            <el-input
                              v-model="form2.hbusiness"
                              type="textarea"
                              autocomplete="off"
                            />
                          </el-form-item>
                          <el-form-item label="医院地址" :label-width="formLabelWidth" prop="haddress" style="width: 300px">
                            <el-input
                              v-model="form2.haddress"
                              type="textarea"
                              autocomplete="off"
                            />
                          </el-form-item>
                          <el-form-item label="授权有效期至" :label-width="formLabelWidth" prop="hwarrantdate">
                            <el-date-picker
                              v-model="form2.hwarrantdate"
                              type="datetime"
                              autocomplete="off"
                              style="margin-right: 150px"
                            />
                          </el-form-item>
                          <el-form-item label="级别" :label-width="formLabelWidth" prop="hlevel">
                            <el-select v-model="form2.hlevel" placeholder="请选择级别" style="float: left">
                              <el-option label="一级" value="一级" />
                              <el-option label="二级" value="二级" />
                              <el-option label="三级" value="三级" />
                              <el-option label="未定级" value="未定级" />
                            </el-select>
                          </el-form-item>
                          <el-form-item label="等次" :label-width="formLabelWidth" prop="hequalorder">
                            <el-select v-model="form2.hequalorder" placeholder="请选择等次" style="float: left">
                              <el-option label="甲等" value="甲等" />
                              <el-option label="乙等" value="乙等" />
                              <el-option label="未定级" value="未定级" />
                            </el-select>
                          </el-form-item>
                        </div>
                      </div>
                      <div class="infoDiv" style="margin-left: 30px">
                        <div class="text-div">
                          法人信息
                        </div>
                        <div style="margin-top: 10px">
                          <el-form-item label="法人代表" :label-width="formLabelWidth" prop="hlegal">
                            <el-input v-model="form2.hlegal" autocomplete="off" />
                          </el-form-item>
                          <el-form-item label="法人身份证号" :label-width="formLabelWidth" prop="hlegalcard">
                            <el-input v-model="form2.hlegalcard" autocomplete="off" />
                          </el-form-item>
                          <el-form-item label="法人办公电话" :label-width="formLabelWidth" prop="hofficephone">
                            <el-input v-model="form2.hofficephone" autocomplete="off" />
                          </el-form-item>
                          <el-form-item label="法人办移动电话" :label-width="formLabelWidth" prop="hmobilephone">
                            <el-input v-model="form2.hmobilephone" autocomplete="off" />
                          </el-form-item>
                          <el-form-item label="行政区划编码" :label-width="formLabelWidth" prop="hcantoncode">
                            <el-input v-model="form2.hcantoncode" autocomplete="off" />
                          </el-form-item>
                        </div>
                      </div>
                    </el-form>
                    <div style="float: right;margin-top: 30px;margin-right: 15px">
                      <el-button @click="close('form2')">取 消</el-button>
                      <el-button type="primary" @click="submit2('form2')">保 存</el-button>
                    </div>
                  </div>
                </el-dialog>
              </div>
              <div v-else>
                <el-button size="mini" type="primary" disabled @click="update(scope.$index, scope.row)">修改</el-button>
              </div>
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
</template>

<script>
import request from '../../utils/request'
import { dateToStr } from '../../utils/kaihangTool'
import '../../styles/kLayout.css'
import { getOption } from '../../api/qiniu'
export default {
  name: 'Hospital',
  data: function() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkpwd !== '') {
          this.$refs.form.validateField('checkpwd')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.apwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validatehname = (rule, value, callback) => {
      request.post('/hospital/checkhname', {
        hname: this.form.hname
      }).then(res => {
        if (res.sign === 1) {
          callback()
        } else {
          callback(new Error('输入的医院名称已被占用'))
        }
      })
    }
    const validatehname2 = (rule, value, callback) => {
      if (this.passname === this.form2.hname) {
        callback()
      } else {
        request.post('/hospital/checkhname', {
          hname: this.form2.hname
        }).then(res => {
          if (res.sign === 1) {
            callback()
          } else {
            callback(new Error('输入的医院名称已被占用'))
          }
        })
      }
    }
    const checkhuscc = (rule, value, callback) => {
      const mailReg = /^[A-Za-z0-9]+$/
      setTimeout(() => {
        if (mailReg.test(value)) {
          request.post('/hospital/checkhuscc', {
            huscc: this.form.huscc
          }).then(res => {
            if (res.sign === 1) {
              callback()
            } else {
              callback(new Error('输入的社会信用代码已被占用'))
            }
          })
        } else {
          callback(new Error('请输入正确的社会信用代码'))
        }
      })
    }
    const checkhuscc2 = (rule, value, callback) => {
      const mailReg = /^[A-Za-z0-9]+$/
      setTimeout(() => {
        if (mailReg.test(value)) {
          if (this.passscc === this.form2.huscc) {
            callback()
          } else {
            request.post('/hospital/checkhuscc', {
              huscc: this.form2.huscc
            }).then(res => {
              if (res.sign === 1) {
                callback()
              } else {
                callback(new Error('输入的社会信用代码已被占用'))
              }
            })
          }
        } else {
          callback(new Error('请输入正确的社会信用代码'))
        }
      })
    }
    var checkname = (rule, value, callback) => {
      const mailReg = /^[\u4e00-\u9fa5]{0,}$/
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的姓名'))
        }
      })
    }
    const checkworkid = (rule, value, callback) => {
      const mailReg = /^[A-Za-z0-9]+$/
      setTimeout(() => {
        if (mailReg.test(value)) {
          request.post('/hospital/check', {
            ajobnum: this.form.ajobnum
          }).then(res => {
            if (res.sign === 1) {
              callback()
            } else {
              callback(new Error('输入的工号已被占用'))
            }
          })
        } else {
          callback(new Error('请输入正确的号码'))
        }
      })
    }
    var checkcardid = (rule, value, callback) => {
      const mailReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
      setTimeout(() => {
        if (mailReg.test(value) || value === '') {
          callback()
        } else {
          callback(new Error('证件号码格式有误'))
        }
      })
    }
    var checkphone = (rule, value, callback) => {
      const mailReg = /^1\d{10}$/
      setTimeout(() => {
        if (mailReg.test(value) || value === '') {
          if (value === '') {
            callback()
          } else {
            request.post('/hospital/check2', {
              aphone: this.form.aphone
            }).then(res => {
              if (res.sign === 1) {
                callback()
              } else {
                callback(new Error('输入的电话号码已被占用'))
              }
            })
          }
        } else {
          callback(new Error('手机号格式有误'))
        }
      })
    }
    var checkphone2 = (rule, value, callback) => {
      const mailReg = /^1\d{10}$/
      setTimeout(() => {
        if (mailReg.test(value) || value === '') {
          callback()
        } else {
          callback(new Error('手机号格式有误'))
        }
      })
    }
    var checkcode = (rule, value, callback) => {
      const mailReg = /^\d+$/
      setTimeout(() => {
        if (mailReg.test(value) || value === '') {
          callback()
        } else {
          callback(new Error('只允许输入数字'))
        }
      })
    }
    var checkacornet = (rule, value, callback) => {
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
      StateValue: '',
      hidArray: [],
      selectArr: [],
      tableHeight: window.innerHeight * 0.72,
      options: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        hname: '',
        huscc: '',
        hbusiness: '',
        haddress: '',
        hwarrantdate: '',
        hlevel: '',
        hequalorder: '',
        hlegal: '',
        hlegalcard: '',
        hofficephone: '',
        hmobilephone: '',
        hcantoncode: '',
        aname: '',
        ajobnum: '',
        acardnum: '',
        apwd: '',
        checkpwd: '',
        aphone: '',
        acornet: '',
        roleid: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        hname: [{ required: true, message: '请输入医院名称', trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' },
          { validator: validatehname, trigger: 'blur', required: true }],
        huscc: [{ required: true, message: '请输入社会信用代码', trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' },
          { validator: checkhuscc, trigger: 'blur', required: true }],
        hbusiness: [{ max: 50, message: '输入的内容过长', trigger: 'blur' }],
        haddress: [{ max: 30, message: '输入的内容过长', trigger: 'blur' }],
        hwarrantdate: [{ required: true, message: '请输入有效期', trigger: 'blur' }],
        hlevel: [{ required: true, message: '请输入级别', trigger: 'blur' }],
        hequalorder: [{ required: true, message: '请输入等次', trigger: 'blur' }],
        hlegal: [{ required: true, message: '请输入法人代表', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }],
        hlegalcard: [{ required: true, message: '请输入法人身份证号', trigger: 'blur' },
          { validator: checkcardid, trigger: 'blur', required: true }],
        hofficephone: [{ validator: checkphone2, trigger: 'blur' }],
        hmobilephone: [{ required: true, message: '请输入法人移动电话', trigger: 'blur' },
          { validator: checkphone2, trigger: 'blur', required: true }],
        hcantoncode: [{ max: 20, message: '输入的内容过长', trigger: 'blur' },
          { validator: checkcode, trigger: 'blur' }],
        aname: [{ required: true, message: '请输入管理员姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }],
        ajobnum: [{ required: true, message: '请输入工号', trigger: 'blur' },
          { max: 12, message: '输入的内容过长', trigger: 'blur' },
          { validator: checkworkid, trigger: 'blur', required: true }],
        acardnum: [{ validator: checkcardid, trigger: 'blur' }],
        apwd: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }],
        checkpwd: [{ required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur', required: true }],
        aphone: [{ validator: checkphone, trigger: 'blur' }],
        acornet: [{ max: 10, message: '输入的内容过长', trigger: 'blur' },
          { validator: checkacornet, trigger: 'blur' }],
        roleid: [{ required: true, message: '请输入所属角色', trigger: 'blur' }]
      },
      form2: {
        hname: '',
        huscc: '',
        hbusiness: '',
        haddress: '',
        hwarrantdate: '',
        hlevel: '',
        hequalorder: '',
        hlegal: '',
        hlegalcard: '',
        hofficephone: '',
        hmobilephone: '',
        hcantoncode: ''
      },
      rules2: {
        hname: [{ required: true, message: '请输入医院名称', trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' },
          { validator: validatehname2, trigger: 'blur', required: true }],
        huscc: [{ required: true, message: '请输入社会信用代码', trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' },
          { validator: checkhuscc2, trigger: 'blur', required: true }],
        hbusiness: [{ max: 50, message: '输入的内容过长', trigger: 'blur' }],
        haddress: [{ max: 30, message: '输入的内容过长', trigger: 'blur' }],
        hwarrantdate: [{ required: true, message: '请输入有效期', trigger: 'blur' }],
        hlevel: [{ required: true, message: '请输入级别', trigger: 'blur' }],
        hequalorder: [{ required: true, message: '请输入等次', trigger: 'blur' }],
        hlegal: [{ required: true, message: '请输入法人代表', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }],
        hlegalcard: [{ required: true, message: '请输入法人身份证号', trigger: 'blur' },
          { validator: checkcardid, trigger: 'blur', required: true }],
        hofficephone: [{ validator: checkphone2, trigger: 'blur' }],
        hmobilephone: [{ required: true, message: '请输入法人移动电话', trigger: 'blur' },
          { validator: checkphone2, trigger: 'blur', required: true }],
        hcantoncode: [{ max: 20, message: '输入的内容过长', trigger: 'blur' },
          { validator: checkcode, trigger: 'blur' }]
      },
      searchStr: '',
      passname: '',
      passscc: '',
      formLabelWidth: '120px',
      tableData: [],
      nowPage: 1,
      pageSize: 10,
      totalCum: 100,
      typeSelect: [],
      hospitalStateOptions: []
    }
  },
  mounted() {
    // 页面加载初始化的方法
    getRoles(this)
    getOption({ dataid: '1' }).then(res => {
      this.hospitalStateOptions = res.dataList
    })
    this.tableHeight = window.innerHeight * 0.72
    initTbl(this)
  },
  methods: {
    checkSelectable(row, index) {
      return row.hstate !== 4
    },
    searchSubmit() {
      this.nowPage = 1
      initTbl(this)
    },
    // 关闭按钮
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.form = []
          done()
        })
        .catch(_ => {})
    },
    // 修改按钮
    update(index, row) {
      this.dialogFormVisible2 = true
      this.form2.hname = row.hname
      this.passname = row.hname
      this.form2.huscc = row.huscc
      this.passscc = row.huscc
      this.form2.hbusiness = row.hbusiness
      this.form2.haddress = row.haddress
      this.form2.hwarrantdate = row.hwarrantdate
      this.form2.hlevel = row.hlevel
      this.form2.hequalorder = row.hequalorder
      this.form2.hlegal = row.hlegal
      this.form2.hlegalcard = row.hlegalcard
      this.form2.hofficephone = row.hofficephone
      this.form2.hmobilephone = row.hmobilephone
      this.form2.hcantoncode = row.hcantoncode
      this.form2.hid = row.hid
    },
    Disable() {
      setBatchState(this, 3)
    },
    Enable() {
      setBatchState(this, 2)
    },
    down() {
      this.$confirm('此操作将永久废除该医院, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setBatchState(this, 4)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      initTbl(this)
    },
    handleCurrentChange(val) {
      this.nowPage = val
      initTbl(this)
    },
    ToRule(row) {
      var code = row.hid
      if (code % 10 === code) {
        code = '00' + code
      } else if (code % 100 === code) {
        code = '0' + code
      }
      return code
    },
    ToStr(row) {
      return dateToStr(row.hinsterdate)
    },
    close(form) {
      this.dialogFormVisible = false
      this.dialogFormVisible2 = false
      this.$refs[form].resetFields()
    },
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.apwd = this.$md5(this.form.apwd)
          this.form.checkpwd = this.$md5(this.form.checkpwd)
          this.form.hwarrantdate = dateToStr(this.form.hwarrantdate)
          request.post('/hospital/addhosinfo', this.form).then(res => {
            initTbl(this)
            this.dialogFormVisible = false
            this.$refs[form].resetFields()
          })
          this.$message({
            message: '新增成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '信息尚未填写完整',
            type: 'warning'
          })
          return false
        }
      })
    },
    submit2(form2) {
      this.$refs[form2].validate((valid) => {
        if (valid) {
          request.post('/hospital/updatehospital', this.form2).then(res => {
            initTbl(this)
            this.dialogFormVisible2 = false
          })
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '信息尚未填写完整',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 第一个表格全选方法
    selectAll(selection) {
      this.selectArr = selection
      pushSelection(this, selection)
    },
    // 表格多选方法
    handleSelect(selection) {
      this.hidArray = []
      this.selectArr = selection
      pushSelection(this, selection)
    }
  }
}
function initTbl(vue) {
  request.post('/hospital/find', {
    nowPage: (vue.nowPage - 1) * vue.pageSize,
    pageSize: vue.pageSize,
    searchStr: vue.searchStr,
    StateValue: vue.StateValue
  }).then(res => {
    vue.tableData = res.tableData
    vue.totalCum = res.totalCum
  })
}
function getRoles(vue) {
  request.post('/authority/findRole', {
    type: 'getAllrole'
  }).then(res => {
    vue.options = res.roleList
    vue.form.roleid = res.roleList[0].roleid
  })
}
function pushSelection(vue, selection) {
  vue.hidArray = []
  for (var i = 0; i < selection.length; i++) {
    if (selection[i].hstate === 4) {
      // vue.$message({
      //   message: '包含已废除的状态，该状态不会被改变',
      //   type: 'warning'
      // })
      continue
    }
    vue.hidArray.push(selection[i].hid)
  }
}
function setBatchState(vue, state) {
  if (vue.hidArray.length > 0) {
    request.post('/hospital/upstate', {
      hidArray: vue.hidArray,
      hstate: state
    }).then(res => {
      vue.$message({
        message: res.msg,
        type: 'success'
      })
      initTbl(vue)
    })
  } else {
    vue.$message({ message: '必须选择一个', type: 'warning' })
  }
  vue.hidArray = []
}
</script>

<style>
  .el-select-dropdown .el-scrollbar .el-scrollbar__wrap{
    overflow: scroll;
  }
  .el-form-item{
    margin-top: -4px;
  }
  .el-form-1 .el-input{
    width: 180px
  }
  .infoDiv{
    float: left;
    width: 47%;
    border: 1px solid #808080;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
</style>
