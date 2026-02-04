import { motion } from 'framer-motion';
import {
  BookOpen,
  Users,
  Award,
  Target,
  Heart,
  Globe,
  Quote,
  Star,
  CheckCircle2,
  ArrowRight,
  Play,
  Sparkles,
  GraduationCap,
  BookMarked,
  Zap,
  Shield,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CallToAction } from '@/components/home/CallToAction';
import { Button } from '@/components/ui/button';

const values = [
  {
    icon: BookOpen,
    title: 'Authentic Teaching',
    description: 'Traditional methodologies passed down through generations of Islamic scholars.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Users,
    title: 'Student-Centered',
    description: 'Personalized attention and guidance tailored to individual learning needs.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Highest standards in Quranic education and spiritual development.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Target,
    title: 'Clear Goals',
    description: 'Structured curriculum with clear milestones to track progress.',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    icon: Heart,
    title: 'Compassion',
    description: 'Nurturing environment where every student feels supported.',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Connecting students worldwide with qualified teachers.',
    gradient: 'from-indigo-500 to-blue-500',
  },
];

const team = [
  {
    name: 'Syed Reshail ur Rehman',
    role: 'Qari Quran | Scholar',
    image: `/images/Reshail.jpeg`,
    description: 'Masters in Islamic Studies | Dars e Nizami from Jamia Abi Bakar Al Islamia',
    credentials: ['Islamic Scholar', 'Qari Quran', 'Masters Degree'],
  },
  {
    name: ' Muhammad Shehroz',
    role: 'Qari Quran | Hafiz',
    image: '/images/Shehroz.jpeg',
    description: 'Hafiz e Quran with certification.',
    credentials: ['Tajweed Specialist', 'Certified', '1+ Years'],
  },
  {
    name: 'Feemale Teacher',
    role: 'Female Students Teacher',
    image: 'https://images.meesho.com/images/products/84024548/f6yda_512.webp?width=512',
    description: 'Dedicated to providing quality Quran education for sisters worldwide.',
    credentials: ['Education Expert', 'Curriculum Developer', '2+ Years'],
  },
];

const stats = [
  { value: '5,000+', label: 'Students Enrolled', icon: Users },
  { value: '100+', label: 'Certified Teachers', icon: GraduationCap },
  { value: '50+', label: 'Countries Reached', icon: Globe },
  { value: '98%', label: 'Success Rate', icon: Award },
];

