<template>
  <div style="float: left;margin-left: 2%;width: 96%">
    <div>
      <!--    按钮-->
      <el-button type="primary" @click="handleAddRole">新增角色</el-button>
      <!--    表格-->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" prop="pid" />
        <el-table-column label="状态" prop="pstate" />
        <el-table-column label="角色名称" prop="pname" />
        <el-table-column label="角色内码" prop="pnum" />
        <el-table-column label="备注" prop="pdic" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope)">编辑权限</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogVisible" title="新增界面">
        <el-form :model="form">
          <el-form-item label="角色名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" style="width: 600px" />
          </el-form-item>
          <el-form-item label="角色描述" :label-width="formLabelWidth">
            <el-input
              v-model="form.desc"
              :autosize="{ minRows: 2, maxRows: 4}"
              type="textarea"
              placeholder="角色描述"
            />
          </el-form-item>
          <el-form-item label="权限菜单" :label-width="formLabelWidth">
            <el-tree
              ref="tree"
              :data="data"
              show-checkbox
              default-expand-all
              node-key="id"
              highlight-current
              :props="defaultProps"
            />
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Management',
  data() {
    return {
      dialogVisible: false,
      input: '',
      form: {
        name: '',
        desc: ''
      },
      formLabelWidth: '100px',
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    // 页面打开时从后台获取所有路由权限跟角色列表
    // this.getRoutes()
    // this.getRoles()
  },
  methods: {
    handleAddRole() {
      this.dialogVisible = true
    }
    // async getRoutes() {
    //   // 定义 常量 res 其值为通过getRoutes() 访问后台获得的所有路由
    //   const res = await getRoutes()
    //   console.log(res)
    //   this.serviceRoutes = res.data
    //   const routes = this.generateRoutes(res.data)
    //   this.routes = this.i18n(routes)
    // },
    // async getRoles() {
    //   const res = await getRoles()
    //   this.rolesList = res.data
    // },
  }
}
// function initTbl(vue) {
//   request.post('/user/getPersonTable', {
//     // 表格数据
//     tableData: vue.tableData,
//     activeName: vue.activeName
//   }).then(res => {
//     vue.tableData = res.tableData
//     vue.totalCum = res.totalCum
//   })
// }
</script>

<style scoped>

</style>
