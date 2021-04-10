<template>
  <div class="app-container">
    <h2>
      {{
        $route.query.vendor_id ? "编辑门店优惠促销公告" : "新增门店优惠促销公告"
      }}
    </h2>
    <el-form label-width="100px">
      <el-form-item label="门店">
        <el-select
          :popper-append-to-body="false"
          style="width: 100%;z-index: 99999999"
          v-model="formData.vendor_id"
          filterable
          placeholder="请选择门店"
        >
          <el-option
            v-for="item in storeList"
            :key="item.vendor_id"
            :label="item.vendor_name"
            :value="item.vendor_id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="喇叭公告" v-model="formData.horn"></el-input>
      </el-form-item>
      <el-form-item label="优惠公告内容">
        <Editor @getNewHtml="getNewHtml" :value="formData.content" />
      </el-form-item>
    </el-form>
    <el-row type="flex" class="row-bg" justify="end">
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import { searchStoreList } from "@/api/basic";
import {
  editStoreNotice,
  storeNoticeDetail,
} from "@/api/operate/c_layout/store_notice";
import Editor from "@/components/Editor";
export default {
  components: { Editor },
  data() {
    return {
      formData: {
        vendor_id: "",
        content: "",
      },
      storeList:[]
    };
  },
  created() {
    if (this.$route.query.vendor_id) {
      this.$set(this.formData,"vendor_id",Number(this.$route.query.vendor_id));
      this.getDetail();
    }
    this.getStoreList();
  },
  methods: {
    getNewHtml(content) {
      this.$set(this.formData, "content", content);
    },
    getDetail() {
      storeNoticeDetail({ vendor_id: this.formData.vendor_id }).then((res) => {
        this.$set(this.formData, "content", res.content);
      });
    },
    //门店下拉列表
    getStoreList() {
      searchStoreList().then((res) => {
        this.storeList = res;
      });
    },
    onSubmit() {
      editStoreNotice(this.formData).then((res) => {
        if (res) {
          this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.$router.go(-1);
            },
          });
        }
      });
    },
  },
};
</script>