import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import CurrentUserContext from '../contexts/CurrentUserContext.jsx';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [ cards, setCards ] = React.useState([]);
  React.useEffect(() => {
    api.getProfile()
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => { 
      console.log(`${err}`);
    })
  }, [])

  React.useEffect(() => {
    api.getCards()
    .then((res) => {
      setCards(res);
    })
    .catch((err) => { 
      console.log(`${err}`);
    })
  }, [])
  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }
  function onCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
    api.setLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => { 
      console.log(`${err}`);
    }) } else {
      api.removeLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => { 
      console.log(`${err}`);
    }) } 
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
        setCards(cards => cards.filter((c) => c._id !== card._id))
    })
    .catch((err) => { 
      console.log(`${err}`);
    })
  }
  function handleUpdateUser(data) {
    api.editProfile(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups()
    })
    .catch((err) => { 
      console.log(`${err}`);
    })
  }
  function handleUpdateAvatar(data) {
    api.setAvatar(data)
    .then((avatar) =>{
      setCurrentUser(avatar);
      closeAllPopups()
    })
    .catch((err) => { 
      console.log(`${err}`);
    })
  }
  function handleAddPlace(data) {
    api.createCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err) => { 
      console.log(`${err}`);
    })
  }

  return (
    < CurrentUserContext.Provider value={currentUser} >
      <> 
        <div className="body">
          <div className="page">
            <Header />
            <Main 
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick} 
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              cards={cards}
              onCardDelete={handleCardDelete}
            />
        </div>
        <Footer />
        <ImagePopup 
          card={selectedCard} 
          onClose = {closeAllPopups}
          />
        <AddPlacePopup 
          isOpen = {isAddPlacePopupOpen}
          onClose = {closeAllPopups}
          onAddPlace={handleAddPlace}/>
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}/>
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} />
        <PopupWithForm 
          name="delete-card" 
          title="Вы уверены?" 
          textButton="Да" />
      </div>
    </>
  </CurrentUserContext.Provider>
  )
}

export default App 
