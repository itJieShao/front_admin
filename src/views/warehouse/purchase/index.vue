<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <!-- <el-col :span="10">
        <el-input v-model="formData." placeholder="请输入搜索内容"></el-input>
      </el-col>
      <el-col :span="10">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-col> -->
      <el-col :span="24" style="display: flex; justify-content: flex-end">
        <el-button type="success" @click="addPurchase">新增进货</el-button>
        <el-button type="warning">生成进货汇总</el-button>
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
      <el-table-column align="center" label="进货ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="售卖时间">
        <template slot-scope="scope">
          <span>{{ scope.row.saled_at }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" label="餐品时段">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_name }}</span>
        </template>
      </el-table-column> -->

      <el-table-column width="200" align="center" label="门店">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" align="center" label="运营管理人员">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" align="center" label="下级审核人">
        <template slot-scope="scope">
          <span>{{ scope.row.audit_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="采购单品">
        <template slot-scope="scope">
          <span>{{ scope.row.product_species }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="总份数">
        <template slot-scope="scope">
          <span>{{ scope.row.product_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" align="center" label="预估总金额">
        <template slot-scope="scope">
          <span>{{ scope.row.purchase_price_total }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" align="center" label="实际总金额">
        <template slot-scope="scope">
          <span>{{ scope.row.real_purchase_price_total }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="申请时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="审核时间">
        <template slot-scope="scope">
          <span>{{ scope.row.audit_at }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180"
        class-name="status-col"
        align="center"
        label="记录状态"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.status_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" fixed="right" align="center" label="操作">
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
import { purchaseList } from "@/api/warehouse";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      list: [],
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
    goDetail() {
      this.$router.push("/order/detail");
    },
    addPurchase() {
      this.$router.push("/warehouse/purchase_add");
    },
    getList() {
      this.loading = true;
      purchaseList(this.listData).then((res) => {
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

