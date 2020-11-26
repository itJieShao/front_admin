<template>
  <div class="app-container">
    <h2>{{pageTitle}}详情</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
        pageTitle:''
    };
  },
  methods: {},
  created() {
    let { employee_id, station_id } = this.$route.query;
    switch (station_id) {
      case '1':
        this.pageTitle = "门店员工";
        break;
      case '2':
        this.pageTitle = "配货员";
        break;
      case '3':
        this.pageTitle = "QC人员";
        break;
    }
  },
};
</script>

<style>
</style>