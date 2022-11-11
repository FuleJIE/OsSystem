<template>
  <Layout folderName="Bilibili" class="layout">
    <iframe src="https://www.bilibili.com/"></iframe>
  </Layout>
</template>

<script>
import Layout from "../Layouts/FolderLayout";
export default {
  name: "Bilibili",
  components: { Layout },
};
</script>
<style scoped>
.layout {
  min-width: 1187px;
  min-height: 722px;
  width: 50%;
  height: 40%;
}
</style>
