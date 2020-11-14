<template>
  <div class="app-container">
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
      <el-row :gutter="20">
        <el-col :span="8">
          <ManageItem title="营业额" unit="元" :data="63231" />
        </el-col>
        <el-col :span="8">
          <ManageItem title="实际收入" unit="元" :data="63231" />
        </el-col>
        <el-col :span="8">
          <ManageItem title="订单总数" unit="元" :data="63231" />
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px" :gutter="20">
        <el-col :span="8">
          <ManageItem title="套餐销量" unit="份" :data="63231" />
        </el-col>
        <el-col :span="8">
          <ManageItem title="退单数" unit="条" :data="63231" />
        </el-col>
        <el-col :span="8">
          <ManageItem title="退单率" :data="63231" />
        </el-col>
      </el-row>
      <el-row style="margin-top: 15px" :gutter="20">
        <el-col :span="8">
          <ManageItem title="成交订单" unit="条" :data="63231" />
        </el-col>
        <el-col :span="8">
          <ManageItem title="报损总数" unit="份" :data="63231" />
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <h4>耗损成本</h4>
            <div class="data_box" style="margin-bottom: -30px">
              <p class="data">63</p>
              <p class="unit">元</p>
            </div>
            <Echart id="chart" type="pie" width="100%" height="300px" />
          </el-card>
        </el-col>
      </el-row>
      <h3>用户数据</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <ManageItem title="新增用户" unit="人" :data="63231">
            <div class="sex_box">
              <div>
                <el-tag type="danger" effect="dark"> 女 </el-tag>
                <p>369</p>
              </div>
              <div>
                <el-tag effect="dark"> 男 </el-tag>
                <p>369</p>
              </div>
            </div>
          </ManageItem>
        </el-col>
        <el-col :span="12">
          <ManageItem title="老用户下单率" :data="63231" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { customerData } from "@/api/operate/data_report/manage";
import ManageItem from "./components/ManageItem";
import Echart from "@/components/Echart";
import { start } from "nprogress";
export default {
  components: {
    Echart,
    ManageItem,
  },
  data() {
    return {
      time: "",
      timeList1: [
        { name: "日", type: "1" },
        { name: "周", type: "2" },
        { name: "月", type: "3" },
        { name: "年", type: "4" },
      ],
      time_type: "1",
    };
  },
  created() {
    this.getCustomerData();
  },
  methods: {
    timeChange() {
      this.time_type = "5";
      this.getCustomerData();
    },
    tabClick(time_type) {
      this.time = "";
      this.time_type = time_type
      this.getCustomerData();
    },
    getCustomerData() {
      let aData = {
        time_type: this.time_type,
      };
      if (this.time) {
        aData.time_start = this.time[0];
        aData.time_end = this.time[1];
      }
      customerData(aData).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped lang="scss">
h4 {
  margin: 0;
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
  position: absolute;
  right: 0;
  display: flex;
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