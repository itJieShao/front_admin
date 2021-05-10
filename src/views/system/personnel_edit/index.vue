<template>
  <div class="app-container">
    <h2>设置QC/配送人员</h2>
    <el-table :data="list" style="width: 100%">
      <el-table-column align="center" label="门店">
        <template slot-scope="scope">
          <span></span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="QC人员">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.good_id"
            filterable
            clearable
            placeholder="请选择检测人员"
          >
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.id"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" label="配送人员">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.good_id"
            filterable
            clearable
            placeholder="请选择配送人员"
          >
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.id"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" class="row-bg" justify="end" style="margin-top: 20px">
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onSubmit() {},
  },
};
</script>

<style>
</style>