import { useState } from 'react'
import './styles/App.css'
import locations from './places.json'
import DetailsPage from './location-details'
import LocationCard from './LocationCard'
import { LoginForm } from './features/auth/LoginForm'
import { UserStatus } from './features/auth/UserStatus'


function App() {
    const [viewLocationDetail,setViewLocationDetail] = useState(null)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    const handleLoginSuccess = (user) => {
        setCurrentUser(user)
        setIsLoginModalOpen(false)
    }

    const handleLogout = () => {
        setCurrentUser(null)
    }

    return (
        <>
            <header className="site-header">
                <nav id="site-navigation" className="site-navigation" aria-label="Main navigation">
                    <UserStatus
                        currentUser={currentUser}
                        onLogout={handleLogout}
                        onRequestLogin={() => setIsLoginModalOpen(true)}
                    />
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
                    {locations.map((l) => (
                        <LocationCard key={l.id} {...l} viewOnClick={()=>{setViewLocationDetail(l);setIsDetailsModalOpen(true);}}></LocationCard>
                    ))}
                </div>
                <div className="bottom-city-fader">
                    <img src="src/assets/city-background.png" alt="City Skyline Background" className="faded-city-img"></img>
                </div>

                {isLoginModalOpen && (
                    <div className='modal-overlay'>
                        <div className='modal-content'>
                            <LoginForm
                                onLoginSuccess={handleLoginSuccess}
                                onCancel={() => setIsLoginModalOpen(false)}
                            />
                        </div>
                    </div>
                )}

                {isDetailsModalOpen && (<div className='item-details' onClick={() => { setIsDetailsModalOpen(false); }}>
                    <DetailsPage key={viewLocationDetail.id} {...viewLocationDetail} onDetailsClick={(e) => { e.stopPropagation() }} />
                </div>)}
            </main>
        </>
    )
}

export default App
