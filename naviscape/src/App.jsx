import { useState } from 'react'
import './styles/App.css'
import locations from './places.json'
import DetailsPage from './location-details'
import LocationCard from './LocationCard'
import { LoginForm } from './features/auth/LoginForm'
import { UserStatus } from './features/auth/UserStatus'
import SearchFilterSortControls from './components/SearchFilterSortControls'

function App() {
    const [viewLocationDetail, setViewLocationDetail] = useState(null)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOption, setSortOption] = useState("name-ascending");

    // This is so we can extract unique categories from the locations data dynamically
    const categories = Array.from(new Set(locations.map((location) => location.categories["0"]).filter(Boolean))
    );

    // Calculating the filtered and sort without mutating the original locations array.
    const filteredLocations = locations
        .filter((location) =>
            location.name ? location.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) : true
        )
        .filter((location) =>
            selectedCategory === "All" || Object.values(location.categories).includes(selectedCategory)
        )
        .slice() // Create a shallow copy beforehand, to avoid mutating during sorting
        .sort((a, b) => {
            if (sortOption === "name-ascending") {
                return a.name.localeCompare(b.name);
            }
            if (sortOption === "name-descending") {
                return b.name.localeCompare(a.name);
            }
            if (sortOption === "rating-ascending") {
                return (a.rating || 0) - (b.rating || 0);
            }
            if (sortOption === "rating-descending") {
                return (b.rating || 0) - (a.rating || 0);
            }
            return 0; // Default case, should not happen

        });

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
                        <SearchFilterSortControls
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            sortOption={sortOption}
                            onSortChange={setSortOption}
                            categories={categories}
                        />
                    </div>
                </section>

                <div className="display-card">
                    {filteredLocations.length > 0 ? (
                        filteredLocations.map((location) => (
                            <LocationCard key={location.id} {...location} viewOnClick={() => { setViewLocationDetail(location); setIsDetailsModalOpen(true); }}></LocationCard>
                        ))
                    ) : (
                        <p>No locations found.</p>
                    )}
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

                {/* details page modal */}
                {isDetailsModalOpen && (<div className='item-details' onClick={() => { setIsDetailsModalOpen(false); }}>
                    <DetailsPage key={viewLocationDetail.id} {...viewLocationDetail} onDetailsClick={(e) => { e.stopPropagation() }} />
                </div>)}
            </main>
        </>
    )
}

export default App
