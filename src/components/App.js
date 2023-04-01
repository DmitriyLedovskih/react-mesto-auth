import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/auth";
import ProctectedRouteElement from "./ProctectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isimagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [formRegisterValue, setFormRegisterValue] = React.useState({
    email: "",
    password: "",
  });
  const [formLoginValue, setFormLoginValue] = React.useState({
    email: "",
    password: "",
  });
  const [isSuccess, setIsSuccess] = React.useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleTokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            handleLogin();
            setUserEmail(res.email);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function signOut() {
    localStorage.removeItem("token");
    navigate("/sign-in");
    setLoggedIn(false);
  }

  function handleRegisterSubmit(evt) {
    evt.preventDefault();
    auth
      .register(formRegisterValue.email, formRegisterValue.password)
      .then((res) => {
        navigate("/sign-in");
        setFormRegisterValue({ email: "", password: "" });
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => setIsInfoPopupOpen(true));
  }

  function handleLoginSubmit(evt) {
    evt.preventDefault();
    auth
      .login(formLoginValue.email, formLoginValue.password)
      .then((res) => {
        if (res.token) {
          setFormLoginValue({ email: "", password: "" });
          setUserEmail(formLoginValue.email);
          handleLogin();
          navigate("/");
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoPopupOpen(true);
        console.log(err);
      });
  }

  function infoApi() {
    api
      .getProfileInfo()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getInitialCards()
      .then((result) => {
        setCards(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      infoApi();
    }
  }, [loggedIn]);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard({});
  }

  function closeByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  const isOpen =
    isEditProfilePopupOpen ||
    isAddPopupOpen ||
    isAvatarPopupOpen ||
    isimagePopupOpen ||
    isDeletePopupOpen ||
    isInfoPopupOpen;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPopupOpen);
  }

  function handleDeletePlaceClick(card) {
    setIsDeletePopupOpen(!isDeletePopupOpen);
    setSelectedCard(card);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(!isimagePopupOpen);
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .profileEdit(data)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editAvatar(data)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((result) => {
        setCards([result, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .handleLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }
  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} userEmail={userEmail} onSignOut={signOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProctectedRouteElement
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onDeletePlace={handleDeletePlaceClick}
                onImage={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                onRegister={handleRegisterSubmit}
                formRegisterValue={formRegisterValue}
                setFormRegisterValue={setFormRegisterValue}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                onLogin={handleLoginSubmit}
                formLoginValue={formLoginValue}
                setFormLoginValue={setFormLoginValue}
              />
            }
          />
        </Routes>
        <Footer />
        <EditAvatarPopup
          isLoading={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isAvatarPopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={closeByOverlay}
        />
        <EditProfilePopup
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={closeByOverlay}
        />
        <AddPlacePopup
          isLoading={isLoading}
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={closeByOverlay}
        />
        <DeletePlacePopup
          isLoading={isLoading}
          onDeletePlace={handleDeletePlaceClick}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={closeByOverlay}
          onCardDelete={handleCardDelete}
          card={selectedCard}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isimagePopupOpen}
          onCloseOverlay={closeByOverlay}
        />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoPopupOpen}
          onCloseOverlay={closeByOverlay}
          isSuccess={isSuccess}
          successText="Вы успешно зарегистрировались!"
          unSuccessText="Что-то пошло не так! Попробуйте ещё раз."
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
