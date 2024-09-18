import { useQuery } from '@tanstack/react-query'

const API_KEY = '65a3e4d291a84a91824978cd24297c6d'
const BASE_URL = 'https://api.spoonacular.com/recipes'

const fetchRecipes = async (query, cuisine, page) => {
  const searchQuery = query ? `query=${query}` : ''
  const cuisineQuery = cuisine ? `&cuisine=${cuisine}` : ''
  const numberPerPage = 5
  const offset = (page - 1) * numberPerPage

  const response = await fetch(
    `${BASE_URL}/complexSearch?apiKey=${API_KEY}&${searchQuery}&number=${numberPerPage}&offset=${offset}&${cuisineQuery}`
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const fetchRecipeDetail = async (id) => {
  const response = await fetch(
    `${BASE_URL}/${id}/information?apiKey=${API_KEY}`
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const useRecipes = (query, cuisine, page) => {
  return useQuery({
    queryKey: ['recipes', query, cuisine, page],
    queryFn: () => fetchRecipes(query, cuisine, page),
    enabled: Boolean(query || cuisine),
    staleTime: 300000, 
    cacheTime: 600000, 
    refetchOnWindowFocus: false,
  })
}

export const useRecipeDetail = (id) => {
  return useQuery({
    queryKey: ['recipeDetail', id],
    queryFn: () => fetchRecipeDetail(id),
    staleTime: 300000, 
    cacheTime: 600000, 
  })
}
