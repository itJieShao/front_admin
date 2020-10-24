<template>
  <div class="app-container">
    <h2>订单详情</h2>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always"> 订单ID：{{detail.id}} </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always"> 门店ID：{{detail.vendor_id}} </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always"> 门店：{{detail.vendor_name}} </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always"> 用户ID：{{detail.customer_id}} </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always"> 用户昵称：{{detail.customer_name}} </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always"> 订单状态：{{detail.order_status_name}} </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always"> 总份数：{{detail.total_package_num}} </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always"> 应付总价：{{detail.total_price}} </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always"> 优惠：{{detail.favourable_price}} </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always"> 实付总价：{{detail.real_price}} </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always"> 下单时间：{{detail.created_at}} </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-row v-for="(item,index) in detail.package_data" :key="index" :gutter="12" style="margin-bottom:20px;">
      <el-col :span="8" v-for="(it,idx) in item" :key="idx">
        <el-card shadow="hover">
          <div class="goods_item">
            <div class="goods_top">
              <img :src="it.image" alt="" />
              <div class="goods_info">
                <div class="goods_sth">
                  <p>{{it.vendor_package_id}}</p>
                  <p>￥{{it.sale_price}}</p>
                </div>
                <p class="goods_title">{{it.vendor_package_name}}</p>
                <p style="margin-top:10px;">套餐组合：{{it.product_name}}</p>
              </div>
            </div>
            <div class="goods_bot">
              <p>实付：￥{{it.discount_price}}</p>
              <p>X{{it.vendor_package_num}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="12">
      <el-col :span="detail.after_sale_data.length?12:24">
        <el-card shadow="always">
          <div>
            <p>订单操作时间</p>
            <div class="time_info">
              <p>下单时间：{{detail.created_at}}</p>
              <p>付款时间：{{detail.pay_at}}</p>
              <p>取餐时间：{{detail.take_at}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" v-if="detail.after_sale_data.length > 0">
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
    <el-divider v-if="detail.after_sale_data.length > 0"/>
    <el-row v-if="detail.after_sale_data.length > 0">
      <el-col span="24">
        <el-card shadow="always">
          <div>
            <p>售后情况</p>
            <div class="after_sale">
              <p>2018-08-20 16:14:38</p>
              <p style="margin:10px 0 5px;">某某用户提交退款申请</p>
              <div class="img_box">
                <img src="" alt="">
                <img src="" alt="">
                <img src="" alt="">
              </div>
              <p style="margin:10px 0;">备注内容</p>
              <el-input type="textarea" ></el-input>
              <div style="margin:25px 0;">
                <el-button type="primary">同意退款</el-button>
                <el-button type="danger">驳回退款</el-button>
              </div>
              <p>2018-08-20 16:14:38</p>
              <p style="margin:10px 0 5px;">某某驳回用户退款申请</p>
              <p style="margin:10px 0;">驳回原因</p>
              <el-input type="textarea" ></el-input>
              <p style="margin-top:15px;">2018-08-20 16:14:38</p>
              <p style="margin:10px 0 5px;">某某同意用户退款申请，售后结束</p>
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
  data(){
    return {
      order_id: '',
      detail:{}
    }
  },
  created(){
    this.order_id = this.$route.query.order_id;
    this.getOrderDetail()
  },
  methods:{
    getOrderDetail(){
      orderDetail({order_id:this.order_id}).then(res => {
        console.log(res)
        const packageArr = [];
        for(let i=0;i<res.package_data.length;i+=3){
            packageArr.push(res.package_data.slice(i,i+3));
        }
        res.package_data = packageArr
        this.detail = res
      });
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.goods_item {
  cursor: pointer;
  .goods_top {
    display: flex;
    img {
      display: block;
      width: 100px;
      height: 100px;
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
        margin-top: 20px;
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
.after_sale{
  .img_box{
    display: flex;
    flex-wrap: wrap;
    img{
      width: 100px;
      height: 100px;
      border: 1px solid #ddd;
      margin-right: 10px;
    }
  }
}
</style>