<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.title"
          placeholder="请输入标题搜索"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="searchBtn" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="list" style="width: 100%">
      <el-table-column align="center" label="消息ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="收件人">
        <template slot-scope="scope">
          <span>{{ scope.row.view_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="发件人">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="发件时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span
            style="color: green; font-weight: 600"
            v-if="scope.row.status_name == '已读'"
            >{{ scope.row.status_name }}</span
          >
          <span style="color: red; font-weight: 600" v-else>{{
            scope.row.status_name
          }}</span>
        </template>
      </el-table-column>

      <el-table-column width="400" align="center" label="消息标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="goDetail(scope.row.id)" size="mini"
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
import { messageList } from "@/api/message";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 10,
        title: "",
        status: "",
      },
      loading: false,
      total: 0,
    };
  },
  components: { Pagination },
  created() {},
  watch: {
    "$route.query.type": {
      handler(type) {
        if (type) {
          this.listData.status = 2;
        } else {
          this.listData.status = "";
        }
        this.getList();
      },
      immediate: true,
    },
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/message/detail?id=${id}`);
    },
    getList() {
      this.loading = true;
      messageList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    searchBtn() {
      this.listData.page = 1;
      this.getList();
    },
  },
};
</script>
