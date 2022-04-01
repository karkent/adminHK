<template>
  <div>
    <div style="width: 21cm;margin: 0 auto">
      <el-button @click="getpdf()">导出为PDF</el-button>
      <el-button v-print="'printMe'">打印</el-button>
    </div>
    <div id="printMe" style="width: 21cm;height: 29.7cm;margin: 0 auto;">
      <div v-for="(item,index) in this.selectArr" :key="index" style="width:155px;height:145px;float: left;border: 1px solid #1890ff;text-align: center;margin-top: 5px">
        <div style="margin: auto;margin-top: 5px">科室：{{ item.dname }}</div>
        <canvas :id="item.did" style="margin: auto;float: left;margin-left: 20px" />
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import htmlToPdf from '@/utils/htmlToPdf'
export default {
  name: 'DepPrintAllEr',
  data() {
    return {
      selectArr: [],
      QRCodeMsg: [],
      info: {
        dname: '',
        dcode: ''
      }
    }
  },
  created() {
    const obj = sessionStorage.getItem('multipleSelection')
    this.selectArr = JSON.parse(obj)
    for (let i = 0; i < this.selectArr.length; i++) {
      const Base64 = require('js-base64').Base64
      this.info.dname = Base64.encode(this.selectArr[i].dname)
      this.info.dcode = Base64.encode(this.selectArr[i].dcode)
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
      htmlToPdf.downloadPDF(document.querySelector('#printMe'), '各科室二维码')
    }
  }
}
function getQRCode(vue) {
  const opts = {
    errorCorrectionLevel: 'H', // 容错级别
    type: 'image/png', // 生成的二维码类型
    quality: 0.3, // 二维码质量
    margin: 2, // 二维码留白边距
    width: 110, // 宽
    height: 110, // 高
    // text: '11111111111', // 二维码内容
    title: '医废二维码',
    color: {
      dark: '#333333', // 前景色
      light: '#fff'// 背景色
    }
  }
  for (var i = 0; i <= vue.selectArr.length; i++) {
    QRCode.toCanvas(document.getElementById(vue.selectArr[i].did), vue.QRCodeMsg[i], opts, function(error) {
    })
  }
}
</script>

<style scoped>
*{
  font-size: 12px;
}
</style>
