<template>
  <div class="app-container">
    <!-- <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-select
          style="width: 100%"
          v-model="vendor_ids"
          filterable
          multiple
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
      </el-col>
      <el-col :span="4">
        <el-button @click="addTab" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
    </el-row> -->
    <el-tabs v-model="tabActive" style="margin-top: 15px" type="border-card">
      <el-tab-pane
        v-for="item in storeList"
        :key="item.vendor_id"
        :label="item.vendor_name"
        :name="item.vendor_id"
      >
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
            <el-button icon="el-icon-check" @click="addTab" type="primary"
              >保存</el-button
            >
            <el-button icon="el-icon-plus" @click="addTab" type="success"
              >发布</el-button
            >
          </el-col>
        </el-row>
        <div class="menu_box">
          <div class="menu" v-for="(item, index) in formData.menu_data">
            <div class="type_list">
              <div
                class="type_item"
                style="background-color: #fff"
                v-for="(it, idx) in item"
              >
                <p>{{ it.label }}</p>
                <i
                  @click="openTypeDialog(index, 1, it.label, idx)"
                  class="el-icon-edit"
                ></i>
                <i class="el-icon-error"></i>
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
              <div class="goods_item">
                <div class="goods_info">
                  <i class="el-icon-error"></i>
                  <img class="goods_img" src="" alt="" />
                  <div class="goods_sth">
                    <p class="goods_title">
                      土豆啤酒鸭套餐土豆啤酒鸭套餐土豆啤酒鸭套餐
                    </p>
                    <p class="goods_price">￥19.8</p>
                  </div>
                </div>
                <div class="opt_goods">
                  <i class="el-icon-top"></i>
                  <i class="el-icon-bottom"></i>
                </div>
              </div>
              <el-button
                class="add_goods"
                icon="el-icon-plus"
                type="success"
                size="mini"
                >添加</el-button
              >
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

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
  </div>
</template>

<script>
import { searchStoreList } from "@/api/basic";
export default {
  data() {
    return {
      storeList: [],
      tabActive: "",
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
        vendor_id: "",
        time_type: "",
        menu_type: 1,
        menu_data: [[]],
      },
      dialogTypeVisible: false, //分类弹窗
      menu_data_index: 0,
      menu_data_c_index: 0,
      typeEdit: 0, //0新增分类，1编辑分类
      type_name: "",
      vendor_ids: "",
    };
  },
  watch: {
    "formData.menu_type"(menu_type) {
      let defaultItem = [{ label: "猜你喜欢", vendor_package: [] }];
      switch (menu_type) {
        case 1:
          this.formData.menu_data = [];
          this.formData.menu_data.push(defaultItem);
          break;
        case 2:
          this.formData.menu_data = [];
          for (let i = 0; i < 7; i++) {
            this.formData.menu_data.push(defaultItem);
          }
          break;
        case 3:
          this.formData.menu_data = [];
          for (let i = 0; i < 31; i++) {
            this.formData.menu_data.push(defaultItem);
          }
          break;
      }
    },
  },
  created() {
    this.getStoreList();
  },
  methods: {
    //打开分类弹窗
    openTypeDialog(index, type, type_name, idx) {
      if (type) {
        this.typeEdit = type;
        this.type_name = type_name;
        this.menu_data_c_index = idx;
      }
      this.dialogTypeVisible = true;
      this.menu_data_index = index;
    },
    //添加/编辑分类
    editType() {
      if (this.typeEdit) {
        this.formData.menu_data[this.menu_data_index][
          this.menu_data_c_index
        ].label = this.type_name;
      } else {
        this.formData.menu_data[this.menu_data_index].push({
          label: this.type_name,
          vendor_package: [],
        });
      }
      this.dialogTypeVisible = false;
    },
    getStoreList() {
      searchStoreList().then((res) => {
        res.forEach((item) => (item.vendor_id = item.vendor_id.toString()));
        this.tabActive = res[0].vendor_id;
        this.storeList = res;
      });
    },
    addTab() {
      let { vendor_ids, storeList } = this;
      let index = storeList.findIndex((item) => item.vendor_id == vendor_ids);
      if (vendor_ids.length > 0 && index == -1) {
        let vendor_name = "";
        storeList.forEach((item) => {
          vendor_ids.forEach((it) => {
            if (item.vendor_id == it) {
              vendor_name += item.vendor_name + ",";
            }
          });
        });
        this.storeList.push({
          vendor_id: vendor_ids,
          vendor_name: vendor_name.substring(0, vendor_name.length - 1),
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
img[src=""],
img:not([src]) {
  opacity: 1;
}
.menu_box {
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
              margin-top: 10px;
              font-size: 14px;
              color: red;
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