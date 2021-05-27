<template>
  <div class="app-container">
    <h2>新增问卷模板</h2>
    <el-card shadow="always">
      <el-form label-width="100px">
        <el-form-item label="问卷模板标题">
          <el-input
            placeholder="请输入问卷模板标题"
            v-model="formData.title"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="100px">
        <el-form-item
          :label="`第${index + 1}题`"
          v-for="(item, index) in formData.content"
        >
          <div class="flex_aic">
            <el-input
              placeholder="请输入题目"
              v-model="item.question"
            ></el-input>
            <i
              v-if="formData.content.length > 1"
              @click="deleteQuestion(index)"
              class="del_btn el-icon-delete delete-btn"
            ></i>
          </div>
          <el-radio v-model="item.answer_type" label="1">单选题</el-radio>
          <el-radio v-model="item.answer_type" label="2">多选题</el-radio>
          <el-radio v-model="item.answer_type" label="3">填空题</el-radio>
          <div class="answer_box" v-show="item.answer_type != 3">
            <div
              class="flex_aic"
              v-for="(it, idx) in item.answer"
              style="margin: 0 20px 10px 0"
            >
              <el-input
                v-model="it.value"
                class="answer_input"
                placeholder="请输入选项内容"
              ></el-input>
              <i
                v-if="item.answer.length > 2"
                @click="deleteAnswer(index, idx)"
                class="del_btn el-icon-error"
              ></i>
            </div>
            <i
              @click="addAnswer(index)"
              class="add_btn el-icon-circle-plus"
            ></i>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="addQuestion" type="success">新增题目</el-button>
        </el-form-item>
      </el-form>
      <el-row type="flex" class="row-bg" justify="end">
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {
  questionnaireTplAdd,
} from "@/api/operate/questionnaire";
export default {
  data() {
    return {
      formData: {
        title: "",
        content: [
          {
            question: "",
            answer_type: "1",
            answer: [{ value: "" }, { value: "" }],
          },
        ],
      },
    };
  },
  methods: {
    rewardChange(id, type, index) {
      if (type == 1) {
        this.formData.reward[index].reward_name = this.redEnvelopesData.find(
          (item) => item.id == id
        ).name;
      } else if (type == 2) {
        this.formData.reward[index].reward_name = this.memberCardData.find(
          (item) => item.id == id
        ).name;
      } else {
        this.formData.reward[index].reward_name = this.couponData.find(
          (item) => item.id == id
        ).name;
      }
    },
    //新增题目
    addQuestion() {
      this.formData.content.push({
        question: "",
        answer_type: "1",
        answer: [{ value: "" }, { value: "" }],
      });
    },
    //删除题目
    deleteQuestion(index) {
      this.formData.content.splice(index, 1);
    },
    //新增答案
    addAnswer(index) {
      this.formData.content[index].answer.push({
        question: "",
        answer_type: "1",
        answer: [{ value: "" }, { value: "" }],
      });
    },
    //删除答案
    deleteAnswer(index, idx) {
      this.formData.content[index].answer.splice(idx, 1);
    },
    //提交
    onSubmit() {
      let aData = JSON.parse(JSON.stringify(this.formData));
      aData.content.forEach((item) => {
        let answer = item.answer;
        item.answer = [];
        answer.forEach((it) => {
          item.answer.push(it.value);
        });
      });
      questionnaireTplAdd(aData).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "提交成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.$router.go(-1);
            },
          });
        }
      });
    },
  },
};
</script>

<style>
.flex_aic {
  display: flex;
  align-items: center;
}
.del_btn,
.add_btn {
  margin-left: 10px;
  font-size: 20px;
  cursor: pointer;
}
.del_btn {
  position: relative;
  color: red;
}
.add_btn {
  color: green;
  margin-bottom: 10px;
}
.answer_box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.answer_input {
  width: 200px;
}
</style>