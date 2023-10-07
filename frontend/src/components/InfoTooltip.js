import iconSuccess from '../images/reg-success.svg';
import iconFailure from '../images/reg-failure.svg';
import closePopupEsc from '../hooks/closePopupEsc';

export default function InfoTooltip({ isSuccess, isOpen, onClose, onOverlayClose }) {
    closePopupEsc(isOpen, onClose);

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`} onClick={onOverlayClose}>
            <div className="popup__container popup__container_type_info-tooltip">
                <img
                    className="popup__icon"
                    src={isSuccess ? iconSuccess : iconFailure}
                    alt={`Иконка ${isSuccess ? 'успешной' : 'ошибки при'} регистрации на сайте`}
                />
                <h3 className="popup__title">
                    {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h3>
                <button
                    className="popup__btn popup__btn_action_close"
                    type="button"
                    aria-label="Закрытие модального окна"
                    onClick={onClose}
                />
            </div>
        </div>
    );
};