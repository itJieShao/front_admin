<template>
  <div class="app-container">
    <h2>套餐加购模版详情</h2>
    <el-row :gutter="12" style="margin-top: 10px">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>问卷ID</p>
            <p>{{ detail.id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>问卷期数</p>
            <p>{{ detail.nper }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>问卷优先级</p>
            <p>{{ detail.type_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>限制填券人数</p>
            <p>{{ detail.limit_people }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>填券人数</p>
            <p>{{ detail.people_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>创建人</p>
            <p>{{ detail.created_user_name }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>