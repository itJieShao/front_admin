<template>
  <div class="app-container">
    <h2>进货汇总详情</h2>
    <el-row :gutter="12">
      <el-col :span="3">
        <el-card shadow="always">
          <div class="item_flex">
            <p>进货汇总ID</p>
            <p>{{ detail.id }}</p>
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
            <p>汇总时间</p>
            <p>{{ detail.created_at }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card shadow="always">
          <div class="item_flex">
            <p>采购单品</p>
            <p>{{ detail.product_species }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card shadow="always">
          <div class="item_flex">
            <p>总份数</p>
            <p>{{ detail.product_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card shadow="always">
          <div class="item_flex">
            <p>预估总金额</p>
            <p>{{ detail.purchase_price_total }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>汇总人</p>
            <p>{{ detail.created_user_name }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-row
      :gutter="12"
      v-for="(item, index) in detail.vendor_names"
      :key="index"
    >
      <el-col :span="6" v-for="(it, idx) in item" :key="idx">
        <el-card shadow="always">
          <div class="item_flex">
            <p>门店名称</p>
            <p>{{ it }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-table :data="detail.audit_process_detail" stripe style="width: 100%">
      <el-table-column prop="level" label="审核级别" width="180">
      </el-table-column>
      <el-table-column prop="audit_user_name" label="审核人" width="180">
      </el-table-column>
      <el-table-column prop="audit_at" label="售卖时间" width="180">
      </el-table-column>
      <el-table-column label="审核状态" width="180">
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
            <el-button @click="examine_click(1)" type="success">同意进货</el-button>
            <el-button @click="examine_click(-1)" type="danger">驳回进货</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-divider />
    <el-tabs style="margin-top: 15px" type="border-card">
      <el-tab-pane label="采购单品列表">
        <el-table :data="detail.product_data" stripe style="width: 100%">
          <el-table-column prop="product_id" label="单品ID"></el-table-column>
          <el-table-column
            prop="product_name"
            label="单品名称"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="package_box_name"
            label="包装规格"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="warn_cost_price"
            label="成本预警价"
            width="160"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="last_purchase_price"
            label="上次进货价"
            width="160"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="material_species"
            label="材料"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="seasoning_species"
            label="调料"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="product_num"
            label="采购数量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="supplier_name"
            label="中央厨房"
            width="180"
            align="center"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="采购材料列表">
        <el-table :data="detail.material_data" stripe style="width: 100%">
          <el-table-column prop="material_id" label="材料ID"></el-table-column>
          <el-table-column
            prop="material_name"
            label="材料名称"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column prop="unit_name" label="单位"></el-table-column>
          <el-table-column
            prop="supplier_name"
            label="供应商"
            width="200"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="material_num"
            label="采购数量"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="purchase_price_total"
            label="预估价格"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="last_purchase_price"
            label="上次进货价"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column width="200" align="center" label="本次进货价">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.purchase_price"
                placeholder="请输入进货价"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="
                  savePrice(1, scope.row.material_id, scope.row.purchase_price)
                "
                >保存</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="采购调料列表">
        <el-table :data="detail.seasoning_data" stripe style="width: 100%">
          <el-table-column align="center" prop="seasoning_id" label="调料ID"></el-table-column>
          <el-table-column
            prop="seasoning_name"
            label="调料名称"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column prop="unit_name" label="单位"></el-table-column>
          <el-table-column
            prop="supplier_name"
            label="供应商"
            width="200"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="seasoning_num"
            label="采购数量"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="purchase_price_total"
            label="预估价格"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="last_purchase_price"
            label="上次进货价"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column width="200" align="center" label="本次进货价">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.purchase_price"
                placeholder="请输入进货价"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="
                  savePrice(2, scope.row.seasoning_id, scope.row.purchase_price)
                "
                >保存</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  purchaseTotalDetail,
  updateMaterialPurchasePrice,
  updateSeasoningPurchasePrice,
} from "@/api/warehouse";
import { audit } from "@/api/common";
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
    examine_click(status){
      audit({audit_process_id:this.detail.audit_process_id,status}).then(res => {
        if (res){
          this.detail.can_audit = false;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
          }); 
        }
      })
    },
    getDetail() {
      purchaseTotalDetail({
        purchase_total_id: this.$route.query.purchase_total_id,
      }).then((res) => {
        let vendor_names = [];
        for (let i = 0; i < res.vendor_names.length; i += 4) {
          vendor_names.push(res.vendor_names.slice(i, i + 4));
        }
        res.vendor_names = vendor_names;

        let index = res.audit_process_detail.findIndex(
          (item) => item.audit_status == 0
        );
        if (index != -1) {
          res.audit_process_detail[index].first_audit = true;
        }

        this.detail = res;
      });
    },
    savePrice(type, id, purchase_price) {
      let updateApi =
        type == 1 ? updateMaterialPurchasePrice : updateSeasoningPurchasePrice;
      let json = {
        purchase_total_id: this.$route.query.purchase_total_id
      };
      if (type == 1){
        json.material_data = JSON.stringify([{ material_id: id, purchase_price }]);
      }else{
        json.seasoning_data = JSON.stringify([{ seasoning_id: id, purchase_price }]);
      }
      updateApi(json).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
  },
};
</script>