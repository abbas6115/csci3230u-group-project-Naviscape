import { useState } from 'react'
import './styles/App.css'

import locations from './places.json'
import LocationCard from './LocationCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header className="site-header">
            <nav id="site-navigation" className="site-navigation" aria-label="Main navigation">
                <a className="button-login" href="login-page.html" aria-hidden="true">Log In</a>
            </nav>
        </header>

        <main id="top">
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to Naviscape</h1>
                    <p>A brand new way to find the best places all over!</p>
                    <form className="search-content" action="/search" method="get">
                        <input type="search" className="search-input" name="q" placeholder="Search for attractions..." aria-label="Search for attractions"></input>
                        <button type="submit" className="search-button">Search</button>
                    </form>
                </div>
            </section>
            <div className="display-card">
                {locations.map((l) =>(
                    <LocationCard key={l.id} {...l} ></LocationCard>
                ))}
            </div>
            <div className="bottom-city-fader">
                <img src="src/assets/city-background.png" alt="City Skyline Background" className="faded-city-img"></img>
            </div>
        </main>
    </>
  )
}

export default App
