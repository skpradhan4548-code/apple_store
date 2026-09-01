import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Home        from './componets/Home';
import Login       from './componets/login';
import ProductPage from './componets/ProductPage';
import CartPage    from './componets/CartPage';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Main store */}
            <Route path="/"          element={<Home />} />

            {/* Product detail */}
            <Route path="/product/:id" element={<ProductPage />} />

            {/* Cart */}
            <Route path="/cart"      element={<CartPage />} />

            {/* Auth */}
            <Route path="/login"     element={<Login />} />

            {/* Category browse routes — all show Home for now */}
            <Route path="/mac"         element={<Home />} />
            <Route path="/ipad"        element={<Home />} />
            <Route path="/iphone"      element={<Home />} />
            <Route path="/watch"       element={<Home />} />
            <Route path="/airpods"     element={<Home />} />
            <Route path="/tv-home"     element={<Home />} />
            <Route path="/entertainment" element={<Home />} />

            {/* 404 fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
