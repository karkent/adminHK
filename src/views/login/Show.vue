<template>
  <div ref="topDiv" style="width: 100%;height: 100%;background: #F3F4FD;position:absolute;line-height: 1.3">
    <div class="divTop">
      <div class="topDivOne">
        <img style="width: 1.5vw;" src="../../assets/img/day_logo.png">
        &nbsp;<span class="hText" :style="colorDiv(this.back)">厦门大学附属第一医院医废平台</span>
      </div>
      <div class="topDivTow">
        <span class="timeText" :style="colorDiv(this.back)">{{ this.time }}</span>
      </div>
      <div class="topDivThree">
        <img ref="on" style="display: block;width: 1.4vw" src="@/assets/img/day_daytime_icon.png" @click="daytime">
        <img ref="off" style="display: none;width: 1.4vw" src="@/assets/img/night_daytime_icon.png" @click="daytime">
      </div>
    </div>

    <div class="towDiv" :style="backDiv(this.back)">
      <div class="towDivSon">
        <div>
          <span class="weightText" :style="colorDiv(this.back)">1,676.44</span>
        </div>
        <div style="padding: 7% 0 0 0;">
          <span class="weightText2" :style="colorFont(this.back)">医废月总重量（kg）</span>
          <img class="weightImg" src="@/assets/img/day_element1_icon.png">
        </div>
      </div>
      <div class="towDivSon">
        <div>
          <span class="weightText" :style="colorDiv(this.back)">1,676.44</span>
        </div>
        <div style="padding: 7% 0 0 0;">
          <span class="weightText2" :style="colorFont(this.back)">医废年总重量（kg）</span>
          <img class="weightImg" src="@/assets/img/day_element2_icon.png">
        </div>
      </div>
      <div class="towDivThree">
        <div>
          <span class="weightText" :style="colorDiv(this.back)">1,676.44</span>
        </div>
        <div style="padding: 7% 0 0 0;">
          <span class="weightText2" :style="colorFont(this.back)">医废日总重量（kg）</span>
          <img class="weightImg" src="@/assets/img/day_element3_icon.png">
        </div>
      </div>
    </div>

    <div class="midDiv">
      <div class="allBottomLeftOneDivSon" :style="backDiv(this.back)">
        <div style="padding:4% 0 0 6%;">
          <span class="midDivText" :style="backF(this.back)">科室年收集总量排序(kg)</span>
        </div>

        <div id="building" style="margin: auto" :style="backP(this.back)">
          <div class="allBottomLeftDiv">
            <div class="numWeightOneTop">
              <span class="weightTop">27,0115.82</span>
            </div>
            <div class="numWeightOneLeft">
              <span class="roomName">1号楼检验科</span>
            </div>
          </div>

          <div class="allBottomLeftDiv">
            <div class="numWeightTowTop">
              <span class="weightTow">27,0115.82</span>
            </div>
            <div class="numWeightOneMid">
              <span class="roomNameTow">麻醉手术科2部</span>
            </div>
          </div>

          <div class="allBottomLeftDiv">
            <div class="numWeightThreeTop">
              <span class="weightTop">27,065.82</span>
            </div>
            <div class="numWeightOneRight">
              <span class="roomName">神经内科二区</span>
            </div>
          </div>
        </div>

      </div>
      <div class="allBottomLeftOneDivSon" style="margin-left: 2%" :style="backDiv(this.back)">
        <div style="padding:4% 0 0 6%;">
          <span class="midDivText" :style="backF(this.back)">近三天收集趋势</span>
        </div>
        <div id="sun" style="width:100%;height: 14vw" />
        <div style="width: 100%;height: 0.28vw;" />
      </div>
    </div>

    <div class="bottomDiv">
      <div class="allBottomLeftOneDivSon" :style="backDiv(this.back)" style="height: 14.7vw">
        <div style="padding:4% 0 0 6%;">
          <span class="midDivText" :style="backF(this.back)">人员收集实时数据</span>
        </div>
        <div>
          <span class="tinyText" style="padding-left: 8%" :style="colorDiv(this.back)">序号</span>
          <span class="tinyText" style="padding-left: 8%" :style="colorDiv(this.back)">收集时间</span>
          <span class="tinyText" style="padding-left: 25%" :style="colorDiv(this.back)">收集人</span>
          <span class="tinyText" style="padding-left: 15%" :style="colorDiv(this.back)">重量(kg)</span>
        </div>

        <div id="leftOne" class="scrDivOne">
          <vue-seamless-scroll :data="listData" :class-option="optionHover" style="height: 10.5vw;float: left;">
            <div v-for="(item, index) in listData" :key="index" style="padding-top: 2%;float: left;width: 50vw;display: flex;">
              <div v-if=" item.id == '1'" class="scrollIdText1"><span v-text="item.id" /></div>
              <div v-else-if=" item.id == '2'" class="scrollIdText2"><span v-text="item.id" /></div>
              <div v-else-if=" item.id == '3'" class="scrollIdText3"><span v-text="item.id" /></div>
              <div v-else class="scrollIdText4"><span v-text="item.id" /></div>
              <div class="scrollTimeText"><span v-text="item.time" /></div>
              <div class="scrollUserText"><span v-text="item.user" /></div>
              <div class="scrollWeightText"><span v-text="item.weight" /></div>
            </div>
          </vue-seamless-scroll>
        </div>

        <div id="leftTow" class="scrDivTow">
          <vue-seamless-scroll :data="listData" :class-option="optionHover" style="height: 10.5vw;float: left">
            <div v-for="(item, index) in listData" :key="index" style="padding-top: 2%;float: left;width: 50vw;display: flex;overflow: hidden">
              <div v-if=" item.id == '1'" class="scrollIdText1"><span v-text="item.id" /></div>
              <div v-else-if=" item.id == '2'" class="scrollIdText2"><span v-text="item.id" /></div>
              <div v-else-if=" item.id == '3'" class="scrollIdText3"><span v-text="item.id" /></div>
              <div v-else class="scrollIdText4"><span v-text="item.id" /></div>
              <div class="scrollTimeText" style="color: white"><span v-text="item.time" /></div>
              <div class="scrollUserText" style="color: white"><span v-text="item.user" /></div>
              <div class="scrollWeightText" style="color: white"><span v-text="item.weight" /></div>
            </div>
          </vue-seamless-scroll>
        </div>

      </div>

      <div class="allBottomLeftOneDivSon" style="margin-left: 2%" :style="backDiv(this.back)">
        <div style="padding:4% 0 0 6%;">
          <span class="midDivText" :style="backF(this.back)">科室收集实时数据</span>
        </div>
        <div>
          <span class="tinyText" style="padding-left: 8%" :style="colorDiv(this.back)">序号</span>
          <span class="tinyText" style="padding-left: 8%" :style="colorDiv(this.back)">收集时间</span>
          <span class="tinyText" style="padding-left: 25%" :style="colorDiv(this.back)">科室名称</span>
          <span class="tinyText" style="padding-left: 15%" :style="colorDiv(this.back)">重量(kg)</span>
        </div>
        <div id="midOne" class="scrDivOne">
          <vue-seamless-scroll :data="listData" :class-option="optionHover" style="height: 10.5vw;float: left">
            <div v-for="(item, index) in listData" :key="index" style="padding-top: 2%;float: left;width: 50vw;display: flex">
              <div v-if=" item.id == '1'" class="scrollIdText1"><span v-text="item.id" /></div>
              <div v-else-if=" item.id == '2'" class="scrollIdText2"><span v-text="item.id" /></div>
              <div v-else-if=" item.id == '3'" class="scrollIdText3"><span v-text="item.id" /></div>
              <div v-else class="scrollIdText4"><span v-text="item.id" /></div>
              <div class="scrollTimeText"><span v-text="item.time" /></div>
              <div class="scrollUserText"><span v-text="item.user" /></div>
              <div class="scrollWeightText"><span v-text="item.weight" /></div>
            </div>
          </vue-seamless-scroll>
        </div>

        <div id="midTow" class="scrDivTow">
          <vue-seamless-scroll :data="listData" :class-option="optionHover" style="height: 10.5vw;float: left">
            <div v-for="(item, index) in listData" :key="index" style="padding-top: 2%;float: left;width: 50vw;display: flex">
              <div v-if=" item.id == '1'" class="scrollIdText1"><span v-text="item.id" /></div>
              <div v-else-if=" item.id == '2'" class="scrollIdText2"><span v-text="item.id" /></div>
              <div v-else-if=" item.id == '3'" class="scrollIdText3"><span v-text="item.id" /></div>
              <div v-else class="scrollIdText4"><span v-text="item.id" /></div>
              <div class="scrollTimeText" style="color: white"><span v-text="item.time" /></div>
              <div class="scrollUserText" style="color: white"><span v-text="item.user" /></div>
              <div class="scrollWeightText" style="color: white"><span v-text="item.weight" /></div>
            </div>
          </vue-seamless-scroll>
        </div>
      </div>

    </div>

    <div class="rightDiv">
      <div style="width: 100%;border-radius: 12px" :style="backDiv(this.back)">

        <div style="padding:4% 0 0 6%;width: 100%">
          <span class="midDivText" :style="backF(this.back)">医废分类占比</span>
          <el-button style="margin-left: 50%;font-family: MicrosoftYaHei;font-size: 0.5vw;color: #5B7BFE;font-weight: 400;" :style="backDiv(this.back)" type="primary" plain>昨日同比增长</el-button>
        </div>

        <div id="bOne" class="borderOne">

          <div id="chartOne" style="width: 100%;height: 10vw;border-radius: 150px" />

        </div>

        <div id="bTow" class="borderTow">

          <div id="chartTow" style="width: 100%;height: 10vw;" />

        </div>

      </div>
    </div>

    <div class="rightDiv" style="margin-top: 1%">
      <div style="width: 100%;border-radius: 12px" :style="backDiv(this.back)">
        <div style="padding:4% 0 0 6%;width: 100%;">
          <span class="midDivText" :style="backF(this.back)">近15天医废收集总量趋势</span>
        </div>
        <div id="text" style="width: 100%;height: 13vw;float: left;" />
      </div>

    </div>
  </div>
