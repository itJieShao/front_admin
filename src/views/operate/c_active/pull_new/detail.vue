<template>
  <div class="app-container">
    <h2>拉新活动详情</h2>
    <el-row :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>活动ID</p>
            <p>{{ detail.id }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>活动名称</p>
            <p>{{ detail.name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>发起人</p>
            <p>{{ detail.send_people_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>受邀新用户</p>
            <p>{{ detail.receive_people_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>活动奖励</p>
            <p>{{ detail.reward_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>拉新人头</p>
            <p>{{ detail.people_num }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>开始时间</p>
            <p>{{ detail.valid_at_start }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>结束时间</p>
            <p>{{ detail.valid_at_end }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>创建时间</p>
            <p>{{ detail.created_at }}</p>
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
      <!-- <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>状态</p>
            <p>
              <el-tag type="success" v-if="detail.status == 0">启用</el-tag>
              <el-tag type="danger" v-else>禁用</el-tag>
            </p>
          </div>
        </el-card>
      </el-col> -->
    </el-row>
    <el-divider />
    <el-row
      v-for="(item, index) in detail.reward_data"
      :gutter="12"
      style="margin-top: 10px"
    >
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>活动奖励{{ index + 1 }}</p>
            <p>{{ item.name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>奖励类型</p>
            <p>{{ item.type_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <div class="item_flex">
            <p>奖励有效期</p>
            <p>{{ item.valid_at }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <img style="height: 110px" :src="item.image" alt="" />
      </el-col>
    </el-row>
    <el-divider />
    <el-card shadow="always">
      <p class="item_title">领取情况：</p>
      <el-table
        v-loading="loading"
        :data="detail.send_data"
        stripe
        style="width: 100%"
      >
        <el-table-column align="center" label="序号" width="120">
          <template  slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发起人及手机" width="180">
          <template slot-scope="scope">
            <span
              >{{ scope.row.sender_name }} {{ scope.row.sender_phone }}</span
            >
          </template>
        </el-table-column>
        <el-table-column align="center" label="受邀新用户及手机" width="180">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.receive_data" :key="index">
              <span>{{ item.name }} {{ item.phone }}</span>
            </div>  
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="发起时间" width="180">
        </el-table-column>
        <el-table-column align="center" prop="finish_at" label="完成时间" width="180">
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listData.page"
        :limit.sync="listData.page_size"
        @pagination="getList"
      />
    </el-card>
  </div>
</template>

<script>
import { getDetail } from "@/api/operate/c_active/pull_new";
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      detail: {},
      loading: false,
      listData: {
        page: 1,
        page_size: 10,
      },
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      getDetail({
        pull_new_id: this.$route.query.id,
        ...this.listData,
      }).then((res) => {
        this.detail = res;
      });
    },
  },
};
</script>