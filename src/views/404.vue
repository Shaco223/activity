<template>
  <div class="error">
    <van-empty image="error" description="404" />
  </div>
</template>

<script>

import { Empty } from 'vant';
  export default {
    name:'',
    data () {
      return {

      };
    },
    components:{
        [Empty.name]: Empty
    }

  }

</script>
<style lang='scss' scoped>
.error{
    min-height: 100vh;
    background: #ffffff;
    /deep/ .van-empty__description{
        font-size: 30px;
        margin-top: 40px;
    }
}
</style>