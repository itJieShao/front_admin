<template>
  <div class="app-container">
    <h2>
      {{ $route.query.id ? "编辑门店优惠促销公告" : "新增门店优惠促销公告" }}
    </h2>
    <el-form label-width="100px">
      <el-form-item label="门店">
        <el-select
          style="width: 100%;"
          v-model="formData.vendor_id"
          filterable
          placeholder="请选择门店"
        >
          <el-option
            v-for="item in storeList"
            :key="item.vendor_id"
            :label="item.vendor_name"
            :value="item.vendor_id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-card
        style="position: relative; margin-bottom: 15px"
        shadow="always"
        v-for="(item, index) in formData.data"
        :key="index"
      >
        <el-form-item label="标题图片">
          <i
            v-if="formData.data.length > 1"
            @click="delItem(index)"
            style="position: absolute; right: 0; color: red; cursor: pointer"
            class="el-icon-delete"
          ></i>
          <el-upload
            :file-list="item.detailImgFile"
            :class="{ main_img_hide: item.title_image }"
            :limit="1"
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="(res, index) => upLoadMainImg(res, index)"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleMainImgRemove"
            :data="{ token: $store.state.user.token }"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="标题">
          <Editor
            @getNewHtml="(content, index) => getNewHtml1(content, index)"
            :className="'editor1' + index"
            :value="item.title"
          />
        </el-form-item>
        <el-form-item label="优惠内容">
          <Editor
            @getNewHtml="(content, index) => getNewHtml2(content, index)"
            :className="'editor2' + index"
            :value="item.content"
          />
        </el-form-item>
      </el-card>
    </el-form>
    <el-button type="success" @click="addNewNotice"
      >添加新优惠促销公告</el-button
    >
    <el-row type="flex" class="row-bg" justify="end">
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-row>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { searchStoreList } from "@/api/basic";
import Editor from "@/components/Editor";
export default {
  components: { Editor },
  data() {
    return {
      formData: {
        vendor_id: "",
        data: [{}],
      },
      newHtml: "",
      storeList: [],
      dialogVisible: false,
      dialogImageUrl: "",
      detailImgFile: [],
    };
  },
  created() {
    this.getStoreList();
  },
  methods: {
    getNewHtml1(content, index) {
      this.$set(this.formData.data[index], "title", content);
    },
    getNewHtml2(content, index) {
      this.$set(this.formData.data[index], "content", content);
    },
    //门店下拉列表
    getStoreList() {
      searchStoreList().then((res) => {
        this.storeList = res;
      });
    },
    //上传图片
    upLoadMainImg(res, index) {
      if (res.status) {
        this.$set(this.formData.data[index], "title_image", res.data.image_url);
      }
    },
    //查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //删除图片
    handleMainImgRemove() {
      this.$set(this.formData.data[index], "title_image", "");
    },
    addNewNotice() {
      this.formData.data.push({});
    },
    delItem(index) {
      this.formData.data.splice(index, 1);
    },
  },
};
</script>
<style>
.main_img_hide .el-upload--picture-card {
  display: none;
}
</style>