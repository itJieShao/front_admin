import Vue from 'vue'
// 针对 el-select 下拉框定义的一个分页指令：滚动到底部执行加载下一页
const selectLoadMore = Vue.directive('el-select-loadmore', {
    inserted(el, binding) {
        const SELECTWRAP_DOM = el.querySelector(
            '.el-select-dropdown .el-select-dropdown__wrap'
        );
        SELECTWRAP_DOM.addEventListener('scroll', function () {
            const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
            if (condition) {
                binding.value();
            }
        });
    }
});
export {
    selectLoadMore
}