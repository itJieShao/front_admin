<template>
  <div class="app-container">
    <div class="header_content">
      <el-select v-model="value1" filterable multiple placeholder="请选择门店">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input style="margin:0 30px;width:400px;" v-model="input" placeholder="请输入搜索内容"></el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div> 
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >

      <el-table-column
        v-loading="loading"
        align="center"
        label="订单ID"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="门店">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品名称">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户">
        <template slot-scope="scope">
          <span>{{ scope.row.customer_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="份数">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="总份数">
        <template slot-scope="scope">
          <span>{{ scope.row.total_package_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="单价">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="应付总价">
        <template slot-scope="scope">
          <span>{{ scope.row.total_price }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="优惠">
        <template slot-scope="scope">
          <span>{{ scope.row.favourable_price }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="实付单价">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="实付总价">
        <template slot-scope="scope">
          <span>{{ scope.row.real_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="下单时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="订单状态">
        <template slot-scope="{ row }">
          <el-tag :type="row.order_status_name | statusFilter">
            {{ row.order_status_name }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column width="180" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goDetail">详情</el-button> 
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from "@/api/article";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  props: {
    type: {
      type: String,
      default: "CN",
    },
  },
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        page_size: 10,
        vendor_id: "",
        export: "",
      },
      loading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    goDetail(){
      this.$router.push('/order/detail')
    },
    getList() {
      this.loading = true;
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.loading = false
      // })
      this.list = [
        {
          id: 88,
          vendor_name: "香雪店",
          customer_name: "",
          total_package_num: 2,
          total_price: 23,
          real_price: 0,
          favourable_price: 23,
          created_at: "2020-07-20 16:24:00",
          order_status_name: "已取餐",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
  .header_content{
    margin-bottom: 25px;
    display: flex;
  }
</style>

