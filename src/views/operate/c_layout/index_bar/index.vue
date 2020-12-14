<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="24" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="addMeal"
          >新增</el-button
        >
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="图片ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="轮播排序">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="图片缩略图">
        <template slot-scope="scope">
          <img style="width:200px;" :src="scope.row.url" alt="">
        </template>
      </el-table-column>

      <el-table-column align="center" label="链接地址">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div style="display: inline-block; width: 100px">
            <i
              @click="userChangePosition(1, scope.$index)"
              class="el-icon-top"
              v-show="list.length > 2 && scope.$index != 0"
            ></i>
            <i
              @click="userChangePosition(2, scope.$index)"
              class="el-icon-bottom"
              v-show="list.length > 2 && scope.$index != list.length - 1"
            ></i>
          </div>
          <el-button size="mini" @click="goEdit(scope.row.package_id)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { indexBarList } from "@/api/operate/c_layout/index_bar";
export default {
  data() {
    return {
      list: [],
      loading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    userChangePosition(type, index) {
      let list = this.list;
      if (type == 1) {
        list[index] = list.splice(index - 1, 1, list[index])[0];
      } else {
        list[index] = list.splice(index + 1, 1, list[index])[0];
      }
    },
    addMeal() {
      this.$router.push("/operate/c_layout/index_bar_add");
    },
    goEdit(package_id) {
      this.$router.push(
        `/operate/c_layout/index_bar_edit?package_id=${package_id}`
      );
    },
    goDetail(package_id) {
      this.$router.push(
        `/basic/goods/preinstall_meal_detail?package_id=${package_id}`
      );
    },
    getList() {
      this.loading = true;
      indexBarList().then((res) => {
        this.list = res;
        this.loading = false;
      });
    },
  },
};
</script>
<style scoped>
  .el-icon-top,.el-icon-bottom{
    margin-left: 15px;
    font-size: 20px;
    cursor: pointer;
    color: #999;
  }
</style>