<template>
  <div>
    <el-form label-width="100px" :model="formData" :rules="rules">
      <el-form-item label="在线时间">
        <el-input placeholder="请输入在线时间" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input placeholder="请输入联系电话" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input placeholder="请输入地址" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="客服QQ">
        <el-input placeholder="请输入在线时间" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="微信公众号">
        <el-input placeholder="请输入微信公众号" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input placeholder="请输入邮箱" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="微博">
        <el-input placeholder="请输入微博" v-model="formData.name"></el-input>
      </el-form-item>
    </el-form>
    <el-row type="flex" class="row-bg" justify="end">
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["type"],
  data() {
    return {
      formData: { name: "" },
    };
  },
  created() {},
  methods: {},
};
</script>

