import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecipes } from '../../hooks/useFetch'
import RecipeListItem from '../../components/RecipeListItem'
import './index.scss'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [query, setQuery] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [searchCuisine, setSearchCuisine] = useState('')
  const { pageNumber } = useParams() 
  const [page, setPage] = useState(pageNumber || 1)
  const { data, error, isLoading } = useRecipes(query, cuisine, page)
  const navigate = useNavigate()

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
    setPage(1) 
    navigate(`/page/1`)
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
    setPage(newPage)
    navigate(`/page/${newPage}`)
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
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
              >
                Previous
              </button>
              <div> Page {page} of {totalPages} </div>
              <button
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
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
