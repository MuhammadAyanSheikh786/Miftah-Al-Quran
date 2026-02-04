import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  Users, 
  Clock, 
  Shield,
  Play,
  Gift,
  Zap,
  Globe,
  Award,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Animated Counter Component
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, { duration });
    return controls.stop;
  }, [count, value, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [rounded]);

  return <span>{displayValue.toLocaleString()}</span>;
}

// Trust badges data
const trustBadges = [
  { icon: Shield, text: 'No Credit Card Required' },
  { icon: Clock, text: 'Cancel Anytime' },
  { icon: Gift, text: 'Money Back Guarantee' },
];

// Stats data
const stats = [
  { value: 5000, suffix: '+', label: 'Students Enrolled', icon: Users },
  { value: 50, suffix: '+', label: 'Countries', icon: Globe },
  { value: 4.9, suffix: '', label: 'Average Rating', icon: Star, isDecimal: true },
  { value: 100, suffix: '%', label: 'Satisfaction', icon: Heart },
];

// Floating testimonial avatars
const avatars = [
  { initial: 'A', color: 'from-violet-500 to-purple-600', position: 'top-20 left-[10%]' },
  { initial: 'M', color: 'from-amber-500 to-orange-500', position: 'top-32 right-[15%]' },
  { initial: 'S', color: 'from-emerald-500 to-teal-500', position: 'bottom-24 left-[20%]' },
  { initial: 'F', color: 'from-rose-500 to-pink-500', position: 'bottom-32 right-[10%]' },
  { initial: 'K', color: 'from-blue-500 to-cyan-500', position: 'top-40 left-[25%]' },
];

export function CallToAction() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
      {/* Multi-Layer Background */}
      <div className="absolute inset-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
        
        {/* Animated Gradient Overlay */}
        <motion.div
          animate={{
            background: [
              'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
              'radial-gradient(ellipse 60% 60% at 40% 40%, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
              'radial-gradient(ellipse 80% 50% at 60% 60%, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />

        {/* Mesh Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              background: i % 3 === 0 
                ? 'rgba(251, 191, 36, 0.6)' 
                : i % 3 === 1 
                  ? 'rgba(16, 185, 129, 0.5)'
                  : 'rgba(255, 255, 255, 0.3)',
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
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

      {/* Floating Avatars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        {avatars.map((avatar, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
            animate={{
              y: [-10, 10, -10],
              rotate: [-5, 5, -5],
            }}
            // @ts-ignore
            transition={{
              y: { duration: 4 + index, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5 + index, repeat: Infinity, ease: "easeInOut" },
            }}
            className={cn("absolute", avatar.position)}
          >
            <div className={cn(
              "w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold shadow-xl border-2 border-white/20",
              avatar.color
            )}>
              {avatar.initial}
            </div>
            {/* Speech bubble indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center">
              <Star className="w-2.5 h-2.5 text-white fill-white" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Main CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group"
          >
            {/* Card Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 via-emerald-500/30 to-amber-500/30 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            
            {/* Main Card */}
            <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
              {/* Glass Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50" />
              
              {/* Border Gradient */}
              <div className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] border border-white/10" />
              
              {/* Content */}
              <div className="relative px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
                
                {/* Top Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center mb-8"
                >
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/30 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                    </span>
                    <span className="text-sm font-semibold text-amber-300">
                      Limited Time: 50% Off First Month
                    </span>
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                </motion.div>

                {/* Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-8"
                >
                  <div className="relative">
                    {/* Outer Ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-4 rounded-full border-2 border-dashed border-amber-500/30"
                    />
                    
                    {/* Main Icon Container */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30">
                      <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-white" />
                      
                      {/* Sparkle Effects */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-2 -right-2"
                      >
                        <Sparkles className="w-6 h-6 text-amber-300" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-center mb-6"
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                    Begin Your Journey of
                    <br />
                    <span className="relative inline-block mt-2">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400">
                        Quranic Excellence
                      </span>
                      {/* Animated Underline */}
                      <motion.svg
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="absolute -bottom-2 left-0 w-full h-3"
                        viewBox="0 0 300 12"
                        fill="none"
                      >
                        <path
                          d="M2 10C80 4 220 4 298 10"
                          stroke="url(#cta-underline)"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="cta-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
                            <stop offset="50%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </motion.svg>
                    </span>
                  </h2>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                  Join thousands of students worldwide who have transformed their 
                  relationship with the Holy Quran through our expert-led, personalized courses.
                </motion.p>

                {/* Stats Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10"
                >
                  {stats.map((stat, index) => (
                    <div 
                      key={index}
                      className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center justify-center gap-1.5 mb-2">
                        <stat.icon className="w-4 h-4 text-amber-400" />
                        <span className="text-2xl md:text-3xl font-bold text-white">
                          {stat.isDecimal ? stat.value : <AnimatedCounter value={stat.value} />}
                          {stat.suffix}
                        </span>
                      </div>
                      <span className="text-xs md:text-sm text-white/60">{stat.label}</span>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
                >
                  {/* Secondary CTA */}
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="group border-2 border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white font-semibold px-8 md:px-10 py-7 md:py-8 text-base md:text-lg rounded-2xl backdrop-blur-sm transition-all duration-300"
                    asChild
                  >
                    <Link to="/courses" className="flex items-center gap-3">
                      <span className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                        <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                      </span>
                      Browse Courses
                    </Link>
                  </Button>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-wrap items-center justify-center gap-3 md:gap-6"
                >
                  {trustBadges.map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="flex items-center gap-2 text-white/70 hover:text-white/90 transition-colors"
                    >
                      <badge.icon className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-medium">{badge.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Bottom Decorative Elements */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
            </div>
          </motion.div>

          {/* Bottom Section - Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-12 md:mt-16 text-center"
          >
            {/* Award Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {[
                { icon: Award, label: 'Best Online Quran Academy 2024' },
                { icon: Shield, label: 'Verified by Islamic Scholars' },
                { icon: Star, label: 'Top Rated Platform' },
              ].map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="flex items-center gap-2 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-500/20 group-hover:border-amber-500/30 transition-all duration-300">
                    <award.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors hidden sm:block">
                    {award.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}