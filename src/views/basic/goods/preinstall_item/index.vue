<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.name"
          placeholder="请输入单品名称搜索"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="getList" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="addMeal"
          >新增单品</el-button
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
      <el-table-column align="center" label="单品ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="单品名称">
        <template slot-scope="scope">
          <img :src="scope.row.main_image" alt="" />
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="分类">
        <template slot-scope="scope">
          <span>{{ scope.row.category_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="包装规格">
        <template slot-scope="scope">
          <span>{{ scope.row.package_box_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="味型">
        <template slot-scope="scope">
          <span>{{ scope.row.taste_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="温度曲线">
        <template slot-scope="scope">
          <span>{{ scope.row.temperature_curve }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="材料">
        <template slot-scope="scope">
          <span>{{ scope.row.material_species }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="调料">
        <template slot-scope="scope">
          <span>{{ scope.row.seasoning_species }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="成本预警价">
        <template slot-scope="scope">
          <span>{{ scope.row.warn_cost_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="基础成本价">
        <template slot-scope="scope">
          <span>{{ scope.row.cost_price }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="毛利率">
        <template slot-scope="scope">
          <span>{{ scope.row.profit_rate }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="供应商">
        <template slot-scope="scope">
          <span>{{ scope.row.supplier_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="厨师">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goEdit(scope.row.id)">编辑</el-button>
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
import { productList } from "@/api/basic";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      list: null,
      listData: {
        page: 1,
        page_size: 10,
        vendor_id: "",
        export: "",
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
    addMeal() {
      this.$router.push("/basic/goods/preinstall_item_add");
    },
    goEdit(id) {
      this.$router.push(`/basic/goods/preinstall_item_edit?id=${id}`);
    },
    getList() {
      this.loading = true;
      productList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
  },
};
</script>


