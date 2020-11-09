<template>
  <div>
    <el-table v-loading="loading" :data="list" border style="width: 100%">
      <el-table-column align="center" label="报损ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="报损日期">
        <template slot-scope="scope">
          <span>{{ scope.row.loss_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="报损门店">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140" align="center" label="报损人员">
        <template slot-scope="scope">
          <span>{{ scope.row.loss_use_station }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140" align="center" label="员工名称">
        <template slot-scope="scope">
          <span>{{ scope.row.loss_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="报损套餐">
        <template slot-scope="scope">
          <span>{{ scope.row.loss_vendor_package_species }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="报损套餐份数">
        <template slot-scope="scope">
          <span>{{ scope.row.loss_vendor_package_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="报损单品">
        <template slot-scope="scope">
          <span>{{ scope.row.loss_product_species }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="报损单品份数">
        <template slot-scope="scope">
          <span>{{ scope.row.loss_product_num }}</span>
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
import { lossList } from "@/api/warehouse";
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
    goDetail(loss_vendor_id) {
      this.$router.push(`/warehouse/frmloss_detail?loss_vendor_id=${loss_vendor_id}`);
    },
    getList() {
      this.loading = true;
      lossList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
  },
};
</script>

