<template>
  <div style="width: 100%;margin:0 10px 0 1px">
    <div style="float: left;height:100%;margin-top: 10px;width: 50%;border: 1px solid #808080;margin-left: 10px;border-radius: 4px">
      <div style="margin-left: 5px;margin-top: 5px;width: 80px;float: left">
        <el-select v-model="roleStateValue" size="mini" placeholder="状态" style="width: 80px" @change="selectChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div>
        <div style="margin-left: 5px;margin-top: 5px;width: 200px;float: left">
          <el-input v-model="searchStr" size="mini" placeholder="请输入关键字搜索" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="searchSubmit" />
          </el-input>
        </div>
      </div>
      <!--      表格-->
      <div style="height: 100%;margin-top: 5px">
        <el-table
          v-loading="loading"
          default-expand-all
          :data="tableData"
          style="width: 100%"
          :height="tableHeight"
          highlight-current-row
          :row-style="{height: '40px'}"
          :cell-style="{padding: '0'}"
          @current-change="SelectedColumn"
        >
          <el-table-column
            label="序号"
            type="index"
            width="50"
          />
          <el-table-column label="角色" prop="rolename" width="180" />
          <el-table-column label="角色内码" prop="rolecode" />
          <el-table-column label="状态" prop="tbldata.dataname" />
          <el-table-column label="备注" prop="rremarks" />
        </el-table>
        <div class="block" style="text-align: center;margin-top: 5px">
          <el-pagination :current-page="nowPage" :page-sizes="[10, 20,1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCum" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
    <div style="float: left;height:500px;margin-top: 10px;width: 40%">
      <div style="float: left;width: 48%;height: 100%">
        <div class="divClass2">
          <div class="text-div">
            <i class="el-icon-star-on" />
            后台权限
            <i class="el-icon-star-on" />
          </div>
          <div class="divClass">
            <el-tree
              ref="tree"
              default-expand-all
              :data="data"
              show-checkbox
              node-key="rid"
              highlight-current
              :props="defaultProps"
              :default-checked-keys="RidArray"
            />
          </div>
          <div class="confirmDiv">
            <el-button type="primary" round size="mini" @click="SelectAuthority">确认分配</el-button>
          </div>
        </div>
      </div>
      <div style="float: left;width: 48%;height: 100%;margin-left: 4%">
        <div class="divClass2">
          <div class="text-div">
            <i class="el-icon-star-on" />
            PDA权限
            <i class="el-icon-star-on" />
          </div>
          <div class="divClass">
            <el-tree
              ref="tree2"
              default-expand-all
              :data="data2"
              show-checkbox
              node-key="menuid"
              highlight-current
              :props="defaultProps2"
              :default-checked-keys="RidArray2"
            />
          </div>
          <div class="confirmDiv">
            <el-button type="primary" round size="mini" @click="SelectAuthorityPDA">确认分配</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
