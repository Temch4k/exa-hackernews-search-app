import React from 'react';

function SearchResults({ results, handleChatClick }) {
  return (
    <div className="result-container">
      <div className="chat-entry">
        <h3 className="search-results-title">Search Results for: "{results.user}"</h3> 
        {results.bot.results.map((result, index) => (
          <ul key={index} className="individual-result-list">
            <div className="result-URL-Date-container">
              <a href={result.url}>{result.url}</a>
              <span className="result-date">{result.publishedDate.split('T')[0]}</span>
            </div>
            <div className="title-container">
              <li className="result-title" onClick={() => window.open(result.url, '_blank')}>{result.title}</li>
              <input 
                type="image" 
                alt="chat icon" 
                src="chat.png" 
                className="chat-icon" 
                width="20" 
                height="20"
                onClick={() => handleChatClick(result.id)} 
              />
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;