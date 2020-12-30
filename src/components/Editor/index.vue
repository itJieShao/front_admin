<template>
  <div id="editor"></div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      editor: null,
    };
  },
  props: ["value"],
  watch: {
    value(val) {
      if (val !== this.editor.txt.html()) {
        this.editor.txt.html(val); // 重新设置编辑器内容
      }
    },
  },
  mounted() {
    const editor = new E("#editor");
    editor.config.showLinkImg = false;//隐藏插入网络图片的功能
    // 配置 server 接口地址
    editor.config.uploadImgServer = this.$editorUpLoadApi;
    editor.config.uploadFileName = 'file'
    editor.config.uploadImgParams = {
      token: this.$store.state.user.token
    }
    // 配置 onchange 回调函数
    editor.config.onchange = (newHtml) => {
      this.$emit("getNewHtml", newHtml);
    };
    // 配置触发 onchange 的时间频率，默认为 200ms
    editor.config.onchangeTimeout = 500; // 修改为 500ms
    editor.create();
    this.editor = editor;
  },
};
</script>

<style>
</style>