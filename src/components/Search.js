import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/query?search=${encodeURIComponent(searchValue)}`);
  };

  return (
    <div style={{ margin: "1em 20%", textAlign: "right" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <input
          style={{ border: "none", borderBottom: "1px solid black" }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          style={{ background: "none", border: "none" }}
          onClick={handleSearch}
        >
          <span className="material-symbols-outlined movie-search">search</span>
        </button>
      </div>
    </div>
  );
};

export default Search;
