<template>
  <div class="app-container" v-if="JSON.stringify(detail) != '{}'">
    <h2>发票详情</h2>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>发票ID</p>
            <p>{{ detail.id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>订单ID</p>
            <p>{{ detail.id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>申请时间</p>
            <p>{{ detail.id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>用户ID</p>
            <p>{{ detail.id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>用户昵称</p>
            <p>{{ detail.id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>开票类型</p>
            <p>{{ detail.type == 1 ? "个人" : "企业" }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>开票金额</p>
            <p>{{ detail.price }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>抬头</p>
            <p>{{ detail.name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>税号</p>
            <p>{{ detail.company_code }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>发票内容</p>
            <p>餐饮服务</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>公司地址</p>
            <p>{{ detail.company_address }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>公司电话</p>
            <p>{{ detail.company_telphone }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>公司开户行</p>
            <p>{{ detail.company_bank }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>开户行账号</p>
            <p>{{ detail.company_account }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>电子邮箱</p>
            <p>{{ detail.email }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="always">
          <div class="item_flex">
            <p>备注</p>
            <p>{{ detail.remark }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <h4>开票信息</h4>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="always">
          <div class="item_flex">
            <p>开票状态</p>
            <p style="height: 40px">
              <el-tag
                v-if="detail.status == 1"
                style="margin-top: 5px"
                type="success"
                effect="dark"
                >已开票</el-tag
              >
              <el-tag v-else style="margin-top: 5px" type="danger" effect="dark"
                >未开票</el-tag
              >
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <div class="item_flex">
            <p>开票日期</p>
            <p style="height: 40px">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <div class="item_flex">
            <p>开票人</p>
            <p style="height: 40px">
              <el-input placeholder="请输入开票人"></el-input>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-upload
      style="margin: 15px 0"
      class="upload-demo"
      action="/invoice/invoice/upload-invoice-file"
      multiple
      :limit="1"
    >
      <el-button size="small" type="success">请添加电子发票文件</el-button>
    </el-upload>
    <el-row type="flex" class="row-bg" justify="end">
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-row>
  </div>
</template>

<script>
import { invoiceDetail } from "@/api/finance/invoice";
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
      invoiceDetail({
        invoice_id: this.$route.query.invoice_id,
      }).then((res) => {
        this.detail = res;
      });
    },
  },
};
</script>