<template>
  <el-card shadow="always">
    <h4>{{ title }}</h4>
    <div class="data_box">
      <p class="data">{{ data.num }}</p>
      <p class="unit">{{ unit }}</p>
      <slot />
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="flex" v-for="item in data.first">
          <i class="el-icon-caret-top"></i>
          <p class="fontw">{{ item.vendor_name }}</p>
          <p>{{ item.total_price }}</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="flex" v-for="item in data.last">
          <i class="el-icon-caret-bottom"></i>
          <p class="fontw">{{item.vendor_name}}</p>
          <p>{{item.total_price}}</p>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col class="flex" :span="8">
        <i class="el-icon-bottom-left"></i>
        <p>昨日7.5%</p>
      </el-col>
      <el-col class="flex" :span="8">
        <i class="el-icon-bottom-left"></i>
        <p>上周7.5%</p>
      </el-col>
      <el-col class="flex" :span="8">
        <i class="el-icon-top-right"></i>
        <p>上月7.5%</p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: ["title", "data", "unit"],
};
</script>

<style scoped lang="scss">
h4 {
  margin: 0;
}
.data_box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-weight: 600;
  margin: 10px 0;
  .data {
    font-size: 30px;
    line-height: 30px;
  }
  .unit {
    font-size: 14px;
    margin-left: 5px;
  }
}
.flex {
  display: flex;
  margin: 10px 0;
  justify-content: center;
  .fontw {
    font-weight: 600;
    margin-right: 5px;
  }
  i {
    margin-right: 5px;
    font-size: 18px;
  }
  .el-icon-caret-top,
  .el-icon-top-right {
    color: green;
  }
  .el-icon-caret-bottom,
  .el-icon-bottom-left {
    color: red;
  }
}
</style>