</template>

<script>
const { option } = require('runjs')
import vueSeamlessScroll from 'vue-seamless-scroll'

export default {
  name: 'Show',
  components: {
    vueSeamlessScroll: vueSeamlessScroll
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
      fontColor: '#4E6081',
      data8: [
        { value: 1048, name: '感染性废物' },
        { value: 735, name: '损伤性废物' },
        { value: 580, name: '病理性废物' },
        { value: 484, name: '化学性废物' },
        { value: 300, name: '药物性废物' }
      ]
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
        limitMoveNum: 0, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 21, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 0// 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  mounted() {
    this.dateShow()
    this.colo()
    this.lestInt()
  },
  created() {
    this.dateFormat()
  },
  beforeDestroy() {
    this.dataDestroy()
  },
  methods: {
    dataDestroy() {
      if (this.timer) {
        clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
      }
    },
    dateShow() {
      this.timer = setInterval(() => {
        this.dateFormat()
      }, 1000)
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
      const sun = this.$echarts.init(document.getElementById('sun'))
      sun.setOption({
        backgroundColor: this.eColor,
        xAxis: {
          type: 'category',
          data: ['5/20', '5/21', '5/22']
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
            data: [350, 222, 654],
            type: 'line',
            smooth: true
          }
        ]
      })

      const chartOne = this.$echarts.init(document.getElementById('chartOne'))
      window.onresize = function() {
        chartOne.resize()
        sun.resize()
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
          left: '0',
          top: '35%',
          itemWidth: 17, // 图例图形宽度
          itemHeight: 17,
          itemGap: 34, // 图例图标与文字间的间距
          textStyle: {
            fontSize: 14, // 图例文字字体大小
            marginLeft: '10%',
            color: this.fontColor
          },
          formatter: function(name) { // 该函数用于设置图例显示后的百分比
            const data = list
            let total = 0
            let value
            list.forEach((item) => {
              total += item.value
              if (item.name == name) {
                value = item.value
              }
            })
            const p = Math.round(((value / total) * 100)) // 求出百分比
            return `${name}  ${p}%` // 返回出图例所显示的内容是名称+百分比
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
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

      const chartTow = this.$echarts.init(document.getElementById('chartTow'))
      window.onresize = function() {
        chartOne.resize()
        chartTow.resize()
        sun.resize()
      }
      chartTow.setOption({
        title: {
          right: 'right',
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
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          right: '0%',
          top: '35%',
          itemWidth: 17, // 图例图形宽度
          itemHeight: 17,
          itemGap: 34, // 图例图标与文字间的间距
          textStyle: {
            fontSize: 14, // 图例文字字体大小
            color: this.fontColor
          },
          formatter: function(name) { // 该函数用于设置图例显示后的百分比
            const data = list
            let total = 0
            let value
            list.forEach((item) => {
              total += item.value
              if (item.name == name) {
                value = item.value
              }
            })
            const p = Math.round(((value / total) * 100)) // 求出百分比
            return `${name}  ${p}%` // 返回出图例所显示的内容是名称+百分比
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
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

            data: this.data8
          }
        ]
      })

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
            data: ['5/10', '5/11', '5/12', '5/13', '5/14', '5/15', '5/16'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '医疗废弃物总重量',
            interval: 50,
            axisLabel: {
              formatter: '{value} kg'
            }
          },
          {
            type: 'value',
            name: '新冠类废弃物',
            interval: 5,
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
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
            ]
          },
          {
            name: '新冠类废弃物',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function(value) {
                return value + ' °C'
              }
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      })
    },
    lestInt() {
      for (let i = 1; i < 6; i++) {
        const j = {
          id: i,
          time: '2022年5月19日09:38:17',
          user: '赵子星',
          weight: '10.5'
        }
        this.listData.push(j)
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
  padding: 0.5% 20% 0.5% 2.1%;
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
  width: 7vw;
  margin-left: 5%
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
  height: 60%;
  border-right: 1px solid #D3D7EA;
  top: 20%;
  right: 0%;
}

.towDivThree {
  position: relative;
  float: left;
  width: 33.3%;
  padding: 3% 2% 3% 2%;
}

.midDiv {
  margin-top: 1%;
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
  font-size: 0.8vw;
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
  margin-top: 1%;
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
  font-family: MicrosoftYaHei;
  background: #F1F2F6;
  font-size: 0.8vw;
  padding:0.5% 1% 0.5% 1%;
  margin-left: 4.5%;
  border-radius: 50px;
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
  margin-left: 3.5%;
  font-family: MicrosoftYaHei;
  font-size: 0.8vw;
  color: #1D2129;
  font-weight: 400;
}
.scrollWeightText{
  padding-top: 0.5%;
  margin-left: 10%;
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
  width: 29.3vw;
}
.scrDivTow{
  background:#2A2D32;
  position:absolute;
  height: 10.5vw;
  overflow: hidden;
  z-index: 0;
  width: 29.3vw;
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
  margin: 4% 5% 0% 5% ;
}
.borderTow{
  border-radius: 100px 0px 0px 100px;
  border-left: 1px solid #E4E4E4;
  border-top: 1px solid #E4E4E4;
  border-bottom: 1px solid #E4E4E4;
  margin: 5% 5% 5% 5% ;
}
</style>
