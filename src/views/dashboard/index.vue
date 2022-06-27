<template>
  <div ref="topDiv" style="width: 100%;height: 100%;background: #F3F4FD;position:absolute;line-height: 1.3">
    <div class="divTop">
      <div class="topDivOne">
        <img src="../../assets/img/day_logo.png" style="width: 1.5vw;">
        &nbsp;<span :style="colorDiv(this.back)" class="hText">厦门大学附属第一医院医废平台</span>
      </div>
      <div class="topDivTow">
        <span :style="colorDiv(this.back)" class="timeText">{{ this.time }}</span>
      </div>
      <div class="topDivThree">
        <img ref="on" src="@/assets/img/day_daytime_icon.png" style="display: block;width: 1.4vw" @click="daytime">
        <img ref="off" src="@/assets/img/night_daytime_icon.png" style="display: none;width: 1.4vw" @click="daytime">
      </div>
    </div>

    <div :style="backDiv(this.back)" class="towDiv">

      <div class="towDivSon">
        <div>
          <span :style="colorDiv(this.back)" class="weightText">{{ this.showData.month }}</span>
        </div>
        <div style="padding: 5% 0 0 0;">
          <span :style="colorFont(this.back)" class="weightText2">医废月总重量（kg）</span>
          <img class="weightImg" src="@/assets/img/day_element1_icon.png">
        </div>
      </div>

      <div class="towDivSon">
        <div>
          <span :style="colorDiv(this.back)" class="weightText">{{ this.showData.year }}</span>
        </div>
        <div style="padding: 5% 0 0 0;">
          <span :style="colorFont(this.back)" class="weightText2">医废年总重量（kg）</span>
          <img class="weightImg" src="@/assets/img/day_element2_icon.png">
        </div>
      </div>
      <div class="towDivThree">
        <div>
          <span :style="colorDiv(this.back)" class="weightText">{{ this.showData.day }}</span>
        </div>
        <div style="padding: 5% 0 0 0;">
          <span :style="colorFont(this.back)" class="weightText2">医废日总重量（kg）</span>
          <img class="weightImg" src="@/assets/img/day_element3_icon.png">
        </div>
      </div>
    </div>

    <div class="midDiv">
      <div :style="backDiv(this.back)" class="allBottomLeftOneDivSon">
        <div style="padding:2% 0 0 6%;">
          <span :style="backF(this.back)" class="midDivText">科室年收集总量排序(kg)</span>
        </div>

        <div id="building" :style="backP(this.back)" style="margin: auto">
          <div class="allBottomLeftDiv">
            <div class="numWeightOneTop">
              <span class="weightTop">{{ this.showData.tblMSortOne.weight }}kg</span>
            </div>
            <div class="numWeightOneLeft">
              <span class="roomName">{{ this.showData.tblMSortOne.spare3 }}</span>
            </div>
          </div>

          <div class="allBottomLeftDiv">
            <div class="numWeightTowTop">
              <span class="weightTow">{{ this.showData.tblMSortThree.weight }}kg</span>
            </div>
            <div class="numWeightOneMid">
              <span class="roomNameTow">{{ this.showData.tblMSortThree.spare3 }}</span>
            </div>
          </div>

          <div class="allBottomLeftDiv">
            <div class="numWeightThreeTop">
              <span class="weightTop">{{ this.showData.tblMSortTow.weight }}kg</span>
            </div>
            <div class="numWeightOneRight">
              <span class="roomName">{{ this.showData.tblMSortTow.spare3 }}</span>
            </div>
          </div>
        </div>

      </div>
      <div ref="chartContainerParent" :style="backDiv(this.back)" class="allBottomLeftOneDivSon" style="margin-left: 2%">
        <div style="padding:2% 0 0 6%;">
          <span :style="backF(this.back)" class="midDivText">近三天收集趋势</span>
        </div>
        <div id="sun" style="width:95.9%;height: 14vw;" />
        <div style="width: 100%;height: 0.28vw;" />
      </div>
    </div>

    <div class="bottomDiv">
      <div :style="backDiv(this.back)" class="allBottomLeftOneDivSon" style="height: 14.3vw">
        <div style="padding:1% 0 0 6%;">
          <span :style="backF(this.back)" class="midDivText">人员收集实时数据</span>
        </div>
        <div>
          <span :style="colorDiv(this.back)" class="tinyText" style="padding-left: 8%">序号</span>
          <span :style="colorDiv(this.back)" class="tinyText" style="padding-left: 8%">收集时间</span>
          <span :style="colorDiv(this.back)" class="tinyText" style="padding-left: 25%">收集人</span>
          <span :style="colorDiv(this.back)" class="tinyText" style="padding-left: 15%">重量(kg)</span>
        </div>

        <div id="leftOne" class="scrDivOne">
          <vue-seamless-scroll :class-option="optionHover" :data="listData" style="height: 10.5vw;float: left;">
            <div v-for="(item, index) in listData" :key="index" style="padding-top: 2%;float: left;width: 50vw;display: flex;">
              <div v-if=" item.id == '1'" class="scrollIdText1"><span v-text="item.id" /></div>
              <div v-else-if=" item.id == '2'" class="scrollIdText2"><span v-text="item.id" /></div>
              <div v-else-if=" item.id == '3'" class="scrollIdText3"><span v-text="item.id" /></div>
              <div v-else class="scrollIdText4"><span v-text="item.id" /></div>

              <div v-if="item.id >= '10'" class="scrollIdTextMor"><span v-text="item.time" /></div>
              <div v-else class="scrollTimeText"><span v-text="item.time" /></div>
              <div class="scrollUserText"><span v-text="item.user" /></div>
              <div class="scrollWeightText"><span v-text="item.weight" /></div>
            </div>
          </vue-seamless-scroll>
        </div>

        <div id="leftTow" class="scrDivTow">
          <vue-seamless-scroll :class-option="optionHover" :data="listData" style="height: 10.5vw;float: left">
            <div v-for="(item, index) in listData" :key="index" style="padding-top: 2%;float: left;width: 50vw;display: flex;overflow: hidden">
              <div v-if=" item.id == '1'" class="scrollIdText1"><span v-text="item.id" /></div>
              <div v-else-if=" item.id == '2'" class="scrollIdText2"><span v-text="item.id" /></div>
              <div v-else-if=" item.id == '3'" class="scrollIdText3"><span v-text="item.id" /></div>
              <div v-else class="scrollIdText4"><span v-text="item.id" /></div>
              <div v-if="item.id >= '10'" class="scrollIdTextMor" style="color: white"><span v-text="item.time" /></div>
              <div v-else class="scrollTimeText" style="color: white"><span v-text="item.time" /></div>
              <div class="scrollUserText" style="color: white"><span v-text="item.user" /></div>
              <div class="scrollWeightText" style="color: white"><span v-text="item.weight" /></div>
            </div>
          </vue-seamless-scroll>
        </div>

      </div>

      <div :style="backDiv(this.back)" class="allBottomLeftOneDivSon" style="margin-left: 2%">
        <div style="padding:1% 0 0 6%;">
          <span :style="backF(this.back)" class="midDivText">科室收集实时数据</span>
        </div>
        <div>
          <span :style="colorDiv(this.back)" class="tinyText" style="padding-left: 8%">序号</span>
          <span :style="colorDiv(this.back)" class="tinyText" style="padding-left: 8%">收集时间</span>
          <span :style="colorDiv(this.back)" class="tinyText" style="padding-left: 25%">科室名称</span>
          <span :style="colorDiv(this.back)" class="tinyText" style="padding-left: 15%">重量(kg)</span>
        </div>
        <div id="midOne" class="scrDivOne">
          <vue-seamless-scroll :class-option="optionHover" :data="listData2" style="height: 10.5vw;float: left">
            <div v-for="(item, index) in listData2" :key="index" style="padding-top: 2%;float: left;width: 50vw;display: flex">
              <div v-if=" item.id == '1'" class="scrollIdText1"><span v-text="item.id" /></div>
              <div v-else-if=" item.id == '2'" class="scrollIdText2"><span v-text="item.id" /></div>
              <div v-else-if=" item.id == '3'" class="scrollIdText3"><span v-text="item.id" /></div>
              <div v-else class="scrollIdText4"><span v-text="item.id" /></div>
              <div v-if="item.id >= '10'" class="scrollIdTextMor"><span v-text="item.time" /></div>
              <div v-else class="scrollTimeText"><span v-text="item.time" /></div>
              <div class="scrollUserText"><span v-text="item.user" /></div>
              <div class="scrollWeightText2"><span v-text="item.weight" /></div>
            </div>
          </vue-seamless-scroll>
        </div>

        <div id="midTow" class="scrDivTow">
          <vue-seamless-scroll :class-option="optionHover" :data="listData2" style="height: 10.5vw;float: left">
            <div v-for="(item, index) in listData2" :key="index" style="padding-top: 2%;float: left;width: 50vw;display: flex">
              <div v-if=" item.id == '1'" class="scrollIdText1"><span v-text="item.id" /></div>
              <div v-else-if=" item.id == '2'" class="scrollIdText2"><span v-text="item.id" /></div>
              <div v-else-if=" item.id == '3'" class="scrollIdText3"><span v-text="item.id" /></div>
              <div v-else class="scrollIdText4"><span v-text="item.id" /></div>
              <div v-if="item.id >= '10'" class="scrollIdTextMor" style="color: white"><span v-text="item.time" /></div>
              <div v-else class="scrollTimeText"style="color: white"><span v-text="item.time" /></div>
              <div class="scrollUserText" style="color: white"><span v-text="item.user" /></div>
              <div class="scrollWeightText2" style="color: white"><span v-text="item.weight" /></div>
            </div>
          </vue-seamless-scroll>
        </div>
      </div>

    </div>

    <div class="rightDiv">

      <div :style="backDiv(this.back)" style="width: 100%;border-radius: 12px">

        <div style="padding:2% 0 0 6%;width: 100%">
          <span :style="backF(this.back)" class="midDivText">医废分类占比</span>
          <el-button
            :style="backDiv(this.back)"
            plain
            style="margin-left: 50%;font-family: MicrosoftYaHei;font-size: 0.5vw;
          color: #5B7BFE;font-weight: 400;"
            type="primary"
          >昨日同比增长</el-button>
        </div>

        <div id="bOne" class="borderOne">

          <div id="chartOne" style="width: 96%;height: 10vw;border-radius: 150px" />

        </div>

        <div id="bTow" class="borderTow">

          <div id="chartTow" style="width: 100%;height: 10vw;" />

        </div>

      </div>
    </div>

    <div class="rightDiv" style="margin-top: 1%">
      <div :style="backDiv(this.back)" style="width: 100%;border-radius: 12px">
        <div style="padding:2% 0 0 6%;width: 100%;">
          <span :style="backF(this.back)" class="midDivText">近7天医废收集总量趋势</span>
        </div>
        <div id="text" style="width: 95.9%;height: 13vw;float: left;" />
      </div>

    </div>
    <warning ref="initWarning" />
    <!--    定位的图-->
  </div>
