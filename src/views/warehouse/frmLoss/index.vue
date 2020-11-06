<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-select
          style="width: 100%"
          v-model="vendor_ids"
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
      <el-col :span="4">
        <el-button @click="addTab" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
    </el-row>
    <el-tabs v-model="tabActive" style="margin-top: 15px" type="border-card">
      <el-tab-pane
        v-for="item in storeList"
        :key="item.vendor_id"
        :label="item.vendor_name"
        :name="item.vendor_id"
      >
        <keep-alive>
          <tab-pane
            v-if="tabActive == item.vendor_id"
            :vendor_ids="
              Array.isArray(item.vendor_id) ? item.vendor_id : [item.vendor_id]
            "
          />
        </keep-alive>
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
      vendor_ids: "",
    };
  },
  created() {
    this.getStoreList();
  },
  methods: {
    getStoreList() {
      searchStoreList().then((res) => {
        res.forEach(item => item.vendor_id = item.vendor_id.toString());
        this.tabActive = res[0].vendor_id;
        this.storeList = res;
      });
    },
    addTab() {
      let {vendor_ids,storeList} = this;
      let index =storeList.findIndex(item => item.vendor_id == vendor_ids);
      if (vendor_ids.length > 0 && index == -1) {
        let vendor_name = "";
        storeList.forEach((item) => {
          vendor_ids.forEach((it) => {
            if (item.vendor_id == it) {
              vendor_name += item.vendor_name + ",";
            }
          });
        });
        this.storeList.push({
          vendor_id: vendor_ids,
          vendor_name: vendor_name.substring(0, vendor_name.length - 1),
        });
      }
    },
  },
};
</script>


