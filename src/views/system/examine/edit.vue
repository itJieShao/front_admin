<template>
  <div class="app-container">
    <h2>{{ detail.type_name }}编辑</h2>
    <el-table v-loading="loading" :data="user_data" style="width: 100%">
      <el-table-column align="center" label="级别">
        <template slot-scope="scope">
          <span v-if="scope.row.id"
            >{{ toChinesNum(scope.$index + 1) }}级审核</span
          >
          <span v-else>+添加审核级别</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账户">
        <template slot-scope="scope">  
          <p v-if="scope.row.id">{{ scope.row.username }}</p>
          <el-select
            @change="addUser"
            v-else
            style="width: 100%"
            v-model="addUserId"
            filterable
            placeholder="请选择系统账户"
          >
            <el-option
              v-for="item in userData"
              :key="item.id"
              :label="item.username"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账户昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope" v-if="scope.row.id">
          <el-button @click="del(scope.$index)" size="mini" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row
      style="margin: 40px 20px 0 0"
      type="flex"
      class="row-bg"
      justify="end"
    >
      <el-button style="margin-right: 10px" @click="back">取消</el-button>
      <el-button type="success" @click="onSubmit">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import { auditEditData, userData, auditEdit } from "@/api/system/examine";
export default {
  data() {
    return {
      audit_type_id: "",
      user_data: [], //列表数据
      detail: {},
      userData: [], //下拉框数据
      loading: true,
      addUserId: "",
    };
  },
  async created() {
    if (this.$route.query.id) {
      this.audit_type_id = this.$route.query.id;
      await this.getUserData();
      this.getDetail();
    }
  },
  methods: {
    addUser(id) {
      let item = this.userData.find((item) => item.id == id)
      let index = this.userData.findIndex((item) => item.id == id)
      this.user_data.splice(this.user_data.length - 1, 0, {
        id,
        username: item.username,
        name: item.name,
      });
      this.userData.splice(index,1)
      this.addUserId = "";
    },
    back() {
      this.$router.go(-1);
    },
    del(index) {
      this.userData.push(this.user_data[index])
      this.user_data.splice(index, 1);
    },
    onSubmit() {
      let user_ids = [];
      this.user_data.forEach((item) => {
        if (item.id) {
          user_ids.push(item.id);
        }
      });
      let aData = {
        audit_type_id: this.audit_type_id,
        user_ids,
      };
      auditEdit(aData).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "提交成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.$router.go(-1);
            },
          });
        }
      });
    },
    getUserData() {
      return userData().then((res) => {
        this.userData = res;
      });
    },
    getDetail() {
      this.loading = true;
      auditEditData({ audit_type_id: this.audit_type_id }).then((res) => {
        if (res.user_ids.length > 0) {
          res.user_ids.forEach((item) => {
            this.userData.forEach((it,index) => {
              if (item == it.id) {
                this.user_data.push({
                  id: item,
                  name: it.name,
                  username: it.username,
                });
                this.userData.splice(index,1)
              }
            });
          });
        }
        this.user_data.push({
          id: "",
          name: "",
          username: "",
        });
        this.detail = res;
        this.loading = false;
      });
    },
    toChinesNum(num) {
      let changeNum = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
      ];
      let unit = ["", "十", "百", "千", "万"];
      num = parseInt(num);
      let getWan = (temp) => {
        let strArr = temp.toString().split("").reverse();
        let newNum = "";
        for (var i = 0; i < strArr.length; i++) {
          newNum =
            (i == 0 && strArr[i] == 0
              ? ""
              : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
              ? ""
              : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) +
            newNum;
        }
        if (newNum[0] == "一" && newNum[1] == "十") {
          return newNum.substring(1, newNum.length);
        }
        return newNum;
      };
      return getWan(num);
    },
  },
};
</script>