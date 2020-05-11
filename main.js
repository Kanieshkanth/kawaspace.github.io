// Global Variables
const countriesList = document.getElementById("countries");
let countries; // will contain "fetched" data

// Event Listeners
// countriesList.addEventListener("change", event => displayCountryInfo(event.target.value));

countriesList.addEventListener("change", newCountrySelection);

function newCountrySelection(event) {
  displayCountryInfo(event.target.value);
}

fetch("https://restcountries.eu/rest/v2/all")
.then(res => res.json())
.then(data => initialize(data))
.catch(err => console.log("Error:", err));

function initialize(countriesData) {
  countries = countriesData;
  let options = "";
  countries.forEach(country => options+=`<option value="${country.name}"></option>`);
  countriesList.innerHTML = options;
}

function sub(){
  let crt = document.getElementById("ct").value;
  displayCountryInfo(crt);
}

function displayCountryInfo(ctname) {
  const countryData = countries.find(country => country.name === ctname);
  document.querySelector("#flag-container img").src = countryData.flag;
  document.querySelector("#flag-container img").alt = `Flag of ${countryData.name}`;  
  document.getElementById("capital").innerHTML = countryData.capital;
  document.getElementById("dialing-code").innerHTML = `+${countryData.callingCodes[0]}`;
  document.getElementById("population").innerHTML = countryData.population.toLocaleString("en-US");
  document.getElementById("currencies").innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name} (${c.code})`).join(", ");
  document.getElementById("region").innerHTML = countryData.region;
  document.getElementById("timezones").innerHTML = countryData.timezones;
}

$("#b1").click(function(){
  if ($("#ct").val().length === 0) {
    alert("Please fill the input field");
  }
  else{
    $("#flag-container").show();
    $("#blog-container").show();
    $("#h1").hide();
  }
})
