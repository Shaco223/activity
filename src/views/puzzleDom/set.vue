<!--
 * @Author: liuxiang
 * @Date: 2020-09-19 13:50:34
 * @LastEditors: liuxiang
 * @LastEditTime: 2021-03-03 16:37:26
 * @Description: file content
-->
<template>
  <div>
    <van-nav-bar title="设置" />
    <van-form label-width="130" @submit="onSubmit">
      <van-field label="难度">
        <template #input>
          <van-rate v-model="form.level" :count="3" />
        </template>
      </van-field>
      <van-field v-model="form.time" name="单局游戏时间(秒)" label="单局游戏时间(秒)" placeholder="单局游戏时间(秒)" />
      <van-field v-model="form.successScore" name="拼对加分" label="拼对加分" placeholder="拼对加分" />
      <van-field v-model="form.failScore" name="拼错扣分" label="拼错扣分" placeholder="拼错扣分" />
      <van-field
        v-model="form.multiple"
        name="拼完一幅图倍数奖励"
        label="拼完一幅图倍数奖励"
        placeholder="拼完一幅图倍数奖励"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">确定</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Button, NavBar, Rate } from "vant";
import form from './../../../public/set/set'
export default {
  name: "",
  data() {
    return {
      form: form,
    };
  },
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Rate.name]: Rate,
  },
  methods: {
    onSubmit() {
      localStorage.setItem("gameSetPuzzle", JSON.stringify(this.form));
      this.$router.push("/puzzleDom");
    },
  },
  mounted() {
    if (localStorage.getItem("gameSetPuzzle")) {
      let set = JSON.parse(localStorage.getItem("gameSetPuzzle"));
      this.form = set;
    }
  },
};
</script>
<style lang='scss' scoped>
</style>