import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

// Компонент попапа изменения профиля
function EditProfilePopup({ isOpen, onClose, onUpdateUser, isRender, onOverlayClose }) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    // ЭФФЕКТЫ

    //получаем текущие значения для установки в поля попапа
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    // ОБРАБОТЧИКИ
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    // РАЗМЕТКА JSX
    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            btnName={isRender ? "Сохранение..." : "Сохранить"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onOverlayClose={onOverlayClose}>
            <input value={name || ''} onChange={handleChangeName} id="name-field" className="popup__item popup__item_type_name popup__item_type_name-profile"
                   placeholder="Имя" name="name" type="text" maxLength={40} minLength={2} required=""/>
            <span className="popup__error" id="name-field-error"/>
            <input value={description || ''} onChange={handleChangeDescription} id="info-field" className="popup__item popup__item_type_info popup__item_type_info-profile"
                   placeholder="О себе" name="info" type="text" maxLength={200} minLength={2} required=""/>
            <span className="popup__error popup__error_submit" id="info-field-error"/>
        </PopupWithForm>
    )
}

export default EditProfilePopup;