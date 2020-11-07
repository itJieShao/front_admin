<template>
  <div class="app-container">
    <h2>供应商详情</h2>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>供应商ID</p>
            <p>{{ detail.supplier_id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>供应商名称</p>
            <p>{{ detail.supplier_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>类型</p>
            <p>{{ detail.type_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>统一社会信用代码</p>
            <p>{{ detail.code }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>食品许可证</p>
            <p>{{ detail.food_permit }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>其他证件</p>
            <p>{{ detail.other_permit }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>联系人</p>
            <p>{{ detail.contacts }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>联系电话</p>
            <p :style="detail.contact_moblie.length > 1 ? 'height:auto' : ''">
              <span
                style="display: block"
                v-for="item in detail.contact_moblie"
                >{{ item }}</span
              >
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>公司地址</p>
            <p>{{ detail.address }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>仓库地址</p>
            <p>{{ detail.warehouse_address }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>状态</p>
            <p>
              <el-tag :type="detail.status == 1 ? 'success' : 'danger'">{{
                detail.status == 1 ? "启用" : "禁用"
              }}</el-tag>
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
            <p>历史订单</p>
            <p>{{ detail.order_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>最近订单</p>
            <p>{{ detail.last_order_no }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>最近下单时间</p>
            <p>{{ detail.last_order_time }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>总交易金额</p>
            <p>{{ detail.total_price }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>已结金额</p>
            <p>{{ detail.settlemented_price }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>待结欠款</p>
            <p>{{ detail.settlementing_price }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { supplierDetail } from "@/api/warehouse";
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
      supplierDetail({
        supplier_id: this.$route.query.supplier_id,
      }).then((res) => {
        this.detail = res;
      });
    },
  },
};
</script>