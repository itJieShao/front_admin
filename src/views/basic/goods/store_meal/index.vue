<template>
  <div class="app-container">
    <tab-pane />
    <!-- <el-row :gutter="10" style="margin-bottom: 20px">
      <el-col :span="3">
        <el-select
          style="width: 100%"
          v-model="status"
          filterable
          clearable
          placeholder="请选择套餐状态"
        >
          <el-option label="上架" :value="1"> </el-option>
          <el-option label="下架" :value="0"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select
          style="width: 100%"
          v-model="package_label_id"
          filterable
          clearable
          placeholder="请选择套餐标签"
        >
          <el-option
            v-for="item in labelList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-date-picker
          v-model="effective_date"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="创建开始时间"
          end-placeholder="创建结束时间"
          :default-time="['', '23:59:59']"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="4">
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
      <el-col :span="2">
        <el-button @click="addTab" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="addMeal"
          >新增套餐</el-button
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
            :key="timer"
            ref="table"
            v-if="tabActive == item.vendor_id"
            :name="name"
            :vendor_ids="
              Array.isArray(item.vendor_id) ? item.vendor_id : [item.vendor_id]
            "
            :package_label_id="package_label_id"
            :created_at_start="created_at_start"
            :created_at_end="created_at_end"
            :status="status"
          />
        </keep-alive>
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
import { searchStoreList } from "@/api/basic";
import { categoryData } from "@/api/system/category";
import TabPane from "./components/TabPane";
export default {
  name: "order",
  components: { TabPane },
  data() {
    return {
      storeList: [],
      tabActive: "",
      vendor_ids: "",
      package_label_id: "",
      created_at_start: "",
      created_at_end: "",
      status: "",
      effective_date: "",
      labelList: [],
      timer:'',
    };
  },
  created() {
    this.getStoreList();
    this.getLabelList();
  },
  methods: {
    //预设套餐标签列表
    getLabelList() {
      categoryData({ type: 1 }).then((res) => {
        this.labelList = res;
      });
    },
    addMeal() {
      this.$router.push("/basic/goods/store_meal_add");
    },
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
      this.timer = new Date().getTime();
    },
  },
};
</script>


