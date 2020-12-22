<template>
  <div>
    <el-row>
      <el-col
        :span="24"
        style="margin-bottom: 20px; display: flex; justify-content: flex-end"
      >
        <el-button type="success" @click="orderDialog = true">筛选</el-button>
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
      <el-table-column width="100" align="center" label="订单ID">
        <template slot-scope="scope">
          <div class="y_item">
            <span v-if="scope.row.book_at" class="y_tip">预</span>
            <span>{{ scope.row.id }}</span>
          </div>
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

      <el-table-column width="140" align="center" label="手机号码">
        <template slot-scope="scope">
          <span>{{ scope.row.customer_mobile }}</span>
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

      <el-table-column width="100" align="center" label="单价">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.package_data" :key="index">
            {{ item.sale_price }}
          </p>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="应付总价">
        <template slot-scope="scope">
          <span>{{ scope.row.total_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="优惠">
        <template slot-scope="scope">
          <span>{{ scope.row.favourable_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="实付单价">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.package_data" :key="index">
            {{ item.discount_price }}
          </p>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="实付总价">
        <template slot-scope="scope">
          <span>{{ scope.row.real_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="预约日期">
        <template slot-scope="scope">
          <span>{{ scope.row.book_at ? scope.row.book_at : "无" }}</span>
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
    <el-dialog title="订单筛选" :visible.sync="orderDialog">
      <el-form label-width="80px">
        <el-form-item label="订单状态">
          <el-checkbox-group v-model="listData.order_status">
            <el-checkbox
              v-for="item in orderStatusList"
              :key="item.type"
              :label="item.type"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="取餐时间">
          <el-date-picker
            v-model="take_at_date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          <!-- <el-date-picker
            v-model="listData.take_at_start"
            type="date"
            placeholder="开始日期"
            :picker-options="startDatePicker"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          <el-date-picker
            style="margin-left: 30px"
            v-model="listData.take_at_end"
            type="date"
            placeholder="结束日期"
            :picker-options="endDatePicker"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker> -->
        </el-form-item>
        <!-- <el-form-item label="用餐时段">
          <el-checkbox-group v-model="listData.order_status">
            <el-checkbox
              v-for="item in orderStatusList"
              :key="item.type"
              :label="item.type"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item> -->
        <el-form-item label="下单时间">
          <el-date-picker
            v-model="created_at_date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['', '23:59:59']"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="优惠">
          <el-radio v-model="listData.has_favourable" label="">全部</el-radio>
          <el-radio v-model="listData.has_favourable" :label="1">有</el-radio>
          <el-radio v-model="listData.has_favourable" :label="2">无</el-radio>
          <el-form-item v-show="listData.has_favourable == 1">
            <el-checkbox-group v-model="listData.discounts">
              <el-checkbox
                v-for="item in discountsList"
                :key="item.type"
                :label="item.type"
                >{{ item.name }}</el-checkbox
              >
              <!-- <el-form-item label-width="100px" label="优惠金额区间">
                <div style="display: flex">
                  <el-input
                    v-model="listData.discount_price_start"
                    style="margin-right: 15px"
                  ></el-input>
                  至
                  <el-input
                    v-model="listData.discount_price_end"
                    style="margin: 0 15px"
                  ></el-input>
                  元
                </div>
              </el-form-item> -->
            </el-checkbox-group>
          </el-form-item>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button type="danger" @click="clearSearch">清 空</el-button> -->
        <el-button type="primary" @click="searchBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { orderList } from "@/api/basic";
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
        export: "",
        order_status: [],
        has_favourable: "",
        discounts: [],
        discount_price_start: "",
        discount_price_end: "",
        take_at_start: "",
        take_at_end: "",
        created_at_start: "",
        created_at_end: "",
      },
      take_at_date:"",
      created_at_date: "",
      // startDatePicker: this.beginDate(),
      // endDatePicker: this.processDate(),
      orderStatusList: [
        { name: "未付款", type: 0 },
        { name: "待取餐", type: 1 },
        { name: "部分取餐", type: 2 },
        { name: "已完成", type: 3 },
        { name: "申请退款", type: 4 },
        { name: "驳回退款", type: 6 },
        { name: "退款成功", type: 5 },
      ],
      discountsList: [
        { name: "折扣", type: 1 },
        { name: "满减", type: 2 },
        { name: "优惠卷", type: 3 },
        { name: "红包", type: 4 },
      ],
      loading: false,
      total: 0,
      orderDialog: false,
    };
  },
  watch: {
    take_at_date(val) {
      this.listData.take_at_start = val[0];
      this.listData.take_at_end = val[1];
    },
    created_at_date(val) {
      this.listData.created_at_start = val[0];
      this.listData.created_at_end = val[1];
    },
    "listData.has_favourable"(val){
      if (val == 2){
        this.listData.discounts = [];
        this.listData.discount_price_start = "";
        this.listData.discount_price_end = "";
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    // beginDate() {
    //   const self = this;
    //   return {
    //     disabledDate(time) {
    //       let endTime = self.listData.take_at_end;
    //       if (endTime) {
    //         return time.getTime() > new Date(endTime).getTime();
    //       }
    //     },
    //   };
    // },
    // processDate() {
    //   const self = this;
    //   return {
    //     disabledDate(time) {
    //       let startTime = self.listData.take_at_start;
    //       if (startTime) {
    //         return time.getTime() < new Date(startTime).getTime();
    //       }
    //     },
    //   };
    // },
    searchBtn() {
      this.page = 1;
      this.getList();
      this.orderDialog = false;
    },
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
  },
};
</script>
<style scoped>
.y_item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.y_tip {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background-color: sandybrown;
  color: #fff;
  margin-right: 10px;
}
</style>