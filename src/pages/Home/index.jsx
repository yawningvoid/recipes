import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useRecipes } from '../../hooks/useFetch.js'
import RecipeListItem from '../../components/RecipeListItem/index.jsx'
import './index.scss'

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { pageNumber = 1 } = useParams()
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '')
  const [query, setQuery] = useState(searchParams.get('query') || '')
  const [cuisine, setCuisine] = useState(searchParams.get('cuisine') || '')
  const [searchCuisine, setSearchCuisine] = useState(searchParams.get('cuisine') || '')

  const { data, error, isLoading } = useRecipes(query, cuisine, pageNumber)

  const cuisines = [
    "",
    "African",
    "Asian",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ]

  const handleSearch = () => {
    setQuery(searchQuery)
    setCuisine(searchCuisine)
    setSearchParams({ query: searchQuery, cuisine: searchCuisine })
    navigate(`/page/1?query=${searchQuery}&cuisine=${searchCuisine}`)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleRecipeClick = (id) => {
    navigate(`/${id}`)
  }

  const handleCuisineChange = (event) => {
    setSearchCuisine(event.target.value)
  }

  const handlePageChange = (newPage) => {
    navigate(`/page/${newPage}?query=${query}&cuisine=${cuisine}`)
  }

  const recipes = data?.results || []
  const totalPages = Math.ceil((data?.totalResults || 0) / 5)

  return (
    <div className="container">
      <h1>Recipe Search</h1>
      <div className="search">
        <input
          type="search"
          value={searchQuery}
          autoFocus
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for recipes"
        />
        <select value={searchCuisine} onChange={handleCuisineChange}>
          {cuisines.map((cuisine, index) => (
            <option key={index} value={cuisine}>
              {cuisine ? cuisine : "Select Cuisine"}
            </option>
          ))}
        </select>
        <button 
          onClick={handleSearch} 
          onKeyDown={handleKeyDown}
        >
          Search
        </button>
      </div>

      {isLoading && <div className="message">Loading...</div>}
      {error && !isLoading && <div className="message">An error occurred: {error.message}</div>}
      {query && !recipes.length && !isLoading && <div className="message">No recipes found</div>}

      <div>
        {recipes.length > 0 && !isLoading && (
          <>
            <div className="search-results">
              {recipes.map((recipe) => (
                <RecipeListItem
                  key={recipe.id}
                  name={recipe.title}
                  image={recipe.image}
                  onClick={() => handleRecipeClick(recipe.id)}
                />
              ))}
            </div>
            <div className="pagination">
              <button
                disabled={parseInt(pageNumber, 10) <= 1}
                className={parseInt(pageNumber, 10) <= 1 ? "button-disabled" : ""}
                onClick={() => handlePageChange(parseInt(pageNumber, 10) - 1)}
              >
                Previous
              </button>
              <div> Page {pageNumber} of {totalPages} </div>
              <button
                disabled={parseInt(pageNumber, 10) >= totalPages}
                className={parseInt(pageNumber, 10) >= totalPages ? "button-disabled" : ""}
                onClick={() => handlePageChange(parseInt(pageNumber, 10) + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  )
}

export default Home
