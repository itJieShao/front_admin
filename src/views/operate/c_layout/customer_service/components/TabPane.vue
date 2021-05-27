<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="在线时间">
        <el-input
          placeholder="请输入在线时间"
          v-model="formData.online"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input
          placeholder="请输入联系电话"
          v-model="formData.phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input
          placeholder="请输入地址"
          v-model="formData.address"
        ></el-input>
      </el-form-item>
      <el-form-item label="客服QQ">
        <el-input placeholder="请输入在线时间" v-model="formData.qq"></el-input>
      </el-form-item>
      <el-form-item label="微信公众号">
        <el-input
          placeholder="请输入微信公众号"
          v-model="formData.wechat_offical_account"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input placeholder="请输入邮箱" v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="微博">
        <el-input placeholder="请输入微博" v-model="formData.weibo"></el-input>
      </el-form-item>
    </el-form>
    <el-row type="flex" class="row-bg" justify="end">
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import {
  getServiceData,
  editService,
} from "@/api/operate/c_layout/customer_service";
export default {
  props: ["type"],
  data() {
    return {
      formData: {
        online: "",
        phone: "",
        address: "",
        qq: "",
        wechat_offical_account: "",
        email: "",
        weibo: "",
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getServiceData({ env: this.type }).then((res) => {
        this.formData = res;
      });
    },
    onSubmit() {
      let aData = JSON.parse(JSON.stringify(this.formData));
      aData.env = this.type;
      editService(aData).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
  },
};
</script>

