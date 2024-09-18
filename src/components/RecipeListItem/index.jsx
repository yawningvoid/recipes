import './index.scss'

const RecipeListItem = ({ name, image, onClick }) => {
  return (
    <div className="recipe-list-item" onClick={onClick}>
      <div className="recipe-image-container">
        <img src={image} alt={name} className="recipe-image" />
      </div>
      <h2 className="recipe-name">{name}</h2>
    </div>
  )
}

export default RecipeListItem
