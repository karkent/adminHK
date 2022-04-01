<template>
  <div>
    <div style="width: 800px;margin: auto">
      <el-button v-print="'printMe'">打印</el-button>
    </div>
    <div id="printMe" style="width: 800px;margin: auto;font-size: 12px">
      <div v-for="(item,index) in this.selectArr" :key="index" style="width:265px;height:115px;float: left;border: 1px solid #1890ff;margin: auto;">
        <!--      <canvas id="1"/>-->
        <div style="height: 20px;margin: auto;margin-top: 5px;margin-left: 20px">{{ item.hname }} 医废信息条码</div>
        <!--      <div style="width: 100px;height: 20px;margin: auto">我是文字</div>-->
        <canvas :id="item.infoid" style="margin: auto;float: left;margin-left: 10px;width: 65px;height: 65px;" />
        <div style="float: left">
          <div>科室:</div>
          <div>交接员:</div>
          <div>收集员:</div>
          <div>废物类型:</div>
          <div>重量:</div>
          <div>收集时间:</div>
        </div>
        <div style="float: left">
          <div>{{ item.dname }}</div>
          <div>{{ item.sname }}</div>
          <div>{{ item.sname2 }}</div>
          <div>{{ item.tname }}</div>
          <div>{{ item.weight }} KG</div>
          <div>{{ item.collectdate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name: 'Er',
  data() {
    return {
      selectArr: [],
      QRCodeMsg: []
    }
  },
  created() {
    const obj = sessionStorage.getItem('tableData')
    this.selectArr = JSON.parse(obj)
  },
  mounted() {
    getQRCode(this)
  },
  methods: {
    getQRCode() {
      const opts = {
        errorCorrectionLevel: 'H', // 容错级别
        type: 'image/png', // 生成的二维码类型
        quality: 0.3, // 二维码质量
        margin: 2, // 二维码留白边距
        // width: 120, // 宽
        // height: 100, // 高
        // text: '11111111111', // 二维码内容
        title: '称重标签二维码',
        color: {
          dark: '#333333', // 前景色
          light: '#fff'// 背景色
        }
      }
      // const arrayStr = 'QRCode'
      // this.QRCodeMsg = 'http://www.baidu.com' // 生成的二维码为URL地址js
      for (var i = 0; i < this.selectArr.length; i++) {
        if (selectArr[i].bagcode === null) {
          selectArr[i].bagcode = ''
        }
        QRCode.toCanvas(document.getElementById(this.selectArr[i].infoid), this.selectArr[i].bagcode, this.selectArr[i].weight, opts, function(error) {
          console.log(error)
        })
      }
      // const msg = document.getElementById('QRCode_header')

      // 将获取到的数据（val）画到msg（canvas）上
      // QRCode.toCanvas(msg, this.QRCodeMsg, opts, function(error) {
      //   console.log(error)
      // })
    }
  }
}
function getQRCode(vue) {
  const opts = {
    errorCorrectionLevel: 'H', // 容错级别
    type: 'image/png', // 生成的二维码类型
    quality: 0.3, // 二维码质量
    margin: 2, // 二维码留白边距
    width: 65, // 宽
    height: 65, // 高
    // text: '11111111111', // 二维码内容
    title: '称重标签二维码',
    color: {
      dark: '#333333', // 前景色
      light: '#fff'// 背景色
    }
  }
  // const arrayStr = 'QRCode'
  // this.QRCodeMsg = 'http://www.baidu.com' // 生成的二维码为URL地址js
  // for (var i = 1; i <= vue.selectArr.length; i++) {
  //   QRCode.toCanvas(document.getElementById(i), vue.selectArr[i].sname, opts, function(error) {
  //     console.log(error)
  //   })
  // }
  for (var i = 0; i < vue.selectArr.length; i++) {
    QRCode.toCanvas(document.getElementById(vue.selectArr[i].infoid), '袋条码：' + vue.selectArr[i].bagcode + ',重量：' + vue.selectArr[i].weight + 'KG', opts, function(error) {
      console.log(error)
    })
  }
  // const msg = document.getElementById('QRCode_header')

  // 将获取到的数据（val）画到msg（canvas）上
  // QRCode.toCanvas(msg, this.QRCodeMsg, opts, function(error) {
  //   console.log(error)
  // })
}
</script>

<style scoped>
/**{*/
/*  font-size: 12px;*/
/*}*/
/*.qrcode{*/
/*  width: 4rem!important;*/
/*  height: 4rem!important;*/
/*}*/
</style>
