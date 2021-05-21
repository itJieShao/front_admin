<template>
  <div class="app-container">
    <h2>{{ pageTitle }}详情</h2>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <img style="width: 100%" :src="detail.image" alt="" />
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-row :gutter="12">
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>员工ID</p>
                <p>{{ detail.id }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>员工名称</p>
                <p>{{ detail.name }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>岗位</p>
                <p>{{ detail.station_name }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>年龄</p>
                <p>{{ detail.age }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>学历</p>
                <p>{{ detail.education }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>籍贯</p>
                <p>{{ detail.native_place }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12" style="margin-top: 15px">
          <el-col :span="6">
            <el-card shadow="always">
              <div class="item_flex">
                <p>手机</p>
                <p>{{ detail.phone }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="always">
              <div class="item_flex">
                <p>入职时间</p>
                <p>{{ detail.entry_time }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="always">
              <div class="item_flex">
                <p>Openid</p>
                <p>{{ detail.open_id }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="always">
              <div class="item_flex">
                <p>Unionid</p>
                <p>{{ detail.union_id }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12" style="margin-top: 15px">
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>状态</p>
                <p>
                  <el-tag :type="detail.status ? 'success' : 'danger'">{{
                    detail.status ? "启用" : "禁用"
                  }}</el-tag>
                </p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always">
              <div class="item_flex">
                <p>操作</p>
                <p>
                  <el-button
                    @click="updateStatus"
                    size="mini"
                    :type="detail.status == 0 ? 'success' : 'danger'"
                    >{{ detail.status == 0 ? "启用" : "禁用" }}</el-button
                  >
                </p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="always" style="width: 200px; height: 200px">
              <vue-qr :text="detail.qr_code" :size="150"></vue-qr>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <template v-if="station_id != 1">
      <el-divider />
      <h4>{{ station_id == 2 ? "配送门店" : "QC抽检门店" }}</h4>
      <el-row :gutter="12">
        <el-col :span="4" v-for="item in detail.vendor_name">
          <el-card shadow="always">
            <div class="item_flex">
              <p>门店名称</p>
              <p>{{ item }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </template>
    <template v-if="station_id == 1">
      <el-divider />
      <div class="task_top">
        <h4>员工任务</h4>
        <div>
          <el-button type="success" @click="templateDialogVisible = true"
            >导入任务模板</el-button
          >
          <el-button
            v-if="templateData.length"
            type="danger"
            @click="clearTemplate"
            >清空</el-button
          >
        </div>
        <!-- <el-button @click="dialogVisible = true">新增员工任务</el-button> -->
      </div>
      <el-card shadow="always">
        <el-table :data="templateData" style="width: 100%">
          <el-table-column align="center" prop="title" label="任务">
          </el-table-column>
          <el-table-column align="center" prop="content" label="任务内容">
          </el-table-column>
          <el-table-column align="center" prop="start_time" label="开始时间">
          </el-table-column>
          <el-table-column align="center" prop="end_time" label="结束时间">
          </el-table-column>
          <el-table-column align="center" label="循环">
            <template slot-scope="scope">
              <span
                >{{ scope.row.loop
                }}<span
                  v-if="scope.row.loop == '每周' && scope.row.loop_setup_name"
                  >（{{
                    scope.row.loop_setup_name.slice(
                      0,
                      scope.row.loop_setup_name.length - 1
                    )
                  }}）</span
                >
                <span v-else-if="scope.row.loop == '每月'">
                  （{{ JSON.parse(scope.row.loop_setup).join("号,") + "号" }}）
                </span>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </template>
    <el-dialog title="新增员工任务" :visible.sync="dialogVisible">
      <el-form label-width="80px">
        <el-form-item label="任务标题">
          <el-select
            @change="taskChange"
            style="width: 100%"
            v-model="formData.task_id"
            filterable
            placeholder="请选择任务"
          >
            <el-option
              v-for="item in vendorTaskList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务内容">
          <el-input
            type="textarea"
            disabled
            v-model="formData.content"
          ></el-input>
        </el-form-item>
        <el-form-item label="任务时间">
          <el-time-picker
            style="width: 100%"
            is-range
            v-model="time"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            format="HH:mm"
            value-format="HH:mm"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="循环">
          <el-select
            @change="formData.period_day = []"
            style="width: 100%"
            v-model="formData.period"
            filterable
            placeholder="请选择任务循环周期"
          >
            <el-option
              v-for="item in periodList"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            >
            </el-option>
          </el-select>
          <el-select
            v-if="formData.period == 2"
            style="width: 100%; margin-top: 15px"
            v-model="formData.period_day"
            placeholder="请选择具体时间，可多选"
            multiple
          >
            <el-option
              v-for="item in weekList"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            >
            </el-option>
          </el-select>
          <el-select
            v-if="formData.period == 3"
            style="width: 100%; margin-top: 15px"
            v-model="formData.period_day"
            placeholder="请选择具体时间，可多选"
            multiple
          >
            <el-option
              v-for="item in 31"
              :key="item"
              :label="item + '号'"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTask">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="70%"
      title="任务模板"
      :visible.sync="templateDialogVisible"
    >
      <template v-if="import_template_id">
        <el-table :data="templateDetail.detail_list" style="width: 100%">
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
                }}<span
                  v-if="scope.row.loop == '每周' && scope.row.loop_setup_name"
                  >（{{
                    scope.row.loop_setup_name.slice(
                      0,
                      scope.row.loop_setup_name.length - 1
                    )
                  }}）</span
                >
                <span v-else-if="scope.row.loop == '每月'">
                  （{{ JSON.parse(scope.row.loop_setup).join("号,") + "号" }}）
                </span>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <el-row
          style="margin-top: 15px"
          type="flex"
          class="row-bg"
          justify="end"
        >
          <el-button type="success" @click="importTemplate(import_template_id)"
            >导入</el-button
          >
        </el-row>
      </template>
      <template v-else>
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column align="center" label="任务模版ID">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="任务模版名称">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="引用数量">
            <template slot-scope="scope">
              <span>{{ scope.row.used_qty }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="创建人">
            <template slot-scope="scope">
              <span>{{ scope.row.created_admin_name }}</span>
            </template>
          </el-table-column>

          <el-table-column width="200" align="center" label="创建时间">
            <template slot-scope="scope">
              <span>{{ scope.row.created_at }}</span>
            </template>
          </el-table-column>

          <el-table-column
            width="200"
            fixed="right"
            align="center"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                type="success"
                size="mini"
                @click="importTemplate(scope.row.id)"
                >导入</el-button
              >
              <el-button size="mini" @click="seeTemplate(scope.row.id)"
                >预览</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="page"
          :limit.sync="page_size"
          @pagination="getTaskTemplateList"
        />
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTaskTemplate,
  getTaskTemplateList,
  vendorEmployeeDetail,
  employeeTaskList,
  disableEmployee,
  vendorTaskData,
  addEmployeeTask,
  delEmployeeTask,
  updateEmployeeTaskTemplate,
} from "@/api/store";
import Pagination from "@/components/Pagination";
import vueQr from "vue-qr";
export default {
  data() {
    return {
      time: "",
      pageTitle: "",
      station_id: "",
      detail: {},
      taskList: [],
      page: 1,
      page_size: 10,
      loading: false,
      total: 0,
      dialogVisible: false,
      templateDialogVisible: false,
      formData: {
        task_id: "",
        title: "",
        content: "",
        employee_id: "",
        stipulate_start_time: "",
        stipulate_end_time: "",
        period: "",
        period_day: [],
      },
      defaultData: {},
      periodList: [
        { type: 1, name: "天" },
        { type: 2, name: "周" },
        { type: 3, name: "月" },
      ],
      weekList: [
        { type: 0, name: "星期日" },
        { type: 1, name: "星期一" },
        { type: 2, name: "星期二" },
        { type: 3, name: "星期三" },
        { type: 4, name: "星期四" },
        { type: 5, name: "星期五" },
        { type: 6, name: "星期六" },
      ],
      vendorTaskList: [],
      import_template_id: "",
      templateDetail: {},
      templateData: [],
    };
  },
  components: {
    Pagination,
    vueQr,
  },
  watch: {
    time(val) {
      this.formData.stipulate_start_time = val[0];
      this.formData.stipulate_end_time = val[1];
    },
    templateDialogVisible(isOpen) {
      if (!isOpen) {
        this.import_template_id = "";
      }
    },
  },
  async created() {
    this.defaultData = JSON.parse(JSON.stringify(this.formData));
    let { employee_id, station_id } = this.$route.query;
    this.station_id = station_id;
    this.formData.employee_id = employee_id;
    switch (station_id) {
      case "1":
        this.pageTitle = "门店员工";
        break;
      case "2":
        this.pageTitle = "配货员";
        break;
      case "3":
        this.pageTitle = "QC人员";
        break;
    }
    this.getTaskTemplateList();
    this.getVendorTaskData();
    await this.getDetail();
    this.getTaskTemplate();
    this.getTaskList();
  },
  methods: {
    getTaskTemplate() {
      getTaskTemplate({ employee_id: this.detail.id }).then((res) => {
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
        this.templateData = res.detail_list;
      });
    },
    //获取任务模板列表
    getTaskTemplateList() {
      this.loading = true;
      getTaskTemplateList({ page: this.page, page_size: this.page_size }).then(
        (res) => {
          this.total = res.count;
          this.list = res.list;
          this.loading = false;
        }
      );
    },
    //预览任务模板
    seeTemplate(id) {
      this.import_template_id = id;
      getTaskTemplate({ template_id: id }).then((res) => {
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
            if (item.loop_setup) {
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
        this.templateDetail = res;
      });
    },
    //导入任务模板
    importTemplate(id) {
      updateEmployeeTaskTemplate({
        employee_id: this.detail.id,
        template_id: id,
      }).then((res) => {
        if (res) {
          this.templateDialogVisible = false;
          this.import_template_id = "";
          this.getTaskTemplate();
          this.$notify({
            title: "成功",
            message: "导入成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    //清空任务模板
    clearTemplate() {
      updateEmployeeTaskTemplate({
        employee_id: this.detail.id,
        is_delete: 1,
      }).then((res) => {
        if (res) {
          this.templateData = [];
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    //任务标题切换
    taskChange() {
      let item = this.vendorTaskList.find(
        (item) => item.id == this.formData.task_id
      );
      this.formData.title = item.title;
      this.formData.content = item.content;
    },
    //获取任务列表
    getVendorTaskData() {
      vendorTaskData().then((res) => {
        this.vendorTaskList = res.list;
      });
    },
    //新增员工任务
    addTask() {
      let aData = JSON.parse(JSON.stringify(this.formData));
      if (aData.period != 1) {
        aData.period_day = aData.period_day.join(",");
      }
      addEmployeeTask(aData).then((res) => {
        if (res) {
          this.getTaskList();
          this.dialogVisible = false;
          this.time = "";
          this.formData = JSON.parse(JSON.stringify(this.defaultData));
          this.formData.employee_id = this.$route.query.employee_id;
          this.$notify({
            title: "成功",
            message: "提交成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    //删除员工任务
    delTask(id, index) {
      delEmployeeTask({ employee_task_id: id }).then((res) => {
        if (res) {
          this.taskList.splice(index, 1);
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    getDetail() {
      return vendorEmployeeDetail({
        employee_id: this.$route.query.employee_id,
      }).then((res) => {
        this.detail = res;
      });
    },
    getTaskList() {
      this.loading = true;
      employeeTaskList({
        vendor_id: this.detail.vendor_id,
        employee_id: this.$route.query.employee_id,
        page: this.page,
        page_size: this.page_size,
      }).then((res) => {
        this.total = res.count;
        this.taskList = res.list;
        this.loading = false;
      });
    },
    updateStatus() {
      let status = this.detail.status;
      disableEmployee({
        employee_id: this.formData.employee_id,
        type: status == 1 ? 2 : 1,
      }).then((res) => {
        if (res) {
          this.detail.status = status == 1 ? 0 : 1;
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
.task_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>