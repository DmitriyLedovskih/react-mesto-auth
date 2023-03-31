import React from "react";
import successIcon from "../images/check-icon.svg";
import errorIcon from "../images/error-icon.svg";

function InfoTooltip({ isOpen, onClose, onCloseOverlay, isSuccess }) {
  return (
    <div
      className={`popup popup_type_info ${isOpen ? "popup_opened" : ""}`}
      onClick={onCloseOverlay}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img
          src={isSuccess ? successIcon : errorIcon}
          alt=""
          className="popup__container-icon"
        />
        <h2 className="popup__title popup__title_theme_dark popup__title-bottom">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
