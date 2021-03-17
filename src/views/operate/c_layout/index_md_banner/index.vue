<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="24" style="display: flex; justify-content: flex-end">
        <el-button type="success" icon="el-icon-plus" @click="addMeal"
          >新增</el-button
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
      <el-table-column align="center" width="120" label="图片ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" label="轮播排序">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="图片缩略图">
        <template slot-scope="scope">
          <img style="width:150px;" :src="scope.row.url" alt="">
        </template>
      </el-table-column>

      <el-table-column align="center" label="链接地址">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div v-if="list.length > 1" style="display: inline-block; width: 100px">
            <i
              @click="userChangePosition(1, scope.$index)"
              class="el-icon-top"
              v-show="list.length > 1 && scope.$index != 0"
            ></i>
            <i
              @click="userChangePosition(2, scope.$index)"
              class="el-icon-bottom"
              v-show="list.length > 1 && scope.$index != list.length - 1"
            ></i>
          </div>
          <el-button size="mini" @click="goEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="delBtn(scope.row.id,scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { bannerList,sortBanner,delBanner } from "@/api/operate/c_layout/banner";
export default {
  data() {
    return {
      list: [],
      loading: false,
      type:3
    };
  },
  computed:{
    sortListIds(){
      let ids = [];
      this.list.forEach(item => ids.push(item.id));
      return ids;
    },
  },
  created() {
    this.getList();
  },
  methods: {
    userChangePosition(type, index) {
      let list = this.list;
      if (type == 1) {
        list[index] = list.splice(index - 1, 1, list[index])[0];
      } else {
        list[index] = list.splice(index + 1, 1, list[index])[0];
      }
      sortBanner({type:this.type,order:this.sortListIds})
    },
    addMeal() {
      this.$router.push("/operate/c_layout/index_md_banner_add");
    },
    goEdit(id) {
      this.$router.push(
        `/operate/c_layout/index_md_banner_edit?id=${id}`
      );
    },
    getList() {
      this.loading = true;
      bannerList({type:this.type}).then((res) => {
        this.list = res;
        this.loading = false;
      });
    },
    delBtn(id,index){
      delBanner({type:this.type,id}).then(res =>{
        if (res){
          this.list.splice(index,1);
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
        }
      })
    },
  },
};
</script>
<style scoped>
  .el-icon-top,.el-icon-bottom{
    margin-left: 15px;
    font-size: 20px;
    cursor: pointer;
    color: #999;
  }
</style>