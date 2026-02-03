
import { Product as ProductType, Category as CategoryType } from '../types/types.js';

export const categories: CategoryType[] = [
  { id: 'suiting', name: 'Suiting Fabric', image: 'https://picsum.photos/seed/suiting/600/400' },
  { id: 'shirting', name: 'Shirting Fabric', image: 'https://picsum.photos/seed/shirting/600/400' },
  { id: 'kurta', name: 'Kurta Fabric', image: 'https://picsum.photos/seed/kurta/600/400' },
  { id: 'pant', name: 'Pant Fabric', image: 'https://picsum.photos/seed/pant/600/400' },
  { id: 'gifting', name: 'Gifting Sets', image: '/images/homepage/gifting_categorycard.webp' },
];

export const products: ProductType[] = [
  // Suiting
  {
    id: 's001',
    name: 'Classic Navy Blue Wool Blend',
    brand: 'Raymond',
    description: 'A versatile and timeless navy blue wool blend, perfect for formal suits.',
    longDescription:
      "This premium wool blend fabric from Raymond offers a smooth finish and excellent drape. Its classic navy blue hue makes it a staple for any gentleman's wardrobe, suitable for business suits, blazers, and trousers.",
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
    longDescription:
      'Crafted for the discerning individual, this charcoal grey pinstripe fabric provides a structure that is both elegant and commanding. Ideal for power suits and formal wear that makes a statement.',
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
    longDescription:
      'Made from the finest Giza cotton, this poplin fabric is known for its smooth texture and durability. It remains crisp and fresh throughout the day, making it the perfect choice for an essential white shirt.',
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
    longDescription:
      'The Oxford weave gives this fabric a distinctive texture and makes it highly durable. It softens with each wash, becoming more comfortable over time. A perfect choice for business casual or weekend shirts.',
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
    longDescription:
      'This luxurious jacquard silk in a sophisticated cream color is perfect for special occasions. The intricate self-design adds a layer of elegance and richness, creating a truly standout garment.',
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
    name: 'Pant & Shirt with Handkerchief',
    brand: 'Siyaram',
    description: 'Premium pant–shirt fabric set with smooth finish. Colours may vary.',
    longDescription:
      'This is a pant and shirt fabric set made for everyday formal wear and special occasions. The fabric feels smooth and comfortable and is suitable for regular use. It comes in a ready gift box, making it a good choice for festivals, functions, and formal gifting. The set offers reliable quality and a clean, classic look. Colours and designs may vary from the image shown.',
    price: 1700,
    originalPrice: 2000,
    unit: 'set',
    category: 'gifting',
    images: [
      '/images/gifting/pantshirt_withhanky_gift_siyarams_2_exp.webp',
      '/images/gifting/pantshirt_withhanky_gift_siyarams_1_exp.webp',
    ],
    intendedUse: 'Formal wear, office wear, festive and formal gifting',
    materialDetails: 'Cotton',
  },
  {
    id: 'g002',
    name: 'Pant & Shirt Fabric Gift Set',
    brand: 'Vimal',
    description: 'Pant–shirt fabric set with comfortable finish. Colours may vary.',
    longDescription:
      'This pant and shirt fabric set is suitable for daily formal wear and simple occasions. The fabric is comfortable and easy to wear, making it appropriate for regular office use. It comes in a ready gift box and can be used for festivals, functions, and formal gifting. The set offers a neat, classic look with dependable quality. Colours and designs may vary from the images shown.',
    price: 275,
    originalPrice: 350,
    unit: 'set',
    category: 'gifting',
    images: [
      '/images/gifting/pantshirt_gift_vimal_2_exp.webp',
      '/images/gifting/pantshirt_gift_vimal_1_exp.webp',
    ],
    intendedUse: 'Formal wear, office wear, gifting',
    materialDetails: 'Cotton',
  },
  {
    id: 'g003',
    name: 'Pant & Shirt Fabric Gift Set',
    brand: 'Siyaram',
    description: 'Pant–shirt fabric set with smooth and comfortable finish. Colours may vary.',
    longDescription:
      'This pant and shirt fabric set is suitable for daily formal wear and regular office use. The fabric feels comfortable and easy to wear, giving a clean and classic look. It comes in a ready gift box, making it suitable for festivals, functions, and formal gifting. The set offers dependable quality for everyday use. Colours and designs may vary from the images shown.',
    price: 300,
    originalPrice: 400,
    unit: 'set',
    category: 'gifting',
    images: [
      '/images/gifting/pantshirt_gift_siyarams_2_exp.webp',
      '/images/gifting/pantshirt_gift_siyarams_1_exp.webp',
    ],
    intendedUse: 'Formal wear, office wear, gifting',
    materialDetails: 'Cotton',
  },
  {
    id: 'g004',
    name: 'Safari Suit Fabric Gift Set',
    brand: 'Skyland',
    description: 'Safari suit fabric set with neat finish. Colours may vary.',
    longDescription:
      'This safari suit fabric set is suitable for formal wear and uniform-style dressing. The fabric feels comfortable and holds a structured look, making it suitable for regular use. It comes in a ready gift box, which also makes it suitable for gifting purposes. The set offers reliable quality and a clean, professional appearance. Colours and designs may vary from the images shown.',
    price: 550,
    originalPrice: 950,
    unit: 'set',
    category: 'gifting',
    images: [
      '/images/gifting/safarisuit_gift_skyland_2.webp',
      '/images/gifting/safarisuit_gift_skyland_1.webp',
    ],
    intendedUse: 'Formal wear, office wear, gifting',
    materialDetails: 'Cotton',
  },
  {
    id: 'g005',
    name: 'Pant & Shirt Fabric Gift Set',
    brand: 'Raymond',
    description: 'Premium pant–shirt fabric set with smooth finish. Colours may vary.',
    longDescription:
      'This pant and shirt fabric set is suitable for formal wear and regular office use. The fabric feels comfortable and gives a neat, well-finished look. It comes in a ready gift box, making it a good choice for festivals, functions, and formal gifting. The set offers trusted quality and a clean, classic style. Colours and designs may vary from the images shown.',
    price: 725,
    originalPrice: 1125,
    unit: 'set',
    category: 'gifting',
    images: [
      '/images/gifting/pantshirt_gift_raymond_1_exp.webp',
      '/images/gifting/pantshirt_gift_raymond_2_exp.webp',
    ],
    intendedUse: 'Formal wear, office wear, gifting',
    materialDetails: 'Cotton',
  },
  {
    id: 'g006',
    name: 'Safari Suit Fabric Gift Set',
    brand: 'Vimal',
    description: 'Safari suit fabric set with neat finish. Colours may vary.',
    longDescription:
      'This safari suit fabric set is suitable for regular formal wear and uniform-style use. The fabric feels comfortable and gives a clean, structured look. It comes in a ready gift box, making it suitable for festivals, functions, and formal gifting. The set offers simple, reliable quality for everyday wear. Colours and designs may vary from the images shown.',
    price: 310,
    originalPrice: 710,
    unit: 'set',
    category: 'gifting',
    images: [
      '/images/gifting/safarisuit_gift_vimal_1.webp',
      '/images/gifting/safarisuit_gift_vimal_2.webp',
    ],
    intendedUse: 'Formal wear, office wear, gifting',
    materialDetails: 'Cotton',
  },
  {
    id: 'g007',
    name: 'Pant & Shirt Fabric Gift Set',
    brand: 'Raymond',
    description: 'Pant–shirt fabric set with smooth finish. Colours may vary.',
    longDescription:
      'This pant and shirt fabric set is suitable for daily formal wear and office use. The fabric feels comfortable and gives a neat, well-finished look. It comes in a ready gift box, making it suitable for festivals, functions, and formal gifting. The set offers simple, reliable quality for regular use. Colours and designs may vary from the images shown.',
    price: 480,
    originalPrice: 880,
    unit: 'set',
    category: 'gifting',
    images: [
      '/images/gifting/pantshirt_gift_raymond_1.webp',
      '/images/gifting/pantshirt_gift_raymond_2.webp',
    ],
    intendedUse: 'Formal wear, office wear, gifting',
    materialDetails: 'Cotton',
  },
  {
    id: 'g008',
    name: 'Pant & Shirt Fabric Gift Set',
    brand: 'Vimal',
    description: 'Pant–shirt fabric set with neat finish. Colours may vary.',
    longDescription:
      'This pant and shirt fabric set is suitable for daily formal wear and office use. The fabric feels comfortable and gives a simple, clean look. It comes in a ready gift box, making it suitable for festivals, functions, and formal gifting. The set offers basic, reliable quality for regular use. Colours and designs may vary from the images shown.',
    price: 225,
    originalPrice: 625,
    unit: 'set',
    category: 'gifting',
    images: [
      '/images/gifting/pantshirt_gift_vimal2.webp',
      '/images/gifting/pantshirt_gift_vimal1.webp',
    ],
    intendedUse: 'Formal wear, office wear, gifting',
    materialDetails: 'Cotton',
  },
  {
    id: 'g009',
    name: 'Pant & Shirt Fabric Gift Set',
    brand: 'Siyaram',
    description: 'Pant–shirt fabric set with smooth finish. Colours may vary.',
    longDescription:
      'This pant and shirt fabric set is suitable for daily formal wear and office use. The fabric feels comfortable and gives a clean, neat look. It comes in a ready gift box, making it suitable for festivals, functions, and formal gifting. The set offers reliable quality for regular use. Colours and designs may vary from the images shown.',
    price: 280,
    originalPrice: 680,
    unit: 'set',
    category: 'gifting',
    images: ['/images/gifting/pantshirt_gift_siyarams.webp'],
    intendedUse: 'Formal wear, office wear, gifting',
    materialDetails: 'Cotton',
  },
  {
    id: 'g010',
    name: 'Safari Suit Fabric Gift Set',
    brand: 'Gwalior',
    description: 'Safari suit fabric set with neat finish. Colours may vary.',
    longDescription:
      'This safari suit fabric set is suitable for regular formal wear and uniform-style dressing. The fabric feels comfortable and gives a clean, structured look. It comes in a ready gift box, making it suitable for festivals, functions, and formal gifting. The set offers simple and dependable quality for everyday use. Colours and designs may vary from the images shown.',
    price: 210,
    originalPrice: 610,
    unit: 'set',
    category: 'gifting',
    images: [
      '/images/gifting/safarisuit_gift_gwalior_2.webp',
      '/images/gifting/safarisuit_gift_gwalior_1.webp',
    ],
    intendedUse: 'Formal wear, office wear, gifting',
    materialDetails: 'Cotton',
  },
  {
    id: 'g011',
    name: 'Safari Suit Fabric Gift Set',
    brand: 'Gwalior',
    description: 'Safari suit fabric set with neat finish. Colours may vary.',
    longDescription:
      'This safari suit fabric set is suitable for formal wear and regular office use. The fabric feels comfortable and gives a clean, structured look. It comes in a ready gift box, making it suitable for festivals, functions, and formal gifting. The set offers simple and reliable quality for everyday use. Colours and designs may vary from the images shown.',
    price: 260,
    originalPrice: 660,
    unit: 'set',
    category: 'gifting',
    images: [
      '/images/gifting/safarisuit_gift_gwalior_2_exp.webp',
      '/images/gifting/safarisuit_gift_skyland_1.webp',
    ],
    intendedUse: 'Formal wear, office wear, gifting',
    materialDetails: 'Cotton',
  },

  // Pant
  {
    id: 'p001',
    name: 'Beige Cotton Chino Fabric',
    description: 'Comfortable and durable cotton fabric for casual chinos and trousers.',
    longDescription:
      'This medium-weight cotton twill fabric is perfect for making comfortable and stylish chinos. The classic beige color is versatile and can be paired with a wide range of shirts and t-shirts for a smart casual look.',
    price: 950,
    unit: 'meter',
    category: 'pant',
    images: ['https://picsum.photos/seed/p001a/800/800'],
    intendedUse: 'Chinos, casual trousers.',
    materialDetails: '98% Cotton, 2% Spandex for a slight stretch.',
  },
];
