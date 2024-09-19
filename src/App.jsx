import { RouterProvider } from 'react-router-dom'
import { router } from './router/index.jsx'

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
