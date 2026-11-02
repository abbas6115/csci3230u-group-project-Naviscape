import React, { useState} from "react";
import SearchFilterSortControls from "./SearchFilterSortControls";



// setting default values 
export default function Catalog({ locations = []}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOption, setSortOption] = useState("name-ascending");

    // This is so we can extract unique categories from the locations data dynamically
    const categories = Array.from(new Set(locations.map((location) => location.category).filter(Boolean))
);

// Calculating the filtered and sort without mutating the original locations array.
    const filteredLocations = locations
        .filter((location) => 
            location.name ? location.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) : true
    )
    .filter((location) =>
        selectedCategory === "All" || location.category === selectedCategory
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

 return (
    <section className="catalog-section">
        <SearchFilterSortControls
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortOption={sortOption}
            onSortChange={setSortOption}
            categories={categories}
        />
        <div className="catalog-grid">
            {filteredLocations.length > 0 ? (
                filteredLocations.map((location) => (
                    <div key={location.id || location.name} className="catalog-item">
                        <h3>{location.name}</h3>
                        <p>{location.category}</p>
                    </div>
                ))
            ) : (
                <p>No locations found.</p> 
                )}   
                </div>
            </section>
    );
}