import { getOption } from '../../api/qiniu'
import '../../styles/kLayout.css'
import { getAccId, getRoleType } from '../../utils/auth'
export default {
  name: 'Distribute',
  data() {
    return {
      loading: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      data2: [],
      defaultProps2: {
        children: 'children',
        label: 'label'
      },
      tableData: [],
      // nowShowTableData: [],
      nowPage: 1,
      pageSize: 16,
      totalCum: 0,
      value1: [],
      value2: [],
      RidArray: [],
      RidArray2: [],
      roleid: '',
      roleidState: '',
      options: [], // 下拉框和值
      roleStateValue: '',
      searchStr: '', // 搜索框
      tableHeight: window.innerHeight * 0.72 // 表格高度
    }
  },
  mounted() {
    this.tableHeight = window.innerHeight * 0.72 // 表格动态高度，根据屏幕分辨率
    initTbl(this) // 初始化 角色列表
    request.post('/test/authorityMenu', {}).then(res => { // 返回的res 已经是 树形结构的list了
      const mueuTop = [{
        children: res.routeslist,
        label: '菜单权限',
        rid: 0
      }]
      this.data = mueuTop
    })
    request.post('/authority/authorityMenuPDA', {}).then(res => { // 返回的res 已经是 树形结构的list了
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
    getCheckedNodes() {
      // console.log(this.$refs.tree.getCheckedNodes())
    },
    getCheckedKeys() {
      // console.log(this.$refs.tree.getCheckedKeys())
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([])
    },
    handleSizeChange(val) {
      this.pageSize = val
      initTbl(this)
    },
    handleCurrentChange(val) {
      this.nowPage = val
      initTbl(this)
    },
    SelectedColumn(val) { // 选中行事件
      this.$refs.tree.setCheckedKeys([]) // 把tree赋值为空
      this.roleid = val.roleid
      this.roleidState = val.rolestate
      request.post('/authority/getRoutesId', {
        roleid: val.roleid
      }).then(res => {
        this.RidArray = res.RoutesArray // 从后台请求的数据，赋值给tree
      })
      this.$refs.tree2.setCheckedKeys([]) // 把手机端tree赋值为空
      request.post('/authority/getPDAId', {
        roleid: val.roleid
      }).then(res => {
        this.RidArray2 = res.PDAStrArray // 从后台请求的数据，赋值给tree
      })
    },
    SelectAuthority() { // 分配权限的方法
      // var roleid = this.roleid
      var accid = getAccId().trim()
      var roletype = getRoleType().trim()
      if (this.roleid === '1') {
        if (accid === '1' && roletype === 'admin') {
          this.$confirm('确定分配权限给这个角色吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const treeArray = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
            request.post('/authority/SelectAuthority', {
              roleid: [this.roleid],
              treeArray: treeArray // this.$refs.tree.getCheckedKeys()
            }).then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        } else {
          this.$message({
            message: '你没有权限操作，超级管理员',
            type: 'warning'
          })
        }
      } else if (this.roleidState !== 2) {
        this.$message({
          message: '该角色未启用',
          type: 'warning'
        })
      } else {
        this.$confirm('确定分配权限给这个角色吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const treeArray = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
          console.log(treeArray)
          request.post('/authority/SelectAuthority', {
            roleid: [this.roleid],
            treeArray: treeArray // this.$refs.tree.getCheckedKeys()
          }).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
    },
    SelectAuthorityPDA() { // PDA点击确定分配权限
      // var roleid = this.roleid;
      var accid = getAccId().trim()
      var roletype = getRoleType().trim()
      if (this.roleid === '1') {
        if (accid === '1' && roletype === 'admin') {
          this.$confirm('确定分配权限给这个角色吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            request.post('/authority/SelectAuthorityPDA', {
              roleid: [this.roleid],
              treeArray: this.$refs.tree2.getCheckedKeys(false)
            }).then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        } else {
          this.$message({
            message: '你没有权限操作，超级管理员',
            type: 'warning'
          })
        }
      } else if (this.roleidState !== 2) {
        this.$message({
          message: '该角色未启用',
          type: 'warning'
        })
      } else {
        this.$confirm('确定分配权限给这个角色吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request.post('/authority/SelectAuthorityPDA', {
            roleid: [this.roleid],
            treeArray: this.$refs.tree2.getCheckedKeys(false)
          }).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
    },
    searchSubmit() { // 搜索框提交
      this.nowPage = 1 // 从第一页开始
      initTbl(this)
    },
    selectChange(val) { // 状态的下拉框改变值的时候，重载表格
      this.nowPage = 1 // 从第一页开始
      initTbl(this)
    }
  }
}
// function changePage(vue) {  // 前端分页的方法，暂时弃用
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

function initTbl(vue) { // 从后台分页，取到分页数据和一些模糊查询的条件值
  vue.loading = true
  var str = ''
  if (!(vue.roleStateValue === 18)) {
    str = vue.roleStateValue
  }
  request.post('/authority/findRole', {
    nowPage: (vue.nowPage - 1) * vue.pageSize,
    pageSize: vue.pageSize,
    searchStr: vue.searchStr,
    rolestate: str
  }).then(res => {
    vue.tableData = res.roleList
    vue.totalCum = res.totalCum // nowPage = 当前页 pageSize = 一页显示数量  totalCum = 总行数
    // var start = (vue.nowPage - 1) * vue.pageSize
    // var end = vue.pageSize
    // vue.nowShowTableData = vue.tableData.slice(start, end)
    vue.loading = false
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
    height: 88%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    overflow-y:auto
  }
  .divClass2 {
    border: 1px solid #808080;
    float: left;
    margin-left:20px;
    width: 100%;
    height: 500px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
</style>
