<template>
  <div class="app-container">
    <h2>门店详情</h2>
    <el-row :gutter="20">
      <el-col :span="12">
        <img style="width: 100%" :src="detail.image" alt="" />
      </el-col>
      <el-col :span="12">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-card shadow="always">
              <div class="item_flex">
                <p>统一社会信用代码</p>
                <p>{{ detail.credit_code }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="always">
              <div class="item_flex">
                <p>食品许可证</p>
                <p>{{ detail.food_permit }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12" style="margin-top: 15px">
          <el-col :span="12">
            <el-card shadow="always">
              <div>
                <p class="i_title">营业执照</p>
                <img
                  style="width: 100%"
                  v-for="(item, index) in detail.business_license"
                  :key="index"
                  :src="item"
                  alt=""
                />
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="always">
              <div>
                <p class="i_title">食品许可证</p>
                <img
                  style="width: 100%"
                  v-for="(item, index) in detail.food_permit_image"
                  :key="index"
                  :src="item"
                  alt=""
                />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>门店ID</p>
            <p>{{ detail.id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>门店名称</p>
            <p>{{ detail.name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>省市</p>
            <p>{{ detail.province_name }}{{ detail.city_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>详细地址</p>
            <p>{{ detail.address }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>运营管理人员</p>
            <p>{{ detail.admin_user_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>联系电话</p>
            <p>{{ detail.phone }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>开店时间</p>
            <p>{{ detail.business_time_start }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <div class="item_flex">
            <p>营业天数</p>
            <p>{{ detail.business_time_start }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>营业时间</p>
            <p>
              {{ detail.business_time_start }}至{{ detail.business_time_end }}
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>上班考勤时间</p>
            <p>{{ detail.attendance_time_start }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>下班考勤时间</p>
            <p>{{ detail.attendance_time_end }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="12">
      <el-col :span="4" v-if="detail.breakfast_finish_time">
        <el-card shadow="always">
          <div class="item_flex">
            <p>早餐</p>
            <p>{{ detail.breakfast_finish_time }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" v-if="detail.breakfast_tea_finish_time">
        <el-card shadow="always">
          <div class="item_flex">
            <p>早茶</p>
            <p>{{ detail.breakfast_tea_finish_time }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" v-if="detail.lunch_finish_time">
        <el-card shadow="always">
          <div class="item_flex">
            <p>午餐</p>
            <p>{{ detail.lunch_finish_time }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" v-if="detail.tea_finish_time">
        <el-card shadow="always">
          <div class="item_flex">
            <p>下午茶</p>
            <p>{{ detail.tea_finish_time }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" v-if="detail.dinner_finish_time">
        <el-card shadow="always">
          <div class="item_flex">
            <p>晚餐</p>
            <p>{{ detail.dinner_finish_time }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" v-if="detail.night_finish_time">
        <el-card shadow="always">
          <div class="item_flex">
            <p>夜宵</p>
            <p>{{ detail.night_finish_time }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-card shadow="always">
      <div>
        <p>设备列表</p>
      </div>
    </el-card>
    <echart />   
  </div>
</template>

<script>
import { vendorDetail } from "@/api/store";
import Echart from "@/components/Echart";
export default {
  components: {
    Echart,
  },
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
      vendorDetail({ vendor_id: this.$route.query.vendor_id }).then((res) => {
        this.detail = res;
      });
    },
  },
};
</script>

<style scoped>
.i_title {
  text-align: center;
  margin-bottom: 10px;
}
</style>