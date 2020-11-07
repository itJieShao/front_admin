<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.name"
          placeholder="请输入搜索内容"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="getList" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="list" style="width: 100%">
      <el-table-column align="center" label="发票ID">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单ID">
        <template slot-scope="scope">
          <span>{{ scope.row.level_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.level_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开票金额">
        <template slot-scope="scope">
          <span>{{ scope.row.level_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开票类型">
        <template slot-scope="scope">
          <span>{{ scope.row.level_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="抬头">
        <template slot-scope="scope">
          <span>{{ scope.row.level_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="税号">
        <template slot-scope="scope">
          <span>{{ scope.row.level_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开票公司">
        <template slot-scope="scope">
          <span>{{ scope.row.level_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开票时间">
        <template slot-scope="scope">
          <span>{{ scope.row.level_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="发票代码">
        <template slot-scope="scope">
          <span>{{ scope.row.level_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="发票号码">
        <template slot-scope="scope">
          <span>{{ scope.row.level_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.level_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="goDetail(scope.row.id)" size="mini">详情</el-button>
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
import { auditList } from "@/api/system/examine";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 10,
        name: "",
      },
      loading: false,
      total: 0,
    };
  },
  components: { Pagination },
  created() {
    this.getList();
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/finance/invoice_detail?id=${id}`);
    },
    getList() {
      this.loading = true;
      auditList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
  },
};
</script>
