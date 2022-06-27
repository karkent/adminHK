<template>
  <div>
    <div class="topDiv">
      <!--      <div class="topBtnDiv">-->
      <!--        <el-select v-model="StateValue" size="mini" placeholder="状态" style="width: 80px" @change="selectChange">-->
      <!--          <el-option-->
      <!--            v-for="item in menuMageStateOptions"-->
      <!--            :key="item.value"-->
      <!--            :label="item.label"-->
      <!--            :value="item.value"-->
      <!--          >-->
      <!--          </el-option>-->
      <!--        </el-select>-->
      <!--        &lt;!&ndash;<el-input-->
      <!--          v-model="searchStr"-->
      <!--          size="mini"-->
      <!--          placeholder="请输入关键字搜索"-->
      <!--          class="input-with-select"-->
      <!--          style="width: 200px;margin-left: 5px">-->
      <!--          <el-button slot="append" icon="el-icon-search" @click="searchSubmit"></el-button>-->
      <!--        </el-input>&ndash;&gt;-->
      <!--      </div>-->
      <div class="btn_div">
        <el-button type="primary" size="mini" @click="addMunedata">新增菜单</el-button>
      </div>
      <div class="btn_div">
        <el-button size="mini" type="success" @click="EnableMenu">批量启用</el-button>
      </div>
      <div class="btn_div">
        <el-button size="mini" type="warning" @click="DisableMenu">批量禁用</el-button>
      </div>
      <div class="btn_div">
        <el-button type="danger" size="mini" @click="delectMenu">批量作废</el-button>
      </div>
    </div>
    <div style="float:left;height: 100%;width: 100%;margin-top: 10px">
      <div style="height: 90%;width: 97%;margin: auto">
        <el-table
          border
          stripe
          :data="tableData"
          :height="tableHeight"
          :row-style="{height: '40px'}"
          :cell-style="{padding: '0'}"
          row-key="rid"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          @select="handleSelect"
          @select-all="selectAll"
        >
          <el-table-column sortable type="index" label="序号" width="50" />
          <el-table-column type="selection" :selectable="checkSelectable" width="50" />
          <el-table-column sortable prop="label" label="菜单名称" />
          <el-table-column sortable prop="tbldata.dataname" label="菜单状态" />
          <el-table-column sortable prop="path" label="路径" />
          <el-table-column sortable prop="component" label="组成部分" />
          <el-table-column sortable prop="rname" label="路由名称" />
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <div v-if="scope.row.rstate !== 4">
                <el-button type="primary" icon="el-icon-edit-outline" size="mini" @click="dialogupdatedata(scope.index,scope.row)">修改</el-button>
              </div>
              <div v-else>
                <el-button size="mini" icon="el-icon-edit-outline" type="primary" disabled @click="dialogupdatedata(scope.index,scope.row)">修改</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    <!--增加菜单-->
    <el-dialog
      title="新增菜单"
      :visible.sync="dialogFormVisible"
      width="40%"
      style="font-size: 18px"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" style="font-size: 18px">
        <el-form-item label="上级菜单名称:" prop="menuValue" style="margin-left: 115px">
          <el-cascader
            v-model="form.menuValue"
            :options="menuValues"
            :props="{ checkStrictly: true, value:'rid', label:'label' }"
            clearable
            style="width: 300px"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="菜单名称:" label-width="215px" prop="label">
          <el-input v-model="form.label" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-form-item label="菜单图标:" label-width="215px" prop="icon">
          <el-select v-model="form.icon" style="width: 300px" placeholder="请选择">
            <el-option label="lock" value="lock" />
            <el-option label="el-icon-circle-plus" value="el-icon-circle-plus" />
            <el-option label="el-icon-setting" value="el-icon-setting" />
            <el-option label="el-icon-s-data" value="el-icon-s-data" />
            <el-option label="el-icon-s-home" value="el-icon-s-home" />
          </el-select>
        </el-form-item>
        <el-form-item label="路径:" label-width="215px" prop="path">
          <el-input v-model="form.path" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-form-item label="组成部分:" label-width="215px" prop="component">
          <el-input v-model="form.component" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-form-item label="路由名称:" label-width="215px" prop="rname">
          <el-input v-model="form.rname" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-input v-model="form.rstate" type="hidden" style="width: 1px" />
      </el-form>
      <div style="margin-top: -20px;float: right">
        <el-button @click="dialogclean('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改-->
    <el-dialog
      title="修改菜单"
      :visible.sync="dialogupdate"
      width="40%"
      style="font-size: 18px"
      :before-close="handleClose"
    >
      <el-form ref="updateform" :model="updateform" :rules="rulesup" style="font-size: 18px">
        <el-input v-model="updateform.rid" type="hidden" style="width: 1px;height: 1px" />
        <el-form-item label="上级菜单名称:" prop="menuValue" style="margin-left: 50px">
          <el-cascader
            v-model="updateform.menuValue"
            :options="menuValues"
            :props="{ checkStrictly: true, value:'rid', label:'label' }"
            clearable
            style="width: 300px"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="菜单名称:" label-width="150px" prop="label">
          <el-input v-model="updateform.label" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-form-item label="路径:" label-width="150px" prop="path">
          <el-input v-model="updateform.path" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-form-item label="组成部分:" label-width="150px" prop="component">
          <el-input v-model="updateform.component" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-form-item label="菜单图标:" label-width="150px" prop="icon">
          <el-select v-model="updateform.icon" style="width: 300px" placeholder="请选择">
            <el-option label="lock" value="lock" />
            <el-option label="el-icon-circle-plus" value="el-icon-circle-plus" />
            <el-option label="el-icon-setting" value="el-icon-setting" />
            <el-option label="el-icon-s-data" value="el-icon-s-data" />
            <el-option label="el-icon-s-home" value="el-icon-s-home" />
          </el-select>
        </el-form-item>
        <el-form-item label="路由名称:" label-width="150px" prop="rname">
          <el-input v-model="updateform.rname" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateForm('updateform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '../../utils/request'
import '../../styles/kLayout.css'
import { getOption } from '../../api/qiniu'
export default {
  name: 'MenuManage',
  data() {
    return {
      menuValues: [],
      routeslist: [],
      selectArr: [],
      ridArry: [],
      searchStr: '',
      sectionValue: '',
      sectionName: [],
      tableData: [],
      nowPage: 1,
      pageSize: 16,
      totalCum: 0,
      dialogFormVisible: false,
      dialogupdate: false,
      form: {
        rname: '',
        menuValue: [],
        path: '',
        component: '',
        label: '',
        icon: '',
        rstate: ''
      },
      updateform: {
        menuValue: '',
        rid: '',
        path: '',
        component: '',
        label: '',
        rname: '',
        icon: ''
      },
      rules: {
        label: [{ required: true, message: '请输入菜单名称', trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' }
        ]
      },
      rulesup: {
        label: [{ required: true, message: '请输入菜单名称', trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' }
        ]
      },
      StateValue: '',
      menuMageStateOptions: [],
      tableHeight: window.innerHeight * 0.72 // 表格高度
    }
  },
  mounted() {
    // chengfurong 2021-12-18
    this.initMenuData()
    // request.post('/test/menuValues', {}).then(res => {
    //   this.menuValues = res.menuValues
    // })
    datatree(this)
    this.tableHeight = window.innerHeight * 0.72 // 表格动态高度，根据屏幕分辨率
    // initTbl(this)
    getOption({ dataid: '1' }).then(res => {
      this.menuMageStateOptions = res.dataList
    })
  },
  methods: {
    checkSelectable(row, index) {
      return row.rstate !== 4
    },
    initMenuData() {
      request.post('/test/menuValues', {}).then(res => {
        this.menuValues = res.menuValues
      })
    },
    handleChange(value) {
    },
    selectAll(selection) { // 第一个表格全选方法
      this.selectArr = selection
      pushSelection(this, selection)
    },
    handleSelect(selection, row) { // 表格多选方法
      this.selectArr = selection
      pushSelection(this, selection)
    },
    EnableMenu() { // 启用状态
      setMenuState(this, 2)
    },
    DisableMenu() { // 禁用状态
      setMenuState(this, 3)
    },
    delectMenu() {
      if (this.ridArry.length > 0) {
        this.$confirm('此操作将永久作废该菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setMenuState(this, 4)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消作废'
          })
        })
      } else {
        this.$message({ message: '必须选择一个', type: 'warning' })
      }
    },
    addMunedata() {
      this.initMenuData()
      this.form.length = 0
      this.dialogFormVisible = true
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          request.post('/test/addMenu', {
            pid: this.form.menuValue[this.form.menuValue.length - 1],
            icon: this.form.icon,
            label: this.form.label,
            path: this.form.path,
            component: this.form.component,
            rname: this.form.rname
          }).then(res => {
            this.dialogFormVisible = false
            this.$refs[form].resetFields()
            datatree(this)
            this.$message({
              message: res.msg,
              type: 'success'
            })
          }).catch(err => {
            this.$message(err)
            this.$refs[form].resetFields()// 清空
          })
        } else {
          return false
        }
      })
    },
    dialogupdatedata(index, row) {
      this.initMenuData()
      this.dialogupdate = true
      this.updateform.menuValue = [row.pid]
      this.updateform.label = row.label
      this.updateform.icon = row.icon
      this.updateform.rname = row.rname
      this.updateform.rid = row.rid
      this.updateform.path = row.path
      this.updateform.component = row.component
    },
    updateForm(updateform) {
      var pid = '0'
      if (this.updateform.menuValue.length === 0) {
        pid = '0'
      } else {
        pid = this.updateform.menuValue[this.updateform.menuValue.length - 1]
      }
      this.updateform['pid'] = pid
      this.$refs[updateform].validate((valid) => {
        if (valid) {
          request.post('/test/setRoutesData', this.updateform).then(res => {
            if (res.sign === '1') {
              this.dialogupdate = false
              datatree(this)
              this.$message({
                message: res.msg,
                type: 'success'
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          }).catch(err => {
            this.$message(err)
            this.$refs[updateform].resetFields()// 清空
          })
        } else {
          return false
        }
      })
    },
    dialogclean(form) {
      this.$refs[form].resetFields()
      this.dialogFormVisible = false
    },
    handleSizeChange(val) {
      this.pageSize = val
      datatree(this)
    },
    handleCurrentChange(val) {
      this.nowPage = val
      datatree(this)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.form = {}
          done()
        })
        .catch(_ => {})
    },
    selectChange(val) { // 状态的下拉框改变值的时候，重载表格
      datatree(this)
    },
    searchSubmit() {
      this.nowPage = 1
      datatree(this)
    }
  }
}
function pushSelection(vue, selection) {
  vue.ridArry = []
  for (var i = 0; i < selection.length; i++) {
    if (selection[i].rstate === 4) {
      // vue.$message({
      //   message: '包含已作废的菜单，该菜单不会被改变',
      //   type: 'warning'
      // })
    } else {
      vue.ridArry.push(selection[i].rid)
    }
  }
}
function setMenuState(vue, rstate) {
  if (vue.ridArry.length > 0) {
    request.post('/test/setRoutesState', {
      ridArry: vue.ridArry,
      rstate: rstate
    }).then(res => {
      vue.$message({
        message: res.msg,
        type: 'success'
      })
      if (res.code === 1) {
        datatree(vue)
      }
    })
  } else {
    vue.$message({ message: '必须选择一个菜单', type: 'warning' })
  }
  vue.ridArry = []
}
function datatree(vue) {
  request.post('/test/authorityMenu', {
    nowPage: (vue.nowPage - 1) * vue.pageSize,
    pageSize: vue.pageSize * vue.nowPage,
    searchStr: vue.searchStr,
    StateValue: vue.StateValue
  }).then(res => {
    vue.tableData = res.routeslist
    vue.totalCum = res.totalCum
  })
}
</script>

<style scoped>

</style>
