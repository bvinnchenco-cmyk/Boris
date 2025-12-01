
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Snowflake, Thermometer, Wind, Activity, Menu, X, ArrowRight, Zap, Droplets, CheckCircle, ShoppingBag } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ProductCard from './components/ArtistCard'; 
import AIChat from './components/AIChat';
import { Artist } from './types';

// Arctic Bear Products (Localized)
const PRODUCTS: Artist[] = [
  { 
    id: '1', 
    name: 'The Polar Tub', 
    genre: 'Старт', 
    day: 'КОМПАКТ', 
    image: 'https://images.unsplash.com/photo-1543332164-6e82f355dad7?q=80&w=1000&auto=format&fit=crop',
    description: 'Идеальная портативная ледяная ванна. Трехслойная изоляция сохраняет воду холодной часами. Отличный выбор для начала пути закаливания.'
  },
  { 
    id: '2', 
    name: 'Grizzly Pro', 
    genre: 'Профи', 
    day: 'ПРОЧНОСТЬ', 
    image: 'https://images.unsplash.com/photo-1520116468816-95b69f847357?q=80&w=1000&auto=format&fit=crop',
    description: 'Жесткая конструкция с увеличенным объемом. Создана для атлетов ростом до 2 метров. Включает всепогодный чехол и систему быстрого слива.'
  },
  { 
    id: '3', 
    name: 'Kodiak Chiller', 
    genre: 'Техно', 
    day: 'МОЩЬ', 
    image: 'https://images.unsplash.com/photo-1631556097152-c39479cee8f4?q=80&w=1000&auto=format&fit=crop',
    description: 'Охладитель 0.8HP с Wi-Fi управлением. Охлаждает воду до 3°C менее чем за час. Встроена система фильтрации и озонирования.'
  },
  { 
    id: '4', 
    name: 'Arctic Barrel', 
    genre: 'Эстетика', 
    day: 'ДЕРЕВО', 
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1000&auto=format&fit=crop',
    description: 'Премиальный красный кедр со вставкой из нержавеющей стали. Естественно вписывается в ландшафт, обеспечивая профессиональный холод.'
  },
];

const BENEFITS = [
  { icon: Activity, title: 'Снижение воспаления', desc: 'Ускорьте восстановление мышц и уменьшите болевые ощущения после интенсивных тренировок.' },
  { icon: Zap, title: 'Выброс Дофамина', desc: 'Увеличение уровня дофамина на 250% для длительной концентрации и улучшения настроения.' },
  { icon: Wind, title: 'Сила Духа', desc: 'Развивайте несгибаемую ментальную стойкость, управляя реакцией организма на стресс.' },
  { icon: Thermometer, title: 'Метаболизм', desc: 'Активация бурой жировой ткани для улучшения обмена веществ и укрепления иммунитета.' },
];

