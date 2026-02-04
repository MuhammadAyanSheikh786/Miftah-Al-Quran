import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter,
  Send,
  ArrowRight,
  Heart,
  ExternalLink,
  Clock,
  Globe,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Our Courses', path: '/courses' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Register Now', path: '/signup' },
];

const supportLinks = [
  { name: 'Help Center', path: '/help' },
  { name: 'FAQs', path: '/faqs' },
  { name: 'Student Portal', path: '/portal' },
  { name: 'Scholarship', path: '/scholarship' },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:bg-blue-500' },
  { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-500' },
  { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:bg-red-500' },
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:bg-sky-500' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/pattern-islamic.svg')] opacity-[0.02]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Stay Connected</span>
              </div>
              
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Subscribe to Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                  Newsletter
                </span>
              </h3>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Get weekly Quranic insights, course updates, and exclusive offers delivered directly to your inbox.
              </p>

              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="relative flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 sm:h-14 pl-12 pr-4 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all"
                      required
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      type="submit"
                      className="h-12 sm:h-14 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium shadow-lg shadow-emerald-500/20 transition-all"
                    >
                      <span className="hidden sm:inline">Subscribe</span>
                      <Send className="w-4 h-4 sm:ml-2" />
                    </Button>
                  </motion.div>
                </div>
                
                {isSubscribed && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-400 text-sm mt-3 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Thank you for subscribing!
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12"
        >
          {/* Brand Section - Spans more columns */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-slate-900" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-white">
                  MIFTAH{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                    AL QURAN
                  </span>
                </span>
                <span className="text-xs text-slate-500 font-medium tracking-wider uppercase">
                  Key to the Quran
                </span>
              </div>
            </Link>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Dedicated to spreading the light of Quranic knowledge through quality online education. 
              Join thousands of students worldwide on their journey of spiritual growth.
            </p>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-transparent transition-all duration-300 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400">50+ Countries</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-slate-400">24/7 Support</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span className="text-sm">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" />
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span className="text-sm">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-slate-400 hover:text-white transition-colors duration-300"
                >
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-emerald-500/20 transition-colors">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-sm leading-relaxed">
                     Pakistan
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+1234567890" 
                  className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-300"
                >
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-emerald-500/20 transition-colors">
                    <Phone className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sm">+92 3122767819</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@miftahalquran.com" 
                  className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-300"
                >
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-emerald-500/20 transition-colors">
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sm">muhammadayansheikh786@gmail.com</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <span>© {new Date().getFullYear()} Miftah Al Quran. Made </span>
              {/* <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" /> */}
              <span>for the Ummah</span>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-6">
              <Link 
                to="/privacy" 
                className="text-sm text-slate-500 hover:text-white transition-colors duration-300 flex items-center gap-1"
              >
                Privacy Policy
                <ExternalLink className="w-3 h-3 opacity-50" />
              </Link>
              <span className="hidden md:inline text-slate-700">•</span>
              <Link 
                to="/terms" 
                className="text-sm text-slate-500 hover:text-white transition-colors duration-300 flex items-center gap-1"
              >
                Terms of Service
                <ExternalLink className="w-3 h-3 opacity-50" />
              </Link>
              <span className="hidden md:inline text-slate-700">•</span>
              <Link 
                to="/cookies" 
                className="text-sm text-slate-500 hover:text-white transition-colors duration-300 flex items-center gap-1"
              >
                Cookie Policy
                <ExternalLink className="w-3 h-3 opacity-50" />
              </Link>
            </div>

            {/* Language Selector (Optional Enhancement) */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-slate-500">
              <Globe className="w-4 h-4" />
              <select className="bg-transparent border-none focus:ring-0 text-slate-500 hover:text-white cursor-pointer transition-colors">
                <option value="en">English</option>
                <option value="ar">العربية</option>
                <option value="ur">اردو</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </footer>
  );
}