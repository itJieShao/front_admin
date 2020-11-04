<template>
  <div class="app-container">
    <h2>门店套餐详情</h2>
    <el-card shadow="always">
      <el-form label-width="100px">
        <el-form-item label="套餐标题">
          <p>{{ detail.name }}</p>
        </el-form-item>
        <el-form-item label="套餐主图">
          <img :src="detail.main_image" alt="" />
        </el-form-item>
        <el-form-item label="套餐轮播图">
          <div class="imgs_box">
            <img v-for="item in detail.image" :src="item" alt="" />
          </div>
        </el-form-item>
        <el-form-item label="套餐信息">
          <el-row :gutter="12">
            <el-col :span="4">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>套餐ID</p>
                  <p>{{ detail.vendor_package_id }}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>门店</p>
                  <p>{{ detail.vendor_name }}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>标签</p>
                  <p>{{ detail.package_label_name }}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>库存</p>
                  <p>{{ detail.qty }}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>进货价</p>
                  <p>{{ detail.purchase_price }}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="3">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>销售原价</p>
                  <p>{{ detail.sale_price }}</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row style="margin-top: 15px" :gutter="12">
            <el-col :span="4">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>优惠</p>
                  <p>{{ detail.coupon_name }}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>套餐号</p>
                  <p>{{ detail.take_code }}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>上架时间</p>
                  <p>{{ detail.shelves_at }}</p>
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
            <el-col :span="4">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>套餐状态</p>
                  <p>{{ detail.status == 1 ? "已上架" : "已下架" }}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>操作</p>
                  <p>
                    <el-tag @click="updateStatus" style="cursor: pointer;" :type="detail.status == 1 ? 'danger':'success'" effect="dark">
                      {{ detail.status == 1 ? "下架" : "上架" }}
                    </el-tag>
                  </p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="套餐单品">
          <el-card shadow="always">
            <el-table :data="detail.product_data">
              <el-table-column align="center" prop="product_name" label="单品">
              </el-table-column>
              <el-table-column align="center" prop="product_num" label="数量">
              </el-table-column>
            </el-table>
          </el-card>
        </el-form-item>
        <el-form-item label="套餐介绍">
          <el-card shadow="always">
            <p>{{ detail.desc }}</p>
          </el-card>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { vendorPackageDetail,vendorPackageUpdateStatus } from "@/api/basic";
export default {
  data() {
    return {
      detail: {},
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    //门店套餐详情
    getDetail() {
      vendorPackageDetail({
        vendor_package_id: this.$route.query.vendor_package_id,
      }).then((res) => {
        this.detail = res;
      });
    },
    updateStatus() {
      vendorPackageUpdateStatus({
        vendor_package_ids:[this.detail.vendor_package_id],
        status: this.detail.status ? 0 : 1,
      }).then((res) => {
        this.detail.status = this.detail.status ? 0 : 1;
        this.$notify({
          title: "成功",
          message: "操作成功",
          type: "success",
          duration: 1000,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
img {
  width: 200px;
  height: 200px;
}
.imgs_box {
  display: flex;
  flex-wrap: wrap;
  img {
    margin: 0 20px 20px 0;
  }
}
.item_flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  word-wrap: break-word;
  word-break: break-all;
  p {
    height: 30px;
    line-height: 30px;
  }
  p:last-child {
    width: 100%;
    text-align: center;
    padding-top: 8px;
    margin-top: 10px;
    border-top: 1px solid #ddd;
    color: #999;
  }
}
</style>