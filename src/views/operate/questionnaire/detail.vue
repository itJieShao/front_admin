<template>
  <div class="app-container">
    <h2>问卷详情</h2>
    <el-row :gutter="12">
      <el-col :span="12">
        <img style="width: 100%" :src="detail.image" alt="" />
      </el-col>
    </el-row>
    <el-row :gutter="12" style="margin-top: 10px">
      <el-col :span="24">
        <el-card shadow="always">
          <p style="text-align: center">{{ detail.title }}</p>
        </el-card>
      </el-col>
    </el-row>
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
    <el-row :gutter="12" style="margin-top: 10px">
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>创建时间</p>
            <p>{{ detail.created_at }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <div class="item_flex">
            <p>有效期</p>
            <p>{{ detail.valid_at }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>小程序问卷</p>
            <p>{{ detail.show_position_name }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="always">
          <div class="item_flex">
            <p>状态</p>
            <p>
              <el-tag :type="detail.status ? 'success' : 'danger'">{{
                detail.status ? "有效" : "无效"
              }}</el-tag>
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" v-if="detail.status">
        <el-card shadow="always">
          <div class="item_flex">
            <p>操作</p>
            <p>
              <el-button @click="updateStatus" size="mini" type="danger"
                >下架</el-button
              >
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row
      v-for="(item, index) in detail.reward_data"
      :gutter="12"
      style="margin-top: 10px"
    >
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>问卷奖励{{ index + 1 }}</p>
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
      <el-col :span="6">
        <el-card shadow="always">
          <div class="item_flex">
            <p>奖励有效期</p>
            <p>{{ item.valid_at }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <img style="height: 110px" :src="item.image" alt="" />
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <h3>用户填券结果分析</h3>
    <el-row
      v-for="(item, index) in detail.questionnaire_data_1"
      :gutter="12"
      style="margin-top: 10px"
    >
      <el-col :span="8" v-for="(it, idx) in item">
        <Echart
          :id="'chart' + index + idx"
          unit="人"
          :title="it.title"
          :pieData="it.answer_data"
          type="pie"
          width="100%"
          height="300px"
        />
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-card shadow="always">
      <el-table
        v-loading="loading"
        :data="detail.customer_data"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="customer_name" label="用户昵称">
        </el-table-column>
        <el-table-column prop="phone" label="手机号码"> </el-table-column>
        <el-table-column prop="created_at" label="填券时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="seeQuestionnaire(scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listData.page"
        :limit.sync="listData.page_size"
        @pagination="getDetail"
      />
    </el-card>
    <el-dialog :visible.sync="dialogFlag">
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="8">用户昵称：{{ userItem.customer_name }}</el-col>
        <el-col :span="8">手机号码：{{ userItem.phone }}</el-col>
        <el-col :span="8">填券时间：{{ userItem.created_at }}</el-col>
      </el-row>
      <el-divider></el-divider>
      <p
        style="
          margin-bottom: 15px;
          color: #606266;
          font-size: 14px;
          font-weight: 700;
        "
      >
        用户最近一周订单
      </p>
      <div style="margin: 0 20px">
        <el-row
          v-for="(item, index) in questionnaireData"
          :key="index"
          :gutter="12"
          style="margin-bottom: 20px"
        >
          <p style="margin-bottom: 15px">订单ID：{{ item.order_no }}</p>
          <el-row
            v-for="(it, idx) in item.order_detail"
            :key="idx"
            :gutter="12"
            style="margin-bottom: 20px"
          >
            <el-col :span="12" v-for="(itd, idxc) in it" :key="idxc">
              <el-card shadow="always">
                <div class="goods_item">
                  <div class="goods_top">
                    <img :src="itd.main_image" alt="" />
                    <div class="goods_info">
                      <!-- <div class="goods_sth">
                        <p>{{ it.vendor_package_id }}</p>
                        <p>￥{{ itd.sale_price }}</p>
                      </div> -->
                      <p class="goods_title">{{ itd.vendor_package_name }}</p>
                      <p style="margin-top: 10px">
                        套餐组合：{{ itd.product_name }}
                      </p>
                    </div>
                  </div>
                  <div class="goods_bot">
                    <p>￥{{ itd.sale_price }}</p>
                    <p>X{{ itd.vendor_package_num }}</p>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-divider></el-divider>
        </el-row>
      </div>
      <el-divider></el-divider>
      <el-form>
        <el-form-item
          :label="'第' + (index + 1) + '题'"
          v-for="(item, index) in detail.questionnaire_data"
        >
          <p>{{ item.title }}</p>
          <div v-if="item.answer_type == 3">
            <el-input disabled type="textarea" :value="item.answer" />
          </div>
          <ul class="answer_content" v-else>
            <li
              v-for="it in item.answer_data"
              :class="it.active ? 'answer_active' : ''"
            >
              {{ it.name }}
            </li>
          </ul>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  questionnaireDetail,
  questionnaireDisable,
  getOrderData,
} from "@/api/operate/questionnaire";
import Pagination from "@/components/Pagination";
import Echart from "@/components/Echart";
export default {
  data() {
    return {
      detail: {},
      dialogFlag: false,
      userItem: {},
      questionnaireData: [],
      listData: {
        id: "",
        page: 1,
        page_size: 10,
      },
      loading: false,
      total: 0,
    };
  },
  watch:{
    dialogFlag(flag){
      if (!flag){
        this.detail.questionnaire_data.forEach(item => {
          item.answer_data.forEach(it => {
            it.active = false
          })
        })
      }
    }
  },
  components: {
    Echart,
    Pagination,
  },
  created() {
    this.listData.id = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.loading = true;
      questionnaireDetail(this.listData).then((res) => {
        this.loading = false;
        this.total = res.customer_count;
        let questionnaire_data = [];
        for (let i = 0; i < res.questionnaire_data.length; i += 3) {
          questionnaire_data.push(res.questionnaire_data.slice(i, i + 3));
        }
        questionnaire_data.forEach((item, index) => {
          item.forEach((it, idx) => {
            if (!it.answer_data.length) {
              questionnaire_data[index].splice(idx, 1);
            }
          });
        });
        res.questionnaire_data_1 = questionnaire_data;
        this.detail = res;
      });
    },
    updateStatus() {
      questionnaireDisable({ id: this.detail.id }).then((res) => {
        if (res) {
          this.detail.status = 0;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    seeQuestionnaire(userItem) {
      getOrderData({ customer_id: userItem.customer_id }).then((res) => {
        res.forEach((item) => {
          let order_detail = [];
          for (let i = 0; i < item.order_detail.length; i += 2) {
            order_detail.push(item.order_detail.slice(i, i + 2));
          }
          item.order_detail = order_detail;
        });
        this.questionnaireData = res;
      });
      this.detail.questionnaire_data.forEach((item, index) => {
        if (item.answer_type == 3) {
          item.answer = userItem.questionnaire_data[index].answer;
        } else {
          item.answer_data.forEach((it) => {
            userItem.questionnaire_data.forEach((itd) => {
              itd.answer.forEach((itdc) => {
                if (itdc == it.id) {
                  it.active = true;
                }
              });
            });
          });
        }
      });
      this.userItem = userItem;
      this.dialogFlag = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.goods_item {
  cursor: pointer;
  .goods_top {
    display: flex;
    img {
      display: block;
      width: 100px;
      height: 100px;
      border: 1px solid #ddd;
    }
    .goods_info {
      width: calc(100% - 115px);
      margin-left: 15px;
      .goods_sth {
        display: flex;
        justify-content: space-between;
      }
      .goods_title {
        margin-top: 20px;
      }
    }
  }
  .goods_bot {
    border-top: 1px solid #ddd;
    margin-top: 15px;
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
  }
}
.answer_content {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}
.answer_content li {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  height: 40px;
  padding: 5px;
  border: 1px solid #ddd;
  font-size: 12px;
  border-radius: 20px;
  margin: 0 20px 20px 0;
}
.answer_active {
  background-color: #67c23a;
  color: #fff;
}
</style>