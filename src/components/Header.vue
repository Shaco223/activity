<template>
  <!-- <div class="MyHeader" :style="{ backgroundColor: bgColor }">
    <div class="icon" @click="goBack" v-if="backStatus">
      <van-icon name="arrow-left" />
    </div>
    {{ title }}
  </div>-->
  <div class="myHeader">
    {{backStatus}}
    <van-nav-bar
      :title="title"
      :border="false"
      fixed
      :left-arrow="backStatus"
      @click-left="goBack"
    />
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { NavBar } from "vant";
export default {
  name: "MyHeader",
  props: {
    backStatus: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
    },
    bgColor: {
      type: String,
      default: "#FAAD14",
    },
  },
  data() {
    return {};
  },
  components: {
    [NavBar.name]: NavBar,
  },
  methods: {
    goBack() {
      if (this.backStatus) {
        window.history.go(-1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.myHeader {
  width: 100%;
  height: 46px;
  position: relative;
  /deep/ .van-nav-bar {
    background-color: #faad14;
    .van-nav-bar__title {
      color: #ffffff;
    }
    .van-icon {
      color: #ffffff;
    }
  }
}
// .MyHeader {
//   position: absolute;
//   width: 100%;
//   z-index: 99;
//   top: 0;
//   color: #fff;
//   text-align: center;
//   font-size: 18px;
//   line-height: 44px;
//   height: 44px;
//   color: #fff;
//   .icon {
//     position: absolute;
//     height: 20px;
//     line-height: 20px;
//     top: 12px;
//     color: #fff;
//     left: 12px;
//     font-size: 20px;
//   }
// }
</style>
