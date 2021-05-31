<template>
  <div class="app-container">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="10">
        <el-input
          v-model="listData.name"
          placeholder="请输入名称搜索"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button @click="searchList" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="12" style="display: flex; justify-content: flex-end">
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="openCouponDialog(5, 1)"
          >次数卡</el-button
        >
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="openCouponDialog('', 2)"
          >满减折扣</el-button
        >
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="openCouponDialog(1, 3)"
          >套餐折扣</el-button
        >
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="openCouponDialog('', 4)"
          >优惠券</el-button
        >
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="openCouponDialog(3, 5)"
          >红包</el-button
        >
        <!-- <el-button type="danger" icon="el-icon-delete" @click="addMeal"
          >批量删除</el-button
        > -->
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      ref="multipleTable"
    >
      <!-- <el-table-column type="selection" fixed="left" align="center" width="55">
      </el-table-column> -->
      <el-table-column align="center" label="优惠ID">
        <template slot-scope="scope">
          <span>{{ scope.row.coupon_id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.coupon_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="满足金额">
        <template slot-scope="scope">
          <span>{{ scope.row.condition_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="优惠金额">
        <template slot-scope="scope">
          <span>{{ scope.row.favourable_price }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="折扣率">
        <template slot-scope="scope">
          <span>{{ scope.row.discount }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="共存">
        <template slot-scope="scope">
          <span>{{ scope.row.coexistence_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="使用门店">
        <template slot-scope="scope">
          <span>{{ scope.row.vendor_names }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="禁用门店">
        <template slot-scope="scope">
          <span>{{ scope.row.disable_vendor_names }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200" align="center" label="使用时段">
        <template slot-scope="scope">
          <span>{{ scope.row.time_type }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="数量">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="已领">
        <template slot-scope="scope">
          <span>{{ scope.row.receive_num }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="创建人">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'">{{
            scope.row.status == 1 ? "可用" : "禁用"
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="300" fixed="right" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == 1"
            size="mini"
            type="danger"
            @click="disable(scope.row.coupon_id, scope.$index)"
            >禁用</el-button
          >
          <el-button v-else type="info" size="mini">已禁用</el-button>
          <el-button size="mini" @click="copy(scope.row.coupon_id)"
            >复制</el-button
          >
          <el-button size="mini" @click="goDetail(scope.row.coupon_id)"
            >详情</el-button
          >
          <el-button
            v-if="scope.row.status == 1 && scope.row.can_send"
            type="success"
            size="mini"
            @click="openSendCouponDialog(scope.row.coupon_id)"
            >发券</el-button
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form label-width="100px" v-if="ftype == 1">
        <el-form-item label="名称">
          <el-input
            placeholder="请输入次数卡的名称"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="使用门店">
          <el-select
            style="width: 100%"
            v-model="formData.vendor_ids"
            filterable
            multiple
            placeholder="请选择可使用的指定门店"
          >
            <el-option
              v-for="item in storeList"
              :key="item.vendor_id"
              :label="item.vendor_name"
              :value="item.vendor_id"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
          <span class="form_tip">（注：不选即全部门店可用）</span>
        </el-form-item>
        <el-form-item label="禁用门店">
          <el-select
            style="width: 100%"
            v-model="formData.disable_vendor_ids"
            filterable
            multiple
            placeholder="请选择禁用的指定门店"
          >
            <el-option
              v-for="item in disableStoreList"
              :key="item.vendor_id"
              :label="item.vendor_name"
              :value="item.vendor_id"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
          <span class="form_tip">（注：不选即全部门店可用）</span>
        </el-form-item>
        <el-form-item label="使用时段">
          <el-radio-group v-model="formData.time_type_ids">
            <el-radio v-for="item in timeList" :label="item.id">{{
              item.name
            }}</el-radio>
          </el-radio-group>
          <span class="form_tip"
            >（注：这里只能单选，选择即代表只能使用哪个用餐时段的）</span
          >
        </el-form-item>
        <el-form-item label="每人限领次数">
          <el-input
            placeholder="请输入用户每个人限领的次数"
            v-model="formData.receive_num_limit"
          ></el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker
            v-model="valid_at"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['', '23:59:59']"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="数量">
          <el-input
            placeholder="请输入次数卡的数量，不填则无限制"
            v-model="formData.num"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" v-else-if="ftype == 2">
        <el-form-item label="名称">
          <el-input
            placeholder="请输入满减优惠的名称"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            style="width: 100%"
            v-model="formData.type"
            placeholder="请选择优惠类型"
          >
            <el-option label="满减优惠" :value="2"></el-option>
            <el-option label="下单折扣优惠" :value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用门店">
          <el-select
            style="width: 100%"
            v-model="formData.vendor_ids"
            filterable
            multiple
            placeholder="请选择可使用的指定门店"
          >
            <el-option
              v-for="item in storeList"
              :key="item.vendor_id"
              :label="item.vendor_name"
              :value="item.vendor_id"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
          <span class="form_tip">（注：不选即全部门店可用）</span>
        </el-form-item>
        <el-form-item label="使用时段">
          <el-radio v-model="formData.time_type_mode" label="1"
            >并联时段可用</el-radio
          >
          <el-radio v-model="formData.time_type_mode" label="2"
            >串联时段可用</el-radio
          >
          <el-checkbox-group v-model="formData.time_type_ids">
            <el-checkbox v-for="item in timeList" :label="item.id">{{
              item.name
            }}</el-checkbox>
          </el-checkbox-group>
          <span class="form_tip"
            >（注：这里的串联时段，如选择早餐、午餐，则需要用户同时下单早餐、午餐才可用；并联时段反之，如选择早餐、午餐，则用户在早餐、午餐均可使用）</span
          >
        </el-form-item>
        <el-form-item label="优惠共存">
          <el-select
            style="width: 100%"
            v-model="formData.coexistence"
            placeholder="请选择优惠共存"
          >
            <el-option
              label="不能与其他优惠共存（红包除外）"
              :value="0"
            ></el-option>
            <el-option
              label="可与其他优惠共存（优惠券、折扣等）"
              :value="1"
            ></el-option>
          </el-select>
        </el-form-item>
        <template v-if="formData.type == 7">
          <el-form-item label="条件">
            <el-select
              style="width: 100%"
              v-model="formData.mode"
              placeholder="请选择使用折扣条件"
            >
              <el-option label="提前下单" :value="1"></el-option>
              <el-option label="过时清仓" :value="2"></el-option>
              <el-option label="第二份半价" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="formData.mode == 1 || formData.mode == 2"
            :label="formData.mode == 1 ? '提前时间' : '时段过后时间'"
          >
            <!-- <el-input
              type="number"
              placeholder="请输入时间"
              v-model="formData.discount_at"
              ><template slot="append">小时</template></el-input
            > -->
            <el-time-picker
              style="width: 100%"
              v-model="formData.discount_at"
              format="HH:mm"
              value-format="HH:mm"
              placeholder="请选择时间点"
            >
            </el-time-picker>
            <span class="form_tip" v-if="formData.mode == 1"
              >（注：这里的提前时间指的是提前一天）</span
            >
            <span class="form_tip" v-else
              >（注：这里指的是当天用餐时段过后的时间）</span
            >
          </el-form-item>
          <el-form-item v-if="formData.mode == 1 || formData.mode == 2" label="折扣率">
            <el-input
              placeholder="请输入0-1的折扣率"
              v-model="formData.discount"
            ></el-input>
          </el-form-item>
          <el-form-item label="有效期">
            <el-date-picker
              v-model="valid_at"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :default-time="['', '23:59:59']"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
        </template>
        <template v-if="formData.type == 2">
          <template v-for="item in formData.full_reduction_data">
            <el-divider />
            <el-form-item label="满足金额">
              <el-input
                placeholder="请输入满足使用条件的金额"
                v-model="item.condition_price"
              ></el-input>
            </el-form-item>
            <el-form-item label="优惠金额">
              <el-input
                placeholder="请输入优惠的金额"
                v-model="item.favourable_price"
              ></el-input>
            </el-form-item>
            <el-form-item label="有效期">
              <el-date-picker
                v-model="item.valid_at"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                :default-time="['', '23:59:59']"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </template>
          <!-- <el-button size="mini" type="success" @click="addItem"
            >继续添加</el-button
          > -->
        </template>
      </el-form>
      <el-form label-width="100px" v-else-if="ftype == 3">
        <el-form-item label="名称">
          <el-input
            placeholder="请输入套餐折扣的名称"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="优惠共存">
          <el-select
            style="width: 100%"
            v-model="formData.coexistence"
            placeholder="请选择优惠共存"
          >
            <el-option
              label="不能与其他优惠共存（红包除外）"
              :value="0"
            ></el-option>
            <el-option
              label="可与其他优惠共存（优惠券、满减等）"
              :value="1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折扣率">
          <el-input
            placeholder="请输入0-1的折扣率"
            v-model="formData.discount"
          ></el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker
            v-model="valid_at"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['', '23:59:59']"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" v-else-if="ftype == 4">
        <el-form-item label="名称">
          <el-input
            placeholder="请输入优惠券的名称"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            style="width: 100%"
            v-model="formData.type"
            filterable
            placeholder="请选择优惠券类型"
          >
            <el-option label="满减优惠券" value="4"></el-option>
            <el-option label="折扣优惠券" value="8"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用门店">
          <el-select
            style="width: 100%"
            v-model="formData.vendor_ids"
            filterable
            multiple
            placeholder="请选择可使用的指定门店"
          >
            <el-option
              v-for="item in storeList"
              :key="item.vendor_id"
              :label="item.vendor_name"
              :value="item.vendor_id"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
          <span class="form_tip">（注：不选即全部门店可用）</span>
        </el-form-item>
        <el-form-item label="禁用门店">
          <el-select
            style="width: 100%"
            v-model="formData.disable_vendor_ids"
            filterable
            multiple
            placeholder="请选择禁用的指定门店"
          >
            <el-option
              v-for="item in disableStoreList"
              :key="item.vendor_id"
              :label="item.vendor_name"
              :value="item.vendor_id"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
          <span class="form_tip">（注：不选即全部门店可用）</span>
        </el-form-item>
        <el-form-item label="优惠共存">
          <el-select
            style="width: 100%"
            v-model="formData.coexistence"
            placeholder="请选择优惠共存"
          >
            <el-option
              label="不能与其他优惠共存（红包除外）"
              :value="0"
            ></el-option>
            <el-option
              label="可与其他优惠共存（满减、折扣等）"
              :value="1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用时段">
          <el-radio v-model="formData.time_type_mode" label="1"
            >并联时段可用</el-radio
          >
          <el-radio v-model="formData.time_type_mode" label="2"
            >串联时段可用</el-radio
          >
          <el-checkbox-group v-model="formData.time_type_ids">
            <el-checkbox v-for="item in timeList" :label="item.id">{{
              item.name
            }}</el-checkbox>
          </el-checkbox-group>
          <span class="form_tip"
            >（注：这里的串联时段，如选择早餐、午餐，则需要用户同时下单早餐、午餐才可用；并联时段反之，如选择早餐、午餐，则用户在早餐、午餐均可使用）</span
          >
        </el-form-item>
        <template v-if="formData.type == 4">
          <el-form-item label="满足金额">
            <el-input
              placeholder="请输入满足使用条件的金额"
              v-model="formData.condition_price"
            ></el-input>
          </el-form-item>
          <el-form-item label="金额">
            <el-input
              placeholder="请输入优惠券的金额"
              v-model="formData.favourable_price"
            ></el-input>
          </el-form-item>
        </template>
        <el-form-item v-if="formData.type == 8" label="折扣">
          <el-input
            placeholder="请输入0-1的折扣率"
            v-model="formData.discount"
          ></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input
            placeholder="请输入优惠券的数量"
            v-model="formData.num"
          ></el-input>
        </el-form-item>
        <el-form-item label="限领数量">
          <el-input
            placeholder="请输入每个人领取的数量"
            v-model="formData.receive_num_limit"
          ></el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker
            v-model="valid_at"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['', '23:59:59']"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-form label-width="100px" v-else-if="ftype == 5">
        <el-form-item label="名称">
          <el-input
            placeholder="请输入红包的名称"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="使用门店">
          <el-select
            style="width: 100%"
            v-model="formData.vendor_ids"
            filterable
            multiple
            placeholder="请选择可使用的指定门店"
          >
            <el-option
              v-for="item in storeList"
              :key="item.vendor_id"
              :label="item.vendor_name"
              :value="item.vendor_id"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
          <span class="form_tip">（注：不选即全部门店可用）</span>
        </el-form-item>
        <el-form-item label="禁用门店">
          <el-select
            style="width: 100%"
            v-model="formData.disable_vendor_ids"
            filterable
            multiple
            placeholder="请选择禁用的指定门店"
          >
            <el-option
              v-for="item in disableStoreList"
              :key="item.vendor_id"
              :label="item.vendor_name"
              :value="item.vendor_id"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
          <span class="form_tip">（注：不选即全部门店可用）</span>
        </el-form-item>
        <el-form-item label="使用时段">
          <el-radio v-model="formData.time_type_mode" label="1"
            >并联时段可用</el-radio
          >
          <el-radio v-model="formData.time_type_mode" label="2"
            >串联时段可用</el-radio
          >
          <el-checkbox-group v-model="formData.time_type_ids">
            <el-checkbox v-for="item in timeList" :label="item.id">{{
              item.name
            }}</el-checkbox>
          </el-checkbox-group>
          <span class="form_tip"
            >（注：这里的串联时段，如选择早餐、午餐，则需要用户同时下单早餐、午餐才可用；并联时段反之，如选择早餐、午餐，则用户在早餐、午餐均可使用）</span
          >
        </el-form-item> -->
        <el-form-item label="金额">
          <el-input
            placeholder="请输入红包的金额"
            v-model="formData.favourable_price"
          ></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input
            placeholder="请输入红包的数量"
            v-model="formData.num"
          ></el-input>
        </el-form-item>
        <el-form-item label="限领数量">
          <el-input
            placeholder="请输入每个人领取的数量"
            v-model="formData.receive_num_limit"
          ></el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker
            v-model="valid_at"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['', '23:59:59']"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCoupon">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog width="65%" title="发券" :visible.sync="sendCouponDialog">
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="10">
          <el-input
            v-model="listData1.condition"
            placeholder="请输入搜索内容"
          ></el-input>
        </el-col>
        <el-col :span="10">
          <el-button @click="searchUser" type="primary" icon="el-icon-search"
            >搜索</el-button
          >
        </el-col>
        <el-col :span="4" style="display: flex; justify-content: flex-end">
          <el-button type="success" icon="el-icon-plus" @click="sendCoupon"
            >确定发券</el-button
          >
        </el-col>
      </el-row>
      <el-table
        v-loading="userLoading"
        :data="userList"
        border
        fit
        highlight-current-row
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column fixed align="center" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" label="用户ID">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column width="200" align="center" label="用户头像">
          <template slot-scope="scope">
            <img
              style="width: 150px; height: 150px"
              :src="scope.row.headImg"
              alt=""
            />
          </template>
        </el-table-column>

        <el-table-column width="200" align="center" label="昵称">
          <template slot-scope="scope">
            <span>{{ scope.row.nickName }}</span>
          </template>
        </el-table-column>

        <el-table-column width="200" align="center" label="微信号">
          <template slot-scope="scope">
            <span>{{ scope.row.WeChatNum }}</span>
          </template>
        </el-table-column>

        <el-table-column width="180" align="center" label="手机号码">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="userTotal > 0"
        :total="userTotal"
        :page.sync="listData1.page"
        :limit.sync="listData1.page_size"
        @pagination="getUserList"
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  searchStoreList,
  couponList,
  disableCoupon,
  addCoupon,
  userList,
  sendCoupon,
} from "@/api/basic";
import { getTimeTypeData } from "@/api/store";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      list: [],
      storeList: [],
      disableStoreList: [],
      listData: {
        page: 1,
        page_size: 10,
        name: "",
      },
      listData1: {
        page: 1,
        page_size: 10,
        condition: "",
        type: 1,
      },
      loading: true,
      total: 0,
      formData: {
        vendor_ids: [],
        disable_vendor_ids: [],
        name: "",
        type: "",
        condition_price: "",
        favourable_price: "",
        discount: "",
        num: "",
        receive_num_limit: "",
        time_type_mode: "",
        time_type_ids: [],
        coexistence: "",
        mode: "",
        discount_at: "",
        full_reduction_data: [
          { condition_price: "", favourable_price: "", valid_at: "" },
        ],
        valid_at_start: "",
        valid_at_end: "",
      },
      valid_at: "",
      defaultFormData: {}, //formData默认数据，为了能在添加优惠红包后清空表单数据
      dialogTitle: "",
      dialogFormVisible: false,
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        },
      },
      sendCouponDialog: false,
      userList: [],
      userTotal: 0,
      userLoading: false,
      customer_id: "",
      coupon_ids: "",
      timeList: [],
      ftype: "",
    };
  },
  components: { Pagination },
  watch: {
    valid_at(val) {
      this.formData.valid_at_start = val[0];
      this.formData.valid_at_end = val[1];
    },
    "formData.vendor_ids"(arr) {
      this.disableStoreList.forEach((item) => {
        item.disabled = false;
        arr.forEach((it) => {
          if (item.vendor_id == it) {
            item.disabled = true;
          }
        });
      });
    },
    "formData.disable_vendor_ids"(arr) {
      this.storeList.forEach((item) => {
        item.disabled = false;
        arr.forEach((it) => {
          if (item.vendor_id == it) {
            item.disabled = true;
          }
        });
      });
    },
  },
  created() {
    this.defaultFormData = JSON.parse(JSON.stringify(this.formData));
    this.getList();
    this.getStoreList();
    this.getUserList();
    this.getTimeTypeData();
  },
  methods: {
    getTimeTypeData() {
      getTimeTypeData().then((res) => {
        this.timeList = res;
      });
    },
    //搜索列表
    searchList() {
      this.listData.page = 1;
      this.getList();
    },
    //搜索用户
    searchUser() {
      this.listData1.page = 1;
      this.getUserList();
    },
    openSendCouponDialog(coupon_id) {
      this.coupon_ids = coupon_id;
      this.sendCouponDialog = true;
    },
    handleSelectionChange(val) {
      let resArr = [];
      val.forEach((item) => resArr.push(item.id));
      this.customer_id = resArr.join(",");
    },
    //确定发券
    sendCoupon() {
      sendCoupon({
        coupon_ids: this.coupon_ids,
        customer_id: this.customer_id,
        receive_type: 2,
      }).then((res) => {
        if (res) {
          this.sendCouponDialog = false;
          this.$refs.multipleTable.clearSelection();
          this.$notify({
            title: "成功",
            message: "发送成功",
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    getUserList() {
      this.userLoading = true;
      userList(this.listData1).then((res) => {
        this.userList = res.list;
        this.userTotal = res.count;
        this.userLoading = false;
      });
    },
    openCouponDialog(type, ftype) {
      this.ftype = ftype || "";
      if (ftype == 1) {
        this.dialogTitle = "新增单次次数卡";
      } else if (ftype == 2) {
        this.dialogTitle = "新增满减折扣";
      } else if (ftype == 3) {
        this.dialogTitle = "新增套餐折扣";
      } else if (ftype == 4) {
        this.dialogTitle = "新增优惠券";
      } else if (ftype == 5) {
        this.dialogTitle = "新增红包";
      }
      this.formData = JSON.parse(JSON.stringify(this.defaultFormData));
      this.valid_at = "";
      this.$set(this.formData, "type", type);
      this.dialogFormVisible = true;
    },
    addItem() {
      this.formData.full_reduction_data.push({
        condition_price: "",
        favourable_price: "",
        valid_at: "",
      });
    },
    addCoupon() {
      let aData = JSON.parse(JSON.stringify(this.formData));
      if (aData.time_type_ids) {
        if (typeof aData.time_type_ids == "number") {
          aData.time_type_ids = JSON.stringify([aData.time_type_ids]);
        } else {
          aData.time_type_ids = JSON.stringify(aData.time_type_ids);
        }
      }
      aData.vendor_ids = JSON.stringify(aData.vendor_ids);
      aData.disable_vendor_ids = JSON.stringify(aData.disable_vendor_ids);
      let full_reduction_data = [];
      aData.full_reduction_data.forEach((item) => {
        if (item.valid_at) {
          full_reduction_data.push({
            valid_at_start: item.valid_at[0],
            valid_at_end: item.valid_at[1],
            condition_price: item.condition_price,
            favourable_price: item.favourable_price,
          });
        }
      });
      aData.full_reduction_data = JSON.stringify(full_reduction_data);
      addCoupon(aData).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "提交成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.getList();
              this.dialogFormVisible = false;
              this.formData = JSON.parse(JSON.stringify(this.defaultFormData));
            },
          });
        }
      });
    },
    getStoreList() {
      searchStoreList().then((res) => {
        this.storeList = JSON.parse(JSON.stringify(res));
        this.disableStoreList = JSON.parse(JSON.stringify(res));
      });
    },
    copy(id) {},
    goDetail(coupon_id) {
      this.$router.push(`/basic/red_package_detail?coupon_id=${coupon_id}`);
    },
    disable(coupon_id, index) {
      disableCoupon({ coupon_id }).then((res) => {
        if (res) {
          this.list[index].status = 0;
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
      couponList(this.listData).then((res) => {
        this.total = res.count;
        this.list = res.list;
        this.loading = false;
      });
    },
  },
};
</script>


