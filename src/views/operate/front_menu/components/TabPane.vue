<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="4">
        <el-select
          style="width: 100%"
          v-model="formData.time_type"
          placeholder="请选择就餐时段"
        >
          <el-option
            v-for="item in timeList"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          >
          </el-option>
        </el-select>
      </el-col>
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
      <el-col :span="4">
        <el-button icon="el-icon-check" @click="saveMenuClick" type="primary"
          >保存</el-button
        >
        <el-button icon="el-icon-plus" @click="releaseMenuClick" type="success"
          >发布</el-button
        >
      </el-col>
      <el-col :span="12" style="display: flex; justify-content: flex-end">
        <el-button @click="historyMenuListDialog = true" type="warning"
          >历史版本</el-button
        >
      </el-col>
    </el-row>
    <div class="menu_box" v-loading="pageLoading">
      <div class="menu" v-for="(item, index) in formData.menu_data">
        <div class="type_list">
          <div
            @click="typeClick(it.label, index,idx)"
            class="type_item"
            :style="it.checked ? 'background-color: #fff' : ''"
            v-for="(it, idx) in item"
          >
            <p>{{ it.label }}</p>
            <i
              @click="openTypeDialog(index, 1, it.label, idx)"
              class="el-icon-edit"
            ></i>
            <i @click="delType(index, idx)" class="el-icon-error"></i>
          </div>
          <el-button
            @click="openTypeDialog(index)"
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
                        itc.discount_price ? itc.discount_price : itc.sale_price
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
    </div>
    <el-dialog title="历史版本" :visible.sync="historyMenuListDialog">
      <el-table
        empty-text="暂无历史版本"
        :data="historyMenuList"
        style="width: 100%"
      >
        <el-table-column prop="menu_type_name" align="center" label="菜单类型">
        </el-table-column>
        <el-table-column prop="created_at" align="center" label="创建时间">
        </el-table-column>
        <el-table-column prop="created_at" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="seeMenu(scope.row.vendor_menu_id)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      :title="typeEdit ? '编辑分类' : '新增分类'"
      :visible.sync="dialogTypeVisible"
    >
      <el-input placeholder="请输入菜单分类名称" v-model="type_name"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTypeVisible = false">取 消</el-button>
        <el-button type="primary" @click="editType">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="60%"
      title="门店套餐列表"
      :visible.sync="dialogTableVisible"
    >
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="20">
          <el-input
            v-model="listData.name"
            :placeholder="`请输入套餐名称搜索`"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            @click="getVendorPackageList"
            type="primary"
            icon="el-icon-search"
            >搜索</el-button
          >
        </el-col>
      </el-row>
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
          <template slot-scope="scope">{{ scope.row.purchase_price }}</template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listData.page"
        :limit.sync="listData.page_size"
        @pagination="getVendorPackageList"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">返回</el-button>
        <el-button type="primary" @click="addMenu">添加到菜单</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { vendorPackageList } from "@/api/basic";
import {
  menuDetail,
  saveMenu,
  releaseMenu,
  historyMenu,
} from "@/api/operate/front_menu";
import Pagination from "@/components/Pagination";
export default {
  props: {
    vendor_id: {
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
      pageLoading: false,
      timeList: [
        {
          type: 1,
          name: "早餐",
        },
        {
          type: 2,
          name: "早茶",
        },
        {
          type: 3,
          name: "午餐",
        },
        {
          type: 4,
          name: "下午茶",
        },
        {
          type: 5,
          name: "晚餐",
        },
        {
          type: 6,
          name: "宵夜",
        },
      ],
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
    };
  },
  watch: {
    "formData.time_type"() {
      this.getMenuDetail();
    },
    "formData.menu_type"() {
      this.getMenuDetail();
    },
  },
  created() {
    this.getVendorPackageList();
    this.getMenuDetail();
    this.getHistoryMenu();
  },
  methods: {
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
      menuDetail({ time_type, menu_type, vendor_id: this.vendor_id }).then(
        (res) => {
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
              this.formData.menu_data[item.day] = item.list;
            });
            this.formData.menu_data.forEach((item) => {
              if (item.length) {
                item.checked = false;
                item[0].checked = true;
              }
            });
          }
          console.log(this.formData.menu_data)
          this.pageLoading = false;
        }
      );
    },
    //切换分类
    typeClick(label, index,idx) {    
      this.formData.menu_data[index].forEach((item,idx) => {
        item.checked = false;
      });
      this.formData.menu_data[index][idx].checked = true;
      console.log(this.formData.menu_data)
    },
    //打开分类弹窗
    openTypeDialog(index, type, type_name, idx) {
      if (type) {
        this.typeEdit = type;
        this.type_name = type_name;
        this.menu_data_c_index = idx;
      } else {
        this.type_name = "";
      }
      this.dialogTypeVisible = true;
      this.menu_data_index = index;
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
      if (
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
      } else {
        this.formData.menu_data[this.menu_data_index].push({
          label: this.type_name,
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
      vendorPackageList(this.listData).then((res) => {
        this.total = res.count;
        this.packageList = res.list;
        this.loading = false;
      });
    },
    //选择门店套餐
    handleSelectionChange(val) {
      this.vendorpackageChecked = val;
    },
    //添加门店套餐到菜单
    addMenu() {
      let arr = this.formData.menu_data[this.menu_index][
        this.vendor_package_index
      ].vendor_package_data.concat(this.vendorpackageChecked);
      this.formData.menu_data[this.menu_index][
        this.vendor_package_index
      ].vendor_package_data = Array.from(new Set(arr));
      this.dialogTableVisible = false;
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
          let vendor_package_ids = [];
          it.vendor_package_data.forEach((itd) => {
            vendor_package_ids.push(itd.vendor_package_id);
          });
          menu_data[index].push({
            label: it.label,
            vendor_package_ids: vendor_package_ids.join(","),
          });
        });
      });
      aData.menu_data = JSON.stringify(menu_data);
      saveMenu(aData).then((res) => {
        if (res) {
          this.formData.vendor_menu_id = res.vendor_menu_id;
          this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    //发布
    releaseMenuClick() {},
    //查看历史版本
    seeMenu() {},
  },
};
</script>
<style lang="scss" scoped>
img[src=""],
img:not([src]) {
  opacity: 1;
}
.menu_box {
  min-height: 200px;
  display: flex;
  flex-wrap: wrap;
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
        align-items: center;
        font-size: 14px;
        color: #666;
        border-bottom: 1px solid #ddd;
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
</style>

