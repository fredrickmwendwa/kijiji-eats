// Sample menu. Prices in KES are examples for the portfolio concept.
// options: groups of choices. A choice's price is the amount added to the base price.

export const CATEGORIES = [
  { id: 'nyama-choma', name: 'Nyama choma' },
  { id: 'kuku', name: 'Kuku' },
  { id: 'platters', name: 'Platters' },
  { id: 'sides', name: 'Sides' },
  { id: 'drinks', name: 'Drinks' },
]

const sizeGroup = (half, kilo) => ({
  id: 'size',
  label: 'Size',
  required: true,
  choices: [
    { id: 'half', label: 'Half kilo', price: 0 },
    { id: 'kilo', label: 'One kilo', price: kilo - half },
  ],
})

export const MENU = [
  {
    id: 'goat-ribs', category: 'nyama-choma', name: 'Goat ribs, grilled',
    description: 'Half kilo, with ugali and kachumbari', price: 1400, tags: ['HALF KG'],
    options: [
      sizeGroup(1400, 2700),
      { id: 'side', label: 'Served with', required: true, choices: [
        { id: 'ugali', label: 'Ugali', price: 0 },
        { id: 'chips', label: 'Chips', price: 100 },
      ] },
    ],
  },
  {
    id: 'beef-nyama-choma', category: 'nyama-choma', name: 'Beef nyama choma',
    description: 'Half kilo, with ugali and kachumbari', price: 1200, tags: ['HALF KG'],
    options: [sizeGroup(1200, 2300)],
  },
  { id: 'goat-liver', category: 'nyama-choma', name: 'Goat and liver', description: 'Half kilo goat, liver on the side', price: 1500, tags: ['HALF KG'] },
  { id: 'kuku-half', category: 'kuku', name: 'Kuku choma, half', description: 'Half chicken, with kachumbari', price: 950, tags: ['HALF'] },
  { id: 'kuku-whole', category: 'kuku', name: 'Kuku choma, whole', description: 'Whole chicken, kachumbari', price: 1800, tags: ['WHOLE'] },
  { id: 'wings', category: 'kuku', name: 'Chicken wings', description: 'Six pieces, pilipili on the side', price: 600, tags: ['6 PCS'] },
  { id: 'sharing-platter', category: 'platters', name: 'Sharing platter', description: 'Two kilos mixed meat, ugali, sukuma. Feeds four.', price: 4800, tags: ['2 KG'] },
  { id: 'family-platter', category: 'platters', name: 'Family platter', description: 'Three kilos mixed meat, ugali, sukuma, chips. Feeds six.', price: 6900, tags: ['3 KG'] },
  { id: 'ugali', category: 'sides', name: 'Ugali', description: 'Maize meal, served hot', price: 100, tags: ['VEG'] },
  { id: 'sukuma', category: 'sides', name: 'Sukuma wiki', description: 'Sauteed greens, onion, tomato', price: 200, tags: ['VEG'] },
  { id: 'kachumbari', category: 'sides', name: 'Kachumbari', description: 'Tomato, onion, coriander, chilli', price: 150, tags: ['VEG'] },
  { id: 'chips', category: 'sides', name: 'Chips', description: 'Fried potato, salted', price: 250, tags: ['VEG'] },
  { id: 'passion-juice', category: 'drinks', name: 'Fresh passion juice', description: 'Pressed to order, 350 ml', price: 250, tags: [] },
  { id: 'soda', category: 'drinks', name: 'Soda', description: '300 ml bottle', price: 100, tags: [] },
  { id: 'water', category: 'drinks', name: 'Bottled water', description: '500 ml', price: 80, tags: [] },
]

export const FEATURED_IDS = ['goat-ribs', 'beef-nyama-choma', 'kuku-half', 'sharing-platter']

export const getItem = (id) => MENU.find((m) => m.id === id)
