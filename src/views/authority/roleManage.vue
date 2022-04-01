<template>
  <div>
    <div class="topDiv">
      <div class="topBtnDiv">
        <el-select v-model="roleStateValue" size="mini" placeholder="状态" style="width: 80px" @change="selectChange">
          <el-option
            v-for="item in options"
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
        <el-button type="primary" size="mini" @click="dialogFormVisible = true">新增角色</el-button>
      </div>
      <div class="btn_div">
        <el-button size="mini" type="success" @click="EnableRole">批量启用</el-button>
      </div>
      <div class="btn_div">
        <el-button size="mini" type="warning" @click="DisableRole">批量禁用</el-button>
      </div>
      <div class="btn_div">
        <el-button size="mini" type="danger" @click="deleteRole">批量作废</el-button>
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
          @select="handleSelect"
          @select-all="selectAll"
        >
          <el-table-column label="序号" type="index" width="50" align="center" />
          <el-table-column type="selection" :selectable="checkSelectable" width="50" align="left" />
          <el-table-column sortable label="角色" prop="rolename" />
          <el-table-column sortable label="角色内码" prop="rolecode" />
          <el-table-column sortable label="状态" prop="tbldata.dataname" />
          <el-table-column sortable label="备注" prop="rremarks" />
          <el-table-column
            label="操作"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.rolestate !== 4">
                <el-button
                  size="mini"
                  type="primary"
                  @click="updateRole(scope.$index, scope.row)"
                >修改
                </el-button>
              </div>
              <div v-else>
                <el-button
                  disabled
                  size="mini"
                  type="primary"
                  @click="updateRole(scope.$index, scope.row)"
                >修改
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block" style="text-align: center;margin-top: 5px">
        <el-pagination :current-page="nowPage" :page-sizes="[10, 20,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCum" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
      <el-dialog title="新增角色" :visible.sync="dialogFormVisible" width="900px" style="margin-top: -50px">
        <div style="height: 450px;margin-top: -30px">
          <div class="roleInfo">
            <div class="text-div">角色信息</div>
            <div class="divClass">
              <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" size="mini" class="demo-ruleForm">
                <el-form-item label="角色名称" prop="rolename" style="margin-top: 10px">
                  <el-input v-model="ruleForm.rolename" placeholder="请输入角色名称" style="width: 150px" clearable />
                </el-form-item>
                <el-form-item label="备注" prop="rremarks">
                  <el-input v-model="ruleForm.rremarks" placeholder="请输入备注" style="width: 150px" clearable />
                </el-form-item>
                <el-form-item>
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="SelectAuthority('ruleForm')">确 定</el-button>
                </el-form-item>
              </el-form>
              <div style="width:80%;margin: auto">
                <el-row :gutter="0">
                  <el-col :span="40">
                    <el-card shadow="hover">
                      勾选该角色所需要的权限，点击确认按钮生效。
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="divClass2">
            <div class="text-div">后台权限</div>
            <div class="divClass">
              <el-tree
                ref="tree"
                default-expand-all
                :data="data"
                show-checkbox
                node-key="rid"
                highlight-current
                :props="defaultProps"
              />
            </div>
          </div>
          <div class="divClass2">
            <div class="text-div">PDA权限</div>
            <div class="divClass">
              <el-tree
                ref="tree2"
                default-expand-all
                :data="data2"
                show-checkbox
                node-key="menuid"
                highlight-current
                :props="defaultProps2"
              />
            </div>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="修改角色信息" :visible.sync="updateRoleInfo" width="900px" style="margin-top: -50px">
        <div style="height: 450px;margin-top: -30px">
          <div class="roleInfo">
            <div class="text-div">角色信息</div>
            <div class="divClass">
              <el-form ref="ruleForm" :model="updateform" :rules="rules" label-width="80px" size="mini" class="demo-ruleForm">
                <el-form-item label="角色名称" prop="rolename" style="margin-top: 10px">
                  <el-input v-model="updateform.rolename" placeholder="请输入角色名称" style="width: 150px" clearable />
                </el-form-item>
                <el-form-item label="备注" prop="rremarks">
                  <el-input v-model="updateform.rremarks" placeholder="请输入备注" style="width: 150px" clearable />
                </el-form-item>
                <el-form-item>
                  <el-button @click="updateRoleInfo = false">取 消</el-button>
                  <el-button type="primary" @click="updateFormSubmit('ruleForm')">确 定</el-button>
                </el-form-item>
              </el-form>
              <div style="width:80%;margin: auto">
                <el-row :gutter="0">
                  <el-col :span="40">
                    <el-card shadow="hover">
                      勾选该角色所需要的权限，点击确认按钮生效。
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="divClass2">
            <div class="text-div">后台权限</div>
            <div class="divClass">
              <el-tree
                ref="treeupdate"
                default-expand-all
                :data="data"
                show-checkbox
                node-key="rid"
                highlight-current
                :props="defaultProps"
              />
            </div>
          </div>
          <div class="divClass2">
            <div class="text-div">PDA权限</div>
            <div class="divClass">
              <el-tree
                ref="tree2update"
                default-expand-all
                :data="data2"
                show-checkbox
                node-key="menuid"
                highlight-current
                :props="defaultProps2"
              />
            </div>
          </div>
        </div>
      </el-dialog>
      <!-- <el-dialog
        title="修改角色信息"
        :visible.sync="updateRoleInfo"
        width="28%"
        style="font-size: 18px"
      >
        <div style="width: 98%;height: 150px">
          <div style="float:left;width: 100%;height: 100%">
            <div style="margin-left: -10%">
              <el-form :model="updateform" size="mini">
                <el-form-item label="名称:" label-width="150px" prop="pid">
                  <el-input v-model="updateform.rolename" autocomplete="off" style="width: 180px" />
                </el-form-item>
                <el-form-item label="备注:" label-width="150px">
                  <el-input v-model="updateform.rremarks" autocomplete="off" style="width: 180px" />
                </el-form-item>
              </el-form>
            </div>
            <div style="text-align: center;margin-top: 35px">
              <el-button @click="updateRoleInfo = false">取 消</el-button>
              <el-button type="primary" @click="updateFormSubmit">确 定</el-button>
            </div>
          </div>
        </div>
      </el-dialog> -->
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
import '../../styles/kLayout.css'
import { getOption } from '../../api/qiniu'
export default {
  name: 'RoleManage',
  data() {
    var checkRolename = (rule, value, callback) => {
      const mailReg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的角色名称，不能有非法字符'))
        }
      })
    }
    return {
      options: [],
      roleStateValue: '',
      selectArr: [],
      roleidArray: [],
      tableHeight: window.innerHeight * 0.72, // 表格高度
      tableData: [],
      nowPage: 1,
      pageSize: 10,
      totalCum: 0,
      searchStr: '',
      dialogFormVisible: false,
      updateRoleInfo: false,
      data: [], // 权限数据
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      data2: [], // 权限数据
      defaultProps2: {
        children: 'children',
        label: 'label'
      },
      ruleForm: {
        rolename: '',
        rremarks: ''
      },
      rules: {
        rolename: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { validator: checkRolename, trigger: 'blur' }
        ]
      },
      updateform: { // 修改角色信息弹窗
        rolename: '',
        rremarks: '',
        roleid: '',
        checkedMenus: [],
        checkedPdaMenus: []
      }
    }
  },
  mounted() {
    this.tableHeight = window.innerHeight * 0.72 // 表格动态高度，根据屏幕分辨率
    initTbl(this) // 初始化 角色列表
    request.post('/test/authorityMenu', {
      exceptMstate: 4
    }).then(res => { // 返回的res 已经是 树形结构的list了
      const mueuTop = [{
        children: res.routeslist,
        label: '菜单权限',
        rid: 0
      }]
      this.data = mueuTop
    })
    request.post('/authority/authorityMenuPDA', {
      exceptMstate: 4
    }).then(res => { // 返回的res 已经是 树形结构的list了
      const mueuTop2 = [{
        children: res.PDAlist,
        label: '手机端权限',
        menuid: 0
      }]
      this.data2 = mueuTop2
    })
    getOption({ dataid: '1' }).then(res => {
      this.options = res.dataList
    })
  },
  methods: {
    checkSelectable(row, index) {
      return row.rolestate !== 4
    },
    updateFormSubmit() {
      if (this.updateform.rolename !== '') {
        // console.log(this.$refs['treeupdate'].getHalfCheckedKeys(),
        //   this.$refs['treeupdate'].getCheckedKeys()
        // )
        const treeArray = this.$refs.treeupdate.getCheckedKeys().concat(this.$refs.treeupdate.getHalfCheckedKeys())
        request.post('/authority/updateRoleAndAuthority', {
          rolename: this.updateform.rolename,
          rremarks: this.updateform.rremarks,
          roleid: this.updateform.roleid,
          treeArray: treeArray, // this.$refs['treeupdate'].getCheckedKeys(),
          treeArrayPDA: this.$refs['tree2update'].getCheckedKeys()
        }).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          if (res.code >= 1) {
            initTbl(this)
            this.updateRoleInfo = false
          }
        })
      } else {
        this.$message({
          message: '角色名称不得为空',
          type: 'warning'
        })
      }
    },
    updateRole(index, row) {
      this.updateRoleInfo = true
      request.post('/authority/getMenuIdByRoleId', {
        state: 1,
        roleid: row.roleid
      }).then(res => {
        this.updateform.checkedMenus = res.menuList
        this.updateform.checkedPdaMenus = res.pdaMenuList
        this.$refs['treeupdate'].setCheckedKeys(res.menuList)
        this.$refs['tree2update'].setCheckedKeys(res.pdaMenuList)
        this.updateform.rolename = row.rolename
        this.updateform.rremarks = row.rremarks
        this.updateform.roleid = row.roleid
      }).catch(err => {
        console.log(err)
      })
    },
    EnableRole() {
      setBatchState(this, 2)
    },
    DisableRole() {
      setBatchState(this, 3)
    },
    deleteRole() {
      if (this.roleidArray.length > 0) {
        this.$confirm('此操作将永久废除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request.post('/authority/setBatchState', {
            roleidArray: this.roleidArray,
            rolestate: 4
          }).then(res => {
            this.$message({ message: res.msg, type: 'success' })
            if (res.code === 1) {
              initTbl(this)
            }
            // 不管什么结果，全部清空集合
            this.roleidArray = []
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      } else {
        this.$message({ message: '必须选择一个', type: 'warning' })
        // 不管什么结果，全部清空集合
        this.roleidArray = []
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
    selectAll(selection) { // 第一个表格全选方法
      this.selectArr = selection
      pushSelection(this, selection)
    },
    handleSelect(selection, row) { // 表格多选方法
      this.selectArr = selection
      pushSelection(this, selection)
    },
    SelectAuthority() {
      if (this.ruleForm.rolename !== '') {
        request.post('/authority/getRoleByName', {
          rolename: this.ruleForm.rolename
        }).then(res1 => {
          if (res1 !== undefined && res1.code === 1 && res1.msg === '已经存在!') {
            this.$message({
              message: res1.msg,
              type: 'warning'
            })
          } else {
            const treeArray = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
            request.post('/authority/newRoleAndAuthority', {
              rolename: [this.ruleForm.rolename],
              rremarks: [this.ruleForm.rremarks],
              treeArray: treeArray, // this.$refs.tree.getCheckedKeys(),
              treeArrayPDA: this.$refs.tree2.getCheckedKeys()
            }).then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.ruleForm.rolename = ''
              this.ruleForm.rremarks = ''
              initTbl(this)
              this.dialogFormVisible = false
            })
          }
        })
      } else {
        this.$message({
          message: '角色名不得为空',
          type: 'warning'
        })
      }
    },
    searchSubmit() {
      this.nowPage = 1 // 从第一页开始
      initTbl(this)
    },
    selectChange(val) { // 状态的下拉框改变值的时候，重载表格
      initTbl(this)
    }
  }
}

