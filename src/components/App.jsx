import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
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
  return (
    <> 
    <div className="body">
  <div className="page">
    <ImagePopup 
    card={selectedCard} 
    onClose = {closeAllPopups}
    />
    <Header />
    <Main 
    onEditProfile={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick} 
    onEditAvatar={handleEditAvatarClick} 
    onCardClick={onCardClick}
    />

  </div>
  <Footer />
<PopupWithForm 
  name="new-place" 
  title="Новое место" 
  textButton="Создать" 
  isOpen = {isAddPlacePopupOpen}
  onClose = {closeAllPopups}
  >
  <>
    <div className="form__input-container">
      <input
        type="text"
        className="form__item form__item_el_title"
        placeholder="Название"
        name="name"
        id="title"
        minLength={2}
        maxLength={30}
        required=""
      />
      <span id="title-error" className="input-error" />
    </div>
    <div className="form__input-container">
      <input
        type="url"
        className="form__item form__item_el_link"
        placeholder="Ссылка на картинку"
        name="link"
        id="link"
        required=""
      />
      <span id="link-error" className="input-error" />
    </div>
  </>
</PopupWithForm>
<PopupWithForm 
name="edit" 
title="Редактировать профиль" 
textButton="Сохранить" 
isOpen = {isEditProfilePopupOpen}
onClose = {closeAllPopups}
>
  <>
    <div className="form__input-container">
      <input
        type="text"
        className="form__item form__item_el_name"
        placeholder="Введите имя"
        name="name"
        id="name"
        required=""
        minLength={2}
        maxLength={40}
      />
      <span id="name-error" className="input-error" />
    </div>
    <div className="form__input-container">
      <input
        type="text"
        className="form__item form__item_el_job"
        placeholder="Введите деятельность"
        name="job"
        id="job"
        required=""
        minLength={2}
        maxLength={200}
      />
      <span id="job-error" className="input-error" />
    </div>
  </>

</PopupWithForm>
<PopupWithForm 
name="avatar" 
title="Обновить аватар" 
textButton="Сохранить"
isOpen = {isEditAvatarPopupOpen}
onClose = {closeAllPopups}
>
      <div className="form__input-container" >
        <input
          type="url"
          className="form__item form__avatar-link"
          placeholder="Ссылка"
          name="link"
          id="avatar"
          minLength={2}
          required=""
        />
        <span id="avatar-error" className="input-error" />
      </div>
</PopupWithForm>
<PopupWithForm name="delete-card" title="Вы уверены?" textButton="Да" />

  <ImagePopup />
     </div>
</>

  )
}


// export function handleEditProfileClick() {
//   document.querySelector('.popup_type_edit').classList.add('popup_opened');
// }
// export function handleAddPlaceClick() {
//   document.querySelector('.popup_type_new-place').classList.add('popup_opened');
// }
// export function handleEditAvatarClick() {
//   document.querySelector('.popup_type_avatar').classList.add('popup_opened');
// }



export default App 
