<template>
  <div class="app-container">
    <h2>门店员工任务详情</h2>
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>任务记录ID</p>
            <p>{{ detail.id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>员工ID</p>
            <p>{{ detail.employee_id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>员工名称</p>
            <p>{{ detail.employee_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>所属门店</p>
            <p>{{ detail.vendor_name.join(",") }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>岗位</p>
            <p>{{ detail.employee_station }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>任务ID</p>
            <p>{{ detail.employee_task_id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>任务标题</p>
            <p>{{ detail.title }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>任务内容</p>
            <p>{{ detail.content }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>规定开始时间</p>
            <p>{{ detail.stipulate_start_time }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>规定结束时间</p>
            <p>{{ detail.stipulate_end_time }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>实际完成时间</p>
            <p>{{ detail.start_time }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>完成情况</p>
            <p>
              <el-tag effect="dark" type="success" v-if="detail.status == 1"
                >已完成</el-tag
              >
              <el-tag effect="dark" type="danger" v-else>未完成</el-tag>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { vendorTaskDetail } from "@/api/store";
export default {
  data() {
    return {
      employee_today_task_id: "",
      detail: {},
    };
  },
  created() {
    this.employee_today_task_id = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    getDetail() {
      vendorTaskDetail({
        employee_today_task_id: this.employee_today_task_id,
      }).then((res) => {
        this.detail = res;
      });
    },
  },
};
</script>

<style scoped>
p {
  margin: 0;
}
.item_flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  word-wrap: break-word;
  word-break: break-all;
}
.item_flex p:last-child {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px solid #ddd;
  color: #999;
}
</style>