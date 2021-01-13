<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.title"
          placeholder="请输入问卷模板标题搜索"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="searchBtn" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="addQuestionnaireTpl"
          >新增问卷模板</el-button
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
      <el-table-column width="120" align="center" label="问卷模板ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="问卷模板标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="填卷次数">
        <template slot-scope="scope">
          <span>{{ scope.row.write_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="填卷用户">
        <template slot-scope="scope">
          <span>{{ scope.row.people_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="引用问卷">
        <template slot-scope="scope">
          <span>{{ scope.row.use_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="最近一次引用">
        <template slot-scope="scope">
          <span>{{ scope.row.last_questionnaire_title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="最近一次引用时间">
        <template slot-scope="scope">
          <span>{{ scope.row.last_questionnaire_at }}</span>
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

      <el-table-column width="200" fixed="right" align="center" label="操作">
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
import { questionnaireTplList } from "@/api/operate/questionnaire";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 10,
        title: "",
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
    addQuestionnaireTpl() {
      this.$router.push("/operate/questionnaire_tpl_add");
    },
    goDetail(id) {
      this.$router.push(`/operate/questionnaire_tpl_detail?id=${id}`);
    },
    getList() {
      this.loading = true;
      questionnaireTplList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    searchBtn(){
      this.listData.page = 1;
      this.getList();
    },
  },
};
</script>
