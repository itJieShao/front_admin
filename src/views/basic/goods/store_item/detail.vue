<template>
  <div class="app-container">
    <h2>门店单品详情</h2>
    <el-card shadow="always">
      <el-form label-width="100px">
        <el-form-item label="单品名称">
          <p>{{ detail.name }}</p>
        </el-form-item>
        <el-form-item label="单品图片">
          <img style="width: 148px; height: 148px" :src="detail.image" alt="" />
        </el-form-item>
        <el-form-item label="餐盒图片" v-if="detail.box_image">
          <img style="width: 148px; height: 148px" :src="detail.box_image" alt="" />
        </el-form-item>
        <el-divider />
        <el-form-item label="单品信息">
          <el-col :span="20">
            <el-row :gutter="12">
              <el-col :span="4">
                <el-card shadow="always">
                  <div class="item_flex">
                    <p>单品ID</p>
                    <p>{{ detail.id }}</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="4">
                <el-card shadow="always">
                  <div class="item_flex">
                    <p>标签</p>
                    <p>{{ detail.category_name }}</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="4">
                <el-card shadow="always">
                  <div class="item_flex">
                    <p>门店库存</p>
                    <p>{{ detail.vendor_qty }}</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="4">
                <el-card shadow="always">
                  <div class="item_flex">
                    <p>包装规格</p>
                    <p>{{ detail.package_box_name }}</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="4">
                <el-card shadow="always">
                  <div class="item_flex">
                    <p>味型</p>
                    <p>{{ detail.taste_name }}</p>
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
            </el-row>
          </el-col>
          <el-col :span="20" style="margin-top: 15px">
            <el-row :gutter="12">
              <el-col :span="8">
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
                    <p>上次进货价</p>
                    <p>{{ detail.last_purchase_price }}</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="4">
                <el-card shadow="always">
                  <div class="item_flex">
                    <p>成本预警价</p>
                    <p>{{ detail.warn_cost_price }}</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="4">
                <el-card shadow="always">
                  <div class="item_flex">
                    <p>基础成本价</p>
                    <p>{{ detail.cost_price }}</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="4">
                <el-card shadow="always">
                  <div class="item_flex">
                    <p>毛利率</p>
                    <p>{{ detail.profit_rate }}</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-form-item>
        <el-divider />
        <el-form-item label="加工指标">
          <el-card shadow="always">
            <div>{{ detail.process_indicators }}</div>
          </el-card>
        </el-form-item>
        <el-divider />
        <el-form-item label="质量标准">
          <el-card shadow="always">
            <div>{{ detail.quality_standard }}</div>
          </el-card>
        </el-form-item>
        <el-divider />
        <el-form-item label="材料">
          <el-col :span="20">
            <el-row
            style="margin-bottom:15px;"
              :gutter="12"
              v-for="(item, index) in detail.material_data"
              :key="index"
            >
              <el-col :span="4" v-for="(it, idx) in item" :key="idx">
                <el-card shadow="always">
                  <div class="item_flex">
                    <p>{{ it.material_name }}</p>
                    <p>{{ it.num }}/{{ it.unit_name }}</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-form-item>
        <el-divider />
        <el-form-item label="调料">
          <el-col  :span="20">
            <el-row
              style="margin-bottom:15px;"
              :gutter="12"
              v-for="(item, index) in detail.seasoning_data"
              :key="index"
            >
              <el-col :span="4" v-for="(it, idx) in item" :key="idx">
                <el-card shadow="always">
                  <div class="item_flex">
                    <p>{{ it.seasoning_name }}</p>
                    <p>{{ it.num }}/{{ it.unit_name }}</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-form-item> 
        <el-divider />
        <el-form-item label="温度曲线" v-if="detail.xAxis">
          <Echart
            id="chart"
            width="100%"
            height="300px"
            :xAxis="detail.xAxis"
            :series="detail.series"
          />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { productDetail } from "@/api/basic";
import Echart from "@/components/Echart";
export default {
  data() {
    return {
      detail: {},
    };
  },
  components: {
    Echart,
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      productDetail({
        vendor_product_id: this.$route.query.vendor_product_id,
      }).then((res) => {
        const material_data = [],
          seasoning_data = [];
        for (let i = 0; i < res.material_data.length; i += 6) {
          material_data.push(res.material_data.slice(i, i + 6));
        }
        for (let i = 0; i < res.seasoning_data.length; i += 6) {
          seasoning_data.push(res.seasoning_data.slice(i, i + 6));
        }
        res.material_data = material_data;
        res.seasoning_data = seasoning_data;
        const xAxis = [],
          series = [];
        res.temperature_curve.forEach((item) => {
          xAxis.push(item.time);
          series.push(item.temperature);
        });
        res.xAxis = xAxis;
        res.series = series;
        this.detail = res;
      });
    },
  },
};
</script>