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
          :name="name"
          :vendor_id="item.vendor_id"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { searchStoreList } from "@/api/basic";
import TabPane from "./components/TabPane";
export default {
  name: "order",
  components: { TabPane },
  data() {
    return {
      storeList: [],
      tabActive: 0,
    };
  },
  created() {
    this.getStoreList();
  },
  methods: {
    getStoreList() {
      searchStoreList().then((res) => {
        res.unshift({vendor_id:0,vendor_name:"全部"});
        this.storeList = res;
        console.log(this.storeList)
      });
    },
  },
};
</script>