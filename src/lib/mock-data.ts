export const CATEGORIES = [
  { id: 1, name: "Biryani", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&h=500&fit=crop" },
  { id: 2, name: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop" },
  { id: 3, name: "Pizza", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&h=500&fit=crop" },
  { id: 4, name: "Sushi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&h=500&fit=crop" },
  { id: 5, name: "Chinese", image: "https://images.unsplash.com/photo-1563245372-f21727322922?w=500&h=500&fit=crop" },
  { id: 6, name: "Salad", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop" },
  { id: 7, name: "Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop" },
  { id: 8, name: "Ice Cream", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=500&h=500&fit=crop" },
];

export const RESTAURANTS = [
  {
    id: "1",
    name: "Meghana Foods",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&fit=crop",
    rating: 4.4,
    time: "30-35 mins",
    location: "Koramangala",
    cuisines: ["Biryani", "Andhra", "South Indian"],
    offer: "50% OFF up to ₹100",
  },
  {
    id: "2",
    name: "Truffles",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&fit=crop",
    rating: 4.5,
    time: "25-30 mins",
    location: "St. Marks Road",
    cuisines: ["American", "Burgers", "Desserts"],
    offer: "Flat ₹125 OFF",
  },
  {
    id: "3",
    name: "Empire Restaurant",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&fit=crop",
    rating: 4.1,
    time: "40-45 mins",
    location: "Church Street",
    cuisines: ["North Indian", "Kebabs", "Biryani"],
    offer: null,
  },
  {
    id: "4",
    name: "Beijing Bites",
    image: "https://images.unsplash.com/photo-1541544744-378ca655fd6e?w=800&fit=crop",
    rating: 3.9,
    time: "35-40 mins",
    location: "Indiranagar",
    cuisines: ["Chinese", "Thai"],
    offer: "Get FREE Item",
  },
  {
    id: "5",
    name: "Leon's Burgers & Wings",
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&fit=crop",
    rating: 4.3,
    time: "20-25 mins",
    location: "Frazer Town",
    cuisines: ["American", "Fast Food"],
    offer: "60% OFF up to ₹120",
  },

];

export const CART_ITEMS = [
  {
    id: "101",
    name: "Special Chicken Biryani",
    price: 299,
    quantity: 2,
    isVeg: false,
  },
  {
    id: "102",
    name: "Paneer Butter Masala",
    price: 249,
    quantity: 1,
    isVeg: true,
  }
];

export const BILL_DETAILS = {
  itemTotal: 847,
  deliveryFee: 40,
  platformFee: 5,
  gst: 42.35,
  restaurantCharges: 20,
  toPay: 954.35
};

export const SAVED_ADDRESSES = [
  {
    id: "addr1",
    type: "Home",
    address: "No. 123, 4th Cross, Indiranagar, Bangalore - 560038",
    isDefault: true
  },
  {
    id: "addr2",
    type: "Work",
    address: "Mistnove HQ, Tech Park, Whitefield, Bangalore - 560066",
  }
];

export const HOTELS = [
  {
    id: "h1",
    name: "Mistnove Townhouse 123 - Koramangala",
    location: "Koramangala, Bangalore",
    distance: "1.2 km",
    rating: 4.5,
    ratingCount: 1200,
    price: 1499,
    originalPrice: 2999,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&fit=crop",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&fit=crop"
    ],
    amenities: ["AC", "TV", "Wifi", "King Sized Bed", "Sanitized"],
    tags: ["Mistnove Premium", "Couple Friendly", "Pay at Hotel"],
    type: "Townhouse",
    description: "Premium townhouse with modern amenities and sanitized rooms. Perfect for couples and business travelers.",
    rooms: [
        {
            id: "r1_c",
            type: "Classic",
            price: 1499,
            originalPrice: 2999,
            amenities: ["AC", "TV", "Wifi", "Queen Size Bed"],
            image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&fit=crop",
            description: "Compact and cozy room for a comfortable stay.",
            maxGuests: 2,
            available: 5
        },
        {
            id: "r1_d",
            type: "Deluxe",
            price: 1899,
            originalPrice: 3499,
            amenities: ["AC", "TV", "Wifi", "King Size Bed", "Work Desk"],
            image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&fit=crop",
            description: "Spacious room with a workstation, perfect for business travelers.",
            maxGuests: 3,
            available: 3
        }
    ]
  },
  {
    id: "h2",
    name: "Mistnove Home 456 - Indiranagar",
    location: "Indiranagar, Bangalore",
    distance: "2.5 km",
    rating: 4.2,
    ratingCount: 850,
    price: 999,
    originalPrice: 1999,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&fit=crop",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&fit=crop"
    ],
    amenities: ["AC", "Wifi", "Kitchen", "Geyser"],
    tags: ["Family", "Entire Home"],
    type: "Home",
    description: "Cozy home in the heart of Indiranagar. Ideal for families and long stays.",
    rooms: [
        {
            id: "r2_std",
            type: "Standard Room",
            price: 999,
            originalPrice: 1999,
            amenities: ["Wifi", "Queen Size Bed", "Geyser"],
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&fit=crop",
            description: "Simple and clean room for budget travelers.",
            maxGuests: 2,
            available: 4
        },
        {
            id: "r2_apt",
            type: "1BHK Apartment",
            price: 2499,
            originalPrice: 3999,
            amenities: ["AC", "Wifi", "Kitchen", "Living Area", "TV"],
            image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&fit=crop",
            description: "Entire 1BHK apartment with kitchen and living area.",
            maxGuests: 4,
            available: 2
        }
    ]
  },
  {
    id: "h3",
    name: "Collection O 789 - Whitefield",
    location: "Whitefield, Bangalore",
    distance: "5.0 km",
    rating: 4.0,
    ratingCount: 500,
    price: 1299,
    originalPrice: 2499,
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&fit=crop"
    ],
    amenities: ["AC", "TV", "Wifi", "Power Backup", "Lift"],
    tags: ["Business Friendly", "Sanitized"],
    type: "Hotel",
    description: "Budget-friendly hotel with essential amenities for business travelers.",
    rooms: [
         {
            id: "r3_saver",
            type: "Saver",
            price: 1299,
            originalPrice: 2499,
            amenities: ["AC", "TV", "Wifi", "Single Bed"],
            image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&fit=crop",
            description: "Compact room for solo travelers.",
            maxGuests: 1,
            available: 5
        },
        {
            id: "r3_classic",
            type: "Classic",
            price: 1599,
            originalPrice: 2899,
            amenities: ["AC", "TV", "Wifi", "Queen Size Bed"],
            image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&fit=crop",
            description: "Standard room with all basic amenities.",
            maxGuests: 2,
            available: 6
        }
    ]
  },
  {
    id: "h4",
    name: "Mistnove Resort - Nandi Hills",
    location: "Nandi Hills, Bangalore",
    distance: "45 km",
    rating: 4.8,
    ratingCount: 200,
    price: 4999,
    originalPrice: 8999,
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&fit=crop",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&fit=crop"
    ],
    amenities: ["Pool", "Spa", "Wifi", "Restaurant", "Bar"],
    tags: ["Resort", "Luxury", "Couple Friendly"],
    type: "Resort",
    description: "Luxury resort with breathtaking views of Nandi Hills. Experience tranquility and comfort.",
    rooms: [
        {
            id: "r4_villa",
            type: "Garden Villa",
            price: 4999,
            originalPrice: 8999,
            amenities: ["AC", "Bathtub", "Private Garden", "King Size Bed"],
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&fit=crop",
            description: "Luxurious villa with a private garden and bathtub.",
            maxGuests: 3,
            available: 2
        },
        {
            id: "r4_pool",
            type: "Pool View Suite",
            price: 6499,
            originalPrice: 10999,
            amenities: ["AC", "Jacuzzi", "Pool View", "Balcony"],
            image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&fit=crop",
            description: "Premium suite offering stunning pool views and a private jacuzzi.",
            maxGuests: 3,
            available: 3
        }
      ]
    }
];

export const MOCK_ORDERS = {
  food: [
    {
      id: "ord_f1",
      restaurantId: "r1",
      restaurantName: "Meghana Foods",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&fit=crop",
      items: ["Special Chicken Biryani x 2", "Chicken 65 x 1"],
      total: 850,
      date: "2024-02-15T13:30:00",
      status: "Preparing" // Changed to active status
    },
    {
      id: "ord_f3",
      restaurantId: "r3",
      restaurantName: "Empire Restaurant",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&fit=crop",
      items: ["Ghee Rice", "Kababs"],
      total: 320,
      date: "2024-02-15T13:45:00",
      status: "Out for Delivery" // Added active order
    },
    {
        id: "ord_f1_old", // Renamed old delivered one to keep history
        restaurantId: "r1",
        restaurantName: "Meghana Foods",
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&fit=crop",
        items: ["Special Chicken Biryani x 2"],
        total: 600,
        date: "2024-01-10T13:30:00",
        status: "Delivered"
    },
    {
      id: "ord_f2",
      restaurantId: "r2",
      restaurantName: "Truffles",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&fit=crop",
      items: ["All American Cheese Burger x 1", "Peri Peri Fries x 1"],
      total: 450,
      date: "2024-02-10T19:45:00",
      status: "Delivered"
    }
  ],
  hotels: [
    {
      id: "bk_h1",
      hotelId: "h1",
      hotelName: "Mistnove Townhouse 123",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&fit=crop",
      location: "Koramangala, Bangalore",
      checkIn: "2024-03-01",
      checkOut: "2024-03-03",
      roomType: "Classic",
      rooms: 1,
      total: 2998,
      status: "Upcoming",
      otp: "4521",
      coordinates: { lat: 12.9352, lng: 77.6245 }
    },
    {
      id: "bk_h2",
      hotelId: "h4",
      hotelName: "Mistnove Resort - Nandi Hills",
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&fit=crop",
      location: "Nandi Hills, Bangalore",
      checkIn: "2023-12-24",
      checkOut: "2023-12-25",
      roomType: "Garden Villa",
      rooms: 1,
      total: 4999,
      status: "Completed",
      otp: "9876",
      coordinates: { lat: 13.3702, lng: 77.6835 }
    }
  ]
};

export const TRAVEL_PROVIDERS = [
  {
      id: "t1",
      type: "Cab",
      vehicleModel: "Prime Sedan",
      plateNumber: "KA 01 AB 1234",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&fit=crop",
      driver: {
          name: "Ramesh Kumar",
          rating: 4.8,
          trips: 1240,
          image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&fit=crop",
          phone: "+919876543210"
      },
      pricePerKm: 18,
      baseFare: 50,
      eta: 4,
      amenities: ["AC", "Wifi", "Music System", "4 Seater"],
      hourlyPackages: [
          { hours: 4, km: 40, price: 899 },
          { hours: 8, km: 80, price: 1699 }
      ]
  },
  {
      id: "t2",
      type: "Cab",
      vehicleModel: "Mini Hatchback",
      plateNumber: "KA 05 XY 5678",
      image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&fit=crop",
      driver: {
          name: "Suresh B",
          rating: 4.5,
          trips: 850,
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&fit=crop",
          phone: "+919876543211"
      },
      pricePerKm: 14,
      baseFare: 40,
      eta: 8,
      amenities: ["AC", "4 Seater"],
      hourlyPackages: [
          { hours: 4, km: 40, price: 699 },
          { hours: 8, km: 80, price: 1299 }
      ]
  },
  {
      id: "t3",
      type: "Auto",
      vehicleModel: "Bajaj RE",
      plateNumber: "KA 03 MN 9012",
      image: "https://images.unsplash.com/photo-1596450537090-b2cb705c7546?w=800&fit=crop",
      driver: {
          name: "Manju",
          rating: 4.9,
          trips: 3200,
          image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&fit=crop",
          phone: "+919876543212"
      },
      pricePerKm: 13,
      baseFare: 30,
      eta: 2,
      amenities: ["3 Seater"],
      hourlyPackages: []
  },
  {
      id: "t4",
      type: "Bike",
      vehicleModel: "Honda Activa",
      plateNumber: "KA 53 JK 3456",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&fit=crop",
      driver: {
          name: "Rahul",
          rating: 4.6,
          trips: 450,
          image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&fit=crop",
          phone: "+919876543213"
      },
      pricePerKm: 7,
      baseFare: 20,
      eta: 5,
      amenities: ["Helmet Provided", "1 Seater"],
      hourlyPackages: []
  }
];
