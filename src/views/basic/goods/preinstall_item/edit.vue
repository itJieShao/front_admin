<template>
  <div class="app-container">
    <h2>{{ $route.query.id ? "编辑预设单品" : "新增预设单品" }}</h2>
    <el-card shadow="always">
      <el-form label-width="100px">
        <el-form-item label="单品标题">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="单品主图">
          <el-upload
            :file-list="detailMainImgFile"
            :class="{ main_img_hide: formData.image }"
            :limit="1"
            action="/vendor/vendor/upload_image"
            list-type="picture-card"
            :on-success="upLoadMainImg"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleMainImgRemove"
            :data="{ token: $store.state.user.token }"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-divider />
        <el-form-item label="重量">
          <el-input v-model="formData.weight"></el-input>
        </el-form-item>
        <el-form-item label="标签" style="margin-top: 35px">
          <el-select
            style="width: 100%"
            v-model="formData.product_category_id"
            filterable
            placeholder="请选择标签"
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
        <el-form-item label="包装规格" style="margin-top: 35px">
          <el-select
            style="width: 100%"
            v-model="formData.product_package_box_id"
            filterable
            placeholder="请选择包装规格"
          >
            <el-option
              v-for="item in packageBox"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="味型" style="margin-top: 35px">
          <el-select
            style="width: 100%"
            v-model="formData.taste_id"
            filterable
            placeholder="请选择味型"
          >
            <el-option
              v-for="item in tasteList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成本预警价">
          <el-input v-model="formData.warn_cost_price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="基础成本价">
          <el-input v-model="formData.cost_price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="供应商" style="margin-top: 35px">
          <el-select
            style="width: 100%"
            v-model="formData.supplier_id"
            filterable
            placeholder="请选择供应商"
          >
            <el-option
              v-for="item in supplierList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
            v-model="formData.process_indicators"
          >
          </el-input>
        </el-form-item>
        <el-divider />
        <el-form-item label="质量标准">
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入质量标准内容"
            v-model="formData.quality_standard"
          >
          </el-input>
        </el-form-item>
        <el-divider />
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="材料"> </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-card shadow="always">
              <div>
                <div class="item_title">
                  <p>材料名称</p>
                  <p>单位</p>
                  <p>数量</p>
                </div>
                <el-divider />
                <div
                  class="item_content"
                  v-for="(item, index) in formData.material"
                  :key="index"
                >
                  <div>
                    <p>{{ item.material_name }}</p>
                  </div>
                  <div>
                    <p>{{ item.unit_name }}</p>
                  </div>
                  <div class="i_right">
                    <p>{{ item.num }}</p>
                    <i
                      @click="deleteMaterial(item.material_id)"
                      class="el-icon-delete"
                    ></i>
                  </div>
                </div>
                <div class="item_content">
                  <div>
                    <el-select
                      v-model="materialId"
                      filterable
                      placeholder="请选择材料"
                    >
                      <el-option
                        v-for="item in materialData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div>
                    <p>
                      {{ checkedMaterial ? checkedMaterial.unit_name : "无" }}
                    </p>
                  </div>
                  <div>
                    <el-input-number
                      :min="1"
                      v-model="materialNum"
                    ></el-input-number>
                  </div>
                </div>
              </div>
              <el-button type="success" @click="addMaterial">新增</el-button>
            </el-card>
          </el-col>
        </el-row>
        <el-divider />
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="调料"> </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-card shadow="always">
              <div>
                <div class="item_title">
                  <p>调料名称</p>
                  <p>单位</p>
                  <p>数量</p>
                </div>
                <el-divider />
                <div
                  class="item_content"
                  v-for="(item, index) in formData.seasoning"
                  :key="index"
                >
                  <div>
                    <p>{{ item.seasoning_name }}</p>
                  </div>
                  <div>
                    <p>{{ item.unit_name }}</p>
                  </div>
                  <div class="i_right">
                    <p>{{ item.num }}</p>
                    <i
                      @click="deleteSeasoning(item.seasoning_id)"
                      class="el-icon-delete"
                    ></i>
                  </div>
                </div>
                <div class="item_content">
                  <div>
                    <el-select
                      v-model="seasoningId"
                      filterable
                      placeholder="请选择调料"
                    >
                      <el-option
                        v-for="item in seasoningData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div>
                    <p>
                      {{ checkedSeasoning ? checkedSeasoning.unit_name : "无" }}
                    </p>
                  </div>
                  <div>
                    <el-input-number
                      :min="1"
                      v-model="seasoningNum"
                    ></el-input-number>
                  </div>
                </div>
              </div>
              <el-button type="success" @click="addSeasoning">新增</el-button>
            </el-card>
          </el-col>
        </el-row>
        <el-divider />
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="温度曲线"> </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-card shadow="always">
              <div>
                <div class="item_title">
                  <p>时间/min</p>
                  <p>温度/°C</p>
                </div>
                <el-divider />
                <div
                  class="item_content"
                  v-for="(item, index) in formData.temperature_corve"
                  :key="index"
                >
                  <div class="i_right">
                    <p class="i_position">第{{ index + 1 }}段</p>
                    <p>{{ item.time }}</p>
                  </div>
                  <div class="i_right">
                    <p>{{ item.temperature }}</p>
                    <i
                      @click="deleteTemperatureCorve(index)"
                      class="el-icon-delete"
                    ></i>
                  </div>
                </div>
                <div class="item_content">
                  <div>
                    <el-input
                      placeholder="请输入时间"
                      v-model="time"
                    ></el-input>
                  </div>
                  <div style="margin-left:20px;">
                    <el-input
                      placeholder="请输入温度"
                      v-model="temperature"
                    ></el-input>
                  </div>
                </div>
              </div>
              <el-button type="success" @click="addTemperatureCorve"
                >新增</el-button
              >
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
  </div>
