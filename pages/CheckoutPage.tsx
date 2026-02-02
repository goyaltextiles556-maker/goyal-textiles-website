
// FIX: Manually define types for import.meta.env since vite/client types could not be resolved.
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
  }
}

import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import Button from '../components/Button';
import { indianStates, states } from '../data/locations';
import PolicySummary from '../components/PolicySummary';

const emailProviders = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'icloud.com', 'proton.me'];

const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = ReactRouterDOM.useNavigate();
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
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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
        <div className="text-center py-20 max-w-2xl mx-auto">
            <h1 className="text-4xl font-display font-bold text-primary-blue mb-4">Thank You!</h1>
            <p className="text-lg text-gray-700">Your order has been placed successfully.</p>
            <p className="text-gray-600 mt-2">We will contact you shortly regarding payment and shipping.</p>
            <div className="mt-8">
                <Button onClick={() => navigate('/')}>Continue Shopping</Button>
            </div>
        </div>
    );
  }

  if (cartItems.length === 0 && !isOrderPlaced) {
      return (
          <div className="text-center py-20">
              <h1 className="text-2xl font-semibold">Your Cart is Empty</h1>
              <p className="mt-4 text-gray-600">You can't proceed to checkout without items.</p>
              <Button className="mt-6" onClick={() => navigate('/')}>Browse Fabrics</Button>
          </div>
      );
  }

  const formControlClasses = "block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-blue focus:border-transparent sm:text-sm placeholder:text-gray-400 bg-white transition";

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-display font-bold text-primary-blue text-center mb-16">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Shipping Information Form */}
        <div className="md:col-span-3">
          <h2 className="text-2xl font-display font-bold text-primary-blue mb-6">Delivery Details</h2>
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
            
            {/* Name Section */}
            <fieldset className="border-b border-gray-200 pb-6">
              <legend className="block text-sm font-semibold text-gray-900 mb-3">Full Name</legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" required className={formControlClasses} aria-label="First Name"/>
                <input type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} placeholder="Middle Name" className={formControlClasses} aria-label="Middle Name"/>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" required className={formControlClasses} aria-label="Last Name"/>
              </div>
            </fieldset>
            
            {/* Address Section */}
            <fieldset className="border-b border-gray-200 pb-6">
              <legend className="block text-sm font-semibold text-gray-900 mb-3">Address</legend>
              <div className="space-y-4">
                <input type="text" name="address1" value={formData.address1} onChange={handleInputChange} placeholder="Street Address" required className={formControlClasses}/>
                <input type="text" name="address2" value={formData.address2} onChange={handleInputChange} placeholder="City / Locality" required className={formControlClasses}/>
                <input type="text" name="address3" value={formData.address3} onChange={handleInputChange} placeholder="Landmark or Additional Details" className={formControlClasses}/>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <select name="state" value={formData.state} onChange={handleStateChange} required className={formControlClasses}>
                    <option value="" disabled>Select State</option>
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <select name="city" value={formData.city} onChange={handleInputChange} required disabled={!formData.state} className={`${formControlClasses} disabled:bg-gray-200 disabled:cursor-not-allowed`}>
                    <option value="" disabled>Select City</option>
                    {formData.state && indianStates[formData.state]?.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" required pattern="[0-9]{6}" maxLength={6} className={formControlClasses}/>
                </div>
              </div>
            </fieldset>
            
            {/* Contact Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-2">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" required className={formControlClasses}/>
                  {emailSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
                      {emailSuggestions.map(suggestion => (
                        <div key={suggestion} onClick={() => selectEmailSuggestion(suggestion)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-600 mb-2">Phone Number</label>
                  <div className="flex items-stretch rounded-lg shadow-sm overflow-hidden border border-gray-300">
                    <span className="inline-flex items-center px-3 bg-gray-100 text-gray-600 font-medium text-sm whitespace-nowrap">
                      🇮🇳 +91
                    </span>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required pattern="[0-9]{10}" maxLength={10} placeholder="9876543210" className="flex-1 px-4 py-3 text-sm placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-inset" />
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions Section */}
            <div>
              <label htmlFor="instructions" className="block text-sm font-semibold text-gray-900 mb-2">Additional Instructions</label>
              <textarea id="instructions" name="instructions" value={formData.instructions} onChange={handleInputChange} rows={3} placeholder="Any delivery notes or special requests (optional)" className={formControlClasses}></textarea>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-2">
          <div className="sticky top-8 bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-2xl font-display font-bold text-primary-blue mb-6">Summary</h2>
            <div className="space-y-3 mb-5">
              {cartItems.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm text-gray-700">
                  <span>{item.product.name} x {item.quantity}</span>
                  <span className="font-medium">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2 mb-4">
               <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
               <div className="flex justify-between text-sm"><span className="text-gray-600">Shipping</span><span>₹{shipping.toLocaleString()}</span></div>
               <div className="flex justify-between text-sm"><span className="text-gray-600">Taxes (5%)</span><span>₹{tax.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-900">Total</p>
                <p className="text-xl font-bold text-primary-blue">₹{total.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
              </div>
            </div>
            <Button type="submit" disabled={isProcessing} className="w-full">
              {isProcessing ? 'Placing Order...' : 'Place Order'}
            </Button>
            <PolicySummary />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
