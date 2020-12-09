<template>
  <div class="app-container">
      <h2>新增/编辑门店优惠促销公告</h2>
    <el-form label-width="50px">
      <el-form-item label="标题">
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