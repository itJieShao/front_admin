<template>
  <div class="app-container">
    <h2>进货详情</h2>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>配货ID</p>
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
            <p>售卖时间</p>
            <p>{{ detail.saled_at }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>运营管理人员</p>
            <p>{{ detail.created_user_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>申请时间</p>
            <p>{{ detail.created_at }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-card shadow="always">
      <p class="item_title">审核进度</p>
      <el-table :data="detail.audit_process_detail" stripe style="width: 100%">
        <el-table-column align="center" prop="level" label="审核级别" width="180">
        </el-table-column>
        <el-table-column align="center" prop="audit_user_name" label="审核人" width="180">
        </el-table-column>
        <el-table-column align="center" prop="audit_at" label="审核时间" width="180">
        </el-table-column>
        <el-table-column align="center" label="审核状态" width="180">
          <template slot-scope="scope">
            <p v-if="scope.row.audit_status == -1">审核不通过</p>
            <p v-else-if="scope.row.audit_status == 0">等待审核</p>
            <p v-else>审核通过</p>
          </template>
        </el-table-column>
        <el-table-column>
          <template
            slot-scope="scope"
            v-if="
              scope.row.audit_status == 0 &&
              scope.row.first_audit &&
              detail.can_audit
            "
          >
            <div style="display: flex">
              <el-button
                type="success"
                @click="auditBtn(detail.audit_process_id, 1)"
                >同意进货</el-button
              >
              <el-button
                type="danger"
                @click="auditBtn(detail.audit_process_id, -1)"
                >驳回进货</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-divider />
    <el-card shadow="always">
      <p class="item_title">采购信息</p>
      <el-row :gutter="12">
        <el-col :span="6">
          <el-card shadow="always">
            <div class="item_flex">
              <p>采购单品</p>
              <p>{{ detail.product_species }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always">
            <div class="item_flex">
              <p>总份数</p>
              <p>{{ detail.product_num }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always">
            <div class="item_flex">
              <p>预估总金额</p>
              <p>{{ detail.purchase_price_total }}</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="always">
            <div class="item_flex">
              <p>实际总金额</p>
              <p>{{ detail.real_purchase_price_total }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-divider />
    <el-card shadow="always">
      <p class="item_title">采购单品列表</p>
      <el-table :data="detail.product_data" stripe style="width: 100%">
        <el-table-column align="center" prop="product_id" label="单品ID"> </el-table-column>
        <el-table-column align="center" prop="product_name" label="单品名称" width="180">
        </el-table-column>
        <el-table-column align="center" prop="package_box_name" label="包装规格" width="180">
        </el-table-column>
        <el-table-column align="center" prop="warn_cost_price" label="成本预警价" width="180">
        </el-table-column>
        <el-table-column align="center" prop="last_purchase_price" label="上次进货价" width="180">
        </el-table-column>
        <el-table-column align="center" prop="purchase_price" label="本次进货价" width="180">
        </el-table-column>
        <el-table-column align="center" prop="material_species" label="材料"> </el-table-column>
        <el-table-column align="center" prop="seasoning_species" label="调料"> </el-table-column>
        <el-table-column align="center" prop="product_num" label="采购数量"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { purchaseDetail, purchaseProductData } from "@/api/warehouse";
import { audit } from "@/api/common";
export default {
  data() {
    return {
      detail: {},
    };
  },
  created() {
    this.getDetail();
    this.getPurchaseProductData();
  },
  methods: {
    getDetail() {
      purchaseDetail({
        purchase_id: this.$route.query.purchase_id,
      }).then((res) => {
        let index = res.audit_process_detail.findIndex(
          (item) => item.audit_status == 0
        );
        if (index != -1) {
          res.audit_process_detail[index].first_audit = true;
        }
        this.detail = res;
      });
    },
    getPurchaseProductData() {
      purchaseProductData().then((res) => {
        this.purchaseProductData = res;
      });
    },
    auditBtn(audit_process_id, status) {
      audit({ audit_process_id, status }).then((res) => {
        this.$notify({
          title: "成功",
          message: "操作成功",
          type: "success",
          duration: 1500,
        });
        this.getDetail();
      });
    },
  },
};
</script>