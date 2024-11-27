import React from 'react';

function SearchInput({ userInput, setUserInput, handleSearch, setIsChatOpen, setChatHistory, setChatContent }) {
  return (
    <input
      type="text"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSearch();
          setIsChatOpen(false);
          setChatHistory([]);
          setChatContent([]);
        }
      }}
      placeholder="Search HackerNews..."
      className="input-field"
    />
  );
}

export default SearchInput;