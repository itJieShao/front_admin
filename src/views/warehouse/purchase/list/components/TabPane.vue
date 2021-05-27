<template>
  <el-table
    v-loading="loading"
    :data="list"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
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
    <el-table-column width="200" align="center" label="采购数量">
      <template slot-scope="scope">
        <el-input-number
          v-model="scope.row.num"
          @change="changeNum(scope.row.vendor_package_id, scope.row.num)"
          :min="0"
        ></el-input-number>
      </template>
    </el-table-column>
    <el-table-column align="center" label="餐盒">
      <template slot-scope="scope">
        <div class="box_img_con" v-if="scope.row.product_box_images && scope.row.product_box_images.length">
          <img
            v-for="(item, index) in scope.row.product_box_images"
            :key="index"
            class="box_img"
            :src="item"
            alt=""
          />
        </div>
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
  </el-table>
</template>

<script>
export default {
  props: ["list", "loading"],
  methods: {
    changeNum(id, num) {
      this.$emit("addPurchaseData", { vendor_package_id: id, num });
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.in_menu) {
        return "success-row";
      }
    },
  },
};
</script>
<style>
.el-table .success-row {
  background: #f0f9eb;
}
.box_img_con {
  padding: 5px 15px;
  border: 1px solid #ddd;
}
.box_img {
  width: 50px;
  height: 50px;
  margin-left: 10px;
}
.box_img:first-child {
  margin-left: 0;
}
</style>

