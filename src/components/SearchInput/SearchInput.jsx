import { FaSearch, FaTimes } from "react-icons/fa";
import "./SearchInput.css";

const SearchInput = ({ query, onQueryChange }) => (
    <div className="search-container">
      <FaSearch aria-hidden="true" className="search-icon" />
      <label className="sr-only" htmlFor="coin-search">Search coins</label>
      <input
        id="coin-search"
        type="search"
        className="search-input"
        placeholder="Search coins"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      {query && <button className="clear-search" type="button" aria-label="Clear search" onClick={() => onQueryChange("")}><FaTimes aria-hidden="true" /></button>}
    </div>
);

export default SearchInput;
