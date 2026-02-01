import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import Button from '../components/Button';

const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = ReactRouterDOM.useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  // Mock shipping and tax
  const shipping = subtotal > 0 ? 100 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    setIsProcessing(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const customerDetails = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
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
            // The response was not JSON. This is likely a network or CORS issue.
            errorMessage = `An error occurred during checkout. Please ensure the backend server is running and accessible.`;
        }
        throw new Error(errorMessage);
      }

      // Order was successful
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

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-display font-bold text-primary-blue text-center mb-12">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Customer Details */}
        <div>
          <h2 className="text-2xl font-display font-bold text-primary-blue mb-6">Shipping Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="name" name="name" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-blue focus:border-primary-blue"/>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" id="address" name="address" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-blue focus:border-primary-blue"/>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" name="email" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-blue focus:border-primary-blue"/>
            </div>
             <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" id="phone" name="phone" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-blue focus:border-primary-blue"/>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 border border-gray-200/80 rounded-lg">
          <h2 className="text-2xl font-display font-bold text-primary-blue mb-6">Order Summary</h2>
          <div className="space-y-3">
            {cartItems.map(item => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span>{item.product.name} x {item.quantity}</span>
                <span>₹{(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t my-4"></div>
          <div className="space-y-2">
             <div className="flex justify-between"><p>Subtotal</p><p>₹{subtotal.toLocaleString()}</p></div>
             <div className="flex justify-between"><p>Shipping</p><p>₹{shipping.toLocaleString()}</p></div>
             <div className="flex justify-between text-sm text-gray-600"><p>Taxes (5%)</p><p>₹{tax.toLocaleString(undefined, {minimumFractionDigits: 2})}</p></div>
          </div>
          <div className="border-t my-4"></div>
          <div className="flex justify-between font-bold text-lg">
            <p>Total</p>
            <p>₹{total.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          </div>
          <div className="mt-8">
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? 'Placing Order...' : 'Place Order'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;