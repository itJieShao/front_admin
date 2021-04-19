<template>
  <div class="app-container">
    <h2>{{ $route.query.vendor_id ? "编辑门店" : "新增门店" }}</h2>
    <el-card shadow="always">
      <el-form label-width="130px">
        <el-form-item label="门店照片">
          <el-upload
            :file-list="detailMainImgFile"
            :class="{ main_img_hide: formData.images }"
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
        <el-form-item label="门店名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="所属小程序环境">
          <el-select
            style="width: 100%"
            v-model="formData.env"
            placeholder="请选择所属小程序环境"
          >
            <el-option label="一合拾盒小程序" :value="1"></el-option>
            <el-option label="盒小饭堂小程序" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select
            @change="provinceChange"
            placeholder="请选择省"
            v-model="formData.province_id"
            filterable
          >
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            @change="cityChange"
            style="margin-left: 20px"
            placeholder="请选择市"
            v-model="formData.city_id"
            filterable
          >
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            @change="districtChange"
            style="margin-left: 20px"
            placeholder="请选择区"
            v-model="formData.district_id"
            filterable
          >
            <el-option
              v-for="item in districtList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店地址">
          <el-input v-model="formData.address"></el-input>
        </el-form-item>
        <div class="flex_two">
          <el-form-item label="经度">
            <el-input disabled v-model="formData.longitude"></el-input>
          </el-form-item>
          <el-form-item label="纬度">
            <el-input disabled v-model="formData.latitude"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="Position">
          <baidu-map
            :center="center"
            :zoom="zoom"
            @ready="handler"
            ak="NWLrMGD2TcEhRnXnbjZhIAfoB2hywlRO"
          >
            <bm-view class="map"></bm-view>
            <bm-marker
              :position="{ lng: center.lng, lat: center.lat }"
            ></bm-marker>
            <el-input
              @focus="searchShow = true"
              style="margin-top: 15px"
              placeholder="输入地址搜索"
              v-model="map_keyword"
            />
            <bm-local-search
              v-show="searchShow"
              id="bm-local-search"
              @searchcomplete="searchcomplete"
              :keyword="map_keyword"
              :auto-viewport="true"
            ></bm-local-search>
          </baidu-map>
        </el-form-item>
        <el-form-item label="外卖功能">
          <el-select
            style="width: 100%"
            placeholder="请选择外卖功能"
            v-model="formData.need_distribution"
          >
            <el-option label="关闭外卖配送" :value="0"></el-option>
            <el-option label="开放外卖配送" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <template v-if="formData.need_distribution">
          <el-form-item label="外卖时段">
            <el-checkbox-group v-model="formData.distribution_time_type_ids">
              <el-checkbox v-for="item in timeList" :label="item.id">{{
                item.name
              }}</el-checkbox>
            </el-checkbox-group>
            <span class="form_tip"
              >（注：如果只选择了午餐开通外卖，用户同时下单早餐、午餐，则无法配送，必须是分开下才能配送午餐）</span
            >
          </el-form-item>
          <el-form-item label="配送范围">
            <el-input
              v-model="formData.distribution_distance"
              placeholder="请输入配送范围"
            >
              <template slot="append">米</template>
            </el-input>
          </el-form-item>
          <el-form-item label="配送费设置">
            <el-card shadow="always">
              <div>
                <div class="item_title">
                  <p>距离(单位/米)</p>
                  <p>配送费(单位/元)</p>
                  <p>配送时间(单位/分钟)</p>
                </div>
                <el-divider />
                <div
                  class="item_content"
                  v-for="(item, index) in formData.distribution_rule_data"
                  :key="index"
                >
                  <div>
                    <el-input
                      class="distribution_rule_input"
                      :disabled="
                        index == formData.distribution_rule_data.length - 1
                      "
                      type="number"
                      v-model="item.distance"
                      placeholder="请输入距离"
                    ></el-input>
                  </div>
                  <div>
                    <el-input
                      class="distribution_rule_input"
                      type="number"
                      v-model="item.fee"
                      placeholder="请输入配送费"
                    ></el-input>
                  </div>
                  <div>
                    <el-input
                      class="distribution_rule_input"
                      type="number"
                      v-model="item.time"
                      placeholder="请输入配送时间"
                    ></el-input>
                  </div>
                  <i
                    v-if="formData.distribution_rule_data.length > 1 && index != formData.distribution_rule_data.length - 1"
                    @click="deleteDistributionRule(index)"
                    class="el-icon-delete delete-btn"
                  ></i>
                </div>
              </div>
              <el-button type="success" @click="addDistribution"
                >新增</el-button
              >
            </el-card>
          </el-form-item>
        </template>
        <el-form-item label="运营管理人员">
          <el-select
            style="width: 100%"
            placeholder="运营管理人员"
            v-model="formData.admin_user_id"
            filterable
          >
            <el-option
              v-for="item in adminList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="营业天数">
          <el-checkbox-group v-model="formData.business_days">
            <el-checkbox
              v-for="item in dayList"
              :key="item.val"
              :value="item.val"
              :label="item.name"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="flex_two">
          <el-form-item label="开始营业时间">
            <el-time-picker
              format="HH:mm"
              value-format="HH:mm"
              v-model="formData.business_time_start"
            ></el-time-picker>
          </el-form-item>
          <el-form-item label="结束营业时间">
            <el-time-picker
              format="HH:mm"
              value-format="HH:mm"
              v-model="formData.business_time_end"
            ></el-time-picker>
          </el-form-item>
        </div>
        <!-- <div class="flex_two">
          <el-form-item label="上班考勤时间">
            <el-time-picker
              format="HH:mm"
              value-format="HH:mm"
              v-model="formData.attendance_time_start"
            ></el-time-picker>
          </el-form-item>
          <el-form-item label="下班考勤时间">
            <el-time-picker
              format="HH:mm"
              value-format="HH:mm"
              v-model="formData.attendance_time_end"
            ></el-time-picker>
          </el-form-item>
        </div> -->
        <el-row style="margin-bottom: 30px" :gutter="20">
          <el-col :span="24">
            <el-form-item label="用餐时段">
              <el-card shadow="always">
                <div>
                  <div class="item_title">
                    <p>用餐时段</p>
                    <p>结束烹饪时间</p>
                    <p>开始营业时间</p>
                    <p>结束营业时间</p>
                    <p>催餐时间</p>
                  </div>
                  <el-divider />
                  <!-- <div
                    class="item_content"
                    v-for="(item, index) in timeList"
                    :key="index"
                    v-if="!item.select"
                  >
                    <div>
                      <p>{{ item.name }}</p>
                    </div>
                    <div>
                      <p>{{ item.time }}</p>
                    </div>
                    <div>
                      <p>{{ item.business_start }}</p>
                    </div>
                    <div>
                      <p>{{ item.business_end }}</p>
                    </div>
                    <i
                      @click="deleteTime(item.id)"
                      class="el-icon-delete delete-btn"
                    ></i>
                  </div> -->
                  <div
                    class="item_content"
                    v-for="item in timeList"
                    :key="item.id"
                  >
                    <div class="item_sth">
                      <p>{{ item.name }}</p>
                    </div>
                    <div class="item_sth">
                      <el-time-picker
                        style="margin-left: 20px"
                        format="HH:mm"
                        value-format="HH:mm"
                        v-model="item.time"
                      ></el-time-picker>
                    </div>
                    <div class="item_sth">
                      <el-time-picker
                        style="margin-left: 20px"
                        format="HH:mm"
                        value-format="HH:mm"
                        v-model="item.business_start"
                      ></el-time-picker>
                    </div>
                    <div class="item_sth">
                      <el-time-picker
                        style="margin-left: 20px"
                        format="HH:mm"
                        value-format="HH:mm"
                        v-model="item.business_end"
                      ></el-time-picker>
                    </div>
                    <div class="item_sth">
                      <el-time-picker
                        style="margin-left: 20px"
                        format="HH:mm"
                        value-format="HH:mm"
                        v-model="item.un_take_remind"
                      ></el-time-picker>
                    </div>
                  </div>
                </div>
                <!-- <el-button type="success" @click="addTimeList">新增</el-button> -->
              </el-card>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="统一社会信用代码">
          <el-input
            placeholder="请输入门店统一社会信用代码"
            v-model="formData.credit_code"
          ></el-input>
        </el-form-item>
        <el-form-item label="营业执照">
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
        <el-form-item label="食品许可证">
          <el-input
            placeholder="请输入门店食品许可证"
            v-model="formData.food_permit"
          ></el-input>
        </el-form-item>
        <el-form-item label="食品许可证">
          <el-upload
            :file-list="detailFoodImagesFile"
            multiple
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="upLoadFoodImg"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleFoodRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
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
import { BaiduMap, BmView, BmMarker, BmLocalSearch } from "vue-baidu-map";
import {
  vendorAdd,
  vendorEdit,
  vendorDetail,
  getTimeTypeData,
} from "@/api/store";
import { provinceList, cityList, districtList, adminList } from "@/api/common";
export default {
  components: {
    BaiduMap,
    BmView,
    BmMarker,
    BmLocalSearch,
  },
  data() {
    return {
      formData: {
        env: "",
        images: "",
        name: "",
        province_code: "",
        city_code: "",
        district_code: "",
        province_id: "",
        city_id: "",
        district_id: "",
        address: "",
        longitude: "",
        latitude: "",
        phone: "",
        admin_user_id: "",
        business_days: [],
        business_time_start: "",
        business_time_end: "",
        attendance_time_start: "",
        attendance_time_end: "",
        credit_code: "",
        business_license: [],
        food_permit: "",
        food_permit_image: [],

        need_distribution: 0,
        distribution_distance: "",
        distribution_time_type_ids: [],
        distribution_rule_data: [{ distance: "", fee: "", time: "" }],
      },
      detailMainImgFile: [], //详情门店图片
      detailImagesFile: [], //详情营业执照
      detailFoodImagesFile: [], //详情食品许可证
      dialogImageUrl: "",
      dialogVisible: false,
      adminList: [],
      provinceList: [],
      cityList: [],
      districtList: [],
      map_keyword: "",
      searchShow: true,
      dayList: [
        { val: "0", name: "星期日" },
        { val: "1", name: "星期一" },
        { val: "2", name: "星期二" },
        { val: "3", name: "星期三" },
        { val: "4", name: "星期四" },
        { val: "5", name: "星期五" },
        { val: "6", name: "星期六" },
      ],
      timeList: [],
      // timeKey: "",
      // timeVal: "",
      // business_start: "",
      // business_end: "",
      center: { lng: 0, lat: 0 }, //编辑回显地图参数
      zoom: 0, //编辑回显地图参数
    };
  },
  watch: {
    "formData.distribution_distance"(val) {
      this.formData.distribution_rule_data[
        this.formData.distribution_rule_data.length - 1
      ].distance = val;
    },
  },
  async created() {
    await this.getProvinceList();
    if (this.$route.query.vendor_id) {
      this.formData.vendor_id = this.$route.query.vendor_id;
      await this.getTimeTypeData();
      this.getVendorDetail();
    } else {
      this.getTimeTypeData();
    }
    this.getAdminList();
  },
  methods: {
    deleteDistributionRule(index){
      this.formData.distribution_rule_data.splice(index,1)
    },
    addDistribution() {
      this.formData.distribution_rule_data.unshift({
        distance: "",
        fee: "",
        time: "",
      });
    },
    //获取门店用餐时段列表
    getTimeTypeData() {
      return getTimeTypeData().then((res) => {
        // res.forEach((item) => (item.select = true));
        this.timeList = res;
      });
    },
    handler({ BMap, map }) {
      setTimeout(() => {
        this.center.lng = this.formData.longitude;
        this.center.lat = this.formData.latitude;
        this.zoom = 18;
      }, 500);
    },
    provinceChange(val) {
      this.formData.province_code = this.provinceList.find(
        (item) => item.id == val
      ).code;
      this.formData.city_id = "";
      this.formData.district_id = "";
      this.districtList = [];
      if (this.formData.province_id) {
        this.getCityList();
      }
    },
    cityChange(val) {
      this.formData.city_code = this.cityList.find(
        (item) => item.id == val
      ).code;
      this.formData.district_id = "";
      if (this.formData.city_id) {
        this.getDistrictList();
      }
    },
    districtChange(val) {
      this.formData.district_code = this.districtList.find(
        (item) => item.id == val
      ).code;
    },
    getVendorDetail() {
      vendorDetail({ vendor_id: this.formData.vendor_id }).then((res) => {
        for (let key in this.formData) {
          if (res[key]) {
            this.formData[key] = res[key];
          }
        }
        this.formData.env = res.env;
        if (res.distribution_distance == 0) {
          this.formData.distribution_distance = "";
        }
        if (!res.distribution_rule_data.length) {
          this.formData.distribution_rule_data = [
            { distance: "", fee: "", time: "" },
          ];
        }
        this.formData.vendor_id = res.id;
        this.formData.province_code = res.province_id;
        this.formData.city_code = res.city_id;
        this.formData.district_code = res.district_id;
        this.formData.province_id = res.province_parent_id;
        this.formData.city_id = res.city_parent_id;
        if (res.cook_finish_time && res.cook_finish_time.length) {
          res.cook_finish_time.forEach((item) => {
            this.timeList.forEach((it) => {
              if (item.time_type_id == it.id) {
                //it.select = false;
                this.$set(it, "time", item.time);
                this.$set(it, "business_start", item.business_start);
                this.$set(it, "business_end", item.business_end);
                this.$set(it, "un_take_remind", item.un_take_remind);
              }
            });
          });
        }
        if (res.business_days.length > 0) {
          let business_days = [];
          this.dayList.forEach((item) => {
            res.business_days.forEach((it) => {
              if (item.val == it) {
                business_days.push(item.name);
              }
            });
          });
          this.formData.business_days = business_days;
        }
        if (
          res.distribution_time_type_ids &&
          res.distribution_time_type_ids.length > 0
        ) {
          let distribution_time_type_ids = [];
          res.distribution_time_type_ids.forEach((item) => {
            distribution_time_type_ids.push(Number(item));
          });
          this.formData.distribution_time_type_ids = distribution_time_type_ids;
        }
        if (res.image) {
          this.$set(this.formData, "images", res.image);
          this.detailMainImgFile = [
            { name: "detailMainImgFile", url: res.image },
          ];
          delete this.formData.image;
        }
        if (res.business_license.length > 0) {
          let business_license = [];
          res.business_license.forEach((item, index) => {
            business_license.push({
              name: `detailImagesFile${index}`,
              url: item,
            });
          });
          this.detailImagesFile = business_license;
        }
        if (res.food_permit_image.length > 0) {
          let food_permit_image = [];
          res.food_permit_image.forEach((item, index) => {
            food_permit_image.push({
              name: `detailFoodImagesFile${index}`,
              url: item,
            });
          });
          this.detailFoodImagesFile = food_permit_image;
        }
        this.getCityList();
        this.getDistrictList();
      });
    },
    //获取地图检索结果并自定义监听组件列表的点击事件
    searchcomplete(e) {
      if (e && e.Hr.length > 0) {
        const resList = e.Hr;
        this.$nextTick(() => {
          const domList = document
            .getElementById("bm-local-search")
            .getElementsByTagName("li");
          domList.forEach((item, index) => {
            item.addEventListener("click", () => {
              //this.map_keyword = resList[index].title
              this.formData.longitude = resList[index].point.lng;
              this.formData.latitude = resList[index].point.lat;
              this.searchShow = false;
            });
          });
        });
      }
    },
    getAdminList() {
      adminList().then((res) => {
        this.adminList = res.data;
      });
    },
    getProvinceList() {
      provinceList().then((res) => {
        this.provinceList = res;
      });
    },
    getCityList() {
      cityList({ province_id: this.formData.province_id }).then((res) => {
        this.cityList = res;
      });
    },
    getDistrictList() {
      districtList({ city_id: this.formData.city_id }).then((res) => {
        this.districtList = res;
        if (this.formData.district_code) {
          this.formData.district_id = res.find(
            (item) => item.code == this.formData.district_code
          );
        }
      });
    },
    //删除主图
    handleMainImgRemove(file, fileList) {
      this.formData.images = "";
    },
    //查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传门店单图
    upLoadMainImg(res, file) {
      if (res.status) {
        this.formData.images = res.data.image_url;
      }
    },
    //上传营业执照多图
    upLoadImg(res, file, fileList) {
      if (res.status) {
        this.formData.business_license.push(res.data.image_url);
      }
    },
    //删除营业执照图
    handleRemove(file, fileList) {
      const index = this.formData.business_license.findIndex(
        (item) => item == file.url
      );
      this.formData.business_license.splice(index, 1);
    },
    //上传食品许可证多图
    upLoadFoodImg(res, file, fileList) {
      if (res.status) {
        this.formData.food_permit_image.push(res.data.image_url);
      }
    },
    //删除食品许可证图
    handleFoodRemove(file, fileList) {
      const index = this.formData.food_permit_image.findIndex(
        (item) => item == file.url
      );
      this.formData.food_permit_image.splice(index, 1);
    },
    // //新增用餐时段
    // addTimeList() {
    //   if (this.timeKey && this.timeVal) {
    //     let timeItem = this.timeList.find((item) => this.timeKey == item.id);
    //     timeItem.select = false;
    //     timeItem.time = this.timeVal;
    //     timeItem.business_start = this.business_start;
    //     timeItem.business_end = this.business_end;
    //     this.timeKey = this.timeVal = this.business_start = this.business_end =
    //       "";
    //   }
    // },
    // //删除用餐时段
    // deleteTime(id) {
    //   let timeItem = this.timeList.find((item) => id == item.id);
    //   timeItem.select = true;
    //   timeItem.time = "";
    // },
    onSubmit() {
      let aData = JSON.parse(JSON.stringify(this.formData)),
        business_days = [];
      aData.business_days.forEach((item) => {
        this.dayList.forEach((it) => {
          if (it.name == item) {
            business_days.push(it.val);
          }
        });
      });
      aData.business_days = business_days.join(",");
      aData.cook_finish_time = [];
      this.timeList.forEach((item) => {
        if (item.time || item.business_start || item.business_end) {
          aData.cook_finish_time.push({
            time_type_id: item.id,
            time_type_name: item.name,
            time: item.time,
            business_start: item.business_start || "",
            business_end: item.business_end || "",
            un_take_remind: item.un_take_remind || "",
          });
        }
      });
      aData.distribution_time_type_ids = JSON.stringify(
        aData.distribution_time_type_ids
      );
      aData.distribution_rule_data = JSON.stringify(
        aData.distribution_rule_data
      );
      let saveApi = aData.vendor_id ? vendorEdit : vendorAdd;
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

<style lang="scss">
p {
  margin: 0;
}
.map {
  width: 100%;
  height: 300px;
}
.main_img_hide .el-upload--picture-card {
  display: none;
}
.flex_two {
  display: flex;
  .el-form-item {
    flex: 1;
  }
}
.item_title,
.item_content {
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 20px;
  align-items: center;
  div {
    flex: 1;
  }
  p {
    display: flex;
    justify-content: center;
    flex: 1;
  }
  .item_sth {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
.delete-btn {
  cursor: pointer;
  position: absolute;
  right: 0;
}
.distribution_rule_input {
  display: block;
  width: 80%;
  margin: 0 auto;
}
</style>