export const state = {
  results: [],
  result: "",
  menuOpened: false,
  mode: "light",

  filter: {
    country: "",
    region: "",
    countriesByRegion: [],
  },
};

export const switchMode = function () {
  state.mode === "light" ? (state.mode = "dark") : (state.mode = "light");

  document.documentElement.setAttribute("data-mode", state.mode);
};

export const updateCountry = function (capital) {
  state.result = state.results.find((country) => {
    return country.capital?.[0] === capital;
  });
};

export const loadCountry = function (country) {
  return state.results.find((c) => c.name.common === country);
};

export const findCountryByName = function (query) {
  state.filter.country = query;

  return state.results.find(
    (country) => country.name.common.toLowerCase() === state.filter.country
  );
};

export const findCountriesByRegion = function (query) {
  state.filter.region = query;

  state.filter.countriesByRegion = state.results.filter(
    (country) => country.region === state.filter.region
  );
};

export const loadAllResults = async function () {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();

  state.results = data;
};
