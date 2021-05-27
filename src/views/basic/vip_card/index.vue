<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.name"
          placeholder="请输入会员卡名称搜索"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="searchBtn" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="dialogFormVisible = true"
          >新增会员卡</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="list" border v-loading="loading" style="width: 100%">
      <el-table-column align="center" label="会员卡ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="会员卡名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">次数卡</span>
          <span v-else-if="scope.row.type == 2">红包卡</span>
          <span v-else>折扣卡</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="会员卡期">
        <template slot-scope="scope">
          <span v-if="scope.row.card_type == 1">月卡</span>
          <span v-else-if="scope.row.card_type == 2">季卡</span>
          <span v-else-if="scope.row.card_type == 3">半年卡</span>
          <span v-else>年卡</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="发放周期">
        <template slot-scope="scope">
          <span v-if="scope.row.issue_cycle == 1">按月</span>
          <span v-else-if="scope.row.issue_cycle == 2">按季</span>
          <span v-else-if="scope.row.issue_cycle == 3">按半年</span>
          <span v-else>按年</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="次数">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">{{ scope.row.num }}</span>
          <span v-else>无</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="红包">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 2">{{ scope.row.red_packet }}</span>
          <span v-else>无</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="折扣">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 3">{{ scope.row.discount }}</span>
          <span v-else>无</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="优惠次数">
        <template slot-scope="scope">
          <span>{{ scope.row.discounts_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="定价">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="数量">
        <template slot-scope="scope">
          <span>{{ scope.row.number == -1 ? "无限" : scope.row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="已领">
        <template slot-scope="scope">
          <span>{{ scope.row.already_received }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="创建人">
        <template slot-scope="scope">
          <span>{{ scope.row.admin_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" width="250" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :type="scope.row.status == 0 ? 'danger' : 'success'"
            @click="updateStatus(scope.row.id, scope.row.status, scope.$index)"
            >{{ scope.row.status == 0 ? "禁用" : "启用" }}</el-button
          >
          <el-button size="mini" @click="copy(scope.row.id)">复制</el-button>
          <el-button size="mini" @click="goDetail(scope.row.id)"
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

    <el-dialog title="新增会员卡" :visible.sync="dialogFormVisible">
      <el-form label-width="130px">
        <el-form-item label="名称">
          <el-input
            placeholder="请输入会员卡的名称"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            style="width: 100%"
            v-model="formData.type"
            filterable
            placeholder="请选择会员卡类型"
          >
            <el-option label="次数卡" value="1"></el-option>
            <el-option label="红包卡" value="2"></el-option>
            <el-option label="折扣卡" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员卡期">
          <el-select
            style="width: 100%"
            v-model="formData.card_type"
            filterable
            placeholder="请选择会员卡期"
          >
            <el-option label="月卡" value="1"></el-option>
            <el-option label="季卡" value="2"></el-option>
            <el-option label="半年卡" value="3"></el-option>
            <el-option label="年卡" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发放周期">
          <el-select
            style="width: 100%"
            v-model="formData.issue_cycle"
            filterable
            placeholder="请选择会员卡发放周期"
          >
            <el-option label="按月度" value="1"></el-option>
            <el-option label="按季度" value="2"></el-option>
            <el-option label="按半年" value="3"></el-option>
            <el-option label="按年度" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="次数" v-if="formData.type == 1">
          <el-input
            placeholder="请输入会员卡次数"
            v-model="formData.num"
          ></el-input>
        </el-form-item>
        <el-form-item label="红包" v-if="formData.type == 2">
          <el-input
            placeholder="请输入会员卡无门槛红包金额"
            v-model="formData.red_packet"
          ></el-input>
        </el-form-item>
        <el-form-item label="折扣" v-if="formData.type == 3">
          <el-input
            placeholder="请输入会员卡套餐原价折扣率"
            v-model="formData.discount"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="formData.type != 1"
          :label="(formData.type == 2 ? '红包' : '折扣') + '领取次数'"
        >
          <el-input
            :placeholder="
              '请输入会员卡发放周期内，' +
              (formData.type == 2 ? '红包' : '折扣') +
              '限领次数'
            "
            v-model="formData.discounts_num"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员卡定价">
          <el-input
            placeholder="请输入会员卡定价"
            v-model="formData.price"
          ></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input
            placeholder="请输入会员卡的数量，不填则无限制"
            v-model="formData.number"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMemberCard">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { memberCardList, updateMemberCard, addMemberCard } from "@/api/basic";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      listData: {
        page: 1,
        page_size: 10,
        name: "",
      },
      loading: false,
      total: 0,
      dialogFormVisible: false,
      formData: {
        name: "",
        type: "",
        card_type: "",
        issue_cycle: "",
        num: "",
        red_packet: "",
        discount: "",
        discounts_num: "",
        price: "",
        number: "",
      },
      defaultFormData:{}
    };
  },
  created() {
    this.defaultFormData = Object.assign({},this.formData);
    this.getList();
  },
  methods: {
    goDetail(member_card_id) {
      this.$router.push(
        `/basic/vip_card_detail?member_card_id=${member_card_id}`
      );
    },
    getList() {
      this.loading = true;
      memberCardList(this.listData).then((res) => {
        this.list = res.list;
        this.total = res.count;
        this.loading = false;
      });
    },
    searchBtn(){
      this.listData.page = 1;
      this.getList();
    },
    updateStatus(member_card_id, status, index) {
      updateMemberCard({
        member_card_id,
        type: status ? 2 : 1,
      }).then((res) => {
        if (res) {
          this.list[index].status = status ? 0 : 1;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    addMemberCard() {
      addMemberCard(this.formData).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "提交成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.getList();
              this.dialogFormVisible = false;
              this.formData = JSON.parse(JSON.stringify(this.defaultFormData));
            },
          });
        }
      });
    },
  },
};
</script>


