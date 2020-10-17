<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-select
          style="width: 100%"
          v-model="listData.vendor_ids"
          filterable
          multiple
          placeholder="请选择门店"
        >
          <el-option
            v-for="item in storeList"
            :key="item.vendor_id"
            :label="item.vendor_name"
            :value="item.vendor_id"
          >
          </el-option>
        </el-select>
      </el-col>
      <!-- <el-col :span="10">
        <el-input placeholder="请输入搜索内容"></el-input>
      </el-col> -->
      <el-col :span="4">
        <el-button @click="getList" type="primary" icon="el-icon-search"
          >搜索</el-button
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
      <el-table-column align="center" label="订单ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" align="center" label="门店">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户">
        <template slot-scope="scope">
          <span>{{ scope.row.customer_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="250" align="center" label="商品名称">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.package_data" :key="index">
            {{ item.vendor_package_name }}
          </p>
        </template>
      </el-table-column>

      <el-table-column align="center" label="份数">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.package_data" :key="index">
            {{ item.vendor_package_num }}
          </p>
        </template>
      </el-table-column>

      <el-table-column align="center" label="总份数">
        <template slot-scope="scope">
          <span>{{ scope.row.total_package_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="单价">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.package_data" :key="index">
            {{ item.sale_price }}
          </p>
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
          <p v-for="(item, index) in scope.row.package_data" :key="index">
            {{ item.discount_price }}
          </p>
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
        <template slot-scope="scope">
          <span v-if="scope.row.order_status == -2">报损取消</span>
          <span v-else-if="scope.row.order_status == -1">已取消</span>
          <span v-else-if="scope.row.order_status == 0">待支付</span>
          <span v-else-if="scope.row.order_status == 1">待取餐</span>
          <span v-else-if="scope.row.order_status == 2">取餐中</span>
          <span v-else-if="scope.row.order_status == 3">已取餐</span>
          <span v-else-if="scope.row.order_status == 4">售后中</span>
          <span v-else>已退款</span>
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
    <!-- <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane v-for="(item,index) in storeList" :label="item.vendor_name">
        <el-table
          v-loading="loading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column align="center" label="订单ID">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column width="150" align="center" label="门店">
            <template slot-scope="scope">
              <span>{{ scope.row.vendor_name }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="用户">
            <template slot-scope="scope">
              <span>{{ scope.row.customer_name }}</span>
            </template>
          </el-table-column>

          <el-table-column width="250" align="center" label="商品名称">
            <template slot-scope="scope">
              <p v-for="(item, index) in scope.row.package_data" :key="index">
                {{ item.vendor_package_name }}
              </p>
            </template>
          </el-table-column>

          <el-table-column align="center" label="份数">
            <template slot-scope="scope">
              <p v-for="(item, index) in scope.row.package_data" :key="index">
                {{ item.vendor_package_num }}
              </p>
            </template>
          </el-table-column>

          <el-table-column align="center" label="总份数">
            <template slot-scope="scope">
              <span>{{ scope.row.total_package_num }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="单价">
            <template slot-scope="scope">
              <p v-for="(item, index) in scope.row.package_data" :key="index">
                {{ item.sale_price }}
              </p>
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
              <p v-for="(item, index) in scope.row.package_data" :key="index">
                {{ item.discount_price }}
              </p>
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

          <el-table-column
            class-name="status-col"
            align="center"
            label="订单状态"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.order_status == -2">报损取消</span>
              <span v-else-if="scope.row.order_status == -1">已取消</span>
              <span v-else-if="scope.row.order_status == 0">待支付</span>
              <span v-else-if="scope.row.order_status == 1">待取餐</span>
              <span v-else-if="scope.row.order_status == 2">取餐中</span>
              <span v-else-if="scope.row.order_status == 3">已取餐</span>
              <span v-else-if="scope.row.order_status == 4">售后中</span>
              <span v-else>已退款</span>
            </template>
          </el-table-column>

          <el-table-column
            width="180"
            fixed="right"
            align="center"
            label="操作"
          >
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
      </el-tab-pane>  
    </el-tabs> -->
  </div>
</template>

<script>
import { orderList, searchStoreList } from "@/api/basic";
import Pagination from "@/components/Pagination";

export default {
  name: "order",
  components: { Pagination },
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 10,
        vendor_ids: [],
        export: "",
      },
      storeList: [],
      storeListData: {
        condition: "",
        page: 1,
        page_size: 10,
      },
      loading: false,
      total: 0,
    };
  },
  created() {
    this.getList();
    this.getStoreList();
  },
  methods: {
    tabClick() {},
    goDetail(order_id) {
      this.$router.push(`/basic/order_detail?order_id=${order_id}`);
    },
    getList() {
      this.loading = true;
      orderList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    getStoreList() {
      searchStoreList().then((res) => {
        this.storeList = res;
      });
    },
  },
};
</script>


