import { useParams } from "react-router-dom"
import { useRecipeDetail } from "../../hooks/useFetch.js"
import "./index.scss"

function Detail() {
  const { id } = useParams() 
  const { data, error, isLoading } = useRecipeDetail(id) 

  if (isLoading) return <div className="message">Loading...</div>
  if (error) return <div className="message">An error occurred: {error.message}</div>

  const { title, image, vegan, dairyFree, extendedIngredients, instructions, vegetarian, glutenFree, veryHealthy, cheap, veryPopular, sustainable, lowFodmap } = data

  return (
    <div className="container">
      <menu>
        <li><a href="/">Home</a></li>
      </menu>
      <h1>{title}</h1>
      <div className="cover">
        <img src={image} alt={title} />
      </div>
      <div>
        {(vegan || dairyFree || vegetarian || glutenFree || veryHealthy || cheap || veryPopular || sustainable || lowFodmap) && 
          <div className="tags">
            {vegan && <div className="tag">Vegan</div>}
            {dairyFree && <div className="tag">Dairy Free</div>}
            {vegetarian && <div className="tag">Vegetarian</div>}
            {glutenFree && <div className="tag">Gluten Free</div>}
            {veryHealthy && <div className="tag">Very Healthy</div>}
            {cheap && <div className="tag">Cheap</div>}
            {veryPopular && <div className="tag">Very Popular</div>}
            {sustainable && <div className="tag">Sustainable</div>}
            {lowFodmap && <div className="tag">Low FODMAP</div>}
          </div>
        }
      </div>
      <div className="detail-columns">
        <div className="column">
          <h3>Ingredients</h3>
          <ul>
            {extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.name}: {ingredient.amount} {ingredient.unit}
              </li>
            ))}
          </ul>
        </div>
        <div className="column">
          <h3>Instructions</h3>
          <p
            className="instructions"
            dangerouslySetInnerHTML={{ __html: instructions }}
          />
        </div>
      </div>
    </div>
  )
}

export default Detail
