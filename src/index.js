import './css/styles.css';
import API from './fetchCountries'

const searchCountry = document.querySelector("#search-box");

searchCountry.addEventListener("input", onSearch)

const DEBOUNCE_DELAY = 300;

function onSearch(e) {
    e.preventDefault();

    const search = e.currentTarget.elements.value;
    console.log(search);

    API.fetchCountries(search).then(console.log('ok'))
}