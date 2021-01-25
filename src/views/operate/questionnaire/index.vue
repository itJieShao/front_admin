<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.name"
          placeholder="请输入问卷标题搜索"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="searchBtn" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="addQuestionnaire"
          >新增问卷</el-button
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
      <el-table-column align="center" label="问卷ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="问卷标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="期数">
        <template slot-scope="scope">
          <span>{{ scope.row.nper }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="问卷类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="小程序问卷">
        <template slot-scope="scope">
          <span>{{ scope.row.show_position_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="300" align="center" label="有效期">
        <template slot-scope="scope">
          <span>{{ scope.row.valid_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="填卷人数">
        <template slot-scope="scope">
          <span>{{ scope.row.people_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="奖励类型">
        <template slot-scope="scope">
          <p v-for="item in scope.row.reward_type">{{ item }}</p>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="奖励">
        <template slot-scope="scope">
          <p v-for="item in scope.row.reward_name">{{ item }}</p>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="奖励有效期">
        <template slot-scope="scope">
          <p v-for="item in scope.row.reward_valid_at">{{ item }}</p>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.status?'success':'danger'">{{scope.row.status}}</el-tag> -->
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <!-- <el-button v-if="scope.row.status" type="danger" size="mini" @click="updateStatus(scope.row.id,scope.$index)"
            >下架</el-button
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
import {
  questionnaireList,
  questionnaireDisable,
} from "@/api/operate/questionnaire";
import Pagination from "@/components/Pagination";
export default {
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
  components: { Pagination },
  created() {
    this.getList();
  },
  methods: {
    addQuestionnaire() {
      this.$router.push("/operate/questionnaire_add");
    },
    goDetail(id) {
      this.$router.push(`/operate/questionnaire_detail?id=${id}`);
    },
    getList() {
      this.loading = true;
      questionnaireList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    searchBtn() {
      this.listData.page = 1;
      this.getList();
    },
    updateStatus(id, index) {
      questionnaireDisable({ id }).then((res) => {
        if (res) {
          this.list[index].status = 0;
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
