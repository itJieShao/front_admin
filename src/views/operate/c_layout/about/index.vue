<template>
  <div class="app-container">
    <h2>关于我们</h2>
    <el-tabs v-model="tabActive" style="margin-top: 15px" type="border-card">
      <el-tab-pane
        v-for="item in tabCon"
        :key="item.key"
        :label="item.name"
        :name="item.key"
      >
        <keep-alive>
          <tab-pane v-if="tabActive == item.key" :type="item.key" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from "./components/TabPane";
export default {
  components: { TabPane },
  data() {
    return {
      tabActive: "1",
      tabCon: [
        {
          key: "1",
          name: "一合拾盒小程序",
        },
        {
          key: "0",
          name: "盒小饭堂小程序",
        },
      ],
    };
  },
};
</script>

<style>
</style>