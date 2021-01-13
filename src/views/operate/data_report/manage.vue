<template>
  <div class="app-container">
    <div
      class="loading"
      :style="loading ? 'z-index: 1;' : 'z-index: -1;'"
      v-loading="loading"
    ></div>
    <h2>经营报表</h2>
    <el-card shadow="always">
      <el-tag
        @click="tabClick(item.type)"
        class="time_type"
        v-for="item in timeList1"
        :key="item.type"
        :effect="time_type == item.type ? 'dark' : 'plain'"
      >
        {{ item.name }}
      </el-tag>
      <el-date-picker
        style="margin-left: 20px"
        @change="timeChange"
        value-format="yyyy-MM-dd"
        v-model="time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-divider />
      <h3>运营数据</h3>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-card shadow="always">
            <h4>营业额</h4>
            <div class="data_box">
              <p class="data">{{ detail.turnover }}</p>
              <p class="unit">元</p>
            </div>
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="flex" v-for="item in detail.turnover_first">
                  <i class="el-icon-caret-top"></i>
                  <p class="fontw">{{ item.vendor_name }}</p>
                  <p>{{ item.total_price }}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flex" v-for="item in detail.turnover_last">
                  <i class="el-icon-caret-bottom"></i>
                  <p class="fontw">{{ item.vendor_name }}</p>
                  <p>{{ item.total_price }}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.yesteday_turnover_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.yesteday_turnover_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>昨日{{ detail.yesteday_turnover_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_week_turnover_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_week_turnover_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上周{{ detail.last_week_turnover_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_month_turnover_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_month_turnover_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上月{{ detail.last_month_turnover_diff }}</p>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <h4>实际收入</h4>
            <div class="data_box">
              <p class="data">{{ detail.real }}</p>
              <p class="unit">元</p>
            </div>
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="flex" v-for="item in detail.real_first">
                  <i class="el-icon-caret-top"></i>
                  <p class="fontw">{{ item.vendor_name }}</p>
                  <p>{{ item.real_price }}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flex" v-for="item in detail.real_last">
                  <i class="el-icon-caret-bottom"></i>
                  <p class="fontw">{{ item.vendor_name }}</p>
                  <p>{{ item.real_price }}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.yesteday_real_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.yesteday_real_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>昨日{{ detail.yesteday_real_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_week_real_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_week_real_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上周{{ detail.last_week_real_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_month_real_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_month_real_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上月{{ detail.last_month_real_diff }}</p>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <h4>订单总数</h4>
            <div class="data_box">
              <p class="data">{{ detail.order_num }}</p>
              <p class="unit">条</p>
            </div>
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="flex" v-for="item in detail.order_num_first">
                  <i class="el-icon-caret-top"></i>
                  <p class="fontw">{{ item.vendor_name }}</p>
                  <p>{{ item.count }}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flex" v-for="item in detail.order_num_last">
                  <i class="el-icon-caret-bottom"></i>
                  <p class="fontw">{{ item.vendor_name }}</p>
                  <p>{{ item.count }}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.yesteday_order_num_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.yesteday_order_num_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>昨日{{ detail.yesteday_order_num_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_week_order_num_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_week_order_num_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上周{{ detail.last_week_order_num_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_month_order_num_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_month_order_num_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上月{{ detail.last_month_order_num_diff }}</p>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px" :gutter="10">
        <el-col :span="8">
          <el-card shadow="always">
            <h4>套餐数量</h4>
            <div class="data_box">
              <p class="data">{{ detail.vendor_pacakge_num }}</p>
              <p class="unit">份</p>
            </div>
            <el-row :gutter="10">
              <el-col :span="12">
                <div
                  class="flex"
                  v-for="item in detail.vendor_package_num_first"
                >
                  <i class="el-icon-caret-top"></i>
                  <p class="fontw">{{ item.vendor_package_name }}</p>
                  <p>{{ item.vendor_package_num }}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div
                  class="flex"
                  v-for="item in detail.vendor_package_num_last"
                >
                  <i class="el-icon-caret-bottom"></i>
                  <p class="fontw">{{ item.vendor_package_name }}</p>
                  <p>{{ item.vendor_package_num }}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.yesteday_package_num_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.yesteday_package_num_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>昨日{{ detail.yesteday_package_num_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_week_package_num_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_week_package_num_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上周{{ detail.last_week_package_num_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_month_package_num_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_month_package_num_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上月{{ detail.last_month_package_num_diff }}</p>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <h4>退单数</h4>
            <div class="data_box">
              <p class="data">{{ detail.refund }}</p>
              <p class="unit">条</p>
            </div>
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="flex" v-for="item in detail.refund_first">
                  <i class="el-icon-caret-top"></i>
                  <p class="fontw">{{ item.vendor_name }}</p>
                  <p>{{ item.count }}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flex" v-for="item in detail.refund_last">
                  <i class="el-icon-caret-bottom"></i>
                  <p class="fontw">{{ item.vendor_name }}</p>
                  <p>{{ item.count }}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.yesteday_refund_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.yesteday_refund_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>昨日{{ detail.yesteday_refund_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_week_refund_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_week_refund_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上周{{ detail.last_week_refund_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_month_refund_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_month_refund_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上月{{ detail.last_month_refund_diff }}</p>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <h4>退单率</h4>
            <div class="data_box">
              <p class="data">{{ detail.refund_rate }}</p>
            </div>
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="flex" v-for="item in detail.refund_rate_first">
                  <i class="el-icon-caret-top"></i>
                  <p class="fontw">{{ item.vendor_name }}</p>
                  <p>{{ item.count }}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flex" v-for="item in detail.refund_rate_last">
                  <i class="el-icon-caret-bottom"></i>
                  <p class="fontw">{{ item.vendor_name }}</p>
                  <p>{{ item.count }}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.yesteday_refund_rate_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.yesteday_refund_rate_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>昨日{{ detail.yesteday_refund_rate_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_week_refund_rate_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_week_refund_rate_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上周{{ detail.last_week_refund_rate_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_month_refund_rate_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_month_refund_rate_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上月{{ detail.last_month_refund_rate_diff }}</p>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px" :gutter="10">
        <el-col :span="8">
          <el-card shadow="always">
            <h4>成交订单</h4>
            <div class="data_box">
              <p class="data">{{ detail.reach }}</p>
              <p class="unit">条</p>
            </div>
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="flex" v-for="item in detail.reach_first">
                  <i class="el-icon-caret-top"></i>
                  <p class="fontw">{{ item.vendor_name }}</p>
                  <p>{{ item.count }}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flex" v-for="item in detail.reach_last">
                  <i class="el-icon-caret-bottom"></i>
                  <p class="fontw">{{ item.vendor_name }}</p>
                  <p>{{ item.count }}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.yesteday_reach_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.yesteday_reach_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>昨日{{ detail.yesteday_reach_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_week_reach_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_week_reach_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上周{{ detail.last_week_reach_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_month_reach_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_month_reach_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上月{{ detail.last_month_reach_diff }}</p>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <h4>报损总数</h4>
            <div class="data_box">
              <p class="data">{{ detail.loss_num }}</p>
              <p class="unit">份</p>
            </div>
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="flex" v-for="item in detail.loss_num_first">
                  <i class="el-icon-caret-top"></i>
                  <p class="fontw">{{ item.vendor_name }}</p>
                  <p>{{ item.count }}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flex" v-for="item in detail.loss_num_last">
                  <i class="el-icon-caret-bottom"></i>
                  <p class="fontw">{{ item.vendor_name }}</p>
                  <p>{{ item.count }}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.yesteday_loss_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.yesteday_loss_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>昨日{{ detail.yesteday_loss_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_week_loss_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_week_loss_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上周{{ detail.last_week_loss_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_month_loss_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_month_loss_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上月{{ detail.last_month_loss_diff }}</p>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <h4>耗损成本</h4>
            <div class="data_box" style="margin-bottom: -30px">
              <p class="data">{{ detail.loss_total }}</p>
              <p class="unit">元</p>
            </div>
            <Echart
              :key="timer"
              id="chart"
              unit="元"
              :pieData="detail.loss_detail"
              type="pie"
              width="100%"
              height="300px"
            />
          </el-card>
        </el-col>
      </el-row>
      <div class="userDataTitle">
        <h3>用户数据</h3>
        <!-- <p @click="moreUserData">更多>></p> -->
      </div>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-card shadow="always">
            <h4>新增用户</h4>
            <div class="data_box">
              <p class="data">{{ detail.gender_data.count }}</p>
              <p class="unit">人</p>
            </div>
            <div class="sex_box">
              <div>
                <el-tag effect="dark"> 男 </el-tag>
                <p>{{ detail.gender_data.man_count }}</p>
              </div>
              <div>
                <el-tag type="danger" effect="dark"> 女 </el-tag>
                <p>{{ detail.gender_data.women_count }}</p>
              </div>
              <div>
                <el-tag type="warning" effect="dark"> 未知性别 </el-tag>
                <p>{{ detail.gender_data.unknown_count }}</p>
              </div>
            </div>
            <el-row :gutter="10">
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.compare_data.last_day.type == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.compare_data.last_day.type == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>昨日{{ detail.compare_data.last_day.rate }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.compare_data.last_week.type == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.compare_data.last_week.type == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上周{{ detail.compare_data.last_week.rate }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.compare_data.last_month.type == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.compare_data.last_month.type == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上月{{ detail.compare_data.last_month.rate }}</p>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="always">
            <h4>老用户下单数</h4>
            <div class="data_box">
              <p class="data">{{ detail.old }}</p>
            </div>
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="flex" v-for="item in detail.old_first">
                  <i class="el-icon-caret-top"></i>
                  <p class="fontw">{{ item.vendor_name }}</p>
                  <p>{{ item.count }}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flex" v-for="item in detail.old_last">
                  <i class="el-icon-caret-bottom"></i>
                  <p class="fontw">{{ item.vendor_name }}</p>
                  <p>{{ item.count }}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.yesteday_old_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.yesteday_old_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>昨日{{ detail.yesteday_old_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_week_old_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_week_old_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上周{{ detail.last_week_old_diff }}</p>
              </el-col>
              <el-col class="flex" :span="8">
                <i
                  v-if="detail.last_month_old_trend == 1"
                  class="el-icon-top-right"
                ></i>
                <i
                  v-else-if="detail.last_month_old_trend == 2"
                  class="el-icon-bottom-left"
                ></i>
                <p>上月{{ detail.last_month_old_diff }}</p>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { customerData } from "@/api/operate/data_report/manage";
import Echart from "@/components/Echart";
export default {
  components: {
    Echart,
  },
  data() {
    return {
      detail: {},
      time: "",
      timeList1: [
        { name: "日", type: "1" },
        { name: "周", type: "2" },
        { name: "月", type: "3" },
        { name: "年", type: "4" },
      ],
      time_type: "1",
      loading: false,
      timer:"",
    };
  },
  created() {
    this.getCustomerData();
  },
  methods: {
    moreUserData(){
      this.$router.push('/operate/data_report/user')
    },
    timeChange() {
      this.time_type = "5";
      this.getCustomerData();
    },
    tabClick(time_type) {
      if (this.time_type != time_type) {
        this.time = "";
        this.time_type = time_type;
        this.getCustomerData();
      }
    },
    getCustomerData() {
      this.loading = true;
      let aData = {
        time_type: this.time_type,
      };
      if (this.time) {
        aData.time_start = this.time[0];
        aData.time_end = this.time[1];
      }
      customerData(aData).then((res) => {
        this.detail = res;
        this.timer = new Date().getTime();
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.userDataTitle{
  display: flex;
  align-items: center;
  justify-content: space-between;
  p{
    cursor: pointer;
  }
}
h4 {
  margin: 0;
}
p {
  font-size: 14px;
}
.loading {
  position: absolute;
  width: 100vw;
  height: 100vh;
}
.time_type {
  padding: 0 20px;
  cursor: pointer;
  border-radius: 0;
}
.data_box {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-weight: 600;
  margin: 10px 0;
  .data {
    font-size: 30px;
    line-height: 30px;
  }
  .unit {
    font-size: 14px;
    margin-left: 5px;
  }
}
.flex {
  display: flex;
  margin: 10px 0;
  justify-content: center;
  .fontw {
    font-weight: 600;
    margin-right: 5px;
  }
  i {
    margin-right: 5px;
    font-size: 18px;
  }
  .el-icon-caret-top,
  .el-icon-top-right {
    color: green;
  }
  .el-icon-caret-bottom,
  .el-icon-bottom-left {
    color: red;
  }
}
.sex_box {
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    margin-left: 20px;
    display: flex;
    align-items: center;
    p {
      margin-left: 5px;
    }
  }
}
</style>