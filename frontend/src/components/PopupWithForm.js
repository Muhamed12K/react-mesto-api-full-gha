import React from 'react';

//Компонент попапов
function PopupWithForm(props) {

    // РАЗМЕТКА JSX
    return (
        <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : false}`} onClick={props.onOverlayClose} >
            <div className={`popup__container popup__container_type_${props.name}`}>
                <h3 className={`popup__heading popup__heading_type_${props.name}`}>{props.title}</h3>
                <form className="popup__form" name={`popup-form-${props.name}`} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className={`popup__btn popup__btn_type_${props.name} popup__btn_action_submit`} type="submit">{props.btnName}</button>
                </form>
                <button onClick={props.onClose} className=" popup__btn popup__btn_action_close" type="button" aria-label="Закрыть окно"></button>
            </div>
        </section>
    )
}

export default PopupWithForm;