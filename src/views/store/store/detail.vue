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
      <el-col :span="8">
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
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>联系电话</p>
            <p>{{ detail.phone }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>开店时间</p>
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
      <el-col :span="12" v-if="detail.business_days_name">
        <el-card shadow="always">
          <div class="item_flex">
            <p>营业天数</p>
            <p>{{ detail.business_days_name.join("、") }}</p>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="4">
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
      </el-col> -->
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>所属小程序环境</p>
            <p>
              {{ detail.env ? "一合拾盒小程序" : "盒小饭堂小程序" }}
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>外卖功能</p>
            <p>
              {{ detail.need_distribution ? "开放外卖配送" : "关闭外卖配送" }}
            </p>
          </div>
        </el-card>
      </el-col>
      <template v-if="detail.need_distribution">
        <el-col :span="12">
          <el-card shadow="always">
            <div class="item_flex">
              <p>外卖时段</p>
              <p>
                {{ detail.distribution_time_type_names }}
              </p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="always">
            <div class="item_flex">
              <p>配送范围</p>
              <p>
                {{ detail.distribution_distance }}
              </p>
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
    <template v-if="detail.need_distribution">
      <el-divider />
      <el-table :data="detail.distribution_rule_data" style="width: 100%">
        <el-table-column align="center" prop="distance" label="距离(单位/米)">
        </el-table-column>
        <el-table-column align="center" prop="fee" label="配送费(单位/元)">
        </el-table-column>
        <el-table-column align="center" prop="time" label="配送时间(单位/分钟)">
        </el-table-column>
      </el-table>
    </template>
    <el-divider />
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="always">
          <div>
            <div class="item_title">
              <p>用餐时段</p>
              <p>结束烹饪时间</p>
              <p>开始营业时间</p>
              <p>结束营业时间</p>
              <p>催餐时间</p>
            </div>
            <el-divider />
            <div
              class="item_content"
              v-for="item in detail.cook_finish_time"
              :key="item.time_type_id"
            >
              <div class="item_sth">
                <p>{{ item.time_type_name }}</p>
              </div>
              <div class="item_sth">
                <p>{{ item.time }}</p>
              </div>
              <div class="item_sth">
                <p>{{ item.business_start }}</p>
              </div>
              <div class="item_sth">
                <p>{{ item.business_end }}</p>
              </div>
              <div class="item_sth">
                <p>{{ item.un_take_remind }}</p>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <template v-if="list.length">
      <el-divider />
      <el-card shadow="always">
        <div>
          <h4>设备列表</h4>
          <el-tabs
            type="border-card"
            style="margin-top: 20px"
            v-loading="loading"
          >
            <el-tab-pane v-for="item in list" :label="item.device_alias">
              <el-row :gutter="12">
                <el-col :span="20">
                  <el-row :gutter="12">
                    <el-col :span="4">
                      <el-card shadow="always">
                        <div class="item_flex">
                          <p>设备ID</p>
                          <p>{{ item.device_no }}</p>
                        </div>
                      </el-card>
                    </el-col>
                    <el-col :span="4">
                      <el-card shadow="always">
                        <div class="item_flex">
                          <p>设备名称</p>
                          <p>{{ item.device_alias }}</p>
                        </div>
                      </el-card>
                    </el-col>
                    <el-col :span="4">
                      <el-card shadow="always">
                        <div class="item_flex">
                          <p>设备IMIE</p>
                          <p>{{ item.device_imie }}</p>
                        </div>
                      </el-card>
                    </el-col>
                    <el-col :span="4">
                      <el-card shadow="always">
                        <div class="item_flex">
                          <p>设备电话号码</p>
                          <p>{{ item.device_phone }}</p>
                        </div>
                      </el-card>
                    </el-col>
                    <el-col :span="4">
                      <el-card shadow="always">
                        <div class="item_flex">
                          <p>阿里云设备名称</p>
                          <p>{{ item.iot_device_name }}</p>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                  <el-row :gutter="12" style="margin-top: 15px">
                    <el-col :span="4">
                      <el-card shadow="always">
                        <div class="item_flex">
                          <p>启动状态</p>
                          <p>{{ item.online ? "在线" : "离线" }}</p>
                        </div>
                      </el-card>
                    </el-col>
                    <el-col :span="4">
                      <el-card shadow="always">
                        <div class="item_flex">
                          <p>关门状态</p>
                          <p>{{ item.close_status ? "关门" : "未关门" }}</p>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="4">
                  <vue-qr :text="item.device_no" :size="200"></vue-qr>
                </el-col>
              </el-row>
              <h5 style="margin-top: 40px">单元格列表</h5>
              <el-divider />
              <el-table :data="item.cell" style="width: 100%">
                <!-- <el-table-column type="expand">
                <template slot-scope="scope">
                  <p v-if="scope.row.connect_status" class="no_cell_font">
                    当前单元格无法联网，请检查设备！
                  </p>
                </template>
              </el-table-column> -->
                <el-table-column align="center" label="编号" prop="no">
                </el-table-column>
                <el-table-column align="center" label="单元格名称" prop="alias">
                </el-table-column>
                <el-table-column align="center" label="规格" prop="spec_type">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="最大容量"
                  prop="spec_num"
                >
                </el-table-column>
                <!-- <el-table-column align="center" label="库存" prop=""> </el-table-column> -->
                <el-table-column
                  align="center"
                  label="实时温度A"
                  prop="temperature_a"
                >
                </el-table-column>
                <el-table-column
                  align="center"
                  label="实时温度B"
                  prop="temperature_b"
                >
                </el-table-column>
                <el-table-column
                  align="center"
                  width="200"
                  label="最近上报时间"
                  prop="updated_at"
                >
                </el-table-column>
                <el-table-column align="center" label="连线状态">
                  <template slot-scope="scope">
                    <el-tag
                      :type="scope.row.connect_status ? 'success' : 'danger'"
                    >
                      {{ scope.row.connect_status ? "在线" : "离线" }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column width="200" align="center" label="二维码">
                  <template slot-scope="scope">
                    <vue-qr :text="scope.row.no" :size="150"></vue-qr>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </template>
    <!-- <echart /> -->
  </div>
</template>

<script>
import { vendorDetail, vendorDeviceList, getTimeTypeData } from "@/api/store";
import vueQr from "vue-qr";
import Echart from "@/components/Echart";
export default {
  components: {
    Echart,
    vueQr,
  },
  data() {
    return {
      detail: {},
      timeList: [],
      listData: {
        vendor_id: "",
        page: 1,
        page_size: 10,
      },
      list: [],
      loading: false,
      total: 0,
    };
  },
  async created() {
    this.listData.vendor_id = this.$route.query.vendor_id;
    this.getVendorDeviceList();
    await this.getTimeTypeData();
    this.getDetail();
  },
  methods: {
    //获取门店用餐时段列表
    getTimeTypeData() {
      return getTimeTypeData().then((res) => {
        res.forEach((item) => (item.select = true));
        this.timeList = res;
      });
    },
    getDetail() {
      vendorDetail({ vendor_id: this.$route.query.vendor_id }).then((res) => {
        if (res.cook_finish_time && res.cook_finish_time.length) {
          res.cook_finish_time.forEach((item) => {
            this.timeList.forEach((it) => {
              if (item.time_type_id == it.id) {
                item.name = it.name;
              }
            });
          });
        }
        this.detail = res;
      });
    },
    getVendorDeviceList() {
      this.loading = true;
      vendorDeviceList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.i_title {
  text-align: center;
  margin-bottom: 10px;
}
.no_cell_font {
  font-size: 20px;
  color: red;
  text-align: center;
  padding: 20px 0;
}
.item_title,
.item_content {
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 20px;
  align-items: center;
  p {
    display: flex;
    justify-content: center;
    flex: 1;
  }
  .item_sth {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>