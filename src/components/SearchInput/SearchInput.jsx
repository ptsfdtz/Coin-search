import React from "react";
import "./SearchInput.css";

const SearchInput = () => {
    return (
        <div className="search-container">
            <input type="text" required className="search-input" />
            <span className="input-label">Coin Name</span>
        </div>
    );
};

export default SearchInput;