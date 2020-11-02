<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.name"
          placeholder="请输入角色名称搜索"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="getList" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus">新增角色</el-button>
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
      <el-table-column align="center" label="角色ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="角色名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status == 0 ? 'success' : 'danger'">{{
            scope.row.status == 0 ? "启用" : "禁用"
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
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
import { roleList, roleUpdateStatus } from "@/api/system/auth/roles";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      list: null,
      listData: {
        page: 1,
        page_size: 10,
        name: "",
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
    updateStatus(role_id, status) {
      roleUpdateStatus({
        role_id,
        type: status == 1 ? 0 : 1,
      }).then((res) => {
        this.list.find((item) => item.id == role_id).status =
          status == 1 ? 0 : 1;
        this.$notify({
          title: "成功",
          message: "操作成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    getList() {
      this.loading = true;
      roleList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
  },
};
</script>
