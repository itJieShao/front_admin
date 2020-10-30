<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.condition"
          placeholder="请输入门店名称搜索"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="getList" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="addStore"
          >新增门店</el-button
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
      <el-table-column align="center" label="门店ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="门店名称">
        <template slot-scope="scope">
          <img :src="scope.row.main_image" alt="" />
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="省市">
        <template slot-scope="scope">
          <span>{{ scope.row.province_name }}{{ scope.row.city_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="详情地址">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="运营管理人员">
        <template slot-scope="scope">
          <span>{{ scope.row.admin_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="联系电话">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="营业天数">
        <template slot-scope="scope">
          <span>{{ scope.row.business_days }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="营业时间">
        <template slot-scope="scope">
          <span
            >{{ scope.row.business_time_start }}至{{
              scope.row.business_time_end
            }}</span
          >
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="设备">
        <template slot-scope="scope">
          <el-tag type="success" effect="dark">
            {{ scope.row.device_count }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="店员">
        <template slot-scope="scope">
          <span>{{ scope.row.employee_count }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开店时间">
        <template slot-scope="scope">
          <span>{{ scope.row.business_time_start }}</span>
        </template>
      </el-table-column>

      <el-table-column width="250" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" @click="goDetail(scope.row.id)"
            >详情</el-button
          >
          <el-button
            :type="scope.row.status == 0 ? 'danger' : 'success'"
            size="mini"
            @click="updateStatus(scope.row.id, scope.row.status)"
            >{{ scope.row.status == 0 ? "禁用" : "启用" }}</el-button
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
import { vendorList,vendorUpdateStatus } from "@/api/store";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      list: null,
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
    this.getList();
  },
  methods: {
    addStore() {
      this.$router.push("/store/store_add");
    },
    goEdit(id) {
      this.$router.push(`/store/store_edit?vendor_id=${id}`);
    },
    goDetail(id) {
      this.$router.push(`/store/store_detail?vendor_id=${id}`);
    },
    updateStatus(vendor_id, status) {
      vendorUpdateStatus({
        vendor_id,
        type: status == 1 ? 2 : 1,
      }).then((res) => {
        this.list.find((item) => item.id == vendor_id).status = status == 1 ? 0 : 1;
        this.$notify({
          title: "成功",
          message: "操作成功",
          type: "success",
          duration: 1500,
        });
      });
    },
    getList() {
      this.loading = true;
      vendorList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
  },
};
</script>
