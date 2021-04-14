<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="8">
        <el-input
          v-model="listData.name"
          :placeholder="`请输入单品名称搜索`"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-button @click="searchBtn" type="primary" icon="el-icon-search"
          >搜索</el-button
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

      <el-table-column width="200" align="center" label="单品图片">
        <template slot-scope="scope">
          <img style="max-width:100px;max-height:100px;" :src="scope.row.image" alt="" />
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="单品名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="餐盒">
        <template slot-scope="scope">
          <img style="max-width:100px;max-height:100px;" :src="scope.row.box_image" alt="" />
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="所属套餐">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_package_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="250" align="center" label="门店">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="250" align="center" label="标签">
        <template slot-scope="scope">
          <span>{{ scope.row.category_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="250" align="center" label="味型">
        <template slot-scope="scope">
          <span>{{ scope.row.taste_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="250" align="center" label="门店库存">
        <template slot-scope="scope">
          <span>{{ scope.row.qty }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="上次进货价">
        <template slot-scope="scope">
          <span>{{ scope.row.last_purchase_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="成本预警价">
        <template slot-scope="scope">
          <span>{{ scope.row.warn_cost_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="基础成本价">
        <template slot-scope="scope">
          <span>{{ scope.row.cost_price }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="250" align="center" label="毛利率">
        <template slot-scope="scope">
          <span>{{ scope.row.take_code }}</span>
        </template>
      </el-table-column> -->

      <el-table-column width="200" align="center" label="温度曲线">
        <template slot-scope="scope">
          <span>{{ scope.row.temperature_curve }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="材料">
        <template slot-scope="scope">
          <span>{{ scope.row.material_species }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="调料">
        <template slot-scope="scope">
          <span>{{ scope.row.seasoning_species }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="供应商">
        <template slot-scope="scope">
          <span>{{ scope.row.supplier_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="厨师">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
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
import { vendorProductList } from "@/api/basic";
import Pagination from "@/components/Pagination";
export default {
  props: {
    vendor_ids: {
      type: Array,
      default: [],
    },
  },
  components: { Pagination },
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 10,
        name:'',
        vendor_ids: this.vendor_ids,
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
    goDetail(vendor_product_id) {
      this.$router.push(`/basic/goods/store_item_detail?vendor_product_id=${vendor_product_id}`);
    },
    getList() {
      this.loading = true;
      vendorProductList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    searchBtn(){
      this.listData.page = 1;
      this.getList();
    }
  },
};
</script>

