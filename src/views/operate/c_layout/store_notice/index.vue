<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="24" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="addMeal"
          >新增</el-button
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
      <el-table-column align="center" width="200" label="门店名称">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="180" label="优惠促销公告条数">
        <template slot-scope="scope">
          <span>{{ scope.row.content_data.length }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="发布时间">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作人员">
        <template slot-scope="scope">
          <span>{{ scope.row.admin_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goEdit(scope.row.id)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { storeNoticeList } from "@/api/operate/c_layout/store_notice";
export default {
  data() {
    return {
      list: [],
      loading: false,
      type:1
    };
  },
  created() {
    this.getList();
  },
  methods: {
    addMeal() {
      this.$router.push("/operate/c_layout/store_notice/add");
    },
    goEdit(id) {
      this.$router.push(
        `/operate/c_layout/store_notice/edit?id=${id}`
      );
    },
    getList() {
      this.loading = true;
      storeNoticeList().then((res) => {
        this.list = res;
        this.loading = false;
      });
    },
  },
};
</script>