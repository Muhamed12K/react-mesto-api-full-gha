import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRouter";

import { registerUser } from '../utils/auth.js';
import { authorizeUser } from '../utils/auth.js';
import { getContent } from '../utils/auth.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import {api} from "../utils/Api";

import Login from "./Login";
import Register from "./Register";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import NotFound from './NotFound.js';

import InfoTooltip from "./InfoTooltip";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from "./ImagePopup.js";
import DeletePlacePopup from "./DeletePlacePopup";
import Preloader from "./Preloader";

function App() {
  const navigate = useNavigate();

  const [isRegistrationSuccess, setIsRegistrationSuccess] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [isAppLoading, setIsAppLoading] = React.useState(false);
  const [isPageLoading, setIsPageLoading] = React.useState(false);
  const [isProcessLoading, setIsProcessLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({
    _id: '',
    email: '',
    name: '',
    about: '',
    avatar: '',
  });

  const [userData, setUserData] = React.useState({
    _id: '',
    email: ''
  });

  const [selectedCard, setSelectedCard] = React.useState({isOpen: false, element: {}});
  const [selectedCardDeleteConfirm, setSelectedCardDeleteConfirm] = React.useState({isOpen: false, card: {}});
  const [cards, setCards] = React.useState([]);

  const [isActiveHeaderMenu, setIsActiveHeaderMenu] = React.useState(false);

  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);
  const [renderSaving, setRenderSaving] = React.useState(false);

    //ЭФФЕКТЫ

    // //при загрузке страницы получаем данные карточек
    // React.useEffect(() => {
    //     api.getInitialCards()
    //         .then((data) => {
    //             setCards(data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }, []);
    //
    // //при загрузке страницы получаем данные пользователя
    // React.useEffect(() => {
    //     api.getUserInfoApi()
    //         .then(data => {
    //             setCurrentUser(data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }, []);

    const checkToken = React.useCallback(() => {
        const jwt = localStorage.getItem('jwt');

        if (jwt) {
            setIsAppLoading(true);

            getContent(jwt)
                .then((res) => {
                    const { _id, email } = res;
                    const userData = {
                        _id,
                        email
                    };
                  console.log(userData);
                    setUserData(userData);
                    handleLogin();
                    navigate('/', { replace: true });
                })
                .catch((err) => {
                    console.log(`Ошибка в процессе проверки токена пользователя и получения личных данных: ${err}`);
                })
                .finally(() => {
                    setIsAppLoading(false);
                })
        };
    }, [navigate]);

    React.useEffect(() => {
        checkToken();
    }, [checkToken]);

    React.useEffect(() => {
        if (isLoggedIn) {
            setIsPageLoading(true);

            Promise.all([api.getUserInfoApi(), api.getInitialCards()])
                .then(([user, cards]) => {
                    setCurrentUser(user);
                    setCards(cards);
                })
                .catch((err) => {
                    console.log(`Ошибка в процессе загрузки данных пользователя и карточек: ${err}`);
                })
                .finally(() => {
                    setIsPageLoading(false);
                })
        };
    }, [isLoggedIn]);

    //ОБРАБОТЧИКИ

  function handleLogin() {
    setIsLoggedIn(true);
  };
  function toggleHeaderMenu() {
    setIsActiveHeaderMenu(!isActiveHeaderMenu);
  };

  function openInfoTooltip() {
    setIsInfoTooltipOpened(true);
  };
  function handleEditAvatarClick() {
    setEditAvatarClick(true);
  }

  function handleEditProfileClick() {
    setEditProfileClick(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceClick(true);
  }

  function handleCardClick(card) {
    setSelectedCard({...selectedCard, isOpen: true, element: card});
  }

  function handleDeletePlaceClick(card) {
    setSelectedCardDeleteConfirm({...selectedCardDeleteConfirm, isOpen: true, card: card});
  }

  const closeAllPopups = React.useCallback(() => {
    setIsInfoTooltipOpened(false);
    setEditAvatarClick(false);
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setSelectedCard({...selectedCard, isOpen: false});
    setSelectedCardDeleteConfirm({...selectedCardDeleteConfirm, isOpen: false});
  }, []);

    function handleUserRegistration(data) {
      setIsProcessLoading(true);
      const { email, password } = data;

      registerUser(email, password)
        .then((res) => {
          if (res) {
            setIsRegistrationSuccess(true);
            openInfoTooltip();
          };

          if (!res) {
            openInfoTooltip();
          };
        })
        .catch((err) => {
          // openInfoTooltip();
          // setIsRegistrationSuccess(false);
          console.log(`Ошибка в процессе регистрации пользователя на сайте: ${err}`);
        })
        .finally(() => {
          setIsProcessLoading(false);
        })
    };

    React.useEffect(() => {
      if (isInfoTooltipOpened && isRegistrationSuccess) {
        setTimeout(() => {
          navigate('/sign-in', { replace: false });
          closeAllPopups();
        }, 1200);

        setTimeout(() => {
          setIsRegistrationSuccess(false);
        }, 1500);
      };

      return () => clearTimeout(setTimeout);
    }, [isInfoTooltipOpened, isRegistrationSuccess, navigate, closeAllPopups, setIsRegistrationSuccess]);

    function handleUserAuthorization(data) {
        setIsProcessLoading(true);
        const { email, password } = data;

        authorizeUser(email, password)
            .then((jwt) => {
                if (jwt) {
                    handleLogin();
                    navigate('../', { replace: true });
                };
            })
            .catch((err) => {
                openInfoTooltip();
                console.log(`Ошибка в процессе авторизации пользователя на сайте: ${err}`);
            })
            .finally(() => {
                setIsProcessLoading(false);
            })
    };

  //изменение данных пользователя
    function handleUpdateUser(data) {
      if (data.name === currentUser.name && data.about === currentUser.about) {
        closeAllPopups();
      } else {
        setIsProcessLoading(true);

        api.setUserInfo(data.name, data.about)
          .then((user) => {
            setCurrentUser(user);
            closeAllPopups();
          })
          .catch((err) => {
            console.log(`Ошибка в процессе редактирования информации пользователя: ${err}`)
          })
          .finally(() => {
            setIsProcessLoading(false);
          })
      };

      // setRenderSaving(true);
      // api.setUserInfo(data)
      //   .then((data) => {
      //     setCurrentUser(data);
      //     closeAllPopups();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   })
      //   .finally(() => {
      //     setRenderSaving(false);
      //   });
    };

  // function closePopupsOnOutsideClick(evt) {
  //     const target = evt.target;
  //     const checkSelector = selector => target.classList.contains(selector);
  //
  //     if (checkSelector('popup_opened') || checkSelector('popup__btn_action_close')) {
  //         closeAllPopups();
  //     };
  // };

  //изменение аватара пользователя
    function handleUpdateAvatar(data) {
      setIsProcessLoading(true);

      api.setUserAvatar(data.avatar)
        .then((avatar) => {
          setCurrentUser(avatar);
          closeAllPopups();
        })
        .catch(err => {
          console.log(`Ошибка в процессе изменения аватара пользователя: ${err}`);
        })
        .finally(() => {
          setIsProcessLoading(false);
        })
    };

    //добавление новой карточки
    function handleAddPlaceSubmit(data) {
        setIsProcessLoading(true);

        api.addNewCard(data.name, data.link)
            .then((card) => {
                setCards([...cards, card]);
                closeAllPopups();
            })
            .catch(err => {
                console.log(`Ошибка в процессе добавления новой карточки в галерею: ${err}`);
            })
            .finally(() => {
                setIsProcessLoading(false);
            });
    };

    //поставить/снять лайка
    function handelCardLike(card) {
      const isLiked = card.likes.some(user => user._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
          .then((cardLike) => {
            setCards(state => state.map(c => c._id === card._id ? cardLike : c));
        })
        .catch((err) => {
          console.log(`Ошибка в процессе добавления/снятия лайка карточки в галерее: ${err}`);
        })
  };

    //удаление карточки
  function handleCardDelete(card) {
      setRenderSaving(true);
      api.deleteCard(card._id)
        .then(() => {
          const newCards = cards.filter((c) => c._id !== card._id);
          setCards(newCards);
          closeAllPopups();
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
            setRenderSaving(false);
        });
  }
  function handleOverlayClickClose(evt) {
    if (evt.target.classList.contains("popup")) closeAllPopups();
  }

    if (isAppLoading) {
        return null;
    };

    //РАЗМЕТКА JSX
  return (
      <div className={`page ${isActiveHeaderMenu && 'active'}`}>
          <Routes>
              <Route path='/' element={
                  <Header
                      isActive={isActiveHeaderMenu}
                      onActive={toggleHeaderMenu}
                      userData={userData}
                      setIsLoggedIn={setIsLoggedIn}
                      isActiveHeaderMenu={isActiveHeaderMenu}
                      toggleHeaderMenu={toggleHeaderMenu}
                  />
              }>
                  <Route
                      // index
                      path=''
                      element={
                          <>
                              <ProtectedRoute isLoggedIn={isLoggedIn} />
                              {isPageLoading
                                  ? <Preloader />
                                  : <>
                                      <CurrentUserContext.Provider value={currentUser}>
                                          <Main
                                              onEditAvatar={handleEditAvatarClick}
                                              onEditProfile={handleEditProfileClick}
                                              onAddPlace={handleAddPlaceClick}
                                              onCardClick={handleCardClick}
                                              onCardLike={handelCardLike}
                                              cards={cards}
                                              onDeletePlace={handleDeletePlaceClick}
                                          />
                                      </CurrentUserContext.Provider>

                                      <Footer/>

                                      <CurrentUserContext.Provider value={currentUser}>
                                          <EditProfilePopup
                                              isOpen={isEditProfilePopupOpen}
                                              onClose={closeAllPopups}
                                              onUpdateUser={handleUpdateUser}
                                              isRender={renderSaving}>
                                          </EditProfilePopup>

                                          <AddPlacePopup
                                              isOpen={isAddPlacePopupOpen}
                                              onClose={closeAllPopups}
                                              onAddPlace={handleAddPlaceSubmit}
                                              isRender={renderSaving}
                                              onOverlayClose={handleOverlayClickClose}
                                          />

                                          <EditAvatarPopup
                                              isOpen={isEditAvatarPopupOpen}
                                              onClose={closeAllPopups}
                                              onUpdateAvatar={handleUpdateAvatar}
                                              isRender={renderSaving}
                                              onOverlayClose={handleOverlayClickClose}
                                          />

                                          <DeletePlacePopup
                                              deleteCard={selectedCardDeleteConfirm}
                                              onClose={closeAllPopups}
                                              onOverlayClose={handleOverlayClickClose}
                                              onDeleteCard={handleCardDelete}
                                              isRender={renderSaving}
                                          />
                                      </CurrentUserContext.Provider>

                                      <ImagePopup
                                          card={selectedCard}
                                          onClose={closeAllPopups}
                                          onOverlayClose={handleOverlayClickClose}
                                      />
                                  </>
                              }
                          </>
                      }
                  />
                  <Route path='sign-in' element={
                      <Login
                          onAuthorization={handleUserAuthorization}
                          isProcessLoading={isProcessLoading}
                      />
                  }
                  />
                  <Route path='sign-up' element={
                      <Register
                          onRegistration={handleUserRegistration}
                          isProcessLoading={isProcessLoading}
                      />
                  }
                  />
              </Route>
              <Route path='*' element={<NotFound />} />
          </Routes>
          <InfoTooltip
              isSuccess={isRegistrationSuccess}
              isOpen={isInfoTooltipOpened}
              onClose={closeAllPopups}
              onOverlayClose={handleOverlayClickClose}
          />
      </div>
  );
}

export default App;