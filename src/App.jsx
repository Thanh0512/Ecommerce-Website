  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import HomePage from './pages/HomePage';
  import ShopPage from './pages/ShopPage';
  import ProductDetail from "./pages/ProductDetail";
  import CartPage from "./pages/CartPage";
  import CheckoutPage from "./pages/CheckoutPage";
  import SignIn from "./pages/SignIn";
  import SignUp from "./pages/SignUp";
  import LiveChat from "./pages/LiveChat";


  function App() {
    return (
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/detail/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} /> 
          </Routes>
        <LiveChat />
      </BrowserRouter>
    );
  }

  export default App;