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
          >添加账户</el-button
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
          <el-button @click="deleteUser(scope.row.id, scope.$index)" size="mini"
            >删除</el-button
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

    <el-dialog title="新增任务" :visible.sync="dialogFormVisible">
      <el-form label-width="80px">
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
            placeholder="请输入帐户登录密码"
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
        <el-button type="primary" @click="addUser">确 定</el-button>
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
        username: "",
        name: "",
        role_id: "",
        password: "",
        phone: "",
        status: "0",
      },
    };
  },
  components: { Pagination },
  created() {
    this.getList();
    this.getRoleData();
  },
  methods: {
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
          duration: 1500,
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
    addUser() {
      userAdd(this.formData).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "添加成功",
            type: "success",
            duration: 1500,
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
      return console.log(index);
      userRemove({ users_id }).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.list.splice(index, 1);
            },
          });
        }
      });
    },
  },
};
</script>
