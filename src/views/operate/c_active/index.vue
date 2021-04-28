<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div @click="jumpUrl(1)">
          <el-card shadow="hover"> 拉新活动 </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    jumpUrl(type) {
      switch (type) {
        case 1:
          this.$router.push("/operate/c_active/pull_new");
          break;
      }
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-card {
  text-align: center;
  padding: 20px 0;
  font-size: 20px;
  cursor: pointer;
  border: 1px solid #ddd;
}
</style>