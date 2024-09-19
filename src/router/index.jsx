import { createHashRouter } from "react-router-dom"
import Home from "../pages/Home/index.jsx"
import Detail from "../pages/Detail/index.jsx"

export const router = createHashRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/page/:pageNumber',
    element: <Home />, 
  },
  {
    path: '/:id',
    element: <Detail/>,
  },
])