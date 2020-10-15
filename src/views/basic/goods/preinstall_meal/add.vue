<template>
  <div class="app-container">
    <h2>新增预设套餐</h2>
    <el-card shadow="always">
      <el-form ref="formData" :model="formData" label-width="100px">
        <el-form-item label="套餐标题">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="套餐主图">
          <el-upload
            v-show="!formData.main_image"
            action="/vendor/vendor/upload_image"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :data={token:$store.state.user.token}
          >
          
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="套餐轮播图">
          <el-upload
            action="/vendor/vendor/upload_image"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-divider />
        <el-row gutter="20">
          <el-col :span="5">
            <el-form-item label="套餐单品">
              <el-button type="success" @click="dialogTableVisible = true"
                >添加套餐单品</el-button
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
                  <p>{{ item.name }}</p>
                  <el-input-number
                    v-model="item.num"
                    :min="1"
                    :max="10"
                  ></el-input-number>
                  <i @click="deleteProduct(index)" class="el-icon-delete"></i>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-form-item label="套餐标签" style="margin-top: 35px">
          <el-select
            style="width: 100%"
            v-model="formData.package_label_id"
            filterable
            placeholder="请选择套餐标签"
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
        <el-form-item label="建议销售价">
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
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-card>
    <el-dialog
      width="60%"
      center
      title="预设单品列表"
      :visible.sync="dialogTableVisible"
    >
      <el-table :data="productList" @selection-change="handleSelectionChange">
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
import { updatePackage, productList, packageLabelList } from "@/api/basic";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      formData: {
        name: "",
        main_image: "",
        image: "",
        product_data: [],
        package_label_id: "",
        sale_price: "",
        desc: "",
      }, //表单提交数据
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
      itemArr: [{ name: 111, num: "请输入数量" }],
    };
  },
  components: { Pagination },
  created() {
    this.getProductList();
    this.getLabelList();
  },
  methods: {
    //预设单品标签列表
    getLabelList() {
      packageLabelList().then((res) => {
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
      this.dialogTableVisible = false;
    },
    onSubmit() {
      console.log(this.formData);
      // updatePackage(this.formData).then((res) => {
      //   console.log(re s);
      // });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log(file.url);
      this.dialogVisible = true;
    },
    handleSelectionChange(val) {
      let checkedProductData = [];
      val.forEach((item) => {
        checkedProductData.push({
          id: item.id,
          name: item.name,
          num: 1,
        });
      });
      this.formData.product_data = checkedProductData;
    },
    deleteProduct(index) {
      this.formData.product_data.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
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
</style>