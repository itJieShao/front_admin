<template>
  <div class="app-container">
    <h2>新增打赏活动</h2>
    <el-card shadow="always">
      <el-form label-width="150px">
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
        <el-form-item label="打赏好友数量">
          <el-input
            placeholder="请输入好友打赏数量"
            v-model="formData.people_num"
          ></el-input>
        </el-form-item>
        <el-form-item label="打赏金额">
          <el-input
            placeholder="请输入打赏金额"
            v-model="formData.price"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动奖励">
          <el-radio-group v-model="type" @change="formData.coupon_id = ''">
            <el-radio label="1">红包</el-radio>
            <el-radio label="3">优惠券</el-radio>
            <el-radio label="2">次数卡</el-radio>
          </el-radio-group>
          <el-select
            v-if="type == 1"
            style="width: 100%"
            placeholder="请选择红包"
            v-model="formData.coupon_id"
            @change="(id) => rewardChange(id, type)"
          >
            <el-option
              v-for="it in redEnvelopesData"
              :label="it.name + '（有效期：' + it.valid_at + '）'"
              :value="it.id"
            ></el-option>
          </el-select>
          <el-select
            v-else-if="type == 2"
            style="width: 100%"
            placeholder="请选择次数卡"
            v-model="formData.coupon_id"
            @change="(id) => rewardChange(id, type)"
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
            v-model="formData.coupon_id"
            @change="(id) => rewardChange(id, type)"
          >
            <el-option
              v-for="it in couponData"
              :label="it.name + '（有效期：' + it.valid_at + '）'"
              :value="it.id"
            ></el-option>
          </el-select>
          <span v-if="formData.coupon_id"
            >奖励有效期：{{ formData.reward_valid_at }}</span
          >
        </el-form-item>
        <el-form-item label="发起打赏邀请用户">
          <el-card class="up-card" shadow="always">
            <div class="up-box">
              <p>邀请文案</p>
              <el-upload
                :class="{ img_hide: formData.check_invite_image }"
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
            </div>
            <div class="up-box">
              <p>订单详情邀请弹窗图片</p>
              <el-upload
                :class="{ img_hide: formData.first_invite_image }"
                :limit="1"
                :action="$upLoadImgApi"
                list-type="picture-card"
                :on-success="(value) => upLoadImage(value, 7)"
                :on-preview="handlePictureCardPreview"
                :on-remove="(value) => handleImageRemove(7)"
                :data="{ token: $store.state.user.token }"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
            <div class="up-box">
              <p>邀请中/邀请成功文案</p>
              <el-upload
                :class="{ img_hide: formData.detail_invite_image }"
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
            </div>
            <div class="up-box">
              <p>活动邀请失败</p>
              <el-upload
                :file-list="detailSendSuccessImage"
                :class="{ img_hide: formData.invite_failure_image }"
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
            </div>
          </el-card>
        </el-form-item>
        <el-form-item label="土豪打赏用户">
          <el-card class="up-card" shadow="always">
            <div class="up-box">
              <p>打赏订单邀请</p>
              <el-upload
                :file-list="detailSendMainImage"
                :class="{ img_hide: formData.exceptional_image }"
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
            </div>
            <div class="up-box">
              <p>打赏订单已打赏</p>
              <el-upload
                :file-list="detailSendSuccessImage"
                :class="{ img_hide: formData.exceptional_success_image }"
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
            </div>
            <div class="up-box">
              <p>打赏失效</p>
              <el-upload
                :class="{ img_hide: formData.exceptional_failure_image }"
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
            </div>
          </el-card>
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
import { addApi } from "@/api/operate/c_active/reward";
import { couponData } from "@/api/operate/questionnaire";
export default {
  data() {
    return {
      formData: {
        name: "",
        people_num: "",
        price: "",
        valid_at_start: "",
        valid_at_end: "",
        coupon_id: "",
        check_invite_image: "",
        detail_invite_image: "",
        invite_failure_image: "",
        exceptional_image: "",
        exceptional_success_image: "",
        exceptional_failure_image: "",
        first_invite_image: "",
      },
      type: "1",
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
    rewardChange(id, type) {
      if (type == 1) {
        let rewardItem = this.redEnvelopesData.find((item) => item.id == id);
        this.formData.coupon_name = rewardItem.name;
        this.formData.reward_valid_at = rewardItem.valid_at;
      } else if (type == 2) {
        let rewardItem = this.timeCardData.find((item) => item.id == id);
        this.formData.coupon_name = rewardItem.name;
        this.formData.reward_valid_at = rewardItem.valid_at;
      } else {
        let rewardItem = this.couponData.find((item) => item.id == id);
        this.formData.coupon_name = rewardItem.name;
        this.formData.reward_valid_at = rewardItem.valid_at;
      }
    },
    //上传活动图片
    upLoadImage(res, type) {
      if (res.status) {
        switch (type) {
          case 1:
            this.formData.check_invite_image = res.data.image_url;
            break;
          case 2:
            this.formData.detail_invite_image = res.data.image_url;
            break;
          case 3:
            this.formData.invite_failure_image = res.data.image_url;
            break;
          case 4:
            this.formData.exceptional_image = res.data.image_url;
            break;
          case 5:
            this.formData.exceptional_success_image = res.data.image_url;
            break;
          case 6:
            this.formData.exceptional_failure_image = res.data.image_url;
            break;
          case 7:
            this.formData.first_invite_image = res.data.image_url;
            break;
        }
      }
    },
    //删除活动图片
    handleImageRemove(type) {
      switch (type) {
        case 1:
          this.formData.check_invite_image = "";
          break;
        case 2:
          this.formData.detail_invite_image = "";
          break;
        case 3:
          this.formData.invite_failure_image = "";
          break;
        case 4:
          this.formData.exceptional_image = "";
          break;
        case 5:
          this.formData.exceptional_image = "";
          break;
        case 6:
          this.formData.exceptional_failure_image = "";
          break;
        case 7:
          this.formData.first_invite_image = "";
          break;
      }
    },
    //查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //提交
    onSubmit() {
      if (this.effective_date) {
        this.formData.valid_at_start = this.effective_date[0];
        this.formData.valid_at_end = this.effective_date[1];
      }
      let aData = JSON.parse(JSON.stringify(this.formData));
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
.up-card .el-card__body {
  display: flex;
}
.up-box {
  text-align: center;
  margin-right: 20px;
}
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