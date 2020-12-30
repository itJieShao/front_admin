<template>
  <div class="app-container">
    <h2>关于我们</h2>
    <el-form label-width="50px">
      <el-form-item label="标题">
        <el-input v-model="title" />
      </el-form-item>
      <el-form-item label="内容">
        <Editor @getNewHtml="getNewHtml" :value="content" />
      </el-form-item>
      <el-row type="flex" class="row-bg" justify="end">
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { aboutData, saveAbout } from "@/api/operate/c_layout/about";
import Editor from "@/components/Editor";
export default {
  components: { Editor },
  data() {
    return {
      title: "",
      content: "",
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      aboutData().then((res) => {
        this.title = res.title;
        this.content = res.content;
      });
    },
    getNewHtml(content) {
      this.content = content;
    },
    onSubmit() {
      saveAbout({ title: this.title, content: this.content }).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.$router.go(-1);
            },
          });
        }
      });
    },
  },
};
</script>

<style>
</style>