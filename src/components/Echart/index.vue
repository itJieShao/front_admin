<template>
  <div :id="id" :style="{ width, height }"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: ["id", "width", "height", "xAxis", "series", "type"],
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(this.id));
      // 温度折线图
      let wd_line_echart_option = {
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
      };
      // 饼图
      let pie_echart_option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : ￥{c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          top: "15%",
          left: "left",
        },
        series: [
          {
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "滞销成本" },
              { value: 310, name: "损耗成本" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(
        this.type == "pie" ? pie_echart_option : wd_line_echart_option
      );
    },
  },
};
</script>

<style>
</style>