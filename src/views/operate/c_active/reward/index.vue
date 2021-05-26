<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="24" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="addMeal"
          >新增打赏活动</el-button
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
      <el-table-column align="center" width="120" label="活动ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="活动名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="发起用户">
        <template slot-scope="scope">
          <span>{{ scope.row.send_customer_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="160" label="打赏土豪用户">
        <template slot-scope="scope">
          <span>{{ scope.row.receive_customer_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="发起次数">
        <template slot-scope="scope">
          <span>{{ scope.row.send_count }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="打赏次数">
        <template slot-scope="scope">
          <span>{{ scope.row.receive_count }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="打赏金额">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200" label="开始时间">
        <template slot-scope="scope">
          <span>{{ scope.row.valid_at_start }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200" label="结束时间">
        <template slot-scope="scope">
          <span>{{ scope.row.valid_at_end }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200" label="创建人">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="活动状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status_name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
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
import { getList } from "@/api/operate/c_active/reward";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 10,
      },
      loading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    addMeal() {
      this.$router.push("/operate/c_active/reward_add");
    },
    getList() {
      this.loading = true;
      getList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    goDetail(id) {
      this.$router.push(`/operate/c_active/reward_detail?id=${id}`);
    },
  },
};
</script>