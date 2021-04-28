<template>
  <div class="app-container">
    <h2>新增活动</h2>
    <el-card shadow="always">
      <el-form label-width="170px">
        <el-form-item label="活动名称">
          <el-input
            placeholder="请输入活动名称"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="effective_date"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['', '23:59:59']"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="拉新人头">
          <el-input
            placeholder="请输入拉新的人头"
            v-model="formData.people_num"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动奖励">
          <el-card
            style="margin-bottom: 20px; position: relative"
            v-for="(item, index) in formData.reward_data"
            :key="index"
            shadow="always"
          >
            <div
              v-if="formData.reward_data.length"
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
            <el-form-item label-width="auto" label="奖励图片">
              <el-upload
                :limit="1"
                :class="{ img_hide: item.image }"
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
              <el-radio-group v-model="item.type" @change="item.coupon_id = ''">
                <el-radio label="1">红包</el-radio>
                <!-- <el-radio label="2">次数卡</el-radio> -->
                <el-radio label="3">优惠券</el-radio>
                <el-radio label="2">次数卡</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-select
              v-if="item.type == 1"
              style="width: 100%"
              placeholder="请选择红包"
              v-model="item.coupon_id"
              @change="(id) => rewardChange(id, item.type, index)"
            >
              <el-option
                v-for="it in redEnvelopesData"
                :label="it.name + '（有效期：' + it.valid_at + '）'"
                :value="it.id"
              ></el-option>
            </el-select>
            <el-select
              v-else-if="item.type == 2"
              style="width: 100%"
              placeholder="请选择次数卡"
              v-model="item.coupon_id"
              @change="(id) => rewardChange(id, item.type, index)"
            >
              <el-option
                v-for="it in timeCardData"
                :label="it.name + '（有效期：' + it.valid_at + '）'"
                :value="it.id"
              ></el-option>
            </el-select>
            <el-select
              v-else
              style="width: 100%"
              placeholder="请选择优惠券"
              v-model="item.coupon_id"
              @change="(id) => rewardChange(id, item.type, index)"
            >
              <el-option
                v-for="it in couponData"
                :label="it.name + '（有效期：' + it.valid_at + '）'"
                :value="it.id"
              ></el-option>
            </el-select>
            <span v-if="item.coupon_id"
              >奖励有效期：{{ item.reward_valid_at }}</span
            >
          </el-card>
          <el-button @click="addReward" type="success">新增奖励</el-button>
        </el-form-item>
        <el-form-item label="发起邀请页面活动主图">
          <el-upload
            :file-list="detailSendMainImage"
            :class="{ img_hide: formData.send_main_image }"
            :limit="1"
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="(value) => upLoadImage(value, 1)"
            :on-preview="handlePictureCardPreview"
            :on-remove="(value) => handleImageRemove(1)"
            :data="{ token: $store.state.user.token }"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="发起邀请页面邀请成功图">
          <el-upload
            :file-list="detailSendSuccessImage"
            :class="{ img_hide: formData.send_success_image }"
            :limit="1"
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="(value) => upLoadImage(value, 2)"
            :on-preview="handlePictureCardPreview"
            :on-remove="(value) => handleImageRemove(2)"
            :data="{ token: $store.state.user.token }"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="发起邀请页面活动规则图">
          <el-upload
            :file-list="detailSendRuleImage"
            :class="{ img_hide: formData.send_rule_image }"
            :limit="1"
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="(value) => upLoadImage(value, 3)"
            :on-preview="handlePictureCardPreview"
            :on-remove="(value) => handleImageRemove(3)"
            :data="{ token: $store.state.user.token }"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="受邀页面活动主图">
          <el-upload
            :file-list="detailReceiveMainImage"
            :class="{ img_hide: formData.receive_main_image }"
            :limit="1"
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="(value) => upLoadImage(value, 4)"
            :on-preview="handlePictureCardPreview"
            :on-remove="(value) => handleImageRemove(4)"
            :data="{ token: $store.state.user.token }"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="受邀页面活动规则图">
          <el-upload
            :file-list="detailReceiveRuleImage"
            :class="{ img_hide: formData.receive_rule_image }"
            :limit="1"
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="(value) => upLoadImage(value, 5)"
            :on-preview="handlePictureCardPreview"
            :on-remove="(value) => handleImageRemove(5)"
            :data="{ token: $store.state.user.token }"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="老用户图">
          <el-upload
            :file-list="detailOlderImage"
            :class="{ img_hide: formData.older_image }"
            :limit="1"
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="(value) => upLoadImage(value, 6)"
            :on-preview="handlePictureCardPreview"
            :on-remove="(value) => handleImageRemove(6)"
            :data="{ token: $store.state.user.token }"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-row type="flex" class="row-bg" justify="end">
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-row>
      </el-form>
    </el-card>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { addApi } from "@/api/operate/c_active/pull_new";
