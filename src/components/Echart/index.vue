<template>
  <div id="myChart" :style="{ width: '300px', height: '300px' }"></div>
</template>

<script>
// 引入基本模板
// let echarts = require("echarts/lib/echarts");
// // 引入柱状图组件
// require("echarts/lib/chart/bar");
// 引入提示框和title组件
// require("echarts/lib/component/tooltip");
// require("echarts/lib/component/title");
import echarts from 'echarts'
export default {
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
          },
        ],
      });
    },
  },
};
</script>

<style>
</style>