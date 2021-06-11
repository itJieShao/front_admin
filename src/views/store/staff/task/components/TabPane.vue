<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-select
          style="width: 100%"
          v-model="listData.vendor_ids"
          filterable
          multiple
          placeholder="请选择门店"
        >
          <el-option
            v-for="item in storeList"
            :key="item.vendor_id"
            :label="item.vendor_name"
            :value="item.vendor_id"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button @click="searchBtn" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="10" style="display: flex; justify-content: flex-end">
        <el-button @click="goTaskTemplate" type="success" icon="el-icon-plus"
          >任务模板</el-button
        >
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column width="140" align="center" label="任务记录ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="员工名称">
        <template slot-scope="scope">
          <span>{{ scope.row.employee_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="门店">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="任务日期">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="任务数量">
        <template slot-scope="scope">
          <span>{{ scope.row.task_qty }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="200" align="center" label="实际完成时间">
        <template slot-scope="scope">
          <span>{{ scope.row.end_time }}</span>
        </template>
      </el-table-column> -->

      <el-table-column width="200" align="center" label="完成情况">
        <template slot-scope="scope">
          <el-tag effect="dark" type="success" v-if="scope.row.status == 1"
            >已完成</el-tag
          >
          <el-tag effect="dark" type="danger" v-else>未完成</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="180" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goDetail(scope.row.id)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listData.page"
      :limit.sync="listData.page_size"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { searchStoreList } from "@/api/basic";
import { vendorTaskList } from "@/api/store";
import Pagination from "@/components/Pagination";
export default {
  // props: {
  //   vendor_ids: {
  //     type: Array,
  //     default: [],
  //   },
  // },
  components: { Pagination },
  data() {
    return {
      list: [],
      storeList:[],
      listData: {
        page: 1,
        page_size: 10,
        vendor_ids: [],
      },
      loading: false,
      total: 0,
    };
  },
  created() {
    if (this.$store.state.app.fromPath.indexOf(this.$route.path) != -1) {
      if (this.$store.state.app.pageInfo) {
        this.listData = this.$store.state.app.pageInfo;
      }
    } else {
      this.$store.commit("app/removePageInfo");
    }
    this.getList();
    this.getStoreList();
  },
  destroyed() {
    this.$store.commit("app/setPageInfo", this.listData);
  },
  methods: {
    getStoreList() {
      searchStoreList().then((res) => {
        this.storeList = res;
      });
    },
    goTaskTemplate() {
      this.$router.push("/store/staff/task_template");
    },
    searchBtn() {
      this.listData.page = 1;
      this.getList();
    },
    getStoreList() {
      searchStoreList().then((res) => {
        this.storeList = res;
      });
    },
    goDetail(id) {
      this.$router.push(`/store/staff/staff_task_detail?id=${id}`);
    },
    getList() {
      this.loading = true;
      let aData = JSON.parse(JSON.stringify(this.listData));
      aData.vendor_ids = JSON.stringify(aData.vendor_ids);
      vendorTaskList(aData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
  },
};
</script>

