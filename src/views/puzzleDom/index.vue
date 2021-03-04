<template>
  <div class="puzzleDom" @click.once='playAudio'>
    <audio src="./../../../public/music/bgs.mp3" id="myaudio" controls="controls" loop ref="MusicPlay"></audio>
    <div class="content flex-contain flex-wrap">
      <div
        class="item"
        :class="{'active':bgStatus[index]}"
        v-for="(item,index) in col*row"
        :key="index"
        :style="{'width': (1/col)*100 + '%','height': (1/row)*100+'%'}"
      >
        <draggable
          :options="{group: list[index].length > 0 ? '':'card',animation:150,filter:'.nodraggable',disabled:false,forceFallback: false,sort:false}"
          v-model="list[index]"
          @change="change($event,index)"
          style="width:100%;height:100%;"
        >
          <template v-for="(info,idx) in list[index]">
            <img class="nodraggable" :src="info.url" :key="idx" alt />
          </template>
        </draggable>
      </div>
      <div class="score" v-if="gameStatus==2">
        <div class="title">本轮得分</div>
        <div class="scoreNum">{{score}}</div>
      </div>
    </div>
    <div class="ready" v-if="gameStatus == 0">
      <div class="beginBtn" @click="begin">
        <div class="inner">开始游戏</div>
      </div>
      <div class="rule">
        <p class="title">游戏规则</p>
        <p>在规定时间内完成尽可能多的拼图，完成越多得分越高</p>
      </div>
    </div>
    <div class="begin" v-else-if="gameStatus == 1">
      <div class="time">
        <van-count-down :time="time" @finish="finish" millisecond format="ss:SS" />
      </div>
      <div class="pic">
        <div class="picList flex-contain flex-wrap flex-main-justify">
          <div class="picList-item" v-for="(item,index) in col*row" :key="index">
            <draggable
              :options="{group:startIndex==index ? 'card':'disable',animation:150,dragClass:'dragClass',forceFallback: false,sort:false}"
              v-model="patchList[index]"
              class="flex-contain flex-main-justify"
              @start="startIndex=index"
            >
              <div v-for="(info,idx) in patchList[index]" :key="idx" class="img">
                <img v-if="info.url" :src="info.url" alt />
              </div>
            </draggable>
          </div>
        </div>
      </div>
      <div class="picname">{{preloadImgList[puzzleIndex-1].name}}</div>
      <div class="stepResult">
        <!-- <div class="stepResult-item">{{stepResultList[stepResultList.length-1]}}</div> -->
        <div class="stepResult-item" v-for="(item,index) in stepResultList" :key="index">
          <div class="bounceIn">{{item}}</div>
        </div>
      </div>
    </div>
    <div class="result begin ready" v-else>
      <div class="time">
        <van-count-down :time="time" millisecond format="ss:SS" />
      </div>
      <div class="beginBtn" @click="begin">
        <div class="inner">再来一次</div>
      </div>
      <div class="rule">
        <div class="title">共完成拼图{{puzzleSuccess}}幅，错误{{failTime}}次</div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { CountDown } from "vant";
