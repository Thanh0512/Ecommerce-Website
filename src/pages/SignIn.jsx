import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ON_LOGIN } from '../store/actionTypes'; // Đảm bảo đúng đường dẫn
import './SignIn.css'; 

const getUsers = () => {
    const userArr = localStorage.getItem('userArr');
    return userArr ? JSON.parse(userArr) : [];
};

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formData;
        const userArr = getUsers();

        if (!email || !password) {
            setError('Vui lòng nhập đầy đủ Email và Mật khẩu.');
            return;
        }

        const foundUser = userArr.find(
            user => user.email === email && user.password === password
        );

        if (foundUser) {
            const userData = {
                fullName: foundUser.fullName,
                email: foundUser.email,
                phone: foundUser.phone 
            };
            
            // Cập nhật Redux State
            dispatch({ type: ON_LOGIN, payload: userData });
            
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            alert(`Đăng nhập thành công! Chào mừng ${foundUser.fullName}.`);
            navigate('/'); 

        } else {
           
            setError('Email hoặc Mật khẩu không chính xác. Vui lòng thử lại.');
            setFormData(prevData => ({ ...prevData, password: '' }));
        }
    };

    return (
        <div className="signup-page"> 
            <div className="signup-container">
                <h2 className="signup-title">Sign In</h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
                   
                    <button type="submit" className="signup-button">SIGN IN</button>
                </form>
                <p className="login-link">
                    Create an account? <span onClick={() => navigate('/signup')}>Sign up</span>
                </p>
            </div>
            <div className="signup-image-decoration"></div>
        </div>
    );
};

export default SignIn;