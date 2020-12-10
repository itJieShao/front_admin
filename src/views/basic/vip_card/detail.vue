<template>
  <div class="app-container">
    <h2>会员卡详情</h2>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>会员卡ID</p>
            <p>{{ detail.id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>会员卡名称</p>
            <p>{{ detail.name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>类型</p>
            <p v-if="detail.type == 1">次数卡</p>
            <p v-else-if="detail.type == 2">红包卡</p>
            <p v-else>折扣卡</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>会员卡期</p>
            <p v-if="detail.card_typ == 1">月卡</p>
            <p v-else-if="detail.card_typ == 2">季卡</p>
            <p v-else-if="detail.card_typ == 3">半年卡</p>
            <p v-else>年卡</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>发放周期</p>
            <p v-if="detail.issue_cycle == 1">按月</p>
            <p v-else-if="detail.issue_cycle == 2">按季度</p>
            <p v-else-if="detail.issue_cycle == 3">按半年</p>
            <p v-else>按年</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>次数</p>
            <p>{{ detail.type == 1 ? detail.num : "无" }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>红包</p>
            <p>{{ detail.type == 2 ? detail.red_packet : "无" }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>折扣</p>
            <p>{{ detail.type == 3 ? detail.discount : "无" }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>定价</p>
            <p>{{ detail.price }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>数量</p>
            <p>{{ detail.number == -1 ? "无限" : detail.number }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>已领</p>
            <p>{{ detail.already_received }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>创建人</p>
            <p>{{ detail.create_person }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>创建时间</p>
            <p>{{ detail.time }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" v-if="detail.type != 1">
        <el-card shadow="always">
          <div class="item_flex">
            <p>优惠次数</p>
            <p>{{ detail.discounts_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>状态</p>
            <p>
              <el-tag type="success" v-if="detail.status == 0">启用</el-tag>
              <el-tag type="danger" v-else>禁用</el-tag>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>操作</p>
            <p>
              <el-button
                size="mini"
                :type="detail.status == 0 ? 'danger' : 'success'"
                @click="updateStatus"
                >{{ detail.status == 0 ? "禁用" : "启用" }}</el-button
              >
              <el-button @click="copy" size="mini">复制</el-button>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-card shadow="always">
      <p class="item_title">领取情况：</p>
      <el-table v-loading="loading" :data="list" stripe style="width: 100%">
        <el-table-column prop="customer_nickName" label="领取人" width="180">
        </el-table-column>
        <el-table-column prop="time" label="领取时间" width="180">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {
  memberCardDetail,
  updateMemberCard,
  memberCardGetList,
} from "@/api/basic";
export default {
  data() {
    return {
      detail: {},
      list: [],
      loading: false,
    };
  },
  created() {
    this.getDetail();
    this.getCartList();
  },
  methods: {
    copy() {},
    updateStatus() {
      updateMemberCard({
        member_card_id: this.detail.id,
        type: this.detail.status ? 2 : 1,
      }).then((res) => {
        this.detail.status = this.detail.status ? 0 : 1;
        this.$notify({
          title: "成功",
          message: "操作成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    getDetail() {
      memberCardDetail({
        member_card_id: this.$route.query.member_card_id,
      }).then((res) => {
        this.detail = res;
      });
    },
    getCartList() {
      this.loading = true;
      memberCardGetList().then((res) => {
        this.list = res;
        this.loading = false;
      });
    },
  },
};
</script>