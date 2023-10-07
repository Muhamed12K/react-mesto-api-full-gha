import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

// Компонент карточки с фото
function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
      `card__btn card__btn_action_del ${isOwn ? 'card__btn_action_visible' : 'card__btn_action_hidden'}`
  );

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName  = (
      `card__btn card__btn_action_like ${isLiked ? 'card__like_color' : ''}`
  );

  // ОБРАБОТЧИКИ

  // обработчик клика по карточке
  function handleClick() {
    props.onCardClick(props.card);
  }

  //обработчик клика по кнопке лайка
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  // обработчик клика по кнопке удаления
  function handleTrashClick() {
    props.onCardDelete(props.card);
  }

  // РАЗМЕТКА JSX
  return (
      <li className="card">
        <img  className="card__image" src={props.card.link} alt={`Фото ${props.card.name}`} onClick={handleClick}/>
        {isOwn && <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить карточку" onClick={handleTrashClick} />}
        <div className="card__description">
          <h2 className="card__title">{props.card.name}</h2>
          <div className="card__like-group">
            <button className={cardLikeButtonClassName} type="button" aria-label="Лайкнуть" onClick={handleLikeClick}></button>
            <p className="card__like-span">{props.card.likes.length}</p>
          </div>
        </div>
      </li>
  )
}

export default Card;