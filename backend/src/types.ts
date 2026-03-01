export interface Product {
  id: string;
  name: string;
  brand?: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  unit: 'meter' | 'set';
  category: string;
  images: string[];
  intendedUse: string;
  materialDetails: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}


export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  _id?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  amount: number;
  status: 'placed' | 'paid' | 'created';
  items: CartItem[];
  customer: CustomerDetails;
  createdAt: Date;
}