<template>
  <div class="page">
    <router-view />
    <div class="tabbar flex-contain flex-main-justify flex-cross-center">
      <div class="tabbar-item" :class="{'active': $route.path == `/${$store.state.tenantId}/`}" @click="switchTab(`/${$store.state.tenantId}/`)">
        <img
          v-if="$route.path == `/${$store.state.tenantId}/`"
          src="https://static.lianhaikeji.com/unimall/BD3A6E3D43B34338A8488CC0C5B411C0.png"
          alt
        />
        <img
          v-else
          src="https://static.lianhaikeji.com/unimall/B01EAA1A0571428398D488896710D91C.png"
          alt
        />
        <p>首页</p>
      </div>
      <div
        class="tabbar-item"
        :class="{'active': $route.path == `/${$store.state.tenantId}/personalCenter`}"
        @click="switchTab(`/${$store.state.tenantId}/personalCenter`)"
      >
        <img
          v-if="$route.path == `/${$store.state.tenantId}/personalCenter`"
          src="https://static.lianhaikeji.com/unimall/493FF16869B443579F7C013D108FBFBA.png"
          alt
        />
        <img
          v-else
          src="https://static.lianhaikeji.com/unimall/5DA3246F68F14C609C5066F3E73CB0A0.png"
          alt
        />
        <p>个人中心</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    switchTab(url) {
      if (url != this.$route.path) {
        this.$router.push(url);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.page {
  position: relative;
  padding-bottom: 60px;
}
.tabbar {
  width: 100%;
  height: 60px;
  box-sizing: content-box;
  padding-bottom: env(safe-area-inset-bottom);
  text-align: center;
  background: #ffffff;
  box-shadow: 0px 0px 12px 0px rgba(229, 229, 229, 1);
  position: fixed;
  bottom: 0;
  &-item {
    flex: 1;
    img {
      width: 26px;
      height: 26px;
    }
    p {
      font-size: 10px;
      color: #818181;
      line-height: 14px;
    }
    &.active {
      p {
        color: #faad14;
      }
    }
  }
}
</style>