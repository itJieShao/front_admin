<template>
  <div class="app-container">
    <h2>问卷报表</h2>
    <div class="screen">
      <el-date-picker
        v-model="created_at_time"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :default-time="['', '23:59:59']"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>
      <div class="screen_item">
        <p>剔除重复答卷</p>
        <el-switch
          v-model="type"
          active-color="#13ce66"
          inactive-color="#999999"
        >
        </el-switch>
      </div>
      <el-button type="danger" @click="removeAllPie" round>清空问题</el-button>
    </div>
    <el-row
      v-for="(item, index) in pieData"
      :gutter="12"
      style="margin-top: 50px"
      :key="timer + index"
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
    <el-button
      style="margin: 50px 0"
      type="success"
      icon="el-icon-plus"
      @click="dialogQuestionTpl = true"
      >添加问卷问题</el-button
    >
    <el-dialog
      width="60%"
      center
      title="问卷模板列表"
      :visible.sync="dialogQuestionTpl"
    >
      <el-table v-loading="loading" :data="questionnaireTpl">
        <el-table-column
          align="center"
          property="title"
          label="问卷模版名称"
        ></el-table-column>
        <el-table-column
          align="center"
          property="question_num"
          label="问题数量"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="checkedTpl(scope.row.id, scope.$index)"
              >选择</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listData.page"
        :limit.sync="listData.page_size"
        @pagination="getQuestionnaireTplList"
      />
    </el-dialog>
    <el-dialog
      width="60%"
      center
      title="问卷模板内容"
      :visible.sync="dialogQuestionTplCon"
    >
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
      <div style="margin: 15px 0"></div>
      <el-checkbox-group
        v-model="checkedQuestionnaire"
        @change="handleCheckedChange"
      >
        <el-checkbox
          style="display: flex"
          v-for="(item, index) in questionnaireTpl[index].content"
          :label="item.id"
          :key="index"
        >
          <div v-if="item.answer_type == 1">【单选题】{{ item.title }}</div>
          <div v-else-if="item.answer_type == 2">
            【多选题】{{ item.title }}
          </div>
          <div v-else>【填空题】{{ item.title }}</div>
          <div class="answer_content">
            <div
              class="answer_item"
              v-for="(it, idx) in item.answer_data"
              :key="idx"
            >
              <span v-if="item.answer_type == 1" class="radio_span"></span>
              <span
                v-else-if="item.answer_type == 2"
                class="checkbox_span"
              ></span>
              <p>{{ it.content }}</p>
            </div>
          </div>
        </el-checkbox>
      </el-checkbox-group>
      <div style="display: flex; justify-content: flex-end">
        <el-button @click="dialogQuestionTplCon = false">返 回</el-button>
        <el-button type="primary" @click="addToReport">添加到报表</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { questionnaireTplList } from "@/api/operate/questionnaire";
import { questionnaireData } from "@/api/operate/data_report/questionnaire";
import Echart from "@/components/Echart";
import Pagination from "@/components/Pagination";
export default {
  components: {
    Echart,
    Pagination,
  },
  data() {
    return {
      created_at_time: "",
      type: 0,
      formData: {
        type: false,
        questionnaire_template_question_ids: [],
        created_at_start: "",
        created_at_end: "",
      },
      dialogQuestionTpl: false,
      dialogQuestionTplCon: false,
      questionnaireTpl: [],
      listData: {
        page: 1,
        page_size: 10,
        title: "",
        type: 2,
      },
      loading: false,
      total: 0,
      index: 0,
      checkAll: false,
      checkedQuestionnaire: [],
      checkedQuestionnaireIds: [],
      isIndeterminate: false,
      pieData: [],
      timer: "",
    };
  },
  created() {
    this.getQuestionnaireTplList();
  },
  watch: {
    created_at_time(val) {
      this.formData.created_at_start = val[0];
      this.formData.created_at_end = val[1];
      this.getQuestionnairePie();
    },
    type(type) {
      this.formData.type = type ? 1 : 0;
      this.getQuestionnairePie();
    },
    dialogQuestionTplCon(isOpen){
        if (!isOpen){
            this.isIndeterminate = false;
            this.checkAll = this.checkedQuestionnaire = [];
        }
    }
  },
  methods: {
    checkedTpl(tplId, index) {
      this.checkedTplId = tplId;
      this.index = index;
      this.dialogQuestionTplCon = true;
      this.checkedQuestionnaireIds = [];
      this.questionnaireTpl[index].content.forEach((item) => {
        this.checkedQuestionnaireIds.push(item.id);
      });
    },
    handleCheckAllChange(val) {
      this.checkedQuestionnaire = val ? this.checkedQuestionnaireIds : [];
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkedQuestionnaireIds.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.checkedQuestionnaireIds.length;
    },
    getQuestionnaireTplList() {
      this.loading = true;
      questionnaireTplList(this.listData).then((res) => {
        this.total = res.count;
        this.questionnaireTpl = res.list;
        this.loading = false;
      });
    },
    addToReport() {
      if (!this.checkedQuestionnaire.length) {
        return this.$message({
          message: "请选择问卷模板内容",
          type: "error",
          duration: 1000,
        });
      }
      let arr = this.formData.questionnaire_template_question_ids.concat(
        this.checkedQuestionnaire
      );
      this.formData.questionnaire_template_question_ids = Array.from(
        new Set(arr)
      );
      this.getQuestionnairePie();
      this.dialogQuestionTpl = false;
      this.dialogQuestionTplCon = false;
    },
    getQuestionnairePie() {
      questionnaireData(this.formData).then((res) => {
        let pieData = [];
        for (let i = 0; i < res.length; i += 3) {
          pieData.push(res.slice(i, i + 3));
        }
        this.pieData = pieData;
        this.timer = new Date().getTime();
      });
    },
    removeAllPie() {
      this.$confirm("是否清空此页面的所有问题？")
        .then((_) => {
          this.formData.questionnaire_template_question_ids = [];
          this.pieData = [];
        })
    },
  },
};
</script>

<style scoped lang="scss">
.screen {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .screen_item {
    display: flex;
    align-items: center;
    margin: 0 50px;
    p {
      margin-right: 10px;
    }
  }
}
.answer_content {
  display: flex;
}
.answer_item {
  display: flex;
  align-items: center;
  margin: 10px 0 15px 30px;
}
.answer_item span {
  display: block;
  border: 1px solid #ddd;
  margin-right: 5px;
}
.radio_span {
  border-radius: 50%;
  width: 15px;
  height: 15px;
}
.checkbox_span {
  width: 15px;
  height: 15px;
}
</style>