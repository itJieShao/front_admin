<template>
  <div class="app-container">
    <h2>{{ $route.query.employee_id ? "编辑员工" : "新增员工" }}</h2>
    <el-card shadow="always">
      <el-form label-width="130px">
        <el-form-item label="头像">
          <el-upload
            :file-list="detailMainImgFile"
            :class="{ main_img_hide: formData.head_images }"
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
        <el-form-item label="员工名称">
          <el-input placeholder="请输入员工名称" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="岗位">
          <el-select
            @change="stationChange"
            style="width: 100%"
            placeholder="请选择员工岗位"
            v-model="formData.station_id"
          >
            <el-option
              v-for="item in stationList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="formData.station_id" :label="vendor_name">
          <el-select
            style="width: 100%"
            placeholder="请选择门店"
            v-model="formData.vendor_id"
            :multiple="formData.station_id != 1"
          >
            <el-option
              v-for="item in vendorList"
              :key="item.vendor_id"
              :label="item.vendor_name"
              :value="item.vendor_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input placeholder="请输入年龄" v-model="formData.age"></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-input placeholder="请输入学历" v-model="formData.education"></el-input>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input placeholder="请输入籍贯" v-model="formData.native_place"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input placeholder="请输入手机号码" v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-date-picker
            value-format="yyyy-MM-dd"
            style="width: 100%"
            v-model="formData.entry_time"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
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
import {
  vendorEmployeeAdd,
  vendorEmployeeEdit,
  vendorEmployeeDetail,
} from "@/api/store";
import { vendorList } from "@/api/common";
export default {
  data() {
    return {
      formData: {
        head_images: "",
        name: "",
        vendor_id: "",
        station_id: "",
        age: "",
        education: "",
        native_place: "",
        phone: "",
        entry_time: "",
      },
      stationList: [
        { name: "门店销售员", id: 1 },
        { name: "配送员", id: 2 },
        { name: "QC检测人员", id: 3 },
      ],
      vendorList: [],
      detailMainImgFile: [], //详情头像回显
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  computed: {
    vendor_name() {
      let vendor_name = "";
      switch (this.formData.station_id) {
        case 1:
          vendor_name = "所属门店";
          break;
        case 2:
          vendor_name = "配送门店";
          break;
        case 3:
          vendor_name = "QC抽检门店";
          break;
      }
      return vendor_name;
    },
  },
  async created() {
    await this.getVendorList();
    if (this.$route.query.employee_id) {
      this.$set(this.formData, "employee_id", this.$route.query.employee_id);
      this.getDetail();
    }
  },
  methods: {
    stationChange() {
      this.formData.vendor_id = this.formData.station_id == 1 ? "" : [];  
    },
    getDetail() {
      vendorEmployeeDetail({ employee_id: this.formData.employee_id }).then(
        (res) => {
          let formData = this.formData;
          for (let key in res) {
            if (formData.hasOwnProperty(key)) {
              Object.assign(formData, { [key]: res[key] });
            }
          }
          this.$set(formData, "employee_id", res.id);
          formData.vendor_id =
            res.station_id != 1 ? res.vendor_id.split(",") : res.vendor_id;
          if (res.image) {
            formData.head_images = res.image;
            this.detailMainImgFile = [
              { name: "detailMainImgFile", url: res.image },
            ];
          }
        }
      );
    },
    //删除图片
    handleMainImgRemove(file, fileList) {
      this.formData.head_images = "";
    },
    //查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传图片
    upLoadMainImg(res, file) {
      if (res.status) {
        this.formData.head_images = res.data.image_url;
      }
    },
    //获取门店列表
    getVendorList() {
      return vendorList({ all: 1 }).then((res) => {
        res.forEach((item) => (item.vendor_id = item.vendor_id.toString()));
        this.vendorList = res;
      });
    },
    onSubmit() {
      let aData = JSON.parse(JSON.stringify(this.formData));
      let saveApi = aData.employee_id ? vendorEmployeeEdit : vendorEmployeeAdd;
      let vendor_id = aData.vendor_id;
      aData.vendor_id = Array.isArray(vendor_id)
        ? vendor_id.join(",")
        : vendor_id;
      saveApi(aData).then((res) => {
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
  },
};
</script>

<style>
.main_img_hide .el-upload--picture-card {
  display: none;
}
</style>