const milestones = [
  { year: '2015', title: 'Foundation', description: 'Established with a vision to make Quranic education accessible globally.' },
  { year: '2017', title: 'First 1000 Students', description: 'Reached our first major milestone with students from over 20 countries.' },
  { year: '2019', title: 'Curriculum Expansion', description: 'Launched advanced Tajweed and Hifz programs with certified instructors.' },
  { year: '2021', title: 'Global Recognition', description: 'Received accreditation and partnerships with renowned Islamic institutions.' },
  { year: '2023', title: '5000+ Community', description: 'Growing strong with a global community of dedicated learners and scholars.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" />

          {/* Gradient Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[80px]"
          />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

          {/* Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0f_70%)]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium text-white/70">Established 2015 • Trusted Worldwide</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight"
            >
              Illuminating Hearts
              <br />
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                  Through Knowledge
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 origin-left rounded-full"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Miftah Al Quran — The Key to the Quran — was founded with a sacred mission to make
              authentic Quranic education accessible to every seeker of knowledge, anywhere in the world.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="h-14 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 text-base font-semibold shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/40"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Start Learning Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 rounded-2xl bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-sm text-base font-semibold transition-all duration-300 group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Our Story
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm hover:border-white/10 transition-all duration-300">
                    <stat.icon className="w-6 h-6 text-emerald-400 mb-3 mx-auto" />
                    <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-white/50 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <BookMarked className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Our Story</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                A Journey of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                  Faith & Education
                </span>
              </h2>

              <div className="space-y-6 text-white/60 leading-relaxed text-lg">
                <p>
                  Miftah Al Quran was established in <span className="text-white font-medium">2015</span> by a group of dedicated Islamic
                  scholars who recognized the urgent need for quality, accessible Quranic education
                  in the digital age.
                </p>
                <p>
                  Our founders, all holding <span className="text-white font-medium">Ijazah certifications</span> from renowned Islamic
                  institutions including Al-Azhar University, envisioned a platform where students from any corner of
                  the world could learn the Quran with proper guidance.
                </p>
                <p>
                  Today, we have grown into a vibrant global community of over <span className="text-white font-medium">5,000 students</span>,
                  <span className="text-white font-medium"> 100+ certified teachers</span>, and a comprehensive curriculum.
                </p>
              </div>

              {/* Key Points */}
              <div className="mt-10 grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: 'Ijazah Certified Teachers' },
                  { icon: Zap, text: 'Personalized Learning Paths' },
                  { icon: Clock, text: 'Flexible Scheduling' },
                  { icon: Globe, text: 'Global Community' }
                ].map((point, index) => (
                  <motion.div
                    key={point.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <point.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-white/80 font-medium">{point.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image Bento Grid */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-6 grid-rows-6 gap-4 h-[500px] md:h-[600px]">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="col-span-4 row-span-4 rounded-3xl overflow-hidden relative group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1585036156171-384164a8c675?w=600"
                    alt="Students learning"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="col-span-2 row-span-3 rounded-3xl overflow-hidden relative group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600"
                    alt="Quran study"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="col-span-2 row-span-3 rounded-3xl overflow-hidden relative group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=600"
                    alt="Islamic education"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="col-span-4 row-span-2 rounded-3xl overflow-hidden relative group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600"
                    alt="Online learning"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-8 -left-8 md:-left-12"
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-2xl shadow-emerald-500/30">
                  <p className="text-5xl font-bold text-white">8+</p>
                  <p className="text-sm font-medium text-white/80">Years of Excellence</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0f]" />

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] translate-x-1/2" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Target className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Our Purpose</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
              Guided by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Purpose & Vision
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden">
                {/* Decorative Gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
                    <Target className="w-8 h-8 text-emerald-400" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Our Mission
                  </h3>

                  <p className="text-white/60 leading-relaxed text-lg mb-8">
                    To provide accessible, authentic, and comprehensive Quranic education
                    that nurtures both the intellectual understanding and spiritual connection
                    with the Holy Quran, guided by qualified scholars in a supportive
                    learning environment.
                  </p>

                  <div className="pt-6 border-t border-white/10">
                    <div className="flex items-start gap-3">
                      <Quote className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                      <p className="text-white/50 italic text-sm">
                        "The best among you are those who learn the Quran and teach it."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.05] backdrop-blur-sm overflow-hidden">
                {/* Decorative Gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6">
                    <Sparkles className="w-8 h-8 text-amber-400" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Our Vision
                  </h3>

                  <p className="text-white/60 leading-relaxed text-lg mb-8">
                    To become the world's leading online Quran academy, producing generations
                    of Muslims who not only recite the Quran beautifully but also understand,
                    practice, and spread its timeless teachings in their daily lives.
                  </p>

                  <div className="pt-6 border-t border-white/10">
                    <div className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                      <p className="text-white/50 italic text-sm">
                        Building bridges between hearts and the Divine Word.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">Our Journey</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Milestones of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">
                Our Growth
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              From humble beginnings to a global community, see how we've grown over the years.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-violet-500 to-indigo-500 transform md:-translate-x-1/2" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start gap-8 md:gap-16 mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-purple-500 transform -translate-x-1/2 mt-2 shadow-lg shadow-purple-500/50 ring-4 ring-[#0a0a0f]" />

                {/* Content */}
                <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:text-right md:pr-20' : 'md:text-left md:pl-20'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`inline-block p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] ${index % 2 === 0 ? 'md:ml-auto' : ''}`}
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 text-white text-sm font-bold mb-3">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-white/50">
                      {milestone.description}
                    </p>
                  </motion.div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0f]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 mb-6">
              <Heart className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-rose-400">Our Values</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              The Principles That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">
                Guide Us
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Every decision we make is rooted in these core values that define who we are.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                <div className="relative h-full p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm hover:border-white/10 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} p-[1px] mb-5`}>
                    <div className="w-full h-full rounded-xl bg-[#0a0a0f] flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" />

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[150px] -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[150px] translate-x-1/2" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <Users className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium text-indigo-400">Our Team</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Meet Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Distinguished Scholars
              </span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Our team of dedicated scholars and educators are committed to
              providing the highest quality Quranic education.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group text-center"
              >
                <div className="relative mb-6 inline-block">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 scale-90" />

                  {/* Image Container */}
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-br from-indigo-500 to-purple-500">
                    <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0f]">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top object-right transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg shadow-emerald-500/30">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      Available
                    </span>
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-white/50 text-sm leading-relaxed mb-5 max-w-xs mx-auto">
                  {member.description}
                </p>

                {/* Credentials */}
                <div className="flex flex-wrap justify-center gap-2">
                  {member.credentials.map((credential) => (
                    <span
                      key={credential}
                      className="px-3 py-1 text-xs font-medium bg-white/[0.05] text-white/60 rounded-full border border-white/[0.05]"
                    >
                      {credential}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 rounded-xl bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 group"
            >
              View All Instructors
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-[#0a0a0f] to-teal-900/30" />

        {/* Decorative Elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px]"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex p-4 rounded-2xl bg-white/[0.05] border border-white/[0.05] backdrop-blur-sm mb-8">
              <Quote className="w-8 h-8 text-emerald-400" />
            </div>

            <blockquote className="text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed mb-10 font-light">
              "Miftah Al Quran transformed my relationship with the Holy Quran.
              The teachers are incredibly patient and knowledgeable. I went from
              struggling with basic recitation to now memorizing with proper Tajweed."
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-emerald-500/50">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Sarah </p>
                <p className="text-white/40 text-sm">Student  • USA</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex justify-center gap-1 mt-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0f]" />

        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-teal-900/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 mb-8"
            >
              <Sparkles className="w-8 h-8 text-emerald-400" />
            </motion.div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Begin Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Quranic Journey
              </span>
            </h2>

            <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10">
              Join thousands of students worldwide who have transformed their connection
              with the Holy Quran through our personalized learning programs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Button
                size="lg"
                className="h-14 px-10 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 text-lg font-semibold shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/40"
              >
                Start Free Trial
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button> */}
              {/* <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 rounded-2xl bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-sm text-lg font-semibold transition-all duration-300"
              >
                View Courses
              </Button> */}
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/40 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Free Trial Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Expert Teachers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Flexible Schedule</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}