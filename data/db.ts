
import { FeedResponse } from '@/types';

export const db: FeedResponse = {
  user: {
    id: 'u-1',
    name: 'Mahros AL-Qabasy',
    email: 'mmm500512@gu.edu.eg',
    role: 'user',
    avatar: 'https://avatars.githubusercontent.com/u/149203319?s=96&v=4',
    phone: '+20 1015888272',
    memberSince: 'Oct 2025',
    addresses: [
      { id: 'a-1', label: 'Home', fullAddress: '15 Tahrir St, Downtown, Cairo' },
      { id: 'a-2', label: 'Work', fullAddress: 'Smart Village, Building B12, Giza' }
    ],
    walletBalance: 250.00,
    loyaltyPoints: 1250,
    transactions: [
      { id: 'tx-1', type: 'credit', amount: 500, date: 'Oct 20, 2024', description: 'Wallet Top Up' },
      { id: 'tx-2', type: 'debit', amount: 120, date: 'Oct 24, 2024', description: 'Order #88392' }
    ]
  },

  orders: [
    {
      id: 'ord-88392',
      userId: 'u-1',
      customerName: 'Ahmed El-Masry',
      date: 'Oct 24, 2024',
      status: 'Delivered',
      total: 120.50,
      items: [
        { cartId: 'c-1', id: 'mk-1', title: 'Mahshi Wara\' Enab Kit', price: 85.00, image: 'https://picsum.photos/id/493/800/600', quantity: 1, restaurantName: 'Teta\'s Kitchen' },
        { cartId: 'c-2', id: 'm-3-3', title: 'Sobia Bottle', price: 35.50, image: 'https://picsum.photos/id/1084/200/200', quantity: 1, restaurantName: 'El-Khediw' }
      ]
    },
    {
      id: 'ord-88102',
      userId: 'u-1',
      customerName: 'Ahmed El-Masry',
      date: 'Oct 18, 2024',
      status: 'Delivered',
      total: 210.00,
      items: [
        { cartId: 'c-3', id: 'm-2-1', title: '1kg Mix Grill', price: 210.00, image: 'https://picsum.photos/id/69/200/200', quantity: 1, restaurantName: 'Sobhy Kaber' }
      ]
    }
  ],

  chefs: [
    {
      id: 'c-1',
      name: 'Ahmed Yasser',
      specialty: 'Egyption Chef',
      avatar: 'https://avatars.githubusercontent.com/u/71529636?v=4',
      bio: 'He is a fun-loving guy, a skilled chef, and a pro gamer.',
      rating: 3.9,
      followerCount: '1.4k',
      coverImage: 'https://media.licdn.com/dms/image/v2/D4D16AQG5JdXscAU3PA/profile-displaybackgroundimage-shrink_200_800/profile-displaybackgroundimage-shrink_200_800/0/1725141608166?e=2147483647&v=beta&t=T9cp1FwbY5adcaK_7Bu0UbFMq2uBB4iUCIRr4TLQ5Cg'
    }
  ],

  mealKits: [
    {
      id: 'mk-1',
      title: 'Mahshi Wara\' Enab',
      description: 'Stuffed vine leaves with secret herb mix',
      longDescription: 'Experience the joy of rolling Mahshi with our perfectly spiced rice and herb mixture. Includes fresh vine leaves, and our signature tomato broth base.',
      price: 180.00,
      image: 'https://picsum.photos/id/135/800/600',
      prepTime: 90,
      servings: 4,
      tags: ['Baladi', 'Vegetarian Option'],
      nutrition: { calories: 450, protein: '12g', carbs: '65g', fats: '18g' },
      ingredients: ['Vine Leaves', 'Zucchini', 'Egyptian Rice', 'Dill', 'Parsley', 'Tomato Sauce', 'Onions', 'Ghee'],
      chefId: 'c-1',
      steps: [
        { order: 1, instruction: 'Wash the rice and mix with chopped herbs (dill, parsley, coriander), onions, and spices.', duration: 15 * 60 },
        { order: 2, instruction: 'Boil the vine leaves briefly in salted water with lemon.', duration: 5 * 60 },
        { order: 3, instruction: 'Roll the vine leaves tight and stuff the zucchini (do not overstuff!).', duration: 45 * 60, tip: 'Leave space for rice expansion.' },
        { order: 4, instruction: 'Stack in a pot, add the tomato broth/soup until half covered.', duration: 5 * 60 },
        { order: 5, instruction: 'Simmer on low heat until rice is tender and water is absorbed.', duration: 40 * 60 },
        { order: 6, instruction: 'Flip the pot onto a large serving platter (The grand reveal!).' }
      ]
    },
    {
      id: 'mk-2',
      title: 'Macarona Bechamel',
      description: 'Baked penne with creamy bechamel sauce',
      longDescription: 'The ultimate Egyptian comfort food. Layers of penne pasta, rich spiced minced meat (Aasag), and a thick, creamy layer of golden-brown Bechamel sauce.',
      price: 150.00,
      image: 'https://picsum.photos/id/805/800/600',
      prepTime: 60,
      servings: 6,
      tags: ['Family Favorite', 'Comfort Food'],
      nutrition: { calories: 680, protein: '28g', carbs: '55g', fats: '32g' },
      ingredients: ['Penne Pasta', 'Minced Beef', 'Milk', 'Flour', 'Butter', 'Nutmeg', 'Onions'],
      chefId: 'c-2',
      steps: [
        { order: 1, instruction: 'Boil the penne pasta until al dente.', duration: 10 * 60 },
        { order: 2, instruction: 'Cook minced beef with onions, salt, pepper, and a dash of cinnamon.', duration: 15 * 60 },
        { order: 3, instruction: 'Prepare the Bechamel: Melt butter, whisk in flour, then slowly add milk until thick.', duration: 15 * 60, tip: 'Keep whisking to avoid lumps!' },
        { order: 4, instruction: 'Mix half the bechamel with the pasta.', duration: 5 * 60 },
        { order: 5, instruction: 'Layer: Pasta, Meat, Pasta, then cover with remaining Bechamel.', duration: 10 * 60 },
        { order: 6, instruction: 'Bake in oven until golden brown and bubbling.', duration: 30 * 60 }
      ]
    },
    {
      id: 'mk-3',
      title: 'Authentic Koshari Kit',
      description: 'Lentils, rice, pasta with spicy tomato sauce',
      longDescription: 'Egypt\'s national dish at home. We provide the pre-soaked lentils, pasta mix, garlic vinegar (Dakka), and the secret spice blend for the tomato sauce.',
      price: 95.00,
      image: 'https://picsum.photos/id/635/800/600',
      prepTime: 45,
      servings: 3,
      tags: ['Vegan', 'Street Food'],
      nutrition: { calories: 520, protein: '18g', carbs: '85g', fats: '12g' },
      ingredients: ['Brown Lentils', 'Egyptian Rice', 'Macaroni', 'Chickpeas', 'Fried Onions', 'Tomato Paste', 'Garlic', 'Vinegar'],
      chefId: 'c-3',
      steps: [
        { order: 1, instruction: 'Boil lentils and pasta separately.', duration: 20 * 60 },
        { order: 2, instruction: 'Cook rice with vermicelli.', duration: 20 * 60 },
        { order: 3, instruction: 'Make the salsa: Fry garlic, add tomato sauce, vinegar and cumin.', duration: 15 * 60 },
        { order: 4, instruction: 'Prepare the Dakka: Mix vinegar, water, lemon, garlic, cumin, and chili.', duration: 5 * 60 },
        { order: 5, instruction: 'Layer the bowl: Rice, Pasta, Lentils, Chickpeas.', tip: 'The classic order matters!' },
        { order: 6, instruction: 'Top with Salsa, Dakka, and plenty of crispy onions.' }
      ]
    },
    {
      id: 'mk-4',
      title: 'Egyptian Fatteh',
      description: 'Crispy bread, rice, and meat with garlic vinegar',
      longDescription: 'A celebratory dish. Toasted baladi bread topped with rice, succulent beef cubes, and doused in a garlicky vinegar tomato sauce.',
      price: 280.00,
      image: 'https://picsum.photos/id/435/800/600',
      prepTime: 120,
      servings: 4,
      tags: ['Occasions', 'Meat Lovers'],
      nutrition: { calories: 750, protein: '45g', carbs: '60g', fats: '35g' },
      ingredients: ['Beef Cubes', 'Baladi Bread', 'Rice', 'Garlic', 'Vinegar', 'Tomato Sauce', 'Butter'],
      chefId: 'c-1',
      steps: [
        { order: 1, instruction: 'Boil beef with aromatics until tender.', duration: 90 * 60 },
        { order: 2, instruction: 'Cut bread into squares and toast with butter in the oven.', duration: 10 * 60 },
        { order: 3, instruction: 'Cook white Egyptian rice.', duration: 20 * 60 },
        { order: 4, instruction: 'Make the Tasha: Fry garlic in ghee, quench with vinegar.', duration: 5 * 60 },
        { order: 5, instruction: 'Assemble: Bread layer (soak with some broth), Rice layer, Tomato Sauce.', duration: 10 * 60 },
        { order: 6, instruction: 'Place the meat on top and serve immediately.' }
      ]
    },
    {
      id: 'mk-5',
      title: 'Om Ali Dessert Kit',
      description: 'Hot bread pudding with nuts, cream, and milk',
      longDescription: 'The royal dessert of Egypt. Puff pastry flakes soaked in hot sweetened milk, mixed with raisins, coconut, and nuts, topped with fresh cream.',
      price: 110.00,
      image: 'https://picsum.photos/id/935/800/600',
      prepTime: 25,
      servings: 4,
      tags: ['Dessert', 'Sweet'],
      nutrition: { calories: 420, protein: '8g', carbs: '45g', fats: '22g' },
      ingredients: ['Puff Pastry', 'Milk', 'Heavy Cream', 'Sugar', 'Raisins', 'Coconut', 'Hazelnuts'],
      chefId: 'c-2',
      steps: [
        { order: 1, instruction: 'Break the puff pastry into a clay pot (Tagen).', duration: 2 * 60 },
        { order: 2, instruction: 'Mix in raisins, coconut, and crushed nuts.', duration: 3 * 60 },
        { order: 3, instruction: 'Heat milk with sugar and vanilla, pour over the pastry.', duration: 5 * 60 },
        { order: 4, instruction: 'Spread a layer of heavy cream (Qishta) on top.', duration: 2 * 60 },
        { order: 5, instruction: 'Broil in oven until the top is golden brown and bubbly.', duration: 10 * 60 }
      ]
    }
  ],

  restaurants: [
    {
      id: 'r-1',
      name: 'El Sultan',
      rating: 4.7,
      reviewCount: 3420,
      cuisine: ['Grills', 'Baladi', 'Liver & Sausage'],
      distance: 2.5,
      deliveryTime: '40-50 min',
      priceRange: '$$$',
      image: 'https://picsum.photos/id/837/800/600',
      banner: 'https://picsum.photos/id/839/800/600',
      menu: [
        { id: 'm-1-1', name: 'Charcoal Grilled Kofta (1kg)', description: 'Juicy spiced minced meat grilled on charcoal.', price: 450.00, image: 'https://picsum.photos/id/439/800/600', category: 'Grills', popular: true },
        { id: 'm-1-2', name: 'Alexandrian Liver Sandwich', description: 'Spicy liver with peppers in fresh fino bread.', price: 25.00, image: 'https://picsum.photos/id/842/800/600', category: 'Sandwiches', popular: true },
        { id: 'm-1-3', name: 'Molokhia Tagen', description: 'Served with plain rice and chicken.', price: 65.00, image: 'https://picsum.photos/id/639/800/600', category: 'Tagens' },
        { id: 'm-1-4', name: 'Mombar', description: 'Rice stuffed sausage, deep fried.', price: 80.00, image: 'https://picsum.photos/id/840/800/600', category: 'Appetizers' }
      ]
    },
    {
      id: 'r-2',
      name: 'Koshari Cairo',
      rating: 4.8,
      reviewCount: 5100,
      cuisine: ['Koshari', 'Street Food'],
      distance: 1.2,
      deliveryTime: '20-30 min',
      priceRange: '$',
      image: 'https://picsum.photos/id/808/800/600',
      banner: 'https://picsum.photos/id/875/800/600',
      menu: [
        { id: 'm-2-1', name: 'Koshari Star', description: 'Medium bowl with extra chickpeas.', price: 45.00, image: 'https://images.unsplash.com/photo-1596910547037-846b1980329f?auto=format&fit=crop&q=80&w=400', category: 'Koshari', popular: true },
        { id: 'm-2-2', name: 'Koshari Family Tray', description: 'Serves 4-5 people.', price: 180.00, image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&q=80&w=400', category: 'Koshari' },
        { id: 'm-2-3', name: 'Rice Pudding', description: 'Topped with nuts and raisins.', price: 25.00, image: 'https://images.unsplash.com/photo-1517254302928-1b203c94979e?auto=format&fit=crop&q=80&w=400', category: 'Dessert' },
        { id: 'm-2-4', name: 'Dakka Sauce Extra', description: 'Garlic vinegar sauce bottle.', price: 10.00, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=400', category: 'Extras' }
      ]
    },
    {
      id: 'r-3',
      name: 'El-Khediw Bakery',
      rating: 4.9,
      reviewCount: 1250,
      cuisine: ['Feteer', 'Bakery', 'Dessert'],
      distance: 3.0,
      deliveryTime: '35-45 min',
      priceRange: '$$',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
      banner: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200',
      menu: [
        { id: 'm-3-1', name: 'Feteer Meshaltet', description: 'Classic layered pastry served with honey and tahini.', price: 90.00, image: 'https://images.unsplash.com/photo-1605252877522-4467c69992c6?auto=format&fit=crop&q=80&w=400', category: 'Feteer', popular: true },
        { id: 'm-3-2', name: 'Feteer Mix Cheese', description: 'Stuffed with Rumi, Cheddar, and Mozzarella.', price: 110.00, image: 'https://images.unsplash.com/photo-1626808642875-0aa545482dfb?auto=format&fit=crop&q=80&w=400', category: 'Feteer' },
        { id: 'm-3-3', name: 'Sobia Drink', description: 'Cold coconut milk drink.', price: 35.00, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400', category: 'Drinks' },
        { id: 'm-3-4', name: 'Sweet Feteer Custard', description: 'Feteer with custard and sugar.', price: 75.00, image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=400', category: 'Dessert' }
      ]
    }
  ],

  trending: [
    { id: 't-1', name: 'Koshari Star', restaurant: 'Koshari Cairo', orders: '12.5k', image: 'https://picsum.photos/id/814/800/600' },
    { id: 't-2', name: 'Liver Sandwich', restaurant: 'El Sultan', orders: '9.2k', image: 'https://picsum.photos/id/815/800/600' },
    { id: 't-3', name: 'Om Ali', restaurant: 'El-Khediw Bakery', orders: '8.1k', image: 'https://picsum.photos/id/816/800/600' },
  ],

  reviews: [
    {
      id: 'rv-1', targetId: 'mk-1', userId: 'u-2', userName: 'Noha Samir', userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      rating: 5, date: '2 days ago', comment: 'The Mahshi mixture is exactly like my mom makes it! The herbs are fresh and the instructions were easy.', helpfulCount: 24
    },
    {
      id: 'rv-2', targetId: 'r-1', userId: 'u-3', userName: 'Ahmed Tarek', userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150',
      rating: 5, date: '1 week ago', comment: 'Best liver sandwich in Cairo. Spicy, hot, and the bread is fresh.', helpfulCount: 15
    },
    {
      id: 'rv-3', targetId: 'r-2', userId: 'u-4', userName: 'Karim Hany', userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      rating: 4, date: 'Yesterday', comment: 'Koshari is great but the delivery was a bit late due to traffic.', helpfulCount: 8
    },
    {
      id: 'rv-4', targetId: 'mk-2', userId: 'u-5', userName: 'Sara Ali', userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
      rating: 5, date: '3 days ago', comment: 'The Bechamel sauce recipe is foolproof. My kids loved it!', helpfulCount: 30
    }
  ]
};
