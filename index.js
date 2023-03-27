const yourMoney = document.querySelector(".your-money");
const yourExpenses = document.querySelector(".your-expenses");
const yourIncome = document.querySelector(".your-income");

let money = 0;
let expenses = 0;
let income = 0;

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

  dolarHtml.innerHTML = `USD$1 = ARS$${precioDolar}`;
};
// Botones
const usdtBtn = document.querySelector(".usdt-btn");
const expensesBtn = document.querySelector(".create-expenses-btn");
const incomeBtn = document.querySelector(".create-income-btn");
const renderModal = (type) => {
  return `
        <span class="material-icons" id="close-modal-btn">close</span>
        <h1>Añadir ${type}</h1>
        <form class="modal-form">
          <input type="number" class="modal-input"/>
          <input type="submit" value="Añadir Ingreso" id="add-${type}-btn">
        </form>
  `;
};

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
};
const closeModal = () => {
  const modal = document.querySelector(".modal.open");
  modal.remove();
};

const init = () => {
  incomeBtn.addEventListener("click", () => {
    openModal("income");
  });
  expensesBtn.addEventListener("click", () => {
    openModal("usdt");
  });
  usdtBtn.addEventListener("click", () => {
    openModal("usdt");
  });
  fetchDolar();
};

init();
