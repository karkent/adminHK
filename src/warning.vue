<template>
  <div>
    <el-dialog
      title="预警提示"
      :visible.sync="dialogVisible"
      width="1100px"
      style="text-align: center;"
      :before-close="handleClose"
    >
      <div style="height: 350px;width: 100%;margin-top: -15px">
        <el-table
          border
          stripe
          :data="tableData"
          :height="tableHeight"
          :row-style="{height: '40px'}"
          :cell-style="{padding: '0'}"
        >
          <el-table-column label="序号" type="index" width="50" align="center" />
          <!-- <el-table-column sortable label="处理状态" prop="handlestate" :formatter="toStr"></el-table-column>-->
          <el-table-column sortable label="所属院区" prop="hName" />
          <el-table-column sortable label="科室" prop="dName" />
          <el-table-column sortable label="预警类型" prop="dataName" />
          <el-table-column sortable label="未处理数量" prop="waringNum" />
        </el-table>
        <div class="block" style="text-align: center;margin-top: 5px">
          <el-pagination :current-page="nowPage" :page-sizes="[10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCum" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
        <div style="float:right;height: 30px;">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from './utils/auth'
import request from './utils/request'
export default {
  name: 'Warning',
  data() {
    return {
      dialogVisible: false,
      socket: null,
      tableData: [],
      tableHeight: '300px', // 表格高度
      nowPage: 1,
      pageSize: 10,
      totalCum: 0
    }
  },
  mounted() {
    this.tableHeight = '300px' // 表格高度
    this.openSocket(this)
  },
  methods: {
    openSocket(_this) {
      var socket
      if (typeof WebSocket === 'undefined') {
        console.log('您的浏览器不支持WebSocket')
      } else {
        // 实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
        // 等同于socket = new WebSocket("ws://localhost:8888/xxxx/im/25");
        // var socketUrl="${request.contextPath}/im/"+$("#userId").val();

        // var socketUrl ="ws://"+location.host+"/ws/asset";
        // "ws://localhost:9090/ws/asset";
        var socketUrl = 'ws://' + location.hostname + ':9090/ws/asset'
        // if (this.socket != null) {
        //   this.socket.close();
        //   this.socket = null;
        // }
        socket = new WebSocket(socketUrl)
        // 打开事件
        socket.onopen = function() {
        // socket.send("这是来自客户端的消息" + location.href + new Date());
        }
        // 获得消息事件
        socket.onmessage = function(res) {
          // 发现消息进入    开始处理前端触发逻辑
          // console.log(res.data)
          if (res.data === null) return
          var res1 = res.data.split('(F')
          // console.log(res1)
          if (res1 === null || res1.length <= 0 || res1[0] === '连接成功 ') return
          var obj = JSON.parse(res1[0])
          _this.nowPage = 1
          _this.tableData = obj.waringnotesList
          _this.totalCum = obj.totalCum
          if (obj.sign !== 1 || getToken() === null) {

          } else if (obj.sign === 1 && getToken() != null) {
            _this.dialogVisible = true
          }
        }
        // 关闭事件
        socket.onclose = function() {
          // console.log("websocket已关闭");
        }
        // 发生了错误事件
        socket.onerror = function() {
          // console.log("websocket发生了错误");
        }
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    handleSizeChange(val) {
      this.pageSize = val
      initTbl(this)
    },
    handleCurrentChange(val) {
      this.nowPage = val
      initTbl(this)
    },
    init() {
      this.dialogVisible = true
      initTbl(this)
    }
    // toStr() {
    //     return '未处理'
    // }
  }
}
function initTbl(vue) {
  request.post('/dashboard/initWaring', {
    nowPage: (vue.nowPage - 1) * vue.pageSize,
    pageSize: vue.pageSize * vue.nowPage
  }).then(res => {
    vue.tableData = res.waringnotesList
    vue.totalCum = res.totalCum
  })
}
</script>

<style scoped>

</style>
