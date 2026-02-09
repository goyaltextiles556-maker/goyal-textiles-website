
// FIX: Define ImportMetaEnv and ImportMeta interfaces locally to resolve vite/client type issues.
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import { indianStates, states } from '../data/locations';
import PolicySummary from '../components/PolicySummary';
import { createRipple } from '../utils/rippleEffect';

const emailProviders = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'icloud.com', 'proton.me'];

const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    address1: '',
    address2: '',
    address3: '',
    state: '',
    city: '',
    pincode: '',
    email: '',
    phone: '',
    instructions: ''
  });

  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  // Mock shipping and tax
  const shipping = subtotal > 0 ? 100 : 0;
  const tax = 0; // Tax removed as per request
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: numericValue }));
      }
      return;
    }
    
    if (name === 'pincode') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length <= 6) {
        setFormData(prev => ({ ...prev, [name]: numericValue }));
      }
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'email') {
      const atIndex = value.indexOf('@');
      if (atIndex === -1 && value.length > 0) {
        setEmailSuggestions(emailProviders.map(provider => `${value}@${provider}`));
      } else {
        setEmailSuggestions([]);
      }
    }
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value, city: '' })); // Reset city on state change
  };

  const selectEmailSuggestion = (email: string) => {
    setFormData(prev => ({ ...prev, email }));
    setEmailSuggestions([]);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    setIsProcessing(true);

    const customerDetails = {
      name: `${formData.firstName} ${formData.middleName} ${formData.lastName}`.replace(/\s+/g, ' ').trim(),
      email: formData.email,
      phone: formData.phone,
      address: `${formData.address1}, ${formData.address2}, ${formData.address3 ? formData.address3 + ',' : ''} ${formData.city}, ${formData.state} - ${formData.pincode}`,
    };

    // FIX: Types for import.meta.env are now defined at the top of the file.
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    if (!apiBaseUrl) {
        alert('API URL is not configured. Please contact support.');
        setIsProcessing(false);
        return;
    }
    
    try {
      const response = await fetch(`${apiBaseUrl}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          cartItems,
          customerDetails,
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to place order. Please try again.';
        try {
            const errorData = await response.json();
            if (errorData && errorData.error) {
                errorMessage = `Error: ${errorData.error}`;
            } else {
                 errorMessage = `Failed to place order. Server responded with status: ${response.status}`;
            }
        } catch (e) {
            errorMessage = `An error occurred during checkout. Please ensure the backend server is running and accessible.`;
        }
        throw new Error(errorMessage);
      }

      setIsOrderPlaced(true);
      clearCart();

    } catch (error) {
      console.error('Checkout error:', error);
      alert(error instanceof Error ? error.message : 'An unknown error occurred.');
      setIsProcessing(false);
    }
  };
  
  if (isOrderPlaced) {
    return (
        <div className="text-center py-20 max-w-2xl mx-auto animate-fade-in-up">
            <div className="mb-4">
              <div className="inline-block w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-display font-bold text-primary-blue mb-4">Thank You!</h1>
            <p className="text-lg text-gray-700 mb-2">Your order has been placed successfully.</p>
            <p className="text-gray-600 mb-10">We will contact you shortly regarding payment and shipping details.</p>
            <div className="w-64 mx-auto">
                <Button onClick={() => navigate('/')}>Continue Shopping</Button>
            </div>
        </div>
    );
  }

  if (cartItems.length === 0 && !isOrderPlaced) {
      return (
          <div className="text-center py-20 animate-fade-in-up">
              <h1 className="text-3xl font-display font-bold text-primary-blue mb-4">Your Cart is Empty</h1>
              <p className="mt-4 text-gray-600 text-lg">You can't proceed to checkout without items.</p>
              <div className="w-64 mx-auto mt-8">
                <Button onClick={() => navigate('/')}>Browse Fabrics</Button>
              </div>
          </div>
      );
  }

  const formControlClasses = "block w-full px-4 py-3 text-sm border border-gray-300/60 rounded-lg focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue placeholder:text-gray-500/70 bg-white transition-all duration-300 ease-out hover:border-primary-blue/40";

  return (
    <div className="min-h-screen bg-gradient-to-b from-off-white/40 to-off-white animate-fade-in-up">
      {/* Header */}
      <div className="border-b border-gray-200/80 py-8 px-4 sm:px-6 hover:shadow-sm transition-shadow duration-300 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-primary-blue">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        {/* Required Fields Notice */}
        <div className="mb-10 p-5 sm:p-6 bg-blue-50/80 border border-blue-200/80 rounded-xl animate-fade-in-up">
          <p className="text-sm sm:text-base text-blue-900">
            <span className="font-bold">Required fields:</span> Fields marked with <span className="text-red-600 font-bold">*</span> are necessary to complete your order.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Shipping Information Form */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
            
            {/* Name Section */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h3 className="text-base font-bold text-gray-900 mb-4 hover:text-primary-blue transition-colors duration-300">Full Name <span className="text-red-600">*</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" required className={formControlClasses} aria-label="First Name"/>
                <input type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} placeholder="Middle Name (optional)" className={formControlClasses} aria-label="Middle Name"/>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" required className={formControlClasses} aria-label="Last Name"/>
              </div>
            </div>
            
            {/* Address Section */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <h3 className="text-base font-bold text-gray-900 mb-4 hover:text-primary-blue transition-colors duration-300">Delivery Address <span className="text-red-600">*</span></h3>
              <div className="space-y-3 sm:space-y-4">
                <input type="text" name="address1" value={formData.address1} onChange={handleInputChange} placeholder="Street Address" required className={formControlClasses}/>
                <input type="text" name="address2" value={formData.address2} onChange={handleInputChange} placeholder="City / Locality" required className={formControlClasses}/>
                <input type="text" name="address3" value={formData.address3} onChange={handleInputChange} placeholder="Landmark or Additional Details (optional)" className={formControlClasses}/>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <select name="state" value={formData.state} onChange={handleStateChange} required className={formControlClasses}>
                    <option value="" disabled>Select State</option>
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <select name="city" value={formData.city} onChange={handleInputChange} required disabled={!formData.state} className={`${formControlClasses} disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60`}>
                    <option value="" disabled>Select City</option>
                    {formData.state && indianStates[formData.state]?.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode (6 digits)" required pattern="[0-9]{6}" maxLength={6} className={formControlClasses}/>
                </div>
              </div>
            </div>
            
            {/* Contact Section */}
            <div className={`relative animate-fade-in-up ${emailSuggestions.length > 0 ? 'z-10' : ''}`} style={{ animationDelay: '200ms' }}>
              <h3 className="text-base font-bold text-gray-900 mb-4 hover:text-primary-blue transition-colors duration-300">Contact Information <span className="text-red-600">*</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="relative">
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" required className={formControlClasses}/>
                  {emailSuggestions.length > 0 && (
                    <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200/80 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                      {emailSuggestions.map(suggestion => (
                        <div key={suggestion} onClick={() => selectEmailSuggestion(suggestion)} onMouseDown={createRipple} className="px-4 py-3 text-sm text-gray-700 hover:bg-blue-50/70 cursor-pointer border-b last:border-b-0 transition-colors duration-300 font-medium overflow-hidden relative">
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-stretch rounded-lg border border-gray-300/60 overflow-hidden hover:border-primary-blue/40 transition-colors duration-300 focus-within:ring-2 focus-within:ring-primary-blue/50 focus-within:border-primary-blue">
                    <span className="inline-flex items-center px-4 bg-white text-gray-700 font-semibold text-sm whitespace-nowrap border-r border-gray-300/60">
                      🇮🇳 +91
                    </span>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required pattern="[0-9]{10}" placeholder="Phone Number (10 digits)" className="flex-1 px-4 py-3 text-sm placeholder:text-gray-500/70 bg-white focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions Section */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              <h3 className="text-base font-bold text-gray-900 mb-4 hover:text-primary-blue transition-colors duration-300">Special Instructions (optional)</h3>
              <textarea id="instructions" name="instructions" value={formData.instructions} onChange={handleInputChange} rows={4} placeholder="Any delivery notes or special requests..." className={`${formControlClasses} resize-none`}></textarea>
            </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="sticky top-24 z-0 bg-white border border-gray-200/80 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-primary-blue/20 transition-all duration-300">
              <h2 className="text-lg font-bold text-gray-900 mb-6 hover:text-primary-blue transition-colors duration-300">Order Summary</h2>
              
              {/* Product List */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200/80 max-h-72 overflow-y-auto pr-2">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex gap-4 hover:bg-blue-50/40 p-2 rounded-lg transition-colors duration-300">
                    <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200/60 hover:shadow-md transition-shadow duration-300"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.product.id}`} className="text-sm font-medium text-gray-900 leading-snug hover:text-primary-blue transition-colors duration-300 line-clamp-2">
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-gray-500 mt-1.5">Qty: {item.quantity}</p>
                      <p className="text-base font-bold text-primary-blue mt-2 hover:text-blue-800 transition-colors duration-300">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Price Breakdown */}
              <div className="border-t border-gray-200/80 pt-4 space-y-2.5 mb-6">
                 <div className="flex justify-between text-sm hover:bg-blue-50/40 p-1.5 rounded-md transition-colors duration-300"><span className="text-gray-600 font-medium">Subtotal</span><span className="text-gray-900 font-semibold">₹{subtotal.toLocaleString()}</span></div>
                 <div className="flex justify-between text-sm hover:bg-blue-50/40 p-1.5 rounded-md transition-colors duration-300"><span className="text-gray-600 font-medium">Shipping</span><span className="text-gray-900 font-semibold">₹{shipping.toLocaleString()}</span></div>
              </div>
              <div className="border-t border-gray-200/80 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold text-gray-900">Total Amount</p>
                  <p className="text-2xl font-bold text-primary-blue hover:text-blue-800 transition-colors duration-300">₹{total.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                </div>
              </div>
              <Button type="submit" disabled={isProcessing} className="w-full py-3.5 text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                {isProcessing ? 'Processing Order...' : 'Complete Purchase'}
              </Button>
            </div>
          </div>
        </form>
        <div className="mt-14 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <PolicySummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
