import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Users, 
  BookOpen, 
  Award, 
  Star,
  Sparkles,
  GraduationCap,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';
import { useRef } from 'react';

const stats = [
  { 
    icon: Users, 
    value: '5,000+', 
    label: 'Active Students',
    gradient: 'from-amber-400 to-orange-500'
  },
  { 
    icon: BookOpen, 
    value: '50+', 
    label: 'Expert Courses',
    gradient: 'from-emerald-400 to-teal-500'
  },
  { 
    icon: Award, 
    value: '100+', 
    label: 'Certified Teachers',
    gradient: 'from-violet-400 to-purple-500'
  },
];

const features = [
  { icon: Globe, text: 'Learn from Anywhere' },
  { icon: GraduationCap, text: '1-on-1 Sessions' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const contentY = useTransform(scrollY, [0, 300], [0, 50]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Multi-layer Background */}
      <div className="absolute inset-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950" />
        
        {/* Radial Gradients for Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_50%,rgba(251,191,36,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_20%_80%,rgba(16,185,129,0.1),transparent)]" />
      </div>

      {/* Parallax Background Image */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroBg}
          alt=""
          className="w-full h-[120%] object-cover opacity-20 scale-110"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
      </motion.div>

      {/* Animated Geometric Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path 
                d="M50 0L100 50L50 100L0 50Z" 
                fill="none" 
                stroke="white" 
                strokeWidth="0.5"
              />
              <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: i % 2 === 0 
                ? 'rgba(251, 191, 36, 0.4)' 
                : 'rgba(16, 185, 129, 0.3)',
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <motion.div 
        style={{ opacity: contentOpacity, y: contentY }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 md:py-32"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Announcement Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 backdrop-blur-xl mb-8 group hover:border-amber-500/40 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
                <span className="text-sm font-medium text-amber-200/90">
                  Live One To One Classes <br />
                Also Offering Feemale Teachers For Girls
                </span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                <span className="block text-white mb-2">
                  Illuminate Your
                </span>
                <span className="block text-white mb-2">
                  Soul with the
                </span>
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                    Holy Quran
                  </span>
                  {/* Decorative underline */}
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="absolute -bottom-2 left-0 w-full h-3"
                    viewBox="0 0 200 12"
                    fill="none"
                  >
                    <path
                      d="M2 10C50 4 150 4 198 10"
                      stroke="url(#underline-gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
                        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-300/80 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Embark on a transformative journey with world-renowned Islamic scholars. 
              Master Tajweed, memorize the Quran, and deepen your spiritual connection 
              through our immersive one-on-one online learning experience.
            </motion.p>

            {/* Feature Pills */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
            >
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
                >
                  <feature.icon className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-slate-300">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              {/* Secondary CTA */}
              <Button 
                size="lg" 
                variant="outline"
                className="group border-2 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 px-8 py-7 text-base rounded-2xl backdrop-blur-sm transition-all duration-300"
                asChild
              >
                <Link to="/about" className="flex items-center gap-3">
                  <span className="relative w-11 h-11 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors overflow-hidden">
                    <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                    {/* Ripple effect */}
                    <span className="absolute inset-0 rounded-full border border-white/20 animate-ping" />
                  </span>
                  <span className="flex flex-col items-start">
                    <span className="text-xs text-slate-400">Watch</span>
                    <span className="text-sm font-medium">Our Story</span>
                  </span>
                </Link>
              </Button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 md:gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group relative"
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
                  
                  <div className="relative p-4 md:p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] hover:border-white/10 transition-all duration-300">
                    {/* Icon */}
                    <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg mb-4`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Value */}
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 tracking-tight">
                      {stat.value}
                    </div>
                    
                    {/* Label */}
                    <div className="text-xs md:text-sm text-slate-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Decorative Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex lg:col-span-5 justify-center items-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-emerald-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
              
              {/* Rotating Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="w-full h-full rounded-full border border-amber-500/20" />
                {/* Orbital dots */}
                {[0, 90, 180, 270].map((degree) => (
                  <div
                    key={degree}
                    className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/50"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${degree}deg) translateX(calc(50% + 200px)) translateY(-50%)`,
                    }}
                  />
                ))}
              </motion.div>

              {/* Counter-rotating Middle Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                className="absolute inset-12 rounded-full border border-emerald-500/20"
              >
                {/* Orbital dots */}
                {[45, 135, 225, 315].map((degree) => (
                  <div
                    key={degree}
                    className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/50"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${degree}deg) translateX(calc(50% + 130px)) translateY(-50%)`,
                    }}
                  />
                ))}
              </motion.div>

              {/* Inner Static Ring */}
              <div className="absolute inset-24 rounded-full border border-white/10" />

              {/* Central Content Circle */}
              <div className="absolute inset-32 rounded-full bg-gradient-to-br from-slate-800/90 via-slate-800/80 to-slate-900/90 backdrop-blur-2xl border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
                
                <div className="relative text-center p-6">
                  {/* Arabic Calligraphy */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mb-4"
                  >
                    <span 
                      className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-amber-400 to-amber-500"
                      style={{ fontFamily: "'Amiri', 'Noto Naskh Arabic', serif" }}
                    >
                      القرآن
                    </span>
                  </motion.div>
                  
                  {/* Decorative Line */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-500/50" />
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-500/50" />
                  </div>
                  
                  {/* English Text */}
                  <p className="text-sm text-slate-300 mb-1">
                    Begin Your
                  </p>
                  <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                    Sacred Journey
                  </p>
                </div>
              </div>

              {/* Floating Stars */}
              {[
                { top: '5%', left: '20%', size: 'w-5 h-5', delay: 0 },
                { top: '15%', right: '10%', size: 'w-4 h-4', delay: 0.3 },
                { bottom: '20%', left: '5%', size: 'w-3 h-3', delay: 0.6 },
                { bottom: '10%', right: '20%', size: 'w-4 h-4', delay: 0.9 },
              ].map((star, index) => (
                <motion.div
                  key={index}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: star.delay,
                    ease: "easeInOut"
                  }}
                  className={`absolute ${star.size}`}
                  style={{ top: star.top, left: star.left, right: star.right, bottom: star.bottom }}
                >
                  <Star className="w-full h-full text-amber-400 fill-amber-400" />
                </motion.div>
              ))}

              {/* Floating Arabic Text */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-0 text-lg text-amber-400/30 font-arabic"
                style={{ fontFamily: "'Amiri', serif" }}
              >
                بِسْمِ اللَّهِ
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-24 left-0 text-sm text-emerald-400/30 font-arabic"
                style={{ fontFamily: "'Amiri', serif" }}
              >
                الرَّحْمَنِ الرَّحِيمِ
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-slate-600 flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-amber-400"
          />
        </motion.div>
      </motion.div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
    </section>
  );
}