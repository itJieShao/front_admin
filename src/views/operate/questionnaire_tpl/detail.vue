<template>
  <div class="app-container">
    <h2>问卷模板详情</h2>
    <el-row :gutter="12" style="margin-top: 10px">
      <el-col :span="24">
        <el-card shadow="always">
          <p style="text-align: center">{{ detail.title }}</p>
        </el-card>
      </el-col>
    </el-row>
    <el-row
      v-for="(item, index) in detail.questionnaire_data_1"
      :gutter="12"
      style="margin-top: 10px"
    >
      <el-col :span="8" v-for="(it, idx) in item">
        <Echart
          :id="'chart' + index + idx"
          unit="人"
          :title="it.title"
          :pieData="it.answer_data"
          type="pie"
          width="100%"
          height="300px"
        />
      </el-col>
    </el-row>
    <el-row :gutter="12" style="margin-top: 10px">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>问卷模版ID</p>
            <p>{{ detail.id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>填卷次数</p>
            <p>{{ detail.nper }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>填卷用户</p>
            <p>{{ detail.people_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>引用问卷</p>
            <p>{{ detail.limit_people }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>最近一次引用</p>
            <p>{{ detail.people_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>最近一次引用时间</p>
            <p>{{ detail.created_user_name }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" style="margin-top: 10px">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>创建人</p>
            <p>{{ detail.created_user_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>创建时间</p>
            <p>{{ detail.created_at }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <h3>引用问卷</h3>
    <el-card shadow="always">
      <el-table
        v-loading="loading"
        :data="detail.questionnaire_data"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="id" label="问卷ID"> </el-table-column>
        <el-table-column prop="title" label="问卷标题"> </el-table-column>
        <el-table-column prop="nper" label="期数"> </el-table-column>
        <el-table-column prop="valid_at_start" label="有效期">
            <template slot-scope="scope">
                <span>{{scope.row.valid_at_start}}</span>至
                <span>{{scope.row.valid_at_end}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="people_num" label="填卷人数"> </el-table-column>
        <el-table-column prop="reward_names" label="奖励"> </el-table-column>
        <el-table-column prop="created_at" label="创建时间"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span
              :style="
                scope.row.status ? 'background:green;' : 'background:red;'
              "
              >{{ scope.row.status ? "有效" : "无效" }}</span
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listData.page"
        :limit.sync="listData.page_size"
        @pagination="getDetail"
      />
    </el-card>
  </div>
</template>

<script>
import { questionnaireTplDetail } from "@/api/operate/questionnaire";
import Pagination from "@/components/Pagination";
import Echart from "@/components/Echart";
export default {
  data() {
    return {
      detail: {},
      userItem: {},
      questionnaireData: [],
      listData: {
        id: "",
        page: 1,
        page_size: 10,
      },
      loading: false,
      total: 0,
    };
  },
  components: {
    Echart,
    Pagination,
  },
  created() {
    this.listData.id = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.loading = true;
      questionnaireTplDetail(this.listData).then((res) => {
        this.loading = false;
        this.total = res.questionnaire_count;
        let questionnaire_data = [];
        for (let i = 0; i < res.question_data.length; i += 3) {
          questionnaire_data.push(res.question_data.slice(i, i + 3));
        }
        questionnaire_data.forEach((item, index) => {
          item.forEach((it, idx) => {
            if (!it.answer_data.length) {
              questionnaire_data[index].splice(idx, 1);
            }
          });
        });
        res.questionnaire_data_1 = questionnaire_data;
        this.detail = res;
      });
    },
  },
};
</script>