import React from 'react';
import api from '../utils/Api.js'
import Card from './Card.jsx'


function Main(props) {
  const [ userName, setUserName ] = React.useState(false);
  const [ userDescription, setUserDescription ] = React.useState(false);
  const [ userAvatar, setUserAvatar ] = React.useState(false);
  const [ cards, setCards ] = React.useState([]);
  React.useEffect(() => {
    api.getProfile()
    .then((res) =>{
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
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
    return (
      <main className="content">
        <section className="profile">
          <div onClick={props.onEditAvatar} 
          className="profile__image" 
          style={{ backgroundImage: `url(${userAvatar})` }}  />
          <div className="profile__info">
            <p className="profile__name">{userName}</p>
            <button onClick={props.onEditProfile} className="profile__edit-btn" type="button" />
            <p className="profile__bio">{userDescription}</p>
          </div>
          <button onClick={props.onAddPlace} className="profile__add-btn" type="button" />
        </section>
        <section className="cards">
          { cards.map((card) => (
            < Card key={card._id} card={card} onCardClick={props.onCardClick}/>
          ))}
        </section>
      </main>
  )  
}





export default Main