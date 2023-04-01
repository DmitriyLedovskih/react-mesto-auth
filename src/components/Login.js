import React from "react";

function Login({ onLogin, formLoginValue, setFormLoginValue }) {
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormLoginValue({
      ...formLoginValue,
      [name]: value,
    });
  }

  return (
    <div className="auth-page">
      <h1 className="auth-page__title main-title main-title_theme_light main-title__top">
        Вход
      </h1>
      <form className="main-form auth-page__form" onSubmit={onLogin}>
        <label className="main-form__field">
          <input
            type="email"
            className="main-form__input main-form__input_theme_light"
            name="email"
            placeholder="Email"
            required
            id="input-email"
            onChange={handleChange}
            value={formLoginValue.email || ""}
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
            value={formLoginValue.password || ""}
          />
          <span className="main-form__error input-password-error"></span>
        </label>
        <button className="main-form__button main-form__button_theme_light">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
