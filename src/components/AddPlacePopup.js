import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");

  React.useEffect(() => {
    setName("");
    setImage("");
  }, [props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleImageChange(e) {
    setImage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ name, link: image });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={props.isLoading ? "Создается..." : "Создать"}
      onCloseOverlay={props.onCloseOverlay}
    >
      <label className="main-form__field">
        <input
          type="text"
          onChange={handleNameChange}
          value={name || ""}
          className="main-form__input main-form__input_theme_dark"
          name="name"
          placeholder="Название"
          required
          id="input-title"
        />
        <span className="main-form__error input-title-error"></span>
      </label>
      <label className="main-form__field">
        <input
          type="url"
          onChange={handleImageChange}
          value={image || ""}
          className="main-form__input main-form__input_theme_dark"
          name="link"
          placeholder="Ссылка на картинку"
          required
          id="input-link"
        />
        <span className="main-form__error input-link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
