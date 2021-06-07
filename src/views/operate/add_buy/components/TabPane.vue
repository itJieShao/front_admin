<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.package_name"
          placeholder="请输入套餐加购模板搜索"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="searchBtn" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="goAdd"
          >新增套餐加购模板</el-button
        >
      </el-col>
    </el-row>
    <el-table v-loading="loading" border :data="list" style="width: 100%">
      <el-table-column width="140" align="center" label="套餐加购模版ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="主套餐">
        <template slot-scope="scope">
          <span v-if="type_id == 2">{{ scope.row.package_name }}</span>
          <span v-else>{{ scope.row.package_names }}</span>
        </template>
      </el-table-column>

      <el-table-column width="240" align="center" label="搭配套餐">
        <template slot-scope="scope">
          <span>{{ scope.row.purchased_vendor_package_names }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="引用门店">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_names }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="引用时间">
        <template slot-scope="scope">
          <span>{{ scope.row.valid_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="创建人">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == -1" type="danger"> 已禁用 </el-tag>
          <el-tag v-else-if="scope.row.status == 0" type="warning">
            待启用
          </el-tag>
          <el-tag v-else type="success"> 已启用 </el-tag>
        </template>
      </el-table-column>

      <el-table-column width="250" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.can_enable && type_id == 1"
            type="success"
            size="mini"
            @click="updateStatus(scope.row.id, 1, scope.$index)"
            >启用</el-button
          >
          <!-- <el-button
            v-if="scope.row.can_disable"
            type="danger"
            size="mini"
            @click="updateStatus(scope.row.id, -1, scope.$index)"
            >禁用</el-button
          > -->
          <el-button v-if="scope.row.can_edit" size="mini" @click="goEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button size="mini" @click="goDetail(scope.row.id)"
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
import { getList, updateStatus } from "@/api/operate/add_buy";
import Pagination from "@/components/Pagination";
export default {
  props:["type_id"],
  components: { Pagination },
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 10,
        package_name: "",
        type_id: this.type_id,
      },
      loading: false,
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    goEdit(id){
      this.$router.push(`/operate/add_buy_edit?id=${id}`);
    },
    goDetail(id) {
      this.$router.push(`/operate/add_buy_detail?id=${id}`);
    },
    goAdd() {
      this.$router.push("/operate/add_buy_add");
    },
    getList() {
      this.loading = true;
      getList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    searchBtn() {
      this.listData.page = 1;
      this.getList();
    },
    updateStatus(id, status, index) {
      updateStatus({
        id,
        status,
      }).then((res) => {
        if (res) {
          this.$set(this.list[index], "status", status);
          this.$set(
            this.list[index],
            status == 1 ? "can_enable" : "can_disable",
            0
          );
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