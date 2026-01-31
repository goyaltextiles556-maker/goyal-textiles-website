
import React from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ScrollSpyProvider } from './context/ScrollSpyContext';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
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
      <ReactRouterDOM.HashRouter>
        <ScrollSpyProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <ReactRouterDOM.Routes>
                <ReactRouterDOM.Route path="/" element={<HomePage />} />
                <ReactRouterDOM.Route path="/category/:categoryId" element={<PageLayout><ProductListPage /></PageLayout>} />
                <ReactRouterDOM.Route path="/product/:productId" element={<PageLayout><ProductDetailPage /></PageLayout>} />
                <ReactRouterDOM.Route path="/cart" element={<PageLayout><CartPage /></PageLayout>} />
                <ReactRouterDOM.Route path="/checkout" element={<PageLayout><CheckoutPage /></PageLayout>} />
                <ReactRouterDOM.Route path="/privacy-policy" element={<PageLayout><PrivacyPolicyPage /></PageLayout>} />
                <ReactRouterDOM.Route path="/terms-of-service" element={<PageLayout><TermsOfServicePage /></PageLayout>} />
                <ReactRouterDOM.Route path="/returns-policy" element={<PageLayout><ReturnsPolicyPage /></PageLayout>} />
                <ReactRouterDOM.Route path="/shipping-policy" element={<PageLayout><ShippingPolicyPage /></PageLayout>} />
                <ReactRouterDOM.Route path="/faq" element={<PageLayout><FAQPage /></PageLayout>} />
              </ReactRouterDOM.Routes>
            </main>
            <Footer />
          </div>
        </ScrollSpyProvider>
      </ReactRouterDOM.HashRouter>
    </CartProvider>
  );
};

export default App;
