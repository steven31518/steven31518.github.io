let count = document.querySelector(".count");
count.addEventListener("click", (e) => {
  e.preventDefault();
  //往上找到父層，再找到子層裡的inputValue
  let content = e.target.parentElement.parentElement;
  let weight = content.querySelector(".weight");
  let height = content.querySelector(".height");
  let weightValue = weight.children[1].value;
  let heightValue = height.children[1].value;
  console.log(weightValue);
  console.log(heightValue);
  //判斷是否為空值、字串、符號、或異常值
  if (weightValue === "" || heightValue === "") {
    alert("請輸入值並面對事實(身高體重都要輸入喔!");
    return;
  } else if (isNaN(parseInt(weightValue)) || isNaN(parseInt(heightValue))) {
    alert("請輸入正確身高與體重,必須為阿拉伯數字");
    return;
  } else if (
    weightValue < 20 ||
    weightValue > 700 ||
    heightValue < 70 ||
    heightValue > 300
  ) {
    alert("來自星星的你，這計算機不適合你");
    return;
  } else {
    //確認數字資料，計算出bmi並取到小數點第二位
    weightValue = Number(weightValue);
    heightValue = Number(heightValue);
    let bmi = (weightValue / Math.pow(heightValue / 100, 2)).toFixed(2);
    console.log(bmi);
    //create object to show bmi and guide
    let userBmi = document.createElement("p");
    userBmi.classList.add("userBmi");
    userBmi.innerHTML = "計算後您的BMI為:" + " " + "<mark>" + bmi + "<mark>";
    let userGuide = document.createElement("p");
    userGuide.classList.add("userGuide");
    //按照使用者的狀況提供不同建議
    if (bmi < 18.5) {
      userGuide.innerHTML =
        "<i class='fa-solid fa-feather'></i>需要運動，均衡飲食<br/>，增加體能，維持健康";
    } else if (bmi >= 18.5 && bmi < 24) {
      userGuide.innerHTML =
        "<i class='fa-solid fa-hand-fist'></i>恭喜!健康體重，要繼續保持";
    } else if (bmi >= 24 && bmi < 27) {
      userGuide.innerHTML =
        "<i class='fa-solid fa-triangle-exclamation'></i>體重過重了，要小心!趕快去買健身環!";
    } else if (bmi >= 27 && bmi < 40) {
      userGuide.innerHTML =
        "<i class='fa-solid fa-trash-can'></i>結論只供參考，反正BMI又不準!";
    } else {
      userGuide.innerHTML =
        "<i class='fa-solid fa-skull'></i>非正常人類範圍的BMI!<br/>被你偷渡成功了外星人。";
    }

    let userHealth = document.createElement("div");

    userHealth.classList.add("userHealth");
    userHealth.appendChild(userBmi);
    userHealth.appendChild(userGuide);
    let section = document.querySelector("section");
    section.innerHTML = "";
    userHealth.style.animation = "scaleUp 0.5s forwards";
    section.appendChild(userHealth);
  }
});

let renew = document.querySelector(".renew");
renew.addEventListener("click", (e) => {
  let content = e.target.parentElement.parentElement;
  let weight = content.querySelector(".weight");
  let height = content.querySelector(".height");
  weight.children[1].value = "";
  height.children[1].value = "";
  let body = e.target.parentElement.parentElement.parentElement;
  let section = body.children[5];
  console.log(section);
  let userHealth = section.children[0];
  userHealth.addEventListener("animationend", () => {
    userHealth.remove();
  });
  userHealth.style.animation = "scaleDown 0.5s forwards";
});
