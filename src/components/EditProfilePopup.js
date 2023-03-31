import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      onCloseOverlay={props.onCloseOverlay}
    >
      <label className="main-form__field">
        <input
          type="text"
          onChange={handleNameChange}
          value={name || ""}
          className="main-form__input main-form__input_theme_dark"
          name="name"
          placeholder="Ваше имя"
          required
          id="input-name"
        />
        <span className="main-form__error input-name-error"></span>
      </label>
      <label className="main-form__field">
        <input
          type="text"
          onChange={handleDescriptionChange}
          value={description || ""}
          className="main-form__input main-form__input_theme_dark"
          name="about"
          placeholder="О себе"
          required
          id="input-description"
        />
        <span className="main-form__error input-description-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
