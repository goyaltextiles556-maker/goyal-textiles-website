
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ScrollSpyProvider } from './context/ScrollSpyContext';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutUsPage from './pages/AboutUsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ScrollToTop from './components/ScrollToTop';
import PageLayout from './components/PageLayout';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ReturnsPolicyPage from './pages/ReturnsPolicyPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import FAQPage from './pages/FAQPage';

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
                <Route path="/about" element={<PageLayout><AboutUsPage /></PageLayout>} />
                <Route path="/category/:categoryId" element={<PageLayout><ProductListPage /></PageLayout>} />
                <Route path="/product/:productId" element={<PageLayout><ProductDetailPage /></PageLayout>} />
                <Route path="/cart" element={<PageLayout><CartPage /></PageLayout>} />
                <Route path="/checkout" element={<PageLayout><CheckoutPage /></PageLayout>} />
                <Route path="/privacy-policy" element={<PageLayout><PrivacyPolicyPage /></PageLayout>} />
                <Route path="/terms-of-service" element={<PageLayout><TermsOfServicePage /></PageLayout>} />
                <Route path="/returns-policy" element={<PageLayout><ReturnsPolicyPage /></PageLayout>} />
                <Route path="/shipping-policy" element={<PageLayout><ShippingPolicyPage /></PageLayout>} />
                <Route path="/faq" element={<PageLayout><FAQPage /></PageLayout>} />
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
