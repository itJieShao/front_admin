<template>
  <div class="app-container">
    <h2>{{$route.query.id?"编辑":"新增"}}套餐加购模版</h2>
    <el-row
      :gutter="12"
      style="margin-top: 15px; display: flex; align-items: flex-end"
    >
      <el-col :span="12">
        <el-card shadow="always">
          <div class="item_flex">
            <p>选择引用门店</p>
            <p>
              <el-select
                style="width: 100%"
                v-model="vendor_ids"
                clearable
                filterable
                multiple
                placeholder="请选择引用门店"
              >
                <el-option
                  v-for="item in storeList"
                  :key="item.vendor_id"
                  :label="item.vendor_name"
                  :value="item.vendor_id"
                ></el-option>
              </el-select>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always">
          <div class="item_flex">
            <p>引用日期</p>
            <p>
              <el-date-picker
                v-model="valid_at"
                type="daterange"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              >
              </el-date-picker>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card shadow="always" style="margin-top: 15px">
      <div class="c-box">
        <div class="content-box">
          <!-- <div style="border: 1px solid #ddd" v-if="checkedMainData.time_type_id">
          <div class="main-img-box">
            <img :src="checkedMainData.main_image" alt="" />
            <p>{{ checkedMainData.time_type_name }}</p>
            <i
              @click="delMainImg"
              class="el-icon-delete main-img-box-delete"
            ></i>
          </div>
          <p class="content-box-title">{{ checkedMainData.name }}</p>
          <p v-if="checkedMainData.desc" class="content-box-describe">
            {{ checkedMainData.desc }}
          </p>
        </div>
        <div v-else class="add-main-img" @click="openDialogTableVisible(1, '')">
          + 添加主套餐
        </div> -->
          <div class="dp_content">
            <div
              class="dp_item"
              v-for="(item, index) in purchased_data"
              :key="index"
            >
              <el-card class="card-item" shadow="always">
                <i
                  v-show="purchased_data.length > 1"
                  @click="delItem(index)"
                  style="top: 10px; right: 10px"
                  class="el-icon-delete main-img-box-delete"
                ></i>
                <el-input
                  v-model="item.title"
                  class="package-input"
                  placeholder="搭配标题"
                ></el-input>
                <el-select
                  clearable
                  style="width: 100%; margin-bottom: 15px"
                  v-model="item.level"
                  placeholder="请选择超值加购优先排序"
                >
                  <el-option
                    v-for="it1 in purchased_data.length"
                    :key="it1"
                    :label="'优先级' + it1"
                    :value="it1"
                    :disabled="it1 == item.level"
                  >
                  </el-option>
                </el-select>
                <div class="package-content">
                  <div
                    class="package-item"
                    v-for="(it, idx) in item.package_data"
                    :key="idx"
                  >
                    <div class="package-img">
                      <p>{{ it.time_type_name }}</p>
                      <img :src="it.main_image" alt="" />
                      <i
                        @click="delPackageItem(index, idx)"
                        class="el-icon-delete main-img-box-delete"
                      ></i>
                    </div>
                    <el-input
                      v-model="it.desc"
                      style="margin: 10px auto; width: 90%; display: block"
                      placeholder="搭配描述"
                    ></el-input>
                    <el-input
                      v-model="it.discount_price"
                      style="margin: 10px auto; width: 90%; display: block"
                      placeholder="加购价格"
                    ></el-input>
                  </div>
                  <div
                    @click="openDialogTableVisible(2, index)"
                    class="package-add"
                  >
                    + 添加搭配套餐
                  </div>
                </div>
              </el-card>
            </div>

            <el-button @click="add_dp" style="margin-top: 15px" type="success"
              >添加新的搭配分类</el-button
            >
          </div>
        </div>
        <div class="mainMeal">
          <el-button @click="openDialogTableVisible(1, '')" type="success"
            >添加关联主套餐</el-button
          >
          <el-table
            v-if="package_data.length"
            v-loading="loading"
            border
            :data="package_data"
            style="width: 100%; margin-top: 15px"
          >
            <el-table-column width="150" align="center" label="主套餐图片">
              <template slot-scope="scope">
                <img
                  style="max-width: 100px; max-height: 100px"
                  :src="scope.row.main_image"
                  alt=""
                />
              </template>
            </el-table-column>
            <el-table-column width="200" align="center" label="主套餐名称">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column width="200" align="center" label="主套餐时段">
              <template slot-scope="scope">
                <el-select
                  placeholder="请选择主套餐时段"
                  clearable
                  @change="mainTimeTypeChange(scope.$index,scope.row.time_type_id)"
                  style="width: 100%"
                  v-model="scope.row.time_type_id"
                >
                  <el-option
                    v-for="item in timeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column width="140" align="center">
              <template slot-scope="scope">
                <i
                  @click="delMainPackage(scope.$index)"
                  style="color: red; cursor: pointer"
                  class="el-icon-delete"
                ></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-row style="margin-top: 15px" type="flex" class="row-bg" justify="end">
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-row>
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
      <el-table @selection-change="handleSelectionChange" :data="packageList">
        <el-table-column v-if="dialogType == 1" type="selection" width="55">
        </el-table-column>
        <el-table-column
          align="center"
          property="package_id"
          label="套餐ID"
          width="150"
        ></el-table-column>
        <el-table-column align="center" label="套餐图片" width="100">
          <template slot-scope="scope">
            <img
              style="max-width: 100px; max-height: 100px"
              :src="scope.row.main_image"
              alt=""
            />
          </template>
        </el-table-column>
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
        <el-table-column v-if="dialogType == 2" align="center">
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
      <el-row type="flex" class="row-bg" justify="end">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="success" @click="addMainPackage">选好了</el-button>
      </el-row>
    </el-dialog>
    <el-dialog
      width="40%"
      center
      title="请选择套餐的用餐时段"
      :visible.sync="dialogTimeType"
    >
      <el-select
        placeholder="请选择套餐的用餐时段"
        clearable
        style="width: 100%"
        v-model="time_type_id"
      >
        <el-option
          v-for="item in timeList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelMainBtn">取 消</el-button>
        <el-button type="primary" @click="saveMainBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { packageList, searchStoreList } from "@/api/basic";
