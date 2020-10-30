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
      <el-table-column width="140" align="center" label="任务记录ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="员工名称">
        <template slot-scope="scope">
          <span>{{ scope.row.employee_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="门店">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="任务标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="规定完成时间">
        <template slot-scope="scope">
          <span>{{ scope.row.stipulate_start_time }}至{{ scope.row.stipulate_end_time }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="实际完成时间">
        <template slot-scope="scope">
          <span>{{ scope.row.end_time }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="完成情况">
        <template slot-scope="scope">
          <el-tag effect="dark" type="success" v-if="scope.row.status == 1">已完成</el-tag>
          <el-tag effect="dark" type="danger" v-else>未完成</el-tag>
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
import { vendorTaskList } from "@/api/store";
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
        vendor_ids: this.vendor_ids
      },
      loading: false,
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/store/staff/staff_task_detail?id=${id}`);
    },
    getList() {
      this.loading = true;
      vendorTaskList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
  },
};
</script>

