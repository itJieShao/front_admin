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
      <el-table-column align="center" label="门店名称">
        <template slot-scope="scope">
          <span>{{ scope.row.package_id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="优惠促销公告条数">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="发布时间">
        <template slot-scope="scope">
          <span>{{ scope.row.package_label_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作人员">
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
import { packageList } from "@/api/basic";
import Pagination from "@/components/Pagination";
export default {
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
      packageList(this.listData).then((res) => {
        this.list = res.list;
        this.total = res.count;
        this.loading = false;
      });
    },
  },
};
</script>