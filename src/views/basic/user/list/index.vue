<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.condition"
          placeholder="请输入搜索内容"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="search" type="primary" icon="el-icon-search"
          >搜索</el-button
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
      <el-table-column align="center" label="用户ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="用户头像">
        <template slot-scope="scope">
          <img
            style="width: 150px; height: 150px"
            :src="scope.row.headImg"
            alt=""
          />
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="微信号">
        <template slot-scope="scope">
          <span>{{ scope.row.WeChatNum }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="手机号码">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="openid">
        <template slot-scope="scope">
          <span>{{ scope.row.openID }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="unionid">
        <template slot-scope="scope">
          <span>{{ scope.row.unionID }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          <span v-if="scope.row.gender == 1">男</span>
          <span v-else-if="scope.row.gender == 2">女</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="口味">
        <template slot-scope="scope">
          <span>{{ scope.row.taste == 1 ? "不辣" : "辣" }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="年龄">
        <template slot-scope="scope">
          <span>{{ scope.row.birthday }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="地区">
        <template slot-scope="scope">
          <span>{{ scope.row.province + scope.row.city }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" align="center" label="会员卡用户">
        <template slot-scope="scope">
          <span>{{ scope.row.member ? "是" : "否" }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否禁用">
        <template slot-scope="scope">
          <span>{{ scope.row.status ? "是" : "否" }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :type="scope.row.status ? 'success' : 'danger'"
            @click="updateStatus(scope.row.id, scope.row.status)"
            >{{ scope.row.status ? "启用" : "禁用" }}</el-button
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
import { userList, userUpdateStatus } from "@/api/basic";
import Pagination from "@/components/Pagination";
export default {
  name: "preinstall_meal",
  components: { Pagination },
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 10,
        condition: "",
      },
      loading: true,
      total: 0,
    };
  },
  created() {
    if (this.$store.state.app.fromPath.indexOf("/user/detail") != -1) {
      if (this.$store.state.app.pageInfo) {
        this.listData = this.$store.state.app.pageInfo;
      }
    } else {
      this.$store.commit("app/removePageInfo");
    }
    this.getList();
  },
  destroyed() {
    this.$store.commit("app/setPageInfo", this.listData);
  },
  methods: {
    search() {
      this.listData.page = 1;
      this.getList();
    },
    updateStatus(id, status) {
      userUpdateStatus({
        customer_id: id,
        type: status ? 2 : 1,
      }).then((res) => {
        if (res) {
          let index = this.list.findIndex((item) => item.id == id);
          this.$set(this.list[index], "status", status ? 0 : 1);
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    goDetail(id) {
      this.$router.push(`/basic/user/detail?customer_id=${id}`);
    },
    getList() {
      this.loading = true;
      userList(this.listData).then((res) => {
        this.list = res.list;
        this.total = res.count;
        this.loading = false;
      });
    },
  },
};
</script>


