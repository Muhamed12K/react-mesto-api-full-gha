import React from 'react';
import PopupWithForm from './PopupWithForm.js';

// Компонент попапа добавления карточки
function AddPlacePopup({ isOpen, onClose, onAddPlace, isRender}) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');


    // ОБРАБОТЧИКИ
    function handleAddName(e) {
        setName(e.target.value);
    }

    function handleAddLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({ name, link });
    }

    //ЭФФЕКТЫ
    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);


    //РАЗМЕТКА JSX
    return (
        <PopupWithForm
            name="card"
            title="Новое место"
            btnName={isRender ? 'Сохранение...' :'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input value={name} onChange={handleAddName} id="field-card" name="name" className="popup__item popup__item_type_name popup__item_type_name-card" placeholder="Название" maxLength={30} minLength={1} required=""/>
            <span className="popup__error" id="field-card-error" />
            <input value={link} onChange={handleAddLink} id="field-link" name="link" type="url" className="popup__item popup__item_type_info popup__item_type_info-link" placeholder="Ссылка на картинку" required=""/>
            <span className="popup__error popup__error_submit" id="field-link-error"/>
        </PopupWithForm>
    )
}

export default AddPlacePopup;