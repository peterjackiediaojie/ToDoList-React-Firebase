import React, { useContext, useState, useCallback } from "react";
import ListsContext from "../context/Lists";

function SearchBox() {
  const { handleSearch } = useContext(ListsContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = useCallback(
    (event) => {
      const term = event.target.value;
      setSearchTerm(term);
      handleSearch(term);
    },
    [handleSearch]
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
    </div>
  );
}

export default SearchBox;
