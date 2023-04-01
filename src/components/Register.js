import React from "react";
import { Link } from "react-router-dom";

function Register({ formRegisterValue, setFormRegisterValue, onRegister }) {
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormRegisterValue({
      ...formRegisterValue,
      [name]: value,
    });
  }

  return (
    <div className="auth-page">
      <h1 className="auth-page__title main-title main-title_theme_light main-title__top">
        Регистрация
      </h1>
      <form className="main-form auth-page__form" onSubmit={onRegister}>
        <label className="main-form__field">
          <input
            type="email"
            className="main-form__input main-form__input_theme_light"
            name="email"
            placeholder="Email"
            required
            id="input-email"
            onChange={handleChange}
            value={formRegisterValue.email}
          />
          <span className="main-form__error input-email-error"></span>
        </label>
        <label className="main-form__field">
          <input
            type="password"
            className="main-form__input main-form__input_theme_light"
            name="password"
            placeholder="Пароль"
            required
            id="input-password"
            onChange={handleChange}
            value={formRegisterValue.password}
          />
          <span className="main-form__error input-password-error"></span>
        </label>
        <button className="main-form__button main-form__button_theme_light">
          Зарегистрироватся
        </button>
      </form>
      <p className="auth-page__text">
        Уже зарегистрироны?
        <Link className="auth-page__link" to="/sign-in">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
