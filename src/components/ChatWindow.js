import React from 'react';

function ChatWindow({ chatHistory, userInputChat, setUserInputChat, handleChatQuery }) {
  return (
    <div className="chat-container">
      <div className="chat-content">
        <h2 className="chat-title">Chat with Results</h2>
        <div className="chat-history">
          {chatHistory.map((entry, index) => (
            <div key={index} className="chat-message">
              <div className="user-message">
                <strong>You:</strong> 
                <p>{entry.user}</p>
              </div>
              <div className="bot-message">
                <strong>Bot:</strong> 
                <p>{entry.bot}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            value={userInputChat}
            onChange={(e) => setUserInputChat(e.target.value)}
            placeholder="Ask something..."
            className="chat-input"
            onKeyPress={(e) => e.key === 'Enter' && handleChatQuery()}
          />
          {/* <button 
            onClick={handleChatQuery}
            className="chat-submit"
          >
            Send
          </button> */}
          <input width="20%" alt="Send" onClick={handleChatQuery} type="image" src="/send.png"/>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;