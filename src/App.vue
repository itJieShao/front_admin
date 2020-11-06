<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style>
img[src=""],
img:not([src]) {
  opacity: 0;
}
</style>