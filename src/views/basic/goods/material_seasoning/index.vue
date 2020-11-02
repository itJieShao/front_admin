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
          <tab-pane v-if="tabActive == item.key" :type="item.key" />
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
      tabActive: "3",
      tabCon:[
          {
              key:"3",
              name:'材料'
          },
          {
              key:"4",
              name:'调料'
          },
          {
              key:"6",
              name:'包装'
          }
      ]
    };
  },
  methods: {},
};
</script>

