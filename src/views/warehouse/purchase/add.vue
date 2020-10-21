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
            value-format="yyyy-MM-dd"
            align="right"
            type="date"
            placeholder="请选择售卖日期"
            v-model="saled_at"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div v-show="vendor_id && saled_at">
        <p>门店套餐列表</p>
        <el-tabs v-model="active" style="margin-top: 15px" type="border-card">
          <el-tab-pane
            v-for="item in tabMapOptions"
            :key="item.key"
            :label="item.label"
            :name="item.key"
          >
            <keep-alive>
              <tab-pane
                @addPurchaseData="addPurchaseData"
                v-if="active == item.key"
                :vendor_id="vendor_id"
                :saled_at="saled_at"
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
import { addPurchase } from "@/api/warehouse";
import TabPane from "./components/TabPane";
export default {
  components: { TabPane },
  data() {
    return {
      tabMapOptions: [
        { label: "早餐", key: "1" },
        { label: "午餐", key: "2" },
        { label: "下午茶", key: "3" },
      ],
      active: "1",
      loading: false,
      purchase_data: {
        1: [],
        2: [],
        3: [],
      },
      vendor_id: "",
      saled_at: "",
      storeList: [],
    };
  },
  created() {
    this.getStoreList();
  },
  methods: {
    addPurchaseData(data) {
      let index = this.purchase_data[this.active].findIndex(
        (item) => item.vendor_package_id == data.vendor_package_id
      );
      if (index === -1) {
        this.purchase_data[this.active].push(data);
      } else {
        this.purchase_data[this.active][index] = data;
      }
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
            duration: 1500,
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