<template>
  <div id="editor"></div>
</template>

<script>
import E from "wangeditor";
export default {
  mounted() {
    const editor = new E("#editor");
    // 配置 server 接口地址
    editor.config.uploadImgServer = this.$upLoadImgApi;
    // 配置 onchange 回调函数
    editor.config.onchange = newHtml => {
      console.log("change 之后最新的 html", newHtml);
      this.$emit('getNewHtml',newHtml)
    };
    // 配置触发 onchange 的时间频率，默认为 200ms
    editor.config.onchangeTimeout = 500; // 修改为 500ms
    editor.create();
  },
};
</script>

<style>
</style>