import { getTimeTypeData } from "@/api/store";
import { updateApi,getDetail } from "@/api/operate/add_buy";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      dialogTableVisible: false,
      packageList: [],
      total: 0,
      packageListData: {
        export: "",
        name: "",
        page: 1,
        page_size: 10,
        status: 1,
      },
      checkedMainData: {},
      checkedPurchasedData: {},
      dialogTimeType: false,
      timeList: [],
      purchased_data: [{ title: "", package_data: [], level: "" }],
      package_data: [],
      dialogType: "",
      dialogIndex: "",
      time_type_id: "",
      time_type_name: "",
      storeList: [],
      vendor_ids: [],
      valid_at: "",
      multipleSelection: [],
    };
  },
  created() {
    this.getpackageList();
    this.getTimeTypeData();
    this.getStoreList();
    if (this.$route.query.id){
      this.getDetail();
    }
  },
  watch: {
    time_type_id(val) {
      if (val) {
        this.time_type_name = this.timeList.find((item) => item.id == val).name;
      } else {
        this.time_type_name = "";
      }
    },
    dialogTableVisible(flag) {
      if (!flag) {
        this.dialogType = "";
      }
    },
  },
  methods: {
    getDetail(){
      getDetail({id:this.$route.query.id}).then(res => {
        if (res){
          res.vendor_ids = res.vendor_ids.map(Number);
          this.vendor_ids = res.vendor_ids;
          this.valid_at = [res.valid_at_start,res.valid_at_end];
          res.package_data.forEach(item => {
            item.name = item.package_name;
            delete item.package_name;
          })
          res.purchased_data.forEach(item => {
            if (!item.level){
              item.level = "";
            }
            item.package_data.forEach(it => {
              it.main_image = it.image;
              it.name = it.package_name;
              delete it.image;
              delete it.package_name;
            })
          })
          this.package_data = res.package_data;
          this.purchased_data = res.purchased_data;
        }
      })
    },
    mainTimeTypeChange(index,id){
      this.package_data[index].time_type_name = this.timeList.find(item => item.id == id).name;
    },
    addMainPackage() {
      if (!this.multipleSelection.length) {
        return this.$message({
          message: "请先勾选主套餐",
          type: "error",
          duration: 1000,
        });
      }
      this.package_data = this.package_data.concat(
        JSON.parse(JSON.stringify(this.multipleSelection))
      );
      this.dialogTableVisible = false;
    },
    delMainPackage(index) {
      this.package_data.splice(index, 1);
    },
    handleSelectionChange(val) {
      val.forEach(item => {
        item.time_type_id = "";
        item.time_type_name = "";
      })
      this.multipleSelection = val;
    },
    //获取店铺列表
    getStoreList() {
      searchStoreList().then((res) => {
        this.storeList = res;
      });
    },
    searchBtn() {
      this.packageListData.page = 1;
      this.getpackageList();
    },
    getTimeTypeData() {
      getTimeTypeData().then((res) => {
        this.timeList = res;
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
      if (this.dialogType == 1) {
        this.checkedMainData = item;
      } else {
        item.sale_price = "";
        item.desc = "";
        this.checkedPurchasedData = item;
      }
      this.dialogTimeType = true;
      this.dialogTableVisible = false;
    },
    cancelMainBtn() {
      this.checkedMainData = {};
      this.time_type_id = "";
      this.dialogTimeType = false;
      this.dialogType = "";
      this.dialogIndex = "";
    },
    saveMainBtn() {
      if (!this.time_type_id) {
        return this.$message({
          message: "请先选择时段",
          type: "error",
          duration: 1000,
        });
      }
      if (this.dialogType == 1) {
        this.checkedMainData.time_type_id = this.time_type_id;
        this.checkedMainData.time_type_name = this.time_type_name;
      } else {
        this.checkedPurchasedData.time_type_id = this.time_type_id;
        this.checkedPurchasedData.time_type_name = this.time_type_name;
        this.purchased_data[this.dialogIndex].package_data.push(
          JSON.parse(JSON.stringify(this.checkedPurchasedData))
        );
      }
      this.time_type_id = "";
      this.dialogType = "";
      this.dialogIndex = "";
      this.dialogTimeType = false;
    },
    delMainImg() {
      this.checkedMainData = {};
    },
    delItem(index) {
      this.purchased_data.splice(index, 1);
    },
    delPackageItem(index, idx) {
      this.purchased_data[index].package_data.splice(idx, 1);
    },
    openDialogTableVisible(type, index) {
      this.dialogType = type;
      this.dialogIndex = index;
      this.dialogTableVisible = true;
    },
    //添加新的搭配分类
    add_dp() {
      this.purchased_data.push({ title: "", package_data: [], level: "" });
    },
    onSubmit() {
      let purchased_data = JSON.parse(JSON.stringify(this.purchased_data));
      let package_data = JSON.parse(JSON.stringify(this.package_data));
      let returnFunFlag = false;
      purchased_data.forEach((item) => {
        if (item.level === ""){
          item.level = 0;
        }
        if (!item.title) {
          this.$message({
            message: "请先填写搭配标题",
            type: "error",
            duration: 1000,
          });
          return (returnFunFlag = true);
        }
        if (!item.package_data.length) {
          this.$message({
            message: "至少添加一种搭配套餐",
            type: "error",
            duration: 1000,
          });
          return (returnFunFlag = true);
        }
        item.package_data1 = [];
        item.package_data.forEach((it) => {
          if (!it.desc) {
            this.$message({
              message: "请填写搭配描述",
              type: "error",
              duration: 1000,
            });
            return (returnFunFlag = true);
          }
          if (!it.discount_price) {
            this.$message({
              message: "请填写加购价格",
              type: "error",
              duration: 1000,
            });
            return (returnFunFlag = true);
          }
          item.package_data1.push({
            time_type_id: it.time_type_id,
            package_id: it.package_id,
            package_name: it.name,
            discount_price: it.discount_price,
            desc: it.desc,
          });
        });
        item.package_data = item.package_data1;
        delete item.package_data1;
      });
      let package_data1 = [];
      package_data.forEach((item) => {
        if (!item.time_type_id) {
          this.$message({
            message: "请先选择主套餐时段",
            type: "error",
            duration: 1000,
          });
          return (returnFunFlag = true);
        }
        package_data1.push({
          time_type_id: item.time_type_id,
          time_type_name: item.time_type_name,
          package_id: item.package_id,
          package_name: item.name,
        });
      });
      package_data = package_data1;
      if (returnFunFlag) return;
      let aData = {
        vendor_ids: JSON.stringify(this.vendor_ids),
        purchased_data: JSON.stringify(purchased_data),
        package_data: JSON.stringify(package_data),
      };
      if (this.$route.query.id){
        aData.id = this.$route.query.id;
      }
      if (this.valid_at) {
        aData.valid_at_start = this.valid_at[0];
        aData.valid_at_end = this.valid_at[1];
      }
      updateApi(aData).then((res) => {
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
.c-box {
  display: flex;
}
.mainMeal {
  margin-left: 30px;
}
.content-box {
  width: 520px;
  padding: 20px;
  border: 1px solid #ddd;
}
.add-main-img {
  width: 100%;
  height: 200px;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
.main-img-box {
  position: relative;
  width: 100%;
  height: 200px;
}
.main-img-box p {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  font-size: 14px;
  padding: 5px 20px;
}
.main-img-box img {
  width: 100%;
  height: 100%;
}
.content-box-title {
  padding: 10px;
  background-color: #eee;
  font-size: 14px;
}
.content-box-describe {
  padding: 10px;
  font-size: 14px;
}
.main-img-box-delete {
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  color: red;
  font-size: 20px;
}
.package-item {
  width: 130px;
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}
.package-item:nth-child(3n + 0) {
  margin-right: 0;
}
.package-img {
  position: relative;
  width: 100%;
  height: 130px;
}
.package-img p {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  font-size: 12px;
  padding: 5px 20px;
}
.package-img img {
  width: 100%;
  height: 100%;
}
.package-input {
  margin: 20px 0;
}
.package-content {
  display: flex;
  flex-wrap: wrap;
}
.package-add {
  width: 130px;
  height: 242px;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
.card-item {
  margin-top: 15px;
  position: relative;
}
</style>