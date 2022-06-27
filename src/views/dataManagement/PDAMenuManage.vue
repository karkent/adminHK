<template>
  <div>
    <div class="topDiv">
      <!--      <div class="topBtnDiv">-->
      <!--        <el-select v-model="StateValue" size="mini" placeholder="状态" style="width: 80px" @change="selectChange">-->
      <!--          <el-option-->
      <!--            v-for="item in PDAmenuStateOptions"-->
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
        <el-button size="mini" type="success" @click="EnablePDAMenu">批量启用</el-button>
      </div>
      <div class="btn_div">
        <el-button size="mini" type="warning" @click="DisablePDAMenu">批量禁用</el-button>
      </div>
      <div class="btn_div">
        <el-button type="danger" size="mini" @click="delectPDAMenu">批量作废</el-button>
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
          row-key="menuid"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          @select="handleSelect"
          @select-all="selectAll"
        >
          <el-table-column sortable type="index" label="序号" width="50" />
          <el-table-column type="selection" :selectable="checkSelectable" width="50" />
          <el-table-column sortable prop="label" label="菜单名称" />
          <el-table-column sortable prop="tbldata.dataname" label="菜单状态" />
          <el-table-column sortable prop="url" label="路径" />
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <div v-if="scope.row.mstate !== 4">
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
            :options="PDAlist"
            :props="{ checkStrictly: true, value:'menuid', label:'label' }"
            clearable
            style="width: 300px"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="菜单名称:" label-width="215px" prop="label">
          <el-input v-model="form.label" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-form-item label="路径:" label-width="215px" prop="url">
          <el-input v-model="form.url" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-input v-model="form.mstate" type="hidden" style="width: 1px" />
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
        <el-input v-model="updateform.menuid" type="hidden" style="width: 1px;height: 1px" />
        <el-form-item label="上级菜单名称:" prop="menuValue" style="margin-left: 50px">
          <el-cascader
            v-model="updateform.menuValue"
            :options="PDAlist"
            :props="{ checkStrictly: true, value:'menuid', label:'label' }"
            clearable
            style="width: 300px"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="菜单名称:" label-width="150px" prop="label">
          <el-input v-model="updateform.label" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
        <el-form-item label="路径:" label-width="150px" prop="url">
          <el-input v-model="updateform.url" autocomplete="off" placeholder="请输入内容" style="width: 300px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updatePDAmenuForm('updateform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '../../utils/request'
import '../../styles/kLayout.css'
import { getOption } from '../../api/qiniu'
export default {
  name: 'PDAMenuManage',
  data() {
    return {
      PDAlist: [],
      selectArr: [],
      menuidArry: [],
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
        menuValue: [],
        url: '',
        label: '',
        mstate: ''
      },
      updateform: {
        menuValue: [],
        menuid: '',
        url: '',
        label: ''
      },
      rules: {
        label: [{ required: true, message: '请输入PDA菜单名称', trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' }
        ]
      },
      rulesup: {
        label: [{ required: true, message: '请输入PDA菜单名称', trigger: 'blur' },
          { max: 30, message: '输入的内容过长', trigger: 'blur' }
        ]
      },
      StateValue: '',
      PDAmenuStateOptions: [],
      tableHeight: window.innerHeight * 0.72 // 表格高度
    }
  },
  mounted() {
    this.initPdaMenuData()
    // request.post('/authority/authorityMenuPDA', {}).then(res => {
    //   this.PDAlist = res.PDAlist
    // })
    datatree(this)
    this.tableHeight = window.innerHeight * 0.72 // 表格动态高度，根据屏幕分辨率
    getOption({ dataid: '1' }).then(res => {
      this.PDAmenuStateOptions = res.dataList
    })
  },
  methods: {
    checkSelectable(row, index) {
      return row.mstate !== 4
    },
    initPdaMenuData() {
      // map.put("exceptMstate",4);
      request.post('/authority/authorityMenuPDA', {
        exceptMstate: '4'
      }).then(res => {
        this.PDAlist = res.PDAlist
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
    EnablePDAMenu() { // 启用状态
      setPDAMenuState(this, 2)
    },
    DisablePDAMenu() { // 禁用状态
      setPDAMenuState(this, 3)
    },
    delectPDAMenu() {
      if (this.menuidArry.length > 0) {
        this.$confirm('此操作将永久作废该PDA菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          setPDAMenuState(this, 4)
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
      this.initPdaMenuData()
      this.form.length = 0
      this.dialogFormVisible = true
    },
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          request.post('/authority/addPDAmenu', {
            mpid: this.form.menuValue[this.form.menuValue.length - 1],
            label: this.form.label,
            url: this.form.url
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
      this.initPdaMenuData()
      this.dialogupdate = true
      this.updateform.menuValue = [row.mpid]
      this.updateform.label = row.label
      this.updateform.url = row.url
      this.updateform.menuid = row.menuid
    },
    updatePDAmenuForm(updateform) {
      var pid = '0'
      if (this.updateform.menuValue.length === 0) {
        pid = '0'
      } else {
        pid = this.updateform.menuValue[this.updateform.menuValue.length - 1]
      }
      this.updateform['pid'] = pid
      this.$refs[updateform].validate((valid) => {
        if (valid) {
          request.post('/authority/setPDAmenuData', this.updateform).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.dialogupdate = false
            datatree(this)
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
  vue.menuidArry = []
  // let isShow = false
  for (var i = 0; i < selection.length; i++) {
    if (selection[i].mstate === 4) {
      // isShow = true
    } else {
      vue.menuidArry.push(selection[i].menuid)
    }
  }
  // if (isShow) {
  //   vue.$message({
  //     message: '包含已作废的PDA菜单，该PDA菜单不会被改变',
  //     type: 'warning'
  //   })
  // }
}
function setPDAMenuState(vue, mstate) { // 修改状态
  if (vue.menuidArry.length > 0) {
    request.post('/authority/setPDAmenuState', {
      menuidArry: vue.menuidArry,
      mstate: mstate
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
    vue.$message({ message: '必须选择一个PDA菜单', type: 'warning' })
  }
  vue.menuidArry = []
}
function datatree(vue) {
  request.post('/authority/authorityMenuPDA', {
    // 当前页
    nowPage: (vue.nowPage - 1) * vue.pageSize,
    pageSize: vue.pageSize * vue.nowPage,
    searchStr: vue.searchStr,
    StateValue: vue.StateValue
  }).then(res => {
    vue.tableData = res.PDAlist
    vue.totalCum = res.totalCum
  })
}
</script>

<style scoped>

</style>
