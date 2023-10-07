import React from 'react';
import { Outlet, Link, useMatch, useNavigate } from 'react-router-dom';
import headerLogo from "../images/headerLogo.svg";
import useWindowSize from "../hooks/useWindowSize";

// Компонент шапки сайта
function Header({ userData, setIsLoggedIn, isActive, onActive, isActiveHeaderMenu, toggleHeaderMenu }) {
    const windowWidth = useWindowSize();

    const href = useMatch({ path: `${window.location.pathname}`, end: false });
    const isRootHref = href.pathname.endsWith('/');
    const isLoginHref = href.pathname.endsWith('/sign-in');

    const navigate = useNavigate();

    const menuElement = <span className="header__menu-line" />;

    function isDisplayMobileAndRootHref() {
        return windowWidth <= 696 && isRootHref;
    };

    function signUserOut() {
        if (isActiveHeaderMenu) {
            toggleHeaderMenu();
        };
        localStorage.removeItem('jwt');
        navigate('./sign-in', { replace: true });
        setIsLoggedIn(false);
    };


    function renderHeaderMenu() {
        return (
            <div className={`header__data ${isDisplayMobileAndRootHref() && 'header__data_mobile'}`}>
                {
                    isRootHref
                        ? <>
                            <p className='header__email'>{userData.email}</p>
                            <button
                                className='header__btn'
                                type='button'
                                aria-label='Выход из личного кабинета'
                                onClick={signUserOut}
                            >
                                Выйти
                            </button>
                        </>
                        : <Link
                            className='header__btn'
                            to={isLoginHref ? './sign-up' : './sign-in'}
                        >
                            {isLoginHref ? 'Регистрация' : 'Войти'}
                        </Link>
                }
            </div>
        );
    };

    return (
        <>
            {isDisplayMobileAndRootHref() && renderHeaderMenu()}
            <header className="header">
                <img src={headerLogo} alt="Логотип сайта" className="header__logo" />
                {
                    isRootHref &&
                    <button
                        className={`header__menu ${isActive && 'active'}`}
                        type="button"
                        aria-label="Открытие меню с электронным адресом пользователя и кнопкой выхода из личного кабинета"
                        onClick={onActive}
                    >
                        {menuElement}
                        {menuElement}
                        {menuElement}
                    </button>
                }
                {!isDisplayMobileAndRootHref() && renderHeaderMenu()}
            </header>
            <Outlet />
        </>
    );
}

export default Header;