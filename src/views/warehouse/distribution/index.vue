<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input placeholder="请输入搜索内容"></el-input>
      </el-col>
      <el-col :span="10">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column
        
        align="center"
        label="配货ID"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="售卖时间">
        <template slot-scope="scope">
          <span>{{ scope.row.saled_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="门店">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" align="center" label="运营管理人员">
        <template slot-scope="scope">
          <span>{{ scope.row.operating_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" align="center" label="应配单品">
        <template slot-scope="scope">
          <span>{{ scope.row.product_species }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" align="center" label="应配总份数">
        <template slot-scope="scope">
          <span>{{ scope.row.product_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="供应商">
        <template slot-scope="scope">
          <span>{{ scope.row.supplier_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="取货时间">
        <template slot-scope="scope">
          <span>{{ scope.row.take_at }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="150" align="center" label="货运汽车">
        <template slot-scope="scope">
          <span>{{ scope.row.real_purchase_price_total }}</span>
        </template>
      </el-table-column> -->

      <el-table-column width="150" align="center" label="配货员">
        <template slot-scope="scope">
          <span>{{ scope.row.distribution_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="配货时间">
        <template slot-scope="scope">
          <span>{{ scope.row.distribution_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" class-name="status-col" align="center" label="配货状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goDetail(scope.row.id)">详情</el-button>
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
import { distributionList } from "@/api/warehouse";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 10,
        vendor_id: ""
      },
      loading: false,
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    goDetail(distribution_id) {
      this.$router.push(`/warehouse/distribution_detail?distribution_id=${distribution_id}`);
    },
    getList() {
      this.loading = true;
      distributionList(this.listData).then(res => {
        this.total = res.count;
        this.list = res.list
        this.loading = false
      })
    },
  },
};
</script>

