<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          placeholder="请输入套餐名称搜索"
          v-model="listData.name"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="getList" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="addMeal"
          >新增套餐</el-button
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
      <el-table-column align="center" label="套餐ID">
        <template slot-scope="scope">
          <span>{{ scope.row.package_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="套餐图片">
        <template slot-scope="scope">
          <img style="max-width:100px;max-height:100px;" :src="scope.row.main_image" alt="" />
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="套餐名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="标签">
        <template slot-scope="scope">
          <span>{{ scope.row.package_label_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="建议销售价">
        <template slot-scope="scope">
          <span>{{ scope.row.sale_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="厨师">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" class-name="status-col" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" width="200" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goEdit(scope.row.package_id)"
            >编辑</el-button
          >
          <el-button size="mini" @click="goDetail(scope.row.package_id)"
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
import { packageList } from "@/api/basic";
import Pagination from "@/components/Pagination";
export default {
  name: "preinstall_meal",
  components: { Pagination },
  data() {
    return {
      list: null,
      listData: {
        page: 1,
        page_size: 10,
        name: "",
        export: "",
      },
      loading: false,
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    addMeal() {
      this.$router.push("/basic/goods/preinstall_meal_add");
    },
    goEdit(package_id) {
      this.$router.push(
        `/basic/goods/preinstall_meal_edit?package_id=${package_id}`
      );
    },
    goDetail(package_id) {
      this.$router.push(`/basic/goods/preinstall_meal_detail?package_id=${package_id}`);
    },
    getList() {
      this.loading = true;
      packageList(this.listData).then((res) => {
        this.list = res.list;
        this.total = res.count;
        this.loading = false;
      });
    },
  },
};
</script>


