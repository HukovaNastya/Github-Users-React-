import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import HomePage from '../src/pages/HomePage.jsx'
import AboutUs from '../src/pages/AboutUs.jsx'
import SearchPage from './pages/SearchPage.jsx'
import UserInfo from './pages/UserInfo.jsx'
import { getUserById } from './services/githubUser.service.js'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: <h2>Oops! Page not found 😢</h2>,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutUs },
      {
        path: 'search',
        children: [
          { index: true, Component: SearchPage },
          {
            path: ':userId',
            loader: async ({ params }) => {
              const userInfo = await getUserById(params.userId)
              return userInfo
            },
            Component: UserInfo,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*<Provider store={}>*/}
    <RouterProvider router={router} />
    {/*</Provider>*/}
  </React.StrictMode>,
)
