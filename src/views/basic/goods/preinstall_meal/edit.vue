<template>
  <div class="app-container">
    <h2>{{ $route.query.package_id ? "编辑预设套餐" : "新增预设套餐" }}</h2>
    <el-card shadow="always">
      <el-form label-width="100px" :model="formData" :rules="rules">
        <el-form-item label="套餐标题" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="套餐主图" prop="main_image">
          <el-upload
            :file-list="detailMainImgFile"
            :class="{ main_img_hide: formData.main_image }"
            :limit="1"
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="upLoadMainImg"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleMainImgRemove"
            :data="{ token: $store.state.user.token, upload_type: 2 }"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="主推广告图">
          <el-upload
            :file-list="detailMainPushImgFile"
            :class="{ main_img_hide: formData.main_push_image }"
            :limit="1"
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="upLoadMainPushImg"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleMainPushImgRemove"
            :data="{ token: $store.state.user.token, upload_type: 2 }"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="加购图">
          <el-upload
            :file-list="detailPurchasedImage"
            :class="{ main_img_hide: formData.purchased_image }"
            :limit="1"
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="upLoadPurchasedImage"
            :on-preview="handlePictureCardPreview"
            :on-remove="handlePurchasedImageRemove"
            :data="{ token: $store.state.user.token, upload_type: 2 }"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="套餐轮播图" prop="images">
          <el-upload
            :file-list="detailImagesFile"
            multiple
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="upLoadImg"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :data="{ token: $store.state.user.token, upload_type: 2 }"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-divider />
        <div style="display: flex">
          <el-form-item label="套餐单品" prop="product_data">
            <el-button
              v-if="formData.product_can_edit"
              type="success"
              @click="dialogTableVisible = true"
              >添加套餐单品</el-button
            >
          </el-form-item>
          <el-card
            style="flex: 1; margin: 0 20px"
            shadow="always"
            v-show="formData.product_data.length > 0"
          >
            <div style="padding-right: 50px">
              <div class="item_title">
                <p>单品</p>
                <p>包装规格</p>
                <p>数量</p>
              </div>
              <el-divider />
              <div
                class="item_content"
                v-for="(item, index) in formData.product_data"
                :key="index"
              >
                <p>{{ item.product_name }}</p>
                <p>{{ item.package_box_name }}</p>
                <el-input-number
                  v-if="formData.product_can_edit"
                  :min="1"
                  v-model="item.product_num"
                ></el-input-number>
                <p v-else>{{ item.product_num }}</p>
                <i
                  v-if="formData.product_can_edit"
                  @click="deleteProduct(index)"
                  class="el-icon-delete del_btn"
                ></i>
              </div>
            </div>
          </el-card>
        </div>
        <el-form-item label="套餐标签" style="margin-top: 35px">
          <el-select
            style="width: 100%"
            v-model="formData.package_label_id"
            filterable
            placeholder="请选择套餐标签"
          >
            <el-option
              v-for="item in labelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="建议销售价" prop="sale_price">
          <el-input v-model="formData.sale_price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-divider />
        <el-form-item label="套餐内容">
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入套餐内容"
            v-model="formData.desc"
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
    <el-dialog
      width="60%"
      center
      title="预设单品列表"
      :visible.sync="dialogTableVisible"
    >
      <el-table
        ref="multipleTable"
        :data="productList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          align="center"
          property="id"
          label="单品ID"
          width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          property="name"
          label="单品名称"
          width="200"
        ></el-table-column>
        <el-table-column
          align="center"
          property="category_name"
          label="分类"
        ></el-table-column>
        <el-table-column
          align="center"
          property="package_box_name"
          label="包装规格"
        ></el-table-column>
        <el-table-column
          align="center"
          property="taste_name"
          label="味型"
        ></el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="productListData.page"
        :limit.sync="productListData.page_size"
        @pagination="getProductList"
      />
      <el-row style="margin-top: 20px" type="flex" class="row-bg" justify="end">
        <el-button @click="addPackage" type="success">添加到套餐</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { updatePackage, productList, packageDetail } from "@/api/basic";
