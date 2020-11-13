<template>
  <div class="app-container">
    <h2>经营报表</h2>
    <el-card shadow="always">
      <el-date-picker v-model="value1" type="date" placeholder="自定义时间">
      </el-date-picker>
      <el-tabs v-model="tabActive1" style="margin-top: 15px" type="border-card">
        <el-tab-pane
          v-for="item in timeList1"
          :key="item.type"
          :label="item.name"
          :name="item.type"
        >
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
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ManageItem from "./components/ManageItem";
import Echart from "@/components/Echart";
export default {
  components: {
    Echart,
    ManageItem,
  },
  data() {
    return {
      timeList1: [
        { name: "日", type: "1" },
        { name: "周", type: "2" },
        { name: "月", type: "3" },
        { name: "年", type: "4" },
      ],
      tabActive1: "1",
      timeList2: [
        { name: "周", type: "1" },
        { name: "月", type: "2" },
        { name: "季", type: "3" },
        { name: "年", type: "4" },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
h4 {
  margin: 0;
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