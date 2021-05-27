<template>
  <div class="app-container">
    <h2>套餐报表</h2>
    <el-tabs v-model="tabActive" style="margin-top: 15px" type="border-card">
      <el-tab-pane
        v-for="item in storeList"
        :key="item.vendor_id"
        :label="item.vendor_name"
        :name="item.vendor_id"
      >
        <div
          class="loading"
          :style="loading ? 'z-index: 1;' : 'z-index: -1;'"
          v-loading="loading"
        ></div>
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
          <el-row :gutter="10">
            <el-col :span="8">
              <el-card shadow="always">
                <h4>总销量</h4>
                <div class="data_box">
                  <p class="data">{{ detail.total_sales_num }}</p>
                  <p class="unit">份</p>
                </div>
                <!-- <div>
                  <i
                    v-if="detail.yesteday_turnover_trend == 1"
                    class="el-icon-top-right"
                  ></i>
                  <i
                    v-else-if="detail.yesteday_turnover_trend == 2"
                    class="el-icon-bottom-left"
                  ></i>
                  <p>同比</p>
                </div> -->
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="always">
                <h4>进货总份数</h4>
                <div class="data_box">
                  <p class="data">{{ detail.total_part_num }}</p>
                  <p class="unit">份</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="always">
                <h4>套餐总款数</h4>
                <div class="data_box">
                  <p class="data">{{ detail.total_species_num }}</p>
                  <p class="unit">款</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="margin-top: 20px">
            <el-col :span="8">
              <el-card shadow="always">
                <h4>应存库存</h4>
                <div class="data_box">
                  <p class="data">{{ detail.stock_qty_num }}</p>
                  <p class="unit">份</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="always">
                <h4>实际库存</h4>
                <div class="data_box">
                  <p class="data">{{ detail.real_qty_num }}</p>
                  <p class="unit">份</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="always">
                <h4>报损总份数</h4>
                <div class="data_box">
                  <p class="data">{{ detail.loss_qty_num }}</p>
                  <p class="unit">份</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <template v-if="detail.ranking_data.length">
            <el-divider />
            <h3>套餐销量排行表</h3>
            <el-card
              style="margin-bottom: 20px"
              shadow="always"
              v-for="(item, index) in detail.ranking_data"
              :key="index"
            >
              <el-row :gutter="10" class="rank">
                <el-col :span="20">
                  <el-row :gutter="24" style="display: flex">
                    <div
                      class="rank_sth"
                      style="margin: 0 20px 0 50px; width: 280px"
                    >
                      <p>{{ item.package_name }}</p>
                      <img :src="item.image" alt="" />
                    </div>
                    <div class="rank_sth">
                      <p>销量</p>
                      <p>{{ item.sale_qty }}<span>份</span></p>
                    </div>
                    <div class="rank_sth">
                      <p>应存库存</p>
                      <p>{{ item.stock_qty }}<span>份</span></p>
                    </div>
                    <div class="rank_sth">
                      <p>实际库存</p>
                      <p>{{ item.real_qty }}<span>份</span></p>
                    </div>
                    <div class="rank_sth">
                      <p>报损份数</p>
                      <p>{{ item.loss_qty }}<span>份</span></p>
                    </div>
                  </el-row>
                </el-col>
                <el-col :span="4">
                  <p
                    :style="item.order == 1 ? 'color:red;' : ''"
                    class="rank_num"
                  >
                    NO.{{ item.order }}
                  </p>
                </el-col>
              </el-row>
            </el-card>
          </template>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { searchStoreList } from "@/api/basic";
import { mealData } from "@/api/operate/data_report/meal";
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
      storeList: [],
      tabActive: "",
    };
  },
  created() {
    this.getStoreList();
  },
  watch: {
    tabActive() {
      this.getMealData();
    },
  },
  methods: {
    getStoreList() {
      searchStoreList().then((res) => {
        res.unshift({ vendor_id: "", vendor_name: "全部" });
        this.storeList = res;
      });
    },
    timeChange() {
      if (this.time) {
        this.time_type = "5";
        this.getMealData();
      } else {
        this.time_type = "1";
      }
    },
    tabClick(time_type) {
      if (this.time_type != time_type) {
        this.time = "";
        this.time_type = time_type;
        this.getMealData();
      }
    },
    getMealData() {
      this.loading = true;
      let aData = {
        vendor_id: this.tabActive,
        time_type: this.time_type,
      };
      if (this.time) {
        aData.time_start = this.time[0];
        aData.time_end = this.time[1];
      }
      mealData(aData).then((res) => {
        this.detail = res;
        this.timer = new Date().getTime();
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.userDataTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
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
.rank {
  display: flex;
  align-items: center;
}
.rank_sth {
  display: flex;
  flex-direction: column;
  margin-right: 70px;
  font-weight: bold;
}
.rank_sth img {
  width: 120px;
  height: 120px;
  margin-top: 15px;
  border: 1px solid #ddd;
}
img[src=""],
img:not([src]) {
  opacity: 1;
}
.rank_sth p:first-child {
  font-size: 16px;
}
.rank_sth p:last-child {
  font-size: 40px;
  margin-top: 30px;
}
.rank_sth p:last-child span {
  font-size: 16px;
  margin-left: 5px;
}
.rank_num {
  font-size: 50px;
  font-weight: bold;
}
</style>