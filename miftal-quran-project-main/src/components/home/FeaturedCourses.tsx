import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Play,
  Sparkles,
  GraduationCap,
  Award,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Types
interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  instructorImage?: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  price: number;
  originalPrice?: number;
  enrolled: number;
  rating?: number;
  lessons?: number;
  category?: string;
}

// Category filters
const categories = [
  { id: 'all', label: 'All Courses', icon: BookOpen },
  { id: 'recitation', label: 'Recitation', icon: Play },
  { id: 'tajweed', label: 'Tajweed', icon: Award },
  { id: 'memorization', label: 'Memorization', icon: GraduationCap },
];

// Level badge colors
const levelColors = {
  'Beginner': 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/20',
  'Intermediate': 'from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/20',
  'Advanced': 'from-rose-500/20 to-rose-500/5 text-rose-400 border-rose-500/20',
  'All Levels': 'from-violet-500/20 to-violet-500/5 text-violet-400 border-violet-500/20',
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

// Enhanced Course Card Component
function EnhancedCourseCard({ course, index }: { course: Course; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const discount = course.originalPrice 
    ? Math.round((1 - course.price / course.originalPrice) * 100) 
    : null;

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full"
    >
      {/* Card Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-amber-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
      
      <div className="relative h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 group-hover:shadow-2xl group-hover:shadow-amber-500/10 transition-all duration-500">
        
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {/* Thumbnail */}
          <motion.img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
            {/* Level Badge */}
            <span className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border bg-gradient-to-r",
              levelColors[course.level]
            )}>
              <Sparkles className="w-3 h-3" />
              {course.level}
            </span>
            
            {/* Discount Badge */}
            {discount && (
              <motion.span
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: -12 }}
                className="px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg"
              >
                {discount}% OFF
              </motion.span>
            )}
          </div>
          
          {/* Play Button Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-center shadow-2xl cursor-pointer group/play hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-amber-500 fill-amber-500 ml-1 group-hover/play:scale-110 transition-transform" />
            </div>
          </motion.div>
          
          {/* Bottom Info Bar */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-sm">
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{course.lessons || 24} Lessons</span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Category Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {course.category || 'Quranic Studies'}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {course.title}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
            {course.description}
          </p>
          
          {/* Instructor & Rating */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            {/* Instructor */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                {course.instructor.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {course.instructor}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Instructor
                </p>
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(course.rating || 4.8)
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-300 dark:text-slate-600"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {course.rating || 4.8}
              </span>
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                ${course.price}
              </span>
              {course.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ${course.originalPrice}
                </span>
              )}
            </div>
            
            {/* Enrolled Count */}
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">
                {course.enrolled.toLocaleString()} students
              </span>
            </div>
          </div>
          
          {/* Enroll Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="mt-4"
          >
            <Button 
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold py-6 rounded-xl shadow-lg shadow-amber-500/20 group/btn"
              asChild
            >
              <Link to={`/course/${course.id}/register`}>
                Enroll Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Loading Skeleton
function CourseCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
      {/* Image Skeleton */}
      <div className="aspect-[16/10] bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer bg-[length:200%_100%]" />
      
      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
        <div className="h-5 w-full bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
        <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
        <div className="flex justify-between pt-4">
          <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Main Component
export function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const q = query(
          collection(db, 'courses'),
          orderBy('createdAt', 'desc'),
          limit(6)
        );
        const snapshot = await getDocs(q);
        const coursesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Course[];
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  // Demo courses
  const demoCourses: Course[] = []

  const displayCourses = courses.length > 0 ? courses : demoCourses;

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
              Our Programs
            </span>
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Explore Our{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
                Featured Courses
              </span>
              {/* Decorative underline */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 10C50 4 150 4 198 10"
                  stroke="url(#courses-underline)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="courses-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Discover our comprehensive range of Quranic studies courses designed 
            for students of all levels. Learn from certified scholars and transform 
            your spiritual journey.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === category.id
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              )}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Courses Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {displayCourses.map((course, index) => (
                <EnhancedCourseCard 
                  key={course.id} 
                  course={course} 
                  index={index} 
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          {/* Stats Bar */}
          <div className="inline-flex items-center gap-6 md:gap-10 px-6 md:px-10 py-4 md:py-5 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 mb-10">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">50+</div>
              <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Courses</div>
            </div>
            <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">5,000+</div>
              <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Students</div>
            </div>
            <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                4.9 <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
              <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Rating</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:via-orange-400 hover:to-amber-500 text-white font-semibold px-8 py-7 text-base rounded-2xl shadow-xl shadow-amber-500/20 transition-all duration-300 hover:shadow-amber-500/30 hover:scale-[1.02]"
              asChild
            >
              <Link to="/courses">
                View All Courses
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}