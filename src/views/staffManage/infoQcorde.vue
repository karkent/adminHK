<template>
  <div>
    <div style="width: 21cm;margin: 0 auto">
      <el-button @click="getpdf()">导出为PDF</el-button>
      <el-button v-print="printObj">打印</el-button>
    </div>
    <div id="printMe" style="width: 21cm;height:auto;margin: 0 auto; display:flex;flex-wrap:wrap;">
      <div
        v-for="(item,index) in selectArr"
        :key="index"
        style="width:180px;height:125px;margin-top: 5px;margin-left: 5px;"
      >
        <!--      <canvas id="1"/>-->
        <!--      <div style="height: 20px;margin: auto;margin-left: 20px">{{item.boxname}}医院名称</div>-->
        <!--      <div style="width: 100px;height: 20px;margin: auto">我是文字</div>-->

        <canvas
          :id="item.staffid"
          class="qrcode"
          style=" width: 5rem!important; height: 5rem!important;"
        />
        <div>
          <div style="margin-right: 5px;">
            姓名: {{ item.sname }} <br>
            工号: {{ item.sjobnum }}
          </div>

        </div>
      </div>
      <!--    <button v-print="'#printMe'">Print local range</button>-->
      <!--    <button @click="getQRCode">11111</button>-->
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
// import request from '@/utils/request'
import htmlToPdf from '@/utils/htmlToPdf'
// import {Base64} from 'js-base64'
export default {
  name: 'InfoQcorde',
  data() {
    return {
      msg: [],
      selectArr: [],
      QRCodeMsg: [],
      info: {
        sname: '',
        staffid: '',
        sjobnum: ''
      },
      printObj: {
        id: 'printMe',
        popTitle: '人员列表'
      }
    }
  },
  created() {
    const obj = sessionStorage.getItem('multipleSelection')
    this.selectArr = JSON.parse(obj)

    for (let i = 0; i < this.selectArr.length; i++) {
      const Base64 = require('js-base64').Base64
      this.info.sname = Base64.encode(this.selectArr[i].sname)
      // this.info.sname = this.selectArr[i].sname
      this.info.staffid = this.selectArr[i].staffid
      this.info.sjobnum = this.selectArr[i].sjobnum
      const obj = JSON.stringify(this.info)
      this.QRCodeMsg.push(obj)
    }
  },
  mounted() {
    // getbase64(this)
    setTimeout(() => {
      getQRCode(this)
    }, 1000)
  },
  methods: {

    getpdf() {
      htmlToPdf.downloadPDF(document.querySelector('#printMe'), '人员信息二维码')
    }
  }
}
async function getbase64(vue) {
  //
  // request.post('/person/getQrcode',
  //   {"select":vue.selectArr}).then(res =>{
  //   vue.msg = res.info
  //   console.log('传输数据源',vue.msg[0])
  // })
}
async function getQRCode(vue) {
  const opts = {
    errorCorrectionLevel: 'H', // 容错级别
    type: 'image/png', // 生成的二维码类型
    quality: 0.3, // 二维码质量
    margin: 2, // 二维码留白边距
    width: 90, // 宽
    height: 90, // 高
    // text: '11111111111', // 二维码内容
    title: '称重标签二维码',
    color: {
      dark: '#333333', // 前景色
      light: '#fff'// 背景色
    }
  }

  for (var i = 0; i < vue.selectArr.length; i++) {
    QRCode.toCanvas(document.getElementById(vue.selectArr[i].staffid), vue.QRCodeMsg[i], opts, function(error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
*{
  font-size: 12px;
}
/*.qrcode{*/
/*  width: 5rem!important;*/
/*  height: 5rem!important;*/
/*}*/
</style>
