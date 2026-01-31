const products = [
  {
    id: 1,
    name: 'EcoBoard Planter Box',
    category: 'Garden',
    description:
      'A sturdy planter box crafted entirely from recycled HDPE plastic. Weather-resistant and UV-stabilized, it will never rot, crack, or splinter. Perfect for herbs, flowers, or small vegetables on your balcony or patio.',
    shortDescription: 'Weather-proof recycled plastic planter for balconies and patios.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=600&fit=crop',
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'ReThread Tote Bag',
    category: 'Accessories',
    description:
      'This spacious tote is woven from recycled PET bottles — each bag diverts roughly 12 bottles from landfill. Features reinforced handles, an interior zip pocket, and a water-resistant lining. Machine washable.',
    shortDescription: 'Spacious tote woven from 12 recycled PET bottles.',
    price: 28.50,
    image: 'https://images.unsplash.com/photo-1597484661973-ee6cd0b6482c?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 3,
    name: 'OceanDeck Chair',
    category: 'Furniture',
    description:
      'Relax in a chair made from ocean-recovered plastic and post-consumer HDPE. The ergonomic Adirondack shape supports long evenings outdoors. Stainless-steel hardware ensures decades of maintenance-free use.',
    shortDescription: 'Adirondack chair from ocean-recovered plastic.',
    price: 189.00,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=600&fit=crop',
    badge: 'New',
  },
  {
    id: 4,
    name: 'GreenGrid Storage Crate',
    category: 'Home',
    description:
      'Stackable storage crate injection-molded from 100% post-consumer recycled polypropylene. Ideal for pantries, garages, and workshops. Holds up to 25 kg and nests when empty to save space.',
    shortDescription: 'Stackable crate from 100% recycled polypropylene.',
    price: 18.75,
    image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 5,
    name: 'ClearCycle Water Bottle',
    category: 'Accessories',
    description:
      'A 750 ml reusable water bottle made from recycled Tritan plastic. BPA-free, shatter-proof, and dishwasher safe. The leak-proof twist cap and wide mouth make filling and cleaning effortless.',
    shortDescription: 'BPA-free 750 ml bottle from recycled Tritan.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop',
    badge: 'Popular',
  },
  {
    id: 6,
    name: 'TerraTile Coaster Set',
    category: 'Home',
    description:
      'Set of 6 geometric coasters pressed from recycled HDPE flakes. Each coaster shows unique color marbling — no two sets are alike. Non-slip base protects all surfaces. Comes in a recycled-cardboard gift box.',
    shortDescription: 'Set of 6 unique coasters from recycled HDPE flakes.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 7,
    name: 'LoopLumber Raised Bed',
    category: 'Garden',
    description:
      'A modular raised garden bed built from recycled lumber-plastic composite. Will not warp, rot, or attract termites. Simple bolt-together assembly with no tools required. Expandable with additional kits.',
    shortDescription: 'Modular raised bed from recycled lumber-plastic composite.',
    price: 74.50,
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 8,
    name: 'RecoCup Travel Mug',
    category: 'Accessories',
    description:
      'Double-walled 350 ml travel mug made from recycled polypropylene. Keeps drinks hot for 2 hours or cold for 4. The snap-lock lid prevents spills. Fits standard car cup holders.',
    shortDescription: 'Double-walled travel mug from recycled PP.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 9,
    name: 'PlyReborn Desk Organizer',
    category: 'Home',
    description:
      'Keep your workspace tidy with this multi-compartment desk organizer made from recycled ABS plastic. Features slots for pens, phones, cards, and cables. Sleek matte finish in charcoal or sage.',
    shortDescription: 'Multi-slot desk organizer from recycled ABS.',
    price: 29.90,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 10,
    name: 'SeaCycle Sunglasses',
    category: 'Accessories',
    description:
      'Lightweight polarized sunglasses with frames injection-molded from ocean-bound recycled plastic. UV400 protection, spring hinges, and a microfiber pouch made from recycled PET. Available in Midnight and Driftwood.',
    shortDescription: 'Polarized sunglasses from ocean-bound recycled plastic.',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop',
    badge: 'New',
  },
  {
    id: 11,
    name: 'VerdeFence Panel',
    category: 'Garden',
    description:
      'Privacy fence panel made from 100% recycled mixed plastics. Each 1.8 m x 1.8 m panel replaces roughly 40 kg of landfill waste. Will not rot, peel, or need painting. Comes in Slate Grey and Walnut.',
    shortDescription: 'Privacy fence panel from 100% recycled mixed plastics.',
    price: 119.00,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 12,
    name: 'NuBin Kitchen Compost Bin',
    category: 'Home',
    description:
      'Countertop compost bin with a 5 L capacity, molded from recycled HDPE. The snap-shut lid and replaceable charcoal filter keep odors contained. Dishwasher-safe inner bucket for easy cleaning.',
    shortDescription: 'Countertop compost bin from recycled HDPE.',
    price: 26.50,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=600&fit=crop',
    badge: 'Popular',
  },
];

export const categories = [...new Set(products.map((p) => p.category))];

export default products;
