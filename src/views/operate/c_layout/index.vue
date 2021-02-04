<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div @click="jumpUrl(1)">
          <el-card shadow="hover"> 首页banner图 </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div @click="jumpUrl(1.1)">
          <el-card shadow="hover"> 首页中部广告图 </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div @click="jumpUrl(1.2)">
          <el-card shadow="hover"> 首页底部广告图 </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div @click="jumpUrl(2)">
          <el-card shadow="hover"> 个人中心banner图 </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div @click="jumpUrl(3)">
          <el-card shadow="hover"> 门店优惠促销公告 </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div @click="jumpUrl(4)">
          <el-card shadow="hover"> 联系客服 </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div @click="jumpUrl(5)">
          <el-card shadow="hover"> 关于我们 </el-card>
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
          this.$router.push("/operate/c_layout/index_banner");
          break;
        case 2:
          this.$router.push("/operate/c_layout/user_banner");
          break;
        case 1.1:
          this.$router.push("/operate/c_layout/index_md_banner");
          break;
        case 1.2:
          this.$router.push("/operate/c_layout/index_bot_banner");
          break;
        case 3:
          this.$message({
            showClose: true,
            message: "暂未开放",
            type: "warning",
          });
          //this.$router.push("/operate/c_layout/store_notice");
          break;
        case 4:
          this.$message({
            showClose: true,
            message: "暂未开放",
            type: "warning",
          });
          //this.$router.push("/operate/c_layout/store_notice");
          break;
        case 5:
          this.$router.push("/operate/c_layout/about");
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