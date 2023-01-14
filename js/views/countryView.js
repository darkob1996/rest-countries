class countryView {
  _data;
  _parentElement = document.querySelector(".main");

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
      <div class="country">
        <a href="#" class="country__back-btn">&larr; Back</a>

        <div class="country__info">
            <img
                src="${this._data.result.flags.png}"
                alt="Country flag"
                class="country__info--img"
            />

            <div class="country__info--container">
            <h1 class="country__info--heading"> ${
              this._data.result.name.common
            }</h1>

            <div class="country__info--details">
                <p class="country__info--paragraph">
                Native name:
                <span>${
                  this._data.result.name.nativeName[
                    Object.keys(this._data.result.name.nativeName)[0]
                  ].common
                }</span>
                </p>

                <p class="country__info--paragraph">
                Top level domain:
                <span>${this._data.result.tld}</span>
                </p>

                <p class="country__info--paragraph">
                Population:
                <span>${this._fraction(this._data.result.population)}</span>
                </p>

                <p class="country__info--paragraph">
                Currencies:
                <span>${
                  this._data.result.currencies[
                    Object.keys(this._data.result.currencies)[0]
                  ].name
                }</span>
                </p>

                <p class="country__info--paragraph">
                Region:
                <span>${this._data.result.region}</span>
                </p>

                <p class="country__info--paragraph">
                Languages:
                <span>${Object.keys(this._data.result.languages)
                  .map((lang) => this._data.result.languages[lang])
                  .join(", ")}</span>
                </p>

                <p class="country__info--paragraph">
                Sub Region:
                <span>${this._data.result.subregion}</span>
                </p>

                <p class="country__info--paragraph">
                Capital:
                <span>${this._data.result.capital.join(", ")}</span>
                </p>
            </div>

            <div class="country__info--borders">
                <span class="country__info--subheading">Border countries:</span>
                <div>
                 ${this._data.results
                   .filter((country) => {
                     return this._data.result.borders?.includes(country.cca3);
                   })
                   .map((country) => {
                     return `
                        <span class="country__info--border">${country.name.common}</span>
                     `;
                   })
                   .join("")}
               </div>
            </div>
            </div>
        </div>
      </div>
    `;
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _render(data) {
    this._data = data;

    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this.goToHomePage();
  }

  _addHandlerCountry(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();

      const country = e.target.closest(".card");
      if (!country) return;

      const capital = country.querySelector(
        ".card__capital--number"
      ).textContent;

      handler(capital);
    });
  }

  goToHomePage() {
    document
      .querySelector(".country__back-btn")
      .addEventListener("click", function () {
        location.reload();
      });
  }
}

export default new countryView();
