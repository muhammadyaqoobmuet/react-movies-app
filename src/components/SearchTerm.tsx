import React from "react";

// Define the props type
interface SearchTermProps {
  readonly searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchTerm: React.FC<SearchTermProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
         
        />
      </div>
    </div>
  );
};

export default SearchTerm;
