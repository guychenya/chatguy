import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: message }]
    setMessages(newMessages)
    setMessage('')
    
    // Simulate AI response
    setTimeout(() => {
      setMessages([
        ...newMessages, 
        { 
          role: 'assistant', 
          content: `Hello! I'm ChatGuy, a demo AI assistant. This is a placeholder response to your message: "${message}"` 
        }
      ])
    }, 1000)
  }

  return (
    <div className="chat-container">
      <header>
        <h1>ChatGuy</h1>
        <p>AI Assistant Chat Application</p>
      </header>
      
      <main className="chat-messages">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h2>Welcome to ChatGuy!</h2>
            <p>Start a conversation by typing a message below.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div className="message-content">{msg.content}</div>
            </div>
          ))
        )}
      </main>
      
      <form className="input-area" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          aria-label="Message input"
        />
        <button type="submit" aria-label="Send message">Send</button>
      </form>
    </div>
  )
}

export default App