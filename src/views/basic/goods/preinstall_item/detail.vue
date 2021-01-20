<template>
  <div class="app-container">
    <h2>预设单品详情</h2>
    <el-card shadow="always">
      <el-form label-width="100px">
        <el-form-item label="单品名称">
          <p>{{ detail.name }}</p>
        </el-form-item>
        <el-form-item label="单品图">
          <img :src="detail.image" alt="" />
        </el-form-item>
        <el-form-item label="单品信息">
          <el-row :gutter="12">
            <el-col :span="3">
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
                  <p>分类</p>
                  <p>{{ detail.category_name }}</p>
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
                  <p>重量</p>
                  <p>{{ detail.weight }}</p>
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
          <el-row style="margin-top: 15px" :gutter="12">
            <el-col :span="6">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>供应商</p>
                  <p>{{ detail.supplier_name }}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
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
        </el-form-item>
        <el-form-item label="单品要求">
          <el-row :gutter="12">
            <el-col :span="4">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>加热速率</p>
                  <p>{{ detail.heating_rate }}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>敏感度</p>
                  <p>{{ detail.temperature_curve_sensitive_name }}</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>单元格位置</p>
                  <p>{{ detail.cell_location_name }}</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="加工指标">
          <el-card shadow="always">
            <p>{{ detail.process_indicators }}</p>
          </el-card>
        </el-form-item>
        <el-form-item label="质量标准">
          <el-card shadow="always">
            <p>{{ detail.quality_standard }}</p>
          </el-card>
        </el-form-item>
        <el-form-item label="材料">
          <el-row
            style="margin-bottom: 15px"
            :gutter="12"
            v-for="item in detail.material_data"
          >
            <el-col :span="6" v-for="it in item">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>{{ it.material_name }}</p>
                  <p>{{ it.num }}{{ it.unit_name }}</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="调料">
          <el-row
            style="margin-bottom: 15px"
            :gutter="12"
            v-for="item in detail.seasoning_data"
          >
            <el-col :span="6" v-for="it in item">
              <el-card shadow="always">
                <div class="item_flex">
                  <p>{{ it.seasoning_name }}</p>
                  <p>{{ it.num }}{{ it.unit_name }}</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-form-item>
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
    //预设单品详情
    getDetail() {
      productDetail({ id: this.$route.query.id }).then((res) => {
        const material_data = [],
          seasoning_data = [];
        for (let i = 0; i < res.material_data.length; i += 4) {
          material_data.push(res.material_data.slice(i, i + 4));
        }
        for (let i = 0; i < res.seasoning_data.length; i += 4) {
          seasoning_data.push(res.seasoning_data.slice(i, i + 4));
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

<style lang="scss" scoped>
img {
  width: 200px;
  height: 200px;
}
</style>