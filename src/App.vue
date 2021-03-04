<template>
  <!-- <wxScroll id="app" class="scroll">
    <router-view />
  </wxScroll>-->
  <router-view />
</template>
<script>
import wxScroll from "@/components/wxScroll";
export default {
  data() {
    return {
      toTop: true,
    };
  },
  components: {
    wxScroll,
  },
  created() {
    // 解决微信浏览器键盘弹回后页面被顶上去问题
    document.addEventListener("focusout", () => {
      setTimeout(() => {
        if (this.toTop) {
          document.body.scrollTop = 0;
        }
      }, 100);
    });
    document.addEventListener("focusin", (el) => {
      this.toTop = false;
      setTimeout(() => {
        this.toTop = true;
        window.scrollTo({
          top: el.target.offsetTop - 100,
        });
      }, 400);
    });
  },
};
</script>
<style>
#app {
  font-family: PingFangSC-Regular, PingFang SC, Avenir, Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
}
</style>
