<template>
  <div style="float: left;margin-left: 2%;width: 96%">
    <div style="width: 70%;float: left">
      <!--      搜索栏-->
      <!--    按钮-->
      <el-button type="primary" @click="handleAddRole">新增人员</el-button>
      <!--    表格-->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" prop="staffid" />
        <el-table-column label="状态" prop="sstate">
          <template slot-scope="scope">
            {{ scope.row.sstate === 3 ? '正常' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column label="用户内码" prop="hid" />
        <el-table-column label="用户工号" prop="sjobnum" />
        <el-table-column label="姓名" prop="sname" />
        <el-table-column label="拼音码" prop="spinyin" />
        <el-table-column label="电话" prop="sphone" />
        <el-table-column label="科室" prop="did" />
        <el-table-column label="角色" prop="svaliddate" />
        <el-table-column align="center" label="操作" width="150px">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope,row)">修改</el-button>
            <el-button v-if="scope.row.sstate === 3" type="danger" size="small" @click="handban(scope)">禁用</el-button>
            <el-button v-if="scope.row.sstate === 4" type="danger" size="small" @click="handEnable(scope)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--        分页-->
      <div class="block">
        <el-pagination
          :current-page="nowPage"
          :page-sizes="[50, 100, 200, 500]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCum"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!--      对话框弹出-->
      <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'修改角色':'新增角色'" width="80%">
        <el-form :model="form" :inline="true">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.sname" autocomplete="off" style="width: 200px" />
          </el-form-item>
          <el-form-item label="工号" :label-width="formLabelWidth">
            <el-input v-model="form.sjobnum" autocomplete="off" style="width: 200px" />
          </el-form-item>
          <el-form-item label="短号" :label-width="formLabelWidth">
            <el-input v-model="form.scornet" autocomplete="off" style="width: 200px" />
          </el-form-item>
          <el-form-item label="身份证" :label-width="formLabelWidth">
            <el-input v-model="form.sidentitycard" autocomplete="off" style="width: 200px" />
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.sphone" autocomplete="off" style="width: 200px" />
          </el-form-item>
          <!--          <el-form-item label="所属医院" :label-width="formLabelWidth">-->
          <!--            <el-input v-model="form.phsotipal" autocomplete="off" style="width: 200px" />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="主科室" :label-width="formLabelWidth">-->
          <!--            <el-select v-model="value" filterable placeholder="请选择" style="width: 200px">-->
          <!--              <el-option-->
          <!--                v-for="item in options"-->
          <!--                :key="item.value"-->
          <!--                :label="item.label"-->
          <!--                :value="item.value"-->
          <!--              />-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
          <el-form-item label="企业微信账户" :label-width="formLabelWidth">
            <el-input v-model="form.wechatnum" autocomplete="off" style="width: 200px" />
          </el-form-item>
          <!--          <el-form-item label="账户有效期" :label-width="formLabelWidth">-->
          <!--            <el-input v-model="form.pvisa" autocomplete="off" style="width: 200px" />-->
          <!--          </el-form-item>-->
          <div style="text-align: right">
            <el-button type="danger" @click="dialogVisible=false">取消</el-button>
            <el-button type="primary" @click="confirmperson">确定</el-button>
          </div>
          <!--          <el-form-item label="电子签名" :label-width="formLabelWidth">-->
          <!--            <el-upload-->
          <!--              class="upload-demo"-->
          <!--              drag-->
          <!--              action="https://jsonplaceholder.typicode.com/posts/"-->
          <!--              multiple-->
          <!--            >-->
          <!--              <i class="el-icon-upload" />-->
          <!--              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
          <!--              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
          <!--            </el-upload>-->
          <!--          </el-form-item>-->
        </el-form>
      </el-dialog>
    </div>
    <div style="width: 25%;float: left;margin-left: 20px;margin-top: 36px">
      <!--    表格-->
      <el-table :data="tableData2" style="width: 100%">
        <el-table-column label="序号" prop="staffid" />
        <el-table-column label="用户工号" prop="sjobnum" />
        <el-table-column label="姓名" prop="sname" />
      </el-table>
    </div>
  </div>
</template>

<script>

import request from '@/utils/request'

export default {
  name: 'Management',
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      tableData2: [],
      nowPage: 1,
      pageSize: 50,
      totalCum: 0,
      pid: '',
      dialogType: 'new',
      form: {
        staffid: '',
        sname: '',
        sjobnum: '',
        scornet: '',
        sidentitycard: '',
        sphone: '',
        // phsotipal: '',
        wechatnum: ''
        // pvisa: ''
      },
      formLabelWidth: '120px',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    // this.getRoutes()
    // this.getRoles()
  },
  mounted() {
    initTbl(this)
  },
  methods: {
    handleEdit(val) {
      console.log(val.$index)

      this.dialogType = 'edit'
      this.dialogVisible = true
      // this.dialogType = 'edit'
      // this.dialogVisible = true
      // request.post('/person.personUpdate', {
      //   data: this.form
      // }).then(res => {
      //   if (res === 1) {
      //     initTbl(this)
      //     this.$message({
      //       type: 'success',
      //       message: '禁用成功!'
      //     })
      //   }
      // })
    },
    handban: function(val) {
      this.$confirm('确定禁用该人员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.post('/person/personBan', {
          pid: val.row.staffid
        }).then(res => {
          if (res === 1) {
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
    },
    handEnable(val) {
      this.$confirm('是否要启用该人员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.post('/person/personEnable', {
          pid: val.row.staffid
        }).then(res => {
          if (res === 1) {
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
    },
    handleAddRole() {
      this.dialogType = 'new'
      this.dialogVisible = true
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
    confirmperson(val) {
      if (this.dialogType === 'new') {
        request.post('/person/AddPerson', this.form
        ).then(res => {
          if (res === 1) {
            initTbl(this)
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.dialogVisible = false
          }
        })
      } else {
        this.form.staffid = val.row.staffid
        request.post('/person/UpdataPerson', this.form
        ).then(res => {
          if (res === 1) {
            initTbl(this)
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.dialogVisible = false
          }
        })
      }
    }
  }
}
function initTbl(vue) {
  request.post('/person/getPersonTbl', {
    // 当前页
    nowPage: (vue.nowPage - 1) * vue.pageSize,
    pageSize: vue.pageSize,
    // 表格数据
    tableData: vue.tableData
  }).then(res => {
    vue.tableData = res.tableData
    vue.totalCum = res.totalCum
  })
}
</script>

<style scoped>

</style>
