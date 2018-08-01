<template>
  <div class="about">
    <h2>Canvas+WebSocket+redis 事实视屏弹幕</h2>
    <div id="content">
      <canvas id="canvas"></canvas>
      <video src="/try/demo_source/movie.mp4" id="video" controls></video>
      <div>
        <input type="text" id="text">
        <button id="add">发送</button>
        <input type="color" id="color">
        <input type="range" id='range' max="40" min='20'>
      </div>
    </div>
  </div>
</template>

<script>
import CanvasBarrage from "@/libs/CanvasBarrage";
let $ = document.querySelector.bind(document);
export default {
  data() {
    return {
      list: [
        {
          value: "这是第一条弹幕",
          speed: 2,
          time: 7,
          color: "red",
          fontSize: 20
        },
        {
          value: "这是第二条弹幕",
          time: 3
        }
      ]
    };
  },
  mounted() {
    let canvas = $("#canvas");
    let video = $("#video");

    let socket = new WebSocket("ws://localhost:3000");
    let canvasBarrage;
    socket.onopen = function() {
      socket.onmessage = function(e) {
        console.log(e);
        let message = JSON.parse(e.data);

        if (message.type === "INIT") {
          canvasBarrage = new CanvasBarrage(canvas, video, {
            data: message.data
          });
        } else if (message.type === "ADD") {
          canvasBarrage.add(message.data);
        }
      };
    };

    video.addEventListener("play", function() {
      canvasBarrage.isPaused = false;
      canvasBarrage.render();
    });

    // 添加暂停事件
    // index.js
    video.addEventListener("pause", function() {
      canvasBarrage.isPaused = true;
    });
    // 添加弹幕
    $("#add").addEventListener("click", function() {
      let time = video.currentTime; // 发送弹幕的时间
      let value = $("#text").value; // 发送弹幕的文字
      let color = $("#color").value; // 发送弹幕文字的颜色
      let fontSize = $("#range").value; // 发送弹幕的字体大小
      let sendObj = { time, value, color, fontSize }; //发送弹幕的参数集合

      socket.send(JSON.stringify(sendObj));
    });

    // 拖动视屏，实现弹幕
    video.addEventListener("seeked", function() {
      canvasBarrage.reset();
    });
  }
};
</script>


<style lang="less" scoped>
#cantainer {
  text-align: center;
}
#content {
  width: 640px;
  margin: 0 auto;
  position: relative;
}
#canvas {
  position: absolute;
}
video {
  width: 640px;
  height: 360px;
}
input {
  vertical-align: middle;
}
</style>
