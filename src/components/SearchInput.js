import React from 'react';

function SearchInput({ userInput, setUserInput, handleSearch }) {
  return (
    <input
      type="text"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      }}
      placeholder="Search HackerNews..."
      className="input-field"
    />
  );
}

export default SearchInput;