<!--<template>-->
<!--  <el-scrollbar style="height: 100%">-->
<!--    <div style="width: 1805px;height: auto">-->
<!--      <div style="width:480px;height: auto;float: right;">-->
<!--        <div id="kiki" style="width: 470px;height: 300px;background-color: #dff0fb;border-radius:10px"></div>-->
<!--        <div id="histogram" style="width: 470px;height: 328px;margin-top: 20px;background-color: #dff0fb;border-radius:10px"></div>-->
<!--        <div id="luci" style="width: 470px;height: 162px;margin: 20px 0 auto ;background-color: #dff0fb;border-radius:10px;">-->
<!--          <div>-->
<!--            <b style="font-size: 17px;float: left">人员收集信息</b>-->
<!--            <div style="width: 100%;height: 90%;float: left;margin-top: 30px;margin-left: -102px">-->
<!--              &ensp;&ensp;<b>收集时间</b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-->
<!--              <b>收集重量</b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-->
<!--              <b>收集人员</b>-->
<!--            </div>-->
<!--            <vue-seamless-scroll :data="listData" :class-option="optionHover" class="seamless-warp">-->
<!--              <div class="item">-->
<!--                <a v-for="item in listData">-->
<!--                  <span class="title" v-text="item.title" style="float: left;margin-left: 15px;color: #828282"></span>-->
<!--                  <span class="date" v-text="item.date" style="float: left;margin-left: 50px;color: #4775d1"></span>-->
<!--                  <span class="uName" v-text="item.uName" style="margin-left: 135px;color: #4775d1"></span><br>-->
<!--                </a>-->
<!--              </div>-->
<!--            </vue-seamless-scroll>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div style="width:480px;height: auto;float: right">-->
<!--        <div id="nono" style="width: 450px;height: 300px;background-color: #dff0fb;border-radius:10px"></div>-->
<!--        <div id="move" style="width: 450px;height: 328px;margin-top: 20px;background-color: #dff0fb;border-radius:10px"></div>-->
<!--        <div style="width: 450px;height: 162px;margin-top: 20px;background-color: #dff0fb;border-radius:10px">-->
<!--          <b style="font-size: 17px;float: left">科室收集信息</b>-->
<!--          <div style="width: 100%;float: left;margin-top: 30px;margin-left: -102px">-->
<!--            &ensp;&ensp;<b>科室</b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-->
<!--            <b>重量</b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;-->
<!--            <b>收集时间</b>-->
<!--          </div>-->
<!--          <vue-seamless-scroll :data="listData2" :class-option="optionHover" class="seamless-warp2">-->
<!--            <div class="item2">-->
<!--              <a v-for="item2 in listData2">-->
<!--                <span class="title2" v-text="item2.title2" style="margin-left: 15px;color: #828282"></span>-->
<!--                <span class="date2" v-text="item2.date2" style="float: right;margin-right: 220px;color: #4775d1"></span>-->
<!--                <span class="uName2" v-text="item2.uName2" style="float: right;margin-right: 15px;color: #4775d1;margin-top: -20px"></span><br>-->
<!--              </a>-->
<!--            </div>-->
<!--          </vue-seamless-scroll>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div style="min-width: 820px;height: 650px;float: left;">-->
<!--        <div id="sun" style="width: 820px;height: 300px;background-color: #dff0fb;border-radius:10px"></div>-->
<!--        <div  style="width: 820px;height: 300px;background-color: #dff0fb;border-radius:10px;margin-top: 20px">-->
<!--          <img src="../assets/dingw.png" style="width: 810px;height: 290px;border-radius:10px;margin-left: 5px;margin-top: 5px">-->
<!--        </div>-->
<!--      </div>-->
<!--      <div style="width:820px;height: 162px;margin-top: 20px;background-color: #dff0fb;border-radius:10px;float: left;z-index: 1">-->
<!--        <vue-seamless-scroll :data="listData" :class-option="optionHover2" class="warp">-->
<!--          <ul class="ul-item">-->
<!--            <li class="li-item" v-for="(item, index) in listData3" :key="index">-->
<!--              <a style="float: left;margin-top: -45px">&ensp;{{ item.item3 }}</a>-->
<!--              <a>{{ item.date3 }}</a>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </vue-seamless-scroll>-->
<!--      </div>-->
<!--    </div>-->
<!--  </el-scrollbar>-->
<!--</template>-->

