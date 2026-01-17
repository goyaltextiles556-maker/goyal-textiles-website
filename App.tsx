
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ScrollSpyProvider } from './context/ScrollSpyContext';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ScrollToTop from './components/ScrollToTop';
import PageLayout from './components/PageLayout';

const App: React.FC = () => {
  return (
    <CartProvider>
      <HashRouter>
        <ScrollSpyProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/categories" element={<PageLayout><CategoryPage /></PageLayout>} />
                <Route path="/category/:categoryId" element={<PageLayout><ProductListPage /></PageLayout>} />
                <Route path="/product/:productId" element={<PageLayout><ProductDetailPage /></PageLayout>} />
                <Route path="/cart" element={<PageLayout><CartPage /></PageLayout>} />
                <Route path="/checkout" element={<PageLayout><CheckoutPage /></PageLayout>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ScrollSpyProvider>
      </HashRouter>
    </CartProvider>
  );
};

export default App;
