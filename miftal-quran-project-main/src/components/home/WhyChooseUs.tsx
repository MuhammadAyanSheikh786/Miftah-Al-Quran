import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Globe, 
  Clock, 
  Award, 
  Users, 
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  Star,
  ArrowRight,
  Quote,
  Play,
  Shield,
  BookOpen,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: GraduationCap,
    title: 'Certified Scholars',
    description: 'Learn from qualified Islamic scholars with Ijazah certification in Quran recitation and Tajweed mastery.',
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
    stats: '100+ Teachers',
  },
  {
    icon: Globe,
    title: 'Learn Anywhere',
    description: 'Access your courses from anywhere in the world with our flexible online platform available 24/7.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    stats: '50+ Countries',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Choose class timings that fit your schedule with live sessions and recorded content access.',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    stats: '24/7 Access',
  },
  {
    icon: Award,
    title: 'Certified Completion',
    description: 'Receive internationally recognized certificates upon successful completion of each course.',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    stats: '5000+ Certified',
  },
  {
    icon: Users,
    title: 'One-on-One Classes',
    description: 'Personalized attention with dedicated instructors ensuring faster learning progress.',
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20',
    stats: '1:1 Sessions',
  },
  {
    icon: HeartHandshake,
    title: 'Supportive Community',
    description: 'Join a global community of learners on the same spiritual journey with peer support.',
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    stats: '10K+ Members',
  },
];

const highlights = [
  'Ijazah Certified Teachers',
  'Personalized Learning Path',
  'Interactive Live Sessions',
  'Progress Tracking',
  'Mobile App Access',
  'Money Back Guarantee',
];

const testimonial = {
  quote: "The quality of teaching and the personal attention I received transformed my Quran recitation completely. I'm grateful for this blessed journey.",
  author: "Sarah Ahmed",
  role: "Tajweed Course Graduate",
  avatar: "S",
  rating: 5,
};

// Animation variants
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
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Feature Card Component
function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full"
    >
      {/* Card Glow Effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className={cn(
          "absolute -inset-0.5 rounded-3xl bg-gradient-to-r opacity-0 blur-xl transition-all duration-500",
          feature.color
        )} 
      />
      
      <div className={cn(
        "relative h-full p-6 md:p-8 rounded-2xl md:rounded-3xl border backdrop-blur-sm transition-all duration-500",
        "bg-white/80 dark:bg-slate-900/80",
        "border-slate-200 dark:border-slate-800",
        "hover:border-slate-300 dark:hover:border-slate-700",
        "hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50",
        "hover:-translate-y-1"
      )}>
        
        {/* Top Section with Icon and Stats */}
        <div className="flex items-start justify-between mb-6">
          {/* Icon */}
          <motion.div 
            animate={{ 
              rotate: isHovered ? [0, -10, 10, 0] : 0,
              scale: isHovered ? 1.1 : 1 
            }}
            transition={{ duration: 0.5 }}
            className={cn(
              "relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center",
              "bg-gradient-to-br shadow-lg",
              feature.color
            )}
          >
            <feature.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
            
            {/* Decorative Ring */}
            <div className={cn(
              "absolute -inset-1 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity",
              feature.borderColor
            )} />
          </motion.div>
          
          {/* Stats Badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold",
              "bg-gradient-to-r text-white shadow-lg",
              feature.color
            )}
          >
            {feature.stats}
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300"
            style={{ backgroundImage: isHovered ? `linear-gradient(to right, var(--tw-gradient-stops))` : undefined }}
          >
            {feature.title}
          </h3>
          
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl bg-gradient-to-r origin-left",
            feature.color
          )}
        />

        {/* Corner Decoration */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Sparkles className={cn("w-4 h-4", `text-${feature.color.split('-')[1]}-500`)} />
        </div>
      </div>
    </motion.div>
  );
}

// Main Component
export function WhyChooseUs() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        
        {/* Radial Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_20%_20%,rgba(139,92,246,0.08),transparent)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(251,191,36,0.08),transparent)]" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="why-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#why-pattern)" />
          </svg>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            className={cn(
              "absolute rounded-full opacity-20 blur-sm",
              i % 2 === 0 ? "bg-amber-400" : "bg-emerald-400",
            )}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
              width: `${20 + i * 5}px`,
              height: `${20 + i * 5}px`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 mb-6"
          >
            <Shield className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              Why Choose Us
            </span>
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Excellence in{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
                Quranic Education
              </span>
              {/* Decorative Elements */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -right-6 -top-6"
              >
                <Sparkles className="w-8 h-8 text-amber-400" />
              </motion.div>
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            We are committed to providing the highest quality Quranic education 
            with certified teachers, proven curriculum, and a supportive learning environment.
          </p>

          {/* Highlights Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
          >
            {highlights.slice(0, 4).map((highlight, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {highlight}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-20"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>

        {/* Bottom Section: Testimonial + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          {/* Testimonial Card */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 border border-slate-700 overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl" />
              
              {/* Quote Icon */}
              <div className="relative mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Quote className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Quote Text */}
              <blockquote className="relative text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Author */}
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-slate-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Decorative Pattern */}
              <div className="absolute bottom-0 right-0 opacity-5">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                  <path d="M100 0L200 100L100 200L0 100Z" stroke="white" strokeWidth="2" />
                  <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-amber-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800 border border-emerald-500/30 overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />
              
              {/* Content */}
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span className="text-sm font-medium text-white/90">Start Learning Today</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Begin Your<br />
                  <span className="text-amber-300">Quranic Journey?</span>
                </h3>
                
                <p className="text-white/80 mb-8 leading-relaxed">
                  Join thousands of students worldwide who have transformed their 
                  relationship with the Quran through our expert-led courses.
                </p>
                
                {/* Features List */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {['1-on-1 Classes', 'Certified Teachers', 'Flexible Times'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-amber-300 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-6 rounded-xl backdrop-blur-sm"
                    asChild
                  >
                    <Link to="/about" className="flex items-center gap-2">
                      <Play className="w-4 h-4 fill-white" />
                      Watch Demo
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Corner Decoration */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border-8 border-white/5 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 md:mt-20"
        >
          <div className="text-center mb-8">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">
              Trusted by Students Worldwide
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {[
              { icon: Shield, label: 'Secure Platform', value: '256-bit SSL' },
              { icon: Award, label: 'Certified Courses', value: 'Accredited' },
              { icon: Users, label: 'Active Students', value: '5,000+' },
              { icon: Star, label: 'Average Rating', value: '4.9/5' },
              { icon: Globe, label: 'Countries Served', value: '50+' },
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-500 transition-all duration-300">
                  <badge.icon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {badge.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {badge.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}