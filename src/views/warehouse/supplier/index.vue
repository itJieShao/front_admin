<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.name"
          placeholder="请输入供应商名称搜索"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="getList" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="goAdd"
          >新增供应商</el-button
        >
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
      <el-table-column align="center" label="供应商ID">
        <template slot-scope="scope">
          <span>{{ scope.row.supplier_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="供应商名称">
        <template slot-scope="scope">
          <span>{{ scope.row.supplier_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="公司地址">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="联系人">
        <template slot-scope="scope">
          <span>{{ scope.row.contacts }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="联系电话">
        <template slot-scope="scope">
          <p v-for="(item,index) in scope.row.contact_moblie">{{item}}</p>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="历史订单">
        <template slot-scope="scope">
          <span>{{ scope.row.order_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="最近订单">
        <template slot-scope="scope">
          <span>{{ scope.row.last_order_no }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="交易总金额">
        <template slot-scope="scope">
          <span>{{ scope.row.total_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="已结金额">
        <template slot-scope="scope">
          <span>{{ scope.row.settlemented_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="代结欠款">
        <template slot-scope="scope">
          <span>{{ scope.row.settlementing_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="启用状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status ? "启用" : "禁用" }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goEdit(scope.row.supplier_id)">编辑</el-button>
          <el-button size="mini" @click="goDetail(scope.row.supplier_id)">详情</el-button>
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
import { getSupplierList } from "@/api/warehouse";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
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
  created() {
    this.getList();
  },
  methods: {
    goEdit(supplier_id) {
      this.$router.push(`/warehouse/supplier_edit?supplier_id=${supplier_id}`);
    },
    goDetail(supplier_id) {
      this.$router.push(`/warehouse/supplier_detail?supplier_id=${supplier_id}`);
    },
    goAdd() {
      this.$router.push("/warehouse/supplier_add");
    },
    getList() {
      this.loading = true;
      getSupplierList(this.listData).then((res) => {
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

