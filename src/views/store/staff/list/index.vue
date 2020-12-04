<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.name"
          placeholder="请输入员工名称搜索"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="getList" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="goAdd"
          >新增员工</el-button
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
      <el-table-column align="center" label="员工ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="员工名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="所属门店">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_name.join(",") }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="岗位">
        <template slot-scope="scope">
          <span>{{ scope.row.station }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="年龄">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="学历">
        <template slot-scope="scope">
          <span>{{ scope.row.education }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="籍贯">
        <template slot-scope="scope">
          <span>{{ scope.row.native_place }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="Openid">
        <template slot-scope="scope">
          <span>{{ scope.row.open_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="Unionid">
        <template slot-scope="scope">
          <span>{{ scope.row.union_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="手机">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="入职时间">
        <template slot-scope="scope">
          <span>{{ scope.row.entry_time }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status ? "启用" : "禁用" }}</span>
        </template>
      </el-table-column>

      <el-table-column width="250" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status ? 'danger' : 'success'"
            size="mini"
            @click="updateStatus(scope.row.id, scope.row.status)"
            >{{ scope.row.status ? "禁用" : "启用" }}</el-button
          >
          <el-button size="mini" @click="goEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" @click="goDetail(scope.row.id,scope.row.station_id)">详情</el-button>
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
import { vendorStaffList, disableEmployee } from "@/api/store";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 10,
        name: "",
      },
      loading: false,
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    goEdit(employee_id) {
      this.$router.push(`/store/staff/staff_edit?employee_id=${employee_id}`);
    },
    goDetail(employee_id,station_id) {
      this.$router.push(`/store/staff/staff_detail?employee_id=${employee_id}&station_id=${station_id}`);
    },
    goAdd() {
      this.$router.push("/store/staff/staff_add");
    },
    getList() {
      this.loading = true;
      vendorStaffList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    updateStatus(employee_id, status) {
      disableEmployee({
        employee_id,
        type: status == 1 ? 2 : 1,
      }).then((res) => {
        if (res) {
          this.list.find((item) => item.id == employee_id).status =
            status == 1 ? 0 : 1;
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

<style lang="scss" scoped>
.header_content {
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
}
</style>

