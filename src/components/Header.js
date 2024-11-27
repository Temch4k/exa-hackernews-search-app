import React from 'react';
import SearchInput from './SearchInput.js';

function Header({ userInput, setUserInput, handleSearch, setWelcomeMessage, setIsChatOpen, setChatHistory, setChatContent }) {
  return (
    <div className="header">
      <div className="logo-container">
        <img src="/logo.png" alt="Exa Logo" className="logo-button" width="5%" onClick={() => {
          setWelcomeMessage(true);
          setIsChatOpen(false);
          setChatHistory([]);
          setChatContent([]);
        }} />
        {/* <div className="title">
          <span>Exa</span>
          <span>HackerNews Search</span>
        </div> */}
      </div>
      <SearchInput 
        userInput={userInput}
        setUserInput={setUserInput}
        handleSearch={handleSearch}
      />
    </div>
  );
}

export default Header; 