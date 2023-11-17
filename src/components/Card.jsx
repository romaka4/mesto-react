import deleteIcon from '../images/delete.svg'
function Card(props) {
  // _ => 
  function handleCardClick() {
    props.onCardClick(props.card)
  }
  return (
    <article className="card" >
  <img className="card__image"  style={{ backgroundImage: `url(${props.card.link})`}} 
  onClick={handleCardClick}/>
  <img
    className="card__delete"
    src={deleteIcon}
    alt="Удалить"
  />
  <div className="card__info">
    <h2 className="card__name" >{props.card.name}</h2>
    <div className="card__like">
      <button className="card__btn-like" type="button" />
      <p className="card__like-value" >{props.card.likes.length}</p>
    </div>
  </div>
</article>

  )
}

export default Card