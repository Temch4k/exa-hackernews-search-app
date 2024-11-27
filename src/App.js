import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import ChatWindow from './components/ChatWindow';
import WelcomeMessage from './components/WelcomeMessage';
import Footer from './components/Footer';
function App() {
  const [userInput, setUserInput] = useState("");
  const [userInputChat, setUserInputChat] = useState("");
  const [resultsFromSearchQuery, setResultsFromSearchQuery] = useState({});
  const [welcomeMessage, setWelcomeMessage] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatContent, setChatContent] = useState("");


  const handleChatQuery = async () => {
    if (!userInputChat) return;
    
    console.log("Sending chat query with:", {
      user_input: userInputChat,
      page_content: chatContent
    });

    try {
      const response = await axios.post("http://localhost:8080/query_exa_chat", {
        user_input: userInputChat,
        page_content: chatContent ? JSON.stringify(chatContent) : "",
      });
      
      console.log("bot response:", response.data.bot_response)
      setChatHistory([...chatHistory, { user: userInputChat, bot: response.data.bot_response }]);
      setUserInputChat("");
    } catch (error) {
      console.error("Error details:", error.response);
      setChatHistory([
        ...chatHistory,
        { user: userInputChat, bot: "Sorry, something went wrong." },
      ]);
    }
  };

  const handleContentQuery = async (resultId) => {
    try {
      const ContentResponse = await axios.post("http://localhost:8080/query_exa_content", {
        user_input: resultId,
    });
    setChatContent(ContentResponse);
  }catch (error) {
      console.error("Error querying Exa's contents:", error);
    }
  }

  const handleChatClick = async (resultId) => {
    if (!isChatOpen) {
      await handleContentQuery(resultId);
      setIsChatOpen(true);
      setChatHistory([]);
    } else {
      setIsChatOpen(false);
    }
  };

  const handleSearch = async () => {
    if (!userInput){
      setChatHistory([]);
      setWelcomeMessage(true);
      setIsChatOpen(false)
      return;
    } 
    try {
      const response = await axios.post("http://localhost:8080/query_exa_search", {
        user_input: userInput,
      });
      const botResponse = response.data.results;
      setResultsFromSearchQuery({ user: userInput, bot: botResponse });
      setUserInput("");
    } catch (error) {
      console.error("Error querying Exa:", error);
      console.log(resultsFromSearchQuery)
    } finally {
      setWelcomeMessage(false);
    }
  };

  useEffect(() => {
    console.log("isChatOpen changed to:", isChatOpen);
  }, [isChatOpen]);

  return (
    <div className="container">
      <Header 
        userInput={userInput}
        setUserInput={setUserInput}
        handleSearch={handleSearch}
        setWelcomeMessage={setWelcomeMessage}
        setIsChatOpen={setIsChatOpen}
        setChatHistory={setChatHistory}
        setChatContent={setChatContent}
      />
      {welcomeMessage && <WelcomeMessage />}
      {!welcomeMessage && (
        <div className={`main-container ${isChatOpen ? 'with-chat' : ''}`}>
          <SearchResults 
            results={resultsFromSearchQuery} 
            handleChatClick={handleChatClick} 
          />
          {isChatOpen && (
            <ChatWindow 
              chatHistory={chatHistory}
              userInputChat={userInputChat}
              setUserInputChat={setUserInputChat}
              handleChatQuery={handleChatQuery}
            />
          )}
        </div>
      )}
      <Footer/>
    </div>
  );
}

export default App;