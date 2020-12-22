<template>
  <div class="app-container">
    <h2>新增首页banner</h2>
    <el-form label-width="80px">
      <el-form-item label="图片">
        <el-upload
          :file-list="detailImgFile"
          :class="{ main_img_hide: formData.image }"
          :limit="1"
          :action="$upLoadImgApi"
          list-type="picture-card"
          :on-success="upLoadMainImg"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleMainImgRemove"
          :data="{ token: $store.state.user.token }"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="轮播位置">
        <el-input placeholder="请输入图片轮播的位置"></el-input>
        <span class="form_tip">注：如果轮播位置为空，则默认为最后一张轮播图片</span>
      </el-form-item>
      <el-form-item label="位置地址">
        <el-input placeholder="请输入图片跳转页面的地址"></el-input>
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
export default {
  data() {
    return {
      formData: {
        id: "",
        image: "",
        order: "",
        address: "",
      },
      dialogVisible: false,
      dialogImageUrl: "",
    };
  },
  methods: {
    //上传图片
    upLoadMainImg(res, file) {
      if (res.status) {
        this.formData.image = res.data.image_url;
      }
    },
    //查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //删除图片
    handleMainImgRemove(file, fileList) {
      this.formData.image = "";
    },
  },
};
</script>

<style>
.main_img_hide .el-upload--picture-card {
  display: none;
}
</style>