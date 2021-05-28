<template>
  <div class="app-container">
    <h2>
      {{ $route.query.vendor_package_id ? "编辑门店套餐" : "新增门店套餐" }}
    </h2>
    <el-card shadow="always">
      <el-form label-width="100px">
        <el-form-item label="门店套餐标题">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="副标题">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="预设套餐" v-if="!formData.vendor_package_id">
          <el-button type="success" @click="dialogTableVisible = true"
            >选择预设套餐</el-button
          >
        </el-form-item>
        <div v-show="formData.package_id">
          <el-form-item label="套餐名称">
            <el-input disabled v-model="checkedPackageData.name"></el-input>
          </el-form-item>
          <el-form-item label="套餐主图">
            <div class="main_img_box">
              <img :src="checkedPackageData.main_image" alt="" />
            </div>
          </el-form-item>
          <el-form-item
            label="套餐主推广告图"
            v-if="checkedPackageData.main_push_image"
          >
            <div class="main_img_box">
              <img :src="checkedPackageData.main_push_image" alt="" />
            </div>
          </el-form-item>
          <el-form-item label="套餐轮播图">
            <div class="imgs_box">
              <div
                class="img_box"
                v-for="(item, index) in checkedPackageData.image"
                :key="index"
              >
                <img :src="item" alt="" />
              </div>
            </div>
          </el-form-item>
        </div>
        <el-divider />
        <el-form-item label="门店">
          <el-input
            v-if="$route.query.vendor_package_id"
            disabled
            v-model="formData.vendor_name"
          ></el-input>
          <el-select
            v-else
            style="width: 100%"
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
        <el-form-item label="套餐号">
          <el-input v-model="formData.take_code"></el-input>
        </el-form-item>
        <el-form-item label="用餐时段">
          <el-select
            style="width: 100%"
            multiple
            v-model="formData.time_type_ids"
            placeholder="请选择用餐时段"
          >
            <el-option
              v-for="item in timeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-divider />
        <!-- <el-form-item label="进货价">
          <el-input disabled v-model="checkedPackageData.">
            <template slot="append">元</template>
          </el-input>
        </el-form-item> -->
        <el-form-item label="销售原价">
          <el-input
            placeholder="请输入销售原价，精确到小数点后2位"
            v-model="formData.sale_price"
          >
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="优惠" style="margin-top: 35px">
          <el-select
            @change="couponChange"
            style="width: 100%"
            v-model="formData.coupon_id"
            filterable
            placeholder="请选择折扣优惠"
          >
            <el-option label="无" :value="0"></el-option>
            <el-option
              v-for="item in couponList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折后价格">
          <el-input disabled v-model="discount_price">
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
    <el-dialog
      width="60%"
      center
      title="预设套餐列表"
      :visible.sync="dialogTableVisible"
    >
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="20">
          <el-input
            v-model="packageListData.name"
            placeholder="请输入预设套餐名称搜索"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="searchBtn" type="primary" icon="el-icon-search"
            >搜索</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="packageList">
        <el-table-column
          align="center"
          property="package_id"
          label="套餐ID"
          width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          property="name"
          label="套餐名称"
          width="200"
        ></el-table-column>
        <el-table-column
          align="center"
          property="package_label_name"
          label="标签名称"
        ></el-table-column>
        <el-table-column
          align="center"
          property="sale_price"
          label="建议销售价"
        ></el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click="checkedPackage(scope.row)"
              >选择该套餐</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="packageListData.page"
        :limit.sync="packageListData.page_size"
        @pagination="getpackageList"
      />
    </el-dialog>
  </div>
</template>
<script>
import {
  updateVendorPackage,
  packageList,
  vendorPackageDetail,
  packageDetail,
  selectCouponList,
  searchStoreList,
} from "@/api/basic";
import { getTimeTypeData } from "@/api/store";
import { categoryData } from "@/api/system/category";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      formData: {
        name: "",
        title: "",
        package_id: "",
        package_label_id: "",
        take_code: "",
        vendor_id: "",
        sale_price: "",
        coupon_id: 0,
        desc: "",
        time_type_ids: [],
      }, //表单提交数据
      checkedPackageData: {},
      packageListData: {
        export: "",
        name: "",
        page: 1,
        page_size: 10,
        status: 1,
      },
      storeList: [],
      labelList: [],
      packageList: [],
      couponList: [], //优惠下拉列表
      total: 0,
      dialogTableVisible: false,
      discount_rate: "", //折扣率
      timeList: [],
    };
  },
  components: { Pagination },
  computed: {
    discount_price() {
      if (this.discount_rate && this.formData.coupon_id) {
        return (this.formData.sale_price * this.discount_rate).toFixed(2);
      }
    },
  },
  async created() {
    this.getTimeTypeData();
    await this.getCouponList();
    if (this.$route.query.vendor_package_id) {
      this.formData.vendor_package_id = this.$route.query.vendor_package_id;
      this.getDetail();
    } else {
      this.getStoreList();
    }
    this.getpackageList();
    this.getLabelList();
  },
  methods: {
    searchBtn() {
      this.packageListData.page = 1;
      this.getpackageList();
    },
    getTimeTypeData() {
      getTimeTypeData().then((res) => {
        this.timeList = res;
      });
    },
    //选择优惠之后计算折扣率
    couponChange(val) {
      if (!val) return;
      this.discount_rate = this.couponList.find(
        (item) => item.id == val
      ).discount;
    },
    //优惠下拉列表
    getCouponList() {
      return selectCouponList().then((res) => {
        this.couponList = res;
      });
    },
    //门店下拉列表
    getStoreList() {
      searchStoreList().then((res) => {
        this.storeList = res;
      });
    },
    //门店套餐详情
    getDetail() {
      vendorPackageDetail({
        vendor_package_id: this.$route.query.vendor_package_id,
      }).then((res) => {
        let time_type_ids = [];
        if (res.time_type_ids.length) {
          res.time_type_ids.forEach((item) => {
            time_type_ids.push(Number(item));
          });
        }
        res.time_type_ids = time_type_ids;
        this.formData = res;
        console.log(this.formData.time_type_ids);
        this.checkedPackageData = {
          name: res.package_name,
          main_image: res.main_image,
          image: res.image,
        };
        if (res.coupon_id) {
          this.discount_rate = this.couponList.find(
            (item) => item.id == res.coupon_id
          ).discount;
        }
      });
    },
    //标签列表
    getLabelList() {
      categoryData({ type: 1 }).then((res) => {
        this.labelList = res;
      });
    },
    //预设套餐列表
    getpackageList() {
      packageList(this.packageListData).then((res) => {
        this.packageList = res.list;
        this.total = res.count;
      });
    },
    //选择套餐
    checkedPackage(item) {
      this.formData.package_id = item.package_id;
      this.checkedPackageData = item;
      this.getDetailImgs(item.package_id);
      this.dialogTableVisible = false;
    },
    //预设套餐详情(此接口调用是为了获取套餐轮播图)
    getDetailImgs(package_id) {
      packageDetail({ package_id }).then((res) => {
        this.$set(this.checkedPackageData, "image", res.image);
      });
    },
    //提交
    onSubmit() {
      let aData = JSON.parse(JSON.stringify(this.formData));
      aData.time_type_ids = JSON.stringify(aData.time_type_ids);
      updateVendorPackage(aData).then((res) => {
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
<style lang="scss" scoped>
.main_img_box,
.img_box {
  width: 148px;
  height: 148px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.imgs_box {
  display: flex;
  flex-wrap: wrap;
  .img_box {
    margin: 0 15px 15px 0;
  }
}
</style>