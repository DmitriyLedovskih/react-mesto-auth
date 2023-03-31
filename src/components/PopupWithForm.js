import React from "react";

function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  buttonText,
  children,
  onSubmit,
  onCloseOverlay,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={onCloseOverlay}
    >
      <div className="popup__container">
        <h2 className="main-title main-title_theme_dark main-title__top">
          {title}
        </h2>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <form className="main-form" name={`form-${name}`} onSubmit={onSubmit}>
          {children}
          <button
            className="main-form__button main-form__button_theme_dark"
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
