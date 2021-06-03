<template>
  <div class="app-container">
    <el-tabs v-model="tabActive" style="margin-top: 15px" type="border-card">
      <el-tab-pane
        v-for="item in tabCon"
        :key="item.key"
        :label="item.name"
        :name="item.key"
      >
        <keep-alive>
          <tab-pane v-if="tabActive == item.key" :type_id="item.key" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from "./components/TabPane";
export default {
  name: "material_seasoning",
  components: { TabPane },
  data() {
    return {
      tabActive: "1",
      tabCon:[
          {
              key:"1",
              name:'按模板查看'
          },
          {
              key:"2",
              name:'按主套餐查看'
          }
      ]
    };
  },
  methods: {},
};
</script>