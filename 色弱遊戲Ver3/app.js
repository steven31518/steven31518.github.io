//選取、命名會操作到的物件
const container = document.querySelector("#container");
const btnGroup = document.querySelector("#btns");
const startButton = document.querySelector(".start");
const scoresBox = document.querySelector(".scores");
const timeBoard = document.querySelector(".timeBoard");
const showBoard = document.querySelector("#showBoard");
const containerII = document.querySelector(".containerII");
const h1 = document.createElement("h1");
const img = document.createElement("img");
const p = document.createElement("p");
const stopButton = document.createElement("button");
const fragment = document.createDocumentFragment();
//各種數值:
let timer;
let scores = 0;
//遊戲時間，若改動，下方重新遊戲按鈕時間也要改
let time = 60;
let level = 1;
//用以計算內部Box的長與高
let side;
//用以計算內部Box的圓角
let radius;
let boxOpacity;
//開始按鈕
startButton.addEventListener("click", (e) => {
  containerII.remove();
  reset();
  container.classList.add("active");
  showBoard.style.animation = "scaleUp 0.5s forwards";
  showBoard.classList.add("active");
  //startButton啟動後，開啟計時器
  timer = setInterval(() => {
    time--;
    timeBoard.innerHTML = time + "s";
    //時間歸0後，開始結束流程，計算分數 對應評語
    if (time <= 0) {
      clearInterval(timer);
      container.innerHTML = "";
      container.style.justifyContent = "center";
      fragment.appendChild(h1);
      fragment.appendChild(p);
      fragment.appendChild(img);
      container.appendChild(fragment);
      h1.style.animation = "scaleUp 2s forwards";
      h1.innerHTML = "遊戲結束，得分為:" + scores + "分";
      img.classList.add("img1");
      img.style.animation = "opacity 3s forwards";
      //結束時的分數判斷
      if (scores === 0) {
        p.remove();
        img.src = "./img/tulOKJI.jpg";
        img.style.height = "300px";
      } else if (scores < 11 && scores > 0) {
        img.src = "./img/james-750x422.jpg";
        p.innerHTML =
          "你是LV" + scores + "獨眼龍:" + "但他只能看到紅色，你比他強多了";
      } else if (scores >= 11 && scores < 21) {
        img.src = "./img/1RQWb3-0.jpg";
        p.innerHTML =
          "你是LV" +
          scores +
          "波音達:" +
          "波音達有著不錯的專注力，能夠在各式的活動上都經常有極好的表現。";
      } else if (scores >= 21 && scores < 31) {
        img.src = "./img/20210210003505.jpg";
        p.innerHTML =
          "你是LV" +
          scores +
          "隼:" +
          "日行性猛禽的眼睛具備出色的視覺敏銳度─能明察秋毫。";
      } else if (scores >= 31 && scores < 99) {
        img.src = "./img/1.jpg";
        p.innerHTML =
          "你是LV" +
          scores +
          "鬼琢慶次-雀尾螳螂蝦:" +
          "太兇殘了，快、狠、準!。";
      }
      showBoard.style.animation = "opacity 0.5s forwards";
      showBoard.classList.remove("active");
      scores = 0;
      //遊戲時間
      time = 60;
      level = 1;
      stopButton.remove();
      //把startButton再度啟動，reStart功能
      startButton.style.display = "block";
      startButton.innerHTML = "重新開始";
      startButton.addEventListener("click", (e) => {
        startButton.innerHTML = "開始遊戲";
      });
    }
  }, 1000);
  startButton.style.display = "none";
  fragment.appendChild(stopButton);
  btnGroup.appendChild(fragment);
  stopButton.innerHTML = "暫停";
  stopButton.classList.add("pause");
  //暫停按鈕，取走答案
  stopButton.addEventListener("click", () => {
    clearInterval(timer);
    startButton.style.display = "block";
    startButton.innerHTML = "繼續遊戲";
    container.childNodes.forEach((box) => {
      box.classList.remove("answer");
    });
  });
});

//分數與level刷新功能
function reset() {
  scoresBox.innerHTML = scores;
  container.innerHTML = "";
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  //賦予公式使Box長高與圓角隨level變動而變動

  side = (500 - 15 * level) / (level + 1);
  radius = 30 * (1 / (level + 1));
  //增加難度
  boxOpacity = 1 - (level + 1) / 28;
  for (let i = 0; i < (level + 1) * (level + 1); i++) {
    //使用fragment增加生成效能
    const box = document.createElement("div");
    box.classList.add("box");
    box.style.backgroundColor = `rgb(${r},${g},${b})`;
    box.style.width = `${side}px`;
    box.style.height = `${side}px`;
    box.style.borderRadius = `${radius}px`;
    box.style.opacity = `${boxOpacity}`;
    fragment.appendChild(box);
    container.style.animation = "scaleUp 0.2s forwards";
    container.appendChild(fragment);
  }

  //設定一個變數，隨機產生盒子數量的隨機數字
  let boxGroup = document.querySelectorAll(".box");
  const randomNum = Math.floor(Math.random() * boxGroup.length);
  //如果index跟隨機數值一樣，加上屬性answer
  boxGroup.forEach((box, index) => {
    if (index == randomNum) {
      box.classList.add("answer");
    }
  });
  //每個按鈕個別監測點擊事件，如果有符合answer條件 則呼叫函式
  //遞迴
  boxGroup.forEach((box, index) => {
    box.addEventListener("click", () => {
      if (box.classList.contains("answer")) {
        scores = scores + 1;
        //判斷式丟進來預防暫停在啟動後，等級會增加的bug，點到答案才會加分觸發level++
        if (scores % 3 == 0) {
          if (level < 9) {
            level++;
          }
        }
        reset();
      } else if (!box.classList.contains("answer")) {
      }
    });
  });
  scoresBox.innerHTML = "得分:" + " " + scores;
}
