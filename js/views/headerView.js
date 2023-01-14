class headerView {
  _parentElement = document.querySelector(".header");

  _addHandlerSwitchMode(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const button = e.target.closest(".header__nav--mode");

      if (!button) return;

      handler();
    });
  }
}

export default new headerView();
