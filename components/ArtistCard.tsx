
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';
import { Artist } from '../types';
import { Snowflake } from 'lucide-react';

interface ProductCardProps {
  artist: Artist; 
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ artist: product, onClick }) => {
  return (
    <motion.div
      className="group relative h-[450px] w-full overflow-hidden bg-[#0f172a] cursor-pointer border border-white/10 hover:border-[#06b6d4] transition-all duration-500 shadow-xl"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
    >
      {/* Image Background */}
      <div className="absolute inset-0 h-3/5 overflow-hidden">
        <motion.img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.1 }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 top-auto h-2/5 p-6 flex flex-col justify-between bg-[#0f172a] border-t border-white/5 relative z-10">
         {/* Frost overlay on hover */}
         <motion.div 
           className="absolute inset-0 bg-gradient-to-r from-[#06b6d4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
         />

         <div className="flex justify-between items-start mb-2 relative z-10">
           <div>
             <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#06b6d4] mb-1 block">
               {product.day}
             </span>
             <h3 className="font-heading text-xl font-bold text-white uppercase italic">{product.name}</h3>
           </div>
           <motion.div
             variants={{
               rest: { rotate: 0 },
               hover: { rotate: 180 }
             }}
             className="text-[#06b6d4]"
           >
             <Snowflake className="w-5 h-5" />
           </motion.div>
         </div>

         <div className="relative z-10">
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
              {product.description}
            </p>
            <div className="w-full h-[1px] bg-white/10 group-hover:bg-[#06b6d4] transition-colors" />
            <div className="mt-4 flex items-center justify-between">
               <span className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-[#06b6d4] transition-colors">Подробнее</span>
               <span className="text-xs text-slate-500">Доставка 0₽</span>
            </div>
         </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
