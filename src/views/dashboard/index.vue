<template>
  <div>
    <div class="baseroot" style=" margin: 5px; display:flex ; justify-content: space-between">
      <!--      左面板-->
      <div class="leftPanel" style="display: flex; flex-flow: column; width: 50%">
        <!--  医废 行-->
        <div class="leftrow1" style="width: 100% ; border: 1px solid #85bbd2; background:#85bbd210;  margin-top: 5px ; border-radius: 10px">
          <div style="float:left;width: 100%;height: 300px;">
            <!-- 医疗废物日报表-->
            <p style="font-weight: bold ; font-size: 15px ; margin-left: 50px">医废日报表</p>
            <div id="sun" style="width: 100%;height: 250px;border-radius:10px" />
          </div>
        </div>
        <!-- 图片行-->
        <div class="leftrow2" style="width: 100% ; border: 1px solid #85bbd2; margin-top: 5px ; border-radius: 10px">
          <div style="width: 100%;height: 250px;background-color: #dff0fb;float: left; border-radius:10px">
            <img
              src="../../assets/img/dingw.png"
              style="width:100%;height: 250px;
              border-radius:10px"
            >
          </div>
        </div>

        <!-- 滑动行-->
        <div class="leftrow3" style="width: 100% ; border: 1px solid #85bbd2; margin-top: 5px ; border-radius: 10px">
          <div
            style="width:100%;height: 300px;background-color: #dff0fb;float: left;z-index: 1; border-radius: 10px"
          >
            <vue-seamless-scroll :data="listData" :class-option="optionHover2" class="warp">
              <ul class="ul-item">
                <li v-for="(item, index) in listData3" :key="index" class="li-item">
                  <a style="float: left;margin-top: -45px">{{ item.item3 }}</a>
                  <a>{{ item.date3 }}</a>
                </li>
              </ul>
            </vue-seamless-scroll>
          </div>
        </div>
      </div>

      <!--      右面板-->
      <div class="rightPanel" style="display: flex; width:50%; justify-content: space-between">
        <!-- 列布局 1-->
        <div class="rightcon1" style="width: 50% ;  flex-flow: column; justify-content: space-between; border-radius: 10px">
          <!--          月度分析-->
          <div style="width: 100%;height: 300px;  border: 1px solid #85bbd2;margin-left: 5px ; margin-top: 5px ;background:#85bbd210;float: left; border-radius:10px">
            <div id="month" class="Day_month_analysis" style="width: 100% ; height: 100%" />
          </div>

          <!--         近十五天-->
          <div style="width: 100%;height: 250px;  border: 1px solid #85bbd2;margin-left: 5px ; margin-top: 5px ;background:#85bbd210;float: left; border-radius:10px">
            <!--            近十五天医废收集趋势-->
            <div id="inOut15" style="width: 100% ; height: 100%" />
          </div>
          <!--          科室收集信息-->
          <div style="width: 100%;height: 300px;  border: 1px solid #85bbd2; margin-left: 5px ; margin-top: 5px ;background:#85bbd210;float: left; border-radius:10px">
            <!--    科室收集信息-->
            <div style="width: 95% ; height: 100% ; border-radius:10px">
              <b style="font-size: 17px;float: left; margin-left: 5% ; margin-top: 5%">科室收集信息</b>
              <div style="width: 95%;float: left;margin-top: 5%;">
                <b style="float: left;margin-left: 5%">科室</b>
                <b style="float: left;margin-left: 10%">重量</b>
                <b style="margin-left: 10%">收集时间</b>
              </div>
              <vue-seamless-scroll style="margin-top: 5%" :data="listData2" :class-option="optionHover" class="seamless-warp2">
                <div class="item2">
                  <a v-for="(item2, index) in listData2" :key="index">
                    <div style="margin-top: 5%">
                      <span class="title2" style="float: left;margin-left: 5%;color: #828282" v-text="item2.title2" />
                      <span class="date2" style="float: left;margin-left: 5%;color: #4775d1" v-text="item2.date2" />
                      <span class="uName2" style="margin-left: 10%;color: #4775d1" v-text="item2.uName2" />
                      <br>
                    </div>
                  </a>
                </div>
              </vue-seamless-scroll>
            </div>
          </div>

        </div>

        <!-- 列布局 2-->
        <div class="rightcon1" style="width: 50% ; margin-left: 5px; flex-flow: column; justify-content: space-between; border-radius: 10px">
          <!--          日分析-->
          <div style="width: 100%;height: 300px;  border: 1px solid #85bbd2;margin-left: 5px ; margin-top: 5px ;background:#85bbd210;float: left; border-radius:10px">
            <div id="day" class="Day_month_analysis" style="width: 100% ; height: 100%" />
          </div>

          <!--         出库情况-->
          <div style="width: 100%;height: 250px;  border: 1px solid #85bbd2; margin-left: 5px ; margin-top: 5px ;background:#85bbd210;float: left; border-radius:10px">
            <!--        出入库信息-->
            <div id="histogram" style="width: 100% ; height: 100%" />
          </div>
          <!--          人员集信息-->
          <div style="width: 100%;height: 300px;  border: 1px solid #85bbd2; margin-left: 5px ; margin-top: 5px ;background:#85bbd210;float: left; border-radius:10px">
            <!--     人员收集信息-->
            <div style="width: 95% ; height: 100% ; border-radius:10px">
              <b style="font-size: 17px;float: left; margin-left: 5% ; margin-top: 5%">人员收集信息</b>
              <div style="width: 95%;float: left;margin-top: 5%;">
                <b style="float: left;margin-left: 5%">收集人员</b>
                <b style="float: left;margin-left: 10%">收集重量</b>
                <b style="margin-left: 10%">收集时间</b>
              </div>
              <vue-seamless-scroll style="margin-top: 5%" :data="listData" :class-option="optionHover" class="seamless-warp2">
                <div class="item">
                  <a v-for="(item, index) in listData" :key="index">
                    <div style="margin-top: 5%">
                      <span class="uName" style="margin-left: 5%;color: #4775d1" v-text="item.uName" />
                      <span class="date" style="float: left;margin-left: 5%;color: #4775d1" v-text="item.date" />
                      <span class="title" style="float: left;margin-left: 5%;color: #828282" v-text="item.title" />

                      <br>
                    </div>
                  </a>
                </div>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>
      </div>
    </div>
    <warning ref="initWarning" />
    <!--    定位的图-->
  </div>
