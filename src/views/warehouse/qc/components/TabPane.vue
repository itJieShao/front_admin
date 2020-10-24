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
      <el-table-column width="200" align="center" label="QC分配ID">
        <template slot-scope="scope">
          <span>{{ scope.row.allocation_id }}</span>
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

      <el-table-column width="130" align="center" label="运营管理人员">
        <template slot-scope="scope">
          <span>{{ scope.row.operating_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="烹饪盘数">
        <template slot-scope="scope">
          <span>{{ scope.row.plate_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="单品">
        <template slot-scope="scope">
          <span>{{ scope.row.product_species }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="应分配份数">
        <template slot-scope="scope">
          <span>{{ scope.row.product_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="实际分配份数">
        <template slot-scope="scope">
          <span>{{ scope.row.allocation_product_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="分配差额">
        <template slot-scope="scope">
          <span>{{ scope.row.diff_product_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="QC人员">
        <template slot-scope="scope">
          <span>{{ scope.row.qc_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="分配时间">
        <template slot-scope="scope">
          <span>{{ scope.row.allocation_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="配货状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" type="warning" effect="dark">待分配</el-tag>
          <el-tag v-else-if="scope.row.status == 1" type="danger" effect="dark">分配减少</el-tag>
          <el-tag v-else type="success" effect="dark">分配正常</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="180" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goDetail(scope.row.allocation_id)"
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
import { allocationList } from "@/api/warehouse";
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
    goDetail(allocation_id) {
      this.$router.push(
        `/warehouse/qc_detail?allocation_id=${allocation_id}`
      );
    },
    getList() {
      this.loading = true;
      allocationList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
  },
};
</script>

