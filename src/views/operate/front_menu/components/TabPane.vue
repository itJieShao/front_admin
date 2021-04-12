<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="4">
        <el-select style="width: 100%" v-model="formData.menu_type">
          <el-option
            v-for="item in MenuType"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8" style="display: flex; align-items: center">
        <el-button icon="el-icon-check" @click="saveMenuClick" type="primary"
          >保存</el-button
        >
        <el-button icon="el-icon-plus" @click="openReleaseMenu" type="success"
          >发布</el-button
        >
        <p
          style="color: red; margin-left: 10px; font-size: 12px"
          v-if="!releaseStatus"
        >
          菜单还未发布哦
        </p>
      </el-col>
      <el-col :span="12" style="display: flex; justify-content: flex-end">
        <el-button @click="historyMenuListDialog = true" type="warning"
          >历史版本</el-button
        >
      </el-col>
    </el-row>
    <div class="menu_box" v-loading="pageLoading">
      <div class="menu_box_content" v-for="(item, index) in formData.menu_data">
        <p class="day_tip" v-if="formData.menu_type == 1">{{ day_tip }}</p>
        <p class="day_tip" v-else-if="formData.menu_type == 2">
          {{ day_tip + upNumCase(index + 1) }}
        </p>
        <p class="day_tip" v-else>{{ index + 1 + day_tip }}</p>
        <div class="menu">
          <div class="type_list">
            <div
              @click="typeClick(index, idx)"
              class="type_item"
              :style="it.checked ? 'background-color: #fff' : ''"
              v-for="(it, idx) in item"
            >
              <img style="width: 50%" :src="it.label_image" alt="" />
              <div style="align-items: center">
                <div v-if="it.time_type_id" style="flex-direction: column">
                  <p>{{ it.label }}</p>
                  <p>({{ it.time_type_name }})</p>
                </div>
                <p v-else>{{ it.label }}</p>
                <i
                  @click="
                    openTypeDialog(
                      index,
                      1,
                      it.label,
                      it.label_image,
                      it.time_type_id,
                      idx
                    )
                  "
                  class="el-icon-edit"
                ></i>
                <i @click="delType(index, idx)" class="el-icon-error"></i>
              </div>
            </div>
            <el-button
              @click="openTypeDialog(index, 0)"
              class="add_type"
              icon="el-icon-plus"
              type="success"
              size="mini"
              >添加分类</el-button
            >
          </div>
          <div class="goods_list">
            <template v-for="(it, idx) in item">
              <div
                class="goods_item"
                v-for="(itc, idxc) in it.vendor_package_data"
                v-if="it.checked"
              >
                <div class="goods_info">
                  <i
                    class="el-icon-error"
                    @click="delGoods(index, idx, idxc)"
                  ></i>
                  <p class="time_type_font">
                    {{ itc.time_type_id | time_type_name(vendorTimeList) }}
                  </p>
                  <img class="goods_img" :src="itc.main_image" alt="" />
                  <div class="goods_sth">
                    <p class="goods_title">
                      {{ itc.name }}
                    </p>
                    <div class="goods_price">
                      <p
                        v-if="itc.discount_price"
                        style="text-decoration: line-through"
                      >
                        ￥{{ itc.sale_price }}
                      </p>
                      <p style="color: red">
                        ￥{{
                          itc.discount_price
                            ? itc.discount_price
                            : itc.sale_price
                        }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="opt_goods">
                  <i
                    class="el-icon-top"
                    @click="changePackageIndex(1, index, idx, idxc)"
                    v-show="idxc != 0"
                  ></i>
                  <i
                    class="el-icon-bottom"
                    @click="changePackageIndex(2, index, idx, idxc)"
                    v-show="idxc != it.vendor_package_data.length - 1"
                  ></i>
                </div>
              </div>
            </template>
            <el-button
              v-show="formData.menu_data[index].length"
              @click="openPackageList(index)"
              class="add_goods"
              icon="el-icon-plus"
              type="success"
              size="mini"
              >添加</el-button
            >
          </div>
        </div>
        <div style="display: flex; margin-right: 15px">
          <el-button @click="copyMenu(index)" type="success" size="mini"
            >拷贝</el-button
          >
          <el-button @click="pasteMenu(index)" type="primary" size="mini"
            >粘贴</el-button
          >
          <el-button @click="clearMenu(index)" type="danger" size="mini"
            >清空</el-button
          >
        </div>
      </div>
    </div>
    <el-dialog title="历史版本" :visible.sync="historyMenuListDialog">
      <el-table
        empty-text="暂无历史版本"
        :data="historyMenuList"
        style="width: 100%"
      >
        <el-table-column prop="release_name" align="center" label="发布名称">
        </el-table-column>
        <el-table-column prop="menu_type_name" align="center" label="菜单类型">
        </el-table-column>
        <el-table-column prop="release_at" align="center" label="发布时间">
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="seeMenu(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      :title="typeEdit ? '编辑分类' : '新增分类'"
      :visible.sync="dialogTypeVisible"
    >
      <el-form label-width="80px">
        <el-form-item label="分类图片">
          <el-upload
            :file-list="label_image_file"
            :class="{ main_img_hide: label_image }"
            :limit="1"
            :action="$upLoadImgApi"
            list-type="picture-card"
            :on-success="upLoadImg"
            :on-preview="handlePreview"
            :on-remove="handleImgRemove"
            :data="{ token: $store.state.user.token }"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input
            placeholder="请输入菜单分类名称"
            v-model="type_name"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类时段">
          <el-select
            placeholder="请选择标签时段"
            clearable
            style="width: 100%"
            v-model="label_time_type_id"
          >
            <el-option
              v-for="item in timeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTypeVisible = false">取 消</el-button>
        <el-button type="primary" @click="editType">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      width="60%"
      title="门店套餐列表"
      :visible.sync="dialogTableVisible"
    >
      <el-row
        :gutter="20"
        style="margin-bottom: 20px; display: flex; justify-content: flex-end"
      >
        <el-col :span="15" style="display: flex">
          <el-input
            v-model="listData.name"
            :placeholder="`请输入套餐名称搜索`"
          ></el-input>
          <el-button
            style="margin-left: 20px"
            @click="getVendorPackageList"
            type="primary"
            icon="el-icon-search"
            >搜索</el-button
          >
        </el-col>
      </el-row>
      <el-tabs
        v-model="timeTabActive"
        style="margin-top: 15px"
        type="border-card"
      >
        <el-tab-pane
          v-for="item in vendorTimeList"
          :key="item.time_type_id"
          :label="item.time_type_name"
          :name="item.time_type_id"  
        >
          <el-table
            ref="multipleTable"
            :data="packageList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="套餐ID" align="center">
              <template slot-scope="scope">{{
                scope.row.vendor_package_id
              }}</template>
            </el-table-column>
            <el-table-column width="200" label="套餐图片" align="center">
              <template slot-scope="scope">
                <img style="width: 150px" :src="scope.row.main_image" alt="" />
              </template>
            </el-table-column>
            <el-table-column label="套餐名称" align="center">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="标签" align="center">
              <template slot-scope="scope">{{
                scope.row.package_label_name
              }}</template>
            </el-table-column>
            <el-table-column label="进货价" align="center">
              <template slot-scope="scope">{{
                scope.row.purchase_price
              }}</template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="listData.page"
            :limit.sync="listData.page_size"
            @pagination="getVendorPackageList"
          />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">返回</el-button>
        <el-button type="primary" @click="addMenu">添加到菜单</el-button>
      </span>
    </el-dialog>
    <el-dialog title="发布版本" :visible.sync="releaseMenuDialog">
      <el-input placeholder="请输入版本名称" v-model="release_name"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="releaseMenuDialog = false">取 消</el-button>
        <el-button type="primary" @click="releaseMenuClick">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <el-dialog title="提示" :visible.sync="pasteMenuDialog" width="30%" center>
      <span>是否确定覆盖当前小程序菜单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pasteMenuDialog = false">取 消</el-button>
        <el-button type="primary" @click="pasteBtn(pasteIndex)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="clearMenuDialog" width="30%" center>
      <span>是否确定清空当前小程序菜单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearMenuDialog = false">取 消</el-button>
        <el-button type="primary" @click="clearBtn(clearIndex)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="StoreMenuDialog" width="30%" center>
      <p v-for="(item, index) in defect_package_names" :key="index">
        {{ vendor_name }}没有预设套餐"{{ item }}"对应的门店套餐
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="StoreMenuDialog = false">取 消</el-button>
        <el-button type="primary" @click="copyTipFont">好的，复制</el-button>
      </span>
    </el-dialog>
    <textarea id="copyTxt" cols="30" rows="10"></textarea>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { vendorPackageList } from "@/api/basic";
import { getVendorTimeTypeData } from "@/api/operate/front_menu";
import { getTimeTypeData } from "@/api/store";
import {
  menuDetail,
  saveMenu,
  releaseMenu,
  historyMenu,
  copyVendorMenu,
} from "@/api/operate/front_menu";
import Pagination from "@/components/Pagination";
export default {
  props: {
    vendor_id: {
      type: String,
      default: "",
    },
    vendor_name: {
      type: String,
      default: "",
    },
    vendor_ids: {
      type: Array,
      default: [],
    },
  },
  components: { Pagination },
  data() {
    return {
      releaseStatus: 1,
      pageLoading: false,
      vendorTimeList: [],
      timeList: [],
      timeTabActive: "",
      MenuType: [
        {
          type: 1,
          name: "每天固定菜单",
        },
        {
          type: 2,
          name: "每周固定菜单",
        },
        {
          type: 3,
          name: "每月固定菜单",
        },
      ],
      formData: {
        vendor_menu_id: "",
        time_type: 1,
        menu_type: 1,
        menu_data: [],
      },
      dialogTypeVisible: false, //分类弹窗
      menu_data_index: 0,
      menu_data_c_index: 0,
      typeEdit: 0, //0新增分类，1编辑分类
      type_name: "",
      dialogTableVisible: false,
      listData: {
        status: 1,
        page: 1,
        vendor_ids: this.vendor_ids,
        page_size: 10,
        name: "",
      },
      packageList: [],
      loading: false,
      total: 0,
      menu_index: 0,
      vendor_package_index: 0,
      vendorpackageChecked: [],
      historyMenuList: [],
      historyMenuListDialog: false,
      releaseMenuDialog: false,
      release_name: "",
      label_image: "",
      label_image_file: [],
      dialogImageUrl: "",
      dialogVisible: false,
      copyMenuItem: [], //拷贝的菜单数据
      pasteMenuDialog: false,
      pasteIndex: 0, //拷贝菜单下标
      clearMenuDialog: false,
      clearIndex: 0, //清除菜单下标
      postVendorMenuIdFlag: false,
      label_time_type_id: "",
      label_time_type_name: "",
      StoreMenuDialog: false,
      defect_package_names: [],
    };
  },
  computed: {
    ...mapState(["app"]), //拷贝的菜单数据
    day_tip() {
      let day_tip = "";
      switch (this.formData.menu_type) {
        case 1:
          day_tip = "每天";
          break;
        case 2:
          day_tip = "周";
          break;
        case 3:
          day_tip = "号";
          break;
      }
      return day_tip;
    },
  },
  watch: {
    timeTabActive(val){
      if (val){
        this.getVendorPackageList();
      }
    },
    label_time_type_id(val) {
      if (val) {
        this.label_time_type_name = this.timeList.find(
          (item) => item.id == val
        ).name;
      } else {
        this.label_time_type_name = "";
      }
    },
    "formData.time_type"() {
      this.getMenuDetail();
    },
    "formData.menu_type"() {
      this.getMenuDetail();
    },
    dialogTypeVisible(flag) {
      if (!flag) {
        this.type_name = "";
        this.label_image = "";
        this.label_image_file = [];
        this.label_time_type_id = "";
      }
    },
  },
  filters: {
    time_type_name(time_type_id, vendorTimeList) {
      if (time_type_id && vendorTimeList.length) {
        return vendorTimeList.find((item) => item.time_type_id == time_type_id)
          .time_type_name;
      }
    },
  },
  created() {
    this.getVendorPackageList();
    this.getMenuDetail();
    this.getHistoryMenu();
    this.getVendorTimeTypeData();
    this.getTimeTypeData();
  },
  methods: {
    copyTipFont() {
      copyTxt.value = this.defect_package_names.join(",");
      copyTxt.select();
      document.execCommand("copy");
      this.StoreMenuDialog = false;
    },
    getTimeTypeData() {
      getTimeTypeData().then((res) => {
        this.timeList = res;
      });
    },
    //获取门店用餐时段列表
    getVendorTimeTypeData() {
      getVendorTimeTypeData({ vendor_id: this.vendor_ids[0] }).then((res) => {
        if (res.length) {
          this.timeTabActive = res[0].time_type_id || "";
          this.vendorTimeList = res;
        }
      });
    },
    //复制菜单
    copyMenu(index) {
      this.copyMenuItem = JSON.parse(
        JSON.stringify(this.formData.menu_data[index])
      );
      this.$store.commit("app/COPYMENUPARM", {
        copy_vendor_menu_id: this.formData.vendor_menu_id,
        copy_vendor_id: this.vendor_id,
        copy_day: index + 1,
      });
      this.$notify({
        title: "成功",
        message: "复制成功",
        type: "success",
        duration: 1000,
      });
    },
    //粘贴菜单
    pasteMenu(index) {
      if (this.formData.menu_data[index].length) {
        this.pasteMenuDialog = true;
        this.pasteIndex = index;
      } else {
        this.pasteBtn(index);
      }
    },
    pasteBtn(index) {
      if (this.app.copy_vendor_id == this.vendor_id) {
        this.$set(
          this.formData.menu_data,
          index,
          JSON.parse(JSON.stringify(this.copyMenuItem))
        );
      } else {
        copyVendorMenu({
          vendor_menu_id: this.app.copy_vendor_menu_id,
          day: this.app.copy_day,
          vendor_id: this.vendor_id,
        }).then((res) => {
          if (res.defect_package_names.length) {
            this.defect_package_names = res.defect_package_names;
            this.StoreMenuDialog = true;
          }
          if (res.vendor_menu_data && res.vendor_menu_data.length) {
            res.vendor_menu_data.forEach((item, index) => {
              if (index == 0) {
                item.checked = true;
              } else {
                item.checked = false;
              }
            });
            this.$set(
              this.formData.menu_data,
              index,
              JSON.parse(JSON.stringify(res.vendor_menu_data))
            );
          }
        });
      }
      this.pasteMenuDialog = false;
    },
    //清空菜单
    clearMenu(index) {
      if (!this.formData.menu_data[index].length) return;
      this.clearMenuDialog = true;
      this.clearIndex = index;
    },
    clearBtn() {
      this.formData.menu_data[this.clearIndex] = [];
      this.clearMenuDialog = false;
    },
    upNumCase(num) {
      let day_num = "";
      switch (num) {
        case 1:
          day_num = "一";
          break;
        case 2:
          day_num = "二";
          break;
        case 3:
          day_num = "三";
          break;
        case 4:
          day_num = "四";
          break;
        case 5:
          day_num = "五";
          break;
        case 6:
          day_num = "六";
          break;
        case 7:
          day_num = "日";
          break;
      }
      return day_num;
    },
    //获取历史版本菜单
    getHistoryMenu() {
      historyMenu({ vendor_id: this.vendor_id }).then((res) => {
        this.historyMenuList = res;
      });
    },
    //获取小程序菜单详情
    getMenuDetail() {
      this.pageLoading = true;
      let { time_type, menu_type } = this.formData;
      let aData = {
        time_type,
        menu_type,
        vendor_id: this.vendor_id,
      };
      if (this.postVendorMenuIdFlag) {
        aData.vendor_menu_id = this.formData.vendor_menu_id;
      }
      menuDetail(aData).then((res) => {
        this.releaseStatus = res.status;
        if (this.postVendorMenuIdFlag) {
          this.postVendorMenuIdFlag = false;
        }
        this.formData.menu_data = [];
        switch (menu_type) {
          case 1:
            this.formData.menu_data.push([]);
            break;
          case 2:
            for (let i = 0; i < 7; i++) {
              this.formData.menu_data.push([]);
            }
            break;
          case 3:
            for (let i = 0; i < 31; i++) {
              this.formData.menu_data.push([]);
            }
            break;
        }
        if (res.vendor_menu_id) {
          this.formData.vendor_menu_id = res.vendor_menu_id;
          res.vendor_menu_data.forEach((item) => {
            this.$set(this.formData.menu_data, item.day, item.list);
          });
          this.formData.menu_data.forEach((item, index) => {
            if (item.length) {
              item.forEach((it) => {
                this.$set(it, "checked", false);
              });
              this.$set(item[0], "checked", true);
            }
          });
        } else {
          this.formData.vendor_menu_id = "";
        }
        this.pageLoading = false;
      });
    },
    //切换分类
    typeClick(index, idx) {
      this.formData.menu_data[index].forEach((item, idx) => {
        item.checked = false;
      });
      this.formData.menu_data[index][idx].checked = true;
    },
    //打开分类弹窗
    openTypeDialog(index, type, type_name, label_image, time_type_id, idx) {
      if (type) {
        this.type_name = type_name;
        this.label_image = label_image;
        this.label_image_file = [{ name: "labelImageFile", url: label_image }];
        this.label_time_type_id = time_type_id;
        this.menu_data_c_index = idx;
      }
      this.typeEdit = type;
      this.dialogTypeVisible = true;
      this.menu_data_index = index;
    },
    //上传分类图片
    upLoadImg(res, file) {
      if (res.status) {
        this.label_image = res.data.image_url;
      }
    },
    //查看分类图片
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //删除分类图片
    handleImgRemove(file, fileList) {
      this.label_image = "";
    },
    //添加/编辑分类
    editType() {
      if (!this.type_name) {
        return this.$message({
          message: "请输入分类名称",
          type: "error",
          duration: 1000,
        });
      }
      if (!this.label_image) {
        return this.$message({
          message: "请选择分类图片",
          type: "error",
          duration: 1000,
        });
      }
      if (
        !this.typeEdit &&
        this.formData.menu_data[this.menu_data_index].find(
          (item) => this.type_name == item.label
        )
      ) {
        return this.$message({
          message: "分类名称重复，请重新输入",
          type: "error",
          duration: 1500,
        });
      }
      if (this.typeEdit) {
        this.formData.menu_data[this.menu_data_index][
          this.menu_data_c_index
        ].label = this.type_name;
        this.formData.menu_data[this.menu_data_index][
          this.menu_data_c_index
        ].label_image = this.label_image;
        this.formData.menu_data[this.menu_data_index][
          this.menu_data_c_index
        ].time_type_id = this.label_time_type_id;
        this.formData.menu_data[this.menu_data_index][
          this.menu_data_c_index
        ].time_type_name = this.label_time_type_name;
      } else {
        this.formData.menu_data[this.menu_data_index].push({
          label: this.type_name,
          label_image: this.label_image,
          time_type_id: this.label_time_type_id,
          time_type_name: this.label_time_type_name,
          vendor_package_data: [],
          checked: !this.formData.menu_data[this.menu_data_index].length
            ? true
            : false,
        });
      }
      this.dialogTypeVisible = false;
    },
    //删除分类
    delType(index, idx) {
      this.formData.menu_data[index].splice(idx, 1);
    },
    //打开门店套餐列表弹窗
    openPackageList(index) {
      this.menu_index = index;
      this.vendor_package_index = this.formData.menu_data[index].findIndex(
        (item) => item.checked
      );
      this.dialogTableVisible = true;
    },
    //门店套餐列表
    getVendorPackageList() {
      this.loading = true;
      this.listData.time_type_id = this.timeTabActive;
      vendorPackageList(this.listData).then((res) => {
        this.total = res.count;
        this.packageList = res.list;
        this.loading = false;
      });
    },
    //选择门店套餐
    handleSelectionChange(val) {
      val.forEach((item) => {
        item.time_type_id = this.timeTabActive;
      });
      this.vendorpackageChecked = val;
    },
    //添加门店套餐到菜单
    addMenu() {
      let obj = {};
      let cache = [];
      let arr = this.formData.menu_data[this.menu_index][
        this.vendor_package_index
      ].vendor_package_data.concat(this.vendorpackageChecked);
      for (const t of arr) {
        if (
          cache.find(
            (c) =>
              c.time_type_id === t.time_type_id &&
              c.vendor_package_id === t.vendor_package_id
          )
        ) {
          continue;
        }
        cache.push(t);
      }
      this.formData.menu_data[this.menu_index][
        this.vendor_package_index
      ].vendor_package_data = JSON.parse(JSON.stringify(cache));
      this.dialogTableVisible = false;
      //this.$refs.multipleTable.clearSelection();
    },
    //删除门店套餐
    delGoods(index, idx, idxc) {
      this.formData.menu_data[index][idx].vendor_package_data.splice(idxc, 1);
    },
    //门店套餐向上或向下调整位置
    changePackageIndex(type, index, idx, idxc) {
      let vendor_package_data = this.formData.menu_data[index][idx]
        .vendor_package_data;
      if (type == 1) {
        vendor_package_data[idxc] = vendor_package_data.splice(
          idxc - 1,
          1,
          vendor_package_data[idxc]
        )[0];
      } else {
        vendor_package_data[idxc] = vendor_package_data.splice(
          idxc + 1,
          1,
          vendor_package_data[idxc]
        )[0];
      }
    },
    //保存
    saveMenuClick() {
      let aData = JSON.parse(JSON.stringify(this.formData));
      aData.vendor_id = this.vendor_id;
      let menu_data = [];
      aData.menu_data.forEach((item, index) => {
        menu_data.push([]);
        item.forEach((it, idx) => {
          let vendor_package_data = [];
          it.vendor_package_data.forEach((itd) => {
            vendor_package_data.push({
              time_type_id: itd.time_type_id,
              vendor_package_id: itd.vendor_package_id,
            });
          });
          menu_data[index].push({
            label: it.label,
            label_image: it.label_image,
            time_type_id: it.time_type_id,
            vendor_package_data,
          });
        });
      });
      aData.menu_data = JSON.stringify(menu_data);
      saveMenu(aData).then((res) => {
        if (res) {
          this.formData.vendor_menu_id = res.vendor_menu_id;
          this.$confirm("已保存当前菜单，是否一并发布到小程序菜单？", "提示", {
            confirmButtonText: "发布",
            cancelButtonText: "不用了",
            type: "warning",
          })
            .then(() => {
              this.openReleaseMenu();
            })
            .catch(() => {
              this.releaseStatus = 0;
            });
        }
      });
    },
    //打开发布弹窗
    openReleaseMenu() {
      if (!this.formData.vendor_menu_id) {
        return this.$message({
          message: "请先保存菜单再进行发布",
          type: "error",
          duration: 1500,
        });
      }
      this.releaseMenuDialog = true;
    },
    //发布
    releaseMenuClick() {
      releaseMenu({
        vendor_menu_id: this.formData.vendor_menu_id,
        release_name: this.release_name,
      }).then((res) => {
        if (res) {
          this.getHistoryMenu();
          this.releaseMenuDialog = false;
          this.releaseStatus = 1;
          this.$notify({
            title: "成功",
            message: "发布成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    //查看历史版本
    seeMenu(item) {
      this.postVendorMenuIdFlag = true;
      this.formData.vendor_menu_id = item.vendor_menu_id;
      this.formData.vendor_id = item.vendor_id;
      this.formData.menu_type = item.menu_type;
      this.formData.time_type = item.time_type;
      this.getMenuDetail();
      this.historyMenuListDialog = false;
    },
  },
};
</script>
<style lang="scss">
#copyTxt {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: -20;
}
.main_img_hide .el-upload--picture-card {
  display: none;
}
img[src=""],
img:not([src]) {
  opacity: 1;
}
.menu_box {
  min-height: 200px;
  display: flex;
  flex-wrap: wrap;
  .menu_box_content {
    margin: 0 15px 15px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    .day_tip {
      margin: 15px 20px 10px 0;
      font-size: 14px;
      color: #666;
    }
    .menu {
      display: flex;
      border: 1px solid #ddd;
      width: 380px;
      margin: 0 15px 15px 0;
      .type_list {
        width: 40%;
        height: 600px;
        overflow-y: auto;
        background-color: #eee;
        .type_item {
          cursor: pointer;
          padding: 15px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 14px;
          color: #666;
          border-bottom: 1px solid #ddd;
          div {
            display: flex;
            margin-top: 10px;
          }
          p {
            width: 100%;
            text-align: center;
            padding: 0 10px;
          }
          i {
            cursor: pointer;
            font-size: 16px;
            margin-right: 13px;
          }
          .el-icon-edit {
            color: blue;
          }
          .el-icon-error {
            color: red;
          }
        }
        .add_type {
          display: flex;
          justify-content: center;
          margin: 10px auto;
        }
      }
      .goods_list {
        width: 60%;
        height: 600px;
        overflow-y: auto;
        .goods_item {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          i {
            cursor: pointer;
          }
          .goods_info {
            width: 150px;
            position: relative;
            display: flex;
            flex-direction: column;
            .el-icon-error {
              font-size: 20px;
              position: absolute;
              right: -10px;
              top: -10px;
              color: red;
            }
            .time_type_font {
              position: absolute;
              top: 0;
              left: 0;
              background-color: #fff;
              font-size: 14px;
              color: #666;
              padding: 5px 15px;
              border: 1px solid #ddd;
            }
            .goods_img {
              width: 150px;
              height: 150px;
            }
            .goods_sth {
              padding: 10px;
              background-color: #eee;
              .goods_title {
                font-size: 14px;
                color: #666;
              }
              .goods_price {
                display: flex;
                margin-top: 10px;
                font-size: 14px;
                p {
                  margin-right: 10px;
                }
              }
            }
          }
          .opt_goods {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            i {
              font-size: 20px;
              margin-bottom: 15px;
            }
          }
        }
        .add_goods {
          display: flex;
          justify-content: center;
          margin: 20px auto;
        }
      }
    }
  }
}
</style>