</template>
<script>
import * as echarts from 'echarts'
import vueSeamlessScroll from 'vue-seamless-scroll'
import '../../assets/customed'
import request from '../../utils/request'
import { setInterval, clearInterval } from 'timers'
import warning from '../../../src/warning'
export default {
  name: 'Dashboard',
  components: {
    vueSeamlessScroll: vueSeamlessScroll,
    warning: warning
  },
  data() {
    return {
      timer: null,
      charts: '',
      opinion: ['传染性', '损伤性', '病理性', '化学性', '药物性'],
      listData2: [
        {
          'title2': '眼科',
          'date2': '15.6kg',
          'uName2': '2021-5-24 8:29:11'
        }, {
          'title2': '眼科',
          'date2': '15.6kg',
          'uName2': '2021-5-24 8:29:11'
        }, {
          'title2': '眼科',
          'date2': '15.6kg',
          'uName2': '2021-5-24 8:29:11'
        }, {
          'title2': '眼科',
          'date2': '15.6kg',
          'uName2': '2021-5-24 8:29:11'
        }, {
          'title2': '眼科',
          'date2': '15.6kg',
          'uName2': '2021-5-24 8:29:11'
        }, {
          'title2': '眼科',
          'date2': '15.6kg',
          'uName2': '2021-5-24 8:29:11'
        }],
      listData: [{
        'title': '2021-5-24 8:29:11',
        'date': '15.6kg',
        'uName': '赵子星'
      }, {
        'title': '2021-5-24 8:29:11',
        'date': '15.6kg',
        'uName': '赵子星'
      }, {
        'title': '2021-5-24 8:29:11',
        'date': '15.6kg',
        'uName': '赵子星'
      }, {
        'title': '2021-5-24 8:29:11',
        'date': '15.6kg',
        'uName': '赵子星'
      }, {
        'title': '2021-5-24 8:29:11',
        'date': '15.6kg',
        'uName': '赵子星'
      }, {
        'title': '2021-5-24 8:29:11',
        'date': '15.6kg',
        'uName': '赵子星'
      }, {
        'title': '2021-5-24 8:29:11',
        'date': '15.6kg',
        'uName': '赵子星'
      }, {
        'title': '2021-5-24 8:29:11',
        'date': '15.6kg',
        'uName': '赵子星'
      }, {
        'title': '2021-5-24 8:29:11',
        'date': '15.6kg',
        'uName': '赵子星'
      }, {
        'title': '2021-5-24 8:29:11',
        'date': '15.6kg',
        'uName': '赵子星'
      }],
      listData3: [{
        'item3': '眼科',
        'date3': '2017-12-16'
      }, {
        'item3': '眼科',
        'date3': '2017-12-16'
      }, {
        'item3': '眼科',
        'date3': '2017-12-16'
      }, {
        'item3': '眼科',
        'date3': '2017-12-16'
      }, {
        'item3': '眼科',
        'date3': '2017-12-16'
      }, {
        'item3': '眼科',
        'date3': '2017-12-16'
      }, {
        'item3': '眼科',
        'date3': '2017-12-16'
      }, {
        'item3': '眼科',
        'date3': '2017-12-16'
      }]
    }
  },
  computed: {
    optionHover() {
      return {
        step: 1, // 数值越大速度滚动越快
        limitMoveNum: 0, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 21, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000// 单步运动停止的时间(默认值1000ms)
      }
    },
    optionHover2() {
      return {
        step: 1, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 2, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 150, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000// 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  watch: {},
  mounted() {
    this.$refs.initWarning.init()

    this.createSetInterval() // 开启定时器

    var w = window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth

    var h = window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    // x.innerHTML="浏览器的内部窗口宽度：" + w + "，高度：" + h + "。"
    this.divStyle = 'height: 1800px'

    request.post('dashboard/getStatistics', {
      data: ''
    }).then(res => {
      const month = this.$echarts.init(document.getElementById('month'), 'customed')
      month.setOption({
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        title: {
          text: '月医废分析',
          subtext: res.MonthStart + '至' + res.nowdate,
          left: 'left'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          color: '#000000',
          orient: 'vertical',
          x: 'left',
          y: 'bottom'
        },
        series: [
          {
            name: '占比',
            type: 'pie',
            center: ['62%', '50%'],
            radius: ['50%', '75%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '14',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: res.monthList
          }
        ]
      })
      const day = this.$echarts.init(document.getElementById('day'), 'customed')
      day.setOption({
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        title: {
          text: '日医废分析',
          subtext: res.nowdate,
          left: 'left'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          color: '#000000',
          orient: 'vertical',
          x: 'left',
          y: 'bottom'
        },
        series: [
          {
            name: '占比',
            type: 'pie',
            center: ['60%', '50%'],
            radius: ['50%', '75%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '22',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: res.dayList
          }
        ]
      })
      // 近十五天 收集趋势
      const inOut15 = this.$echarts.init(document.getElementById('inOut15'), 'customed')
      inOut15.setOption({
        title: {
          text: '近15天医废收集趋势'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#a3cf62'
            }
          }
        },
        legend: {
          data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {
              opacity: 0.9,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#769149'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: res.inOut15
          }
        ]
      })
      // 出入库
      const myChart1 = this.$echarts.init(document.getElementById('histogram'), 'customed')
      myChart1.setOption({
        grid: {
          left: '13%',
          right: '13%',
          bottom: '6%'
        },
        title: {
          text: '出入库情况',
          subtext: res.Monday + '至' + res.nowdate,
          left: 'left'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: true },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['医废收集', 'Precipitation', '医废出库']
        },
        xAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 2400,
            interval: 200,
            axisLabel: {
              formatter: '{value} kg'
            }
          },
          {
            type: 'value',
            min: 0,
            max: 2400,
            interval: 200,
            axisLabel: {
              formatter: '{value} kg'
            }
          }
        ],
        series: [
          {
            name: '医废收集',
            type: 'bar',
            data: res.collectWeight
          },

          {
            name: '医废出库',
            type: 'line',
            yAxisIndex: 1,
            data: res.outWeight
          }
        ]
      })

      // 折线图
      const sun = this.$echarts.init(document.getElementById('sun'), 'customed')
      sun.setOption({
        // title: {
        //   text: '医废日报表',
        //   subtext: res.nowdate
        // },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: res.LineMap.nameArray
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: res.LineMap.timeArray
        },
        yAxis: {
          type: 'value'
        },
        series: res.LineMap.list
      })
    })
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    createSetInterval() {
      this.stopSetInterval()
      const _this = this
      this.timer = setInterval(() => {
        _this.realTime()
      }, 1000 * 60 * 15) // 15分钟请求一次
    },
    realTime() { // 向后台发请求
      request.post('dashboard/realTime', {
        data: ''
      }).then(res => {
        this.$message(res.msg)
      })
    },
    // 关闭轮询
    stopSetInterval() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  }
}
</script>
<style>
/* // 去掉滚动条的默认样式 */
.seamless-warp {
  margin-top: 5%;
  width: 100%;
  height: 70%;
  overflow: hidden;
}
.seamless-warp2 {
  margin-top: 5%;
  width: 100%;
  height: 70%;
  overflow: hidden;
}
</style>
<style lang="scss" scoped>
.warp {
  width: 100%;
  height: 300px;
  //margin: 0 auto;
  overflow: hidden;
  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    &.ul-item {
      display: flex;
      .li-item {
        width: 100px;
        height: 270px;
        margin-right: 10px;
        line-height: 200px;
        background-color: #2c8ff1;
        color: #fff;
        text-align: center;
        font-size: 15px;
        margin-top: 15px;
        border-radius: 10px;
      }
    }
  }
}
.DIV_analysis {
  float:left;
  width: 33%;
  height: 320px;
}
.Day_month_analysis {
  //border: 1px solid #808080;
  //box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  //border-radius: 10px;
  ////min-width: 50%;
  ////max-width: 110%;
  ////height: 300px;
  ///*background-color: #f6f7f8;*/
  //margin: 10px 10px 0px 10px;
}
.inOut_15_stock {
  border: 1px solid #808080;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  min-width: 50%;
  max-width: 110%;
  height: 300px;
  /*background-color: #f6f7f8;*/
  margin: 10px 10px 0px 10px;
}
.people_Department_work {
  border: 1px solid #808080;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  min-width: 50%;
  max-width: 110%;
  height: 300px;
  /*background-color: #f6f7f8;*/
  margin: 10px 10px 0px 10px;
}
</style>
