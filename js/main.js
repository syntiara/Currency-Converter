const Api_Link_Conversion = `${API_LINK_CONVERSION}`;
const Api_Link_Dropdown = `${API_LINK_DROPDOWN}`;
const Api_Key = `${API_KEY}`;

const selectors = {
  from: 'currFrom',
  to: 'currTo',
  input: 'inputCurr',
  output: 'outputCurr'
};

document.getElementById('inputCurr').value;

const dropdownOne = document.getElementById(selectors.from);
const dropdownTwo = document.getElementById(selectors.to);
const input = document.getElementById(selectors.input);
const output = document.getElementById(selectors.output);

// UI code
document.addEventListener('DOMContentLoaded', async () => {
  const rates = await fetchSymbols();


  showDropdown(dropdownOne, rates);
  showDropdown(dropdownTwo, rates);

  input.addEventListener('keyup', e => {
    e.preventDefault();
    convertCurrencies();
  });

  dropdownOne.addEventListener('change', e => {
    convertCurrencies();
  });

  dropdownTwo.addEventListener('change', e => {
    convertCurrencies();
  });

});

// ui functions
async function convertCurrencies() {
  try {
    let from = dropdownOne.value;
    let to = dropdownTwo.value;
    let amt = Number(input.value)

    const currRates = await fetchCurrencies(from, to);
    const currValues = currRates[to]/currRates[from];
    const converted = (currValues * amt).toFixed(2);
    if (!isNaN(converted)) {
      output.innerText = `${converted} ${(to === "Target Currency (ex. EUR)") ? "" : to}`
    } else {
    output.innerText = "Please select target currency";
    }
  }
  catch{
    output.innerText = "Please select target & base currency";
  }

}

async function fetchCurrencies(from, to) {
  output.innerText = "loading";
  const curr = await fetch(
    `${Api_Link_Conversion}${Api_Key}&symbols=${from},${to}`
  );
  const { rates } = await curr.json();
  return rates;
}

async function fetchSymbols() {
  const curr = await fetch(`${Api_Link_Dropdown}${Api_Key}`);
  const { symbols } = await curr.json();
  console.log(symbols);
  return symbols;
}

function showDropdown(selector, rates) {
  for (let key in rates) {
    option = document.createElement('option');
    option.text = `${key} (${rates[key]})`;
    option.value = key;
    selector.add(option);
  }
}

