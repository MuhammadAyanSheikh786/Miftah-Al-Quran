import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Sparkles, 
  GraduationCap,
  RefreshCw,
  SlidersHorizontal,
  X,
  ChevronDown
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CourseCard, type Course } from '@/components/courses/CourseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const demoCourses: Course[] = [];

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
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const q = query(collection(db, 'courses'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const coursesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Course[];
        
        setCourses(coursesData.length > 0 ? coursesData : demoCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses(demoCourses);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;

    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (levelFilter !== 'all') {
      filtered = filtered.filter(course => course.level === levelFilter);
    }

    setFilteredCourses(filtered);
  }, [courses, searchQuery, levelFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setLevelFilter('all');
  };

  const hasActiveFilters = searchQuery || levelFilter !== 'all';

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Advanced':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />
      
      {/* Hero Header */}
      <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
          <div className="absolute inset-0 bg-[url('/pattern-islamic.svg')] opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        
        {/* Floating Decorative Elements */}
        <motion.div 
          animate={floatingAnimation}
          className="absolute top-20 left-10 w-20 h-20 bg-gold/10 rounded-full blur-2xl"
        />
        <motion.div 
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
          className="absolute top-40 right-20 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl"
        />

        {/* Geometric Patterns */}
        <div className="absolute top-10 right-10 opacity-20">
          <svg width="120" height="120" viewBox="0 0 120 120" className="text-gold">
            <pattern id="islamic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="120" height="120" fill="url(#islamic-pattern)"/>
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Decorative Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-white/90">Discover Your Path to Knowledge</span>
            </motion.div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Explore Our{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300">
                  Courses
                </span>
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
                />
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Embark on a transformative journey through our comprehensive Quranic studies 
              programs, thoughtfully designed for learners at every stage of their spiritual growth.
            </motion.p>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 md:gap-8"
            >
              {[
                { icon: BookOpen, label: 'Courses', value: courses.length || '20+' },
                { icon: GraduationCap, label: 'Students', value: '1,500+' },
                { icon: Sparkles, label: 'Success Rate', value: '98%' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="p-2 rounded-xl bg-gradient-to-br from-amber-400/20 to-yellow-500/20">
                    <stat.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-white/60 uppercase tracking-wide">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path 
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" 
              fill="rgb(248 250 252)"
            />
          </svg>
        </div>
      </section>

      {/* Search & Filters Section */}
      <section className="relative z-20 -mt-6 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 md:p-6"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
              {/* Search Input */}
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50">
                  <Search className="w-4 h-4 text-emerald-600" />
                </div>
                <Input
                  placeholder="Search by course name, topic, or instructor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-10 h-14 text-base rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 bg-slate-50/50 hover:bg-white"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                )}
              </div>

              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-4">
                <div className="h-10 w-px bg-slate-200" />
                
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-52 h-14 rounded-xl border-slate-200 hover:border-emerald-300 transition-all duration-300 bg-slate-50/50 hover:bg-white">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-50 to-yellow-50">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
                      </div>
                      <SelectValue placeholder="All Levels" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                    <SelectItem value="all" className="rounded-lg">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                        All Levels
                      </span>
                    </SelectItem>
                    <SelectItem value="Beginner" className="rounded-lg">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Beginner
                      </span>
                    </SelectItem>
                    <SelectItem value="Intermediate" className="rounded-lg">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        Intermediate
                      </span>
                    </SelectItem>
                    <SelectItem value="Advanced" className="rounded-lg">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        Advanced
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearFilters}
                      className="h-14 px-4 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-all duration-300"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Clear Filters
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* Mobile Filter Toggle */}
              <div className="md:hidden">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full h-12 rounded-xl border-slate-200 hover:border-emerald-300 transition-all duration-300"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {hasActiveFilters && (
                    <Badge className="ml-2 bg-emerald-500">Active</Badge>
                  )}
                  <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Mobile Filters Dropdown */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="md:hidden mt-4 pt-4 border-t border-slate-100 overflow-hidden"
                >
                  <div className="space-y-4">
                    <Select value={levelFilter} onValueChange={setLevelFilter}>
                      <SelectTrigger className="w-full h-12 rounded-xl border-slate-200">
                        <div className="flex items-center gap-2">
                          <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                          <SelectValue placeholder="All Levels" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>

                    {hasActiveFilters && (
                      <Button 
                        variant="outline" 
                        onClick={clearFilters}
                        className="w-full h-12 rounded-xl text-rose-600 border-rose-200 hover:bg-rose-50"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100"
              >
                <span className="text-sm text-slate-500">Active filters:</span>
                {searchQuery && (
                  <Badge 
                    variant="secondary" 
                    className="pl-3 pr-1.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 cursor-pointer transition-colors"
                    onClick={() => setSearchQuery('')}
                  >
                    Search: "{searchQuery}"
                    <X className="w-3 h-3 ml-1.5" />
                  </Badge>
                )}
                {levelFilter !== 'all' && (
                  <Badge 
                    variant="secondary" 
                    className={`pl-3 pr-1.5 py-1.5 rounded-full border cursor-pointer transition-colors ${getLevelColor(levelFilter)}`}
                    onClick={() => setLevelFilter('all')}
                  >
                    Level: {levelFilter}
                    <X className="w-3 h-3 ml-1.5" />
                  </Badge>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between"
          >
            <p className="text-slate-600">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  Loading courses...
                </span>
              ) : (
                <>
                  Showing <span className="font-semibold text-slate-900">{filteredCourses.length}</span> of{' '}
                  <span className="font-semibold text-slate-900">{courses.length}</span> courses
                </>
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-8 md:py-12 pb-20 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div 
                    key={i} 
                    className="bg-white rounded-2xl h-[420px] overflow-hidden shadow-lg shadow-slate-100 border border-slate-100"
                  >
                    <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse" />
                    <div className="p-5 space-y-4">
                      <div className="h-4 bg-slate-100 rounded-full w-20 animate-pulse" />
                      <div className="h-6 bg-slate-100 rounded-lg w-full animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-3 bg-slate-100 rounded-full w-full animate-pulse" />
                        <div className="h-3 bg-slate-100 rounded-full w-4/5 animate-pulse" />
                      </div>
                      <div className="flex gap-4 pt-4">
                        <div className="h-4 bg-slate-100 rounded-full w-24 animate-pulse" />
                        <div className="h-4 bg-slate-100 rounded-full w-20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : filteredCourses.length > 0 ? (
              <motion.div 
                key="courses"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    variants={itemVariants}
                    layout
                    className="group"
                  >
                    <div className="h-full bg-white rounded-2xl shadow-lg shadow-slate-100 border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-100/50 hover:border-emerald-200/50 hover:-translate-y-1 transition-all duration-500">
                      <CourseCard course={course} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-20"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <Search className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                    No Courses Found
                  </h3>
                  <p className="text-slate-500 mb-8 leading-relaxed">
                    We couldn't find any courses matching your search criteria. 
                    Try adjusting your filters or search terms.
                  </p>
                  <Button 
                    onClick={clearFilters}
                    className="h-12 px-8 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all duration-300"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear All Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      {!loading && filteredCourses.length > 0 && (
        <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern-islamic.svg')] opacity-5" />
          <motion.div 
            animate={floatingAnimation}
            className="absolute top-10 right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1.5 } }}
            className="absolute bottom-10 left-10 w-60 h-60 bg-emerald-400/10 rounded-full blur-3xl"
          />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Begin Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">
                  Learning Journey?
                </span>
              </h2>
              <p className="text-lg text-white/80 mb-10 leading-relaxed">
                Join thousands of students who have transformed their understanding 
                of the Quran through our expert-led courses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="h-14 px-10 rounded-xl bg-white text-emerald-900 hover:bg-white/90 shadow-xl shadow-black/20 text-base font-semibold transition-all duration-300 hover:scale-105"
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="h-14 px-10 rounded-xl bg-white text-emerald-900 hover:bg-white/90 shadow-xl shadow-black/20 text-base font-semibold transition-all duration-300 hover:scale-105"
                >
                  Contact Advisor
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}