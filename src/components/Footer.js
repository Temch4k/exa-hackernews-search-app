
import React from 'react';

function Footer() {
    return (
        <div className="footer">
            <span>Powered by</span>
        <img 
          src="exa-logo.png" 
          alt="Exa Logo" 
          className="exa-logo logo-button" 
          onClick={() => window.open("https://exa.ai", '_blank')}
        />
      </div>
    )
}

export default Footer;