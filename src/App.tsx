import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  MessageCircle,
  ChevronDown,
  ArrowRight,
  Instagram,
  Facebook,
  Menu,
  X,
  Plus,
  Minus,
  Leaf,
  Droplets,
  Flame,
  Wind
} from 'lucide-react';

// Assets
import heroImg from '@/assets/hero_premium.png';
import radianceOil from '@/assets/radiance-oil.png';
import glowPack from '@/assets/glow-pack.png';
import manjisthaOil from '@/assets/manjistha-oil.png';
import manjisthaPack from '@/assets/manjistha-pack.png';
import hairOil from '@/assets/hair-oil.png';
import hairPack from '@/assets/hair-pack.png';
import kumkumadhiOil from '@/assets/kumkumadhi-oil.png';
import nalunguMaavu from '@/assets/nalungu-maavu.png';
import nalpamaradhiOil from '@/assets/nalpamaradhi-oil.png';

interface ProductSize {
  size: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  directions: string;
  warning: string;
  image: string;
  type: 'oil' | 'pack';
  sizes: ProductSize[];
  comingSoon?: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: "natural-radiance-oil",
    name: "Natural Radiance Face Oil",
    description: "A lightweight, non-sticky facial oil designed to deeply nourish the skin and enhance its natural glow. This easily absorbent formula helps improve skin softness and leaves the skin feeling smooth, radiant, and healthy-looking. Crafted with a blend of natural Ayurvedic herbal oils, rose petals, and saffron, it is suitable for regular skincare use.",
    ingredients: "Rose petals, Kumkuma, Ayurvedic Herbal Oils Blend.",
    directions: "Apply a few drops on a clean face and neck. Massage gently using upward circular strokes for 1–2 minutes. Leave on for around 15 minutes or overnight for best results.",
    warning: "For external use only. Although made with natural ingredients, every skin type is different. A patch test is strongly recommended before first use to check for any sensitivity or irritation. Avoid contact with eyes. Store in a cool, dry place.",
    image: radianceOil,
    type: 'oil',
    sizes: [
      { size: "100 ml", price: 550 },
      { size: "50 ml", price: 275 },
      { size: "30 ml", price: 150 }
    ]
  },
  {
    id: "universal-glow-pack",
    name: "Universal Glow Face Pack",
    description: "An easy to apply face pack formulated to refresh dull looking skin and leave it feeling brighter, smoother, and naturally glowing after every use. Enriched with sandalwood, rose petals, saffron, and Ayurvedic ingredients, this face pack is ideal for a weekly skincare routine and helps support a healthy looking complexion.",
    ingredients: "Chandana, Rose Petals, Kumkuma, Ayurvedic Herbal Ingredients.",
    directions: "Apply an even layer over a clean face and neck. For enhanced results, it may be used after the Natural Radiance Face Oil. Leave until dry and rinse off with normal water.",
    warning: "For external use only. Even though the formulation uses natural ingredients, a patch test is recommended before use, as natural ingredients may still cause sensitivity in some individuals. Avoid contact with eyes. Store in a cool, dry place.",
    image: glowPack,
    type: 'pack',
    sizes: [
      { size: "100 g", price: 400 },
      { size: "50 g", price: 200 },
      { size: "25 g", price: 100 }
    ]
  },
  {
    id: "herbal-hair-oil",
    name: "Herbal Hair Oil",
    description: "A nourishing herbal hair oil specially formulated to strengthen the roots and support healthy-looking hair from root to tip. Enriched with traditional Ayurvedic herbs, this blend helps reduce premature greying, supports natural hair darkening, and promotes stronger, healthier hair with regular use.",
    ingredients: "Vetiver, Bhringraja, Amlaki, Japa, Giripatra, Methi, Palandu, Brahmi, Black sesame seeds.",
    directions: "Apply the oil evenly to the scalp, roots, and along the length of the hair. Massage gently for a few minutes and leave it on for a minimum of 30 minutes or longer before washing. For best results, use regularly.",
    warning: "For external use only. Store in a cool, dry place away from direct sunlight. Avoid contact with eyes; rinse with water if contact occurs. Even natural ingredients may cause sensitivity, so a patch test is recommended before use. This pure Ayurvedic oil may solidify in cold temperatures; if so, keep the bottle half immersed in warm water until it returns to normal consistency.",
    image: hairOil,
    type: 'oil',
    sizes: [
      { size: "100 ml", price: 400 },
      { size: "50 ml", price: 200 }
    ]
  },
  {
    id: "herbal-hair-mask",
    name: "Herbal Hair Mask",
    description: "A nourishing herbal hair mask formulated to support healthy, stronger-looking hair from root to tip. Made with a blend of traditional Ayurvedic herbs and natural plant-based ingredients, this mask helps nourish the scalp, strengthen roots, and leave the hair feeling soft, refreshed, and healthy-looking with regular use.",
    ingredients: "Mudga, Hibiscus, Amla, Curry Leaf, Shigru, Methi, Kalonji, Neem Pata, Bhringraja.",
    directions: "Mix the required amount with coconut milk, curd, or plain water to form a smooth paste. Apply evenly to the scalp, roots, and along the length of the hair. Leave it on for a minimum of 45 minutes and cover the hair with a shower cap to help retain moisture and prevent the pack from drying too much, which may make it harder to wash off. Rinse thoroughly with lukewarm or cold water.",
    warning: "For external use only. Store in a cool, dry place. Avoid contact with eyes; rinse with water if contact occurs. A patch test is recommended before use, as natural ingredients may cause sensitivity in some individuals. Use immediately after mixing and do not store the prepared paste.",
    image: hairPack,
    type: 'pack',
    sizes: [
      { size: "1 kg", price: 1800 },
      { size: "500 g", price: 900 },
      { size: "250 g", price: 500 },
      { size: "100 g", price: 200 }
    ]
  },
  {
    id: "manjistha-face-oil",
    name: "Manjistha Face Oil",
    description: "A lightweight, nourishing face oil specially formulated to help improve the appearance of dark spots, sun tan, and uneven pigmentation. Enriched with Manjistha and traditional Ayurvedic herbs, this blend helps promote a brighter, more even-looking skin tone while supporting soft, healthy, and radiant skin with regular use.",
    ingredients: "Jaituna Taila, Vatada Taila, Manjistha, Yashtimadhu, Dashamoola, and other Ayurvedic herbal ingredients.",
    directions: "Apply a few drops on a clean face and neck. Massage gently using upward circular strokes for 1–2 minutes. Leave it on for a minimum of 30 minutes or overnight for best results.",
    warning: "For external use only. Store in a cool, dry place away from direct sunlight. Avoid contact with eyes; rinse with water if contact occurs. Even natural ingredients may cause sensitivity, so a patch test is recommended before use.",
    image: manjisthaOil,
    type: 'oil',
    sizes: [
      { size: "100 ml", price: 600 },
      { size: "50 ml", price: 300 },
      { size: "30 ml", price: 180 }
    ]
  },
  {
    id: "manjistha-face-pack",
    name: "Manjistha Face Pack",
    description: "A brightening herbal face pack specially formulated to help improve the appearance of dark spots, sun tan, and uneven pigmentation. Enriched with traditional Ayurvedic ingredients, this pack helps promote a brighter, smoother, and more even-looking skin tone with regular use, leaving the skin refreshed and naturally radiant.",
    ingredients: "Manjistha, Avaram Senna, Shatapatri, Chandana Churna.",
    directions: "Mix the required amount with curd or rose water to form a smooth paste. Apply an even layer over a clean face and neck. Leave it on until it is about 90% dry, then rinse thoroughly with normal water.",
    warning: "For external use only. Store in a cool, dry place. Avoid contact with eyes; rinse with water if contact occurs. Even natural ingredients may cause sensitivity, so a patch test is recommended before use. Use immediately after mixing and do not store the prepared paste.",
    image: manjisthaPack,
    type: 'pack',
    sizes: [
      { size: "100 g", price: 500 },
      { size: "50 g", price: 250 },
      { size: "25 g", price: 125 }
    ]
  },
  {
    id: "kumkumadhi-oil",
    name: "Kumkumadhi Oil",
    description: "A luxurious Ayurvedic facial oil infused with pure Kashmiri saffron, sandalwood, and precious herbs. This traditional formulation deeply penetrates the skin to illuminate skin tone, fade dark spots, and smooth fine lines, restoring a glowing, youthful, and naturally radiant complexion.",
    ingredients: "Pure Saffron (Kumkuma), Sandalwood (Chandana), Manjistha, Yashtimadhu, Lodhra, Sesame Oil base.",
    directions: "Apply 3-5 drops on clean, damp face and neck at night. Massage gently in upward circular motions for 2-3 minutes. Leave on overnight for maximum benefits.",
    warning: "For external use only. Patch test recommended. Saffron can sometimes cause minor irritation in extremely sensitive skin types. Avoid contact with eyes. Store in a cool, dry place.",
    image: kumkumadhiOil,
    type: 'oil',
    comingSoon: true,
    sizes: [
      { size: "50 ml", price: 500 },
      { size: "30 ml", price: 350 },
      { size: "15 ml", price: 200 }
    ]
  },
  {
    id: "nalungu-maavu",
    name: "Nalungu Maavu",
    description: "A revered heritage herbal bath powder crafted with skin-loving wild herbs, cooling root extracts, and organic pulses. This all-natural body wash gently cleanses, exfoliates, and removes tan, leaving your skin fragrant, smooth, and naturally glowing.",
    ingredients: "Green Gram, Kasthuri Manjal, Poolankilangu (White Turmeric), Rose Petals, Vetiver, Neem, Sandalwood.",
    directions: "Mix with water, milk, or rose water to form a smooth paste. Apply all over the body, rub gently in circular motions to exfoliate, and rinse thoroughly with normal water.",
    warning: "For external use only. Store in an airtight container in a cool, dry place. Natural ingredients can cause allergic reactions, so a patch test is recommended.",
    image: nalunguMaavu,
    type: 'pack',
    comingSoon: true,
    sizes: [
      { size: "200 g", price: 350 },
      { size: "100 g", price: 200 },
      { size: "50 g", price: 100 }
    ]
  },
  {
    id: "nalpamaradhi-oil",
    name: "Nalpamaradhi Body Polishing Oil",
    description: "A classical Ayurvedic body oil enriched with the barks of four sacred Ficus trees (Nalpamara). Famous for its skin-brightening and texturizing properties, this oil helps lighten tan, heal sun damage, and leave the entire body with an exquisite, healthy golden glow.",
    ingredients: "Bark of Ficus Retusa (Athi), Ficus Infectoria (Ithi), Ficus Religiosa (Araal), Ficus Bengalensis (Peral), Turmeric, Sesame Oil, Vetiver.",
    directions: "Warm the oil slightly and massage all over the body. Leave on for 20-30 minutes, then wash off with warm water and Nalungu Maavu or a natural soap.",
    warning: "For external use only. Due to the natural turmeric content, this oil may temporarily stain light-colored fabrics or skin. Avoid immediate sun exposure after application. Patch test recommended.",
    image: nalpamaradhiOil,
    type: 'oil',
    comingSoon: true,
    sizes: [
      { size: "200 ml", price: 350 },
      { size: "100 ml", price: 180 },
      { size: "50 ml", price: 90 }
    ]
  }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${scrolled ? 'py-4 nav-glass shadow-lg' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="text-heritage-green font-display text-2xl font-bold tracking-tight">
          Jyothi <span className="font-light italic text-rich-copper">Naturals</span>
        </div>

        <div className="hidden md:flex gap-10">
          {['Products', 'Heritage', 'Process', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-bold uppercase tracking-[0.3em] text-heritage-green/60 hover:text-heritage-green hover:scale-105 transition-all duration-300 relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-heritage-green transition-all duration-500 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://wa.me/919731414523?text=Hello%20Jyothi%20Naturals!%20I%20visited%20your%20website%20and%20would%20like%20to%20inquire%20about%20your%20products."
            className={`hidden sm:flex items-center justify-center border border-heritage-green/20 text-heritage-green px-6 py-2 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-heritage-green hover:text-white transition-all duration-500 ${scrolled ? 'bg-white/40' : ''}`}
          >
            WhatsApp Us
          </a>
          <button className="md:hidden text-heritage-green" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-cream-base border-b border-heritage-green/5 shadow-2xl p-10 flex flex-col gap-8"
          >
            {['Products', 'Heritage', 'Process', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-widest text-center" onClick={() => setIsOpen(false)}>
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProductCard = ({ product, index, onOpen }: { product: Product; index: number; onOpen: (p: Product) => void }) => {
  const minPrice = product.sizes && product.sizes.length > 0 ? Math.min(...product.sizes.map(s => s.price)) : 0;
  const maxPrice = product.sizes && product.sizes.length > 0 ? Math.max(...product.sizes.map(s => s.price)) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
      className="product-card group"
    >
      <div
        onClick={() => onOpen(product)}
        className="product-image-container group cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-image group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-heritage-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
          <span className="glass px-3 py-1 text-[9px] uppercase font-bold tracking-widest text-heritage-green shadow-sm">
            {product.type === 'oil' ? 'Nourish' : 'Essence'}
          </span>
          {product.comingSoon && (
            <span className="bg-rich-copper text-white px-3 py-1 text-[9px] uppercase font-bold tracking-widest shadow-md">
              Coming Soon
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen(product);
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-heritage-green px-8 py-3 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 cursor-pointer shadow-lg"
        >
          Details
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-2xl font-light text-heritage-green leading-snug">{product.name}</h3>
            <div className="flex items-center gap-2">
              <p className="text-[11px] uppercase tracking-widest text-rich-copper/60 font-medium">No. 0{index + 1}</p>
              {minPrice > 0 && (
                <>
                  <span className="text-heritage-green/10 text-[11px]">•</span>
                  <p className="text-sm font-semibold font-sans tracking-normal text-heritage-green/80 flex items-center gap-0.5">
                    ₹{minPrice} — ₹{maxPrice}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <p className="text-sm text-ink-deep/60 leading-relaxed font-serif italic line-clamp-2">{product.description}</p>

        <div className="flex gap-4 pt-2">
          <button
            onClick={() => onOpen(product)}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-heritage-green border-b border-heritage-green/20 pb-1 hover:border-rich-copper transition-colors cursor-pointer text-left"
          >
            {product.comingSoon ? 'Pre-Order / Inquire' : 'Select Size & Order'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-screen bg-cream-base overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImg}
          alt="Luxury Essence"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream-base to-transparent"></div>
      </motion.div>

      <div className="absolute inset-0 z-[1] hero-gradient-overlay pointer-events-none md:block hidden"></div>
      <div className="absolute inset-0 z-[1] bg-cream-base/40 md:hidden"></div>

      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 md:px-20 flex items-center">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="text-6xl md:text-[7rem] leading-[0.9] font-light text-heritage-green mb-10">
            Skin knows <br />
            <span className="serif-italic text-rich-copper">no gender.</span>
          </h1>
          <p className="text-lg md:text-xl text-ink-deep/80 font-serif italic mb-12 max-w-lg leading-relaxed">
            Simple, gentle, and effective daily skincare crafted with wholesome, plant-based ingredients to support your skin's natural health.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#products" className="btn-primary group">
              Shop The Products
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#process" className="btn-secondary">
              Our Process
            </a>
          </div>
        </motion.div>
      </div>

      {/* Side Label */}
      <div className="absolute right-12 top-1/2 -rotate-90 origin-right hidden lg:block">
        <p className="text-[10px] uppercase font-bold tracking-[1em] text-heritage-green/30">
          Est. MCMXCIV • Small Batch Ayurveda
        </p>
      </div>

      {/* Floating element */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 md:left-20 md:translate-x-0 flex flex-col items-center gap-4 text-heritage-green/40"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-heritage-green/40 to-transparent"></div>
        <span className="text-[9px] uppercase font-bold tracking-widest vertical-text">Scroll</span>
      </motion.div>
    </section>
  );
};

const Craftsmanship = () => {
  const steps = [
    { icon: <Leaf />, title: "Natural Ingredients", desc: "Made with carefully selected natural ingredients." },
    { icon: <Flame />, title: "Traditional Care", desc: "Prepared in small batches with traditional care." },
    { icon: <Droplets />, title: "Mindful Preparation", desc: "Inspired by traditional wellness and mindful preparation." },
    { icon: <Wind />, title: "Handcrafted Batches", desc: "Every batch is hand-poured and packaged with care." }
  ];

  return (
    <section id="process" className="py-40 bg-heritage-green text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="luxury-label !text-copper-light">The Master's Method</span>
              <h2 className="text-5xl md:text-7xl font-light text-white leading-tight">
                Crafted in <br /> <span className="serif-italic text-copper-light">Deep Patience.</span>
              </h2>
            </div>

            <p className="text-xl text-white/60 font-serif italic leading-relaxed">
              Our process is grounded in simplicity and patience, ensuring every batch is made safely and authentically.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
              {steps.map((step, i) => (
                <div key={i} className="space-y-4 group">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-copper-light group-hover:bg-copper-light group-hover:text-heritage-green transition-all duration-500">
                    {step.icon}
                  </div>
                  <h4 className="text-lg font-medium">{step.title}</h4>
                  <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={heroImg} className="w-full h-full object-cover grayscale brightness-50 opacity-50" alt="Process" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <p className="text-8xl md:text-[12rem] font-display text-white/20 select-none shadow-glow">100%</p>
                  <p className="text-sm uppercase tracking-[0.5em] text-copper-light font-bold">Purely Natural</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rich-copper/20 blur-3xl rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { text: "The Natural Radiance Oil is unlike anything I've tried. My skin feels like it's finally breathing.", author: "Elena V.", role: "Wellness Architect" },
    { text: "You can smell the authenticity. This isn't just skincare; it's a ritual of grounding.", author: "Sarah M.", role: "Yoga Practitioner" }
  ];

  return (
    <section className="py-40 bg-cream-base border-y border-heritage-green/5">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <span className="luxury-label">Whispers from the Collective</span>
        <div className="mt-20 space-y-32">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <p className="text-3xl md:text-5xl font-serif italic text-heritage-green leading-snug">
                "{rev.text}"
              </p>
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-rich-copper">{rev.author}</p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-heritage-green/40">{rev.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (selectedProduct && selectedProduct.sizes && selectedProduct.sizes.length > 0) {
      setSelectedSize(selectedProduct.sizes[0]);
      setQuantity(1);
    } else {
      setSelectedSize(null);
      setQuantity(1);
    }
  }, [selectedProduct]);

  const getWhatsAppUrl = () => {
    if (!selectedProduct || !selectedSize) return "https://wa.me/919731414523";

    const totalPrice = selectedSize.price * quantity;
    const isComingSoon = selectedProduct.comingSoon;

    let message = "";
    if (isComingSoon) {
      message = `Hello Jyothi Naturals! I am interested in pre-ordering the following product from your website:\n\n*Product:* ${selectedProduct.name}\n*Size/Weight:* ${selectedSize.size}\n*Quantity:* ${quantity}\n*Estimated Total:* ₹${totalPrice}\n\nPlease notify me when it is available!`;
    } else {
      message = `Hello Jyothi Naturals! I would like to purchase the following product from your website:\n\n*Product:* ${selectedProduct.name}\n*Size/Weight:* ${selectedSize.size}\n*Quantity:* ${quantity}\n*Total:* ₹${totalPrice}\n\nCan you please confirm my order?`;
    }

    return `https://wa.me/919731414523?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen selection:bg-rich-copper selection:text-white">
      <Navbar />

      <Hero />

      <section id="products" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <div className="max-w-2xl space-y-6">
              <span className="luxury-label">The Archive</span>
              <h2 className="text-5xl md:text-7xl font-light text-heritage-green">
                Our Curated <br /> <span className="serif-italic text-rich-copper">Products.</span>
              </h2>
            </div>
            <p className="text-lg text-heritage-green/40 font-serif italic max-w-xs text-right hidden md:block">
              Each vessel is numbered and dated, reflecting the harvest season.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} onOpen={setSelectedProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12"
          >
            <div className="absolute inset-0 bg-heritage-dark/95 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-cream-base overflow-hidden flex flex-col md:flex-row h-full max-h-[85vh] shadow-2xl"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-10 text-heritage-green hover:rotate-90 transition-transform p-2 bg-white/50 backdrop-blur cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-1/2 bg-[#F5F1EB] relative overflow-hidden">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-3.5 mb-2 flex-wrap">
                  <span className="luxury-label !mb-0">{selectedProduct.type === 'oil' ? 'Nourishing Oil' : 'Botanical Essence'}</span>
                  {selectedProduct.comingSoon && (
                    <span className="bg-rich-copper text-white px-2.5 py-0.5 text-[9px] uppercase font-bold tracking-widest shadow-sm">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h2 className="text-4xl md:text-5xl font-light mb-8 text-heritage-green leading-snug">{selectedProduct.name}</h2>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-rich-copper">Description</p>
                    <p className="text-ink-deep/70 leading-relaxed font-serif italic text-lg">{selectedProduct.description}</p>
                  </div>

                  {/* Size and Weight Selector */}
                  {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                    <div className="space-y-4">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-rich-copper">Select Size / Weight</p>
                      <div className="flex flex-wrap gap-2.5">
                        {selectedProduct.sizes.map((sizeObj) => {
                          const isSelected = selectedSize?.size === sizeObj.size;
                          return (
                            <button
                              key={sizeObj.size}
                              onClick={() => setSelectedSize(sizeObj)}
                              className={`px-4 py-2.5 text-xs font-medium uppercase tracking-wider border transition-all duration-300 rounded-none cursor-pointer flex items-center ${isSelected
                                ? 'bg-heritage-green text-white border-heritage-green shadow-md animate-pulse-subtle'
                                : 'bg-transparent text-heritage-green border-heritage-green/20 hover:border-heritage-green hover:bg-heritage-green/5'
                                }`}
                            >
                              <span>{sizeObj.size}</span>
                              <span className={`mx-2 text-[10px] ${isSelected ? 'text-white/30' : 'text-heritage-green/20'}`}>|</span>
                              <span className="font-sans font-bold text-sm tracking-tight">₹{sizeObj.price}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Quantity Selector & Total price */}
                  <div className="space-y-4">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-rich-copper">Quantity</p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center border border-heritage-green/20 bg-transparent h-[45px]">
                        <button
                          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                          className="px-4 h-full flex items-center justify-center text-heritage-green hover:bg-heritage-green/5 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-12 text-center text-sm font-bold text-heritage-green">{quantity}</span>
                        <button
                          onClick={() => setQuantity(prev => prev + 1)}
                          className="px-4 h-full flex items-center justify-center text-heritage-green hover:bg-heritage-green/5 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {selectedSize && (
                        <div className="text-heritage-green font-display text-lg flex items-center gap-1.5">
                          Total: <span className="font-sans font-extrabold text-2xl text-rich-copper tracking-tight">₹{selectedSize.price * quantity}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-10">
                    <div className="space-y-4">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-rich-copper flex items-center gap-2">
                        <Leaf className="w-3 h-3" /> Ingredients
                      </p>
                      <p className="text-sm text-ink-deep/60 leading-relaxed">{selectedProduct.ingredients}</p>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-rich-copper flex items-center gap-2">
                        <ArrowRight className="w-3 h-3" /> Directions
                      </p>
                      <p className="text-sm text-ink-deep/60 leading-relaxed">{selectedProduct.directions}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-heritage-green/5">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-heritage-green/30">CONSCIOUS CARE</p>
                    <p className="text-xs text-ink-deep/40 italic leading-relaxed">{selectedProduct.warning}</p>
                  </div>

                  <div className="pt-4">
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full group cursor-pointer flex items-center justify-center gap-3"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {selectedProduct.comingSoon ? 'Pre-Order via WhatsApp' : 'Order via WhatsApp'}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Craftsmanship />

      <Testimonials />

      <section id="heritage" className="py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-20">
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-[4/5] bg-cream-base">
              <img src={heroImg} className="w-full h-full object-cover brightness-90 contrast-110" alt="Heritage" />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-heritage-green/10 hidden md:block"></div>
          </div>
          <div className="w-full md:w-1/2 space-y-10">
            <span className="luxury-label">Our Story</span>
            <h2 className="text-5xl md:text-7xl font-light text-heritage-green">
              Legacy in <br /><span className="serif-italic text-rich-copper">Every Drop.</span>
            </h2>
            <p className="text-xl text-ink-deep/60 font-serif italic leading-relaxed">
              “What began in our grandmother Jyothi’s kitchen became a tradition of care, crafted through generations.”
            </p>
            <div className="space-y-6 text-ink-deep/60 leading-relaxed">
              <p>
                Jyothi Naturals was created to preserve the wisdom, rituals, and recipes passed down by our grandmother, Jyothi. While a few of our formulations come directly from her treasured homemade remedies, the rest are thoughtfully developed through years of learning, certification, and care by Sujatha.
              </p>
              <p>
                Every product is rooted in tradition, shaped by knowledge, and made with the belief that skincare should feel honest, gentle, and timeless.
              </p>
            </div>
            <div className="pt-6">
              <p className="font-serif italic text-4xl font-light text-rich-copper tracking-wide">Sujatha</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-heritage-green/40 mt-2">Founder</p>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-[#122117] py-32 text-white/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 pb-20 border-b border-white/5">
            <div className="lg:col-span-2 space-y-12">
              <div className="text-white font-display text-4xl font-bold tracking-tight">
                Jyothi <span className="text-copper-light italic font-light">Naturals</span>
              </div>
              <p className="max-w-sm text-lg font-serif italic text-white/50 leading-relaxed">
                Homemade skincare made with love & care. <br />
                SKIN KNOWS NO GENDER
              </p>
              <div className="flex gap-10">
                <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>

            <div className="space-y-10">
              <p className="text-[10px] uppercase font-bold tracking-widest text-white">Shop</p>
              <ul className="space-y-6 text-[10px] tracking-[0.2em] font-medium">
                <li><a href="#products" className="hover:text-white transition-colors uppercase">Products</a></li>
              </ul>
            </div>

            <div className="space-y-10">
              <p className="text-[10px] uppercase font-bold tracking-widest text-white">About</p>
              <ul className="space-y-6 text-[10px] tracking-[0.2em] font-medium">
                <li><a href="#process" className="hover:text-white transition-colors uppercase">Process</a></li>
                <li><a href="#heritage" className="hover:text-white transition-colors uppercase">Heritage</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-20 flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] uppercase font-medium tracking-[0.3em]">
            <p>© 2026 Jyothi Naturals. Intention in every bottle.</p>
            <div className="flex gap-12 opacity-60">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-10 right-10 z-[200]">
        <a
          href="https://wa.me/919731414523?text=Hello%20Jyothi%20Naturals!%20I%20visited%20your%20website%20and%20would%20like%20to%20inquire%20about%20your%20products."
          className="w-16 h-16 bg-rich-copper text-white rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(166,124,82,0.3)] hover:scale-110 active:scale-95 transition-all duration-500 group relative cursor-pointer"
        >
          <div className="absolute inset-0 bg-rich-copper rounded-full animate-ping opacity-20"></div>
          <MessageCircle className="w-6 h-6 relative z-10" />
        </a>
      </div>
    </div>
  );
}