<!--<script>-->
<!--import * as echarts from 'echarts'-->
<!--import vueSeamlessScroll from 'vue-seamless-scroll'-->
<!--export default {-->
<!--  name: 'userMain',-->
<!--  components: {-->
<!--    vueSeamlessScroll-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      charts: "",-->
<!--      opinion: ["传染性", "损伤性","病理性","化学性","药物性"],-->
<!--      listData2: [{-->
<!--        'title2': '眼科',-->
<!--        'date2': '15.6kg',-->
<!--        'uName2':"2021-5-24 8:29:11"-->
<!--      },{-->
<!--        'title2': '眼科',-->
<!--        'date2': '15.6kg',-->
<!--        'uName2':"2021-5-24 8:29:11"-->
<!--      },{-->
<!--        'title2': '眼科',-->
<!--        'date2': '15.6kg',-->
<!--        'uName2':"2021-5-24 8:29:11"-->
<!--      },{-->
<!--        'title2': '眼科',-->
<!--        'date2': '15.6kg',-->
<!--        'uName2':"2021-5-24 8:29:11"-->
<!--      },{-->
<!--        'title2': '眼科',-->
<!--        'date2': '15.6kg',-->
<!--        'uName2':"2021-5-24 8:29:11"-->
<!--      },{-->
<!--        'title2': '眼科',-->
<!--        'date2': '15.6kg',-->
<!--        'uName2':"2021-5-24 8:29:11"-->
<!--      },{-->
<!--        'title2': '眼科',-->
<!--        'date2': '15.6kg',-->
<!--        'uName2':"2021-5-24 8:29:11"-->
<!--      },],-->
<!--      listData: [{-->
<!--          'title': '2021-5-24 8:29:11',-->
<!--          'date': '15.6kg',-->
<!--          'uName':'赵子星'-->
<!--        },{-->
<!--        'title': '2021-5-24 8:29:11',-->
<!--        'date': '15.6kg',-->
<!--        'uName':'赵子星'-->
<!--      },{-->
<!--        'title': '2021-5-24 8:29:11',-->
<!--        'date': '15.6kg',-->
<!--        'uName':'赵子星'-->
<!--      },{-->
<!--        'title': '2021-5-24 8:29:11',-->
<!--        'date': '15.6kg',-->
<!--        'uName':'赵子星'-->
<!--      },{-->
<!--        'title': '2021-5-24 8:29:11',-->
<!--        'date': '15.6kg',-->
<!--        'uName':'赵子星'-->
<!--      },{-->
<!--        'title': '2021-5-24 8:29:11',-->
<!--        'date': '15.6kg',-->
<!--        'uName':'赵子星'-->
<!--      },{-->
<!--        'title': '2021-5-24 8:29:11',-->
<!--        'date': '15.6kg',-->
<!--        'uName':'赵子星'-->
<!--      },{-->
<!--        'title': '2021-5-24 8:29:11',-->
<!--        'date': '15.6kg',-->
<!--        'uName':'赵子星'-->
<!--      },{-->
<!--        'title': '2021-5-24 8:29:11',-->
<!--        'date': '15.6kg',-->
<!--        'uName':'赵子星'-->
<!--      },{-->
<!--        'title': '2021-5-24 8:29:11',-->
<!--        'date': '15.6kg',-->
<!--        'uName':'赵子星'-->
<!--      },],-->
<!--      listData3: [{-->
<!--        'item3': '眼科',-->
<!--        'date3': '2017-12-16'-->
<!--      },{-->
<!--        'item3': '眼科',-->
<!--        'date3': '2017-12-16'-->
<!--      },{-->
<!--        'item3': '眼科',-->
<!--        'date3': '2017-12-16'-->
<!--      },{-->
<!--        'item3': '眼科',-->
<!--        'date3': '2017-12-16'-->
<!--      },{-->
<!--        'item3': '眼科',-->
<!--        'date3': '2017-12-16'-->
<!--      },{-->
<!--        'item3': '眼科',-->
<!--        'date3': '2017-12-16'-->
<!--      },{-->
<!--        'item3': '眼科',-->
<!--        'date3': '2017-12-16'-->
<!--      },{-->
<!--        'item3': '眼科',-->
<!--        'date3': '2017-12-16'-->
<!--      }]-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    optionHover () {-->
<!--      return {-->
<!--        step: 1, // 数值越大速度滚动越快-->
<!--        limitMoveNum: 0, // 开始无缝滚动的数据量 this.dataList.length-->
<!--        hoverStop: true, // 是否开启鼠标悬停stop-->
<!--        direction: 1, // 0向下 1向上 2向左 3向右-->
<!--        openWatch: true, // 开启数据实时监控刷新dom-->
<!--        singleHeight: 21, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1-->
<!--        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3-->
<!--        waitTime: 1000,// 单步运动停止的时间(默认值1000ms)-->
<!--      }-->
<!--    },-->
<!--    optionHover2 () {-->
<!--      return {-->
<!--        step: 1, // 数值越大速度滚动越快-->
<!--        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length-->
<!--        hoverStop: true, // 是否开启鼠标悬停stop-->
<!--        direction: 2, // 0向下 1向上 2向左 3向右-->
<!--        openWatch: true, // 开启数据实时监控刷新dom-->
<!--        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1-->
<!--        singleWidth: 150, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3-->
<!--        waitTime: 1000,// 单步运动停止的时间(默认值1000ms)-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  mounted () {-->
<!--    const myChart1 = echarts.init(document.getElementById('histogram'))-->
<!--    myChart1.setOption({-->
<!--      grid:{-->
<!--        left:'13%',-->
<!--        right:'13%',-->
<!--        bottom:'6%',-->
<!--      },-->
<!--      title: {-->
<!--        text: '出入库情况',-->
<!--        subtext: '2021/1/1-2021/1/7',-->
<!--        left: 'left'-->
<!--      },-->
<!--        tooltip: {-->
<!--          trigger: 'axis',-->
<!--          axisPointer: {-->
<!--            type: 'cross',-->
<!--            crossStyle: {-->
<!--              color: '#999'-->
<!--            }-->
<!--          }-->
<!--        },-->
<!--        toolbox: {-->
<!--          feature: {-->
<!--            dataView: { show: true, readOnly: true },-->
<!--            magicType: { show: true, type: ['line', 'bar'] },-->
<!--            restore: { show: true },-->
<!--            saveAsImage: { show: true }-->
<!--          }-->
<!--        },-->
<!--        legend: {-->
<!--          data: ['医废收集', 'Precipitation', '医废出库']-->
<!--        },-->
<!--        xAxis: [-->
<!--          {-->
<!--            type: 'category',-->
<!--            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],-->
<!--            axisPointer: {-->
<!--              type: 'shadow'-->
<!--            }-->
<!--          }-->
<!--        ],-->
<!--        yAxis: [-->
<!--          {-->
<!--            type: 'value',-->
<!--            min: 0,-->
<!--            max: 1400,-->
<!--            interval: 300,-->
<!--            axisLabel: {-->
<!--              formatter: '{value} kg'-->
<!--            }-->
<!--          },-->
<!--          {-->
<!--            type: 'value',-->
<!--            min: 0,-->
<!--            max: 1400,-->
<!--            interval: 300,-->
<!--            axisLabel: {-->
<!--              formatter: '{value} kg'-->
<!--            }-->
<!--          }-->
<!--        ],-->
<!--        series: [-->
<!--          {-->
<!--            name: '医废收集',-->
<!--            type: 'bar',-->
<!--            data: [150, 200, 380, 425, 799, 695, 859]-->
<!--          },-->

<!--          {-->
<!--            name: '医废出库',-->
<!--            type: 'line',-->
<!--            yAxisIndex: 1,-->
<!--            data: [150, 200, 380, 425, 799, 695, 859]-->
<!--          }-->
<!--        ]-->
<!--    });-->

<!--    const sun = echarts.init(document.getElementById('sun'))-->
<!--    sun.setOption({-->
<!--        title: {-->
<!--          text: '医废日报表',-->
<!--          subtext: '2021/01/01',-->
<!--        },-->
<!--        tooltip: {-->
<!--          trigger: 'axis'-->
<!--        },-->
<!--        legend: {-->
<!--          data: ["感染性", "损伤性","病理性","化学性",'药物性']-->
<!--        },-->
<!--        grid: {-->
<!--          left: '3%',-->
<!--          right: '4%',-->
<!--          bottom: '3%',-->
<!--          containLabel: true-->
<!--        },-->
<!--        toolbox: {-->
<!--          feature: {-->
<!--            saveAsImage: {}-->
<!--          }-->
<!--        },-->
<!--        xAxis: {-->
<!--          type: 'category',-->
<!--          boundaryGap: false,-->
<!--          data: []-->
<!--        },-->
<!--        yAxis: {-->
<!--          type: 'value'-->
<!--        },-->
<!--        series: []-->
<!--    });-->

<!--    const nono = echarts.init(document.getElementById('nono'))-->
<!--    nono.setOption({-->
<!--      toolbox: {-->
<!--        feature: {-->
<!--          saveAsImage: {}-->
<!--        }-->
<!--      },-->
<!--      title: {-->
<!--        text: '月医废分析',-->
<!--        subtext: '2021/01/04',-->
<!--        left: 'left'-->
<!--      },-->
<!--      tooltip: {-->
<!--        trigger: 'item'-->
<!--      },-->
<!--      legend: {-->
<!--        orient: 'vertical',-->
<!--        x: 'left',-->
<!--        y:'bottom',-->
<!--      },-->
<!--      series: [-->
<!--        {-->
<!--          name: '占比',-->
<!--          type: 'pie',-->
<!--          center:['60%','50%'],-->
<!--          radius: ['50%', '75%'],-->
<!--          avoidLabelOverlap: false,-->
<!--          label: {-->
<!--            show: false,-->
<!--            position: 'center'-->
<!--          },-->
<!--          emphasis: {-->
<!--            label: {-->
<!--              show: true,-->
<!--              fontSize: '22',-->
<!--              fontWeight: 'bold'-->
<!--            }-->
<!--          },-->
<!--          labelLine: {-->
<!--            show: false-->
<!--          },-->
<!--          data: [-->
<!--            { value: 1048, name: '感染性' },-->
<!--            { value: 735, name: '损伤性' },-->
<!--            { value: 580, name: '病理性' },-->
<!--            { value: 484, name: '化学性' },-->
<!--            { value: 300, name: '药物性' }-->
<!--          ]-->
<!--        }-->
<!--      ]-->
<!--    });-->

<!--    const chartDom = echarts.init(document.getElementById('move'))-->
<!--    chartDom.setOption({-->
<!--      title: {-->
<!--        text: '近15天医废收集趋势'-->
<!--      },-->
<!--      tooltip: {-->
<!--        trigger: 'axis',-->
<!--        axisPointer: {-->
<!--          type: 'cross',-->
<!--          label: {-->
<!--            backgroundColor: '#6a7985'-->
<!--          }-->
<!--        }-->
<!--      },-->
<!--      legend: {-->
<!--        data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']-->
<!--      },-->
<!--      toolbox: {-->
<!--        feature: {-->
<!--          saveAsImage: {}-->
<!--        }-->
<!--      },-->
<!--      grid: {-->
<!--        left: '3%',-->
<!--        right: '4%',-->
<!--        bottom: '3%',-->
<!--        containLabel: true-->
<!--      },-->
<!--      xAxis: [-->
<!--        {-->
<!--          type: 'category',-->
<!--          boundaryGap: false,-->
<!--          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']-->
<!--        }-->
<!--      ],-->
<!--      yAxis: [-->
<!--        {-->
<!--          type: 'value'-->
<!--        }-->
<!--      ],-->
<!--      series: [-->
<!--        {-->
<!--          type: 'line',-->
<!--          smooth: true,-->
<!--          lineStyle: {-->
<!--            width: 0-->
<!--          },-->
<!--          showSymbol: false,-->
<!--          label: {-->
<!--            show: true,-->
<!--            position: 'top'-->
<!--          },-->
<!--          areaStyle: {-->
<!--            opacity: 0.9,-->
<!--            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [-->
<!--              {-->
<!--                offset: 0,-->
<!--                color: '#6a7985'-->
<!--              },-->
<!--            ])-->
<!--          },-->
<!--          emphasis: {-->
<!--            focus: 'series'-->
<!--          },-->
<!--          data: [10, 20, 30, 40, 30, 21, 43, 56, 67, 49, 22, 45, 34, 56, 71]-->
<!--        }-->
<!--      ]-->
<!--    })-->

<!--    const kiki = echarts.init(document.getElementById("kiki"))-->
<!--    kiki.setOption({-->
<!--      toolbox: {-->
<!--        feature: {-->
<!--          saveAsImage: {}-->
<!--        }-->
<!--      },-->
<!--      title: {-->
<!--        text: '日医废分析',-->
<!--        subtext: '2021/01/04',-->
<!--        left: 'left'-->
<!--      },-->
<!--      tooltip: {-->
<!--        trigger: 'item',-->
<!--      },-->
<!--      legend: {-->
<!--        color: "#000000",-->
<!--        orient: 'vertical',-->
<!--        x: 'left',-->
<!--        y:'bottom',-->
<!--      },-->
<!--      series: [-->
<!--        {-->
<!--          name: 'Access From',-->
<!--          type: 'pie',-->
<!--          center:['60%','50%'],-->
<!--          radius: '75%',-->
<!--          data: [],-->
<!--          emphasis: {-->
<!--            itemStyle: {-->
<!--              shadowBlur: 0,-->
<!--              shadowOffsetX: 0,-->
<!--              shadowColor: 'rgba(0, 0, 0, 0)'-->
<!--            }-->
<!--          }-->
<!--        }-->
<!--      ]-->
<!--    })-->
<!--    this.$axios.post("/getDayTrash",{-->
<!--    }).then(response=>{-->
<!--      console.log(response.data.day)-->
<!--      sun.setOption({-->
<!--        xAxis:{-->
<!--          data:response.data.time-->
<!--        },-->
<!--        series:response.data.trash-->
<!--      })-->
<!--      kiki.setOption({-->
<!--        series:[{-->
<!--          data:response.data.day-->
<!--        }]-->
<!--      })-->
<!--    }).catch(error=>{-->
<!--    })-->

<!--  },-->
<!--  watch: {},-->
<!--  created() {-->

<!--  },-->
<!--  methods: {-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--/* // 去掉滚动条的默认样式 */-->
<!--.seamless-warp {-->
<!--  width: 100%;-->
<!--  height: 112px;-->
<!--  overflow: hidden;-->
<!--}-->
<!--.seamless-warp2 {-->
<!--  width: 100%;-->
<!--  height: 112px;-->
<!--  overflow: hidden;-->
<!--}-->
<!--</style>-->
<!--<style lang="scss" scoped>-->
<!--.warp {-->
<!--  width: 820PX;-->
<!--  height: 150px;-->
<!--  //margin: 0 auto;-->
<!--  overflow: hidden;-->
<!--  ul {-->
<!--    list-style: none;-->
<!--    padding: 0;-->
<!--    margin: 0 auto;-->
<!--    &.ul-item {-->
<!--      display: flex;-->
<!--      .li-item {-->
<!--        width: 140px;-->
<!--        height: 140px;-->
<!--        margin-right: 10px;-->
<!--        line-height: 120px;-->
<!--        background-color: #2c8ff1;-->
<!--        color: #fff;-->
<!--        text-align: center;-->
<!--        font-size: 15px;-->
<!--        margin-top: 12px;-->
<!--        border-radius: 10px;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
