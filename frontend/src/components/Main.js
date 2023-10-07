import React from 'react';
import Card from './Card.js'
import {CurrentUserContext} from "../contexts/CurrentUserContext";

// Компонент основного контента страницы
function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    // РАЗМЕТКА JSX
    return(
        <main>
            <section className="profile">
                <div className="profile__avatar" onClick={props.onEditAvatar}>
                    <img className="profile__image" src={currentUser.avatar} alt="фото профиля" />
                </div>
                <div className="profile__info">
                    <div className="profile__name-container">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__btn profile__btn_action_edit" onClick={props.onEditProfile} />
                    </div>
                    <p className="profile__work">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__btn profile__btn_action_add" onClick={props.onAddPlace} />
            </section>
            <section className="photo-grid">
                <template className="card-template" />
                <ul className="photo-grid__list" />
            </section>

            <section className="photo-grid " aria-label="Фотографии">
                <ul className="photo-grid__list">
                    {props.cards.map((item) => (
                        <Card
                            key={item['_id']}
                            card={item}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onDeletePlace}
                        />)
                    )}
                </ul>
            </section>
        </main>
    )

}

export default Main;