class selectView {
  _parentElement = document.querySelector(".select-menu");

  _addHandlerFilterByRegion(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();

      const option = e.target.closest(".select-menu__item");
      if (!option) return;

      handler(option.textContent.trim());

      option.closest(".main__form--select").firstChild.textContent =
        option.textContent;
    });
  }
}

export default new selectView();
