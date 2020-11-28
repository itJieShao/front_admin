<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.name"
          placeholder="请输入账户名称搜索"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="getList" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="dialogFormVisible = true"
          >新增账户</el-button
        >
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="list" style="width: 100%">
      <el-table-column align="center" label="登录帐号">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="帐户昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="角色">
        <template slot-scope="scope">
          <span>{{ scope.row.role_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="密码">
        <template slot-scope="scope">
          <span>******</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号码">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status == 0 ? 'success' : 'danger'">{{
            scope.row.status == 0 ? "启用" : "禁用"
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status == 0 ? 'danger' : 'success'"
            size="mini"
            @click="updateStatus(scope.row.id, scope.row.status)"
            >{{ scope.row.status == 0 ? "禁用" : "启用" }}</el-button
          >
          <el-button @click="editUser(scope.row.id)" size="mini"
            >编辑</el-button
          >
          <!-- <el-button @click="deleteUser(scope.row.id, scope.$index)" size="mini"
            >删除</el-button
          > -->
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

    <el-dialog
      :title="formData.user_id ? '编辑账户' : '新增账户'"
      :visible.sync="dialogFormVisible"
    >
      <el-form label-width="80px" v-loading="dialogLoading">
        <el-form-item label="选择角色">
          <el-select
            style="width: 100%"
            v-model="formData.role_id"
            filterable
            placeholder="选择角色"
          >
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录账号">
          <el-input
            placeholder="请输入登录帐号"
            v-model="formData.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="账户密码">
          <el-input
            type="password"
            :placeholder="formData.role_id?'请输入帐户登录密码（编辑可不填，不填就还是原密码）':'请输入帐户登录密码'"
            v-model="formData.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input
            placeholder="请输入帐户昵称"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            placeholder="请输入帐户关联手机号码"
            v-model="formData.phone"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox checked @change="statusChange">启用账户</el-checkbox>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  userList,
  userUpdateStatus,
  roleData,
  userAdd,
  userEdit,
  userDetail,
  userRemove,
} from "@/api/system/auth/users";
import Pagination from "@/components/Pagination";
export default {
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
      roleList: [],
      formData: {
        user_id: "",
        username: "",
        name: "",
        role_id: "",
        password: "",
        phone: "",
        status: "0",
      },
      defaultFormData: {},
      dialogLoading:false,
    };
  },
  components: { Pagination },
  watch: {
    dialogFormVisible(flag) {
      if (!flag) {
        this.formData = JSON.parse(JSON.stringify(this.defaultFormData));
      }
    },
  },
  created() {
    this.defaultFormData = JSON.parse(JSON.stringify(this.formData));
    this.getList();
    this.getRoleData();
  },
  methods: {
    //编辑角色
    editUser(user_id) {
      this.dialogLoading = true;
      this.dialogFormVisible = true;
      this.formData.user_id = user_id;
      userDetail({ user_id }).then((res) => {
        this.formData = res[0];
        this.formData.user_id = user_id;
        this.dialogLoading = false;
      });
    },
    updateStatus(users_id, status) {
      userUpdateStatus({
        users_id,
        type: status == 1 ? 0 : 1,
      }).then((res) => {
        this.list.find((item) => item.id == users_id).status =
          status == 1 ? 0 : 1;
        this.$notify({
          title: "成功",
          message: "操作成功",
          type: "success",
          duration: 1000,
        });
      });
    },
    getList() {
      this.loading = true;
      userList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    getRoleData() {
      roleData().then((res) => {
        this.roleList = res;
      });
    },
    saveUser() {
      console.log(this.formData.user_id)
      let api = this.formData.user_id ? userEdit : userAdd;
      api(this.formData).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "添加成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.dialogFormVisible = false;
              this.getList();
            },
          });
        }
      });
    },
    statusChange(checked) {
      this.formData.status = checked ? "0" : "1";
    },
    deleteUser(users_id, index) {
      this.$confirm("是否确定删除该管理员", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        userRemove({ users_id }).then((res) => {
          if (res) {
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 1000,
              onClose: () => {
                this.list.splice(index, 1);
              },
            });
          }
        });
      });
    },
  },
};
</script>
