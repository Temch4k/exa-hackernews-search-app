import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import ChatWindow from './components/ChatWindow';
import WelcomeMessage from './components/WelcomeMessage';
import Footer from './components/Footer';
import OpenAI from "openai";

const openai = new OpenAI({dangerouslyAllowBrowser:"true", apiKey: process.env.REACT_APP_OPENAI_API_KEY});

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

    const system_prompt = `You are a helpful assistant that answers questions based on 
        Hacker News webpages that will be provided to you in the Context field. 
        Use the provided context to answer questions accurately 
        and concisely. If you're not sure about something, say so. 
        
        Context: ${chatContent}`

    try{
      const response = await openai.chat.completions.create({
        model:"gpt-3.5-turbo",
        messages: [{ role: "system", content: system_prompt },
            {
                role: "user",
                content: userInputChat,
            },
        ],
    });
      
      setChatHistory([...chatHistory, { user: userInputChat, bot: response.choices[0].message.content }]);
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
      const headers = {
        'x-api-key': process.env.REACT_APP_EXA_API_KEY,
        'Content-Type': 'application/json'
      };
      const body = {
        ids: [resultId]
      };

      const response = await axios({
        method: 'post',
        url: process.env.REACT_APP_EXA_API_URL + '/contents',
        headers: headers,
        data: body});

    setChatContent(response.data.results[0].text);
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
      const headers = {
        'x-api-key': process.env.REACT_APP_EXA_API_KEY,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      };

      const body = {
        query: userInput,
        numResults: 6,
        includeDomains: ['news.ycombinator.com/']
      };

      const response = await axios({
        method: 'post',
        url: process.env.REACT_APP_EXA_API_URL + '/search',
        headers: headers,
        data: body
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