<template>
  <div>
    <el-form id="selectForm" ref="form" :model="form" size="mini" label-width="150px">
      <div style="width: 50%;height:85%;float: left">
        <div class="one" style="margin-top: 20px">
          <h5 class="h3-header">1.通知方式</h5>
          <el-form-item label="使用通知方式">
            <el-checkbox-group v-model="form.arrnotice">
              <el-checkbox label="手机短信通知" name="type" style="color: black" />
              <el-checkbox label="电子邮件e-mail通知" name="type" style="color: black" />
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div class="one">
          <h5 class="h3-header">2.收集车重量</h5>
          <el-form-item label="收集车重量(KG)">
            <el-input v-model="form.carweight" class="inputclass" />
          </el-form-item>
        </div>
        <div class="one">
          <h5 class="h3-header">3.入库称重允许的误差范围</h5>
          <el-form-item label="允许误差(%)">
            <el-input v-model="form.entererror" class="inputclass" />
          </el-form-item>
        </div>
        <div class="one">
          <h5 class="h3-header">4.收集箱设置</h5>
          <el-form-item label="是否去除箱重量">
            <el-select v-model="form.removeboxkg" placeholder="请选择" size="mini" style="float:left;width: 120px">
              <el-option label="是" value="是" />
              <el-option label="否" value="否" />
            </el-select>
          </el-form-item>
          <el-form-item label="箱重设置(KG)">
            <el-input v-model="form.boxkg" class="inputclass" />
          </el-form-item>
          <el-form-item label="去皮个数">
            <el-input v-model="form.peelnum" class="inputclass" />
          </el-form-item>
        </div>
        <div class="one">
          <h5 class="h3-header" style="margin-top: -5px">5.收集袋设置</h5>
          <el-form-item label="允许误差(%)">
            <el-input v-model="form.bagerror" class="inputclass" />
          </el-form-item>
        </div>
        <div class="one">
          <h5 class="h3-header" style="margin-top: -5px">6.超时设置</h5>
          <el-form-item label="入库超时时间(小时)">
            <el-input v-model="form.enterovertime" class="inputclass" />
          </el-form-item>
          <el-form-item label="交接超时时间(小时)">
            <el-input v-model="form.joinovertime" class="inputclass" />
          </el-form-item>
        </div>
      </div>
      <div style="width: 50%;height:85%;float: left">
        <div class="one" style="margin-top: 20px">
          <h5 class="h3-header">7.预警通知人</h5>
          <div class="left" style="float: left ; width: 50%;height:420px">
            <el-tabs v-model="activeName" type="border-card" style="width: 100%;" @tab-click="handleClick">
              <el-tab-pane name="first" style="height: 340px;overflow:auto">
                <span slot="label" class="fontClass">组织架构</span>
                <el-tree
                  ref="tree1"
                  :data="data1"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="[2, 3]"
                  :default-checked-keys="[5]"
                  :props="defaultProps"
                  @check-change="handleCheckChange"
                />
              </el-tab-pane>
              <el-tab-pane label="角色" name="second" style="height: 340px;overflow:auto">
                <span slot="label" class="fontClass">角色</span>
                <el-tree
                  ref="tree2"
                  :data="data2"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="[2, 3]"
                  :default-checked-keys="[5]"
                  :props="defaultProps"
                  @check-change="handleCheckChange"
                />
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="right" style="float: left; width: 50%;height:410px;border:2px solid #f6f7f8">
            <div style="height: 40px;text-align: center;line-height: 40px;background-color: rgb(245,247,250);">
              已选择的科室、人员、角色
            </div>
            <el-table
              border
              stripe
              :data="multipleSelection"
              style="width: 100%;height: 370px"
              :row-style="{height: '40px'}"
              :cell-style="{padding: '0'}"
            >
              <el-table-column header-align="center" align="center" type="index" label="序号" width="50px" />
              <el-table-column prop="label" label="人员名称" />
              <el-table-column label="操作" width="">
                <template slot-scope="scope">
                  <el-button size="mini" @click="delRow(scope.index,scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-form>
    <div style="width: 100%;height: 15%;text-align: center">
      <el-button type="primary" @click="submitForm('form')">保 存</el-button>
    </div>
  </div>

</template>

<script>
import request from '../../utils/request'
export default {
  name: 'Overweightwarning',
  data() {
    return {
      form: {
        arrnotice: [],
        carweight: '',
        entererror: '',
        removeboxkg: '',
        boxkg: '',
        peelnum: '',
        bagerror: '',
        enterovertime: '',
        joinovertime: ''
      },
      activeName: 'first',
      activeName2: 'second',
      data1: [],
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      multipleSelection: []
    }
  },
  mounted() {
    request.post('/setwarning/gettest').then(res => {
      this.data1 = res.departrmentList
      this.data2 = res.roles
      this.multipleSelection = res.warningStaff
    })
    request.get('/setwarning/config').then(res => {
      this.form = res.data
    })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleCheckChange() {
      // 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
      this.$refs.tree1.getCheckedNodes().forEach((item) => {
        if (!(item.children)) { // 代表没有这个属性
          this.multipleSelection.push(item)
        }
      })
      this.$refs.tree2.getCheckedNodes().forEach((item) => {
        if (!(item.children)) { // 代表没有这个属性
          this.multipleSelection.push(item)
        }
      })
      const res = new Map() // new一个新数组作为去重后的结果
      this.multipleSelection = this.multipleSelection.filter((a) => !res.has(a.staffid) && res.set(a.staffid, 1))
    },
    delRow(index, rows) { // 删除该行
      const array = []
      for (var i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].staffid !== rows.staffid) {
          array.push(this.multipleSelection[i])
        }
      }
      this.multipleSelection = array
    },
    submitForm() {
      if (this.multipleSelection.length <= 0) {
        this.$message({ message: '预警通知人，必须选择一个', type: 'warning' })
      } else {
        this.form['staffArray'] = this.multipleSelection
        request.post('/setwarning/savaWarning', this.form).then(res => {
          this.$message({ message: '保存成功', type: 'success' })
        })
      }
    }
  }
}
</script>

<style scoped>
  .h3-header {
    border-left: 4px solid #1966a7;
    /*向左的参数*/
    padding: 5px 2px;
    /*margin: 20px 50px;*/
    border-bottom: 1px solid #1966a7;
  }
  .one{
    margin: 2px 50px;
    margin-top: -20px;
  }
  .el-form-item{
    margin-top: -16px;
  }
  #selectForm >>> .el-form-item__label{
    color: black;
  }

  .fontClass {
    font-size: 15px;
    color: black;
  }
  .inputclass{
    width: 260px;
  }

</style>
