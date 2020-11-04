<template>
  <div class="app-container">
    <h2>新增进货</h2>
    <el-card shadow="always">
      <el-form label-width="100px">
        <el-form-item label="门店">
          <el-select
            style="width: 100%"
            v-model="vendor_id"
            filterable
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
            style="width: 100%"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="请选择售卖日期"
            v-model="saled_at"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div v-show="vendor_id && saled_at && list.length">
        <p>门店套餐列表</p>
        <el-tabs v-model="active" style="margin-top: 15px" type="border-card">
          <el-tab-pane
            v-for="item in list"
            :key="item.time_type"
            :label="item.time"
            :name="item.time_type"
          >
            <keep-alive>
              <tab-pane
                @addPurchaseData="addPurchaseData"
                v-if="active == item.time_type"
                :list="item.vendor_package_data"
                :loading="loading"
              />
            </keep-alive>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-row style="margin-top: 20px" type="flex" class="row-bg" justify="end">
        <el-button type="primary" @click="onSubmit">生成进货单</el-button>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { searchStoreList } from "@/api/basic";
import { addPurchase, vendorPackageList } from "@/api/warehouse";
import TabPane from "./components/TabPane";
export default {
  components: { TabPane },
  data() {
    return {
      list: [],
      loading: false,
      active: "",
      vendor_id: "",
      saled_at: "",
      storeList: [],
      purchase_data: {},
    };
  },
  watch: {
    vendor_id() {
      if (this.saled_at) {
        this.getVendorPackageList();
      }
    },
    saled_at(val) {
      if (this.vendor_id && val) {
        this.getVendorPackageList();
      }
    },
  },
  created() {
    this.getStoreList();
  },
  methods: {
    addPurchaseData(data) {
      let index = this.purchase_data[this.active].findIndex(
        (item) => item.vendor_package_id == data.vendor_package_id
      );
      if (data.num > 0) {
        if (index === -1) {
          this.purchase_data[this.active].push(data);
        } else {
          this.purchase_data[this.active][index] = data;
        }
      } else {
        this.purchase_data[this.active].splice(index, 1);
      }
    },
    getVendorPackageList() {
      this.loading = true;
      vendorPackageList({
        vendor_id: this.vendor_id,
        saled_at: this.saled_at,
      }).then((res) => {
        if (res.length === 0) {
          this.list = [];
          return this.$message({
            message: "该门店没有可进货的时段",
            type: "error",
            duration: 1000,
          });
        }
        let purchase_data = {};
        res.forEach((item) => {
          item.time_type = item.time_type.toString();
          purchase_data[item.time_type] = [];
          item.vendor_package_data.forEach((it) => {
            it.num = 0;
          });
        });
        this.purchase_data = purchase_data;
        this.active = res[0].time_type;
        this.loading = false;
        this.list = res;
      });
    },
    getStoreList() {
      searchStoreList().then((res) => {
        this.storeList = res;
      });
    },
    onSubmit() {
      let { vendor_id, saled_at, purchase_data } = this;
      let aData = {
        vendor_id,
        saled_at,
        purchase_data,
      };
      addPurchase(aData).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "提交成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.$router.go(-1);
            },
          });
        }
      });
    },
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