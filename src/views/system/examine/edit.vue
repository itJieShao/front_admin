<template>
  <div class="app-container">
    <h2>{{ detail.type_name }}编辑</h2>
    <el-table v-loading="loading" :data="detail.user_ids" style="width: 100%">
      <el-table-column align="center" label="级别">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账户">
        <template slot-scope="scope">
          <el-select
            style="width: 100%"
            v-model="scope.row.username"
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
        <template slot-scope="scope"> </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { auditEditData, userData } from "@/api/system/examine";
export default {
  data() {
    return {
      audit_type_id: "",
      user_data: [], //列表数据
      detail: {},
      userData: [], //下拉框数据
      loading: false,
    };
  },
  computed: {},
  async created() {
    if (this.$route.query.id) {
      this.audit_type_id = this.$route.query.id;
      await this.getUserData();
      this.getDetail();
    }
  },
  methods: {
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
            this.userData.forEach((it) => {
              this.user_data.push({
                id: item,
                name: it.name,
                user_name: it.username,
              });
            });
          });
        }
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

<style>
</style>