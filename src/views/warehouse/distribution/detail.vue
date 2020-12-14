<template>
  <div class="app-container">
    <h2>配货详情</h2>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>配货ID</p>
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
            <p>售卖时间</p>
            <p>{{ detail.saled_at }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>运营管理人员</p>
            <p>{{ detail.operating_user_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>供应商</p>
            <p>{{ detail.id }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>货运汽车</p>
            <p>{{ detail.id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>配货员</p>
            <p>{{ detail.distribution_user_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>取货时间</p>
            <p>{{ detail.take_at }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>到店时间</p>
            <p>{{ detail.sign_at }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>配货完成时间</p>
            <p>{{ detail.distribution_at }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>配货状态</p>
            <p>
              <el-tag effect="dark" type="warning" v-if="detail.status == 0">待核对</el-tag>
              <el-tag effect="dark" v-else-if="detail.status == 1">待入柜</el-tag>
              <el-tag effect="dark" type="success" v-else>已配货</el-tag>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>应配烹饪盘</p>
            <p>{{ detail.plate_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>核对烹饪盘</p>
            <p>{{ detail.check_plate_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>实配单品</p>
            <p>{{ detail.real_product_species }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>应配总份数</p>
            <p>{{ detail.product_num }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-card shadow="always">
      <p class="item_title">烹饪盘列表</p>
      <el-table :data="detail.product_data" stripe style="width: 100%">
        <el-table-column align="center" prop="plate_name" label="烹饪盘ID">
        </el-table-column>
        <el-table-column align="center" prop="product_name" label="单品名称">
        </el-table-column>
        <el-table-column align="center" prop="package_box_name" label="包装规格">
        </el-table-column>
        <el-table-column align="center" prop="product_num" label="烹饪盘单品数量">
        </el-table-column>
        <el-table-column align="center" prop="device_no" label="分配设备">
        </el-table-column>
        <el-table-column align="center" prop="device_cell_no" label="分配单元格"> </el-table-column>
        <el-table-column align="center" prop="check_status" label="取货状态">
        </el-table-column>
        <el-table-column align="center" prop="distribution_status" label="入柜状态">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { distributionDetail } from "@/api/warehouse";
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
      distributionDetail({
        distribution_id: this.$route.query.distribution_id,
      }).then((res) => {
        this.detail = res;
      });
    },
  },
};
</script>