class formView {
  _parentElement = document.querySelector(".main__form");
  _menu = document.querySelector(".select-menu");

  _toggleMenu(opened) {
    opened
      ? this._menu.classList.remove("hidden")
      : this._menu.classList.add("hidden");
  }

  _addHandlerFilterByRegion(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".main__form--select");
      if (!btn) return;

      handler();
    });
  }

  _addHandlerFilterByCountry(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();

      const country = this.querySelector(".main__form--input").value;
      this.querySelector(".main__form--input").value = "";

      handler(country);
    });
  }
}

export default new formView();
