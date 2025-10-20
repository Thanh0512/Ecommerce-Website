import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; 
const getUsers = () => {
    const userArr = localStorage.getItem('userArr');
    return userArr ? JSON.parse(userArr) : [];
};

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        setError(''); 
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        const { fullName, email, password, phone } = formData;
        const userArr = getUsers();

        if (!fullName || !email || !password || !phone) {
            setError('Vui lòng nhập đầy đủ tất cả các trường.');
            return;
        }

        if (userArr.some(user => user.email === email)) {
            setError('Email này đã được sử dụng. Vui lòng sử dụng Email khác.');
            return;
        }

        if (password.length < 8) {
            setError('Mật khẩu phải có ít nhất 8 ký tự.');
            return;
        }

        const newUser = { fullName, email, password, phone };

        const updatedUserArr = [...userArr, newUser];

        localStorage.setItem('userArr', JSON.stringify(updatedUserArr));
        
        alert('Đăng ký thành công! Bạn sẽ được chuyển đến trang Đăng nhập.');
        
        navigate('/signin');
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2 className="signup-title">Sign Up</h2>

                <form className="signup-form" onSubmit={handleSignUp}>
                    
                    {error && <p className="error-message">{error}</p>}
                    
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <button type="submit" className="signup-button">
                        SIGN UP
                    </button>
                </form>

                <p className="login-link">
                    Already have an account? <span onClick={() => navigate('/signin')}>Login? Click</span>
                </p>
            </div>
            
            <div className="signup-image-decoration">
              
            </div>
        </div>
    );
};

export default SignUp;