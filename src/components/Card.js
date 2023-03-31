import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onDeletePlace(props.card);
  }

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(
    (owner) => owner._id === currentUser._id
  );

  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;
  return (
    <article className="card">
      <img
        src={props.card.link}
        alt={props.card.name}
        className="card__image"
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="card__delete-button"
          onClick={handleDeleteClick}
          type="button"
        ></button>
      )}
      <div className="card__content">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__block">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <span className="card__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
