<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-select
          style="width: 100%"
          v-model="listData.module"
          placeholder="请选择模块搜索"
        >
          <el-option label="全部模块"></el-option>
          <el-option
            v-for="(item, index) in data.module_list"
            :key="index"
            :label="item.module"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="10">
        <el-button @click="searchBtn" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="list" style="width: 100%">
      <el-table-column width="100" align="center" label="日志id">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作用户id">
        <template slot-scope="scope">
          <span>{{ scope.row.admin_user_id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.admin_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="模块id">
        <template slot-scope="scope">
          <span>{{ scope.row.module }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="模块名">
        <template slot-scope="scope">
          <span>{{ scope.row.module_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="类型id">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="被操作模块id">
        <template slot-scope="scope">
          <span>{{ scope.row.operation_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="操作时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
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
import { logList, logModuleList } from "@/api/log";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 10,
        module: "",
      },
      loading: false,
      total: 0,
      data: {},
    };
  },
  components: { Pagination },
  created() {
    this.getList();
    this.getModuleList();
  },
  methods: {
    getList() {
      this.loading = true;
      logList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    searchBtn() {
      this.listData.page = 1;
      this.getList();
    },
    getModuleList() {
      logModuleList().then((res) => {
        this.data = res;
      });
    },
  },
};
</script>