import { categoryData } from "@/api/system/category";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入套餐标题", trigger: "blur" }],
        main_image: [{ required: true }],
        images: [{ required: true }],
        product_data: [{ required: true }],
        sale_price: [
          { required: true, message: "请输入建议销售价", trigger: "blur" },
        ],
      },
      formData: {
        name: "",
        title: "",
        main_image: "",
        main_push_image: "",
        purchased_image:"",
        image: [],
        product_data: [],
        package_label_id: "",
        sale_price: "",
        desc: "",
        product_can_edit: 1,
      }, //表单提交数据
      checkedProductData: [],
      productListData: {
        export: "",
        name: "",
        page: 1,
        page_size: 10,
        status: 1,
      },
      labelList: [],
      productList: [],
      total: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      dialogTableVisible: false,
      detailMainImgFile: [],
      detailMainPushImgFile: [],
      detailPurchasedImage:[],
      detailImagesFile: [],
    };
  },
  components: { Pagination },
  created() {
    if (this.$route.query.package_id) {
      this.formData.package_id = this.$route.query.package_id;
      this.getDetail();
    }
    this.getProductList();
    this.getLabelList();
  },
  methods: {
    //预设套餐详情
    getDetail() {
      packageDetail({ package_id: this.$route.query.package_id }).then(
        (res) => {
          this.formData = res;
          if (res.main_image) {
            this.detailMainImgFile = [
              { name: "detailMainImgFile", url: res.main_image },
            ];
          }
          if (res.main_push_image) {
            this.detailMainPushImgFile = [
              { name: "detailMainPushImgFile", url: res.main_push_image },
            ];
          }
          if (res.purchased_image) {
            this.detailPurchasedImage = [
              { name: "detailPurchasedImage", url: res.purchased_image },
            ];
          }
          if (res.image.length > 0) {
            let imgsArr = [];
            res.image.forEach((item, index) => {
              imgsArr.push({ name: `detailImagesFile${index}`, url: item });
            });
            this.detailImagesFile = imgsArr;
          }
          if (res.product_data.length) {
            res.product_data.forEach((item) => {
              item.package_box_name = item.product_package_box_name;
              delete item.product_package_box_name;
            });
          }
        }
      );
    },
    //预设套餐标签列表
    getLabelList() {
      categoryData({ type: 1 }).then((res) => {
        this.labelList = res;
      });
    },
    //预设单品列表
    getProductList() {
      productList(this.productListData).then((res) => {
        this.productList = res.list;
        this.total = res.count;
      });
    },
    //添加到套餐
    addPackage() {
      if (!this.checkedProductData.length) {
        return this.$message({
          message: "请先选择要添加到套餐的单品",
          type: "error",
          duration: 1000,
        });
      }
      let product_data = this.formData.product_data.concat(
          this.checkedProductData
        ),
        result = [],
        temp = {};
      product_data.map((item, index) => {
        if (!temp[item.product_id]) {
          result.push(item);
          temp[item.product_id] = true;
        }
      });
      this.formData.product_data = result;
      this.$refs.multipleTable.clearSelection();
      this.dialogTableVisible = false;
    },
    //提交
    onSubmit() {
      updatePackage(this.formData).then((res) => {
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
    //删除主图
    handleMainImgRemove(file, fileList) {
      this.formData.main_image = "";
    },
    //删除主推广告图
    handleMainPushImgRemove(file, fileList) {
      this.formData.main_push_image = "";
    },
    //删除加购图
    handlePurchasedImageRemove(file, fileList) {
      this.formData.purchased_image = "";
    },
    //删除轮播图
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
    //预设单品列表选择
    handleSelectionChange(val) {
      let checkedProductData = [];
      val.forEach((item) => {
        checkedProductData.push({
          product_id: item.id,
          product_name: item.name,
          package_box_name: item.package_box_name,
          product_num: 1,
        });
      });
      this.checkedProductData = checkedProductData;
    },
    //删除预设单品
    deleteProduct(index) {
      this.formData.product_data.splice(index, 1);
    },
    //上传主图
    upLoadMainImg(res, file) {
      if (res.status) {
        this.formData.main_image = res.data.image_url;
      }
    },
    //上传主推广告图
    upLoadMainPushImg(res, file) {
      if (res.status) {
        this.formData.main_push_image = res.data.image_url;
      }
    },
    //上传加购图
    upLoadPurchasedImage(res, file) {
      if (res.status) {
        this.formData.purchased_image = res.data.image_url;
      }
    },
    //上传轮播图
    upLoadImg(res, file, fileList) {
      if (res.status) {
        this.formData.image.push(res.data.image_url);
      }
    },
  },
};
</script>
<style lang="scss">
p {
  margin: 0;
}
.item_title,
.item_content {
  width: 100%;
  display: flex;
  p {
    display: flex;
    justify-content: center;
    flex: 1;
  }
}
.item_content {
  position: relative;
  margin-bottom: 20px;
  align-items: center;
}
.el-input-number {
  flex: 1;
}
.del_btn {
  right: -45px;
  position: absolute;
  cursor: pointer;
}
.main_img_hide .el-upload--picture-card {
  display: none;
}
</style>