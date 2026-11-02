import { useState } from 'react'
import './styles/App.css'

export default function Details_page({ name, categories, image_link, open_hours, address_line2, onDetailsClick}) {
    const [fav, setFav] = useState(false);

    return (
        <div className="item-detail-body" onClick={onDetailsClick}>
            <section className="attraction-details">
                {/* Name of Attraction  */}
                <h1 className="attraction-name">{name}</h1>

                {/* <!-- Image of Attraction --> */}
                <img src={image_link} alt={name}></img>

                <article className="location-details">
                    {/* <!-- Location address --> */}
                    <p>{address_line2}</p>
                    {/* <!-- Additional information --> */}
                    <p>{open_hours}</p>
                    <ul className='category-list'>
                        {Object.keys(categories).map((key)=>(<li key={key}>{categories[key]}</li>))}
                    </ul>
                </article>
                <div>
                    <button className="favourite-button" onClick={() => setFav(!fav)}>{fav ? 'Favourited' : 'Favourite'}</button>
                    <button className="review">Review</button>
                </div>
            </section>
        </div>
    )
}