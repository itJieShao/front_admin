<template>
  <div class="app-container">
    <h2>新增进货</h2>
    <el-card shadow="always">
      <el-form label-width="100px">
        <el-form-item label="门店">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="售卖日期">
          <el-date-picker
            align="right"
            type="date"
            placeholder="请选择售卖日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <p>门店套餐列表</p>
      <el-tabs v-model="activeName" style="margin-top: 15px" type="border-card">
        <el-tab-pane
          v-for="item in tabMapOptions"
          :key="item.key"
          :label="item.label"
          :name="item.key"
        >
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
              label="套餐ID"
              element-loading-text="请给我点时间！"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.vendor_package_id }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="套餐名称">
              <template slot-scope="scope">
                <span>{{ scope.row.vendor_package_name }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="标签">
              <template slot-scope="scope">
                <span>{{ scope.row.label_name }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="上次进货价">
              <template slot-scope="scope">
                <span>{{ scope.row.last_purchase_price }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="销量">
              <template slot-scope="scope">
                <p>{{ scope.row.today_sales }}</p>
                <p>{{ scope.row.this_week_sales }}</p>
                <p>{{ scope.row.this_month_sales }}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="预订数量">
              <template slot-scope="scope">
                <span>{{ scope.row.book_qty }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="采购数量">
              <template slot-scope="scope">
                <el-input></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-row style="margin-top:20px;" type="flex" class="row-bg" justify="end">
        
          <el-button type="primary" @click="onSubmit">生成进货单</el-button>
        
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { vendorPackageList } from "@/api/warehouse";
export default {
  data() {
    return {
      tabMapOptions: [
        { label: "早餐", key: "1" },
        { label: "午餐", key: "2" },
        { label: "下午茶", key: "3" },
      ],
      activeName: "1",
      loading: false,
      list: [],
    };
  },
  created() {
    this.getVendorPackageList();
  },
  methods: {
    getVendorPackageList() {
      vendorPackageList().then((res) => {
        console.log(res);
      });
    },
    onSubmit() {
        
    },
    pickerOptions() {},
  },
};
</script>
<style lang="scss" scoped>
p {
  margin: 0;
}
.item_title,
.item_content {
  width: 100%;
  display: flex;
  p {
    display: flex;
    justify-content: center;
    flex: 1;
  }
}
.item_title p:first-child {
  margin-left: -40px;
}
.item_title p:last-child {
  margin-left: -60px;
}
.item_content {
  margin-bottom: 20px;
  align-items: center;
}
.el-input-number {
  flex: 1;
}
.el-icon-delete {
  margin-left: 20px;
  cursor: pointer;
}
</style>