const MENU_ITEMS = [
  { id: 'shop', label: 'Магазин' },
  { id: 'benefits', label: 'Польза' },
  { id: 'technology', label: 'Технологии' },
  { id: 'reviews', label: 'Отзывы' },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Artist | null>(null);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-[#06b6d4] selection:text-white cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-6">
        <motion.div 
          className="absolute inset-0 bg-[#020617]/70 backdrop-blur-md border-b border-white/10"
          style={{ opacity: headerOpacity }}
        />

        <div className="relative z-50 flex items-center gap-3">
           <div className="relative w-10 h-10 flex items-center justify-center">
             <Snowflake className="w-8 h-8 text-[#06b6d4] animate-spin-slow" style={{ animationDuration: '10s' }} />
           </div>
           <span className="font-heading text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic">
             Arctic<span className="text-[#06b6d4]">Bear</span>
           </span>
        </div>
        
        <div className="hidden md:flex gap-10 text-xs font-bold tracking-widest uppercase relative z-50">
          {MENU_ITEMS.map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              className="hover:text-[#06b6d4] transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#06b6d4] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        <button 
          onClick={() => scrollToSection('shop')}
          className="hidden md:inline-flex relative z-50 items-center gap-2 bg-[#06b6d4] text-white px-6 py-2.5 rounded-none skew-x-[-10deg] hover:bg-[#0891b2] transition-all duration-300 group"
          data-hover="true"
        >
          <span className="skew-x-[10deg] font-bold text-sm flex items-center gap-2">
            Заказать <ShoppingBag className="w-4 h-4" />
          </span>
        </button>

        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-30 bg-[#020617] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-4xl font-heading font-black text-white hover:text-[#06b6d4] transition-colors italic uppercase"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div 
          style={{ y }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-6 flex items-center justify-center"
          >
             <span className="px-4 py-1 border border-[#06b6d4] text-[#06b6d4] text-xs font-bold uppercase tracking-[0.2em] rounded-full backdrop-blur-sm bg-[#06b6d4]/10">
               Премиальные системы восстановления
             </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading font-black tracking-tighter text-white mb-6 leading-[0.9] italic uppercase">
            Покори <br />
            <span className="relative inline-block">
              <GradientText text="Холод" />
              <motion.div 
                 className="absolute -right-12 -top-8 text-[#06b6d4] opacity-30 blur-sm"
                 animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Snowflake className="w-24 h-24" />
              </motion.div>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light mb-10"
          >
            Раскройте потенциал своего тела с Arctic Bear. <br/>
            Точный контроль температуры. Промышленная надежность.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row gap-6"
          >
             <button onClick={() => scrollToSection('shop')} className="group px-10 py-5 bg-white text-[#020617] rounded-none skew-x-[-10deg] hover:bg-[#06b6d4] hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]" data-hover="true">
               <span className="skew-x-[10deg] font-black uppercase tracking-wider flex items-center gap-3">
                 Каталог <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </span>
             </button>
             <button onClick={() => scrollToSection('technology')} className="px-10 py-5 bg-transparent border border-white/20 text-white rounded-none skew-x-[-10deg] hover:border-[#06b6d4] hover:text-[#06b6d4] transition-all backdrop-blur-sm" data-hover="true">
               <span className="skew-x-[10deg] font-bold uppercase tracking-wider">
                 Как это работает
               </span>
             </button>
          </motion.div>
        </motion.div>
        
        {/* Scroll Breath Animation */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-[#06b6d4]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Вдох</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#06b6d4] to-transparent" />
        </motion.div>
      </header>

      {/* BENEFITS SECTION */}
      <section id="benefits" className="py-32 px-4 md:px-12 bg-[#020617] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6 uppercase italic">Зачем нужен <span className="text-[#06b6d4]">Холод</span></h2>
             <p className="text-slate-400 max-w-2xl mx-auto">Используется элитными спортсменами и биохакерами по всему миру. Польза холода подтверждена наукой.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((b, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0f172a]/50 border border-white/5 p-8 backdrop-blur-sm group hover:border-[#06b6d4]/50 transition-colors"
              >
                <div className="w-12 h-12 bg-[#06b6d4]/10 rounded-full flex items-center justify-center text-[#06b6d4] mb-6 group-hover:scale-110 transition-transform">
                  <b.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase font-heading">{b.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="shop" className="py-32 bg-[#082f49]/20 relative z-10 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#06b6d4] to-transparent opacity-50" />
        <div className="absolute -left-20 top-40 w-96 h-96 bg-[#06b6d4]/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase italic tracking-tighter">
              Наша <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Коллекция</span>
            </h2>
            <div className="hidden md:flex gap-2">
               <button className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                 <ArrowRight className="w-5 h-5 rotate-180" />
               </button>
               <button className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                 <ArrowRight className="w-5 h-5" />
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} artist={product} onClick={() => setSelectedProduct(product)} />
            ))}
          </div>
        </div>
      </section>

      {/* TECH SPECS */}
      <section id="technology" className="py-32 px-4 md:px-12 bg-[#020617] relative z-10">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative z-10 rounded-2xl overflow-hidden border border-[#06b6d4]/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] group">
                 <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop" alt="Chiller Tech" className="w-full grayscale group-hover:grayscale-0 transition-all duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                 
                 <div className="absolute bottom-8 left-8">
                   <div className="flex items-center gap-2 text-[#06b6d4] font-bold mb-2">
                     <div className="w-2 h-2 bg-[#06b6d4] rounded-full animate-pulse" />
                     АКТИВНОЕ ОХЛАЖДЕНИЕ
                   </div>
                   <div className="text-5xl font-heading font-black text-white">3°C</div>
                 </div>
              </div>
              {/* Background decorative square */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-white/10 -z-10 rounded-2xl" />
            </div>

            <div className="order-1 lg:order-2">
               <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-8 uppercase italic">Создано для <br/> <span className="text-[#06b6d4]">Результата</span></h2>
               <div className="space-y-8">
                 {[
                   { title: 'Термоконтроль', desc: 'Установите точную температуру от 3°C до 42°C. Холодная купель или горячая ванна — всё в одном.' },
                   { title: 'Озоновая Фильтрация', desc: 'Медицинская система озонирования убивает 99.9% бактерий, сохраняя воду кристально чистой.' },
                   { title: 'Управление с телефона', desc: 'Планируйте циклы охлаждения через приложение. Ваша ванна готова, когда готовы вы.' }
                 ].map((feat, i) => (
                   <div key={i} className="flex gap-6 border-b border-white/5 pb-8 last:border-0">
                      <div className="w-10 h-10 flex items-center justify-center border border-[#06b6d4] text-[#06b6d4] font-bold text-lg shrink-0">
                        0{i+1}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2 uppercase">{feat.title}</h4>
                        <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#020617] py-20 px-6 border-t border-white/10 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
            <span className="font-heading text-2xl font-black text-white uppercase italic mb-8">
             Arctic<span className="text-[#06b6d4]">Bear</span>
           </span>
           <div className="flex gap-8 text-sm text-slate-400 font-bold tracking-widest uppercase mb-12">
             <a href="#" className="hover:text-[#06b6d4] transition-colors">Instagram</a>
             <a href="#" className="hover:text-[#06b6d4] transition-colors">Telegram</a>
             <a href="#" className="hover:text-[#06b6d4] transition-colors">Youtube</a>
           </div>
           <p className="text-slate-600 text-xs">
             © 2024 Arctic Bear Baths. Все права защищены. <br/>
             Разработано для максимальной производительности.
           </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
