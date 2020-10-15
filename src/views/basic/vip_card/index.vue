<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input placeholder="请输入搜索内容"></el-input>
      </el-col>
      <el-col :span="10">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="addMeal"
          >新增套餐</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column
        v-loading="loading"
        align="center"
        label="套餐ID"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="套餐名称">
        <template slot-scope="scope">
          <img :src="scope.row.main_image" alt="" />
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="标签">
        <template slot-scope="scope">
          <span>{{ scope.row.package_label_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="建议销售价">
        <template slot-scope="scope">
          <span>{{ scope.row.sale_price }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="厨师">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goDetail">详情</el-button>
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
import { memberCardList } from "@/api/basic";
import Pagination from "@/components/Pagination";
export default {
  name:'preinstall_meal',
  components: { Pagination },
  data() {
    return {
      list: null,
      listData: {
        page: 1,
        page_size: 10,
        vendor_id: "",
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
    goDetail() {
      this.$router.push("/basic/goods/preinstall_meal_detail");
    },
    getList() {
      this.loading = true;
      memberCardList(this.listData).then((res) => {
        this.list = res.list;
        this.total = res.count
        this.loading = false;
      });
    },
  },
};
</script>


