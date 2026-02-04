import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpen,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Phone,
  Sparkles,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.03,
      staggerDirection: -1,
      when: "afterChildren",
    }
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.05,
      delayChildren: 0.1,
      when: "beforeChildren",
    }
  }
};

const mobileItemVariants = {
  closed: { 
    opacity: 0, 
    x: -20,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  open: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1]
    }
  }
};

const overlayVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const menuIconVariants = {
  closed: { rotate: 0 },
  open: { rotate: 180 }
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { currentUser, userData, logout, isAdmin } = useAuth();

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled past threshold
      setScrolled(currentScrollY > 20);
      
      // Hide/show on scroll direction (only after scrolling past 100px)
      if (currentScrollY > 100) {
        setHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      } else {
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const getInitials = (name: string) => {
    return name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: hidden ? -100 : 0,
          opacity: hidden ? 0 : 1
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-200/50'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2.5 group"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200/50">
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </motion.div>
              <div className="flex flex-col">
                <span className={`font-serif text-lg md:text-xl font-bold leading-tight transition-colors duration-300 ${
                  scrolled ? 'text-slate-900' : 'text-white'
                }`}>
                  MIFTAH{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                    AL QURAN
                  </span>
                </span>
                <span className={`text-[10px] md:text-xs font-medium tracking-wider uppercase transition-colors duration-300 ${
                  scrolled ? 'text-slate-500' : 'text-white/70'
                }`}>
                  Key to the Quran
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className={`flex items-center gap-1 p-1.5 rounded-full transition-all duration-300 ${
                scrolled 
                  ? 'bg-slate-100/80' 
                  : 'bg-white/10 backdrop-blur-md'
              }`}>
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="relative"
                    >
                      <motion.div
                        className={`px-4 py-2 rounded-full font-medium text-sm transition-colors duration-300 ${
                          isActive
                            ? scrolled 
                              ? 'text-emerald-700' 
                              : 'text-white'
                            : scrolled
                              ? 'text-slate-600 hover:text-slate-900 hover:bg-white'
                              : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {link.name}
                        {isActive && (
                          <motion.div
                            layoutId="navbar-pill"
                            className={`absolute inset-0 rounded-full -z-10 ${
                              scrolled
                                ? 'bg-emerald-100'
                                : 'bg-white/20 backdrop-blur-sm'
                            }`}
                            initial={false}
                            transition={{ 
                              type: "spring", 
                              stiffness: 500, 
                              damping: 35,
                              mass: 1
                            }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className={`flex items-center gap-3 px-2 py-1.5 rounded-full transition-all duration-300 ${
                        scrolled
                          ? 'bg-slate-100 hover:bg-slate-200'
                          : 'bg-white/10 hover:bg-white/20 backdrop-blur-md'
                      }`}
                    >
                      <Avatar className="w-8 h-8 border-2 border-white shadow-md">
                        <AvatarImage src={userData?.photoURL} />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xs font-semibold">
                          {getInitials(userData?.displayName || '')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-2 pr-2">
                        <span className={`text-sm font-medium max-w-[100px] truncate transition-colors duration-300 ${
                          scrolled ? 'text-slate-700' : 'text-white'
                        }`}>
                          {userData?.displayName?.split(' ')[0] || 'Account'}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${
                          scrolled ? 'text-slate-500' : 'text-white/70'
                        }`} />
                      </div>
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-56 p-2 rounded-xl border-slate-200 shadow-xl shadow-slate-200/50"
                    sideOffset={8}
                  >
                    <DropdownMenuLabel className="px-3 py-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-emerald-100">
                          <AvatarImage src={userData?.photoURL} />
                          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold">
                            {getInitials(userData?.displayName || '')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 truncate max-w-[140px]">
                            {userData?.displayName || 'User'}
                          </span>
                          <span className="text-xs text-slate-500 truncate max-w-[140px]">
                            {currentUser.email}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-2" />
                    
                    {isAdmin && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link 
                            to="/admin" 
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors"
                          >
                            <div className="p-1.5 rounded-lg bg-emerald-100">
                              <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                            </div>
                            <span className="font-medium text-slate-700">Admin Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-2" />
                      </>
                    )}
                    
                    <DropdownMenuItem 
                      onClick={handleLogout} 
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-rose-50 transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-rose-100 group-hover:bg-rose-200 transition-colors">
                        <LogOut className="w-4 h-4 text-rose-600" />
                      </div>
                      <span className="font-medium text-rose-600">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    asChild
                    className={`h-10 px-5 rounded-full font-medium transition-all duration-300 ${
                      scrolled
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button 
                      asChild
                      className="h-10 px-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium shadow-lg shadow-emerald-200/50 hover:shadow-emerald-300/50 transition-all duration-300"
                    >
                      <Link to="/signup" className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Get Started
                      </Link>
                    </Button>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`lg:hidden relative w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 ${
                scrolled
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md'
              }`}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.div
                variants={menuIconVariants}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl overflow-hidden"
            >
              <div className="container mx-auto px-4 sm:px-6 py-6">
                {/* Navigation Links */}
                <div className="space-y-1 mb-6">
                  {navLinks.map((link, index) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <motion.div
                        key={link.path}
                        variants={mobileItemVariants}
                        custom={index}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium transition-all duration-300 ${
                            isActive
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <span>{link.name}</span>
                          {isActive && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="w-2 h-2 rounded-full bg-emerald-500" 
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Divider */}
                <motion.div 
                  variants={mobileItemVariants}
                  className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6" 
                />

                {/* Auth Section */}
                <motion.div variants={mobileItemVariants} className="space-y-3">
                  {currentUser ? (
                    <>
                      {/* User Info Card */}
                      <motion.div 
                        variants={mobileItemVariants}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 mb-4"
                      >
                        <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                          <AvatarImage src={userData?.photoURL} />
                          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold">
                            {getInitials(userData?.displayName || '')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 truncate">
                            {userData?.displayName || 'User'}
                          </p>
                          <p className="text-sm text-slate-500 truncate">
                            {currentUser.email}
                          </p>
                        </div>
                      </motion.div>

                      {isAdmin && (
                        <motion.div variants={mobileItemVariants}>
                          <Link
                            to="/admin"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-emerald-50 text-emerald-700 font-medium hover:bg-emerald-100 transition-colors"
                          >
                            <div className="p-2 rounded-lg bg-emerald-100">
                              <LayoutDashboard className="w-4 h-4" />
                            </div>
                            Admin Dashboard
                          </Link>
                        </motion.div>
                      )}

                      <motion.button
                        variants={mobileItemVariants}
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-rose-600 font-medium hover:bg-rose-50 transition-colors"
                      >
                        <div className="p-2 rounded-lg bg-rose-100">
                          <LogOut className="w-4 h-4" />
                        </div>
                        Logout
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.div variants={mobileItemVariants}>
                        <Button 
                          variant="outline" 
                          className="w-full h-12 rounded-xl border-slate-200 text-slate-700 font-medium hover:bg-slate-50" 
                          asChild
                        >
                          <Link to="/login" onClick={() => setIsOpen(false)}>
                            Login
                          </Link>
                        </Button>
                      </motion.div>
                      <motion.div variants={mobileItemVariants}>
                        <Button 
                          className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium shadow-lg shadow-emerald-200/50" 
                          asChild
                        >
                          <Link 
                            to="/signup" 
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2"
                          >
                            <Sparkles className="w-4 h-4" />
                            Get Started Free
                          </Link>
                        </Button>
                      </motion.div>
                    </>
                  )}
                </motion.div>

                {/* Contact Info */}
                <motion.div 
                  variants={mobileItemVariants}
                  className="mt-6 pt-6 border-t border-slate-100"
                >
                  <a 
                    href="tel:+1234567890" 
                    className="flex items-center gap-3 text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-slate-100">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">+1 (234) 567-890</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            style={{ top: '64px' }}
          />
        )}
      </AnimatePresence>
    </>
  );
}