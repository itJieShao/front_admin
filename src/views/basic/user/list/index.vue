<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="4" class="opt-bar-flex">
        <label>用户来源：</label>
        <el-select style="width: 100%" v-model="listData.env">
          <el-option label="全部" :value="0"></el-option>
          <el-option label="一合拾盒" :value="2"></el-option>
          <el-option label="盒小饭堂" :value="1"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="opt-bar-flex">
        <label>用户类型：</label>
        <el-select style="width: 100%" v-model="listData.type_id">
          <el-option
            v-for="item in userTypeList"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="8" class="opt-bar-flex">
        <label>注册时间：</label>
        <el-date-picker
          v-model="register_time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-input
          v-model="listData.keyword"
          placeholder="请输入用户昵称/手机号码搜索"
        ></el-input>
      </el-col>
      <el-col :span="2">
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

      <el-table-column width="140" align="center" label="用户类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type_name }}</span>
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
          <!-- <el-button
            size="mini"
            :type="scope.row.status ? 'success' : 'danger'"
            @click="updateStatus(scope.row.id, scope.row.status)"
            >{{ scope.row.status ? "启用" : "禁用" }}</el-button
          > -->
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
        keyword: "",
        type_id: 0,
        env: 0,
        start_time: "",
        end_time: "",
      },
      loading: true,
      total: 0,
      userTypeList: [
        { name: "全部", type: 0 },
        { name: "普通用户", type: 1 },
        { name: "门店店员", type: 2 },
        { name: "一盒员工", type: 3 },
        { name: "园区物业", type: 4 },
      ],
      register_time: "",
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
      this.listData.start_time = this.register_time
        ? this.register_time[0]
        : "";
      this.listData.end_time = this.register_time ? this.register_time[1] : "";
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


