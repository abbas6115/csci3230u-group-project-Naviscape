import React from 'react';

// making default values 
export default function SearchFilterSortControls({
    searchQuery,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    sortOption,
    onSortChange,
    categories = []
}) {
    return (
        <div className="search-filter-sort-controls">
            <form className="search-content" action="/search" method="get">
                {/* Search Bar */}
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search locations..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </form>
            <div className='filter-dropdown-list'>
                {/* Category Filter */}
                <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                {/* Sort Options */}
                <select
                    value={sortOption}
                    onChange={(e) => onSortChange(e.target.value)}
                >
                    <option value="name-ascending">Name (A-Z)</option>
                    <option value="name-descending">Name (Z-A)</option>
                    <option value="rating-ascending">Rating (Low to High)</option>
                    <option value="rating-descending">Rating (High to Low)</option>
                </select>
            </div>
        </div>
    );
}