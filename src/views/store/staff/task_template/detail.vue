<template>
  <div class="app-container">
    <h2>任务模版详情</h2>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>任务模版ID</p>
            <p>{{ $route.query.id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>任务模版名称</p>
            <p>{{ detail.title }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>引用数量</p>
            <p>{{ detail.used_qty }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>创建人</p>
            <p>{{ detail.created_admin_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>创建时间</p>
            <p>{{ detail.created_at }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>状态</p>
            <p>
              <el-tag type="danger" v-if="detail.status == 0">已禁用</el-tag>
              <el-tag type="success" v-else>已启用</el-tag>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4" v-if="detail.status == 1">
        <el-card shadow="always">
          <div class="item_flex">
            <p>操作</p>
            <p>
              <el-button type="danger" @click="updateStatus" size="mini"
                >禁用</el-button
              >
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card style="margin-top: 15px" shadow="always">
      <el-table :data="detail.detail_list" style="width: 100%">
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
        <el-table-column align="center" label="开始时间">
          <template slot-scope="scope">
            <span>{{ scope.row.start_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="结束时间">
          <template slot-scope="scope">
            <span>{{ scope.row.end_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="循环">
          <template slot-scope="scope">
            <span
              >{{ scope.row.loop
              }}<span v-if="scope.row.loop == '每周' && scope.row.loop_setup_name"
                >（{{
                  scope.row.loop_setup_name.slice(
                    0,
                    scope.row.loop_setup_name.length - 1
                  )
                }}）</span
              >
              <span v-else-if="scope.row.loop == '每月'">
                （{{JSON.parse(scope.row.loop_setup).join("号,") + "号"}}）
              </span>
              </span
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getTaskTemplate, updateTaskTemplate } from "@/api/store";
export default {
  data() {
    return {
      detail: {},
    };
  },
  created() {
    this.getTaskTemplate();
  },
  methods: {
    getTaskTemplate() {
      getTaskTemplate({ template_id: this.$route.query.id }).then((res) => {
        if (res.detail_list.length) {
          res.detail_list.forEach((item) => {
            switch (item.loop) {
              case 1:
                item.loop = "每天";
                break;
              case 2:
                item.loop = "每周";
                break;
              case 3:
                item.loop = "每月";
                break;
              case 4:
                item.loop = "工作日";
                break;
            }
            item.loop_setup_name = "";
            if (item.loop == "每周" && item.loop_setup) {
              JSON.parse(item.loop_setup).forEach((it) => {
                switch (it) {
                  case 1:
                    item.loop_setup_name += "星期一,";
                    break;
                  case 2:
                    item.loop_setup_name += "星期二,";
                    break;
                  case 3:
                    item.loop_setup_name += "星期三,";
                    break;
                  case 4:
                    item.loop_setup_name += "星期四,";
                    break;
                  case 5:
                    item.loop_setup_name += "星期五,";
                    break;
                  case 6:
                    item.loop_setup_name += "星期六,";
                    break;
                  case 0:
                    item.loop_setup_name += "星期日,";
                    break;
                }
              });
            }
          });
        }
        this.detail = res;
      });
    },
    updateStatus() {
      updateTaskTemplate({
        template_id: this.$route.query.id,
        status: 0,
      }).then((res) => {
        if (res) {
          this.$set(this.detail, "status", 0);
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
  },
};
</script>

<style>
</style>