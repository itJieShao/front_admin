<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input placeholder="请输入搜索内容"></el-input>
      </el-col>
      <el-col :span="10">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-col>
      <el-col :span="4" style="display:flex;justify-content: flex-end;">
        <el-button type="success" icon="el-icon-plus" @click="addMeal"
          >新增单品</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column
        v-loading="loading"
        align="center"
        label="单品ID"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="单品名称">
        <template slot-scope="scope">
          <img :src="scope.row.main_image" alt="">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="分类">
        <template slot-scope="scope">
          <span>{{ scope.row.package_label_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="包装规格">
        <template slot-scope="scope">
          <span>{{ scope.row.sale_price }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="味型">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="温度曲线">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="材料">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="调料">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="成本预警价">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="基础成本价">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="毛利率">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="供应商">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="厨师">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goDetail">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { productList } from "@/api/basic";

export default {
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
      productList(this.listData).then(res => {
        console.log(res)
        this.list = res.list;
        this.loading = false
      });
    },
  },
};
</script>


