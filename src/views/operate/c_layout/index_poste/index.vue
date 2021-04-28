<template>
  <div class="app-container">
    <h2>首页海报推广图</h2>
    <el-form label-width="80px">
      <el-form-item label="图片">
        <el-upload
          :file-list="detailImgFile"
          :class="{ main_img_hide: image }"
          :limit="1"
          :action="$upLoadImgApi"
          list-type="picture-card"
          :on-success="upLoadMainImg"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleMainImgRemove"
          :data="{ token: $store.state.user.token, upload_type: 11 }"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="弹起日期">
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-row type="flex" class="row-bg" justify="end">
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-row>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { getPopup, updatePopup } from "@/api/operate/c_layout/banner";
export default {
  data() {
    return {
      image: "",
      time: [],
      start_time: "",
      end_time: "",
      dialogImageUrl: "",
      dialogVisible: false,
      detailImgFile: [],
    };
  },
  watch: {
    time(val) {
      console.log(val);
      this.start_time = val[0];
      this.end_time = val[1];
    },
  },
  created() {
    this.getPopup();
  },
  methods: {
    getPopup() {
      getPopup().then((res) => {
        this.image = res.image;
        this.start_time = res.start_time;
        this.end_time = res.end_time;
        this.$set(this.time, 0, res.start_time);
        this.$set(this.time, 1, res.end_time);
        this.detailImgFile = [{ name: "detailImgFile", url: res.image }];
      });
    },
    //上传图片
    upLoadMainImg(res, file) {
      if (res.status) {
        this.image = res.data.image_url;
      }
    },
    //查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //删除图片
    handleMainImgRemove(file, fileList) {
      this.image = "";
    },
    onSubmit() {
      let aData = {
        image: this.image,
        start_time: this.start_time,
        end_time: this.end_time,
      };
      updatePopup(aData).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "保存成功",
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
.main_img_hide .el-upload--picture-card {
  display: none;
}
</style>