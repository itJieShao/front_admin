<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
    
    </el-row>
    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column width="180" align="center" label="进货汇总ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="售卖时间">
        <template slot-scope="scope">
          <span>{{ scope.row.saled_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="进货门店">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" align="center" label="采购单品">
        <template slot-scope="scope">
          <span>{{ scope.row.product_species }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" align="center" label="总份数">
        <template slot-scope="scope">
          <span>{{ scope.row.product_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="预估总金额">
        <template slot-scope="scope">
          <span>{{ scope.row.purchase_price_total }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="汇总人">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="汇总时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="审核时间">
        <template slot-scope="scope">
          <span>{{ scope.row.audit_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="审核状态">
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
import { purchaseTotalList } from "@/api/warehouse";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 10
      },
      loading: false,
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    goDetail(purchase_total_id) {
      this.$router.push(`/warehouse/purchase/summary_detail?purchase_total_id=${purchase_total_id}`);
    },
    addPurchase() {
      this.$router.push("/warehouse/purchase/purchase_add");
    },
    getList() {
      this.loading = true;
      purchaseTotalList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header_content {
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
}
</style>

