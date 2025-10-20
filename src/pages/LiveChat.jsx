import React, { useState, useEffect } from 'react'; // <-- Thêm useEffect
import './LiveChat.css';

// Hàm tiện ích để định dạng thời gian (ví dụ: 10:59 AM)
const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Chuyển sang định dạng 12 giờ
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

const LiveChat = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState([
        { sender: 'Bot', text: 'Xin chào! Bạn có thắc mắc gì không?', time: '' },
        { sender: 'Bot', text: 'Nhập thông tin của bạn vào khung chat.', time: '' },
    ]);
 
    const [currentTime, setCurrentTime] = useState(getCurrentTime());

    useEffect(() => {
        // Cập nhật thời gian cho các tin nhắn mẫu ngay khi component mount
        setMessages(prevMessages => 
            prevMessages.map(msg => ({ 
                ...msg, 
                time: getCurrentTime() 
            }))
        );


        const timerId = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 60000);
        return () => clearInterval(timerId);
    }, []); 

    const handleToggleChat = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className="live-chat-container">
            {isOpen && (
                <div className="chat-popup">
                    <div className="chat-header">
                        <p>Customer Support</p>
                        
                        <span className="current-time">{currentTime}</span> 
                    </div>
                    
                    <div className="chat-messages">
                        
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender === 'User' ? 'user-msg' : 'bot-msg'}`}>
                                <p className="message-text">
                                    {msg.text}
                                </p>
                                
                                <span className="message-time">{msg.time}</span>
                            </div>
                        ))}
                    </div>

                    <div className="chat-input-area">
                        <input type="text" placeholder="Enter your message" />
                        <button><i className="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            )}

            <div 
                className={`chat-toggle-button ${isOpen ? 'active' : ''}`}
                onClick={handleToggleChat}
            >
                <i className="fab fa-facebook-messenger"></i> 
            </div>
        </div>
    );
};

export default LiveChat;