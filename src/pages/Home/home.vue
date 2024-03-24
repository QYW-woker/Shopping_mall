<template>
  <div>
    <!-- 三级联动全局组件，已经是全局组件，因此不需要在导入 -->
    <TypeNavIndex />
    <ListContainer />
    <RecommendIndex />
    <RankIndex />
    <LikeIndex />
    <!-- :list="floor" -->
    <FloorIndex v-for="floor in floorList" :key="floor.id" :list="floor" />

    <BrandIndex />
  </div>
</template>

<script>
// 引入其余组件
import ListContainer from "@/pages/Home/ListContainer/index.vue";
import RecommendIndex from "@/pages/Home/Recommend/index.vue";
import RankIndex from "@/pages/Home/Rank/index.vue";
import LikeIndex from "@/pages/Home/Like/index.vue";
import BrandIndex from "@/pages/Home/Brand/index.vue";
import FloorIndex from "@/pages/Home/Floor/index.vue";
import { mapState } from "vuex";
export default {
  name: "HomeIndex",
  components: {
    ListContainer,
    RecommendIndex,
    RankIndex,
    LikeIndex,
    BrandIndex,
    FloorIndex,
  },

  mounted() {
    // 派发action，获取floor组件的数据
    // floor中的数据在home组件身上。而floor组件需要数据来渲染。所以要用到父子组件通信
    this.$store.dispatch("getFloorList");


  },

  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style scoped></style>