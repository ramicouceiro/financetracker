const yourMoney = document.querySelector(".your-money");
const yourExpenses = document.querySelector(".your-expenses");
const yourIncome = document.querySelector(".your-income");

let money = 0;
let expenses = 0;
let income = 0;
let usdt = 0;

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

const fetchDolar = async () => {
  const response = await fetch(
    "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
  );
  const data = await response.json();
  const precioDolar = data[1].casa.compra;

  const dolarHtml = document.querySelector(".usd-price");

  dolarHtml.innerHTML = `${precioDolar}`;

  return precioDolar;
};

// Crear modal
const renderModal = (type) => {
  if (type === "income") {
    return `
        <span class="material-icons" id="close-modal-btn">close</span>
        <h1>Añadir Ingreso</h1>
        <form class="modal-form">
          <input type="number" class="modal-input"/>
          <input type="submit" value="Añadir Ingreso" id="add-${type}-btn">
        </form>
  `;
  } else if (type === "expenses") {
    return `
        <span class="material-icons" id="close-modal-btn">close</span>
        <h1>Añadir Gasto</h1>
        <form class="modal-form">
          <input type="number" class="modal-input"/>
          <input type="submit" value="Añadir Gasto" id="add-${type}-btn">
        </form>
  `;
  } else if (type === "usdt") {
    return `
        <span class="material-icons" id="close-modal-btn">close</span>
        <h1>Añadir USDT</h1>
        <div class="modal-select">
        <select name="usdt" id="usdt-select">
          <option value="income">Ingreso</option>
          <option value="expenses">Gasto</option>
        </select>
        </div>
        <form class="modal-form">
          <input type="number" class="modal-input"/>
          <input type="submit" value="Añadir USDT" id="add-${type}-btn">
        </form>
  `;
  }
};

// Abrir modal
const openModal = (type) => {
  const modal = document.createElement("div");
  modal.classList.add(`${type}-modal`);
  modal.classList.add("modal");
  modal.classList.add("open");

  modal.innerHTML = renderModal(type);
  const body = document.querySelector("body");
  body.appendChild(modal);
  document.createElement("div").classList.toggle("blur");
  const closeModalBtn = document.getElementById("close-modal-btn");

  closeModalBtn.addEventListener("click", () => {
    closeModal();
  });

  if (type === "usdt") {
    const addUsdtBtn = document.getElementById("add-usdt-btn");

    addUsdtBtn.addEventListener("click", (e) => {
      createUsdt(e);
    });
  } else if (type === "income") {
    const addIncomeBtn = document.getElementById("add-income-btn");

    addIncomeBtn.addEventListener("click", (e) => {
      createIncome(e);
    });
  } else if (type === "expenses") {
    const addExpensesBtn = document.getElementById("add-expenses-btn");

    addExpensesBtn.addEventListener("click", (e) => {
      createExpenses(e);
    });
  }
};

const closeModal = () => {
  const modal = document.querySelector(".modal.open");
  modal.remove();
};

// Botones
const usdtBtn = document.querySelector(".usdt-btn");
const expensesBtn = document.querySelectorAll(".create-expenses-btn");
const incomeBtn = document.querySelectorAll(".create-income-btn");

const addIncome = (amount) => {
  income += amount;
  yourIncome.innerHTML = `$${parseInt(income)}`;
  money += amount;
  yourMoney.innerHTML = `$${parseInt(money)}`;
};

const createIncome = (e) => {
  e.preventDefault();
  const amount = e.target.previousElementSibling.value;
  addIncome(parseInt(amount));
  closeModal();
};

const addExpenses = (amount) => {
  expenses += amount;
  yourExpenses.innerHTML = `$${parseInt(expenses)}`;
  money -= amount;
  yourMoney.innerHTML = `$${parseInt(money)}`;
};

const createExpenses = (e) => {
  e.preventDefault();
  const amount = e.target.previousElementSibling.value;
  addExpenses(parseInt(amount));
  closeModal();
};
const yourUsdt = document.querySelector(".your-usdt");
const usdtArs = document.querySelector(".your-usdt-in-ars");
const dolarHtml = document.querySelector(".usd-price");
const addUsdt = (amount) => {
  const select = document.getElementById("usdt-select");
  const type = select.value;
  if (type === "income") {
    usdt += parseInt(amount);
    usdtArs.innerHTML = `ARS$${parseInt(usdt) * parseInt(dolarHtml.innerHTML)}`;
    yourUsdt.innerHTML = `$${parseInt(usdt)}`;
    income += amount * parseInt(dolarHtml.innerHTML);
    yourIncome.innerHTML = `$${parseInt(income)}`;
    money += amount * parseInt(dolarHtml.innerHTML);
    yourMoney.innerHTML = `$${parseInt(money)}`;
  } else if (type === "expenses") {
    usdt -= parseInt(amount);
    usdtArs.innerHTML = `ARS$${parseInt(usdt) * parseInt(dolarHtml.innerHTML)}`;
    yourUsdt.innerHTML = `$${parseInt(usdt)}`;
    expenses += amount * parseInt(dolarHtml.innerHTML);
    yourExpenses.innerHTML = `$${parseInt(expenses)}`;
    money -= amount * parseInt(dolarHtml.innerHTML);
    yourMoney.innerHTML = `$${parseInt(money)}`;
  }
};

const createUsdt = (e) => {
  e.preventDefault();
  const amount = e.target.previousElementSibling.value;
  addUsdt(amount);
  closeModal();
};
const init = () => {
  incomeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal("income");
    });
  });
  expensesBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal("expenses");
    });
  });
  usdtBtn.addEventListener("click", () => {
    openModal("usdt");
  });
  fetchDolar();
};

init();
