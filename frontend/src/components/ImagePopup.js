import React from 'react';

//Компонент попапа с картинкой
function ImagePopup(props) {

    // РАЗМЕТКА JSX
    return (
        <div className={`popup popup_content_image popup_type_image ${props.card.isOpen ? 'popup_opened' : ""}`} onClick={props.onOverlayClose}>
            <figure className="popup__figure popup__container_type_image">
                <img className="popup__image" src={props.card.element.link} alt={`Фото ${props.card.element.name}`} />
                <figcaption className={`popup__image-caption`}>{props.card.element.name}</figcaption>
                <button onClick={props.onClose} className="popup__btn popup__btn_type_image popup__btn_action_close popup__btn_action_close-zoom" type="button" aria-label="Закрыть окно" />
            </figure>
        </div>
    )
};

export default ImagePopup;