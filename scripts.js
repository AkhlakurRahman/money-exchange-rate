const currencyElOne = document.getElementById('currency-one');
const amountElOne = document.getElementById('amount-one');
const currencyElTwo = document.getElementById('currency-two');
const amountElTwo = document.getElementById('amount-two');

const swapEl = document.getElementById('swap');
const rateEl = document.getElementById('rate');

async function fetchData() {
  const currencyOne = currencyElOne.value;
  const currencyTwo = currencyElTwo.value;

  const res = await fetch(
    `https://api.exchangeratesapi.io/latest?base=${currencyOne}`
  );
  const data = await res.json();
  const rate = data.rates[currencyTwo];

  rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
  amountElTwo.value = (amountElOne.value * rate).toFixed(2);
}

currencyElOne.addEventListener('change', fetchData);
amountElOne.addEventListener('input', fetchData);
currencyElTwo.addEventListener('change', fetchData);
amountElTwo.addEventListener('input', fetchData);

swapEl.addEventListener('click', () => {
  const temp = currencyElOne.value;
  currencyElOne.value = currencyElTwo.value;
  currencyElTwo.value = temp;

  fetchData();
});

fetchData();
