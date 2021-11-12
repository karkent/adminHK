<template>
  <div>
    <div style="float: left;margin-top: 5px;margin-left: 15px">
      <el-button type="primary" icon="el-icon-plus" round style="height: 40px" @click="dialogFormVisible = true">新增</el-button>
      <el-dialog :visible.sync="dialogFormVisible" width="900px">
        <span>医院信息</span>
        <span style="margin-left: 410px">默认管理员</span>
        <el-form ref="form" :model="form" :rules="rules">
          <el-container>
            <el-aside width="400px">
              <el-form-item label="医院名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="社会信用代码(组织机构代码)" :label-width="formLabelWidth" prop="code">
                <el-input v-model="form.code" autocomplete="off" />
              </el-form-item>
              <el-form-item label="主要业务" :label-width="formLabelWidth" prop="mainservice">
                <el-input v-model="form.mainservice" type="textarea" autocomplete="off" />
              </el-form-item>
              <el-form-item label="医院地址" :label-width="formLabelWidth" prop="address">
                <el-input v-model="form.address" type="textarea" autocomplete="off" />
              </el-form-item>
              <el-form-item label="授权有效期至" :label-width="formLabelWidth" prop="endtime">
                <el-date-picker v-model="form.endtime" type="datetime" autocomplete="off" />
              </el-form-item>
              <el-form-item label="级别" :label-width="formLabelWidth" prop="level">
                <el-select v-model="form.level" placeholder="请选择级别">
                  <el-option label="一级" value="1" />
                  <el-option label="二级" value="2" />
                  <el-option label="三级" value="3" />
                  <el-option label="未定级" value="0" />
                </el-select>
              </el-form-item>
              <el-form-item label="等次" :label-width="formLabelWidth" prop="rank">
                <el-select v-model="form.rank" placeholder="请选择等次">
                  <el-option label="甲等" value="1" />
                  <el-option label="乙等" value="2" />
                  <el-option label="未定级" value="0" />
                </el-select>
              </el-form-item>
              <el-form-item label="法人代表" :label-width="formLabelWidth" prop="legalperson">
                <el-input v-model="form.legalperson" autocomplete="off" />
              </el-form-item>
              <el-form-item label="法人身份证号" :label-width="formLabelWidth" prop="legalpersonid">
                <el-input v-model="form.legalpersonid" autocomplete="off" />
              </el-form-item>
              <el-form-item label="法人办公电话" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="form.phone" autocomplete="off" />
              </el-form-item>
              <el-form-item label="法人办移动电话" :label-width="formLabelWidth" prop="mobilephone">
                <el-input v-model="form.mobilephone" autocomplete="off" />
              </el-form-item>
              <el-form-item label="行政区划编码" :label-width="formLabelWidth" prop="adcode">
                <el-input v-model="form.adcode" autocomplete="off" />
              </el-form-item>
              <!--      </el-form>-->
            </el-aside>
            <el-aside width="450px">
              <!--        <el-form ref="form" :model="form" :rules="rules">-->
              <el-form-item label="姓名" :label-width="formLabelWidth" prop="adname">
                <el-input v-model="form.adname" autocomplete="off" />
              </el-form-item>
              <el-form-item label="工号" :label-width="formLabelWidth" prop="workid">
                <el-input v-model="form.workid" autocomplete="off" />
              </el-form-item>
              <el-form-item label="身份证" :label-width="formLabelWidth" prop="adid">
                <el-input v-model="form.adid" autocomplete="off" />
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth" prop="pwd">
                <el-input v-model="form.pwd" autocomplete="off" />
              </el-form-item>
              <el-form-item label="密码确认" :label-width="formLabelWidth" prop="checkpwd">
                <el-input v-model="form.checkpwd" autocomplete="off" />
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth" prop="adphone">
                <el-input v-model="form.adphone" autocomplete="off" />
              </el-form-item>
              <el-form-item label="短号" :label-width="formLabelWidth" prop="shortnum">
                <el-input v-model="form.shortnum" autocomplete="off" />
              </el-form-item>
              <el-form-item label="所属角色" :label-width="formLabelWidth" prop="role">
                <el-select v-model="form.role" placeholder="请选择角色">
                  <!--              <el-option label="一级" value="1"></el-option>-->
                  <!--              <el-option v-for="item in typeSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
                </el-select>
              </el-form-item>
            </el-aside>
          </el-container>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="close('form')">取 消</el-button>
          <el-button type="primary" @click="submit('form')">确 定</el-button>
        </div>
      </el-dialog>
      <el-button type="success" icon="el-icon-edit" round style="height: 40px">修改</el-button>
      <el-button type="warning" icon="el-icon-close" round style="height: 40px">禁用</el-button>
      <el-button type="danger" icon="el-icon-delete" round style="height: 40px">作废</el-button>
      <el-button type="success" icon="el-icon-finished" round style="height: 40px">恢复使用</el-button>
    </div>
    <div>
      <el-table
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        :data="this.tableData.slice((this.currPage - 1)*this.pageSize, this.currPage * this.pageSize)"
        style="width: 100%;min-height: 652px;"
        :default-sort="{prop: 'id', order: 'ascending'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          sortable
          prop="hid"
          label="序"
          width="75"
        />
        <el-table-column
          sortable
          prop="hname"
          label="医院名称"
          width="110"
        />
        <el-table-column
          sortable
          prop="huscc"
          label="医院编码(内)"
          width="180"
        />
        <el-table-column
          sortable
          prop="kg"
          label="联系人"
          width="120"
        />
        <el-table-column
          sortable
          prop="heid_name"
          label="联系人电话"
          width="160"
        />
        <el-table-column
          sortable
          prop="section_name"
          label="创建时间"
          width="160"
        />
        <el-table-column
          sortable
          prop="placeNum"
          label="状态"
          width="100"
        />
        <el-table-column
          prop="placeNum"
          label="操作"
          width="150"
        />
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, sizes, total"
        :page-sizes="[ 10, 20]"
        :page-size="pageSize"
        :total="tableData.length"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hospital',
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        level: '',
        code: '',
        mainservice: '',
        address: '',
        endtime: '',
        rank: '',
        legalperson: '',
        legalpersonid: '',
        phone: '',
        mobilephone: '',
        adcode: '',
        adname: '',
        workid: '',
        adid: '',
        pwd: '',
        checkpwd: '',
        adphone: '',
        shortnum: '',
        role: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [{ required: true, message: '请输入医院名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入代码', trigger: 'blur' }],
        mainservice: [{}],
        address: [{}],
        endtime: [{ required: true, message: '请输入有效期', trigger: 'blur' }],
        level: [{ required: true, message: '请输入级别', trigger: 'blur' }],
        rank: [{ required: true, message: '请输入等次', trigger: 'blur' }],
        legalperson: [{ required: true, message: '请输入法人代表', trigger: 'blur' }],
        legalpersonid: [{ required: true, message: '请输入法人身份证号', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入法人办公电话', trigger: 'blur' }],
        mobilephone: [{ required: true, message: '请输入法人移动电话', trigger: 'blur' }],
        adcode: [{ required: true, message: '请输入行政区划编码', trigger: 'blur' }],
        adname: [{ required: true, message: '请输入管理员姓名', trigger: 'blur' }],
        workid: [{ required: true, message: '请输入工号', trigger: 'blur' }],
        adid: [{ required: true, message: '请输入身份证', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        checkpwd: [{ required: true, message: '请输入确认密码', trigger: 'blur' }],
        adphone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        shortnum: [{}],
        role: [{ required: true, message: '请输入角色', trigger: 'blur' }]
      },
      formLabelWidth: '120px',
      tableData: [],
      pageSize: 12,
      currPage: 1,
      typeSelect: []
    }
  },
  methods: {
    handleCurrentChange: function(cPage) {
      this.currPage = cPage
    },
    handleSizeChange: function(val) {
      this.pageSize = val
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.multipleSelection.forEach(item => {
        this.$set(item, 'zdtm', '暂无')
        this.$set(item, 'yq', '暂无')
      })
    },
    close(form) {
      this.dialogFormVisible = false
      this.$refs[form].resetFields()
    },
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.dialogFormVisible = false
          this.$refs[form].resetFields()
        } else {
          this.$message({
            message: '信息尚未填写完整',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>

<style>
  .el-select-dropdown .el-scrollbar .el-scrollbar__wrap{
    overflow: scroll;
  }
</style>
