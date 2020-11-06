<template>
  <div class="app-container">
    <h2>优惠红包详情</h2>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>优惠ID</p>
            <p>{{ detail.id }}</p>
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
            <p>名称</p>
            <p>{{ detail.name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>满足金额</p>
            <p>{{ detail.condition_price }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>优惠金额</p>
            <p>{{ detail.favourable_price }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>折扣率</p>
            <p>{{ detail.discount }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>有效期</p>
            <p>{{ detail.valid_at }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>创建时间</p>
            <p>{{ detail.created_at }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="2">
        <el-card shadow="always">
          <div class="item_flex">
            <p>数量</p>
            <p>{{ detail.num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="2">
        <el-card shadow="always">
          <div class="item_flex">
            <p>已领</p>
            <p>{{ detail.receive_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>创建人</p>
            <p>{{ detail.created_user_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>状态</p>
            <p>
              <el-tag effect="dark" type="danger" v-if="detail.status == 0"
                >已禁用</el-tag
              >
              <el-tag effect="dark" type="success" v-else>已启用</el-tag>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>操作</p>
            <p>
              <el-button v-if="detail.status == 1" @click="disable" size="mini">禁用</el-button>
              <el-button @click="copy" size="mini">复制</el-button>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-card shadow="always">
      <p class="item_title">领取情况：</p>
      <el-table :data="detail.receive_detail" stripe style="width: 100%">
        <el-table-column prop="customer_name" label="领取人" width="180">
        </el-table-column>
        <el-table-column prop="create_at" label="领取时间" width="180">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { couponDetail, disableCoupon } from "@/api/basic/red_package";
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
    copy() {},
    disable() {
      disableCoupon({ coupon_id: this.detail.id }).then((res) => {
        if (res) {
          this.detail.status = 0;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    getDetail() {
      couponDetail({
        coupon_id: this.$route.query.coupon_id,
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