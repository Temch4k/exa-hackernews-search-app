import React from 'react';

function WelcomeMessage() {
  return (
    <div className="welcome-message">
      <h1>Welcome to</h1>
      <img src="/hacknewslogo.png" alt="Hacker News Logo" className="logo-button" width="20%" onClick={() => window.open("https://news.ycombinator.com", '_blank')} />
      <h1>powered by</h1>
      <img src="/exa-logo.png" alt="Exa Logo" className="logo-button" width="20%" onClick={() => window.open("https://exa.ai", '_blank')} />
    </div>
  );
}

export default WelcomeMessage;