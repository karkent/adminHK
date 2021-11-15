<template>
  <div style="width: 100%;margin:0 10px 0 1px">
    <div style="float: left;height:500px;margin-top: 10px;width: 560px;border: 1px solid #808080;margin-left: 10px">
      <div>
        <el-input v-model="search" placeholder="请输入关键字搜索" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" />
        </el-input>
      </div>
      <div style="height: 100%">
        <el-table
          :data="tableData.filter(data => !search || (data.rolename.toLowerCase().includes(search.toLowerCase())
            || data.rolecode.toLowerCase().includes(search.toLowerCase())
            || data.rremarks.toLowerCase().includes(search.toLowerCase())
            || data.tbldata.dataname.toLowerCase().includes(search.toLowerCase())))"
          style="width: 100%"
          height="415"
          highlight-current-row
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
          <el-pagination :current-page="nowPage" :page-sizes="[10, 20,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCum" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
    <div style="float: left;height:500px;margin-top: 10px;">
      <div style="float: left;width: 50%;height: 100%">
        <div class="divClass2">
          <div style="background-color: #cee4ed;width:100%;height:20px;margin: auto">
            <span>后台权限</span>
          </div>
          <div class="divClass">
            <el-tree
              ref="tree"
              :data="data"
              show-checkbox
              default-expand-all
              node-key="rid"
              highlight-current
              :props="defaultProps"
              :default-checked-keys="RidArray"
            />
          </div>
          <div style="background-color: #cee4ed;width:100%;height:30px;margin: auto;margin-top: 5px;text-align: center">
            <el-button type="primary" round size="mini" @click="SelectAuthority">确认分配</el-button>
          </div>
        </div>
      </div>
      <div style="float: left;width: 50%;height: 100%">
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
              :default-checked-keys="RidArray2"
            />
          </div>
          <div style="background-color: #cee4ed;width:100%;height:30px;margin: auto;margin-top: 5px;text-align: center">
            <el-button type="primary" round size="mini">确认分配</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--    <div class='buttons' style="margin: auto;text-align: center">-->
    <!--      <el-button @click='getCheckedNodes'>通过 node 获取</el-button>-->
    <!--      <el-button @click='getCheckedKeys'>通过 key 获取</el-button>-->
    <!--      <el-button @click='setCheckedNodes'>通过 node 设置</el-button>-->
    <!--      <el-button @click='setCheckedKeys'>通过 key 设置</el-button>-->
    <!--      <el-button @click='resetChecked'>清空</el-button>-->
    <!--    </div>-->
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  name: 'Distribute',
  data() {
    return {
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
      nowPage: 1,
      pageSize: 5,
      totalCum: 100,
      search: '',
      value1: [],
      value2: [],
      RidArray: [],
      RidArray2: [],
      roleid: ''
    }
  },
  mounted() {
    initTbl(this) // 初始化 角色列表
    request.post('/test/authorityMenu', {
    }).then(res => { // 返回的res 已经是 树形结构的list了
      const mueuTop = [{
        children: res,
        label: '菜单权限',
        rid: 0
      }]
      const mueuTop2 = [{
        children: res,
        label: '手机端权限',
        rid: 0
      }]
      this.data = mueuTop
      this.data2 = mueuTop2
    })
  },
  methods: {
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes())
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys())
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([{
        rid: 5,
        label: '二级 2-1'
      }, {
        rid: 9,
        label: '三级 1-1-1'
      }])
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([])
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
    SelectedColumn(val) { // 选中行事件
      console.log('当前行')
      this.$refs.tree.setCheckedKeys([])
      console.log(val)
      this.roleid = val.roleid
      request.post('/authority/getRoutesId', {
        roleid: val.roleid
      }).then(res => {
        console.log(res)
        this.RidArray = res.RoutesArray
      })
    },
    allSelected() {
      console.log('全选')
    },
    SelectAuthority() {
      request.post('/authority/SelectAuthority', {
        roleid: [this.roleid],
        treeArray: this.$refs.tree.getCheckedKeys()
      }).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
      })
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
    height: 88%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .divClass2 {
    border: 1px solid #808080;
    float: left;
    margin-left:40px;
    width: 200px;
    height: 500px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>
