<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.name"
          placeholder="请输入角色名称搜索"
        ></el-input>
      </el-col>
      <el-col :span="10">
        <el-button @click="getList" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end">
        <el-button
          @click="dialogFormVisible = true"
          type="success"
          icon="el-icon-plus"
          >新增角色</el-button
        >
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
      <el-table-column align="center" label="角色ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="角色名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
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
          <!-- <el-button size="mini">删除</el-button> -->
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
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
      <el-form label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-tree
            ref="rolesTree"
            :data="roleMenuList"
            show-checkbox
            node-key="id"
            :default-expanded-keys="defaultExpandedKeys"
            :default-checked-keys="defaultCheckedKeys"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="价格显示">
          <el-checkbox-group v-model="priceCheckList">
            <el-checkbox label="last_purchase_price">上次进货价</el-checkbox>
            <el-checkbox label="warning_price">预警价</el-checkbox>
            <el-checkbox label="base_cost_price">基础成本价</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  roleList,
  roleUpdateStatus,
  roleMenuList,
  addRole,
} from "@/api/system/auth/roles";
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
      name: "",
      roleMenuList: [], //菜单权限树形列表
      priceCheckList: [],
      defaultExpandedKeys: [], //默认展开的节点的 key 的数组
      defaultCheckedKeys: [], //默认勾选的节点的 key 的数组
      dialogFormVisible: false,
    };
  },
  components: { Pagination },
  created() {
    this.getList();
    this.getMenuList();
  },
  methods: {
    updateStatus(role_id, status) {
      roleUpdateStatus({
        role_id,
        type: status == 1 ? 0 : 1,
      }).then((res) => {
        if (res) {
          this.list.find((item) => item.id == role_id).status =
            status == 1 ? 0 : 1;
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
      roleList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
    getMenuList() {
      roleMenuList({ role_id: this.$store.state.user.role_id }).then((res) => {
        this.roleMenuList = res;
      });
    },
    saveRoles() {
      let priceCheckList = JSON.parse(JSON.stringify(this.priceCheckList));
      let aData = {
        name: this.name,
        last_purchase_price: priceCheckList.includes("last_purchase_price")
          ? 1
          : 0,
        warning_price: priceCheckList.includes("warning_price") ? 1 : 0,
        base_cost_price: priceCheckList.includes("base_cost_price") ? 1 : 0,
        permission: this.$refs.rolesTree.getCheckedKeys().join(","),
      };
      console.log(aData);
      addRole(aData).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "提交成功",
            type: "success",
            duration: 1000,
            onClose:() => {
              this.dialogFormVisible = false;
            },
          });
          this.getList();
        }
        console.log(res);
      });
    },
  },
};
</script>