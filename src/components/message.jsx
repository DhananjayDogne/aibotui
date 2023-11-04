import React, { useState } from 'react';
import axios from 'axios'
function MentalHealthChatbot() {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a dictionary with the "user_input" key and value
        

        // Add the user's message to the chat history
        console.log(userInput);
        setChatHistory([...chatHistory, { role: 'user', text: userInput }]);
        
        axios.post('http://127.0.0.1:5000/get_response',
        { "user_input": userInput }).then(
            (res) => setChatHistory([...chatHistory, { role: 'bot', text: res.data.response }]) 
        ).catch((err) => { console.log(err) });
        
        setUserInput('');
    }
        return (
            <div className="mental-health-chatbot">
                <div id="chat-box">
                    {chatHistory.map((message, index) => (
                        <p key={index}>
                            <strong>{message.role === 'user' ? 'You' : 'Bot'}:</strong> {message.text}
                        </p>
                    ))}
                </div>
                <form id="chat-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="user-input"
                        placeholder="Enter your message..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    <input type="submit" value="Send" />
                </form>
            </div>
        );
    
}
export default MentalHealthChatbot;
