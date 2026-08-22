import { Link, useLocation } from "react-router-dom";
import { FaCoins } from "react-icons/fa";
import SearchInput from "../SearchInput/SearchInput";
import "./Navbar.css";

const Navbar = ({ query, onQueryChange }) => {
  const isMarketPage = useLocation().pathname === "/";

  return (
    <header className="navbar">
      <Link className="brand" to="/" aria-label="Coin search home">
        <FaCoins aria-hidden="true" />
        <span>Coin<span>Search</span></span>
      </Link>
      {isMarketPage && <SearchInput query={query} onQueryChange={onQueryChange} />}
    </header>
  );
};

export default Navbar;
