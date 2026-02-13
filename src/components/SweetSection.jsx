import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Smile, Sun, CloudRain, Moon, Coffee, Zap, X } from 'lucide-react';

// Import photos with new names
import arandanos from '../sweetPhotos/arandanos deshidratados.jpeg';
import barra from '../sweetPhotos/barra cereal.jpeg';
import ferrero from '../sweetPhotos/chocolates ferrero.jpeg';
import mentas from '../sweetPhotos/mentas.jpeg';
import rosquillas from '../sweetPhotos/rosquillas caleñas.jpeg';
import wafer from '../sweetPhotos/wafer multicereal.jpeg';

const SWEETS = [
  {
    id: 1,
    trigger: "Cuando necesites sentirte especial",
    message: "Porque te mereces lo más rico del mundo, no tan saludable pero deliciso. Disfrútalo despacito y acuérdate de cuánto te amo.",
    emoji: "🥰",
    icon: Heart,
    color: "from-amber-500 to-orange-600",
    image: ferrero
  },
  {
    id: 2,
    trigger: "Cuando extrañes mi tierra (y a mí)",
    message: "Un poquito de mi Cali para ti. Para que sientas que estoy ahí a tu lado compartiendo un antojito.",
    emoji: "🇨🇴",
    icon: Moon,
    color: "from-yellow-500 to-red-500",
    image: rosquillas
  },
  {
    id: 3,
    trigger: "Cuando quieras un beso",
    message: "Cómete una, cierra los ojos e imagínate que es uno de esos besos caleños que nos damos. ¡Muah!",
    emoji: "💋",
    icon: Gift,
    color: "from-teal-400 to-emerald-600",
    image: mentas
  },
  {
    id: 4,
    trigger: "Cuando te falte energía",
    message: "Para ese día que falta la motivacion. Un empujoncito de energía y todo mi apoyo desde acá. ¡Tú puedes con todo, mi vida!",
    emoji: "⚡",
    icon: Zap, 
    color: "from-blue-500 to-indigo-600",
    image: barra
  },
  {
    id: 5,
    trigger: "Cuando quieras cuidarte un poquito",
    message: "Algo rico pero que te hace bien, como nosotros. Un detallito saludable para consentirte.",
    emoji: "🫐",
    icon: Sun,
    color: "from-purple-500 to-indigo-500",
    image: arandanos
  },
  {
    id: 6,
    trigger: "Cuando necesites un 'break'",
    message: "Pausa el mundo un ratico. Siéntate, relájate y cómete esto pensando en mí. ¡Te lo mereces!",
    emoji: "☕",
    icon: Coffee, 
    color: "from-orange-400 to-pink-500",
    image: wafer
  }
];

const SweetCard = ({ sweet, onClick }) => {
  return (
    <motion.div 
      className="relative w-full h-72 cursor-pointer group"
      onClick={() => onClick(sweet)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
        <div 
          className={`w-full h-full rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 text-white bg-gradient-to-br ${sweet.color} border border-white/20 relative overflow-hidden`}
        >
          {/* Decorative circles */}
          <div className="absolute top-[-20%] left-[-20%] w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-[-20%] right-[-20%] w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          
          <sweet.icon size={56} className="mb-4 drop-shadow-lg z-10" />
          <h3 className="text-xl font-bold text-center mb-2 drop-shadow-md z-10">Ábrelo...</h3>
          <p className="text-lg font-medium text-center drop-shadow-sm px-2 leading-tight z-10">{sweet.trigger}</p>
          
          <div className="absolute bottom-4 right-4 text-4xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform z-10">{sweet.emoji}</div>
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
    </motion.div>
  );
};

const SweetModal = ({ sweet, onClose }) => {
  if (!sweet) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="w-full h-[50vh] md:h-[60vh] bg-gray-100 relative shrink-0">
          {sweet.image ? (
            <img 
              src={sweet.image} 
              alt={sweet.trigger} 
              className="w-full h-full object-contain p-2" 
            />
          ) : (
             <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                <Gift size={64} />
                <span className="text-xl">Foto del dulce</span>
             </div>
          )}
          
          {/* Gradient Overlay for Text Visibility */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 bg-white flex flex-col items-center text-center grow">
          <div className={`p-3 rounded-full bg-gradient-to-br ${sweet.color} text-white mb-4 shadow-lg transform -translate-y-12`}>
            <sweet.icon size={32} />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 -mt-6">
            {sweet.trigger} {sweet.emoji}
          </h3>
          
          <p className="text-lg md:text-xl text-gray-600 italic font-medium leading-relaxed max-w-lg">
            "{sweet.message}"
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SweetSection = () => {
  const [selectedSweet, setSelectedSweet] = useState(null);

  return (
    <section className="w-full py-24 px-4 md:px-8 max-w-6xl mx-auto z-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-6 drop-shadow-lg font-serif">
          Mi San Valentín eres tú 🌹
        </h2>
        <p className="text-center text-white/90 mb-12 text-lg max-w-2xl mx-auto font-light bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg">
          No quería dejar pasar el día sin que tuvieras un detalle especial de mi. He preparado estos 6 tesoros para que me sientas cerquita en cada bocado. Toca cada tarjeta para descubrir cuándo debes disfrutar cada uno.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {SWEETS.map((sweet) => (
            <SweetCard 
              key={sweet.id} 
              sweet={sweet} 
              onClick={setSelectedSweet}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedSweet && (
          <SweetModal 
            sweet={selectedSweet} 
            onClose={() => setSelectedSweet(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default SweetSection;
