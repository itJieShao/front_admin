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
        <el-button @click="getList" type="primary" icon="el-icon-search"
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
          <span>{{ scope.row.customer_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.customer_nickName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="微信号">
        <template slot-scope="scope">
          <span>{{ scope.row.customer_WeChatNum }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="增加/减去">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success" effect="dark">
            增加
          </el-tag>
          <el-tag v-else type="danger" effect="dark"> 减去 </el-tag>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="积分数">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">
            {{ scope.row.integral_change }}
          </el-tag>
          <el-tag v-else type="danger">
            {{ scope.row.integral_change }}
          </el-tag>
          <span></span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="使用路径">
        <template slot-scope="scope">
          <span>{{ scope.row.using_path }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="下单时间">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
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
import { integralList } from "@/api/basic";
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
      loading: false,
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      integralList(this.listData).then((res) => {
        this.list = res.list;
        this.total = res.count;
        this.loading = false;
      });
    },
  },
};
</script>


