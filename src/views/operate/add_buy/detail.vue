<template>
  <div class="app-container">
    <h2>套餐加购模版详情</h2>
    <el-row :gutter="12" style="margin-top: 15px">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>套餐加购模版ID</p>
            <p>{{ detail.id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>主套餐</p>
            <p>{{ detail.package_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <div class="item_flex">
            <p>搭配套餐</p>
            <p>{{ detail.purchased_vendor_package_names.join(",") }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>创建人</p>
            <p>{{ detail.created_user_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>创建时间</p>
            <p>{{ detail.created_at }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row
      v-if="detail.can_edit"
      :gutter="12"
      style="margin-top: 15px; display: flex; align-items: flex-end"
    >
      <el-col :span="10">
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
      <el-col :span="10">
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
      <el-col :span="4">
        <el-button @click="saveBtn" type="primary" style="margin-bottom: 15px"
          >保存</el-button
        >
      </el-col>
    </el-row>
    <el-row
      v-else
      :gutter="12"
      style="margin-top: 15px; display: flex; align-items: flex-end"
    >
      <el-col :span="10">
        <el-card shadow="always">
          <div class="item_flex">
            <p>选择引用门店</p>
            <p>
              {{ detail.vendor_names }}
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="always">
          <div class="item_flex">
            <p>引用日期</p>
            <p>{{ detail.valid_at_start }}至{{ detail.valid_at_end }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" style="margin-top: 15px">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>状态</p>
            <p>
              <el-tag v-if="detail.status == -1" type="danger"> 已禁用 </el-tag>
              <el-tag v-else-if="detail.status == 0" type="warning">
                待启用
              </el-tag>
              <el-tag v-else type="success"> 已启用 </el-tag>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" v-if="detail.can_enable || detail.can_disable">
        <el-card shadow="always">
          <div class="item_flex">
            <p>操作</p>
            <p>
              <el-button
                v-if="detail.can_enable"
                type="success"
                @click="updateStatus(1)"
                size="mini"
                >启用</el-button
              >
              <el-button
                v-if="detail.can_disable"
                type="danger"
                @click="updateStatus(-1)"
                size="mini"
                >禁用</el-button
              >
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="content-box">
      <div style="margin: 0 auto 20px; border: 1px solid #ddd">
        <div class="content-box-img">
          <img :src="detail.package_image" alt="" />
          <p>{{ detail.time_type_name }}</p>
        </div>
        <p class="content-box-title">{{ detail.package_name }}</p>
        <p class="content-box-describe" v-if="detail.package_desc">
          {{ detail.package_desc }}
        </p>
      </div>
      <div
        class="feeding"
        v-for="(item, index) in detail.purchased_data"
        :key="index"
      >
        <el-card shadow="always" style="margin-top: 15px">
          <p style="margin-bottom: 10px">{{ item.title }}</p>
          <el-card shadow="always">
            <div class="feeding-content">
              <div
                class="feeding-item"
                v-for="(it, idx) in item.package_data"
                :key="idx"
              >
                <div class="feeding-item-img">
                  <img :src="it.image" alt="" />
                  <p>{{ it.time_type_name }}</p>
                </div>
                <p class="package_name">{{ it.package_name }}</p>
                <p class="desc">{{ it.desc }}</p>
                <p class="price">加购价￥{{ it.sale_price }}</p>
              </div>
            </div>
          </el-card>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { searchStoreList } from "@/api/basic";
import { getDetail, updateStatus, updateApi } from "@/api/operate/add_buy";
export default {
  data() {
    return {
      detail: {},
      valid_at: [],
      storeList: [],
      vendor_ids: [],
    };
  },
  created() {
    this.getDetail();
    this.getStoreList();
  },
  methods: {
    //获取店铺列表
    getStoreList() {
      searchStoreList().then((res) => {
        this.storeList = res;
      });
    },
    getDetail() {
      getDetail({ id: this.$route.query.id }).then((res) => {
        if (res.valid_at_start){
          this.valid_at[0] = res.valid_at_start
        }
        if (res.valid_at_end){
          this.valid_at[1] = res.valid_at_end
        }
        if (res.vendor_ids && res.vendor_ids.length){
          res.vendor_ids.forEach(item => {
            this.vendor_ids.push(Number(item))
          })
        }
        this.detail = res;
      });
    },
    updateStatus(status) {
      updateStatus({
        id: this.detail.id,
        status,
      }).then((res) => {
        if (res) {
          this.$set(this.detail, status == 1 ? "can_enable" : "can_disable", 0);
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    saveBtn() {
      if (!this.vendor_ids.length) {
        return this.$message({
          message: "请选择引用门店",
          type: "error",
          duration: 1000,
        });
      }
      if (!this.valid_at.length) {
        return this.$message({
          message: "请选择引用日期",
          type: "error",
          duration: 1000,
        });
      }
      updateApi({
        id: this.detail.id,
        vendor_ids: JSON.stringify(this.vendor_ids),
        valid_at_start: this.valid_at[0],
        valid_at_end: this.valid_at[1],
      }).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success",
            duration: 1000,
          });
          this.getDetail();
        }
      });
    },
  },
};
</script>

<style scoped>
.content-box {
  margin: 20px 0;
  width: 530px;
  padding: 20px;
  border: 1px solid #ddd;
}
.content-box-img {
  position: relative;
  width: 100%;
  height: 200px;
}
.content-box-img img {
  width: 100%;
  height: 100%;
}
.content-box-img p {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  font-size: 14px;
  padding: 5px 20px;
}
.content-box-title {
  background-color: #ddd;
  padding: 10px;
  font-size: 14px;
}
.feeding-content {
  display: flex;
  flex-wrap: wrap;
}
.feeding-item {
  width: 120px;
  margin: 0 20px 20px 0;
}
.feeding-item:nth-child(3n + 0) {
  margin-right: 0;
}
.feeding-item-img {
  position: relative;
  width: 100%;
  height: 120px;
}
.feeding-item-img p {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  font-size: 12px;
  padding: 5px 15px;
}
.feeding-item-img img {
  width: 100%;
  height: 100%;
}
.content-box-describe {
  padding: 10px;
  font-size: 12px;
}
.package_name {
  font-size: 14px;
  margin-top: 5px;
}
.desc {
  font-size: 12px;
  margin: 3px 0;
}
.price {
  font-size: 14px;
  color: #ff6600;
}
</style>