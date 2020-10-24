<template>
  <div class="app-container">
    <h2>{{ $route.query.supplier_id ? "编辑供应商" : "新增供应商" }}</h2>
    <el-card shadow="always">
      <el-form label-width="130px">
        <el-form-item label="照片">
          <el-upload
            :file-list="detailImagesFile"
            multiple
            :limit="9"
            action="/vendor/vendor/upload_image"
            list-type="picture-card"
            :on-success="upLoadImg"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="供应商名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>

        <el-form-item label="类型">
          <el-select
            style="width: 100%"
            v-model="formData.type"
            filterable
            placeholder="请选择套餐标签"
          >
            <el-option
              v-for="item in typeList"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="统一社会信用代码">
          <el-input v-model="formData.code"></el-input>
        </el-form-item>

        <el-form-item label="食品许可证">
          <el-input v-model="formData.food_permit"></el-input>
        </el-form-item>

        <el-form-item label="其他证件">
          <el-input v-model="formData.other_permit"></el-input>
        </el-form-item>

        <el-form-item label="联系人">
          <el-input v-model="formData.contacts"></el-input>
        </el-form-item>

        <el-form-item label="联系电话">
          <div
            class="phone_item"
            v-for="(item, index) in formData.contact_moblie"
            :key="index"
          >
            <el-input v-model="item.phone"></el-input>
            <div class="phone_item_icon">
              <i
                class="el-icon-remove-outline"
                v-if="formData.contact_moblie.length > 1"
                @click="reducePhone(index)"
              ></i>
              <i
                class="el-icon-circle-plus-outline"
                v-if="formData.contact_moblie.length - 1 == index"
                @click="addPhone"
              ></i>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="公司地址">
          <el-input
            type="textarea"
            placeholder="请输入公司地址"
            v-model="formData.address"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="仓库地址">
          <el-input
            type="textarea"
            placeholder="请输入仓库地址"
            v-model="formData.warehouse_address"
          >
          </el-input>
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
import { supplierDetail, updateSupplier } from "@/api/warehouse";
export default {
  data() {
    return {
      formData: {
        image: [],
        name: "",
        type: "",
        code: "",
        food_permit: "",
        other_permit: "",
        contacts: "",
        contact_moblie: [{ phone: "" }],
        address: "",
        warehouse_address: "",
      }, //表单提交数据
      typeList: [
        { type: 1, name: "材料供应商" },
        { type: 2, name: "调料供应商" },
        { type: 3, name: "包装供应商" },
      ],
      dialogImageUrl: "",
      dialogVisible: false,
      detailImagesFile: [],
    };
  },
  created() {
    if (this.$route.query.supplier_id) {
      this.formData.supplier_id = this.$route.query.supplier_id;
      this.getDetail();
    }
  },
  methods: {
    //供应商详情
    getDetail() {
      supplierDetail({ supplier_id: this.$route.query.supplier_id }).then(
        (res) => {
          res.name = res.supplier_name;
          let contact_moblie = [];
          res.contact_moblie.forEach((item) => {
            contact_moblie.push({ phone: item });
          });
          res.contact_moblie = contact_moblie;
          if (res.image.length > 0) {
            let imgsArr = [];
            res.image.forEach((item, index) => {
              imgsArr.push({ name: `detailImagesFile${index}`, url: item });
            });
            this.detailImagesFile = imgsArr;
          }
          this.formData = res;
        }
      );
    },
    reducePhone(index) {
      if (this.formData.contact_moblie.length === 1) {
        return;
      }
      this.formData.contact_moblie.splice(index, 1);
    },
    addPhone() {
      this.formData.contact_moblie.unshift({ phone: "" });
    },
    //提交
    onSubmit() {
      let aData = JSON.parse(JSON.stringify(this.formData)),
        phoneArr = [];
      aData.contact_moblie.forEach((item) => phoneArr.push(item.phone));
      aData.contact_moblie = phoneArr;
      updateSupplier(aData).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "提交成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.$router.go(-1);
            },
          });
        }
      });
    },
    //删除图片
    handleRemove(file, fileList) {
      const index = this.formData.image.findIndex((item) => item == file.url);
      this.formData.image.splice(index, 1);
      console.log(this.formData.image);
    },
    //查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传图片
    upLoadImg(res, file, fileList) {
      if (res.status) {
        this.formData.image.push(res.data.image_url);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.phone_item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  .phone_item_icon {
    width: 80px;
    display: flex;
    font-size: 26px;
    margin-left: 10px;
    .el-icon-remove-outline {
      cursor: pointer;
      color: red;
    }
    .el-icon-circle-plus-outline {
      cursor: pointer;
      color: blue;
      margin-left: 10px;
    }
  }
}
</style>