let imgList = [
  {
    url: require("@/assets/pintu/路飞.jpg"),
    name: "路飞",
  },
  {
    url: require("@/assets/pintu/多弗朗明哥.jpg"),
    name: "多弗朗明哥",
  },
  {
    url: require("@/assets/pintu/娜美.jpg"),
    name: "娜美",
  },
  {
    url: require("@/assets/pintu/索隆.jpg"),
    name: "索隆",
  },
  {
    url: require("@/assets/pintu/汉库克.jpg"),
    name: "汉库克",
  }
];
export default {
  name: "",
  data() {
    return {
      gameStatus: 0, //游戏状态
      level: 0, //难度等级
      levelList: [
        //难度等级列表
        {
          col: 2,
          row: 2,
        },
        {
          col: 3,
          row: 2,
        },
        {
          col: 3,
          row: 3,
        },
      ],
      puzzleIndex: 0, //当前第几幅拼图
      successScore: 2, //拼对加分
      failScore: 1, //拼错扣分
      multiple: 2, //拼成功一副图所翻倍数
      puzzleSuccess: 0, //拼成张数
      failTime: 0, //拼错次数
      score: 0, //分数
      singleScore: 0, //单幅图的分数
      list: [], //已拼图列表
      patchList: [], //碎片拼图列表
      time: 0,
      gametime: 60000, //游戏设置时间
      stepResultList: [], //结果列表
      startIndex: null, //当前拖拽元素下标
      imgList: imgList, //加载图片列表
      preloadImgList: [], //预加载图片列表
    };
  },
  components: {
    draggable,
    [CountDown.name]: CountDown,
  },
  computed: {
    col() {
      //列
      return this.levelList[this.level].col;
    },
    row() {
      //行
      return this.levelList[this.level].row;
    },
    bgStatus() {
      //拼图格子背景颜色
      let arr = [];
      for (let i = 0; i < this.row; i++) {
        for (let j = 0; j < this.col; j++) {
          arr[i * this.col + j] = (i + j) % 2;
        }
      }
      console.log(arr);
      return arr;
    },
  },
  watch: {
    list(val) {
      //监听当前拼图列表
      let arr = val.filter((e) => {
        return e.length > 0;
      });
      if (arr.length == this.col * this.row) {
        //是否完成
        if (this.puzzleIndex == this.preloadImgList.length - 1) {
          //最后一幅直接结束游戏
          this.finish();
        } else {
          setTimeout(() => {
            this.nextImg();
            this.init();
            this.puzzleSuccess++;
          }, 200);
        }
      }
    },
  },
  created() {
    if (localStorage.getItem("gameSetPuzzle")) {
      //获取游戏设置
      let set = JSON.parse(localStorage.getItem("gameSetPuzzle"));
      this.level = set.level - 1;
      this.successScore = parseInt(set.successScore);
      this.failScore = parseInt(set.failScore);
      this.multiple = parseInt(set.multiple);
      this.gametime = set.time * 1000;
    } else {
      let form = require("./../../../public/set/set");
      this.level = form.level - 1;
      this.successScore = parseInt(form.successScore);
      this.failScore = parseInt(form.failScore);
      this.multiple = parseInt(form.multiple);
      this.gametime = form.time * 1000;
      console.log(form);
    }
    this.init();
  },
  async mounted() {
    //this.nextImg();
    this.preload()
    this.$refs.MusicPlay.pause()
    setTimeout(()=>{
      //this.$refs.MusicPlay.play()
    },1000)
  },
  methods: {
    playAudio(){
      this.$refs.MusicPlay.play()
    },
    preload() {
      //图片预加载
      for (let i = 0; i < this.imgList.length; i++) {
        let image = new Image();
        image.setAttribute("crossOrigin", "anonymous");
        image.src = this.imgList[i].url;
        image.onload = () => {
          this.preloadImgList[i] = {
            image: image,
            name: this.imgList[i].name,
          };
          // this.count++
          // // 计算图片加载的百分数，绑定到percent变量
          // let percentNum = Math.floor(this.count / 14 * 100)
          // this.percent = `${percentNum}%`
        };
      }
    },
    init() {
      //游戏初始化
      for (let i = 0; i < this.col * this.row; i++) {
        this.list[i] = [];
      }
      this.score = this.score + this.singleScore * this.multiple;
      this.singleScore = 0;
      this.stepResultList = [];
    },
    nextImg() {
      //下一张图片
      this.splitImage(
        this.col,
        this.row,
        this.preloadImgList[this.puzzleIndex++].image
        //this.imgList[this.puzzleIndex++].url
        //require(`@/assets/pintu/img1.jpg`)
      );
    },
    splitImage(col, row, imageObj) {
      //图片根据游戏行列分块
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      //var imageObj = new Image();
      //imageObj.crossOrigin = "Anonymous";
      //imageObj.setAttribute("crossOrigin", "anonymous"); // 解决报错问题 failed to execute 'toDataURL' on 'HTMLCanvasElement' tainted canvaes may not be exported
      //imageObj.src = imgSrc;
      //imageObj.onload = () => {
      var width = imageObj.width;
      var height = imageObj.height;
      canvas.width = imageObj.width / col;
      canvas.height = imageObj.height / row;
      let list = [];
      for (let y = 0; y < this.row; y++) {
        for (let x = 0; x < this.col; x++) {
          let simpleWidth = parseInt(width / col);
          let simpleHeight = parseInt(height / row);
          context.drawImage(
            imageObj,
            x * simpleWidth,
            y * simpleHeight,
            simpleWidth,
            simpleHeight,
            0,
            0,
            simpleWidth,
            simpleHeight
          );
          list.push({
            url: canvas.toDataURL("image/png"),
            sort: y * this.row + x,
          });
        }
      }
      list.sort(() => Math.random() - 0.5);
      this.canvasimg = list;
      for (let i = 0; i < this.col * this.row; i++) {
        this.patchList[i] = new Array();
        this.$set(this.patchList, i, [
          {
            ...list[i],
            index: i,
          },
        ]);
      }
      //};
    },
    //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
    change: function (evt, index) {
      //当前拼块是否正确，错误放回原处
      if (index == evt.added.element.sort) {
        console.log("正确");
        this.stepResultList.push("正确");
        this.singleScore += this.successScore;
      } else {
        console.log("错误");
        this.failTime++;
        this.stepResultList.push("错误");
        this.singleScore -= this.failScore;
        this.$set(this.patchList, evt.added.element.index, [evt.added.element]);
        if (this.list[index].length <= 1) {
          this.$set(this.list, index, []);
        } else {
          let temp = this.list[index].filter((el) => {
            return el.sort == index;
          });
          this.$set(this.list, index, temp);
        }
      }
    },
    begin() {
      //游戏开始
      this.preloadImgList.sort(() => Math.random() - 0.5); //打乱顺序
      this.gameStatus = 1;
      this.singleScore = 0;
      this.score = 0;
      this.failTime = 0;
      this.puzzleSuccess = 0;
      this.puzzleIndex = 0;
      this.time = this.gametime;
      this.nextImg();
      this.init();
    },
    finish() {
      //游戏结束
      this.gameStatus = 2;
      this.time = 0;
      this.score += this.singleScore;
      this.init();
    },
  },
};
</script>
<style lang='scss' scoped>
.puzzleDom {
  width: 100%;
  min-height: 100vh;
  font-size: 12px;
  background: #de003b url("./../../assets/bg.png") center top / 100% auto
    no-repeat;
  padding-top: 104px;
  color: #ffffff;
  #myaudio {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    display: none;
  }
  .content {
    width: 291px;
    height: 291px;
    //background: #e5003d;
    box-shadow: 1px 2px 33px 0px rgba(0, 0, 0, 0.17);
    border-radius: 7px;
    margin: 0 auto;
    padding: 16px;
    position: relative;
    overflow: hidden;
    .score {
      width: 259px;
      height: 259px;
      position: absolute;
      top: 16px;
      left: 16px;
      border-radius: 7px;
      text-align: center;
      background: rgba($color: #000, $alpha: 0.5);
      padding-top: 35px;
      .title {
        font-size: 12px;
        margin-bottom: 35px;
      }
      .scoreNum {
        font-size: 88px;
        font-weight: 700;
      }
    }
    .item {
      flex-shrink: 1;
      background: #cd0037;
      overflow: hidden;
      .img {
        display: none;
      }
      img {
        width: 100%;
      }
      &.active {
        background: #c00034;
      }
    }
    .row {
      width: 100%;
      flex: 1 1;
      .col {
        flex: 1;
        height: 100%;
        background: #cd0037;
      }
      .col:nth-child(2n) {
        background: #c00034;
      }
    }
    .row:nth-child(2n) {
      .col {
        flex: 1;
        height: 100%;
        background: #c00034;
      }
      .col:nth-child(2n) {
        background: #cd0037;
      }
    }
  }
  .pic {
    margin-top: 20px;
    padding: 0 35px;
    .picList {
      &-item {
        width: 63px;
        height: 63px;
        background: #af002f;
        padding: 3px;
        margin-bottom: 10px;
        .img {
          width: 56px;
          height: 56px;
          font-size: 12px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
.dragClass {
  border: 4px solid rgba($color: #ffffff, $alpha: 0.5);
  border-radius: 4px;
  //transform: scale(1.5);
  img {
    opacity: 0.5;
  }
}
.ready {
  .beginBtn {
    width: 263px;
    height: 59px;
    border-radius: 30px;
    border: 3px solid #fee101;
    font-size: 20px;
    text-align: center;
    overflow: hidden;
    margin: 55px auto 38px;
    .inner {
      height: 100%;
      background-image: linear-gradient(#fee101, #ff9000);
      border: 2px solid #b70130;
      border-radius: 30px;
      line-height: 45px;
    }
  }
  .rule {
    font-size: 12px;
    text-align: center;
    .title {
      font-size: 16px;
      margin-bottom: 16px;
    }
  }
}

.begin {
  margin-top: 22px;
  .time {
    /deep/ .van-count-down {
      color: #ffffff;
      text-align: center;
      font-size: 22px;
      letter-spacing: 8px;
    }
  }
  .picname {
    font-size: 14px;
    text-align: center;
  }
  .stepResult {
    text-align: center;
    font-size: 18px;
    margin-top: 32px;
    position: relative;
    &-item {
      position: absolute;
      width: 100%;
      top: 0;
      animation-name: fadeOutDown;
      animation-duration: 0.5s;
      animation-timing-function: linear;
      animation-delay: 0.8s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-direction: alternate;
      .bounceIn {
        animation-name: bounceIn;
        animation-duration: 0.5s;
        animation-timing-function: linear;
        animation-delay: 0;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-direction: normal;
      }
    }
  }
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }

    to {
      transform: scale3d(1, 1, 1);
    }
  }
  @keyframes fadeOutDown {
    0% {
      opacity: 1;
    }

    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
  }
}
</style>