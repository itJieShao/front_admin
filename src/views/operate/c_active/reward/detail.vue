<template>
  <div class="app-container">
    <h2>打赏活动详情</h2>
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
            <p>开始时间</p>
            <p>{{ detail.name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>结束时间</p>
            <p>{{ detail.name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>发起用户</p>
            <p>{{ detail.send_people_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>打赏土豪用户</p>
            <p>{{ detail.receive_people_num }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px" :gutter="12">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>发起次数</p>
            <p>{{ detail.reward_num }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>打赏次数</p>
            <p>{{ detail.valid_at_start }}</p>
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
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>活动状态</p>
            <p>
              <el-tag type="success" v-if="detail.status == 0">启用</el-tag>
              <el-tag type="danger" v-else>禁用</el-tag>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>操作</p>
            <p>
              <el-button type="danger" v-if="detail.status == 1" @click="disable" size="mini"
                >禁用</el-button
              >
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-form label-width="150px">
      <el-form-item label="订单邀请文案">
        <img :src="detail.main_image" alt="" />
      </el-form-item>
      <el-form-item label="订单邀请失败文案">
        <img :src="detail.main_image" alt="" />
      </el-form-item>
      <el-form-item label="打赏页面文案">
        <img :src="detail.main_image" alt="" />
      </el-form-item>
      <el-form-item label="已打赏页面文案">
        <img :src="detail.main_image" alt="" />
      </el-form-item>
      <el-form-item label="打赏失效页面文案">
        <img :src="detail.main_image" alt="" />
      </el-form-item>
    </el-form>
    <el-divider />
    <el-card shadow="always">
      <el-table
        v-loading="loading"
        :data="detail.send_data"
        stripe
        style="width: 100%"
      >
        <el-table-column align="center" label="序号" width="120">
          <template slot-scope="scope">
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
        <el-table-column align="center" label="打赏土豪用户及手机" width="180">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.receive_data" :key="index">
              <span>{{ item.name }} {{ item.phone }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="created_at"
          label="打赏金额"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="finish_at"
          label="获得奖励"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="finish_at"
          label="打赏时间"
          width="180"
        >
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