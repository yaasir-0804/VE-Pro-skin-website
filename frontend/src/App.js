import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import SkinQuizPage from "./pages/SkinQuizPage";
import QuizResultsPage from "./pages/QuizResultsPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import AboutPage from "./pages/AboutPage";
import CampaignThankYouPage from "./pages/CampaignThankYouPage";

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    updateCartCount();
    
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/quiz" element={<SkinQuizPage />} />
          <Route path="/quiz/results" element={<QuizResultsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/campaign-thank-you" element={<CampaignThankYouPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
