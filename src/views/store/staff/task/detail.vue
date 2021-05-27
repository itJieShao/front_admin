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
            <p>{{ detail.vendor_name }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <!-- <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>岗位</p>
            <p>{{ detail.employee_station }}</p>
          </div>
        </el-card>
      </el-col> -->
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>任务日期</p>
            <p>{{ detail.date }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>任务数量</p>
            <p>{{ detail.task_qty }}</p>
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
    <el-card style="margin-top: 15px" shadow="always">
      <el-table :data="detail.list" style="width: 100%">
        <el-table-column width="80" align="center" label="排序">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="任务标题">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="任务内容">
          <template slot-scope="scope">
            <span>{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="规定开始时间">
          <template slot-scope="scope">
            <span>{{ scope.row.stipulate_start_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="规定结束时间">
          <template slot-scope="scope">
            <span>{{ scope.row.stipulate_end_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="实际完成时间">
          <template slot-scope="scope">
            <span>{{ scope.row.success_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="图片">
          <template slot-scope="scope">
            <img style="width:50px;height:50px;" :src="scope.row.success_images" alt="">
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { vendorTaskDetail } from "@/api/store";
export default {
  data() {
    return {
      today_task_id: "",
      detail: {},
    };
  },
  created() {
    this.today_task_id = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    getDetail() {
      vendorTaskDetail({
        today_task_id: this.today_task_id,
      }).then((res) => {
        this.detail = res;
      });
    },
  },
};
</script>