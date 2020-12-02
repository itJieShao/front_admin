<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover" @click="jumpUrl(1)"> 首页banner图 </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" @click="jumpUrl(2)"> 个人中心banner图 </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" @click="jumpUrl(3)"> 门店优惠促销公告 </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" @click="jumpUrl(4)"> 联系客服 </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover" @click="jumpUrl(5)"> 关于我们 </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    methods:{
        jumpUrl(type){
            switch (type){
                case 3:
                    this.$router.push('/operate/c_layout/store_notice')
                    break;
            }
        }
    }
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
  border: 1px solid #999;
}
</style>