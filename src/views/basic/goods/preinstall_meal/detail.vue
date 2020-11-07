<template>
  <div class="app-container">
    <h2>预设套餐详情</h2>
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
                  <p>{{ detail.package_id }}</p>
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
                  <p>建议销售价</p>
                  <p>{{ detail.sale_price }}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>厨师</p>
                  <p>{{ detail.created_user_name }}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="5">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>创建时间</p>
                  <p>{{ detail.created_at }}</p>
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
import { packageDetail } from "@/api/basic";
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
    //预设套餐详情
    getDetail() {
      packageDetail({ package_id: this.$route.query.package_id }).then(
        (res) => {
          this.detail = res;
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>