<template>
  <div class="app-container">
    <h2>盘货记录详情</h2>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>盘货ID</p>
            <p>{{ detail.id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>门店ID</p>
            <p>{{ detail.vendor_id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>门店名称</p>
            <p>{{ detail.vendor_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>盘货时间</p>
            <p>{{ detail.inventory_at }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>运营管理人员</p>
            <p>{{ detail.operating_user_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>盘货人员</p>
            <p>{{ detail.inventory_user_name }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>盘货情况</p>
            <p v-if="detail.status == 0">
              <el-tag type="warning" effect="dark">待盘货</el-tag>
            </p>
            <p v-else>
              <el-tag v-if="detail.diff_qty == 0" type="success" effect="dark"
                >库存一致</el-tag
              >
              <el-tag v-else-if="detail.diff_qty > 0" effect="dark"
                >库存增加</el-tag
              >
              <el-tag v-else type="danger" effect="dark">库存减少</el-tag>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>套餐款数</p>
            <p>{{ detail.package_species }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>入库总份数</p>
            <p>{{ detail.qty }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>销售总份数</p>
            <p>{{ detail.sale_qty }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>报损总份数</p>
            <p>{{ detail.loss_qty }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>应存库存</p>
            <p>{{ detail.stock_qty }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>实际库存</p>
            <p>{{ detail.real_qty }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>盘货差额</p>
            <p>{{ detail.diff_qty }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-card shadow="always">
      <p class="item_title">盘货套餐列表</p>
      <el-table :data="detail.package_data" stripe style="width: 100%">
        <el-table-column align="center" prop="vendor_package_id" label="套餐ID">
        </el-table-column>
        <el-table-column
          align="center"
          prop="vendor_package_name"
          label="套餐名称"
          width="200"
        >
        </el-table-column>
        <el-table-column align="center" prop="take_code" label="套餐号">
        </el-table-column>
        <el-table-column align="center" prop="qty" label="入库数量">
        </el-table-column>
        <el-table-column align="center" prop="sale_qty" label="销售数量">
        </el-table-column>
        <el-table-column align="center" prop="loss_qty" label="报损数量">
        </el-table-column>
        <el-table-column align="center" prop="stock_qty" label="应存库存">
        </el-table-column>
        <el-table-column align="center" prop="real_qty" label="实际库存">
        </el-table-column>
        <el-table-column align="center" prop="diff_qty" label="盘货差额">
        </el-table-column>
        <el-table-column align="center" label="盘货差额">
          <template slot-scope="scope">
            <span v-if="scope.row.diff_qty == 0">库存一致</span>
            <span v-else-if="scope.row.diff_qty > 0">库存增加</span>
            <span v-else>库存减少</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { inventoryDetail } from "@/api/warehouse";
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
    getDetail() {
      inventoryDetail({
        inventory_id: this.$route.query.inventory_id,
      }).then((res) => {
        this.detail = res;
      });
    },
  },
};
</script>