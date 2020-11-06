<template>
  <div class="app-container">
    <h2>报损详情</h2>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>报损ID</p>
            <p>{{ detail.id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>门店ID</p>
            <p>{{ detail.vendor_id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>门店名称</p>
            <p>{{ detail.vendor_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>报损日期</p>
            <p>{{ detail.loss_at }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>门店店员</p>
            <p>{{ detail.loss_user_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>报损套餐</p>
            <p>{{ detail.loss_vendor_package_species }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>报损套餐数</p>
            <p>{{ detail.loss_vendor_package_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>报损单品</p>
            <p>{{ detail.loss_product_species }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>报损单品份数</p>
            <p>{{ detail.loss_product_num }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-card shadow="always">
      <p class="item_title">报损列表</p>
      <el-table :data="detail.loss_package_data" stripe style="width: 100%">
        <el-table-column prop="vendor_package_name" label="套餐名称" width="180">
        </el-table-column>
        <el-table-column prop="sale_price" label="套餐售价" width="180">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { lossDetail } from "@/api/warehouse";
export default {
  data() {
    return {
      detail: {},
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      lossDetail({
        loss_vendor_id: this.$route.query.loss_vendor_id,
      }).then((res) => {
        this.detail = res;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.item_flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  word-wrap: break-word;
  word-break: break-all;
}
.item_flex p:last-child {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px solid #ddd;
  color: #999;
}
.item_title {
  font-size: 16px;
  color: #666;
  margin: 10px auto 20px;
}
</style>