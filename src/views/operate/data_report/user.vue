<template>
  <div class="app-container">
    <div
      class="loading"
      :style="loading ? 'z-index: 1;' : 'z-index: -1;'"
      v-loading="loading"
    ></div>
    <div class="pageTitle">
      <i @click="$router.go(-1)" class="el-icon-arrow-left"></i>
      <h2>用户报表</h2>
    </div>
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
      <h3>用户数据</h3>
      <el-row :gutter="10" v-if="userData.all_data">
        <el-col :span="8">
          <el-card shadow="always">
            <h4>所有用户</h4>
            <div class="data_box_flex">
              <div class="data_box">
                <p class="data">{{ userData.all_data.count }}</p>
                <p class="unit">人</p>
              </div>
            </div>
            <div class="sex_box">
              <div>
                <el-tag effect="dark"> 男 </el-tag>
                <p>{{ userData.all_data.man_count }}</p>
              </div>
              <div>
                <el-tag type="danger" effect="dark"> 女 </el-tag>
                <p>{{ userData.all_data.women_count }}</p>
              </div>
              <div>
                <el-tag type="warning" effect="dark"> 未知性别 </el-tag>
                <p>{{ userData.all_data.unknown_count }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <h4>新增用户</h4>
            <div class="data_box_flex">
              <div class="data_box">
                <p class="data">{{ userData.add_data.count }}</p>
                <p class="unit">人</p>
              </div>
              <div class="data_box" style="margin-left: 30px">
                <p class="data">{{ userData.add_data.rate }}</p>
              </div>
            </div>
            <div class="sex_box">
              <div>
                <el-tag effect="dark"> 男 </el-tag>
                <p>{{ userData.add_data.man_count }}</p>
              </div>
              <div>
                <el-tag type="danger" effect="dark"> 女 </el-tag>
                <p>{{ userData.add_data.women_count }}</p>
              </div>
              <div>
                <el-tag type="warning" effect="dark"> 未知性别 </el-tag>
                <p>{{ userData.add_data.unknown_count }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <h4>老用户</h4>
            <div class="data_box_flex">
              <div class="data_box">
                <p class="data">{{ userData.old_data.count }}</p>
                <p class="unit">人</p>
              </div>
              <div class="data_box" style="margin-left: 30px">
                <p class="data">{{ userData.old_data.rate }}</p>
              </div>
            </div>
            <div class="sex_box">
              <div>
                <el-tag effect="dark"> 男 </el-tag>
                <p>{{ userData.old_data.man_count }}</p>
              </div>
              <div>
                <el-tag type="danger" effect="dark"> 女 </el-tag>
                <p>{{ userData.old_data.women_count }}</p>
              </div>
              <div>
                <el-tag type="warning" effect="dark"> 未知性别 </el-tag>
                <p>{{ userData.old_data.unknown_count }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <h3>复购数据</h3>
      <el-row :gutter="10" v-if="repurchaseData.all_data">
        <el-col :span="8">
          <el-card shadow="always">
            <h4>用户复购率</h4>
            <div class="data_box_flex">
              <div class="data_box">
                <p class="data">{{ repurchaseData.all_data.count }}</p>
                <p class="unit">人</p>
              </div>
              <div class="data_box" style="margin-left: 30px">
                <p class="data">{{ repurchaseData.all_data.rate }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="always">
            <h4>男/女用户复购率</h4>
            <Echart
              id="chart"
              unit="人"
              :pieData="repurchaseData.rate_data"
              type="pie"
              width="100%"
              height="300px"
            />
          </el-card>
        </el-col>
      </el-row>
      <el-row v-for="(item,index) in repurchaseData.count_data" :key="index" style="margin-top:20px;" :gutter="10" v-if="repurchaseData.all_data">
        <el-col :span="8" v-for="(it,idx) in item" :key="index">
          <el-card shadow="always">
            <h4>{{it.num}}次复购率</h4>
            <div class="data_box_flex">
              <div class="data_box">
                <p class="data">{{ it.count }}</p>
                <p class="unit">人</p>
              </div>
              <div class="data_box" style="margin-left: 30px">
                <p class="data">{{ it.rate }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card> 
  </div>
</template>

<script>
import { userData, repurchaseData } from "@/api/operate/data_report/manage";
import Echart from "@/components/Echart";
export default {
  components: {
    Echart,
  },
  data() {
    return {
      userData: {},
      repurchaseData: {},
      time: "",
      timeList1: [
        { name: "日", type: "1" },
        { name: "周", type: "2" },
        { name: "月", type: "3" },
        { name: "年", type: "4" },
      ],
      time_type: "1",
      loading: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    timeChange() {
      this.time_type = "5";
      this.getData();
    },
    tabClick(time_type) {
      if (this.time_type != time_type) {
        this.time = "";
        this.time_type = time_type;
        this.getData();
      }
    },
    getData() {
      this.loading = true;
      let aData = {
        time_type: this.time_type,
      };
      if (this.time) {
        aData.time_start = this.time[0];
        aData.time_end = this.time[1];
      }
      userData(aData).then((res) => {
        this.userData = res;
        this.loading = false;
      });
      repurchaseData(aData).then((res) => {
        res.rate_data.forEach(item =>  {
          item.name = item.gender;
          item.value = item.count;
        })
        let count_data = [];
        for (let i = 0; i < res.count_data.length; i += 3) {
          count_data.push(res.count_data.slice(i, i + 3));
        }
        res.count_data = count_data;
        this.repurchaseData = res;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.pageTitle {
  display: flex;
  align-items: center;
  i {
    font-size: 24px;
    font-weight: bold;
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
.data_box_flex {
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin: 15px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    margin-left: 30px;
    display: flex;
    align-items: center;
    p {
      margin-left: 5px;
    }
  }
}
</style>