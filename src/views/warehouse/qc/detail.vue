<template>
  <div class="app-container">
    <h2>QC分配记录详情</h2>
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>QC分配ID</p>
            <p>{{ detail.allocation_id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>门店ID</p>
            <p>{{ detail.vendor_id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>门店名称</p>
            <p>{{ detail.vendor_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>售卖日期</p>
            <p>{{ detail.saled_at }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>运营管理人员</p>
            <p>{{ detail.operating_user_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>QC人员</p>
            <p>{{ detail.qc_user_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>分配时间</p>
            <p>{{ detail.allocation_at }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>分配情况</p>
            <p v-if="detail.status == 0">
              <el-tag type="warning" effect="dark">待分配</el-tag>
            </p>
            <p v-else-if="detail.status == 1">
              <el-tag type="danger" effect="dark">分配减少</el-tag>
            </p>
            <p v-else>
              <el-tag type="success" effect="dark">分配正常</el-tag>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>烹饪盘数</p>
            <p>{{ detail.plate_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>单品数量</p>
            <p>{{ detail.product_species }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>应分配份数</p>
            <p>{{ detail.product_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>实际分配份数</p>
            <p>{{ detail.allocation_product_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>分配差额</p>
            <p>{{ detail.diff_product_num }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-card shadow="always">
      <p class="item_title">QC分配单品列表</p>
      <el-table :data="detail.product_data" stripe style="width: 100%">
        <el-table-column align="center" prop="product_id" label="单品ID" width="180">
        </el-table-column>
        <el-table-column align="center" prop="product_name" label="单品名称" width="180">
        </el-table-column>
        <el-table-column align="center" prop="package_box_name" label="包装规格">
        </el-table-column>
        <el-table-column align="center" prop="product_num" label="应分配份数">
        </el-table-column>
        <el-table-column align="center" prop="allocation_product_num" label="实际分配份数">
        </el-table-column>
        <el-table-column align="center" prop="diff_product_num" label="分配差额">
        </el-table-column>
        <el-table-column align="center" label="烹饪盘">
          <template slot-scope="scope">
            <p v-for="item in scope.row.plate_names">{{ item }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="烹饪盘分配数量">
          <template slot-scope="scope">
            <p v-for="item in scope.row.plate_product_nums">{{ item }}</p>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { allocationDetail } from "@/api/warehouse";
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
      allocationDetail({
        allocation_id: this.$route.query.allocation_id,
      }).then((res) => {
        this.detail = res;
      });
    },
  },
};
</script>