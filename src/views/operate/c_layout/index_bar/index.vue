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
      <el-table-column align="center" label="图片ID">
        <template slot-scope="scope">
          <span>{{ scope.row.package_id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="轮播排序">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="图片缩略图">
        <template slot-scope="scope">
          <span>{{ scope.row.package_label_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="链接地址">
        <template slot-scope="scope">
          <span>{{ scope.row.sale_price }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goEdit(scope.row.package_id)"
            >编辑</el-button
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
import { indexBarList } from "@/api/operate/c_layout/index_bar";
export default {
  data() {
    return {
      list: [],
      loading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    addMeal() {
      this.$router.push("/operate/c_layout/store_notice/add");
    },
    goEdit(package_id) {
      this.$router.push(
        `/operate/c_layout/store_notice/edit?package_id=${package_id}`
      );
    },
    goDetail(package_id) {
      this.$router.push(
        `/basic/goods/preinstall_meal_detail?package_id=${package_id}`
      );
    },
    getList() {
      this.loading = true;
      indexBarList().then((res) => {
        this.list = res.list;
        this.loading = false;
      });
    },
  },
};
</script>