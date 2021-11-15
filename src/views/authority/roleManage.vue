<template>
  <div>
    <div>
      <div style="margin-top: 5px;width: 300px;float: left">
        <el-input v-model="search" placeholder="请输入关键字搜索" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" />
        </el-input>
      </div>
    </div>
    <div style="margin-top: 5px;margin-left: 50px;float: left;text-align: center">
      <el-button type="primary" @click="dialogFormVisible = true">新增角色</el-button>
    </div>
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible" width="780px" style="margin-top: -50px">
      <div style="height: 400px;margin-top: -30px">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px" size="mini" class="demo-ruleForm">
          <div style="float: left;width: 300px;height: 400px;border: 1px solid #808080">
            <div style="background-color: #cee4ed;width:100%;height:20px">角色信息</div>
            <div class="divClass">
              <el-form-item label="角色名称" proe="rolename" style="margin-top: 10px">
                <el-input v-model="form.rolename" placeholder="请输入角色名称" style="width: 150px" clearable />
              </el-form-item>
              <el-form-item label="备注" proe="rremarks">
                <el-input v-model="form.rremarks" placeholder="请输入备注" style="width: 150px" clearable />
              </el-form-item>
              <el-form-item>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" round @click="SelectAuthority('ruleForm')">确 定</el-button>
              </el-form-item>
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
            <div style="background-color: #cee4ed;width:100%;height:20px">后台权限</div>
            <div class="divClass">
              <el-tree
                ref="tree"
                :data="data"
                show-checkbox
                default-expand-all
                node-key="rid"
                highlight-current
                :props="defaultProps"
              />
            </div>
          </div>
          <div class="divClass2">
            <div style="background-color: #cee4ed;width:100%;height:20px">PDA权限</div>
            <div class="divClass">
              <el-tree
                ref="tree2"
                :data="data2"
                show-checkbox
                default-expand-all
                node-key="rid"
                highlight-current
                :props="defaultProps2"
              />
            </div>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <div style="height: 500px">
      <el-table
        :data="tableData.filter(data => !search || (data.rolename.toLowerCase().includes(search.toLowerCase())
          || data.rolecode.toLowerCase().includes(search.toLowerCase())
          || data.rremarks.toLowerCase().includes(search.toLowerCase())))"
        style="width: 100%"
        height="415"
      >
        <el-table-column
          type="selection"
          width="50"
        />
        <el-table-column
          label="序号"
          type="index"
          width="50"
        />
        <el-table-column label="角色" prop="rolename" />
        <el-table-column label="角色内码" prop="rolecode" />
        <el-table-column label="状态" prop="tbldata.dataname" />
        <el-table-column
          label="操作"
          align="left"
          width="155"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="EnableRole(scope.$index, scope.row)"
            >启用</el-button>
            <el-button
              type="text"
              size="mini"
              @click="DisableRole(scope.$index, scope.row)"
            >禁用</el-button>
            <el-button
              type="text"
              size="mini"
              @click="updateRole(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
              type="text"
              size="mini"
              @click="deleteRole(scope.$index, scope.row)"
            >作废</el-button>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="rremarks" />
      </el-table>
      <div class="block" style="text-align: center;margin-top: 5px">
        <el-pagination :current-page="nowPage" :page-sizes="[10, 20,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCum" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  name: 'RoleManage',
  data() {
    // var checkRolename = (rule, value, callback) => {
    //   const mailReg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
    //   setTimeout(() => {
    //     if (mailReg.test(value)) {
    //       callback()
    //     } else {
    //       callback(new Error('不允许有非法字符'))
    //     }
    //   })
    // }
    return {
      tableData: [],
      nowPage: 1,
      pageSize: 5,
      totalCum: 100,
      search: '',
      dialogFormVisible: false,
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
      form: {
        rolename: '',
        rremarks: ''
      },
      rules: {
        rolename: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        rremarks: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    initTbl(this) // 初始化 角色列表
    request.post('/test/authorityMenu', {
    }).then(res => { // 返回的res 已经是 树形结构的list了
      const mueuTop = [{
        children: res,
        label: '菜单权限'
      }]
      const mueuTop2 = [{
        children: res,
        label: '手机端权限'
      }]
      this.data = mueuTop
      this.data2 = mueuTop2
    })
  },
  methods: {
    updateRole(index, row) {
      console.log(index, row)
    },
    EnableRole(index, row) {
      request.post('/authority/EnableRole', {
        roleid: row.roleid
      }).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        if (res.code === 1) {
          initTbl(this)
        }
      })
    },
    DisableRole(index, row) {
      request.post('/authority/DisableRole', {
        roleid: row.roleid
      }).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        if (res.code === 1) {
          initTbl(this)
        }
      })
    },
    deleteRole(index, row) {
      request.post('/authority/deleteRole', {
        roleid: row.roleid
      }).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        if (res.code === 1) {
          initTbl(this)
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      initTbl(this)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.nowPage = val
      initTbl(this)
    },
    selectall() {
      console.log('全选')
    },
    SelectAuthority(forform) {
      this.$refs[forform].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // request.post('/authority/newRoleAndAuthority', {
      //   treeArray: this.$refs.tree.getCheckedKeys()
      // }).then(res => {
      //   this.$message({
      //     message: res.msg,
      //     type: 'success'
      //   })
      // })
    }
  }
}
function initTbl(vue) {
  request.post('/authority/findRole', {
    nowPage: vue.nowPage,
    pageSize: vue.pageSize
  }).then(res => {
    console.log('类：', res)
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
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .divClass2 {
    border: 1px solid #808080;
    float: left;
    margin-left:20px;
    width: 200px;
    height: 400px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>
