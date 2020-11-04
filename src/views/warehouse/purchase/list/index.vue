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
        <el-button type="warning" @click="addSummary">生成进货汇总</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" fixed="left" align="center" width="55">
      </el-table-column>
      <el-table-column width="100" align="center" label="进货ID">
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

      <el-table-column width="160" align="center" label="运营管理人员">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="下级审核人">
        <template slot-scope="scope">
          <span>{{ scope.row.audit_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="采购单品">
        <template slot-scope="scope">
          <span>{{ scope.row.product_species }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="总份数">
        <template slot-scope="scope">
          <span>{{ scope.row.product_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="预估总金额">
        <template slot-scope="scope">
          <span>{{ scope.row.purchase_price_total }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="实际总金额">
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
import { purchaseList,purchaseTotalAdd } from "@/api/warehouse";
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
      checkedSummaryList: [], //表格选中的项
    };
  },
  created() {
    this.getList();
  },
  methods: {
    goDetail(purchase_id) {
      this.$router.push(
        `/warehouse/purchase/purchase_detail?purchase_id=${purchase_id}`
      );
    },
    addPurchase() {
      this.$router.push("/warehouse/purchase/purchase_add");
    },
    getList() {
      this.loading = true;
      purchaseList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    handleSelectionChange(val) {
      this.checkedSummaryList = val;
    },
    //生成进货汇总
    addSummary() {
      let list = this.checkedSummaryList;
      if (list.length === 0) {
        return this.$message.error("请先选中要汇总的门店");
      }
      if (list.findIndex((item) => item.status != 1) != -1) {
        return this.$message.error('请选中状态为"审核通过"的门店');
      }
      let purchase_ids = [];
      list.forEach(item => purchase_ids.push(item.id));
      this.$confirm("是否生成进货汇总", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        purchaseTotalAdd({purchase_ids}).then(res => {
          if (res){
            console.log(res)
            this.$router.push(`/warehouse/purchase/summary_detail?purchase_total_id=${res.purchast_total_id}`)
          }
        })
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

