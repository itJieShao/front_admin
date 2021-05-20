<template>
  <div class="app-container">
    <h2>新增任务模板</h2>
    <el-card shadow="always">
      <el-form label-width="100px">
        <el-form-item label="任务模版名称">
          <el-input
            placeholder="请输入任务模版名称"
            v-model="formData.title"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-table :data="formData.template_detail" style="width: 100%">
        <el-table-column align="center" label="任务标题">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.title"
              placeholder="请输入任务标题"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="任务内容">
          <template slot-scope="scope">
            <el-input
              type="textarea"
              v-model="scope.row.content"
              placeholder="请输入任务内容"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column width="400" align="center" label="任务时间">
          <template slot-scope="scope">
            <el-time-picker
              is-range
              value-format="HH:mm"
              format="HH:mm"
              v-model="scope.row.time"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
          </template>
        </el-table-column>
        <el-table-column align="center" label="任务循环">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.loop"
              filterable
              clearable
              placeholder="循环周期"
            >
              <el-option
                v-for="item in loop"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column width="300" align="center" label="">
          <template slot-scope="scope">
            <el-checkbox-group
              style="display: flex;flex-wrap:wrap;"
              v-if="scope.row.loop == 2"
              v-model="scope.row.loop_setup"
            >
              <el-checkbox
                v-for="item in weekList"
                :key="item.id"
                :label="item.id"
                >{{ item.name }}</el-checkbox
              >
            </el-checkbox-group>
            <!-- <el-checkbox-group
              style="display: flex;flex-wrap:wrap;"
              v-else-if="scope.row.loop == 3"
              v-model="scope.row.loop_setup"
            >
              <el-checkbox      
                v-for="item in 31"
                :key="item"
                :label="item"
                >{{ item + "号"}}</el-checkbox
              >
            </el-checkbox-group> -->
          </template>
        </el-table-column>
        <el-table-column align="center" label="">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="delTemplate(scope.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-top: 10px" type="success" @click="addTemplate"
        >新增任务</el-button
      >
      <el-row type="flex" class="row-bg" justify="end" style="margin-top: 20px">
        <el-button
          type="primary"
          :disabled="subLoading"
          :loading="subLoading"
          @click="onSubmit"
          >提交</el-button
        >
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { updateTaskTemplate } from "@/api/store";
export default {
  data() {
    return {
      subLoading: false,
      formData: {
        title: "",
        template_detail: [],
      },
      loop: [
        {
          name: "每天",
          id: 1,
        },
        {
          name: "每周",
          id: 2,
        },
        {
          name: "每月",
          id: 3,
        },
        {
          name: "工作日",
          id: 4,
        },
      ],
      weekList: [
        {
          name: "星期一",
          id: 1,
        },
        {
          name: "星期二",
          id: 2,
        },
        {
          name: "星期三",
          id: 3,
        },
        {
          name: "星期四",
          id: 4,
        },
        {
          name: "星期五",
          id: 5,
        },
        {
          name: "星期六",
          id: 6,
        },
        {
          name: "星期日",
          id: 0,
        },
      ],
    };
  },
  created() {
    for (let i = 0; i < 3; i++) {
      this.formData.template_detail.push({ loop_setup: [1, 2, 3, 4, 5, 6, 0] });
    }
  },
  methods: {
    addTemplate() {
      this.formData.template_detail.push({ loop_setup: [1, 2, 3, 4, 5, 6, 0] });   
    },
    delTemplate(index) {
      this.formData.template_detail.splice(index, 1);
    },
    onSubmit() {
      let aData = JSON.parse(JSON.stringify(this.formData));
      let template_detail = [];
      aData.template_detail.forEach((item) => {
        if (item.title) {
          if (item.time) {
            item.start_time = item.time[0];
            item.end_time = item.time[1];
            delete item.time;
          }
          if (item.loop != 2){
            delete item.loop_setup;
          }
          if (item.loop_setup){
            item.loop_setup = JSON.stringify(item.loop_setup)
          }
          template_detail.push(item);
        }
      });
      aData.template_detail = JSON.stringify(template_detail);
      if (!aData.title){
        return this.$message.error("请输入模板名称");
      }
      if (!template_detail.length){
        return this.$message.error("至少有一条任务");
      }
      updateTaskTemplate(aData).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "提交成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.$router.go(-1);
            },
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.el-checkbox{
  margin-right: 10px;
}
.el-checkbox__label{
  margin-left: 5px;
}
</style>