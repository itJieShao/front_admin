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
      <!-- <el-col :span="10">
        <el-input placeholder="请输入搜索内容"></el-input>
      </el-col> -->
      <el-col :span="10">
        <el-button @click="addTab" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button type="warning" @click="exportBtn">导出 Excel</el-button>
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
            @checkedItem="handleSelectionChange"
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
import { exportExcle } from "@/api/common";
import TabPane from "./components/TabPane";
export default {
  components: { TabPane },
  data() {
    return {
      storeList: [],
      tabActive: "",
      vendor_ids: "",
      checkedList:[],
    };
  },
  created() {
    this.getStoreList();
  },
  methods: {
    getStoreList() {
      searchStoreList().then((res) => {
        this.tabActive = res[0].vendor_id;
        this.storeList = res;
      });
    },
    addTab() {
      let { vendor_ids, storeList } = this;
      let index = storeList.findIndex((item) => item.vendor_id == vendor_ids);
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
    handleSelectionChange(val){
      this.checkedList = val;
    },
    //导出
    exportBtn() {
      if (!this.checkedList.length) {
        return this.$message.error("请先选中要导出的行");
      }
      let ids = [];
      this.checkedList.forEach((item) => ids.push(item.allocation_id));
      const notify = this.$notify({
        title: "正在导出",
        message: "正在导出Excel表",
        position: "bottom-right",
        duration: 0,
      });
      exportExcle({
        module: "QC_ALLOCATION",
        type: 1,
        ids: ids.join(","),
      }).then((res) => {
        notify.close();
        if (res) {
          window.open(res.path);
        }
      });
    },
  },
};
</script>

