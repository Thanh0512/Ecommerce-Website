import React, { useState, useEffect } from 'react';
import './LiveChat.css';

// Hàm tiện ích định dạng thời gian
const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
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
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    // Gắn thời gian cho tin nhắn ban đầu
    setMessages(prev =>
      prev.map(msg => ({
        ...msg,
        time: getCurrentTime(),
      }))
    );

    // Cập nhật thời gian mỗi phút
    const timerId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);

    return () => clearInterval(timerId);
  }, []);

  const handleToggleChat = () => {
    setIsOpen(prev => !prev);
  };

  // 🧠 Hàm tạo phản hồi tự động của bot
  const generateBotReply = (userText) => {
    const text = userText.toLowerCase();
    if (text.includes('giá') || text.includes('bao nhiêu')) {
      return 'Bạn vui lòng cho mình biết mã sản phẩm để mình báo giá chính xác nhé!';
    } else if (text.includes('mua') || text.includes('đặt hàng')) {
      return 'Bạn có thể thêm sản phẩm vào giỏ hàng và thanh toán trực tiếp trên website.';
    } else if (text.includes('hello') || text.includes('chào')) {
      return 'Xin chào bạn! Mình có thể giúp gì cho bạn hôm nay? 😊';
    } else if (text.includes('cảm ơn')) {
      return 'Rất vui được giúp bạn! ❤️';
    } else {
      return 'Cảm ơn bạn đã nhắn tin! Bộ phận hỗ trợ sẽ liên hệ sớm nhất có thể.';
    }
  };

  // 📨 Hàm gửi tin nhắn
  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newMessage = {
      sender: 'User',
      text: userInput,
      time: getCurrentTime(),
    };

    setMessages(prev => [...prev, newMessage]);
    setUserInput('');

    // Bot tự trả lời sau 1.2 giây
    setTimeout(() => {
      const botReply = {
        sender: 'Bot',
        text: generateBotReply(userInput),
        time: getCurrentTime(),
      };
      setMessages(prev => [...prev, botReply]);
    }, 1200);
  };

  // Gửi tin nhắn khi nhấn Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
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
                <p className="message-text">{msg.text}</p>
                <span className="message-time">{msg.time}</span>
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSendMessage}>
              <i className="fas fa-paper-plane"></i>
            </button>
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
