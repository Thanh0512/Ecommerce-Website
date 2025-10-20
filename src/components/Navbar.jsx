import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ON_LOGOUT } from '../store/actionTypes';
import './NavBar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const currentUser = useSelector(state => state.user.user);
  const handleLogout = () => {
    dispatch({ type: ON_LOGOUT });
    alert("Bạn đã đăng xuất thành công.");
        navigate('/');
        };
  const userNameDisplay = currentUser 
        ? (() => {
            const nameParts = currentUser.fullName.trim().split(/\s+/);
            let result = '';

            if (nameParts.length > 0) {
               
                result += nameParts[0]; 
            }
            if (nameParts.length > 1) {
                
                result += ' ' + nameParts[nameParts.length - 1]; 
            }

            
            return result.trim();
        })()
        : 'Guest';
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-left">
          <button onClick={() => navigate('/')} className="nav-btn">Home</button>
          <button onClick={() => navigate('/shop')} className="nav-btn">Shop</button>
        </div>
        <div className="logo">
          <h1>BOUTIQUE</h1>
        </div>
        <div className="nav-right">
          <button onClick={() => navigate('/cart')} className="nav-btn">
            Cart <i className="fas fa-shopping-cart"></i>
          </button>
          {isLoggedIn ? (
          // HIỂN THỊ KHI ĐÃ ĐĂNG NHẬP (Theo ảnh mẫu)
              <div className="user-info">
               <i className="fas fa-user"></i> {userNameDisplay}
                <span className="logout-link" onClick={handleLogout}>
                  ( Logout )
                </span>
                </div>
                    ) : (
            // HIỂN THỊ KHI CHƯA ĐĂNG NHẬP
                <button onClick={() => navigate('/signin')} className="nav-btn">
                  Login <i className="fas fa-sign-in-alt"></i>
                  </button>
               )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;