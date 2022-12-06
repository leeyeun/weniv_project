import drink from "./drink.js";
// console.log(cola[0]);

// let colaData = [
//   {
//     colaName: "Original_Cola",
//     price: 1000,
//     count: 10,
//     sellcount: 1,
//   },
//   {
//     colaName: "Violet_Cola",
//     price: 1000,
//     count: 9,
//     sellcount: 1,
//   },
//   {
//     colaName: "Yellow_Cola",
//     price: 1000,
//     count: 8,
//     sellcount: 1,
//   },
//   {
//     colaName: "Cool_Cola",
//     price: 1000,
//     count: 7,
//     sellcount: 1,
//   },
//   {
//     colaName: "Green_Cola",
//     price: 1000,
//     count: 6,
//     sellcount: 1,
//   },
//   {
//     colaName: "Orange_Cola",
//     price: 1000,
//     count: 5,
//     sellcount: 1,
//   },
// ];

const myMoney = document.querySelector(".txt-mymoney"); //가지고 있는 소지금
const listInput = document.querySelector(".list-input"); //입금액 입력
// const colaName = document.querySelectorAll(".cola-name");
const listColaItemUl = document.querySelector(".list-item-staged"); //음료 버튼 클릭시 ul
const depositBtn = document.querySelector(".list-btn.deposit"); //입금버튼
const returnBtn = document.querySelector(".list-btn.return"); //거스름돈 반환 버튼
const getBtn = document.querySelector(".btn-submit"); //획득 버튼
const balance = document.querySelector(".txt-balance"); //잔액
const total = document.querySelector("sumPrice"); //총금액 버튼

const machineDrinkList = document.querySelectorAll(".list-ul li"); //음료

let userMoney = 50000; //초기 소지금

let countMoney = 0; //현재잔액

let allMoney = 0; //총금액

//소지금
myMoney.innerText = userMoney;

//입금액
depositBtn.addEventListener("click", () => {
  let inpDeposit = parseInt(listInput.value); //입력하는 금액
  let check = /^[0-9]+$/; // 숫자인지 확인
  if (check.test(inpDeposit)) {
    countMoney += inpDeposit;
    userMoney -= inpDeposit; //소지금 변화

    listInput.value = ""; //input창에 남은 금액 없애기

    balance.innerText = countMoney;
    myMoney.innerText = userMoney;
  } else {
    alert("숫자를 입력하세요");
  }
});

//거스름돈 반환
returnBtn.addEventListener("click", () => {
  if (countMoney === 0) {
    alert("반환할 금액이 없습니다.");
    listInput.value = ""; //input창에 남은 금액 없애기
  } else {
    //거스름돈 소지금에 추가
    userMoney += countMoney;
    countMoney = 0;

    myMoney.innerText = userMoney;
    balance.innerText = countMoney;
  }
});

//콜라 버튼
machineDrinkList.forEach((drinkLi) => {
  drinkLi.addEventListener("click", (e) => {
    const name = e.currentTarget.dataset.drinkName;
    console.log("sellcount : ", drink[name].sellcount);
    if (countMoney < 1000) {
      alert("잔액이 부족합니다.");
      return;
    } else if (drink[name].count === 0) {
      alert("품절된 상품입니다.");
    } else {
      const cola_list = document.createElement("li");
      const cola_image = document.createElement("img");
      const cola_name = document.createElement("span");
      const cola_count = document.createElement("span");
      const colaUrl = `/vending-machine/images/${name}.svg`;
      if (drink[name].sellcount === 1) {
        cola_list.classList.add("cola-items");
        cola_list.setAttribute("data-name", name);
        cola_list.setAttribute("data-price", drink[name].price);
        cola_list.setAttribute("data-sellcount", drink[name].sellcount);
        cola_image.setAttribute("src", colaUrl);
        cola_image.setAttribute("alt", "오리지널 콜라");
        cola_name.classList.add("txt-item");
        cola_name.innerText = name;
        cola_count.classList.add("num-counter");
        cola_count.innerText = drink[name].sellcount;
        cola_list.appendChild(cola_image);
        cola_list.appendChild(cola_name);
        cola_list.appendChild(cola_count);

        listColaItemUl.appendChild(cola_list);
      } else if (drink[name].sellcount > 1) {
        console.log(drinkName);
        const countNum = document.querySelector(".num-counter");
        countNum.innerText = drink[name].sellcount;
      }
    }

    drink[name].sellcount++;
    console.log("count : ", drink[name].count);
    drink[name].count--;
    if (drink[name].count < 0) {
      drinkLi.childNodes[1].classList.add("sold-out");
      drink[name].count = 0;
    }
  });
});

//획득
getBtn.addEventListener("click", () => {
  console.log(listColaItemUl);
});
