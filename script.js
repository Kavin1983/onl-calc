const calcBtns = document.querySelectorAll(".calculator__btn");
const calcScreen = document.querySelector(".calculator__screen");
const btnClear = document.querySelector(".btn-clear");
const btnDelete = document.querySelector(".btn-delete");
const btnEqual = document.querySelector(".btn-equal");
const btnDivide = document.querySelector(".btn-divide");
const btnPi = document.querySelector(".btn-pi");
const btnNegative = document.querySelector(".btn-negative");
const btnSquareRoot = document.querySelector(".btn-square-root");
const btnCarrot = document.querySelector(".btn-carrot");
const btnClose = document.querySelector(".close");
const modalBackground = document.querySelector(".bc");
const modal = document.querySelector(".info");
const btnInfo = document.querySelector(".btn-info");

function toggleModal() {
  modalBackground.classList.toggle("hidden");
  modal.classList.toggle("hidden");
}

btnClose.addEventListener("click", toggleModal);
btnInfo.addEventListener("click", toggleModal);

let screenValue = "";

let cursorPosition = 0;

function setTextToCurrentPos(value) {
  var curPos = document.getElementById("text1").selectionStart;
  cursorPosition = curPos;
  let x = $("#text1").val();
  let text_to_insert = value;
  $("#text1").val(x.slice(0, curPos) + text_to_insert + x.slice(curPos));
}

calcBtns.forEach((btn) => {
  if (
    btn != btnEqual &&
    btn != btnDivide &&
    btn != btnDelete &&
    btn != btnNegative &&
    btn != btnSquareRoot &&
    btn != btnCarrot
  ) {
    btn.addEventListener("click", (e) => {
      setTextToCurrentPos(btn.textContent);
      screenValue = calcScreen.value;
      calcScreen.focus();
      document.getElementById("text1").selectionStart = cursorPosition + 1;
    });
  }
});

btnClear.addEventListener("click", (e) => {
  calcScreen.value = "";
  screenValue = "";
  calcScreen.focus();
});

btnEqual.addEventListener("click", (e) => {
  try {
    screenValue = calcScreen.value;
    let evalEquation = calcScreen.value.replaceAll("π", `(${Math.PI})`);
    if (evalEquation.includes("(√")) {
      evalEquation = evalEquation.replaceAll("(√", "Math.sqrt(");
    }
    if (evalEquation.includes("^")) {
      evalEquation = evalEquation.replaceAll("^", "Math.pow");
    }

    if (evalEquation.includes("(")) {
      let newValue = evalEquation.split("");
      const indexes = Object.entries(evalEquation);
      console.log(evalEquation, "(");
      indexes.forEach((i) => {
        if (
          i[1] === "(" &&
          evalEquation[i[0] - 1] != "+" &&
          evalEquation[i[0] - 1] != "/" &&
          evalEquation[i[0] - 1] != "-" &&
          evalEquation[i[0] - 1] != "*" &&
          evalEquation[i[0] - 1] != "t" &&
          evalEquation[i[0] - 1] != "(" &&
          evalEquation[i[0] - 1] != "^" &&
          evalEquation[i[0] - 1] != "w" &&
          evalEquation[i[0] - 1] != "," &&
          evalEquation[i[0] - 1] != " " &&
          evalEquation[i[0] - 1]
        ) {
          newValue[i[0]] = "*(";
          evalEquation = newValue.join("");
        }
      });
    }

    if (evalEquation.includes(")")) {
      console.log(evalEquation, ")");
      let newValue = evalEquation.split("");
      const indexes = Object.entries(evalEquation);
      indexes.forEach((i) => {
        if (
          i[1] === ")" &&
          evalEquation[Number(i[0]) + 1] != "+" &&
          evalEquation[Number(i[0]) + 1] != "/" &&
          evalEquation[Number(i[0]) + 1] != "-" &&
          evalEquation[Number(i[0]) + 1] != "*" &&
          evalEquation[Number(i[0]) + 1] != "t" &&
          evalEquation[Number(i[0]) + 1] != ")" &&
          evalEquation[Number(i[0]) + 1] != "^" &&
          evalEquation[Number(i[0]) + 1] &&
          evalEquation[Number(i[0]) + 1] != " " &&
          evalEquation[Number(i[0]) + 1] != ","
        ) {
          newValue[i[0]] = ")*";
          console.log("y");
          evalEquation = newValue.join("");
        }
      });
    }

    if (evalEquation.includes("Math")) {
      let newValue = evalEquation.split("");
      const indexes = Object.entries(evalEquation);
      indexes.forEach((i) => {
        if (
          i[1] == "M" &&
          evalEquation[i[0] - 1] != "+" &&
          evalEquation[i[0] - 1] != "/" &&
          evalEquation[i[0] - 1] != "-" &&
          evalEquation[i[0] - 1] != "*" &&
          evalEquation[i[0] - 1] != "(" &&
          evalEquation[i[0] - 1] != "^" &&
          evalEquation[i[0] - 1] != "," &&
          evalEquation[i[0] - 1]
        ) {
          newValue[i[0]] = "*M";
          console.log(newValue);
          evalEquation = newValue.join("");
        }
      });
    }
    console.log(evalEquation);

    const a = Number(eval(evalEquation));
    console.log(a);
    if (isNaN(a)) {
      console.log("klsckdsjkdsjknsdjknjknjkdjdks");
      evalEquation = "-1*" + evalEquation.replaceAll(",", "*(-1),");
    }

    const evaluatedValue = new String(eval(evalEquation));
    const str = `\n\n   ${evaluatedValue.padEnd(40, "")}\n\n`;
    screenValue += str;
    calcScreen.value = screenValue;
    calcScreen.focus();
  } catch (err) {
    console.log(err);
    calcScreen.value = err;
  }

  calcScreen.scrollTop = calcScreen.scrollHeight;
});

btnDivide.addEventListener("click", (e) => {
  setTextToCurrentPos("/");
  screenValue = calcScreen.value;
  calcScreen.focus();
  document.getElementById("text1").selectionStart = cursorPosition + 1;
});

calcScreen.addEventListener("input", (e) => {
  if (e.data != null) {
    screenValue += e.data;
  }
});

btnDelete.addEventListener("click", (e) => {
  screenValue = calcScreen.value;
  screenValue = screenValue.slice(0, screenValue.length - 1);
  calcScreen.value = screenValue;
  calcScreen.focus();
});

btnNegative.addEventListener("click", (e) => {
  setTextToCurrentPos("-");
  screenValue = calcScreen.value;
  calcScreen.focus();
  document.getElementById("text1").selectionStart = cursorPosition + 1;
});

btnCarrot.addEventListener("click", (e) => {
  setTextToCurrentPos("^(,)");
  screenValue = calcScreen.value;
  calcScreen.focus();
  document.getElementById("text1").selectionStart = calcScreen.value.length - 2;
});

btnSquareRoot.addEventListener("click", (e) => {
  setTextToCurrentPos("(√)");
  screenValue = calcScreen.value;
  calcScreen.focus();

  document.getElementById("text1").selectionStart =
    screenValue.lastIndexOf("√") + 1;
});
