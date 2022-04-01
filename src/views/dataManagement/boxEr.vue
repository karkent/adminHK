<template>
  <div>
    <div style="width: 21cm;margin: 0 auto">
      <el-button @click="getpdf()">导出为PDF</el-button>
      <el-button v-print="'printMe'">打印</el-button>
    </div>
    <div id="printMe" style="width: 21cm;height: 29.7cm;margin: 0 auto;">
      <div v-for="(item,index) in this.selectArr" :key="index" style="width:180px;height:105px;float: left;text-align: center;margin-top: 5px;margin-left: 5px">
        <div style="margin: auto;margin-top: 5px">{{ item.tblhospitalinfo.hname }}</div>
        <div style="float: left">
          <canvas :id="item.boxid" style="text-align: center;float: left" />
        </div>
        <div style="float: left;margin-top: 10px">
          <!--        <div>医废周转箱</div>-->
          <!--        <div>厦门大学附属第一医院</div>-->
          <div>医废周转箱</div>
          <div>{{ item.boxcode }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import request from '../../utils/request'
import htmlToPdf from '@/utils/htmlToPdf'
export default {
  name: 'BoxEr',
  data() {
    return {
      selectArr: [],
      QRCodeMsg: [],
      info: {
        boxcode: ''
      }
    }
  },
  created() {
    const obj = sessionStorage.getItem('selectArr')
    this.selectArr = JSON.parse(obj)

    for (let i = 0; i < this.selectArr.length; i++) {
      const Base64 = require('js-base64').Base64
      this.info.boxcode = Base64.encode(this.selectArr[i].boxcode)
      const obj = JSON.stringify(this.info)
      this.QRCodeMsg.push(obj)
    }
  },
  mounted() {
    getQRCode(this)
  },
  methods: {
    bindPrint() {
    },
    getpdf() {
      htmlToPdf.downloadPDF(document.querySelector('#printMe'), '周转箱二维码')
    }
  }
}
async function getQRCode(vue) {
  const opts = {
    errorCorrectionLevel: 'H', // 容错级别
    type: 'image/png', // 生成的二维码类型
    quality: 0.3, // 二维码质量
    margin: 2, // 二维码留白边距
    width: 80, // 宽
    height: 80, // 高
    // text: '11111111111', // 二维码内容
    title: '称重标签二维码',
    color: {
      dark: '#333333', // 前景色
      light: '#fff'// 背景色
    }
  }
  for (var i = 0; i < vue.selectArr.length; i++) {
    QRCode.toCanvas(document.getElementById(vue.selectArr[i].boxid), vue.QRCodeMsg[i], opts, function(error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
*{
  font-size: 12px;
}
</style>