</template>
<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import '../../assets/customed'
import request from '../../utils/request'
import warning from '../../../src/warning'
import { BigNumber } from 'bignumber.js'
import * as commonUtil from '@/utils'

import { addListener, removeListener } from 'resize-detector'
export default {
  name: 'Dashboard',
  components: {
    vueSeamlessScroll: vueSeamlessScroll,
    warning: warning
  },
  data() {
    return {
      time: '',
      date: '',
      back: true,
      backOne: require('../../assets/img/day_Ranking_bg.png'),
      backTow: require('../../assets/img/night_Ranking_bg.png'),
      eBack: '',
      eColor: '',
      listData: [],
      listData2: [],
      fontColor: '#4E6081',
      msg: '',
      data8: [
        { value: 0.0, name: '化学性废物' },
        { value: 0.0, name: '感染性废物' },
        { value: 0.0, name: '损伤性废物' },
        { value: 0.0, name: '病理性废物' },
        { value: 0.0, name: '药物性废物' }
      ],
      data9: [
        { value: 0.0, name: '化学性废物' },
        { value: 0.0, name: '感染性废物' },
        { value: 0.0, name: '损伤性废物' },
        { value: 0.0, name: '病理性废物' },
        { value: 0.0, name: '药物性废物' }
      ],
      dayTrash: [],
      weekTrash: [],
      showData: {
        year: '',
        month: '',
        day: '',
        tblMSortOne: '',
        tblMSortTow: '',
        tblMSortThree: '',
        seven: '',
        threeDay: [],
        threeMsg: []
      }
    }
  },
  computed: {
    csColor() {
      return function(index) {
        return index == true ? { color: '#1D2129' } : { color: '#E9E9EA' }
      }
    },
    colorDiv() {
      return function(index) {
        return index == true ? { color: '#1D2129' } : { color: '#E9E9EA' }
      }
    },
    backDiv() {
      return function(index) {
        return index == true ? { background: '#FFFFFF' } : { background: '#2A2D32' }
      }
    },
    colorFont() {
      return function(index) {
        return index == true ? { color: '#06249C' } : { color: '#8099FF' }
      }
    },
    backP() {
      return function(index) {
        return index == true ? { backgroundImage: 'url(' + this.backOne + ')' } : { backgroundImage: 'url(' + this.backTow + ')' }
      }
    },
    backF() {
      return function(index) {
        return index == true ? { color: '#21306B' } : { color: '#E9E9EA' }
      }
    },
    optionHover() {
      return {
        step: 1, // 数值越大速度滚动越快
        hoverStop: true, // 是否开启鼠标悬停stop
        openWatch: true, // 开启数据实时监控刷新dom
        limitMoveNum: 0, // 开始无缝滚动的数据量 this.dataList.length
        direction: 1, // 0向下 1向上 2向左 3向右
        singleHeight: 21, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 0// 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  watch: {
    // "$store.state.app.sidebar.opened"(){
    //   setTimeout(()=>{
    //     this.sun.resize()
    //     this.document.getElementById('chartOne').resize()
    //     this.document.getElementById('chartTow').resize()
    //     this.text.resize()
    //   },200)
    // }
  },
  mounted() {
    this.$refs.initWarning.init()
    addListener(this.$refs.chartContainerParent, this.resize)
    this.realTime()
    this.colo()
    this.dateShow()
    this.lestInt()
  },
  created() {
    this.dateFormat()
  },
  beforeDestroy() {
    this.dataDestroy()
  },
  methods: {
    resize() {
      if (this.$echarts(document.getElementById('sun')).resize) {
        this
          .$echarts(document.getElementById('sun')).resize()
      }
    },
    dataDestroy() {
      if (this.timer) {
        clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
      }
    },
    dateShow() {
      this.timer = setInterval(() => {
        this.dateFormat()
        this.realTime()
      }, 200000)
    },
    dateFormat() {
      this.date = new Date()
      const year = this.date.getFullYear()
      const month = this.date.getMonth() + 1 < 10 ? '0' + (this.date.getMonth() + 1) : this.date.getMonth() + 1
      const day = this.date.getDate() < 10 ? '0' + this.date.getDate() : this.date.getDate()
      const hours = this.date.getHours() < 10 ? '0' + this.date.getHours() : this.date.getHours()
      const minutes = this.date.getMinutes() < 10 ? '0' + this.date.getMinutes() : this.date.getMinutes()
      const seconds = this.date.getSeconds() < 10 ? '0' + this.date.getSeconds() : this.date.getSeconds()
      this.time = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    },
    daytime() {
      this.$echarts.dispose(document.getElementById('sun'))
      this.$echarts.dispose(document.getElementById('chartOne'))
      this.$echarts.dispose(document.getElementById('chartTow'))
      this.borderType(this.back)
      if (this.back === true) {
        this.$refs.on.style.display = 'none'
        this.$refs.off.style.display = 'block'
        this.$refs.topDiv.style.background = '#212429'
        this.back = false
        this.eBack = 'dark'
        this.eColor = '#2A2D32'
        document.getElementById('leftOne').style.zIndex = '0'
        document.getElementById('leftTow').style.zIndex = '1'
        document.getElementById('midOne').style.zIndex = '0'
        document.getElementById('midTow').style.zIndex = '1'
        this.fontColor = '#CDD0D2'
      } else {
        this.$refs.on.style.display = 'block'
        this.$refs.off.style.display = 'none'
        this.$refs.topDiv.style.background = '#F3F4FD'
        this.back = true
        this.eBack = ''
        this.eColor = ''
        document.getElementById('leftOne').style.zIndex = '1'
        document.getElementById('leftTow').style.zIndex = '0'
        document.getElementById('midOne').style.zIndex = '1'
        document.getElementById('midTow').style.zIndex = '0'
        this.fontColor = '#4E6081'
      }
      this.colo()
    },
    colo() {
      request.post('/dashboard/realTime', {
        data: ''
      }).then(res => {
        this.showData.threeDay = []
        // 年月日数据
        this.showData.year = res.yearWeight
        this.showData.day = res.dayWeight
        this.showData.month = res.monthWeight
        // //近三天
        // 实时收集数据
        this.listData = []
        this.listData2 = []
        for (let i = 0; i < res.realTimeCollecting.length; i++) {
          const j = {
            id: i + 1,
            time: res.realTimeCollecting[i].collectdate,
            user: res.realTimeCollecting[i].spare3,
            weight: res.realTimeCollecting[i].weight + 'kg'
          }
          const l = {
            id: i + 1,
            time: res.officeRealTimeCollecting[i].collectdate,
            user: res.officeRealTimeCollecting[i].spare3,
            weight: res.officeRealTimeCollecting[i].weight + 'kg'
          }
          this.listData2.push(l)
          this.listData.push(j)
        }
        // 年医废收集排序三个
        for (var a = 0; a < res.tblMSort.length; a++) {
          if (res.tblMSort[a].infoid == 1) {
            this.showData.tblMSortOne = res.tblMSort[a]
          } else if (res.tblMSort[a].infoid == 2) {
            this.showData.tblMSortTow = res.tblMSort[a]
          } else {
            this.showData.tblMSortThree = res.tblMSort[a]
          }
        }
        // 近三天趋势
        const sun = this.$echarts.init(document.getElementById('sun'))
        sun.setOption({
          backgroundColor: this.eColor,
          xAxis: {
            type: 'category',
            data: [res.three[0].collectdate, res.three[1].collectdate, res.three[2].collectdate]
          },
          grid: {
            x: 45,
            y: 20,
            bottom: 25,
            right: 25
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [res.three[0].weight, res.three[1].weight, res.three[2].weight],
              type: 'line',
              smooth: true
            }
          ]
        })
        // 天分类
        const chartOne = this.$echarts.init(document.getElementById('chartOne'))
        for (let m = 0; m < this.data8.length; m++) {
          for (let i = 0; i < res.dayProportion.length; i++) {
            if (this.data8[m].name === res.dayProportion[i].spare3) {
              console.log(res.dayProportion[i].weight)
              this.data8[m].value = res.dayProportion[i].weight
            }
          }
        }
        const list = this.data8
        chartOne.setOption({
          title: {
            top: '10%',
            text: '日医废占比',
            textStyle: {
              fontSize: 17,
              color: this.fontColor,
              fontWeight: '700',
              fontFamily: 'MicrosoftYaHei'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          legend: {
            right: '40%',
            top: '35%',
            itemWidth: 15, // 图例图形宽度
            itemHeight: 15,
            itemGap: 30, // 图例图标与文字间的间距
            textStyle: {
              fontSize: 14, // 图例文字字体大小
              color: this.fontColor
            },
            formatter: function(name) { // 该函数用于设置图例显示后的百分比
              console.log(name)
              const data = list
              console.log(data)
              let total = 0.00
              let value
              list.forEach((item) => {
                total = BigNumber(total).plus(BigNumber(item.value)).toNumber()// 结果需要用toNumber转为普通数字
                console.log(total)
                if (item.name == name) {
                  value = BigNumber(item.value)
                }
              })
              const p = Math.round((BigNumber((value / total) * 100))) // 求出百分比
              if (value == 0) {
                return `${name}  ${0 + '.0'}%`
              } else {
                return `${name}  ${p}%` // 返回出图例所显示的内容是名称+百分比
              }
            }
          },
          series: [
            {
              type: 'pie',
              radius: ['30%', '60%'],
              left: '72%',
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '20',
                  itemGap: 20
                }
              },
              data: this.data8
            }
          ]
        })
        // 七天分类
        for (let m = 0; m < this.data9.length; m++) {
          for (let i = 0; i < res.weekProportion.length; i++) {
            if (this.data9[m].name === res.weekProportion[i].spare3) {
              this.data9[m].value = res.weekProportion[i].weight
            }
          }
        }
        const listOne = this.data9
        const chartTow = this.$echarts.init(document.getElementById('chartTow'))
        chartTow.setOption({
          title: {
            left: '60%',
            top: '10%',
            text: '周医废占比',
            textStyle: {
              fontSize: 17,
              color: this.fontColor,
              fontWeight: '700',
              fontFamily: 'MicrosoftYaHei'
            }
          },
          tooltip: {
            marginLeft: '20%',
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          legend: {
            left: '40%',
            top: '35%',
            itemWidth: 15, // 图例图形宽度
            itemHeight: 15,
            itemGap: 30, // 图例图标与文字间的间距
            textStyle: {
              marginLeft: '20%',
              fontSize: 14, // 图例文字字体大小
              color: this.fontColor
            },
            formatter: function(name) { // 该函数用于设置图例显示后的百分比
              const data = listOne
              let total = 0
              let value
              listOne.forEach((item) => {
                total = BigNumber(total).plus(BigNumber(item.value)).toNumber()// 结果需要用toNumber转为普通数字
                if (item.name == name) {
                  value = BigNumber(item.value)
                }
              })
              const p = Math.round((BigNumber((value / total) * 100))) // 求出百分比
              if (value == 0) {
                return `${name}   ${0 + '.0'}%    `
              } else {
                return `${name}   ${p}%    ` // 返回出图例所显示的内容是名称+百分比
              }
            }
          },
          series: [
            {
              type: 'pie',
              radius: ['30%', '60%'],
              right: '72%',
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '20',
                  itemGap: 20
                }
              },
              data: this.data9
            }
          ]
        })

        // 医疗废弃七天
        const text = this.$echarts.init(document.getElementById('text'))
        window.onresize = function() {
          chartOne.resize()
          chartTow.resize()
          sun.resize()
          text.resize()
        }
        text.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          grid: {
            x: 50,
            y: 65,
            bottom: 24,
            right: 60
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['医疗废弃物总重量', '新冠类废弃物'],
            textStyle: {
              fontSize: 14, // 图例文字字体大小
              color: this.fontColor
            }
          },
          xAxis: [
            {
              type: 'category',
              data: [res.seven[0].collectdate, res.seven[1].collectdate, res.seven[2].collectdate, res.seven[3].collectdate,
                res.seven[4].collectdate, res.seven[5].collectdate, res.seven[6].collectdate],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '医疗废弃物总重量',
              interval: 150,
              axisLabel: {
                formatter: '{value} kg'
              }
            },
            {
              type: 'value',
              name: '新冠类废弃物',
              interval: 50,
              axisLabel: {
                formatter: '{value} kg'
              }
            }
          ],
          series: [
            {
              name: '医疗废弃物总重量',
              type: 'bar',
              tooltip: {
                valueFormatter: function(value) {
                  return value + ' kg'
                }
              },
              data: [res.seven[0].weight, res.seven[1].weight, res.seven[2].weight, res.seven[3].weight,
                res.seven[4].weight, res.seven[5].weight, res.seven[6].weight]
            },
            {
              name: '新冠类废弃物',
              type: 'line',
              yAxisIndex: 1,
              tooltip: {
                valueFormatter: function(value) {
                  return value + ' kg'
                }
              },
              data: [res.disease[0].weight, res.disease[1].weight, res.disease[2].weight, res.disease[3].weight,
                res.disease[4].weight, res.disease[5].weight, res.disease[6].weight]
            }
          ]
        })
      })
    },
    lestInt() {
      for (let i = 0; i < 15; i++) {
        const j = {
          id: i + 1,
          time: 123,
          user: '赵子星',
          weight: '10.5'
        }
        this.listData.push(j)
        this.listData2.push(j)
      }
    },
    borderType(boolean) {
      if (boolean == true) {
        document.getElementById('bOne').style.borderTop = '1px solid #484849'
        document.getElementById('bOne').style.borderRight = '1px solid #484849'
        document.getElementById('bOne').style.borderBottom = '1px solid #484849'

        document.getElementById('bTow').style.borderTop = '1px solid #484849'
        document.getElementById('bTow').style.borderLeft = '1px solid #484849'
        document.getElementById('bTow').style.borderBottom = '1px solid #484849'
      } else {
        document.getElementById('bOne').style.borderTop = '1px solid #E4E4E4'
        document.getElementById('bOne').style.borderRight = '1px solid #E4E4E4'
        document.getElementById('bOne').style.borderBottom = '1px solid #E4E4E4'

        document.getElementById('bTow').style.borderTop = '1px solid #E4E4E4'
        document.getElementById('bTow').style.borderLeft = '1px solid #E4E4E4'
        document.getElementById('bTow').style.borderBottom = '1px solid #E4E4E4'
      }
    },
    realTime() { // 向后台发请求
      request.post('/dashboard/realTime', {
        data: ''
      }).then(res => {
        this.showData.threeDay = []
        // 年月日数据
        this.showData.year = res.yearWeight
        this.showData.day = res.dayWeight
        this.showData.month = res.monthWeight
        // 近三天
        var num = 3
        for (var i = 0; i < res.three.length; i++) {
          num--
          this.showData.threeDay.push(res.three[num].collectdate)
          this.showData.threeMsg.push(res.three[num].weight)
        }
        // 年医废收集排序三个
        for (var a = 0; a < res.tblMSort.length; a++) {
          if (res.tblMSort[a].infoid == 1) {
            this.showData.tblMSortOne = res.tblMSort[a]
          } else if (res.tblMSort[a].infoid == 2) {
            this.showData.tblMSortTow = res.tblMSort[a]
          } else {
            this.showData.tblMSortThree = res.tblMSort[a]
          }
        }
        // 实时收集数据
        this.listData = []
        this.listData2 = []
        for (let i = 0; i < res.realTimeCollecting.length; i++) {
          const j = {
            id: i + 1,
            time: res.realTimeCollecting[i].collectdate,
            user: res.realTimeCollecting[i].spare3,
            weight: res.realTimeCollecting[i].weight + 'kg'
          }
          const l = {
            id: i + 1,
            time: res.officeRealTimeCollecting[i].collectdate,
            user: res.officeRealTimeCollecting[i].spare3,
            weight: res.officeRealTimeCollecting[i].weight + 'kg'
          }
          this.listData2.push(l)
          this.listData.push(j)
        }
        // 近三天趋势
        const sun = this.$echarts.init(document.getElementById('sun'))
        sun.setOption({
          backgroundColor: this.eColor,
          xAxis: {
            type: 'category',
            data: [res.three[0].collectdate, res.three[1].collectdate, res.three[2].collectdate]
          },
          grid: {
            x: 45,
            y: 20,
            bottom: 25,
            right: 25
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [res.three[0].weight, res.three[1].weight, res.three[2].weight],
              type: 'line',
              smooth: true
            }
          ]
        })
        // 天分类
        const chartOne = this.$echarts.init(document.getElementById('chartOne'))
        for (let m = 0; m < this.data8.length; m++) {
          for (let i = 0; i < res.dayProportion.length; i++) {
            if (this.data8[m].name === res.dayProportion[i].spare3) {
              console.log(res.dayProportion[i].weight)
              this.data8[m].value = res.dayProportion[i].weight
            }
          }
        }
        const list = this.data8
        chartOne.setOption({
          title: {
            top: '10%',
            text: '日医废占比',
            textStyle: {
              fontSize: 17,
              color: this.fontColor,
              fontWeight: '700',
              fontFamily: 'MicrosoftYaHei'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          legend: {
            right: '40%',
            top: '35%',
            itemWidth: 15, // 图例图形宽度
            itemHeight: 15,
            itemGap: 30, // 图例图标与文字间的间距
            textStyle: {
              fontSize: 14, // 图例文字字体大小
              color: this.fontColor
            },
            formatter: function(name) { // 该函数用于设置图例显示后的百分比
              console.log(name)
              const data = list
              console.log(data)
              let total = 0.00
              let value
              list.forEach((item) => {
                total = BigNumber(total).plus(BigNumber(item.value)).toNumber()// 结果需要用toNumber转为普通数字
                console.log(total)
                if (item.name == name) {
                  value = BigNumber(item.value)
                }
              })
              const p = Math.round((BigNumber((value / total) * 100))) // 求出百分比
              if (value == 0) {
                return `${name}  ${0 + '.0'}%`
              } else {
                return `${name}  ${p}%` // 返回出图例所显示的内容是名称+百分比
              }
            }
          },
          series: [
            {
              type: 'pie',
              radius: ['30%', '60%'],
              left: '72%',
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '20',
                  itemGap: 20
                }
              },
              data: this.data8
            }
          ]
        })
        // 七天分类
        for (let m = 0; m < this.data9.length; m++) {
          for (let i = 0; i < res.weekProportion.length; i++) {
            if (this.data9[m].name === res.weekProportion[i].spare3) {
              this.data9[m].value = res.weekProportion[i].weight
            }
          }
        }
        const listOne = this.data9
        const chartTow = this.$echarts.init(document.getElementById('chartTow'))
        chartTow.setOption({
          title: {
            left: '60%',
            top: '10%',
            text: '周医废占比',
            textStyle: {
              fontSize: 17,
              color: this.fontColor,
              fontWeight: '700',
              fontFamily: 'MicrosoftYaHei'
            }
          },
          tooltip: {
            marginLeft: '20%',
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          legend: {
            left: '40%',
            top: '35%',
            itemWidth: 15, // 图例图形宽度
            itemHeight: 15,
            itemGap: 30, // 图例图标与文字间的间距
            textStyle: {
              marginLeft: '20%',
              fontSize: 14, // 图例文字字体大小
              color: this.fontColor
            },
            formatter: function(name) { // 该函数用于设置图例显示后的百分比
              const data = listOne
              let total = 0
              let value
              listOne.forEach((item) => {
                total = BigNumber(total).plus(BigNumber(item.value)).toNumber()// 结果需要用toNumber转为普通数字
                if (item.name == name) {
                  value = BigNumber(item.value)
                }
              })
              const p = Math.round((BigNumber((value / total) * 100))) // 求出百分比
              if (value == 0) {
                return `${name}  ${0 + '.0'}%`
              } else {
                return `${name}  ${p}%` // 返回出图例所显示的内容是名称+百分比
              }
            }
          },
          series: [
            {
              type: 'pie',
              radius: ['30%', '60%'],
              right: '72%',
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '20',
                  itemGap: 20
                }
              },
              data: this.data9
            }
          ]
        })

        // 医疗废弃七天
        const text = this.$echarts.init(document.getElementById('text'))
        window.onresize = function() {
          chartOne.resize()
          chartTow.resize()
          sun.resize()
          text.resize()
        }
        text.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          grid: {
            x: 70,
            y: 60,
            bottom: 24,
            right: 60
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['医疗废弃物总重量', '新冠类废弃物'],
            textStyle: {
              fontSize: 14, // 图例文字字体大小
              color: this.fontColor
            }
          },
          xAxis: [
            {
              type: 'category',
              data: [res.seven[0].collectdate, res.seven[1].collectdate, res.seven[2].collectdate, res.seven[3].collectdate,
                res.seven[4].collectdate, res.seven[5].collectdate, res.seven[6].collectdate],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '医疗废弃物总重量',
              interval: 150,
              axisLabel: {
                formatter: '{value} kg'
              }
            },
            {
              type: 'value',
              name: '新冠类废弃物',
              interval: 50,
              axisLabel: {
                formatter: '{value} kg'
              }
            }
          ],
          series: [
            {
              name: '医疗废弃物总重量',
              type: 'bar',
              tooltip: {
                valueFormatter: function(value) {
                  return value + ' kg'
                }
              },
              data: [res.seven[0].weight, res.seven[1].weight, res.seven[2].weight, res.seven[3].weight,
                res.seven[4].weight, res.seven[5].weight, res.seven[6].weight]
            },
            {
              name: '新冠类废弃物',
              type: 'line',
              yAxisIndex: 1,
              tooltip: {
                valueFormatter: function(value) {
                  return value + ' kg'
                }
              },
              data: [res.disease[0].weight, res.disease[1].weight, res.disease[2].weight, res.disease[3].weight,
                res.disease[4].weight, res.disease[5].weight, res.disease[6].weight]
            }
          ]
        })
      })
    },
    add(a, b) {
      a = BigNumber(a)
      b = BigNumber(b)
      return a.plus(b).toNumber() // 结果需要用toNumber转为普通数字
    }
  }
}
</script>

