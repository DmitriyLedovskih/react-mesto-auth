import React from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../auth";

function Login({ handleLogin }) {
  const [formValue, setFormValue] = React.useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    auth.login(formValue.email, formValue.password).then((res) => {
      if (res.token) {
        setFormValue({ email: "", password: "" });
        handleLogin();
        navigate("/");
      }
    });
  }
  return (
    <div className="auth-page">
      <h1 className="auth-page__title main-title main-title_theme_light main-title__top">
        Вход
      </h1>
      <form className="main-form auth-page__form" onSubmit={handleSubmit}>
        <label className="main-form__field">
          <input
            type="email"
            className="main-form__input main-form__input_theme_light"
            name="email"
            placeholder="Email"
            required
            id="input-email"
            onChange={handleChange}
            value={formValue.email || ""}
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
            value={formValue.password || ""}
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
