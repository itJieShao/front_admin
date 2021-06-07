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
        <el-button @click="searchBtn" type="primary" icon="el-icon-search"
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
      <el-table-column width="100" align="center" label="单品ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="单品图片">
        <template slot-scope="scope">
          <img
            style="width: 100px; height: 100px"
            :src="scope.row.image"
            alt=""
          />
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="单品名称">
        <template slot-scope="scope">
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

      <el-table-column width="180" align="center" label="餐盒">
        <template slot-scope="scope">
          <img
            style="width: 100px; height: 100px"
            :src="scope.row.box_image"
            alt=""
          />
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="味型">
        <template slot-scope="scope">
          <span>{{ scope.row.taste_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="温度曲线">
        <template slot-scope="scope">
          <span>{{ scope.row.temperature_curve }}段</span>
        </template>
      </el-table-column>

      <el-table-column width="80" align="center" label="材料">
        <template slot-scope="scope">
          <span>{{ scope.row.material_species }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80" align="center" label="调料">
        <template slot-scope="scope">
          <span>{{ scope.row.seasoning_species }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="成本预警价">
        <template slot-scope="scope">
          <span>{{ scope.row.warn_cost_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="基础成本价">
        <template slot-scope="scope">
          <span>{{ scope.row.cost_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80" align="center" label="毛利率">
        <template slot-scope="scope">
          <span>{{ scope.row.profit_rate }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="供应商">
        <template slot-scope="scope">
          <span>{{ scope.row.supplier_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="厨师">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="120"
        class-name="status-col"
        align="center"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="240" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status ? 'danger' : 'success'"
            size="mini"
            @click="updateStatus(scope.row.id, scope.row.status, scope.$index)"
            >{{ scope.row.status ? "禁用" : "启用" }}</el-button
          >
          <el-button size="mini" @click="goEdit(scope.row.id)">编辑</el-button>
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
import { productList, productUpdateStatus } from "@/api/basic";
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
    goDetail(id) {
      this.$router.push(`/basic/goods/preinstall_item_detail?id=${id}`);
    },
    getList() {
      this.loading = true;
      productList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    searchBtn(){
      this.listData.page = 1;
      this.getList();
    },
    updateStatus(product_id, status, index) {
      productUpdateStatus({
        product_id,
        status: status ? 0 : 1,
      }).then((res) => {
        if (res) {
          this.list[index].status = status ? 0 : 1;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
  },
};
</script>


