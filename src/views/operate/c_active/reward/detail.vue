<template>
  <div class="app-container">
    <h2>打赏活动详情</h2>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>活动ID</p>
            <p>{{ detail.id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>活动名称</p>
            <p>{{ detail.name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>开始时间</p>
            <p>{{ detail.valid_at_start }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>结束时间</p>
            <p>{{ detail.valid_at_end }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>发起用户</p>
            <p>{{ detail.send_customer_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>打赏土豪用户</p>
            <p>{{ detail.receive_customer_num }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>发起次数</p>
            <p>{{ detail.send_count }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>打赏次数</p>
            <p>{{ detail.receive_count }}</p>
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
            <p>活动状态</p>
            <p>{{ detail.status_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" v-if="detail.can_disable">
        <el-card shadow="always">
          <div class="item_flex">
            <p>操作</p>
            <p>
              <el-button type="danger" @click="disable" size="mini"
                >禁用</el-button
              >
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
            <p>打赏金额</p>
            <p>{{ detail.price }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>奖励名称</p>
            <p>{{ detail.coupon_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>奖励类型</p>
            <p>{{ detail.coupon_type_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always">
          <div class="item_flex">
            <p>奖励有效期</p>
            <p>{{ detail.coupon_valid_at }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-form label-width="150px">
      <el-form-item label="发起打赏邀请用户">
        <el-card class="up-card" shadow="always">
          <div class="up-box">
            <p>邀请文案</p>
            <img :src="detail.check_invite_image" alt="" />
          </div>
          <div class="up-box">
            <p>订单详情邀请弹窗图片</p>
            <img :src="detail.first_invite_image" alt="" />
          </div>
          <div class="up-box">
            <p>邀请中/邀请成功文案</p>
            <img :src="detail.detail_invite_image" alt="" />
          </div>
          <div class="up-box">
            <p>活动邀请失败</p>
            <img :src="detail.invite_failure_image" alt="" />
          </div>
        </el-card>
      </el-form-item>
      <el-form-item label="土豪打赏用户">
        <el-card class="up-card" shadow="always">
          <div class="up-box">
            <p>打赏订单邀请</p>
            <img :src="detail.exceptional_image" alt="" />
          </div>
          <div class="up-box">
            <p>打赏订单已打赏</p>
            <img :src="detail.exceptional_success_image" alt="" />
          </div>
          <div class="up-box">
            <p>打赏失效</p>
            <img :src="detail.exceptional_failure_image" alt="" />
          </div>
        </el-card>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-card shadow="always">
      <el-table
        v-loading="loading"
        :data="detail.exceptional_send_list"
        stripe
        style="width: 100%"
      >
        <el-table-column align="center" label="打赏ID" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发起人及手机" width="200">
          <template slot-scope="scope">
            <span
              >{{ scope.row.send_user_name }} {{ scope.row.send_phone }}</span
            >
          </template>
        </el-table-column>
        <el-table-column align="center" label="打赏土豪用户及手机" width="200">
          <template slot-scope="scope">
            <div
              v-for="(item, index) in scope.row.exceptional_data"
              :key="index"
            >
              <span>{{ item.receive_user_name }} {{ item.receive_phone }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="打赏时间" width="200">
          <template slot-scope="scope">
            <div
              v-for="(item, index) in scope.row.exceptional_data"
              :key="index"
            >
              <span>{{ item.receive_at }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="detail.exceptional_send_count > 0"
        :total="detail.exceptional_send_count"
        :page.sync="listData.page"
        :limit.sync="listData.page_size"
        @pagination="getDetail"
      />
    </el-card>
  </div>
</template>

<script>
import { getDetail, disableApi } from "@/api/operate/c_active/reward";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      detail: {},
      loading: false,
      listData: {
        page: 1,
        page_size: 10,
      },
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      getDetail({
        id: this.$route.query.id,
        ...this.listData,
      }).then((res) => {
        this.detail = res;
      });
    },
    disable() {
      disableApi({ id: this.$route.query.id }).then((res) => {
        if (res) {
          this.detail.can_disable = 0;
          this.$notify({
            title: "成功",
            message: "提交成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
  },
};
</script>

<style>
.up-card .el-card__body {
  display: flex;
}
.up-box {
  text-align: center;
  margin-right: 20px;
}
.up-box img {
  width: 150px;
  height: 150px;
}
</style>