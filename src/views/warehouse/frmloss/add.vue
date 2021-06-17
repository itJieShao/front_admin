<template>
  <div style="margin-left: 40px;">
    <h2>新增门店报损</h2>
    <el-row :gutter="20" style="margin-bottom: 20px;margin-top: 40px;">
      <el-col :span="1.8" style="display: flex; justify-content: flex-end;">
        <h5 style="float: left;margin-top: 15px;">报损门店：</h5>
      </el-col>
      <el-col :span="10">
        <el-select v-model="datas" style="width: 100%;">
          <el-option v-for="item in sag" :key="item.value" :label="item.text" :value="item.value" />
        </el-select>
      </el-col>
      <el-col :span="1.8" style="display: flex; justify-content: flex-end;">
        <h5 style="float: left;margin-top: 15px;">售卖日期：</h5>
      </el-col>
      <el-col :span="6">
        <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
      </el-col>
    </el-row>
    <el-table :data="tabdata" style="width: 80%;" border>
      <el-table-column width="180" label="请选择套餐">
        <template slot-scope="scope">
          <el-select v-model="scope.row.num" style="width: 100%;" filterable placeholder="请选择门店套餐">
            <el-option v-for="item in msg" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="supplier_name" label="单品报损">
        <el-table style="width: 100%" stripe :data="tabdatas">
          <el-table-column prop="supplier_name" label="猪肚鸡" />
          <el-table-column prop="supplier_name" label="两亩地" />
          <el-table-column prop="supplier_name" label="东北大米饭" />
          <el-table-column prop="supplier_name" />
        </el-table>

      </el-table-column>
      <el-table-column prop="supplier_name" label="套餐报损" width="160" />
    </el-table>
    <el-button style="margin-top: 40px;margin-left: 10px;" type="success">添加新的报损</el-button>
    <div style="margin-top: 80px;">
      <el-button style="float: left;" @click="onclear()">取消</el-button>
      <el-button style="float: left;margin-left: 40px;">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: 0,
      value1: '',
      sag: [{
        value: 0,
        text: '全部'
      }, {
        value: 1,
        text: '广东-广州,体育西路店'
      }, {
        value: 2,
        text: '广东-广州,香雪润丰店'
      },
      {
        value: 3,
        text: '广东-深圳,福田coco店'
      }, {
        value: 4,
        text: '广东-深圳,南山深大店'
      }
      ],
      num: 0,
      msg: [{
        value: 1,
        text: '红酒牛腩饭'
      }, {
        value: 2,
        text: '涞菜肉沫饭'
      }],
      tabdata: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      tabdatas: [{}]

    }
  },
  methods: {
    onclear() {
      this.subLoading = false
      this.$router.go(-1)
    }
  }
}
</script>

<style>
</style>
