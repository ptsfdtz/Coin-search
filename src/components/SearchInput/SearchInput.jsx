import React from "react";
import "./SearchInput.css";

const SearchInput = ({ coinName, setCoinName }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        required
        className="search-input"
        placeholder={coinName || ""}
        value={coinName}
        onChange={(e) => setCoinName(e.target.value)}
      />
      <span className="input-label">Coin Name</span>
    </div>
  );
};

export default SearchInput;
