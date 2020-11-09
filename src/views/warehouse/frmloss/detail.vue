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
        <el-table-column prop="vendor_package_name" label="套餐名称">
        </el-table-column>
        <el-table-column prop="sale_price" label="套餐售价"> </el-table-column>
        <el-table-column prop="loss_vendor_package_num" label="报损套餐数">
        </el-table-column>
        <el-table-column prop="purchase_price" label="套餐进货价">
        </el-table-column>
        <el-table-column align="center" label="报损单品">
          <template slot-scope="scope">
            <p v-for="item in scope.row.loss_product_names">{{ item }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="报损单品份数">
          <template slot-scope="scope">
            <p v-for="item in scope.row.loss_product_nums">{{ item }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="套餐关联单品">
          <template slot-scope="scope">
            <p v-for="item in scope.row.contact_product_names">{{ item }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="关联单品份数">
          <template slot-scope="scope">
            <p v-for="item in scope.row.contact_product_nums">{{ item }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="单品进货价">
          <template slot-scope="scope">
            <p v-for="item in scope.row.product_purchase_prices">{{ item }}</p>
          </template>
        </el-table-column>
        <el-table-column width="200" align="center" label="报损照片">
          <template slot-scope="scope">
            <img style="width:150px;height:150px;" v-for="item in scope.row.image" :src="item" alt="">
          </template>
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