<style>
.divTop {
  white-space: nowrap;
  display: flex;
  float: left;
  width: 100%;
}

.topDivOne {
  /*background: #add0a9;*/
  padding: 0.2% 20% 0.4% 1.8%;
}

.hText {
  font-family: YouSheBiaoTiHei;
  font-size: 2.2vw;
  color: #1D2129;
}

.topDivTow {
  /*background: #0a76a4;*/
  margin: auto auto auto 4%;
}

.topDivThree {
  /*background: #0a76a4;*/
  margin: auto 25% auto auto;
}

.timeText {
  font-family: MicrosoftYaHei;
  font-size: 1vw;
  color: #1D2129;
}
</style>

<style>
.towDiv {
  width: 60%;
  background: #FFFFFF;
  margin-left: 1.3%;
  border-radius: 12px;
  float: left;
}

.weightText {
  font-family: MicrosoftYaHei-Bold;
  font-size: 2.2vw;
  color: #1D2129;
  font-weight: 700;
}

.weightText2 {
  margin-top: 5%;
  font-family: MicrosoftYaHei;
  font-size: 1vw;
  color: #06249C;
  font-weight: 400;
  float: left
}

.weightImg {
  width: 5.4vw;
  margin-left: 7%
}

.towDivSon {
  position: relative;
  float: left;
  width: 33.3%;
  padding: 3% 2% 3% 2%;
}

