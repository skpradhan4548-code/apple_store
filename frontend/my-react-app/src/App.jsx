import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Home        from './components/Home';
import Login       from './components/Login';
import ProductPage from './components/ProductPage';
import CartPage    from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrdersPage   from './components/OrdersPage';
import CategoryPage from './components/category/CategoryPage';
import StorePage    from './components/store/StorePage';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Main store & Store hub */}
            <Route path="/"          element={<Home />} />
            <Route path="/store"     element={<StorePage />} />

            {/* Product detail */}
            <Route path="/product/:id" element={<ProductPage />} />

            {/* Cart, Checkout & Orders */}
            <Route path="/cart"      element={<CartPage />} />
            <Route path="/checkout"  element={<CheckoutPage />} />
            <Route path="/orders"    element={<OrdersPage />} />

            {/* Auth */}
            <Route path="/login"     element={<Login />} />

            {/* Authentic Category Pages */}
            <Route path="/mac"           element={<CategoryPage categorySlug="mac" />} />
            <Route path="/ipad"          element={<CategoryPage categorySlug="ipad" />} />
            <Route path="/iphone"        element={<CategoryPage categorySlug="iphone" />} />
            <Route path="/watch"         element={<CategoryPage categorySlug="watch" />} />
            <Route path="/airpods"       element={<CategoryPage categorySlug="airpods" />} />
            <Route path="/tv-home"       element={<CategoryPage categorySlug="tv-home" />} />
            <Route path="/entertainment" element={<CategoryPage categorySlug="entertainment" />} />

            {/* 404 fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
