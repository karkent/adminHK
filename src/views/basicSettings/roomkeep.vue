<!--<template>-->
<!--  <div>-->
<!--    <div id="myChart" ref="myChart" style="height: 500px;width: 100%"></div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'Roomkeep',-->
<!--  data() {-->
<!--    return {}-->
<!--  },-->
<!--  mounted() {-->
<!--    let option = {-->
<!--      title: {-->
<!--        text: 'Stacked Line'-->
<!--      },-->
<!--      tooltip: {-->
<!--        trigger: 'axis'-->
<!--      },-->
<!--      legend: {-->
<!--        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']-->
<!--      },-->
<!--      grid: {-->
<!--        left: '3%',-->
<!--        right: '4%',-->
<!--        bottom: '3%',-->
<!--        containLabel: true-->
<!--      },-->
<!--      toolbox: {-->
<!--        feature: {-->
<!--          saveAsImage: {}-->
<!--        }-->
<!--      },-->
<!--      xAxis: {-->
<!--        type: 'category',-->
<!--        boundaryGap: false,-->
<!--        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']-->
<!--      },-->
<!--      yAxis: {-->
<!--        type: 'value'-->
<!--      },-->
<!--      series: [-->
<!--        {-->
<!--          name: 'Email',-->
<!--          type: 'line',-->
<!--          stack: 'Total',-->
<!--          data: [120, 132, 101, 134, 90, 230, 210]-->
<!--        },-->
<!--        {-->
<!--          name: 'Union Ads',-->
<!--          type: 'line',-->
<!--          stack: 'Total',-->
<!--          data: [220, 182, 191, 234, 290, 330, 310]-->
<!--        },-->
<!--        {-->
<!--          name: 'Video Ads',-->
<!--          type: 'line',-->
<!--          stack: 'Total',-->
<!--          data: [150, 232, 201, 154, 190, 330, 410]-->
<!--        },-->
<!--        {-->
<!--          name: 'Direct',-->
<!--          type: 'line',-->
<!--          stack: 'Total',-->
<!--          data: [320, 332, 301, 334, 390, 330, 320]-->
<!--        },-->
<!--        {-->
<!--          name: 'Search Engine',-->
<!--          type: 'line',-->
<!--          stack: 'Total',-->
<!--          data: [820, 932, 901, 934, 1290, 1330, 1320]-->
<!--        }-->
<!--      ]-->
<!--    }-->
<!--    let myChart = this.$echarts.init(document.getElementById('myChart'))-->
<!--    myChart.setOption({-->
<!--        title: {-->
<!--          text: "图表标题"-->
<!--        },-->
<!--        tooltip: {-->
<!--          trigger: "axis"-->
<!--        },-->
<!--        legend: { // 数据 线的标题-->
<!--          data: [-->
<!--            "Email",-->
<!--            "Union Ads",-->
<!--            "Video Ads",-->
<!--            "Direct",-->
<!--            "Search Engine"-->
<!--          ]-->
<!--        },-->
<!--        grid: {-->
<!--          left: "3%",-->
<!--          right: "4%",-->
<!--          bottom: "3%",-->
<!--          containLabel: true-->
<!--        },-->
<!--        toolbox: {-->
<!--          feature: {-->
<!--            saveAsImage: { }-->
<!--          }-->
<!--        },-->
<!--        xAxis: {-->
<!--          type: "category",-->
<!--          boundaryGap: false,-->
<!--          data: [-->
<!--            "2021-11-22",-->
<!--            "2021-11-23",-->
<!--            "2021-11-24",-->
<!--            "2021-11-25",-->
<!--            "2021-11-26",-->
<!--            "2021-11-27",-->
<!--            "2021-11-28"-->
<!--          ]-->
<!--        },-->
<!--        yAxis: {-->
<!--          type: "value"-->
<!--        },-->
<!--        series: [-->
<!--          {-->
<!--            name: "Email",-->
<!--            type: "line",-->
<!--            stack: "Total",-->
<!--            data: [-->
<!--              120,-->
<!--              132,-->
<!--              101,-->
<!--              134,-->
<!--              90,-->
<!--              230,-->
<!--              210-->
<!--            ]-->
<!--          },-->
<!--          {-->
<!--            name: "Union Ads",-->
<!--            type: "line",-->
<!--            stack: "Total",-->
<!--            data: [-->
<!--              220,-->
<!--              182,-->
<!--              191,-->
<!--              234,-->
<!--              290,-->
<!--              330,-->
<!--              310-->
<!--            ]-->
<!--          },-->
<!--          {-->
<!--            name: "Video Ads",-->
<!--            type: "line",-->
<!--            stack: "Total",-->
<!--            data: [-->
<!--              150,-->
<!--              232,-->
<!--              201,-->
<!--              154,-->
<!--              190,-->
<!--              330,-->
<!--              410-->
<!--            ]-->
<!--          },-->
<!--          {-->
<!--            name: "Direct",-->
<!--            type: "line",-->
<!--            stack: "Total",-->
<!--            data: [-->
<!--              320,-->
<!--              332,-->
<!--              301,-->
<!--              334,-->
<!--              390,-->
<!--              330,-->
<!--              320-->
<!--            ]-->
<!--          },-->
<!--          {-->
<!--            name: "Search Engine",-->
<!--            type: "line",-->
<!--            stack: "Total",-->
<!--            data: [-->
<!--              820,-->
<!--              932,-->
<!--              901,-->
<!--              934,-->
<!--              1290,-->
<!--              1330,-->
<!--              1320-->
<!--            ]-->
<!--          }-->
<!--        ]-->
<!--      }-->
<!--    )-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
