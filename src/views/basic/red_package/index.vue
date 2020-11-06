<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.name"
          placeholder="请输入名称搜索"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-button @click="getList" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="10" style="display: flex; justify-content: flex-end">
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="openCouponDialog(2)"
          >门店满减</el-button
        >
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="openCouponDialog(1)"
          >折扣</el-button
        >
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="openCouponDialog()"
          >红包/券</el-button
        >
        <!-- <el-button type="danger" icon="el-icon-delete" @click="addMeal"
          >批量删除</el-button
        > -->
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <!-- <el-table-column type="selection" fixed="left" align="center" width="55">
      </el-table-column> -->
      <el-table-column align="center" label="优惠ID">
        <template slot-scope="scope">
          <span>{{ scope.row.coupon_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.coupon_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="满足金额">
        <template slot-scope="scope">
          <span>{{ scope.row.condition_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="优惠金额">
        <template slot-scope="scope">
          <span>{{ scope.row.favourable_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="折扣率">
        <template slot-scope="scope">
          <span>{{ scope.row.discount }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="有效期">
        <template slot-scope="scope">
          <span>{{ scope.row.valid_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="数量">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="已领">
        <template slot-scope="scope">
          <span>{{ scope.row.receive_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="创建人">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'">{{
            scope.row.status == 1 ? "可用" : "禁用"
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="250" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == 1"
            size="mini"
            type="danger"
            @click="disable(scope.row.coupon_id, scope.$index)"
            >禁用</el-button
          >
          <el-button v-else type="info" size="mini">已禁用</el-button>
          <el-button size="mini" @click="copy(scope.row.coupon_id)"
            >复制</el-button
          >
          <el-button size="mini" @click="goDetail(scope.row.coupon_id)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listData.page"
      :limit.sync="listData.page_size"
      @pagination="getList"
    />
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form label-width="100px" v-if="formData.type == 2">
        <el-form-item label="门店">
          <el-select
            style="width: 100%"
            v-model="formData.vendor_id"
            filterable
            placeholder="请选择使用满减优惠的门店"
          >
            <el-option
              v-for="item in storeList"
              :key="item.vendor_id"
              :label="item.vendor_name"
              :value="item.vendor_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <template v-for="item in formData.full_reduction_data">
          <el-divider />
          <el-form-item label="名称">
            <el-input
              placeholder="请输入满减优惠的名称"
              v-model="item.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="满足金额">
            <el-input
              placeholder="请输入满足使用条件的金额"
              v-model="item.condition_price"
            ></el-input>
          </el-form-item>
          <el-form-item label="优惠金额">
            <el-input
              placeholder="请输入优惠的金额"
              v-model="item.favourable_price"
            ></el-input>
          </el-form-item>
          <el-form-item label="有效期">
            <el-date-picker
              style="width: 100%"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择有效期"
              v-model="item.valid_at"
            >
            </el-date-picker>
          </el-form-item>
        </template>
        <el-button size="mini" type="success" @click="addItem"
          >继续添加</el-button
        >
      </el-form>
      <el-form label-width="100px" v-else-if="formData.type == 1">
        <el-form-item label="名称">
          <el-input placeholder="请输入折扣名称" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="折扣率">
          <el-input placeholder="请输入0-1的折扣率" v-model="formData.discount"></el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker
            style="width: 100%"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="请选择有效期"
            v-model="formData.valid_at"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" v-else>
        <el-form-item label="名称">
          <el-input placeholder="请输入优惠券/红包的名称" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            style="width: 100%"
            v-model="formData.type"
            filterable
            placeholder="请选择优惠券或者红包"
          >
            <el-option label="红包" value="3"></el-option>
            <el-option label="优惠券" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="满足金额" v-if="formData.type == 4">
          <el-input
            placeholder="请输入满足使用条件的金额"
            v-model="formData.condition_price"
          ></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input
            placeholder="请输入优惠券/红包的金额"
            v-model="formData.favourable_price"
          ></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input
            placeholder="请输入优惠券/红包的数量"
            v-model="formData.num"
          ></el-input>
        </el-form-item>
        <el-form-item label="限领数量">
          <el-input
            placeholder="请输入每个人领取的数量"
            v-model="formData.receive_num_limit"
          ></el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker
            style="width: 100%"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="请选择有效期"
            v-model="formData.valid_at"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCoupon">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { searchStoreList } from "@/api/basic";
import { couponList, disableCoupon, addCoupon } from "@/api/basic/red_package";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      list: [],
      storeList: [],
      listData: {
        page: 1,
        page_size: 10,
        name: "",
      },
      loading: true,
      total: 0,
      formData: {
        vendor_id: "",
        name: "",
        type: "",
        condition_price: "",
        favourable_price: "",
        discount: "",
        num: "",
        receive_num_limit: "",
        valid_at: "",
        full_reduction_data: [
          { name: "", condition_price: "", favourable_price: "", valid_at: "" },
        ],
      },
      dialogTitle: "",
      dialogFormVisible: false,
    };
  },
  components: { Pagination },
  created() {
    this.getList();
    this.getStoreList();
  },
  methods: {
    openCouponDialog(type) {
      this.formData.type = type || "";
      if (type == 1) {
        this.dialogTitle = "新增折扣";
      } else if (type == 2) {
        this.dialogTitle = "新增满减优惠";
      } else {
        this.dialogTitle = "新增红包/优惠券";
      }
      this.dialogFormVisible = true;
    },
    addItem() {
      this.formData.full_reduction_data.push({
        name: "",
        condition_price: "",
        favourable_price: "",
        valid_at: "",
      });
    },
    addCoupon() {
      addCoupon(this.formData).then(res => {
        if(res){
          this.$notify({
            title: "成功",
            message: "提交成功",
            type: "success",
            duration: 1000,
            onClose:() => {
              this.getList();
              this.dialogFormVisible = false;          
            }
          });
        }
      })
    },
    getStoreList() {
      searchStoreList().then((res) => {
        this.storeList = res;
      });
    },
    copy(id) {},
    goDetail(coupon_id){
      this.$router.push(`/basic/red_package_detail?coupon_id=${coupon_id}`);
    },
    disable(coupon_id, index) {
      disableCoupon({ coupon_id }).then((res) => {
        if (res) {
          this.list[index].status = 0;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    getList() {
      this.loading = true;
      couponList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
  },
};
</script>


