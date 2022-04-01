<template>
  <div>
    <div>
      <div style="width: 21cm;margin: 0 auto">
        <el-button @click="getpdf()">导出为PDF</el-button>
        <el-button v-print="'printMe'">打印</el-button>
        <el-upload
          :show-file-list="false"
          :on-change="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-button size="small" type="primary" :on-change="handleAvatarSuccess">更换LOGO图片</el-button>
        </el-upload>
      </div>
    </div>
    <div id="printMe" style="width: 21cm;height: 29.7cm;margin: 0 auto;">
      <div style="width: 790px;height: 390px">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
      </div>
      <div v-for="(item,index) in this.nochange" :key="index" style="width:385px;height:140px;float: left;border: 1px solid #1890ff;text-align: center;margin-left: 7px">
        <div style="margin: auto;margin-top: 5px;">科室名称：{{ item.dname }}</div>
        <canvas :id="item.tid" style="text-align: center;" />
        <div style="margin: auto;">医废类型：{{ item.tname }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import htmlToPdf from '@/utils/htmlToPdf'
export default {
  name: 'DepTypePrintEr',
  data() {
    return {
      depname: '',
      QRCodeMsg: [],
      nochange: [],
      imageUrl: this.src = require('../../assets/img/yifei.png'),
      info: {
        tname: '',
        dcode: ''
      }
    }
  },
  created() {
    const obj = sessionStorage.getItem('ruleForm')
    this.nochange = JSON.parse(obj).nochange
    this.depname = this.nochange[0].dname
    console.log(this.nochange)
    for (let i = 0; i < this.nochange.length; i++) {
      const Base64 = require('js-base64').Base64
      this.info.tname = Base64.encode(this.nochange[i].tname)
      this.info.dcode = Base64.encode(this.nochange[i].dcode)
      this.info.depname = Base64.encode(this.nochange[i].dname)
      const obj = JSON.stringify(this.info)
      this.QRCodeMsg.push(obj)
    }
  },
  mounted() {
    getQRCode(this)
  },
  methods: {
    handleAvatarSuccess(file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      const isPNG = file.type === 'image/png'
      const isBMP = file.type === 'image/bmp'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error('上传图片只能是JPG/GIF/PNG/BMP格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isGIF && isPNG && isBMP && isLt2M
    },
    bindPrint() {
    },
    getpdf() {
      htmlToPdf.downloadPDF(document.querySelector('#printMe'), this.depname + '二维码')
    }
  }
}
function getQRCode(vue) {
  const opts = {
    errorCorrectionLevel: 'H', // 容错级别
    type: 'image/png', // 生成的二维码类型
    quality: 0.3, // 二维码质量
    margin: 2, // 二维码留白边距
    width: 100, // 宽
    height: 100, // 高
    // text: '11111111111', // 二维码内容
    title: '医废二维码',
    color: {
      dark: '#333333', // 前景色
      light: '#fff'// 背景色
    }
  }
  for (var i = 0; i < vue.nochange.length; i++) {
    QRCode.toCanvas(document.getElementById(vue.nochange[i].tid), vue.QRCodeMsg[i], opts, function(error) {
    })
  }
}
</script>

<style scoped>
*{
  font-size: 12px;
}
/*.qrcode{*/
/*  width: 6rem!important;*/
/*  height: 6rem!important;*/
/*}*/
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 790px;
  height: 390px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 790px;
  height: 390px;
  display: block;
}

</style>
