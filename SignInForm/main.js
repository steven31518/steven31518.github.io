// function登入成功與否
function setFormMessage(formElement, type, message) {
  const messegeElement = formElement.querySelector(".form__message");
  messegeElement.textContent = message;
  messegeElement.classList.remove(
    "form__message--success",
    "form__message--error"
  );
  messegeElement.classList.add(`form__message--${type}`);
}

//function-驗證後的錯誤訊息
function setInputError(inputElement, message) {
  inputElement.classList.add("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input--error--message"
  ).textContent = message;
}
//function-移除錯誤訊息
function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error");
  inputElement.parentElement.querySelector(
    ".form__input--error--message"
  ).textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");

  document
    .querySelector("#linkCreateAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      createAccountForm.classList.remove("form--hidden");
    });

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
  });

  //登入判斷
  loginForm.addEventListener("submit", (e) => {
    console.dir(e.target.children[2].children[0]);
    if (
      e.target.children[2].children[0].value == "" ||
      e.target.children[3].children[0].value == ""
    ) {
      e.preventDefault();
      setFormMessage(loginForm, "error", "Please enter your Account/password");
    } else if (
      e.target.children[2].children[0].value.length > 0 &&
      e.target.children[3].children[0].value.length
    ) {
      e.preventDefault();
      setFormMessage(
        loginForm,
        "error",
        "Invalid username/password combination"
      );
    }
    // e.preventDefault();
    // //perform your AjAX/fetch login
    // setFormMessage(loginForm, "error", "Invalid username/password combination");
  });
  document.querySelectorAll(".form__input").forEach((inputElement) => {
    inputElement.addEventListener("blur", (e) => {
      if (
        e.target.id === "signupUsername" &&
        e.target.value.length >= 0 &&
        e.target.value.length < 8
      ) {
        setInputError(
          inputElement,
          "Username must be at least 8 characters in length"
        );
      }
      var passwordRegxp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      var emailRegxp =
        /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      if (
        e.target.id === "userEmail" &&
        emailRegxp.test(e.target.value) != true
      ) {
        setInputError(inputElement, "Email is invaild");
      }
      //至少 8 個字元且至少有以下四個內容的其中三個:小寫字母、大寫字母、數字、特殊符號

      if (
        e.target.id === "userPassword" &&
        passwordRegxp.test(e.target.value) != true
      ) {
        setInputError(
          inputElement,
          "Password must be at least 8 characters in length and also contains uppercase、lowercase、number"
        );
      }

      if (
        e.target.id === "confirmPassword" &&
        e.target.value !==
          e.target.parentElement.parentElement.children[4].children[0].value
      ) {
        setInputError(inputElement, "Please check your password again");
      }
    });
    inputElement.addEventListener("input", (e) => {
      clearInputError(inputElement);
    });
  });
});
