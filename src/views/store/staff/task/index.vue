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
      <el-col :span="10" style="display: flex; justify-content: flex-end">
        <el-button
          @click="dialogFormVisible = true"
          type="success"
          icon="el-icon-plus"
          >新增任务</el-button
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

    <el-dialog title="新增任务" :visible.sync="dialogFormVisible">
      <el-form label-width="80px">
        <el-form-item label="任务标题">
          <el-input v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="任务内容">
          <el-input type="textarea" :rows="10" v-model="content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTask">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { searchStoreList } from "@/api/basic";
import { vendorTaskAdd } from "@/api/store";
import TabPane from "./components/TabPane";
export default {
  name: "order",
  components: { TabPane },
  data() {
    return {
      storeList: [],
      tabActive: "",
      vendor_ids: "",
      dialogFormVisible: false,
      title: "",
      content: "",
    };
  },
  created() {
    this.getStoreList();
  },
  methods: {
    addTask(){
      let aData = {
        title:this.title,
        content:this.content
      }
      vendorTaskAdd(aData).then(res => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "提交成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.dialogFormVisible = false;
            },
          });
        }
      })
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
    },
  },
};
</script>


