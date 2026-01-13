// Mock product data for VÉ PRO SKIN
export const productCategories = ['Cleanser', 'Moisturiser', 'Serum'];
export const skinTypes = ['Oily / Acne-Prone', 'Normal / Combination', 'Dry / Sensitive'];

export const products = [
  // CLEANSERS
  {
    id: 'cleanser-oily',
    name: 'Pore-Purify Gel Cleanser',
    category: 'Cleanser',
    skinType: 'Oily / Acne-Prone',
    price: 299,
    originalPrice: 399,
    discount: 25,
    ingredients: ['Salicylic Acid', 'Niacinamide', 'Zinc PCA'],
    benefits: ['Clears pores', 'Controls oil', 'Prevents acne'],
    description: 'This deep-cleansing gel removes oil, dirt and acne-causing bacteria while keeping your skin balanced and calm. It penetrates pores to dissolve sebum and prevent new breakouts without stripping the skin.',
    fullDescription: `This deep-cleansing gel removes oil, dirt and acne-causing bacteria while keeping your skin balanced and calm. It penetrates pores to dissolve sebum and prevent new breakouts without stripping the skin.

Why you'll love it:
• Clears blackheads & whiteheads
• Controls excess oil
• Helps prevent acne
• Soothes redness & irritation
• Non-drying, pH-balanced`,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
    rating: 4.8,
    reviews: 1420,
    stock: 27,
    badge: 'Best Seller',
    viewsToday: 47,
    boughtToday: 389
  },
  {
    id: 'cleanser-normal',
    name: 'Hydra-Balance Gel Cleanser',
    category: 'Cleanser',
    skinType: 'Normal / Combination',
    price: 279,
    originalPrice: 379,
    discount: 26,
    ingredients: ['Niacinamide', 'Hyaluronic Acid', 'Panthenol'],
    benefits: ['Hydrates while cleansing', 'Improves texture', 'Maintains balance'],
    description: 'A gentle daily cleanser that removes impurities while maintaining skin\'s natural moisture. It cleans without tightness, leaving skin soft, fresh and hydrated.',
    fullDescription: `A gentle daily cleanser that removes impurities while maintaining skin's natural moisture. It cleans without tightness, leaving skin soft, fresh and hydrated.

Why you'll love it:
• Hydrates while cleansing
• Improves skin texture
• Maintains oil-water balance
• Strengthens skin barrier`,
    image: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=500',
    rating: 4.7,
    reviews: 982,
    stock: 45,
    badge: 'New',
    viewsToday: 34,
    boughtToday: 267
  },
  {
    id: 'cleanser-dry',
    name: 'Barrier Cream Cleanser',
    category: 'Cleanser',
    skinType: 'Dry / Sensitive',
    price: 319,
    originalPrice: 429,
    discount: 26,
    ingredients: ['Ceramides', 'Oat Extract', 'Squalane'],
    benefits: ['Repairs barrier', 'Reduces redness', 'Deeply nourishes'],
    description: 'A rich, creamy cleanser that cleanses while repairing your skin barrier. It prevents dryness and irritation while keeping skin soft and nourished.',
    fullDescription: `A rich, creamy cleanser that cleanses while repairing your skin barrier. It prevents dryness and irritation while keeping skin soft and nourished.

Why you'll love it:
• Does not strip natural oils
• Repairs damaged skin barrier
• Reduces redness & tightness
• Ideal for sensitive skin`,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500',
    rating: 4.9,
    reviews: 756,
    stock: 18,
    badge: 'Best Seller',
    viewsToday: 52,
    boughtToday: 301
  },
  
  // MOISTURISERS
  {
    id: 'moisturiser-oily',
    name: 'Oil-Control Gel Moisturiser',
    category: 'Moisturiser',
    skinType: 'Oily / Acne-Prone',
    price: 349,
    originalPrice: 499,
    discount: 30,
    ingredients: ['Niacinamide', 'Zinc PCA', 'Hyaluronic Acid'],
    benefits: ['Controls oil & shine', 'Prevents breakouts', 'Minimizes pores'],
    description: 'A lightweight, oil-free gel that hydrates without clogging pores. It reduces shine and helps control acne while keeping your skin fresh all day.',
    fullDescription: `A lightweight, oil-free gel that hydrates without clogging pores. It reduces shine and helps control acne while keeping your skin fresh all day.

Why you'll love it:
• Controls oil & shine
• Prevents breakouts
• Minimizes pores
• Gives matte, fresh look`,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
    rating: 4.8,
    reviews: 2103,
    stock: 32,
    badge: 'Best Seller',
    viewsToday: 89,
    boughtToday: 512
  },
  {
    id: 'moisturiser-normal',
    name: 'Daily Glow Moisturiser',
    category: 'Moisturiser',
    skinType: 'Normal / Combination',
    price: 369,
    originalPrice: 499,
    discount: 26,
    ingredients: ['Ceramides', 'Niacinamide', 'Shea Butter'],
    benefits: ['Brightens dull skin', 'Smoothens texture', 'Natural glow'],
    description: 'This silky lotion delivers deep hydration while improving skin texture and glow. It keeps your skin balanced, smooth and healthy-looking.',
    fullDescription: `This silky lotion delivers deep hydration while improving skin texture and glow. It keeps your skin balanced, smooth and healthy-looking.

Why you'll love it:
• Brightens dull skin
• Smoothens texture
• Strengthens skin barrier
• Gives natural glow`,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=500',
    rating: 4.7,
    reviews: 1567,
    stock: 41,
    badge: 'New',
    viewsToday: 63,
    boughtToday: 428
  },
  {
    id: 'moisturiser-dry',
    name: 'Deep Barrier Cream',
    category: 'Moisturiser',
    skinType: 'Dry / Sensitive',
    price: 399,
    originalPrice: 549,
    discount: 27,
    ingredients: ['Ceramides', 'Squalane', 'Hyaluronic Acid'],
    benefits: ['Repairs barrier', 'Prevents dryness', 'Long-lasting hydration'],
    description: 'An intense repair cream that deeply nourishes and restores damaged skin. It locks in moisture and protects against dryness and irritation.',
    fullDescription: `An intense repair cream that deeply nourishes and restores damaged skin. It locks in moisture and protects against dryness and irritation.

Why you'll love it:
• Repairs damaged barrier
• Prevents dryness & flaking
• Calms sensitive skin
• Long-lasting hydration`,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500',
    rating: 4.9,
    reviews: 1891,
    stock: 23,
    badge: 'Best Seller',
    viewsToday: 71,
    boughtToday: 445
  },

  // SERUMS
  {
    id: 'serum-niacinamide',
    name: 'Clear Skin Serum',
    category: 'Serum',
    skinType: 'Oily / Acne-Prone',
    subtitle: '10% Niacinamide + Zinc',
    price: 449,
    originalPrice: 699,
    discount: 36,
    ingredients: ['10% Niacinamide', 'Zinc', 'Hyaluronic Acid'],
    benefits: ['Controls acne & oil', 'Shrinks pores', 'Fades marks'],
    description: 'A powerful acne-control serum that reduces pimples, oil and marks while keeping your skin calm and clear.',
    fullDescription: `A powerful acne-control serum that reduces pimples, oil and marks while keeping your skin calm and clear.

Why you'll love it:
• Controls acne & oil
• Shrinks pores
• Reduces redness
• Fades acne marks`,
    image: 'https://images.unsplash.com/photo-1620916297811-e5e0d3bffc37?w=500',
    rating: 4.9,
    reviews: 2876,
    stock: 15,
    badge: 'Best Seller',
    viewsToday: 112,
    boughtToday: 678
  },
  {
    id: 'serum-vitamin-c',
    name: 'Glow + Repair Serum',
    category: 'Serum',
    skinType: 'Normal / Combination',
    subtitle: 'Vitamin C + Ferulic Acid',
    price: 499,
    originalPrice: 749,
    discount: 33,
    ingredients: ['Vitamin C', 'Ferulic Acid', 'Vitamin E'],
    benefits: ['Brightens skin', 'Reduces dark spots', 'Protects from damage'],
    description: 'A brightening antioxidant serum that boosts glow, fades pigmentation and protects skin from pollution and damage.',
    fullDescription: `A brightening antioxidant serum that boosts glow, fades pigmentation and protects skin from pollution and damage.

Why you'll love it:
• Brightens skin
• Reduces dark spots
• Improves skin tone
• Protects from free radicals`,
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500',
    rating: 4.8,
    reviews: 2234,
    stock: 29,
    badge: 'New',
    viewsToday: 94,
    boughtToday: 567
  },
  {
    id: 'serum-ceramides',
    name: 'Barrier Repair Serum',
    category: 'Serum',
    skinType: 'Dry / Sensitive',
    subtitle: 'Ceramides + Peptides',
    price: 529,
    originalPrice: 799,
    discount: 34,
    ingredients: ['Ceramides', 'Peptides', 'Centella Asiatica'],
    benefits: ['Repairs damaged skin', 'Reduces sensitivity', 'Strengthens barrier'],
    description: 'This advanced repair serum strengthens weak skin barriers, reduces sensitivity and improves overall skin health.',
    fullDescription: `This advanced repair serum strengthens weak skin barriers, reduces sensitivity and improves overall skin health.

Why you'll love it:
• Repairs damaged skin
• Reduces sensitivity
• Improves hydration
• Makes skin stronger & healthier`,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500',
    rating: 4.9,
    reviews: 1998,
    stock: 21,
    badge: 'Best Seller',
    viewsToday: 78,
    boughtToday: 489
  },

  // SUNSCREENS - COMING SOON
  {
    id: 'sunscreen-oily',
    name: 'Matte Shield Sunscreen SPF 50',
    category: 'Sunscreen',
    skinType: 'Oily / Acne-Prone',
    price: 399,
    originalPrice: 549,
    discount: 27,
    ingredients: ['SPF 50 PA++++', 'Niacinamide', 'Matte Finish'],
    benefits: ['Broad spectrum protection', 'Controls oil', 'Non-comedogenic'],
    description: 'A lightweight, oil-free sunscreen with SPF 50 that protects without leaving white cast. Matte finish perfect for oily skin.',
    fullDescription: `A lightweight, oil-free sunscreen with SPF 50 that protects without leaving white cast. Matte finish perfect for oily skin.

Why you'll love it:
• Broad spectrum SPF 50 PA++++
• Controls oil & shine
• No white cast
• Non-comedogenic`,
    image: 'https://images.unsplash.com/photo-1556228852-80a9c1e24e1e?w=500',
    rating: 4.7,
    reviews: 1654,
    stock: 0,
    badge: 'Coming Soon',
    viewsToday: 56,
    boughtToday: 0,
    comingSoon: true
  },
  {
    id: 'sunscreen-normal',
    name: 'Glow Shield Sunscreen SPF 50',
    category: 'Sunscreen',
    skinType: 'Normal / Combination',
    price: 419,
    originalPrice: 579,
    discount: 28,
    ingredients: ['SPF 50 PA++++', 'Vitamin C', 'Dewy Finish'],
    benefits: ['Broad spectrum protection', 'Adds glow', 'Hydrating formula'],
    description: 'A hydrating sunscreen that protects and adds a natural glow. Perfect for normal to combination skin types.',
    fullDescription: `A hydrating sunscreen that protects and adds a natural glow. Perfect for normal to combination skin types.

Why you'll love it:
• Broad spectrum SPF 50 PA++++
• Adds natural glow
• Hydrating formula
• No white cast`,
    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500',
    rating: 4.8,
    reviews: 1432,
    stock: 0,
    badge: 'Coming Soon',
    viewsToday: 67,
    boughtToday: 0,
    comingSoon: true
  },
  {
    id: 'sunscreen-dry',
    name: 'Barrier Shield Sunscreen SPF 50',
    category: 'Sunscreen',
    skinType: 'Dry / Sensitive',
    price: 439,
    originalPrice: 599,
    discount: 27,
    ingredients: ['SPF 50 PA++++', 'Ceramides', 'Ultra-nourishing'],
    benefits: ['Broad spectrum protection', 'Deeply moisturizes', 'Calms sensitivity'],
    description: 'An ultra-nourishing sunscreen that protects and repairs. Enriched with ceramides for dry and sensitive skin.',
    fullDescription: `An ultra-nourishing sunscreen that protects and repairs. Enriched with ceramides for dry and sensitive skin.

Why you'll love it:
• Broad spectrum SPF 50 PA++++
• Deeply moisturizes
• Repairs skin barrier
• Gentle on sensitive skin`,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500',
    rating: 4.9,
    reviews: 1287,
    stock: 0,
    badge: 'Coming Soon',
    viewsToday: 61,
    boughtToday: 0,
    comingSoon: true
  }
];

export const getProductsByCategory = (category) => {
  return products.filter(p => p.category === category);
};

export const getProductById = (id) => {
  return products.find(p => p.id === id);
};

export const getProductsBySkinType = (skinType) => {
  return products.filter(p => p.skinType === skinType);
};
