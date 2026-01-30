
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

export interface Order {
  _id?: any;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  amount: number;
  status: 'placed' | 'paid' | 'created';
  items: CartItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  createdAt: Date;
}
