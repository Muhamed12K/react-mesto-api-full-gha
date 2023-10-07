import PopupWithForm from "./PopupWithForm";
import React from "react";

// Компонент попапа изменения профиля
function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar, isRender, onOverlayClose }) {
    const avatarRef = React.useRef();

    // ОБРАБОТЧИКИ
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
    }

    // ЭФФЕКТЫ
    React.useEffect(() => {
        avatarRef.current.vaule = '';
    }, [isOpen]);

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            btnName={isRender ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onOverlayClose={onOverlayClose}>
            <input ref={avatarRef} id="input-avatar" type="url" name="avatar" className="popup__item  popup__item_type_link"
                   placeholder="Ссылка на аватар" required=""/>
            <span className="popup__error popup__error_submit" id="input-avatar-error"/>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;