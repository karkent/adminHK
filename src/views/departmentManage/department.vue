<template>
  <div>
    <div>
      <div style="float: left;margin-top: 10px">
        &ensp;&ensp;<a style="font-size: 18px">科室状态:</a>
        <el-select v-model="trash" placeholder="请选择" size="small" style="width: 155px">
          <el-option
            v-for="item in tableTow.trashChooes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
            style="height: 50px"
          />
        </el-select>
      </div>
      <div style="float: left;margin-top: 10px">
        &ensp;&ensp;<el-input v-model="trashCode" placeholder="输入科室名称、拼音码查找科室" size="small" style="width: 300px" />
      </div>
      <div style="float: left;margin-top: 5px">
        &ensp;&ensp; <el-button type="primary" icon="el-icon-search" round style="height: 40px">
                       <a>查询</a></el-button>
        <el-button type="success" icon="el-icon-takeaway-box" round @click="dialogVisible = true">增加</el-button>
        <!--        增加隐藏框-->
        <el-dialog
          title="新增科室"
          :visible.sync="dialogVisible"
          width="750px"
          center
          :before-close="handleClose"
        >
          <div class="free-panel-body" style="height: 500px;width: 700px;overflow:scroll">
            <el-form ref="form" :model="form" :rules="rules" label-width="200px">
              <el-form-item label="科室内码" prop="nei">
                <el-input v-model="form.nei" :disabled="true" style="width: 400px" />
              </el-form-item>
              <el-form-item label="科室编码(院内)" prop="dcode">
                <el-input v-model="form.dcode" style="width: 400px" />
              </el-form-item>
              <el-form-item label="科室名称(院内)" prop="dname">
                <el-input v-model="form.dname" style="width: 400px" />
              </el-form-item>
              <el-form-item label="科室编码(国际)" prop="kname">
                <el-input v-model="form.kname" style="width: 400px" />
              </el-form-item>
              <el-form-item label="科室名称(国际)" prop="num">
                <el-input v-model="form.num" style="width: 400px" />
              </el-form-item>
              <el-form-item label="是否涉疫" prop="depidemic">
                <el-select v-model="form.depidemic" placeholder="请选择">
                  <el-option label="是" value="是" style="height: 50px" />
                  <el-option label="否" value="否" style="height: 50px" />
                </el-select>
              </el-form-item>
              <el-form-item label="打印次数" prop="dprintnum">
                <el-input v-model="form.dprintnum" type="text" style="width: 400px" />
              </el-form-item>
              <el-form-item label="是否有胎盘" prop="dplacenta">
                <el-select v-model="form.dplacenta" placeholder="请选择">
                  <el-option label="是" value="是" style="height: 50px" />
                  <el-option label="否" value="否" style="height: 50px" />
                </el-select>
              </el-form-item>
              <el-form-item label="胎盘个数预警值(天)" prop="pwarning">
                <el-input v-model="form.pwarning" type="text" style="width: 400px" />
              </el-form-item>
              <el-form-item label="归集方式" prop="collecmode">
                <el-select v-model="form.collecmode" placeholder="请选择">
                  <el-option label="本院产生" value="本院产生" style="height: 50px" />
                  <el-option label="外院收集" value="外院收集" style="height: 50px" />
                </el-select>
              </el-form-item>
              <el-form-item label="序号" prop="ordernum">
                <el-input v-model="form.ordernum" type="text" style="width: 400px" />
              </el-form-item>
              <el-form-item label="科室所在楼号" prop="dfloornum">
                <el-input v-model="form.dfloornum" type="text" style="width: 400px" />
              </el-form-item>
              <el-form-item label="科室所在楼层" prop="dfloor">
                <el-input v-model="form.dfloor" type="text" style="width: 400px" />
              </el-form-item>
              <el-form-item label="科室房间" prop="droomNum">
                <el-input v-model="form.droomNum" type="text" style="width: 400px" />
              </el-form-item>
              <el-form-item label="该科室是否产生医废" prop="dproduce">
                <el-select v-model="form.dproduce" placeholder="请选择">
                  <el-option label="是" value="是" style="height: 50px" />
                  <el-option label="否" value="否" style="height: 50px" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="Addclean('form')">取 消</el-button>
            <el-button type="primary" @click="AddsubmitForm('form')">确 定</el-button>
          </span>
        </el-dialog>
        <el-button type="success" icon="el-icon-edit-outline" round>初始化导入</el-button>
      </div>
    </div>
    <!--表格数据-->
    <div>
      <el-table
        ref="multipleTable"
        height="600"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          prop="id"
          sortable
          label="序"
          width="100"
        />
        <el-table-column
          type="selection"
          width="50"
        />
        <el-table-column
          sortable
          prop="state"
          label="状态"
          width="180"
        />
        <el-table-column
          sortable
          prop="dname"
          width="180"
          label="科室名称"
        />
        <el-table-column
          sortable
          prop="dcode"
          label="科室编码"
          width="180"
        />
        <el-table-column
          sortable
          prop="kname"
          label="国际科室名称"
          width="180"
        />
        <el-table-column
          sortable
          prop="num"
          label="国际科室编码"
          width="180"
        />
        <el-table-column
          sortable
          prop="pinyin"
          label="拼音码"
          width="180"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-shopping-bag-1" round @click="upToDate(scope.row)">修改</el-button>
            <!--            修改的隐藏框-->
            <el-dialog
              title="修改科室"
              :visible.sync="dialogUpVisible"
              width="750px"
              center
              :before-close="handleClose"
            >
              <div class="free-panel-body" style="height: 500px;width: 700px;overflow:scroll">
                <el-form ref="forms" :model="forms" :rules="rulesUp" label-width="200px">
                  <el-form-item label="科室内码" prop="nei">
                    <el-input v-model="forms.nei" :disabled="true" style="width: 400px" />
                  </el-form-item>
                  <el-form-item label="科室编码(院内)" prop="dcode">
                    <el-input v-model="forms.dcode" style="width: 400px" />
                  </el-form-item>
                  <el-form-item label="科室名称(院内)" prop="dname">
                    <el-input v-model="forms.dname" style="width: 400px" />
                  </el-form-item>
                  <el-form-item label="科室编码(国际)" prop="kname">
                    <el-input v-model="forms.kname" style="width: 400px" />
                  </el-form-item>
                  <el-form-item label="科室名称(国际)" prop="num">
                    <el-input v-model="forms.num" style="width: 400px" />
                  </el-form-item>
                  <el-form-item label="是否涉疫" prop="depidemic">
                    <el-select v-model="forms.depidemic" placeholder="请选择">
                      <el-option label="是" value="是" style="height: 50px" />
                      <el-option label="否" value="否" style="height: 50px" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="打印次数" prop="dprintnum">
                    <el-input v-model="forms.dprintnum" type="text" style="width: 400px" />
                  </el-form-item>
                  <el-form-item label="是否有胎盘" prop="dplacenta">
                    <el-select v-model="forms.dplacenta" placeholder="请选择">
                      <el-option label="是" value="是" style="height: 50px" />
                      <el-option label="否" value="否" style="height: 50px" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="胎盘个数预警值(天)" prop="pwarning">
                    <el-input v-model="forms.pwarning" type="text" style="width: 400px" />
                  </el-form-item>
                  <el-form-item label="归集方式" prop="collecmode">
                    <el-select v-model="forms.collecmode" placeholder="请选择">
                      <el-option label="本院产生" value="本院产生" style="height: 50px" />
                      <el-option label="外院收集" value="外院收集" style="height: 50px" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="序号" prop="ordernum">
                    <el-input v-model="forms.ordernum" type="text" style="width: 400px" />
                  </el-form-item>
                  <el-form-item label="科室所在楼号" prop="dfloornum">
                    <el-input v-model="forms.dfloornum" type="text" style="width: 400px" />
                  </el-form-item>
                  <el-form-item label="科室所在楼层" prop="dfloor">
                    <el-input v-model="forms.dfloor" type="text" style="width: 400px" />
                  </el-form-item>
                  <el-form-item label="科室房间" prop="droomNum">
                    <el-input v-model="forms.droomNum" type="text" style="width: 400px" />
                  </el-form-item>
                  <el-form-item label="该科室是否产生医废" prop="dproduce">
                    <el-select v-model="forms.dproduce" placeholder="请选择">
                      <el-option label="是" value="是" style="height: 50px" />
                      <el-option label="否" value="否" style="height: 50px" />
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="UpsubmitForm('form')">确 定</el-button></span>
            </el-dialog>
            <el-button type="danger" icon="el-icon-edit-outline" round @click="outToDate(scope.row.id)">作废</el-button>
            <el-button type="success" icon="el-icon-shopping-bag-1" round @click="startToDate(scope.row.id)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Department',
  data() {
    return {
      multipleSelection: [],
      form: {
        dproduce: '',
        droomNum: '',
        dfloor: '',
        dfloornum: '',
        ordernum: '',
        collecmode: '',
        pwarning: '',
        dplacenta: '',
        dprintnum: '',
        depidemic: '',
        num: '',
        kname: '',
        dname: '',
        dcode: '',
        nei: ''
      },
      forms: {
        dproduce: '',
        droomNum: '',
        dfloor: '',
        dfloornum: '',
        ordernum: '',
        collecmode: '',
        pwarning: '',
        dplacenta: '',
        dprintnum: '',
        depidemic: '',
        num: '',
        kname: '',
        dname: '',
        dcode: '',
        nei: ''
      },
      rules: {
        dproduce: [{}],
        droomNum: [{}],
        dfloornum: [{}],
        ordernum: [{}],
        dprintnum: [{}],
        depidemic: [{}],
        num: [{}],
        dcode: [{}],
        nei: [{}],
        dfloor: [{}],
        pwarning: [{}],
        kname: [{ required: true, message: '请输入科室名称(院内)', trigger: 'blur' }],
        dname: [{ required: true, message: '请输入科室名称(院内)', trigger: 'blur' }],
        dplacenta: [{ required: true, message: '请选择该科室是否有胎盘', trigger: 'blur' }],
        collecmode: [{ required: true, message: '请选择该科室的归集方式', trigger: 'blur' }]
      },
      rulesUp: {
        ddproduce: [{}],
        droomNum: [{}],
        dfloornum: [{}],
        ordernum: [{}],
        dprintnum: [{}],
        depidemic: [{}],
        num: [{}],
        dcode: [{}],
        nei: [{}],
        dfloor: [{}],
        pwarning: [{}],
        kname: [{ required: true, message: '请输入科室名称(院内)', trigger: 'blur' }],
        dname: [{ required: true, message: '请输入科室名称(院内)', trigger: 'blur' }],
        dplacenta: [{ required: true, message: '请选择该科室是否有胎盘', trigger: 'blur' }],
        collecmode: [{ required: true, message: '请选择该科室的归集方式', trigger: 'blur' }]
      },
      dialogVisible: false,
      dialogUpVisible: false,
      trash: '',
      trashCode: '',
      tableData: [{ id: '1', state: '好', dname: '血液科', dcode: '123123', kname: 'x', num: '1' },
        { id: '2', state: '不好', dname: '肾内科', dcode: '11', kname: 'b', num: '2' },
        { id: '3', state: '很好', dname: '跌打损伤', dcode: '22', kname: 'z', num: '3' }],
      currentPage4: 4,
      tableTow: {
        trashChooes: [{ value: '全部', label: '全部' },
          { value: '正常', label: '正常' },
          { value: '禁用', label: '禁用' }] }
    }
  }
}
</script>

<style scoped>

</style>
