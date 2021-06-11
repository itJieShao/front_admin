<template>
  <div class="app-container">
    <el-row :gutter="10" style="margin-bottom: 20px">
      <el-col :span="3">
        <el-select
          style="width: 100%"
          v-model="listData.status"
          filterable
          clearable
          placeholder="请选择套餐状态"
        >
          <el-option label="启用" :value="1"> </el-option>
          <el-option label="禁用" :value="0"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select
          style="width: 100%"
          v-model="listData.package_label_id"
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
          v-model="listData.effective_date"
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
        <el-input
          placeholder="请输入套餐名称搜索"
          v-model="listData.name"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button @click="searchBtn" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="addMeal"
          >新增套餐</el-button
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
      <el-table-column width="100" align="center" label="套餐ID">
        <template slot-scope="scope">
          <span>{{ scope.row.package_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="套餐图片">
        <template slot-scope="scope">
          <img
            style="max-width: 100px; max-height: 100px"
            :src="scope.row.main_image"
            alt=""
          />
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="套餐名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="标签">
        <template slot-scope="scope">
          <span>{{ scope.row.package_label_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="建议销售价">
        <template slot-scope="scope">
          <span>{{ scope.row.sale_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="厨师">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="120"
        class-name="status-col"
        align="center"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" width="240" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status ? 'danger' : 'success'"
            size="mini"
            @click="
              updateStatus(scope.row.package_id, scope.row.status, scope.$index)
            "
            >{{ scope.row.status ? "禁用" : "启用" }}</el-button
          >
          <el-button size="mini" @click="goEdit(scope.row.package_id)"
            >编辑</el-button
          >
          <el-button size="mini" @click="goDetail(scope.row.package_id)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listData.page"
      :limit.sync="listData.page_size"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { packageList, packageUpdateStatus } from "@/api/basic";
import { categoryData } from "@/api/system/category";
import Pagination from "@/components/Pagination";
export default {
  name: "PreinstallMeal",
  components: { Pagination },
  data() {
    return {
      list: null,
      listData: {
        page: 1,
        page_size: 10,
        name: "",
        export: "",
        package_label_id: "",
        created_at_start: "",
        created_at_end: "",
        status: "",
        effective_date: "",
      },
      loading: false,
      total: 0,
      labelList: [],
    };
  },
  created() {
    if (this.$store.state.app.fromPath.indexOf(this.$route.path) != -1) {
      if (this.$store.state.app.pageInfo) {
        this.listData = this.$store.state.app.pageInfo;
      }
    } else {
      this.$store.commit("app/removePageInfo");
    }
    this.getList();
    this.getLabelList();
  },
  destroyed() {
    this.$store.commit("app/setPageInfo", this.listData);
  },
  methods: {
    //预设套餐标签列表
    getLabelList() {
      categoryData({ type: 1 }).then((res) => {
        this.labelList = res;
      });
    },
    addMeal() {
      this.$router.push("/basic/goods/preinstall_meal_add");
    },
    goEdit(package_id) {
      this.$router.push(
        `/basic/goods/preinstall_meal_edit?package_id=${package_id}`
      );
    },
    goDetail(package_id) {
      this.$router.push(
        `/basic/goods/preinstall_meal_detail?package_id=${package_id}`
      );
    },
    getList() {
      this.loading = true;
      let aData = JSON.parse(JSON.stringify(this.listData));
      if (aData.status === "") {
        delete aData.status;
      }
      if (aData.effective_date) {
        aData.created_at_start = aData.effective_date[0];
        aData.created_at_end = aData.effective_date[1];
        delete aData.effective_date;
      }
      packageList(aData).then((res) => {
        this.list = res.list;
        this.total = res.count;
        this.loading = false;
      });
    },
    searchBtn() {
      this.listData.page = 1;
      this.getList();
    },
    updateStatus(package_id, status, index) {
      packageUpdateStatus({
        package_id,
        status: status ? 0 : 1,
      }).then((res) => {
        if (res) {
          this.list[index].status = status ? 0 : 1;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
  },
};
</script>


