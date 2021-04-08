<template>
  <div class="app-container">
    <el-tabs v-model="tabActive" style="margin-top: 15px" type="border-card">
      <el-tab-pane
        v-for="item in storeList"
        :key="item.vendor_id"
        :label="item.vendor_name"
        :name="item.vendor_id"
      >
        <tab-pane
          ref="table"
          v-if="tabActive == item.vendor_id"
          :vendor_id="item.vendor_id"
          :vendor_name="item.vendor_name"
          :vendor_ids="[item.vendor_id]"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { searchStoreList } from "@/api/basic";
import TabPane from "./components/TabPane";
export default {
  components: { TabPane },
  data() {
    return {
      storeList: [],
      tabActive: "",
    };
  },
  async created() {
    await this.getStoreList();
  },
  methods: {
    //获取店铺列表
    getStoreList() {
      return searchStoreList().then((res) => {
        res.forEach((item) => (item.vendor_id = item.vendor_id.toString()));
        this.tabActive = res[0].vendor_id;
        this.storeList = res;
      });
    },
  },
};
</script>
