import { useState } from 'react';

export default function LocationCard({ image_link, name, address_line2}){
    const[fav, setFav] = useState(false);
    const [visited, setVisited] = useState(0);

    return(
        <div className='card'>
            <img src={image_link} alt={name} className='card-image'/>
            <div className="card-content">
                <h3 className="card-title">
                    <a className="card-link">{name}</a>
                </h3>
                <p className="card-text">{address_line2}</p>
                <div className="card-actions">
                    <button type="button" onClick={() => setFav(!fav)}>
                        {fav ? 'Favourited' : 'Favourite'}
                    </button>
                    <button type="button" onClick={() => setVisited((prev) => prev + 1)}>
                        Visited {visited} times
                    </button>
                </div>
            </div>
        </div>
    )
}