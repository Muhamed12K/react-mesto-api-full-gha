import { Link } from "react-router-dom";

import WelcomeWindowForm from "./WelcomeWindowForm";
import useFormWithValidation from "../hooks/useFormValidation";

export default function Register({ onRegistration, isProcessLoading }) {
    const { values, errors, isValid, handleChange } = useFormWithValidation();

    function handleSubmit(evt) {
        evt.preventDefault();

        const { email, password } = values;

        onRegistration({
            email: email.trim().replace(/\s+/g, ' '),
            password: password
        });
    };

    return (
        <WelcomeWindowForm
            heading={'Регистрация'}
            btnSubmit={'Зарегистрироваться'}
            btnAriaLabel={'Регистрация на сайте'}
            onSubmit={handleSubmit}
            isProcessLoading={isProcessLoading}
            isValid={isValid}
        >
            <div className="welcome-window__input-wrapper">
                <input
                    className={`welcome-window__input ${errors?.email && 'welcome-window__input_error'}`}
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="on"
                    required
                    onChange={handleChange}
                    value={values?.email || ''}
                />
                <span className="welcome-window__error-msg">
          {errors?.email && 'Введите адрес электронной почты'}
        </span>
            </div>

            <div className="welcome-window__input-wrapper">
                <input
                    className={`welcome-window__input ${errors?.password && 'welcome-window__input_error'}`}
                    name="password"
                    type="password"
                    minLength="6"
                    autoComplete="current-password"
                    placeholder="Пароль"
                    required
                    onChange={handleChange}
                    value={values?.password || ''}
                />
                <span className="welcome-window__error-msg">
          {errors?.password && 'Пароль должен состоять минимум из 6 симв.'}
        </span>
            </div>

            <p className="welcome-window__paragraph">Уже зарегистрированы?&nbsp;
                <Link className='welcome-window__link' to='../sign-in'>Войти</Link>
            </p>

        </WelcomeWindowForm>
    );
};