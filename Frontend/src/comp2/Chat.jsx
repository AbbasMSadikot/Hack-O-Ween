import React, { useState, useRef, useEffect } from "react";
import { sendMessageStream } from "../Api/api";
import "./chat.css";
import { RiSendPlane2Fill } from "react-icons/ri";
import { AiOutlineSound } from "react-icons/ai";
export function Chat() {
  const [messages, setMessages] = useState([
    {
      sender: 'ArchLync AI',
      text: "Welcome to ArchLync! I'm your intelligent cybersecurity analyst. Paste any suspicious SMS, email, link, or text here. I will check it for scams, phishing, or threats, assign a risk level, and tell you exactly what steps to follow. I will only assist with cyber-related queries. ",
      id: 'initial'
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const conversationEndRef = useRef(null);
currentUtterance
  useEffect(() => {
  const conversation = conversationEndRef.current?.parentNode; 
  if (!conversation) return;
  const isNearBottom =
    conversation.scrollHeight - conversation.scrollTop - conversation.clientHeight < 50;

  if (isNearBottom) {
    conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);

  const formatText = (text) => {
    return text.replace(/\n/g, "<br />");
  };
 const handleSend = async (e) => {
  e.preventDefault();
  const userPrompt = input.trim();
  if (!userPrompt || isLoading) return;
  setMessages(prev => prev.filter(msg => msg.id !== 'initial'));

  const newUserMessage = { sender: 'You', text: userPrompt, id: Date.now() + 'user' };
  setMessages(prev => [...prev, newUserMessage]);
  setInput("");
  setIsLoading(true);

  const aiPlaceholderId = Date.now() + 'ai';
  const aiPlaceholder = { sender: 'ArchLync AI', text: '', id: aiPlaceholderId };
  setMessages(prev => [...prev, aiPlaceholder]);

  try {
    const reader = await sendMessageStream(userPrompt);
    const decoder = new TextDecoder('utf-8');
    let fullResponseText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      const cleanedChunk = chunk.replace(/\*/g, '');
      fullResponseText += cleanedChunk;

      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === aiPlaceholderId ? { ...msg, text: fullResponseText } : msg
        )
      );
    }
  } catch (error) {
    console.error("Error fetching AI response:", error);
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === aiPlaceholderId ? { ...msg, text: `AI Error: ${error.message}` } : msg
      )
    );
  } finally {
    setIsLoading(false);
  }
};

  const handleReadAloud = (msgId, text) => {
    if (!('speechSynthesis' in window)) {
      console.error("Text-to-Speech not supported");
      return;
    }

    if (playingId === msgId) {
      window.speechSynthesis.cancel();
      setCurrentUtterance(null);
      setPlayingId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => {
      setCurrentUtterance(null);
      setPlayingId(null);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setCurrentUtterance(utterance);
    setPlayingId(msgId);
  };

  return (
    <div className="chat-container">
      <div className="conversation-area">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender === 'You' ? 'user-message' : 'ai-message'}`}>
            <div
              className="message-bubble"
              style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}
              dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
            ></div>
            {msg.sender === 'ArchLync AI' && msg.text.length > 0 && (
              <AiOutlineSound
                className={`sound-icon ${playingId === msg.id ? 'playing' : ''}`}
                onClick={() => handleReadAloud(msg.id, msg.text)}
                title={playingId === msg.id ? "Pause" : "Play"}
              />
            )}
          </div>
        ))}

        {isLoading && (
          <div className="message ai-message">
            <div className="message-bubble loading-indicator">
              ... ArchLync AI is analyzing threat
            </div>
          </div>
        )}

        <div ref={conversationEndRef} />
      </div>

      <form className="input-area" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste the suspicious text/link for scam analysis..."
          disabled={isLoading}
        />
        <button
          type="submit"
          className="send-button"
          disabled={isLoading || !input.trim()}
        >
          <RiSendPlane2Fill size={22} />
        </button>
      </form>
    </div>
  );
}