import { couponData } from "@/api/operate/questionnaire";
export default {
  data() {
    return {
      formData: {
        name: "",
        people_num: "",
        valid_at_start: "",
        valid_at_end: "",
        send_main_image: "",
        send_success_image: "",
        send_rule_image: "",
        receive_main_image: "",
        receive_rule_image: "",
        older_image: "",
        reward_data: [],
      },
      effective_date: "",
      dialogImageUrl: "",
      dialogVisible: false,
      redEnvelopesData: [],
      couponData: [],
      timeCardData: [],
    };
  },
  created() {
    this.getCouponData();
  },
  methods: {
    getCouponData() {
      couponData({ type: 3 }).then((res) => {
        this.redEnvelopesData = res;
      });
      couponData({ type: 4 }).then((res) => {
        this.couponData = res;
      });
      couponData({ type: 5 }).then((res) => {
        this.timeCardData = res;
      });
    },
    rewardChange(id, type, index) {
      if (type == 1) {
        let rewardItem = this.redEnvelopesData.find((item) => item.id == id);
        this.formData.reward_data[index].coupon_name = rewardItem.name;
        this.formData.reward_data[index].reward_valid_at = rewardItem.valid_at;
      } else if (type == 2) {
        let rewardItem = this.timeCardData.find((item) => item.id == id);
        this.formData.reward_data[index].coupon_name = rewardItem.name;
        this.formData.reward_data[index].reward_valid_at = rewardItem.valid_at;
      } else {
        let rewardItem = this.couponData.find((item) => item.id == id);
        this.formData.reward_data[index].coupon_name = rewardItem.name;
        this.formData.reward_data[index].reward_valid_at = rewardItem.valid_at;
      }
    },
    //上传活动图片
    upLoadImage(res, type) {
      if (res.status) {
        switch (type) {
          case 1:
            this.formData.send_main_image = res.data.image_url;
            break;
          case 2:
            this.formData.send_success_image = res.data.image_url;
            break;
          case 3:
            this.formData.send_rule_image = res.data.image_url;
            break;
          case 4:
            this.formData.receive_main_image = res.data.image_url;
            break;
          case 5:
            this.formData.receive_rule_image = res.data.image_url;
            break;
          case 6:
            this.formData.older_image = res.data.image_url;
            break;
        }
      }
    },
    //删除活动图片
    handleImageRemove(type) {
      switch (type) {
        case 1:
          this.formData.send_main_image = "";
          break;
        case 2:
          this.formData.send_success_image = "";
          break;
        case 3:
          this.formData.send_rule_image = "";
          break;
        case 4:
          this.formData.receive_main_image = "";
          break;
        case 5:
          this.formData.receive_rule_image = "";
          break;
        case 6:
          this.formData.older_image = "";
          break;
      }
    },
    //上传奖励图
    upLoadRewardImage(index, res) {
      if (res.status) {
        this.formData.reward_data[index].image = res.data.image_url;
      }
    },
    //删除奖励图
    handleRewardImageRemove(index) {
      this.formData.reward_data[index].image = "";
    },
    //查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //新增奖励
    addReward() {
      this.formData.reward_data.push({
        type: "1",
        coupon_id: "",
        coupon_name: "",
        image: "",
      });
    },
    //删除奖励
    deleteReward(index) {
      this.formData.reward_data.splice(index, 1);
    },
    //提交
    onSubmit() {
      if (this.effective_date) {
        this.formData.valid_at_start = this.effective_date[0];
        this.formData.valid_at_end = this.effective_date[1];
      }
      let aData = JSON.parse(JSON.stringify(this.formData));
      aData.reward_data = JSON.stringify(aData.reward_data);
      addApi(aData).then((res) => {
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