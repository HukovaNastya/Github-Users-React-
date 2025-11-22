import * as React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import './index.css'

export default function App() {
  return (
    <>
      <div className="container">
        <Header
          title="🔍 GitHub Users Search"
          text="Search and explore GitHub users and their repositories"
        />
        <main id="main">
          <Outlet />
        </main>
      </div>
    </>
  )
}
