import * as model from "./model";
import countryView from "./views/countryView";
import formView from "./views/formView";
import headerView from "./views/headerView";
import resultsView from "./views/resultsView";
import selectView from "./views/selectView";

const showCountry = function (capital) {
  model.updateCountry(capital);

  countryView._render(model.state);
};

const showResults = async function () {
  // 1. Load all results from Rest API
  await model.loadAllResults();

  // 2. Render all the results on page
  resultsView._render(model.state.results);
};

const toggleMenu = function () {
  // 1. Switch boolean in state
  model.state.menuOpened = !model.state.menuOpened;

  // 2.
  formView._toggleMenu(model.state.menuOpened);
};

const filterByCountry = function (query) {
  // 1. Search for a country in model
  const country = model.findCountryByName(query);

  resultsView._render(country);
};

const filterByRegion = function (query) {
  // 1. Update state by countries with query region
  model.findCountriesByRegion(query);

  // 2. Send that countries to resultsView for rendering
  resultsView._render(model.state.filter.countriesByRegion);
};

const switchMode = function () {
  // 1. Switch mode in state
  model.switchMode();
};

const init = function () {
  resultsView._addHandlerResults(showResults);
  countryView._addHandlerCountry(showCountry);
  formView._addHandlerFilterByRegion(toggleMenu);
  formView._addHandlerFilterByCountry(filterByCountry);
  selectView._addHandlerFilterByRegion(filterByRegion);
  headerView._addHandlerSwitchMode(switchMode);
};

init();
