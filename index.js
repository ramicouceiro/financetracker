const yourMoney = document.querySelector(".your-money");
const yourExpenses = document.querySelector(".your-expenses");
const yourIncome = document.querySelector(".your-income");

let money = 0;
let expenses = 0;
let income = 0;

yourMoney.innerHTML = `$${money}`;
yourExpenses.innerHTML = `$${expenses}`;
yourIncome.innerHTML = `$${income}`;

const incomeBtn = document.querySelectorAll(".create-income-btn");
const closeIncomeBtn = document.getElementById("close-income-modal-btn");
const incomeModal = document.getElementById("income-modal");
const addInputBtn = document.getElementById("add-income-btn");

const openIncomeModal = () => {
  incomeModal.classList.toggle("open");
  document.querySelector(".container").classList.toggle("blur");
};

const expensesBtn = document.querySelectorAll(".create-expenses-btn");
const closeExpensesBtn = document.getElementById("close-expenses-modal-btn");
const expensesModal = document.getElementById("expenses-modal");
const addExpensesBtn = document.getElementById("add-expenses-btn");

const openExpensesModal = () => {
  expensesModal.classList.toggle("open");
  document.querySelector(".container").classList.toggle("blur");
};

const addIncome = () => {
  const incomeInput = document.querySelector(".income-input");
  const incomeValue = incomeInput.value;
  if (incomeValue === "") {
    return;
  } else {
    income += parseInt(incomeValue);
    money += parseInt(incomeValue);
    yourIncome.innerHTML = `$${income}`;
    yourMoney.innerHTML = `$${money}`;
    incomeInput.value = "";
  }
};

const addExpenses = () => {
  const expensesInput = document.querySelector(".expenses-input");
  const expensesValue = expensesInput.value;
  if (expensesValue === "") {
    return;
  } else {
    expenses += parseInt(expensesValue);
    money -= parseInt(expensesValue);
    yourExpenses.innerHTML = `$${expenses}`;
    yourMoney.innerHTML = `$${money}`;
    expensesInput.value = "";
  }
};

const modals = document.querySelectorAll(".modal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

modals.forEach((modal) => {
  observer.observe(modal);
});

const init = () => {
  incomeBtn.forEach((btn) => btn.addEventListener("click", openIncomeModal));
  expensesBtn.forEach((btn) =>
    btn.addEventListener("click", openExpensesModal)
  );
  closeIncomeBtn.addEventListener("click", openIncomeModal);
  closeExpensesBtn.addEventListener("click", openExpensesModal);
  addInputBtn.addEventListener("click", () => {
    addIncome();
    openIncomeModal();
  });
  addExpensesBtn.addEventListener("click", () => {
    addExpenses();
    openExpensesModal();
  });
  console.log(incomeBtn);
};

init();
