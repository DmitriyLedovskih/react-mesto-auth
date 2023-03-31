import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content page__content">
      <section className="profile content__section">
        <div className="profile__container">
          <button
            className="profile__avatar-button"
            type="button"
            onClick={props.onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              alt="Аватарка профиля"
              className="profile__avatar"
            />
          </button>
          <div className="profile__info">
            <div className="profile__row">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="cards" aria-label="Интересные места">
        {props.cards.map((card) => (
          <Card
            card={card}
            onCardClick={props.onImage}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            onDeletePlace={props.onDeletePlace}
            key={card._id}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
