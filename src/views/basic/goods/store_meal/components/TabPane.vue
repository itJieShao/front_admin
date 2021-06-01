<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="8">
        <el-input
          v-model="listData.name"
          :placeholder="`请输入套餐名称搜索`"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-button @click="searchBtn" type="primary" icon="el-icon-search"
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
      <el-table-column align="center" label="套餐ID">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_package_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="套餐图片">
        <template slot-scope="scope">
          <img
            style="max-width: 100px; max-height: 100px"
            :src="scope.row.main_image"
            alt=""
          />
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="套餐名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="门店">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="标签">
        <template slot-scope="scope">
          <span>{{ scope.row.package_label_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="套餐号">
        <template slot-scope="scope">
          <span>{{ scope.row.take_code }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="销量">
        <template slot-scope="scope">
          <p>昨天：{{ scope.row.yesterday_sales }}</p>
          <p>本周：{{ scope.row.this_week_sales }}</p>
          <p>本月：{{ scope.row.this_month_sales }}</p>
        </template>
      </el-table-column>

      <el-table-column width="80" align="center" label="库存">
        <template slot-scope="scope">
          <span>{{ scope.row.qty }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="进货价">
        <template slot-scope="scope">
          <span>{{ scope.row.purchase_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="销售原价">
        <template slot-scope="scope">
          <span>￥{{ scope.row.sale_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="优惠">
        <template slot-scope="scope">
          <span>{{ scope.row.coupon_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="折后价格">
        <template slot-scope="scope">
          <span>￥{{ scope.row.discount_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="上架时间">
        <template slot-scope="scope">
          <span>{{ scope.row.shelves_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="100"
        class-name="status-col"
        align="center"
        label="套餐状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status" type="success">已上架</el-tag>
          <el-tag v-else type="danger">已下架</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="240" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status ? 'danger' : 'success'"
            size="mini"
            @click="
              updateStatus(
                [scope.row.vendor_package_id],
                scope.row.status,
                scope.$index
              )
            "
            >{{ scope.row.status ? "下架" : "上架" }}</el-button
          >
          <el-button size="mini" @click="goEdit(scope.row.vendor_package_id)"
            >编辑</el-button
          >
          <el-button size="mini" @click="goDetail(scope.row.vendor_package_id)"
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
import { vendorPackageList, vendorPackageUpdateStatus } from "@/api/basic";
import Pagination from "@/components/Pagination";
export default {
  props: {
    vendor_ids: {
      type: Array,
      default: [],
    },
    name: {
      type: String,
      default: "",
    },
    package_label_id: {
      type: String,
      default: "",
    },
    created_at_start: {
      type: String,
      default: "",
    },
    created_at_end: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "",
    },
  },
  components: { Pagination },
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 10,
        name: this.name,
        vendor_ids: this.vendor_ids,
        export: "",
        package_label_id:this.package_label_id,
        created_at_start:this.created_at_start,
        created_at_end:this.created_at_end,
        status:this.status,
      },
      loading: false,
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    goEdit(vendor_package_id) {
      this.$router.push(
        `/basic/goods/store_meal_edit?vendor_package_id=${vendor_package_id}`
      );
    },
    goDetail(vendor_package_id) {
      this.$router.push(
        `/basic/goods/store_meal_detail?vendor_package_id=${vendor_package_id}`
      );
    },
    getList() {
      this.loading = true;
      let aData = JSON.parse(JSON.stringify(this.listData));
      if (aData.status === ""){
        delete aData.status
      }
      vendorPackageList(aData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    searchBtn(){
      this.listData.page = 1;
      this.getList();
    },
    updateStatus(vendor_package_ids, status, index) {
      vendorPackageUpdateStatus({
        vendor_package_ids,
        status: status ? 0 : 1,
      }).then((res) => {
        if (res) {
          this.list[index].status = status ? 0 : 1;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
  },
};
</script>

