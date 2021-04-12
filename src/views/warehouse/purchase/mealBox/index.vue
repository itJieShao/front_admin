<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="24" style="display: flex; justify-content: flex-end">
        <el-button type="success" @click="openDialog">添加模板</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="list" style="width: 100%">
      <el-table-column align="center" label="餐盒模版名称">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="图片">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="goDetail(scope.row.id)"
            >编辑</el-button
          >
          <el-button size="mini" @click="goDetail(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增模板餐盒" :visible.sync="dialogFlag">
      <el-form label-width="100px">
        <el-form-item label="餐盒模版名称">
          <el-input
            type="password"
            placeholder="请输入模版名称"
            v-model="name"
          ></el-input>
        </el-form-item>
        <el-form-item label="餐盒图片">
          <p>第1个盒子</p>
          <el-upload
            :file-list="detailImagesFile"
            multiple
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="upLoadImg"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { purchaseList } from "@/api/warehouse";
export default {
  data() {
    return {
      name: "",
      images: [],
      dialogFlag: false,
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    openDialog() {
      this.dialogFlag = true;
    },
    //上传图片
    upLoadImg(res, file, fileList) {
      if (res.status) {
        this.images.push(res.data.image_url);
      }
    },
    //查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //删除图片
    handleRemove(file, fileList) {
      const index = this.images.findIndex((item) => item == file.url);
      this.images.splice(index, 1);
    },
  },
};
</script>

<style>
</style>