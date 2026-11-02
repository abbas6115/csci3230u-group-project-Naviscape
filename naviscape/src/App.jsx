import { useState } from 'react'
import './styles/App.css'
import locations from './places.json'
import DetailsPage from './location-details'


function App() {
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(true)
    const testData = locations[3];
    console.log(testData);

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
                <section className="display-card">
                    <div className="card" >
                        <img src="https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=m8sZTfGk6KUVMG8qiTcNOw&cb_client=search.gws-prod.grass&w=408&h=240&yaw=156.8786&pitch=0&thumbfov=100" alt="Attraction 1" className="card-image"></img>
                        <div className="card-content">
                            <h3 className="card-title">
                                Memorial Park
                            </h3>
                            <p className="card-text">
                                111 Dundas St E, London, ON L1N 4C8 | Ontario, Canada
                            </p>
                        </div>
                    </div>
                    <div className="card">
                        <img src="https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SG5FHiZRylCATcSu9jFJaAjN3KC-laD9eVjZda9jrJ_YIDcE9Ip9vpJH45OTRl2JrZZPg-b5z9oBNz4WzgxVxoDO3nKLSM9ev3bRTy8xA2tg779DxFJZ77NNIhWArvBdqQZ9fu=s680-w680-h510" alt="Attraction 2" className="card-image"></img>
                        <div className="card-content">
                            <h3 className="card-title">
                                Ontario tech
                            </h3>
                            <p className="card-text">
                                2000 Simcoe St N, Oshawa, L1G 0C5 | Ontario, Canada
                            </p>
                        </div>
                    </div>
                </section>

                {isDetailsModalOpen && (<div className='item-details' onClick={() =>{setIsDetailsModalOpen(false);}}>
                        <DetailsPage key={testData.id} {...testData} onDetailsClick={(e) =>{e.stopPropagation()}}/>
                </div>)}

                <div className="bottom-city-fader">
                    <img src="src/assets/city-background.png" alt="City Skyline Background" className="faded-city-img"></img>
                </div>
            </main>
        </>
    )
}

export default App