.towDivSon:after {
  content: '';
  position: absolute;
  height: 50%;
  border-right: 1px solid #D3D7EA;
  top: 10%;
  right: 0%;
}

.towDivThree {
  position: relative;
  float: left;
  width: 33.3%;
  padding: 3% 2% 3% 2%;
}

.midDiv {
  margin-top: 0.5%;
  margin-left: 1.3%;
  width: 60%;
  border-radius: 12px;
  float: left;
  display: flex;
}
</style>

<style>

#building {
  height: 13.5vw;
  width: 27.1vw;
  background: url("../../assets/img/day_Ranking_bg.png");
  background-size: 100% 100%;
}

.allBottomLeftDiv {
  width: 33.3%;
  height: 100%;
  float: left;
  text-align: center;
  margin: auto
}

.allBottomLeftOneDivSon {
  width: 49%;
  border-radius: 12px;
  background: white
}

.numWeightTowTop {
  margin-top: 40%;
  width: 64%;
  height: 15%;
  margin-left: 18%;
  overflow: hidden
}

.midDivText {
  font-family: MicrosoftYaHei-Bold;
  font-size: 1.1vw;
  color: #21306B;
  font-weight: 700;
}

.weightTop {
  font-size: 0.8vw;
  font-family: MicrosoftYaHei-Bold;
  color: #FE6355;
  font-weight: 700;
}

