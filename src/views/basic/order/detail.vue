<template>
  <div class="app-container" v-if="JSON.stringify(detail) != '{}'">
    <div style="display: flex; align-items: center">
      <h2>订单详情</h2>
      <span class="y_tip" v-if="detail.book_at">预</span> 
    </div>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always"> 订单ID：{{ detail.id }} </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always"> 门店ID：{{ detail.vendor_id }} </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always"> 门店：{{ detail.vendor_name }} </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always"> 用户ID：{{ detail.customer_id }} </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          用户昵称：{{ detail.customer_name }}
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          订单状态：{{ detail.order_status_name }}
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          总份数：{{ detail.total_package_num }}
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always"> 应付总价：{{ detail.total_price }} </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always"> 优惠：{{ detail.favourable_price }} </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always"> 实付总价：{{ detail.real_price }} </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always"> 下单时间：{{ detail.created_at }} </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          订单类型：{{ detail.book_at ? "预约订单" : "当天订单" }}
        </el-card>
      </el-col>
      <el-col :span="6" v-if="detail.book_at">
        <el-card shadow="always"> 预约日期：{{ detail.book_at }} </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          手机号码：{{ detail.customer_mobile }}
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-row v-if="detail.favourable_coupon_id" style="margin-top:15px;" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>优惠类型</p>
            <p>优惠券</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>优惠ID</p>
            <p>{{detail.favourable_coupon_id}}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>优惠名称</p>
            <p>{{detail.favourable_coupon_name}}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <template v-if="detail.red_packet_data">  
    <el-row v-for="(item,index) in detail.red_packet_data" :key="index" style="margin-top:15px;" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>优惠类型</p>
            <p>红包</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>优惠ID</p>
            <p>{{item.coupon_id}}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>优惠名称</p>
            <p>{{item.coupon_name}}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    </template>
    <el-row v-if="detail.exceptional_send_id" style="margin-top:15px;" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>优惠类型</p>
            <p>打赏</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>打赏总金额</p>
            <p>{{detail.exceptional_price}}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>打赏次数</p>
            <p>{{detail.exceptional_people_num}}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>打赏土豪用户</p>
            <p v-if="detail.exceptional_receive_data && detail.exceptional_receive_data.length">
              {{detail.exceptional_receive_data.join(",")}}
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row
      v-if="detail.invoice_data.invoice_id"
      style="display: flex; align-items: flex-end; margin-top: 15px"
      :gutter="12"
    >
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>申请发票时间</p>
            <p>{{ detail.invoice_data.invoice_at }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>开票状态</p>
            <p>
              <el-tag
                :type="detail.invoice_data.invoice_status ? '' : 'warning'"
                effect="dark"
                >{{
                  detail.invoice_data.invoice_status ? "已开票" : "未开票"
                }}</el-tag
              >
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>发票ID</p>
            <p>{{ detail.invoice_data.invoice_id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-button
        v-if="detail.invoice_data.invoice_status == 0"
        style="margin-left: 20px"
        @click="
          $router.push(
            `/finance/invoice_detail?invoice_id=${detail.invoice_data.invoice_id}`
          )
        "
        >去开票</el-button
      >
    </el-row>
    <el-divider />
    <el-row
      v-for="(item, index) in detail.package_data"
      :key="index"
      :gutter="12"
      style="margin-bottom: 20px"
    >
      <el-col :span="8" v-for="(it, idx) in item" :key="idx">
        <el-card shadow="hover">
          <div class="goods_item1">
            <p v-if="it.type_id == 2" style="padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid #ddd;">超值加购</p>
            <div class="goods_top">
              <img :src="it.image" alt="" />
              <div class="goods_info">
                <div class="goods_sth">
                  <p>{{ it.vendor_package_id }}</p>
                  <p>￥{{ it.sale_price }}</p>
                </div>
                <p class="goods_title">{{ it.vendor_package_name }}</p>
                <p style="margin-top: 10px">套餐组合：{{ it.product_name }}</p>
                <div class="tab_item">
                  <div class="time_type_bg1">{{ it.time_type_name }}</div>
                  <div
                    style="background-color: #000"
                    v-if="detail.order_status == -1"
                  >
                    不能取餐
                  </div>
                  <div
                    style="background-color: #ccc"
                    v-else-if="detail.order_status == 0"
                  >
                    待支付
                  </div>
                  <template v-else-if="detail.order_status >= 1">
                    <div
                      style="background-color: #87a6de"
                      v-if="it.take_status"
                    >
                      已取餐
                    </div>
                    <div style="background-color: #fbb959" v-else>待取餐</div>
                  </template>
                </div>
              </div>
            </div>
            <div
              style="width: 90%; margin-left: 10%"
              v-if="it.purchased_data && it.purchased_data.length"
            >
              <p style="margin-bottom: 10px">搭配</p>
              <div
                class="goods_top"
                style="margin-bottom: 10px"
                v-for="(itd, itdx) in it.purchased_data"
                :key="idx"
              >
                <img :src="it.image" alt="" />
                <div class="goods_info">
                  <div class="goods_sth">
                    <p>{{ itd.vendor_package_id }}</p>
                    <p>￥{{ itd.discount_price }}</p>
                  </div>
                  <p class="goods_title">{{ itd.vendor_package_name }}</p>
                  <!-- <p style="margin-top: 10px">套餐组合：{{ it.product_name }}</p> -->
                  <div class="tab_item">
                    <div class="time_type_bg1">{{ itd.time_type_name }}</div>
                    <div
                      style="background-color: #000"
                      v-if="detail.order_status == -1"
                    >
                      不能取餐
                    </div>
                    <div
                      style="background-color: #ccc"
                      v-else-if="detail.order_status == 0"
                    >
                      待支付
                    </div>
                    <template v-else-if="detail.order_status >= 1">
                      <div
                        style="background-color: #87a6de"
                        v-if="itd.take_status"
                      >
                        已取餐
                      </div>
                      <div style="background-color: #fbb959" v-else>待取餐</div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <div class="goods_bot">
              <p>实付：￥{{ it.discount_price }}</p>
              <p>X{{ it.vendor_package_num }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="always">
          <div>
            <p>订单操作时间</p>
            <div class="time_info">
              <p>下单时间：{{ detail.created_at }}</p>
              <p>付款时间：{{ detail.pay_at }}</p>
              <p>取餐时间：{{ detail.take_at.join(",") }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" v-if="detail.exceptional_send_id">
        <el-card shadow="always">
          <div>
            <p>打赏时间</p>
            <div class="time_info">
              <p>发起打赏：{{ detail.exceptional_send_at }}</p>
              <div v-for="(item,index) in detail.exceptional_receive_data" :key="index">
                <p>打赏用户：{{ item.customer_name }}</p>
                <p>打赏时间：{{ item.receive_at }}</p>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" v-if="detail.receive_at || detail.distribution_at">
        <el-card shadow="always">
          <div>
            <p>配送操作时间</p>
            <div class="time_info">
              <p>配送接单：{{ detail.receive_at }}</p>
              <p>配送完成：{{ detail.distribution_at }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" style="margin-top: 15px">
      <el-col :span="8" v-if="detail.after_sale_data.length > 0">
        <el-card shadow="always">
          <div>
            <p>售后操作时间</p>
            <div class="time_info">
              <p>申请时间：</p>
              <p>审核时间：</p>
              <p>售后完成：</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider v-if="detail.after_sale_data.length > 0" />
    <el-row v-if="detail.after_sale_data.length > 0">
      <el-col span="24">
        <el-card shadow="always">
          <div>
            <p>售后情况</p>
            <div class="after_sale">
              <p>2018-08-20 16:14:38</p>
              <p style="margin: 10px 0 5px">某某用户提交退款申请</p>
              <div class="img_box">
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
              </div>
              <p style="margin: 10px 0">备注内容</p>
              <el-input type="textarea"></el-input>
              <div style="margin: 25px 0">
                <el-button type="primary">同意退款</el-button>
                <el-button type="danger">驳回退款</el-button>
              </div>
              <p>2018-08-20 16:14:38</p>
              <p style="margin: 10px 0 5px">某某驳回用户退款申请</p>
              <p style="margin: 10px 0">驳回原因</p>
              <el-input type="textarea"></el-input>
              <p style="margin-top: 15px">2018-08-20 16:14:38</p>
              <p style="margin: 10px 0 5px">某某同意用户退款申请，售后结束</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { orderDetail } from "@/api/basic";
export default {
  data() {
    return {
      order_id: "",
      detail: {},
    };
  },
  created() {
    this.order_id = this.$route.query.order_id;
    this.getOrderDetail();
  },
  methods: {
    getOrderDetail() {
      orderDetail({ order_id: this.order_id }).then((res) => {
        let packageArr = [];
        for (let i = 0; i < res.package_data.length; i += 3) {
          packageArr.push(res.package_data.slice(i, i + 3));
        }
        res.package_data = packageArr;
        res.favourable_price = Number(res.favourable_price).toFixed(2);
        this.detail = res;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tab_item {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tab_item div {
  border-radius: 20px;
  font-size: 14px;
  color: #fff;
  padding: 5px 20px;
}
.time_type_bg1 {
  background-color: #cebaf7;
}

.time_type_bg2 {
  background-color: #b8f4d5;
}

.time_type_bg3 {
  background-color: #fcce90;
}

.time_type_bg4 {
  background-color: #f792a1;
}

.time_type_bg5 {
  background-color: #b5d0f7;
}

.time_type_bg6 {
  background-color: #ead0b5;
}
.y_tip {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background-color: sandybrown;
  color: #fff;
  margin-left: 10px;
}
p {
  margin: 0;
}
.goods_item1 {
  cursor: pointer;
  .goods_top {
    display: flex;
    img {
      display: block;
      width: 120px;
      height: 120px;
      border: 1px solid #ddd;
    }
    .goods_info {
      width: calc(100% - 115px);
      margin-left: 15px;
      .goods_sth {
        display: flex;
        justify-content: space-between;
      }
      .goods_title {
        margin-top: 10px;
      }
    }
  }
  .goods_bot {
    border-top: 1px solid #ddd;
    margin-top: 15px;
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
  }
}
.time_info,
.after_sale {
  margin: 15px 20px;
  padding: 0 20px;
  border-left: 1px solid #ccc;
}
.time_info p {
  margin-bottom: 15px;
}
.after_sale {
  .img_box {
    display: flex;
    flex-wrap: wrap;
    img {
      width: 100px;
      height: 100px;
      border: 1px solid #ddd;
      margin-right: 10px;
    }
  }
}
</style>