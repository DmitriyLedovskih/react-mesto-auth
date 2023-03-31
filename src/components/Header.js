import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ loggedIn, userEmail, setLoggedIn }) {
  const [isVisible, setIsVisible] = React.useState(false);
  function onClickBurger() {
    setIsVisible(!isVisible);
  }
  console.log(userEmail);
  const navigate = useNavigate();
  function signOut() {
    localStorage.removeItem("token");
    navigate("/sign-in");
    setLoggedIn(false);
  }

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Логотип Место" className="header__logo" />
      </Link>
      {!loggedIn ? (
        window.location.pathname === "/sign-in" ? (
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        ) : (
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        )
      ) : (
        <>
          <button
            className={`burger ${isVisible ? "burger_active" : ""}`}
            type="button"
            onClick={onClickBurger}
          >
            <span
              className={`burger__line ${
                isVisible ? "burger__line_active" : ""
              }`}
            ></span>
          </button>
          <div
            className={`header__user ${isVisible ? "header__user_active" : ""}`}
          >
            <span className="header__link">{userEmail}</span>
            <span
              onClick={signOut}
              className="header__link header__link-signOut"
            >
              Выйти
            </span>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
