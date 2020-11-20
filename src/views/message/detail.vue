<template>
  <div class="app-container" v-if="JSON.stringify(detail) != '{}'">
    <h2>消息详情</h2>
    <el-card shadow="always">
      <p class="title">标题：{{ detail.title }}</p>
      <p class="time">{{ detail.created_at }}</p>
      <el-card shadow="always">
        <p class="content">{{ detail.content }}</p>
        <p v-if="detail.type != 7" @click="seeDetail" class="href">查看消息详情</p>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { messageDetail } from "@/api/message";
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
      messageDetail({
        id: this.$route.query.id,
      }).then((res) => {
        this.detail = res;
      });
    },
    seeDetail() {
      let url = "";
      switch (this.detail.type) {
        case 1:
        case 2:
          url = "/warehouse/purchase/purchase_detail?purchase_id=";
          break;
        case 3:
          url = "/warehouse/purchase/summary_detail?purchase_total_id=";
          break;
        case 4:
          url = "/basic/red_package_detail?coupon_id=";
          break;
        case 5:
        case 6:
          url = "/basic/order_detail?order_id=";
          break;
        case 8:
          url = "/warehouse/distribution_detail?distribution_id=";
          break;
        case 9:
          url = "/warehouse/inventory_detail?inventory_id=";
          break;
      }
      this.$router.push(url+this.detail.contact_id)
    },
  },
};
</script>

<style>
.title {
  font-size: 18px;
}
.time {
  font-size: 14px;
  color: #999;
  margin: 10px 0;
}
.content {
  font-size: 14px;
  color: #666;
}
.href {
  color: blue;
  font-size: 14px;
  margin: 20px 0;
  cursor: pointer;
}
</style>