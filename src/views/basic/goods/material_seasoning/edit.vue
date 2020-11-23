<template>
  <div>
    <el-form label-width="100px">
      <el-form-item :label="`${type_name}名称`">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item :label="`${type_name}主图`">
        <el-upload
          :file-list="detailMainImgFile"
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
      <el-form-item label="标签">
        <el-select
          style="width: 100%"
          v-model="formData.label_id"
          filterable
          placeholder="请选择标签"
        >
          <el-option
            v-for="item in labelData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单位">
        <el-select
          style="width: 100%"
          v-model="formData.unit_id"
          filterable
          placeholder="请选择单位"
        >
          <el-option
            v-for="item in unitData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格" v-show="type == 6">
        <el-input v-model="formData.specifications"></el-input>
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
      <el-form-item label="供应商">
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
      <div style="display: flex; justify-content: flex-end">
        <el-button @click="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="submitBtn">确 定</el-button>
      </div>
    </el-form>
    <el-dialog append-to-body :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import {
  materialAdd,
  seasoningAdd,
  packageBoxAdd,
  materialEdit,
  seasoningEdit,
  packageBoxEdit,
  materialDetail,
  seasoningDetail,
  packageBoxDetail,
  supplierList,
} from "@/api/basic";
import { categoryData } from "@/api/system/category";
export default {
  props: ["type", "type_name", "jumpId"],
  data() {
    return {
      addApi: null,
      editApi: null,
      detailApi: null,
      formData: {
        name: "",
        image: "",
        label_id: "",
        unit_id: "",
        warn_cost_price: "",
        cost_price: "",
        supplier_id: "",
      },
      detailMainImgFile: [],
      dialogVisible: false,
      dialogImageUrl: "",
      labelData: [], //标签下拉框
      unitData: [], //单位下拉框
      supplierList: [], //供应商下拉框
    };
  },
  created() {
    switch (this.type) {
      case "3":
        this.addApi = materialAdd;
        this.editApi = materialEdit;
        this.detailApi = materialDetail;
        this.formData.material_id = this.jumpId;
        break;
      case "4":
        this.addApi = seasoningAdd;
        this.editApi = seasoningEdit;
        this.detailApi = seasoningDetail;
        this.formData.seasoning_id = this.jumpId;
        break;
      case "6":
        this.addApi = packageBoxAdd;
        this.editApi = packageBoxEdit;
        this.detailApi = packageBoxDetail;
        this.formData.package_box_id = this.jumpId;
        this.$set(this.formData, "specifications", "");
        break;
    }
    this.getLabelData();
    this.getUnitData();
    this.getSupplierList();
    if (this.jumpId) {
      this.getDetail();
    }
  },
  methods: {
    getLabelData() {
      categoryData({ type: this.type }).then((res) => {
        this.labelData = res;
      });
    },
    getUnitData() {
      categoryData({ type: 7 }).then((res) => {
        this.unitData = res;
      });
    },
    getSupplierList() {
      supplierList().then((res) => {
        this.supplierList = res;
      });
    },
    getDetail() {
      let key = "";
      switch (this.type) {
        case "3":
          key = "material_id";
          break;
        case "4":
          key = "seasoning_id";
          break;
        case "6":
          key = "package_box_id";
          break;
      }
      this.detailApi({ [key]: this.jumpId }).then((res) => {
        for (let key in this.formData) {
          this.formData[key] = res[key];
        }
        if (res.image) {
          this.detailMainImgFile = [
            { name: "detailMainImgFile", url: res.image },
          ];
        }
        if (this.type == 6) {
          this.formData.package_box_id = res.id;
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
    cancelBtn() {
      this.$emit("closeDialog");
    },
    submitBtn() {
      const reqApi = this.jumpId ? this.editApi : this.addApi;
      reqApi(this.formData).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "提交成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.$emit("closeDialog", "1"); //有参数则刷新父组件表格
            },
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
.main_img_hide .el-upload--picture-card {
  display: none;
}
</style>