// function changePage(vue) { 前端分页的方法
//   var start = vue.nowPage * vue.pageSize - vue.pageSize
//   var end = vue.nowPage * vue.pageSize
//   if (vue.tableData.length <= vue.pageSize) {
//     vue.nowShowTableData = vue.tableData
//   } else if ((vue.pageSize * vue.nowPage) >= vue.tableData.length) {
//     vue.nowShowTableData = vue.tableData.slice(start) // >= list的总行数，则执行 这条赋值
//   } else {
//     vue.nowShowTableData = vue.tableData.slice(start, end)
//   }
// }
function pushSelection(vue, selection) { // 将选中的push到roleid数组中
  vue.roleidArray = [] // 每次赋值之前先把集合清空
  for (var i = 0; i < selection.length; i++) {
    if (selection[i].rolestate === 4) {
      // vue.$message({
      //   message: '包含已废除的角色，该角色不会被改变',
      //   type: 'warning'
      // })
    } else {
      vue.roleidArray.push(selection[i].roleid)
    }
  }
}

function setBatchState(vue, setState) {
  if (vue.roleidArray.length > 0) {
    request.post('/authority/setBatchState', {
      roleidArray: vue.roleidArray,
      rolestate: setState
    }).then(res => {
      vue.$message({ message: res.msg, type: 'success' })
      if (res.code === 1) {
        initTbl(vue)
      }
      // 不管什么结果，全部清空集合
      vue.roleidArray = []
    })
  } else {
    vue.$message({ message: '必须选择一个', type: 'warning' })
    // 不管什么结果，全部清空集合
    vue.roleidArray = []
  }
}

function initTbl(vue) {
  var str = ''
  if (!(vue.roleStateValue === 18)) {
    str = vue.roleStateValue
  }
  request.post('/authority/findRole', {
    nowPage: (vue.nowPage - 1) * vue.pageSize,
    pageSize: vue.pageSize,
    searchStr: vue.searchStr,
    rolestate: str,
    isNotAll: 1
  }).then(res => {
    vue.tableData = res.roleList
    vue.totalCum = res.totalCum
  })
}
</script>

<style scoped>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .divClass {
    border: 1px solid #808080;
    width: 95%;
    margin: auto;
    margin-top: 5px;
    height: 92%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    overflow-y:auto
  }
  .divClass2 {
    border: 1px solid #808080;
    float: left;
    margin-left:20px;
    width: 250px;
    height: 450px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  .roleInfo {
    float: left;
    width: 300px;
    height: 450px;
    border: 1px solid #808080;
    border-radius: 10px;
  }
</style>
