<template>
  <el-table v-loading="loading" :data="list" style="width: 100%">
    <el-table-column align="center" label="套餐ID">
      <template slot-scope="scope">
        <span>{{ scope.row.vendor_package_id }}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="套餐名称">
      <template slot-scope="scope">
        <span>{{ scope.row.vendor_package_name }}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="标签">
      <template slot-scope="scope">
        <span>{{ scope.row.label_name }}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="上次进货价">
      <template slot-scope="scope">
        <span>{{ scope.row.last_purchase_price }}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="销量">
      <template slot-scope="scope">
        <p>今天：{{ scope.row.today_sales }}</p>
        <p>本周：{{ scope.row.this_week_sales }}</p>
        <p>本月：{{ scope.row.this_month_sales }}</p>
      </template>
    </el-table-column>
    <el-table-column align="center" label="预订数量">
      <template slot-scope="scope">
        <span>{{ scope.row.book_qty }}</span>
      </template>
    </el-table-column>
    <el-table-column width="200" align="center" label="采购数量">
      <template slot-scope="scope">
        <el-input-number v-model="scope.row.num" @change="changeNum(scope.row.vendor_package_id,scope.row.num)" :min="0"></el-input-number>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { vendorPackageList } from "@/api/warehouse";
export default {
  props: ['vendor_id','saled_at'],
  data() {
    return {
      list: [],
      loading: false,
    };
  },
  watch: {
    "vendor_id"() {
      if (this.saled_at) {
        this.getVendorPackageList();
      }
    },
    "saled_at"(val) {
      if (this.vendor_id && val) {
        this.getVendorPackageList();
      }
    },
  },
  created() {
    this.getVendorPackageList();
  },
  methods: {
    changeNum(id,num){
      if (num){
        this.$emit('addPurchaseData',{vendor_package_id:id,num})
      }
    },
    getVendorPackageList() {
      this.loading = true;
      vendorPackageList({vendor_id:this.vendor_id,saled_at:this.saled_at}).then((res) => {
        if (res){
          res.forEach((item) => (item.num = 0));
        }
        this.loading = false;
        this.list = res
      });
    },
  },
};
</script>

