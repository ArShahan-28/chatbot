/**
 * Vintage Product Catalog Data
 * Heritage & Threads E-Commerce Store
 */

const PRODUCTS = [
    {
        id: "prod-101",
        name: "1970s Leather Biker Jacket",
        category: "Clothes",
        price: 185.00,
        originalPrice: 220.00,
        image: "assets/vintage_jacket.jpg",
        era: "1970s",
        condition: "Excellent Vintage",
        rating: 4.9,
        reviewsCount: 34,
        featured: true,
        inStock: 3,
        description: "An authentic 1970s heavy brown distressed leather jacket featuring classic brass hardware, asymmetric zip closure, zippered cuffs, and a quilted satin lining. Sourced from a vintage estate collection in Oregon.",
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Distressed Brown", hex: "#5C3D2E" },
            { name: "Cognac Leather", hex: "#8B4513" }
        ],
        details: [
            "100% Genuine Full-Grain Cowhide Leather",
            "Heavyweight brass YKK zippers",
            "Era-authentic quilted interior thermal lining",
            "Adjustable waist buckle tabs"
        ]
    },
    {
        id: "prod-102",
        name: "Craftsman Heritage Lace-Up Boots",
        category: "Shoes",
        price: 165.00,
        originalPrice: 195.00,
        image: "assets/retro_boots.jpg",
        era: "1980s",
        condition: "Mint Vintage",
        rating: 4.8,
        reviewsCount: 28,
        featured: true,
        inStock: 5,
        description: "Handcrafted cognac leather lace-up boots with rich natural patina, Goodyear welt construction, brass eyelets, and durable oil-resistant lug soles.",
        sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
        colors: [
            { name: "Cognac Tan", hex: "#C85A32" },
            { name: "Chestnut Brown", hex: "#3D405B" }
        ],
        details: [
            "Full-grain oil-tanned leather upper",
            "Goodyear welted replaceable outsole",
            "Antique brass speed hooks and eyelets",
            "Hand-burnished toe and heel"
        ]
    },
    {
        id: "prod-103",
        name: "1970s Boho Floral Prairie Dress",
        category: "Clothes",
        price: 128.00,
        originalPrice: 150.00,
        image: "assets/vintage_dress.jpg",
        era: "1970s",
        condition: "Very Good Vintage",
        rating: 5.0,
        reviewsCount: 19,
        featured: true,
        inStock: 2,
        description: "A dreamy 1970s bohemian prairie midi dress with terracotta, mustard, and sage floral motif. Features lace trim details, a fitted empire waist, and romantic billowy lantern sleeves.",
        sizes: ["XS", "S", "M"],
        colors: [
            { name: "Terracotta Floral", hex: "#C85A32" },
            { name: "Mustard Gold", hex: "#D4A373" }
        ],
        details: [
            "100% Breathable Woven Vintage Cotton",
            "Hidden back metal zip fastener",
            "Delicate crochet lace trims",
            "Tiered ruffle skirt hemline"
        ]
    },
    {
        id: "prod-104",
        name: "1960s Tortoiseshell Sunglasses",
        category: "Accessories",
        price: 74.00,
        originalPrice: 90.00,
        image: "assets/retro_sunglasses.jpg",
        era: "1960s",
        condition: "Deadstock Vintage (New Old Stock)",
        rating: 4.7,
        reviewsCount: 42,
        featured: false,
        inStock: 8,
        description: "Classic 1960s round-frame tortoiseshell sunglasses with hand-polished cellulose acetate frame and dark green UV400 glass lenses.",
        sizes: ["One Size"],
        colors: [
            { name: "Tortoiseshell", hex: "#8B4513" },
            { name: "Honey Amber", hex: "#D4A373" }
        ],
        details: [
            "Premium Hand-Crafted Italian Acetate",
            "100% UV400 Protection Optical Lenses",
            "7-barrel brass hinges",
            "Includes hand-stitched leather pouch"
        ]
    },
    {
        id: "prod-105",
        name: "Vintage Tan Leather Messenger Bag",
        category: "Accessories",
        price: 145.00,
        originalPrice: 175.00,
        image: "assets/vintage_bag.jpg",
        era: "1980s",
        condition: "Excellent Vintage",
        rating: 4.9,
        reviewsCount: 51,
        featured: true,
        inStock: 4,
        description: "Sturdy vintage saddle leather messenger satchel with double buckle flap closure, spacious cotton canvas interior, laptop divider, and adjustable shoulder strap with leather pad.",
        sizes: ["Medium (15\")"],
        colors: [
            { name: "Saddle Tan", hex: "#D4A373" },
            { name: "Dark Walnut", hex: "#5C3D2E" }
        ],
        details: [
            "Hand-stitched heavy vegetable-tanned leather",
            "Fits up to 15\" laptops comfortably",
            "Multiple interior organizer pockets",
            "Solid antique brass buckles"
        ]
    },
    {
        id: "prod-106",
        name: "1980s Chevron Pattern Wool Sweater",
        category: "Clothes",
        price: 98.00,
        originalPrice: 115.00,
        image: "assets/vintage_sweater.jpg",
        era: "1980s",
        condition: "Excellent Vintage",
        rating: 4.8,
        reviewsCount: 16,
        featured: false,
        inStock: 3,
        description: "Cozy heavy knit wool cable sweater featuring retro geometric chevron stripes in mustard yellow, terracotta, and olive green. Chunky ribbed crew neck and cuffs.",
        sizes: ["S", "M", "L"],
        colors: [
            { name: "Earth Tone Chevron", hex: "#D4A373" },
            { name: "Olive & Terracotta", hex: "#606C38" }
        ],
        details: [
            "100% Pure Virgin Wool",
            "Thick heavy-gauge cable knit construction",
            "Ribbed collar, cuffs, and hem",
            "Made in Ireland (Original Vintage)"
        ]
    },
    {
        id: "prod-107",
        name: "1980s Retro Suede High-Top Sneakers",
        category: "Shoes",
        price: 110.00,
        originalPrice: 135.00,
        image: "assets/retro_sneakers.jpg",
        era: "1980s",
        condition: "Mint Vintage",
        rating: 4.6,
        reviewsCount: 23,
        featured: false,
        inStock: 6,
        description: "Throwback 1980s court high-top sneakers crafted from off-white leather and soft mustard suede trim, padded collar, and vulcanized gum rubber soles.",
        sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
        colors: [
            { name: "Off-White & Mustard", hex: "#FAEDCD" },
            { name: "Retro Cream & Olive", hex: "#606C38" }
        ],
        details: [
            "Soft calfskin leather and suede overlays",
            "Padded ankle support collar",
            "Vintage distressed vulcanized rubber outsole",
            "Original cotton weave laces"
        ]
    },
    {
        id: "prod-108",
        name: "Classic Wool Felt Fedora Hat",
        category: "Accessories",
        price: 68.00,
        originalPrice: 85.00,
        image: "assets/vintage_hat.jpg",
        era: "1960s",
        condition: "Excellent Vintage",
        rating: 4.9,
        reviewsCount: 31,
        featured: false,
        inStock: 4,
        description: "A timeless brown 100% wool felt fedora with a teardrop crown, wide raw edge brim, and an authentic grosgrain silk ribbon band with brass feather accent.",
        sizes: ["S (56cm)", "M (58cm)", "L (60cm)"],
        colors: [
            { name: "Cognac Brown", hex: "#5C3D2E" },
            { name: "Olive Drab", hex: "#606C38" }
        ],
        details: [
            "100% Premium Australian Wool Felt",
            "Moisture-wicking internal leather sweatband",
            "Custom molded teardrop crown",
            "3-inch broad protective brim"
        ]
    }
];

// Available Categories
const CATEGORIES = ["All", "Clothes", "Shoes", "Accessories"];

// Promo Coupons
const PROMO_CODES = {
    "VINTAGE10": 0.10, // 10% off
    "RETRO20": 0.20,  // 20% off
    "HERITAGE15": 0.15 // 15% off
};
