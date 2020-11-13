<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.keyword"
          placeholder="请输入发票抬头搜索"
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
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="订单ID">
        <template slot-scope="scope">
          <span>{{ scope.row.order_nos }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.customer_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开票金额">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开票类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type == 1 ? "个人" : "企业" }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="抬头">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="税号">
        <template slot-scope="scope">
          <span>{{ scope.row.company_code }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="开票公司">
        <template slot-scope="scope">
          <span>{{ scope.row.company_bank }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" label="开票时间">
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
      </el-table-column> -->

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status" type="success" effect="dark">
            已开票
          </el-tag>
          <el-tag v-else type="danger" effect="dark"> 未开票 </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="goDetail(scope.row.id)" size="mini"
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
import { invoiceList } from "@/api/finance/invoice";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 10,
        keyword: "",
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
    goDetail(invoice_id) {
      this.$router.push(`/finance/invoice_detail?invoice_id=${invoice_id}`);
    },
    getList() {
      this.loading = true;
      invoiceList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
  },
};
</script>
