<template>
  <div class="app-container">
    <h2>新增问卷</h2>
    <el-card shadow="always">
      <h3>问卷基础信息</h3>
      <el-form label-width="100px">
        <el-form-item label="问卷封面">
          <el-upload
            :class="{ img_hide: formData.image }"
            :limit="1"
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="upLoadImage"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleImageRemove"
            :data="{ token: $store.state.user.token }"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="问卷标题">
          <el-input
            placeholder="请输入问卷的标题"
            v-model="formData.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker
            v-model="effective_date"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="问卷期数">
          <el-input
            placeholder="请输入问卷的自定义期数"
            v-model="formData.nper"
          ></el-input>
        </el-form-item>
        <el-form-item label="问卷优先级">
          <el-select
            style="width: 100%"
            placeholder="请选择问卷优先级"
            v-model="formData.type"
          >
            <el-option label="基础问卷" value="1"></el-option>
            <el-option label="普通问卷" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问卷奖励">
          <el-card
            style="margin-bottom: 20px; position: relative"
            v-for="(item, index) in formData.reward"
            :key="index"
            shadow="always"
          >
            <div
              v-if="formData.reward.length"
              style="display: flex; justify-content: flex-end"
            >
              <el-button
                style="cursor: pointer"
                size="mini"
                @click="deleteReward(index)"
                type="danger"
                icon="el-icon-delete"
                >删除奖励</el-button
              >
            </div>
            <el-form-item label-width="auto" label="奖励封面">
              <el-upload
                :limit="1"
                :class="{ img_hide: item.reward_image }"
                :action="$upLoadImgApi"
                list-type="picture-card"
                :on-success="(value) => upLoadRewardImage(index, value)"
                :on-preview="handlePictureCardPreview"
                :on-remove="(value) => handleRewardImageRemove(index)"
                :data="{ token: $store.state.user.token }"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label-width="auto" label="奖励类型">
              <el-radio-group v-model="item.type" @change="item.reward_id = ''">
                <el-radio label="1">红包</el-radio>
                <el-radio label="2">次数卡</el-radio>
                <el-radio label="3">优惠券</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-select
              v-if="item.type == 1"
              style="width: 100%"
              placeholder="请选择问卷奖励红包"
              v-model="item.reward_id"
              @change="(id) => rewardChange(id, item.type, index)"
            >
              <el-option
                v-for="it in redEnvelopesData"
                :label="it.name"
                :value="it.id"
              ></el-option>
            </el-select>
            <el-select
              v-else-if="item.type == 2"
              style="width: 100%"
              placeholder="请选择问卷奖励次数卡"
              v-model="item.reward_id"
              @change="(id) => rewardChange(id, item.type, index)"
            >
              <el-option
                v-for="it in memberCardData"
                :label="it.name"
                :value="it.id"
              ></el-option>
            </el-select>
            <el-select
              v-else
              style="width: 100%"
              placeholder="请选择问卷奖励优惠券"
              v-model="item.reward_id"
              @change="(id) => rewardChange(id, item.type, index)"
            >
              <el-option
                v-for="it in couponData"
                :label="it.name"
                :value="it.id"
              ></el-option>
            </el-select>
          </el-card>
          <el-button @click="addReward" type="success">新增奖励</el-button>
        </el-form-item>
        <el-form-item label="限制填卷人数">
          <el-input
            placeholder="请输入限制填卷人数"
            v-model="formData.limit_people"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px" shadow="always">
      <h3>问卷内容</h3>
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
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-row>
    </el-card>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import {
  couponData,
  memberCardData,
  questionnaireAdd,
} from "@/api/operate/questionnaire";
export default {
  data() {
    return {
      formData: {
        image: "",
        title: "",
        valid_at_start: "",
        valid_at_end: "",
        nper: "",
        type: "",
        reward: [],
        limit_people: "",
        content: [
          {
            question: "",
            answer_type: "1",
            answer: [{ value: "" }, { value: "" }],
          },
        ],
      },
      effective_date: "",
      dialogImageUrl: "",
      dialogVisible: false,
      redEnvelopesData: [],
      couponData: [],
      memberCardData: [],
    };
  },
  created() {
    this.getCouponData();
    this.getMemberCardData();
  },
  methods: {
    getCouponData() {
      couponData({ type: 3 }).then((res) => {
        this.redEnvelopesData = res;
      });
      couponData({ type: 4 }).then((res) => {
        this.couponData = res;
      });
    },
    getMemberCardData() {
      memberCardData().then((res) => {
        this.memberCardData = res;
      });
    },
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
    //上传封面图
    upLoadImage(res) {
      if (res.status) {
        this.formData.image = res.data.image_url;
      }
    },
    //删除封面图
    handleImageRemove() {
      this.formData.image = "";
    },
    //上传奖励图
    upLoadRewardImage(index, res) {
      if (res.status) {
        this.formData.reward[index].reward_image = res.data.image_url;
      }
    },
    //删除奖励图
    handleRewardImageRemove(index) {
      this.formData.reward[index].reward_image = "";
    },
    //查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //新增奖励
    addReward() {
      this.formData.reward.push({
        type: "1",
        reward_id: "",
        reward_name: "",
        reward_image: "",
      });
    },
    //删除奖励
    deleteReward(index) {
      this.formData.reward.splice(index, 1);
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
      if (this.effective_date) {
        this.formData.valid_at_start = this.effective_date[0];
        this.formData.valid_at_end = this.effective_date[1];
      }
      let aData = JSON.parse(JSON.stringify(this.formData));
      aData.content.forEach((item) => {
        let answer = item.answer;
        item.answer = [];
        answer.forEach((it) => {
          item.answer.push(it.value);
        });
      });
      questionnaireAdd(aData).then((res) => {
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
.img_hide .el-upload--picture-card {
  display: none;
}
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