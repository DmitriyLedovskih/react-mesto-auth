import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ loggedIn, userEmail, onSignOut }) {
  const [isBurgerMenuVisible, setIsBurgerMenuVisible] = React.useState(false);
  function onClickBurger() {
    setIsBurgerMenuVisible(!isBurgerMenuVisible);
  }

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Логотип Место" className="header__logo" />
      </Link>
      <Routes>
        {!loggedIn ? (
          <>
            <Route
              path="/sign-up"
              element={
                <Link to="/sign-in" className="header__link">
                  Войти
                </Link>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Link to="/sign-up" className="header__link">
                  Регистрация
                </Link>
              }
            />
          </>
        ) : (
          <Route
            path="/"
            element={
              <>
                <button
                  className={`burger ${
                    isBurgerMenuVisible ? "burger_active" : ""
                  }`}
                  type="button"
                  onClick={onClickBurger}
                >
                  <span
                    className={`burger__line ${
                      isBurgerMenuVisible ? "burger__line_active" : ""
                    }`}
                  ></span>
                </button>
                <div
                  className={`header__user ${
                    isBurgerMenuVisible ? "header__user_active" : ""
                  }`}
                >
                  <span className="header__link">{userEmail}</span>
                  <span
                    onClick={onSignOut}
                    className="header__link header__link-signOut"
                  >
                    Выйти
                  </span>
                </div>
              </>
            }
          />
        )}
      </Routes>
    </header>
  );
}

export default Header;
