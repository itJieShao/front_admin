<template>
  <div class="app-container">
    <h2>用户资料</h2>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <img style="width: 100%" :src="detail.headImg" alt="" />
          <p style="text-align: center; margin-top: 10px">
            {{ detail.nickName }}
          </p>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-row :gutter="12">
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>用户ID</p>
                <p>{{ detail.id }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>性别</p>
                <p>{{ detail.gender }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>微信号</p>
                <p>{{ detail.WeChatNum }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>手机号码</p>
                <p>{{ detail.phone }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>地区</p>
                <p>{{ detail.province }}{{ detail.city }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>年龄</p>
                <p>{{ detail.birthday }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12" style="margin-top: 15px">
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>职业</p>
                <p>{{ detail.profession }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>口味</p>
                <p>{{ detail.taste == 1 ? "不辣" : "辣" }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>爱好</p>
                <p>{{ detail.interest }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>会员卡用户</p>
                <p>{{ detail.member == 1 ? "是" : "否" }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>是否禁用</p>
                <p>{{ detail.status ? "是" : "否" }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>最近订单金额</p>
                <p>{{ detail.total_price }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12" style="margin-top: 15px">
          <el-col :span="6">
            <el-card shadow="always">
              <div class="item_flex">
                <p>最近下单时间</p>
                <p>{{ detail.last_buy_time }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="always">
              <div class="item_flex">
                <p>注册时间</p>
                <p>{{ detail.regTime }}</p>
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
                    :type="detail.status ? 'success' : 'danger'"
                    @click="updateStatus"
                    >{{ detail.status ? "启用" : "禁用" }}</el-button
                  >
                </p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="always">
          <div class="item_flex">
            <p>钱包</p>
            <p>{{ detail.money }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <div class="item_flex">
            <p>积分</p>
            <p>{{ detail.integral }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <div class="item_flex">
            <p>券</p>
            <p>{{ detail.card_volume_num }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-card shadow="always">
      <h4>用户积分列表</h4>
      <el-table max-height="300" :data="integralList" stripe style="width: 100%">
        <el-table-column prop="id" align="center" label="积分ID" width="180">
        </el-table-column>
        <el-table-column prop="customer_id" align="center" label="用户ID" width="180">
        </el-table-column>
        <el-table-column align="center" label="增加/减去">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.integral_change.substring(0,1) == '+'" effect="dark" type="success">增加</el-tag>
            <el-tag v-else effect="dark" type="danger">减少</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="integral_change" align="center" label="积分数">
        </el-table-column>
        <el-table-column prop="using_path" align="center" label="使用路径">
        </el-table-column>
        <el-table-column prop="time" align="center" label="下单时间"> </el-table-column>
      </el-table>
    </el-card>
    <el-card shadow="always" style="margin-top:15px;">
      <h4>用户券包列表</h4>
      <el-table max-height="300" :data="couponList" stripe style="width: 100%">
        <el-table-column prop="id" align="center" label="优惠券/红包ID" width="180">
        </el-table-column>
        <el-table-column prop="type_name" align="center" label="优惠券/红包" width="180">
        </el-table-column>
        <el-table-column prop="name" align="center" label="名称"> </el-table-column>
        <el-table-column prop="favourable_price" align="center" label="金额">
        </el-table-column>
        <el-table-column prop="condition_price" align="center" label="门槛金额">
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="领取时间"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {
  integralList,
  customerDetail,
  customerCouponList,
  userUpdateStatus,
} from "@/api/basic";
export default {
  data() {
    return {
      customer_id: "",
      detail: {},
      couponList: [],
      integralList:[],
    };
  },
  created() {
    this.customer_id = this.$route.query.customer_id;
    this.getDetail();
    this.getIntegralList();
    this.getCouponList();
  },
  methods: {
    updateStatus() {
      userUpdateStatus({
        customer_id: this.detail.id,
        type: this.detail.status ? 2 : 1,
      }).then((res) => {
        if (res) {
          this.detail.status = this.detail.status ? 0 : 1;
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
      customerDetail({ customer_id: this.customer_id }).then((res) => {
        this.detail = res;
      });
    },
    getIntegralList() {
      integralList({ condition: this.customer_id, page_size: 99999 }).then(
        (res) => {
          this.integralList = res.list;
        }
      );
    },
    getCouponList() {
      customerCouponList({ customer_id: this.customer_id }).then((res) => {
        this.couponList = res.list;
      });
    },
  },
};
</script>