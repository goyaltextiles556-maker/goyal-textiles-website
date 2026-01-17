
import type { Product, Category } from '../types';

export const categories: Category[] = [
  { id: 'suiting', name: 'Suiting Fabric', image: 'https://picsum.photos/seed/suiting/600/400' },
  { id: 'shirting', name: 'Shirting Fabric', image: 'https://picsum.photos/seed/shirting/600/400' },
  { id: 'kurta', name: 'Kurta Fabric', image: 'https://picsum.photos/seed/kurta/600/400' },
  { id: 'pant', name: 'Pant Fabric', image: 'https://picsum.photos/seed/pant/600/400' },
  { id: 'gifting', name: 'Gifting Sets', image: 'https://picsum.photos/seed/gifting/600/400' },
];

export const products: Product[] = [
  // Suiting
  {
    id: 's001',
    name: 'Classic Navy Blue Wool Blend',
    brand: 'Raymond',
    description: 'A versatile and timeless navy blue wool blend, perfect for formal suits.',
    longDescription: 'This premium wool blend fabric from Raymond offers a smooth finish and excellent drape. Its classic navy blue hue makes it a staple for any gentleman\'s wardrobe, suitable for business suits, blazers, and trousers.',
    price: 1200,
    originalPrice: 1600,
    unit: 'meter',
    category: 'suiting',
    images: ['/images/example-fabric-1.webp', '/images/example-fabric-2.webp'],
    intendedUse: 'Formal suits, blazers, trousers.',
    materialDetails: '70% Wool, 30% Polyester. Dry clean only.',
  },
  {
    id: 's002',
    name: 'Charcoal Grey Pinstripe',
    description: 'Sophisticated charcoal grey fabric with a subtle pinstripe for a sharp look.',
    longDescription: 'Crafted for the discerning individual, this charcoal grey pinstripe fabric provides a structure that is both elegant and commanding. Ideal for power suits and formal wear that makes a statement.',
    price: 1450,
    unit: 'meter',
    category: 'suiting',
    images: ['https://picsum.photos/seed/s002a/800/800', 'https://picsum.photos/seed/s002b/800/800'],
    intendedUse: 'Business suits, formal trousers.',
    materialDetails: '80% Terry, 20% Rayon. Lightweight and breathable.',
  },
  // Shirting
  {
    id: 'sh001',
    name: 'Crisp White Cotton Poplin',
    brand: 'Giza House',
    description: 'A high-quality, breathable white cotton for classic formal and casual shirts.',
    longDescription: 'Made from the finest Giza cotton, this poplin fabric is known for its smooth texture and durability. It remains crisp and fresh throughout the day, making it the perfect choice for an essential white shirt.',
    price: 850,
    originalPrice: 1000,
    unit: 'meter',
    category: 'shirting',
    images: ['https://picsum.photos/seed/sh001a/800/800', 'https://picsum.photos/seed/sh001b/800/800'],
    intendedUse: 'Formal shirts, casual shirts.',
    materialDetails: '100% Giza Cotton. Machine washable.',
  },
  {
    id: 'sh002',
    name: 'Light Blue Oxford Weave',
    description: 'Durable and soft Oxford weave in a versatile light blue.',
    longDescription: 'The Oxford weave gives this fabric a distinctive texture and makes it highly durable. It softens with each wash, becoming more comfortable over time. A perfect choice for business casual or weekend shirts.',
    price: 780,
    unit: 'meter',
    category: 'shirting',
    images: ['https://picsum.photos/seed/sh002a/800/800'],
    intendedUse: 'Business casual shirts, weekend wear.',
    materialDetails: '100% Cotton. Oxford weave.',
  },
  // Kurta
  {
    id: 'k001',
    name: 'Elegant Cream Jacquard Silk',
    description: 'Rich jacquard silk with a subtle self-design for festive kurtas.',
    longDescription: 'This luxurious jacquard silk in a sophisticated cream color is perfect for special occasions. The intricate self-design adds a layer of elegance and richness, creating a truly standout garment.',
    price: 1800,
    unit: 'meter',
    category: 'kurta',
    images: ['https://picsum.photos/seed/k001a/800/800', 'https://picsum.photos/seed/k001b/800/800'],
    intendedUse: 'Festive wear, wedding kurtas, sherwanis.',
    materialDetails: 'Silk Blend. Dry clean recommended.',
  },
  // Gifting Sets
  {
    id: 'g001',
    name: 'Premium Suiting & Shirting Combo',
    brand: 'Vimal',
    description: 'A classic combination pack of suiting and shirting fabric.',
    longDescription: 'An ideal gift for any occasion, this combo set from Vimal includes premium quality fabric for a full suit and a complementary shirt. Packaged beautifully, it represents a gesture of timeless style and elegance.',
    price: 3500,
    originalPrice: 4200,
    unit: 'set',
    category: 'gifting',
    images: ['https://picsum.photos/seed/g001a/800/800', 'https://picsum.photos/seed/g001b/800/800'],
    intendedUse: 'Gifting for weddings, festivals, and corporate events.',
    materialDetails: 'Suiting: Poly-Viscose. Shirting: 100% Cotton.',
  },
  // Pant
  {
    id: 'p001',
    name: 'Beige Cotton Chino Fabric',
    description: 'Comfortable and durable cotton fabric for casual chinos and trousers.',
    longDescription: 'This medium-weight cotton twill fabric is perfect for making comfortable and stylish chinos. The classic beige color is versatile and can be paired with a wide range of shirts and t-shirts for a smart casual look.',
    price: 950,
    unit: 'meter',
    category: 'pant',
    images: ['https://picsum.photos/seed/p001a/800/800'],
    intendedUse: 'Chinos, casual trousers.',
    materialDetails: '98% Cotton, 2% Spandex for a slight stretch.',
  }
];