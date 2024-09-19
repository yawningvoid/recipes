# Recipe Search Application

This is a **React** application that allows users to search for recipes by name and filter results by cuisine. The app integrates with the **Spoonacular API** to fetch and display recipes, and supports pagination, search, and cuisine filtering.

## Features

- **Recipe Search**: Users can search for recipes by name.
- **Cuisine Filter**: Users can filter recipes by selecting a cuisine.
- **Pagination**: Results are paginated, with 5 recipes per page.
- **Recipe Details**: Users can view detailed information for each recipe.

## Technologies Used

- **React**: Frontend framework.
- **React Router**: For navigation and routing.
- **React Query**: For data fetching and caching.
- **Spoonacular API**: Used to fetch recipe data.
- **Vite**: Development environment and build tool.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yawningvoid/recipes.git
   cd your-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Spoonacular API key:

   ```
   VITE_API_KEY=your_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit:

   ```
   http://localhost:3000
   ```

## Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the project for production.
- **`npm run preview`**: Preview the production build locally.

## API Integration

The app uses the **Spoonacular API** to fetch recipe data. It requires an API key which should be set in the `.env` file.

### Example API Call

To fetch a list of recipes with pagination and cuisine filtering, the app makes requests like:

```bash
GET https://api.spoonacular.com/recipes/complexSearch?apiKey=YOUR_API_KEY&query=pizza&cuisine=Italian&number=5&offset=0
```

## Theme Switching

The application automatically switches between light and dark themes based on the user's system settings. If the user's operating system is set to dark mode, the app will apply a dark theme, and vice versa for light mode.

## Project Structure

```bash
src/
│
├── components/         # Reusable components (e.g., RecipeListItem)
├── hooks/              # Custom hooks for data fetching
├── pages/              # Page components (Home, Detail)
├── App.jsx             # Main App component
├── main.jsx            # Entry point for the application
└── router/             # Router configuration
```

## Usage

1. On the homepage, use the search bar to enter a recipe name and click "Search" or press `Enter`.
2. Use the dropdown to select a cuisine filter.
3. Paginate through the results using the "Previous" and "Next" buttons.
4. Click on a recipe to view detailed information.

## Future Improvements

- Add more filters (e.g., dietary restrictions, preparation time).
- Add unit tests and integration tests.

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [Spoonacular API](https://spoonacular.com/food-api) for providing the recipe data.

---
