<template>
  <div class="app-container">
    <h2>设置QC/配送人员</h2>
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.condition"
          placeholder="请输入门店名称搜索"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="searchBtn" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="list" style="width: 100%">
      <el-table-column align="center" label="门店">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="QC人员">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.qc_user_id"
            filterable
            clearable
            placeholder="请选择检测人员"
          >
            <el-option
              v-if="
                (listData.page == 1 && scope.$index != 0) || listData.page != 1
              "
              value="ditto"
              label="同上"
            ></el-option>
            <el-option
              v-for="item in qcUserList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" label="配送人员">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.distribution_user_id"
            filterable
            clearable
            placeholder="请选择配送人员"
          >
            <el-option
              v-if="
                (listData.page == 1 && scope.$index != 0) || listData.page != 1
              "
              value="ditto"
              label="同上"
            ></el-option>
            <el-option
              v-for="item in distributionUserList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <!-- <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listData.page"
      :limit.sync="listData.page_size"
      @pagination="getVendorList"
    /> -->
    <el-row type="flex" class="row-bg" justify="end" style="margin-top: 20px">
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import { vendorList } from "@/api/store";
import { employeeList, changeEmployee } from "@/api/system/personnel_edit";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 999,
        condition: "",
      },
      loading: false,
      total: 0,
      qcUserList: [],
      distributionUserList: [],
      loading: false,
    };
  },
  components: { Pagination },
  created() {
    this.employeeList();
    this.getVendorList();
  },
  methods: {
    employeeList() {
      employeeList({ station_id: 3 }).then((res) => {
        this.qcUserList = res;
      });
      employeeList({ station_id: 2 }).then((res) => {
        this.distributionUserList = res;
      });
    },
    searchBtn() {
      this.listData.page = 1;
      this.getVendorList();
    },
    getVendorList() {
      this.loading = true;
      vendorList(this.listData).then((res) => {
        res.list.forEach((item) => {
          item.qc_user_id = "ditto";
          item.distribution_user_id = "ditto";
        });
        if (this.listData.page == 1) {
          res.list[0].qc_user_id = "";
          res.list[0].distribution_user_id = "";
        }
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    onSubmit() {
      let list = JSON.parse(JSON.stringify(this.list));
      let aData = [];
      list.forEach((item, index) => {
        if (item.qc_user_id == "ditto") {
          item.qc_user_id = list[index - 1].qc_user_id;
        }
        if (item.distribution_user_id == "ditto") {
          item.distribution_user_id = list[index - 1].distribution_user_id;
        }
        aData.push({
          vendor_id: item.id,
          qc_user_id: item.qc_user_id,
          distribution_user_id: item.distribution_user_id,
        });
      });
      changeEmployee({ data: JSON.stringify(aData) }).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "保存成功",
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