class resultsView {
  _data;
  _parentElement = document.querySelector(".main__content");

  _fraction(num) {
    const numReversed = num + "";

    return [...numReversed]
      .reverse()
      .reduce((acc, mov, i) => {
        if ((i + 1) % 3 === 0 && i + 1 !== numReversed.length) {
          acc.push(`,${mov}`);
          return acc;
        } else {
          acc.push(mov);
          return acc;
        }
      }, [])
      .reverse()
      .join("");
  }

  _generateMarkup() {
    return `
          ${this._data
            .map((country, i) => {
              return `
            <div class="card" data-num="${i}">
                <img src="${country.flags.png}" class="card__img" alt="${
                country.name.official
              } flag"/>
                <div class="card__content">
                    <h1 class="card__heading">${country.name.official}</h1>
                    <p class="card__paragraph card__population">
                        Population:
                        <span class="card__population--number">${this._fraction(
                          country.population
                        )}</span>
                    </p>

                    <p class="card__paragraph card__region">
                        Region:
                        <span class="card__region--number">${
                          country.region
                        }</span>
                    </p>

                    <p class="card__paragraph card__capital">
                        Capital:
                        <span class="card__capital--number">${
                          country.capital
                            ? `${country.capital[0]}`
                            : "No capital"
                        }</span>
                    </p>
                </div>
            </div>    
            `;
            })
            .join("")}
    `;
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _render(data) {
    Array.isArray(data) ? (this._data = data) : (this._data = [data]);

    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _addHandlerResults(handler) {
    window.addEventListener("load", handler);
  }
}

export default new resultsView();