.roomName {
  font-size: 0.6vw;
  font-family: MicrosoftYaHei;
  color: #FFFFFF;
  text-align: center;
  font-weight: 400;
  overflow: hidden
}

.numWeightOneTop {
  width: 50%;
  height: 10%;
  margin-top: 65%;
  margin-left: 35%;
  overflow: hidden
}

.numWeightOneLeft {
  width: 38%;
  height: 15%;
  margin-left: 41.5%;
  margin-top: 3%;
  overflow: hidden
}

.weightTow {
  font-family: MicrosoftYaHei-Bold;
  font-size: 1vw;
  color: #FE6355;
  font-weight: 700;
}

.roomNameTow {
  font-family: MicrosoftYaHei;
  font-size: 0.9vw;
  color: #FFFFFF;
  text-align: center;
  font-weight: 400;
}

.numWeightOneMid {
  width: 50%;
  margin-left: 25%;
  margin-top: 5%;
  height: 15%;
  overflow: hidden
}

.numWeightThreeTop {
  width: 50%;
  height: 10%;
  margin-top: 70%;
  margin-left: 15%;
  overflow: hidden;
}

.numWeightOneRight {
  width: 37%;
  height: 14%;
  margin-left: 21%;
  margin-top: 5%;
  overflow: hidden
}
</style>

