<template>
  <div id="myChart" :style="{ width, height }"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    xAxis: {
      required: true,
    },
    series: {
      required: true,
    },
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          formatter(params) {
            return `${params[0].axisValue}分钟${params[0].value}°`;
          },
        },
        xAxis: {
          name: "分钟",
          type: "category",
          data: this.xAxis,
        },
        yAxis: {
          name: "温度",
          type: "value",
        },
        series: [
          {
            data: this.series,
            type: "line",
            smooth: true,
          },
        ],
      });
    },
  },
};
</script>

<style>
</style>