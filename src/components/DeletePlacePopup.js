import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onCardDelete(props.card);
  }
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="delete"
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={props.isLoading ? "Удаляется..." : "Да"}
      onCloseOverlay={props.onCloseOverlay}
    ></PopupWithForm>
  );
}

export default DeletePlacePopup;
