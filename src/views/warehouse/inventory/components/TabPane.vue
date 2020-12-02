<template>
  <div>
    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column width="200" align="center" label="盘货ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="盘货日期">
        <template slot-scope="scope">
          <span>{{ scope.row.inventory_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="门店">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="运营管理人员">
        <template slot-scope="scope">
          <span>{{ scope.row.operating_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="单品">
        <template slot-scope="scope">
          <span>{{ scope.row.product_species }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="入库总份数">
        <template slot-scope="scope">
          <span>{{ scope.row.qty }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="销售总份数">
        <template slot-scope="scope">
          <span>{{ scope.row.sale_qty }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="应存库存">
        <template slot-scope="scope">
          <span>{{ scope.row.stock_qty }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="实际库存">
        <template slot-scope="scope">
          <span>{{ scope.row.real_qty }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="盘货差额">
        <template slot-scope="scope">
          <span>{{ scope.row.diff_qty }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="盘货店员">
        <template slot-scope="scope">
          <span>{{ scope.row.inventory_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="配货时间">
        <template slot-scope="scope">
          <span>{{ scope.row.inventory_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="配货状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" type="warning" effect="dark">待分配</el-tag>
          <el-tag v-else-if="scope.row.status == 1 && scope.row.diff_qty == 0" type="success" effect="dark">库存一致</el-tag>
          <el-tag v-else-if="scope.row.status == 1 && scope.row.diff_qty > 0" effect="dark">库存增加</el-tag>
          <el-tag v-else type="danger" effect="dark">库存减少</el-tag>
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
import { inventoryList } from "@/api/warehouse";
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
        vendor_ids: this.vendor_ids,
      },
      loading: false,
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    goDetail(inventory_id) {
      this.$router.push(
        `/warehouse/inventory_detail?inventory_id=${inventory_id}`
      );
    },
    getList() {
      this.loading = true;
      inventoryList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
  },
};
</script>

