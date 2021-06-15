<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="8">
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
      <el-col :span="8">
        <el-input
          v-model="listData.condition"
          placeholder="请输入搜索内容"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-button @click="searchBtn" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button type="warning" @click="orderExprotDialog = true"
          >导出订单</el-button
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

      <el-table-column width="300" align="center" label="套餐名称">
        <template slot-scope="scope">
          <p
            v-for="(item, index) in scope.row.vendor_package_names"
            :key="index"
          >
            {{ item }}
          </p>
        </template>
      </el-table-column>

      <el-table-column width="150" align="center" label="用餐时段">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.time_types" :key="index">
            {{ item.time_type_name }}
          </p>
        </template>
      </el-table-column>

      <el-table-column width="150" align="center" label="套餐状态">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.take_statuss" :key="index">
            {{ item.take_status_name }}
          </p>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="用户">
        <template slot-scope="scope">
          <span>{{ scope.row.customer_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140" align="center" label="手机号码">
        <template slot-scope="scope">
          <span>{{ scope.row.customer_mobile }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="250" align="center" label="商品名称">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.package_data" :key="index">
            {{ item.vendor_package_name }}
          </p>
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="份数">
        <template slot-scope="scope">
          <p
            v-for="(item, index) in scope.row.vendor_package_nums"
            :key="index"
          >
            {{ item }}
          </p>
        </template>
      </el-table-column>

      <el-table-column align="center" label="总份数">
        <template slot-scope="scope">
          <span>{{ scope.row.total_package_num }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="100" align="center" label="单价">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.package_data" :key="index">
            {{ item.sale_price }}
          </p>
        </template>
      </el-table-column> -->

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

      <!-- <el-table-column width="100" align="center" label="实付单价">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.package_data" :key="index">
            {{ item.discount_price }}
          </p>
        </template>
      </el-table-column> -->

      <el-table-column width="100" align="center" label="实付总价">
        <template slot-scope="scope">
          <span>{{ scope.row.real_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="240" align="center" label="取餐时间">
        <template slot-scope="scope">
          <p v-for="(item, index) in scope.row.take_ats" :key="index">
            {{ item }}
          </p>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="下单时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="120"
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

      <el-table-column width="200" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goDetail(scope.row.id)"
            >详情</el-button
          >
          <el-button
            v-if="scope.row.can_cancel"
            size="mini"
            type="danger"
            @click="cancelOrder(scope.row.id, scope.$index)"
            >取消订单</el-button
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
        <el-form-item label="订单状态" style="margin-bottom: 10px">
          <el-checkbox-group v-model="listData.order_status">
            <el-checkbox
              v-for="item in orderStatusList"
              :key="item.type"
              :label="item.type"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="套餐状态">
          <el-checkbox-group v-model="listData.take_status">
            <el-checkbox
              v-for="item in takeStatusList"
              :key="item.type"
              :label="item.type"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="取餐时间">
          <el-date-picker
            v-model="listData.take_at_date"
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
        <el-form-item label="用餐时段">
          <el-checkbox-group v-model="listData.dinner_time_ids">
            <el-checkbox
              v-for="item in timeList"
              :key="item.id"
              :label="item.id"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="下单时间">
          <el-date-picker
            v-model="listData.created_at_date"
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
    <el-dialog title="批量导出订单" :visible.sync="orderExprotDialog">
      <el-form label-width="100px">
        <el-form-item label="小程序环境">
          <el-checkbox-group v-model="exportData.env">
            <el-checkbox :label="1">一合拾盒</el-checkbox>
            <el-checkbox :label="2">盒小饭堂</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="选择门店">
          <el-select
            style="width: 100%"
            v-model="exportData.vendor_ids"
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
        </el-form-item>
        <el-form-item label="售卖日期">
          <el-date-picker
            v-model="saled_at"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-checkbox-group v-model="exportData.customer_type_ids">
            <el-checkbox
              v-for="item in userTypeList"
              :key="item.type"
              :label="item.type"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="订单类型">
          <el-checkbox-group v-model="exportData.order_type_ids">
            <el-checkbox :label="1">预约订单</el-checkbox>
            <el-checkbox :label="2">当天订单</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="有效/无效订单">
          <el-checkbox-group v-model="exportData.order_type_ids">
            <el-checkbox :label="3">有效订单</el-checkbox>
            <el-checkbox :label="4">无效订单</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="exportBtn">导出</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  orderList,
  cancelOrder,
  searchStoreList,
  exportOrder,
} from "@/api/basic";
import { getTimeTypeData } from "@/api/store";
import Pagination from "@/components/Pagination";
export default {
  // props: {
  //   vendor_ids: {
  //     type: Array,
  //     default: [],
  //   },
  // },
  components: { Pagination },
  data() {
    return {
      list: [],
      storeList: [],
      listData: {
        condition: "",
        dinner_time_ids: [],
        page: 1,
        page_size: 10,
        vendor_ids: [],
        export: "",
        order_status: [],
        take_status: [],
        has_favourable: "",
        discounts: [],
        discount_price_start: "",
        discount_price_end: "",
        take_at_date: "",
        created_at_date: "",
      },
      // startDatePicker: this.beginDate(),
      // endDatePicker: this.processDate(),
      orderStatusList: [
        { name: "未付款", type: 0 },
        { name: "待取餐", type: 1 },
        { name: "已完成", type: 3 },
        { name: "申请退款", type: 4 },
        { name: "驳回退款", type: 6 },
        { name: "退款成功", type: 5 },
        { name: "已取消", type: -1 },
      ],
      takeStatusList: [
        { name: "未取餐", type: 0 },
        { name: "已取餐", type: 1 },
      ],
      timeList: [],
      discountsList: [
        { name: "折扣", type: 1 },
        { name: "满减", type: 2 },
        { name: "优惠卷", type: 3 },
        { name: "红包", type: 4 },
      ],
      loading: false,
      total: 0,
      orderDialog: false,
      orderExprotDialog: false,
      exportData: {
        vendor_ids: [],
        customer_type_ids: [],
        order_type_ids: [],
        env: [],
        saled_at_start: "",
        saled_at_end: "",
      },
      userTypeList: [
        { type: 1, name: "普通用户" },
        { type: 2, name: "门店员工" },
        { type: 3, name: "一盒员工" },
        { type: 4, name: "园区物业" },
      ],
      saled_at:"",
    };
  },
  watch: {
    "listData.has_favourable"(val) {
      if (val == 2) {
        this.listData.discounts = [];
        this.listData.discount_price_start = "";
        this.listData.discount_price_end = "";
      }
    },
    saled_at(val) {
      if (val) {
        this.exportData.saled_at_start = val[0];
        this.exportData.saled_at_end = val[1];
      } else {
        this.exportData.saled_at_start = "";
        this.exportData.saled_at_end = "";
      }
    },
  },
  created() {
    if (this.$store.state.app.fromPath.indexOf(this.$route.path) != -1) {
      if (this.$store.state.app.pageInfo) {
        this.listData = this.$store.state.app.pageInfo;
      }
    } else {
      this.$store.commit("app/removePageInfo");
    }
    this.getList();
    this.getStoreList();
    this.getTimeTypeData();
  },
  destroyed() {
    this.$store.commit("app/setPageInfo", this.listData);
  },
  methods: {
    //导出
    exportBtn() {
      let aData = JSON.parse(JSON.stringify(this.exportData));
      aData.env = aData.env.join(",");
      aData.vendor_ids = aData.vendor_ids.join(",");
      aData.customer_type_ids = aData.customer_type_ids.join(",");
      aData.order_type_ids = aData.order_type_ids.join(",");
      const notify = this.$notify({
        title: "正在导出",
        message: "正在导出Excel表",
        position: "bottom-right",
        duration: 0,
      });
      exportOrder({
        module: "EXPORT_ORDER_DATA",
        type: 2,
        condition: aData,
      }).then((res) => {
        notify.close();
        if (res) {
          window.open(res.path);
          this.orderExprotDialog = false;
        }
      });
    },
    getStoreList() {
      searchStoreList().then((res) => {
        this.storeList = res;
      });
    },
    //取消订单
    cancelOrder(order_id, index) {
      this.$confirm("是否确定取消该订单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        cancelOrder({ order_id, type: 2 }).then((res) => {
          if (res) {
            this.$notify({
              title: "成功",
              message: "取消订单成功",
              type: "success",
              duration: 1000,
              onClose: () => {
                this.$set(this.list[index], "can_cancel", 0);
              },
            });
          }
        });
      });
    },
    getTimeTypeData() {
      getTimeTypeData().then((res) => {
        this.timeList = res;
      });
    },
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
      let aData = JSON.parse(JSON.stringify(this.listData));
      if (aData.take_at_date) {
        aData.take_at_start = aData.take_at_date[0];
        aData.take_at_end = aData.take_at_date[1];
        delete aData.take_at_date;
      }
      if (aData.created_at_date) {
        aData.created_at_start = aData.created_at_date[0];
        aData.created_at_end = aData.created_at_date[1];
        delete aData.created_at_date;
      }
      orderList(aData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
  },
};
</script>
<style scoped>
.el-checkbox {
  margin-right: 20px;
}
.el-checkbox__label {
  padding-left: 5px;
}
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