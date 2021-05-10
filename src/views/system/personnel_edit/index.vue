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
    <el-table :data="list" style="width: 100%">
      <el-table-column align="center" label="门店">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="QC人员">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.good_id"
            filterable
            clearable
            placeholder="请选择检测人员"
          >
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.id"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" label="配送人员">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.good_id"
            filterable
            clearable
            placeholder="请选择配送人员"
          >
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.id"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listData.page"
      :limit.sync="listData.page_size"
      @pagination="getVendorList"
    />
    <el-row type="flex" class="row-bg" justify="end" style="margin-top: 20px">
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import { vendorList } from "@/api/store";
import { changeEmployee } from "@/api/system/personnel_edit";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 10,
        condition: "",
      },
      loading: false,
      total: 0,
    };
  },
  components: { Pagination },
  created() {
    this.getVendorList();
  },
  methods: {
    searchBtn() {
      this.listData.page = 1;
      this.getVendorList();
    },
    getVendorList() {
      vendorList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    onSubmit() {},
  },
};
</script>

<style>
</style>