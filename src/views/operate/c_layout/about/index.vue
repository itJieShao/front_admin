<template>
  <div class="app-container">
    <h2>关于我们</h2>
    <el-form label-width="50px">
      <el-form-item label="标题">
        <el-input v-model="title" />
      </el-form-item>
      <el-form-item label="内容">
        <Editor @getNewHtml="getNewHtml" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from "@/components/Editor";
export default {
  components: { Editor },
  data() {
    return {
      title: "",
      newHtml: "",
    };
  },
  methods: {
    getNewHtml(newHtml) {
      this.newHtml = newHtml;
    },
  },
};
</script>

<style>
</style>