import './css/styles.css';
import { fetchCountries } from './fetchCountries'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchCountry = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
const DEBOUNCE_DELAY = 300;

searchCountry.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY))

function onSearch(e) {
    e.preventDefault();
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';


    const searchField = e.target.value;
    if (searchField.trim() === '') {
    showNotification('failure', `Please, enter country name! The field is empty!`);
    return;
  }
    
    fetchCountries(searchField)
        .then(country => {
            if (country.length === 1) {
            countryMarkup(country);
                showNotification('success', `Look what we've found for you!`);
        return;
            };
            if (country.length >= 2 && country.length <= 10) {
        severalCountriesMarkup(country);
        showNotification('success', `We've found several options for you!`);
        return;
      }
        showNotification('warning', `Too many matches found. Please enter a more specific name.`);
        })
        .catch(error => {
      showNotification('failure', `Oops, there is no country with that name`);
    });
}

function countryMarkup(country) {
  const markup = country
    .map(({ flags: { svg }, name: { official }, capital, population, languages }) => {
      return `<li class="card-item">
            <p class="card-position">
            <img src=${svg} width=200px alt=flag class="card-flag"><br>
            ${official}</p>
            <p class="card-other">Capital: <span class="card-value">${capital}</span></p>
            <p class="card-other">Population: <span class="card-value">${population}</span></p>
            <p class="card-other">Languages: <span class="card-value">${Object.values(languages)}</span></p>
        </li>`;
    })
    .join('');
    countryInfo.innerHTML = markup;
    
}

function severalCountriesMarkup(country) {
  const markup = country
    .map(({ name: { official }, flags: { svg } }) => {
      return `<li class="list-item">
            <p class='list-position'>
            <img src=${svg} width=50px alt=${official} class="list-flag">
            ${official}</p>
        </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}


function showNotification(type, message) {
  Notiflix.Notify[type](message);
}