<style>
.bottomDiv {
  width: 60%;
  border-radius: 12px;
  float: left;
  display: flex;
  margin-top: 0.5%;
  margin-left: 1.3%;
}
.tinyText{
  font-family: MicrosoftYaHei;
  font-size: 0.8vw;
  color: #757590;
  font-weight: 400;
}
.scrollIdText1{
  font-family: MicrosoftYaHei;
  background: #FE6355;
  font-size: 0.8vw;
  padding:0.5% 1% 0.5% 1%;
  margin-left: 4.5%;
  border-radius: 50px;
  font-weight: 400;
}
.scrollIdText2{
  font-family: MicrosoftYaHei;
  background: #5B7BFE;
  font-size: 0.8vw;
  padding:0.5% 1% 0.5% 1%;
  margin-left: 4.5%;
  border-radius: 50px;
  font-weight: 400;
}
.scrollIdText3{
  font-family: MicrosoftYaHei;
  background: #1BC39E;
  font-size: 0.8vw;
  padding:0.5% 1% 0.5% 1%;
  margin-left: 4.5%;
  border-radius: 50px;
  font-weight: 400;
}
.scrollIdText4{
  /*max-width: 1.5vw;*/
  font-family: MicrosoftYaHei;
  background: #F1F2F6;
  font-size: 0.8vw;
  padding:0.5% 1% 0.5% 1%;
  margin-left: 4.5%;
  border-radius: 50px;
  font-weight: 400;
}
.scrollIdTextMor{
  padding-top: 0.5%;
  margin-left: 4%;
  font-family: MicrosoftYaHei;
  font-size: 0.8vw;
  color: #1D2129;
  font-weight: 400;
}
.scrollTimeText{
  padding-top: 0.5%;
  margin-left: 5%;
  font-family: MicrosoftYaHei;
  font-size: 0.8vw;
  color: #1D2129;
  font-weight: 400;
}
.scrollUserText{
  padding-top: 0.5%;
  margin-left: 5.4%;
  font-family: MicrosoftYaHei;
  font-size: 0.8vw;
  color: #1D2129;
  font-weight: 400;
}
.scrollWeightText{
  padding-top: 0.5%;
  position: absolute;
  margin-left: 46%;
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.8vw;
  color: #1D2129;
  font-weight: 700;
}
.scrollWeightText2{
  padding-top: 0.5%;
  position: absolute;
  margin-left: 47%;
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.8vw;
  color: #1D2129;
  font-weight: 700;
}
.scrDivOne{
  background: #FFFFFF;
  position:absolute;
  height: 10.5vw;
  overflow: hidden;
  z-index: 1;
  width: 29.4%;
}
.scrDivTow{
  background:#2A2D32;
  position:absolute;
  height: 10.5vw;
  overflow: hidden;
  z-index: 0;
  width: 29.4%;
}
</style>

<style>
.rightDiv{
  width: 36%;
  display: flex;
  margin-left: 63%;
}
.borderOne{
  border-radius: 0px 100px 100px 0px;
  border-right: 1px solid #E4E4E4;
  border-top: 1px solid #E4E4E4;
  border-bottom: 1px solid #E4E4E4;
  margin: 2% 2% 0% 2% ;
}
.borderTow{
  border-radius: 100px 0px 0px 100px;
  border-left: 1px solid #E4E4E4;
  border-top: 1px solid #E4E4E4;
  border-bottom: 1px solid #E4E4E4;
  margin: 3% 2% 4% 2% ;
}
</style>