</template>
<script>
import {
  updateProduct,
  productList,
  productDetail,
  supplierList,
  materialData,
  seasoningData,
  packageBox
} from "@/api/basic";
import { categoryData } from "@/api/system/category";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      formData: {
        name: "",
        image: "",
        product_category_id: "",
        product_package_box_id: "",
        taste_id: "",
        warn_cost_price: "",
        cost_price: "",
        weight: "",
        supplier_id: "",
        process_indicators: "",
        quality_standard: "",
        material: [],
        seasoning: [],
        temperature_corve: [],
      }, //表单提交数据
      checkedProductData: [],
      productListData: {
        export: "",
        name: "",
        page: 1,
        page_size: 5,
      },
      productList: [],
      total: 0,
      dialogImageUrl: "",
      dialogVisible: false,
      dialogTableVisible: false,
      labelList: [],
      packageBox: [],
      tasteList: [],
      supplierList: [],
      materialData: [],
      materialId: "",
      materialNum: "1",
      seasoningData: [],
      seasoningId: "",
      seasoningNum: "1",
      time: "",
      temperature: "",
      detailMainImgFile: [],
    };
  },
  components: { Pagination },
  computed: {
    checkedMaterial() {
      if (this.materialId) {
        return this.materialData.find((item) => item.id == this.materialId);
      }
    },
    checkedSeasoning() {
      if (this.seasoningId) {
        return this.seasoningData.find((item) => item.id == this.seasoningId);
      }
    },
  },
  created() {
    if (this.$route.query.id) {
      this.formData.id = this.$route.query.id;
      this.getDetail();
    }
    this.getLabelList();
    this.getPackageBox();
    this.getSupplierList();
    this.getTasteList();
    this.getMaterialData();
    this.getSeasoningData();
  },
  methods: {
    //新增材料
    addMaterial() {
      if (!this.materialId) {
        return this.$message.error("请选择要新增的材料");
      }
      this.formData.material.push({
        material_name: this.checkedMaterial.name,
        unit_name: this.checkedMaterial.unit_name,
        material_id: this.materialId,
        num: this.materialNum,
      });
      this.materialId = "";
    },
    //删除材料
    deleteMaterial(id) {
      let index = this.formData.material.findIndex(
        (item) => item.material_id == id
      );
      this.formData.material.splice(index, 1);
    },
    //新增调料
    addSeasoning() {
      if (!this.seasoningId) {
        return this.$message.error("请选择要新增的调料");
      }
      this.formData.seasoning.push({
        seasoning_name: this.checkedSeasoning.name,
        unit_name: this.checkedSeasoning.unit_name,
        seasoning_id: this.seasoningId,
        num: this.seasoningNum,
      });
      this.seasoningId = "";
    },
    //删除调料
    deleteSeasoning(id) {
      let index = this.formData.seasoning.findIndex(
        (item) => item.seasoning_id == id
      );
      this.formData.seasoning.splice(index, 1);
    },
    //新增温度曲线
    addTemperatureCorve() {
      if (!this.time || !this.temperature) {
        return this.$message.error("请输入时间和温度");
      }
      this.formData.temperature_corve.push({
        time: this.time,
        temperature: this.temperature,
      });
      this.time = this.temperature = "";
    },
    //删除温度曲线
    deleteTemperatureCorve(index) {
      this.formData.temperature_corve.splice(index, 1);
    },
    //预设单品详情
    getDetail() {
      productDetail({ id: this.$route.query.id }).then((res) => {
        this.formData = res;
        if (res.image) {
          this.detailMainImgFile = [
            { name: "detailMainImgFile", url: res.image },
          ];
        }
        this.$set(this.formData, "material", res.material_data);
        this.$set(this.formData, "seasoning", res.seasoning_data);
        this.$set(this.formData, "temperature_corve", res.temperature_curve)
      });
    },
    //预设单品标签列表
    getLabelList() {
      categoryData({type:2}).then((res) => {
        this.labelList = res;
      });
    },
    //包装列表
    getPackageBox() {
      packageBox().then((res) => {
        this.packageBox = res;
      });
    },
    //味型列表
    getTasteList() {
      categoryData({type:5}).then((res) => {
        this.tasteList = res;
      });
    },
    //供应商列表
    getSupplierList() {
      supplierList().then((res) => {
        this.supplierList = res;
      });
    },
    //材料列表
    getMaterialData() {
      materialData().then((res) => {
        this.materialData = res;
      });
    },
    //调料列表
    getSeasoningData() {
      seasoningData({type:4}).then((res) => {
        this.seasoningData = res;
      });
    },
    //提交
    onSubmit() {
      updateProduct(this.formData).then((res) => {
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
      this.formData.image = "";
    },
    //查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传主图
    upLoadMainImg(res, file) {
      if (res.status) {
        this.formData.image = res.data.image_url;
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
  margin-bottom: 20px;
  align-items: center;
  div {
    flex: 1;
  }
}
.el-input-number {
  flex: 1;
}
.el-icon-delete {
  margin-left: 20px;
  cursor: pointer;
}
.i_position {
  position: absolute;
  left: 0;
}
.i_right {
  position: relative;
  display: flex;
  align-items: center;
}
.main_img_hide .el-upload--picture-card {
  display: none;
}
</style>