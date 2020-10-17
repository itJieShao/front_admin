<template>
  <div class="app-container">
    <h2>{{ $route.query.package_id ? "编辑预设单品" : "新增预设单品" }}</h2>
    <el-card shadow="always">
      <el-form label-width="100px">
        <el-form-item label="单品标题">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="单品主图">
          <el-upload
            :file-list="detailImagesFile"
            multiple
            action="/vendor/vendor/upload_image"
            list-type="picture-card"
            :on-success="upLoadImg"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-divider />
        <el-form-item label="标签" style="margin-top: 35px">
          <el-select
            style="width: 100%"
            v-model="formData.package_label_id"
            filterable
            placeholder="请选择标签"
          >
            <el-option
              v-for="item in labelList"
              :key="item.package_label_id"
              :label="item.package_label_name"
              :value="item.package_label_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="包装规格" style="margin-top: 35px">
          <el-select
            style="width: 100%"
            v-model="formData.package_label_id"
            filterable
            placeholder="请选择包装规格"
          >
            <el-option
              v-for="item in labelList"
              :key="item.package_label_id"
              :label="item.package_label_name"
              :value="item.package_label_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="味型" style="margin-top: 35px">
          <el-select
            style="width: 100%"
            v-model="formData.package_label_id"
            filterable
            placeholder="请选择味型"
          >
            <el-option
              v-for="item in labelList"
              :key="item.package_label_id"
              :label="item.package_label_name"
              :value="item.package_label_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成本预警价">
          <el-input v-model="formData.sale_price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="基础成本价">
          <el-input v-model="formData.sale_price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="供应商" style="margin-top: 35px">
          <el-select
            style="width: 100%"
            v-model="formData.package_label_id"
            filterable
            placeholder="请选择供应商"
          >
            <el-option
              v-for="item in labelList"
              :key="item.package_label_id"
              :label="item.package_label_name"
              :value="item.package_label_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-divider />
        <el-form-item label="加工指标">
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入加工指标内容"
            v-model="formData.desc"
          >
          </el-input>
        </el-form-item>
        <el-divider />
        <el-form-item label="质量标准">
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入质量标准内容"
            v-model="formData.desc"
          >
          </el-input>
        </el-form-item>
        <el-divider />
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="材料">
              <el-button type="success" @click="dialogTableVisible = true"
                >添加</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="formData.product_data.length > 0">
            <el-card shadow="always">
              <div>
                <div class="item_title">
                  <p>单品</p>
                  <p>数量</p>
                </div>
                <el-divider />
                <div
                  class="item_content"
                  v-for="(item, index) in formData.product_data"
                  :key="index"
                >
                  <p>{{ item.product_name }}</p>
                  <el-input-number
                    v-model="item.product_num"
                    :min="1"
                    :max="10"
                  ></el-input-number>
                  <i @click="deleteProduct(index)" class="el-icon-delete"></i>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-divider />
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="调料">
              <el-button type="success" @click="dialogTableVisible = true"
                >添加</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="formData.product_data.length > 0">
            <el-card shadow="always">
              <div>
                <div class="item_title">
                  <p>单品</p>
                  <p>数量</p>
                </div>
                <el-divider />
                <div
                  class="item_content"
                  v-for="(item, index) in formData.product_data"
                  :key="index"
                >
                  <p>{{ item.product_name }}</p>
                  <el-input-number
                    v-model="item.product_num"
                    :min="1"
                    :max="10"
                  ></el-input-number>
                  <i @click="deleteProduct(index)" class="el-icon-delete"></i>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-divider />
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="温度曲线">
              <el-button type="success" @click="dialogTableVisible = true"
                >添加</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="formData.product_data.length > 0">
            <el-card shadow="always">
              <div>
                <div class="item_title">
                  <p>单品</p>
                  <p>数量</p>
                </div>
                <el-divider />
                <div
                  class="item_content"
                  v-for="(item, index) in formData.product_data"
                  :key="index"
                >
                  <p>{{ item.product_name }}</p>
                  <el-input-number
                    v-model="item.product_num"
                    :min="1"
                    :max="10"
                  ></el-input-number>
                  <i @click="deleteProduct(index)" class="el-icon-delete"></i>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-divider />
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
import {
  updatePackage,
  productList,
  packageLabelList,
  packageDetail,
} from "@/api/basic";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      formData: {
        name: "",
        main_image: "",
        image: [],
        product_data: [],
        package_label_id: "",
        sale_price: "",
        desc: "",
      }, //表单提交数据
      checkedProductData: [],
      productListData: {
        export: "",
        name: "",
        page: 1,
        page_size: 5,
      },
      labelList: [],
      productList: [],
      total: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      dialogTableVisible: false,
    };
  },
  components: { Pagination },
  computed: {
    detailMainImgFile() {
      if (this.formData.main_image) {
        return [{ name: "detailMainImgFile", url: this.formData.main_image }];
      }
    },
    detailImagesFile() {
      let imgsArr = [];
      this.formData.image.forEach((item, index) => {
        imgsArr.push({ name: `detailImagesFile${index}`, url: item });
      });
      return imgsArr;
    },
  },
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
          console.log(res);
        }
      );
    },
    //预设单品标签列表
    getLabelList() {
      packageLabelList().then((res) => {
        console.log(res);
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
            duration: 1500,
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
.item_title p:first-child {
  margin-left: -40px;
}
.item_title p:last-child {
  margin-left: -60px;
}
.item_content {
  margin-bottom: 20px;
  align-items: center;
}
.el-input-number {
  flex: 1;
}
.el-icon-delete {
  margin-left: 20px;
  cursor: pointer;
}
.main_img_hide .el-upload--picture-card {
  display: none;
}
</style>