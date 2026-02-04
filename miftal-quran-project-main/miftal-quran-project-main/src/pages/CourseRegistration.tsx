import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Users, 
  Calendar, 
  Phone, 
  Mail, 
  CheckCircle,
  Star,
  Shield,
  Award,
  BookOpen,
  Play,
  Sparkles,
  GraduationCap,
  Globe,
  CreditCard,
  Lock,
  Gift,
  ArrowRight,
  Check,
  Heart,
  MessageSquare,
  Zap,
  BadgeCheck
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import type { Course } from '@/components/courses/CourseCard';

// Demo courses data
const demoCourses: Record<string, Course> = {
  '1': {
    id: '1',
    title: 'Quran Recitation Fundamentals for Beginners',
    description: 'Learn the fundamentals of Quran recitation with proper pronunciation and basic Tajweed rules. Perfect for those starting their journey.',
    thumbnail: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
    instructor: 'Sheikh Ahmad Al-Rashid',
    duration: '12 weeks',
    level: 'Beginner',
    price: 99,
    enrolled: 1250,
  },
};

// Form steps
const formSteps = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Experience', icon: BookOpen },
  { id: 3, title: 'Schedule', icon: Clock },
];

// Course features
const courseFeatures = [
  { icon: Play, text: 'Live 1-on-1 Sessions' },
  { icon: BookOpen, text: 'Course Materials' },
  { icon: Award, text: 'Completion Certificate' },
  { icon: MessageSquare, text: 'Direct Instructor Access' },
  { icon: Globe, text: 'Lifetime Access' },
  { icon: Users, text: 'Community Support' },
];

// Trust badges
const trustBadges = [
  { icon: Shield, text: 'Secure Payment' },
  { icon: Lock, text: 'Data Protected' },
  { icon: Gift, text: 'Money Back Guarantee' },
];

// Floating confetti for success state
function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            y: -20, 
            x: Math.random() * window.innerWidth,
            rotate: 0,
            opacity: 1 
          }}
          animate={{ 
            y: window.innerHeight + 20,
            rotate: Math.random() * 360,
            opacity: 0
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: "easeOut"
          }}
          className={cn(
            "absolute w-3 h-3 rounded-sm",
            i % 5 === 0 && "bg-amber-400",
            i % 5 === 1 && "bg-emerald-400",
            i % 5 === 2 && "bg-violet-400",
            i % 5 === 3 && "bg-rose-400",
            i % 5 === 4 && "bg-blue-400",
          )}
        />
      ))}
    </div>
  );
}

// Enhanced Loading Skeleton
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4">
        {/* Back button skeleton */}
        <div className="h-10 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse mb-8" />
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course card skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="aspect-video bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer bg-[length:200%_100%]" />
              <div className="p-6 space-y-4">
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse w-3/4" />
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                  ))}
                </div>
                <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse mt-6" />
              </div>
            </div>
          </div>
          
          {/* Form skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse w-1/2 mb-4" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-3/4 mb-8" />
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-1/3" />
                    <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Course Not Found Component
function CourseNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto text-center py-20"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center mx-auto mb-8 shadow-xl"
          >
            <BookOpen className="w-12 h-12 text-slate-400" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Course Not Found
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            The course you're looking for doesn't exist or has been removed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-xl px-8"
              asChild
            >
              <Link to="/courses">
                Browse All Courses
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="rounded-xl"
              asChild
            >
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

// Success Component
function RegistrationSuccess({ course }: { course: Course }) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {showConfetti && <Confetti />}
      <Navbar />
      
      <div className="pt-24 pb-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          {/* Success Card */}
          <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full blur-3xl" />
            
            <div className="relative text-center">
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                className="relative mx-auto mb-8"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-500/30">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                {/* Animated rings */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-4 border-emerald-400"
                />
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="absolute inset-0 rounded-full border-4 border-emerald-400"
                />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
              >
                Registration Successful! 🎉
              </motion.h1>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed"
              >
                Thank you for registering for{' '}
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  {course.title}
                </span>
                . Our team will contact you within 24-48 hours with payment details and class schedule.
              </motion.p>

              {/* What's Next Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mb-8"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  What Happens Next?
                </h3>
                <div className="grid gap-3 text-left">
                  {[
                    { step: 1, text: 'Our team will review your registration' },
                    { step: 2, text: 'You\'ll receive a confirmation email' },
                    { step: 3, text: 'Payment instructions will be shared' },
                    { step: 4, text: 'Class schedule will be finalized' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        {item.step}
                      </div>
                      <span className="text-slate-600 dark:text-slate-400">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-xl px-8 shadow-lg shadow-amber-500/20"
                  asChild
                >
                  <Link to="/courses">
                    Browse More Courses
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="rounded-xl border-2"
                  asChild
                >
                  <Link to="/">Return Home</Link>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-center"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              Have questions? Contact us at
            </p>
            <a 
              href="mailto:support@quranacademy.com" 
              className="text-amber-600 dark:text-amber-400 font-medium hover:underline"
            >
              support@quranacademy.com
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}

// Main Component
export default function CourseRegistration() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  const { toast } = useToast();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: userData?.displayName || '',
    email: currentUser?.email || '',
    phone: '',
    age: '',
    experience: '',
    preferredTime: '',
    timezone: '',
    message: '',
  });

  useEffect(() => {
    async function fetchCourse() {
      if (!courseId) return;

      try {
        const courseDoc = await getDoc(doc(db, 'courses', courseId));
        if (courseDoc.exists()) {
          setCourse({ id: courseDoc.id, ...courseDoc.data() } as Course);
        } else {
          setCourse(demoCourses[courseId] || null);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        setCourse(demoCourses[courseId] || null);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    if (userData?.displayName) {
      setFormData(prev => ({ ...prev, fullName: userData.displayName || '' }));
    }
    if (currentUser?.email) {
      setFormData(prev => ({ ...prev, email: currentUser.email || '' }));
    }
  }, [currentUser, userData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, 'registrations'), {
        courseId,
        courseName: course?.title,
        userId: currentUser?.uid || null,
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });

      setSubmitted(true);
      toast({
        title: 'Registration Submitted!',
        description: 'We will contact you soon with further details.',
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration Failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Render states
  if (loading) return <LoadingSkeleton />;
  if (!course) return <CourseNotFound />;
  if (submitted) return <RegistrationSuccess course={course} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-amber-50/30 to-white dark:from-slate-900 dark:via-emerald-950/30 dark:to-slate-950" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6 hover:bg-white/50 dark:hover:bg-slate-800/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
          </motion.div>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 mb-4">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                Course Registration
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Enroll in Your Course
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Complete the form below to register. Our team will contact you within 24-48 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Course Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="sticky top-24 space-y-6">
                {/* Course Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Level Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-slate-900 backdrop-blur-sm">
                        {course.level}
                      </span>
                    </div>
                    
                    {/* Play Preview Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl"
                      >
                        <Play className="w-6 h-6 text-slate-900 fill-slate-900 ml-1" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                      {course.title}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-6">
                      {course.description}
                    </p>

                    {/* Course Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg">
                          {course.instructor.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{course.instructor}</p>
                          <p className="text-xs text-slate-500">Lead Instructor</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                        <Clock className="w-5 h-5 text-amber-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Duration: <span className="font-medium text-slate-900 dark:text-white">{course.duration}</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                        <Users className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          <span className="font-medium text-slate-900 dark:text-white">{course.enrolled?.toLocaleString()}</span> students enrolled
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          <span className="font-medium text-slate-900 dark:text-white">4.9</span> average rating
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 border border-amber-200/50 dark:border-amber-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">Course Fee</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-medium">
                          Save 33%
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                          ${course.price}
                        </span>
                        <span className="text-lg text-slate-400 line-through">$149</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What's Included */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-amber-500" />
                    What's Included
                  </h3>
                  <div className="space-y-3">
                    {courseFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <feature.icon className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">{feature.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-6 py-4">
                  {trustBadges.map((badge, index) => (
                    <div key={index} className="flex flex-col items-center gap-1">
                      <badge.icon className="w-5 h-5 text-slate-400" />
                      <span className="text-xs text-slate-500">{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-8"
            >
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 border border-slate-200 dark:border-slate-800 shadow-xl">
                {/* Form Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Registration Form
                      </h3>
                      <p className="text-sm text-slate-500">Fill in your details to enroll</p>
                    </div>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="mb-10">
                  <div className="flex items-center justify-between relative">
                    {/* Progress Line */}
                    <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 rounded-full" />
                    <motion.div 
                      className="absolute left-0 top-1/2 h-1 bg-gradient-to-r from-amber-500 to-orange-500 -translate-y-1/2 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${((currentStep - 1) / (formSteps.length - 1)) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {formSteps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        className="relative z-10 flex flex-col items-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div 
                          className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg",
                            currentStep >= step.id 
                              ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                              : "bg-white dark:bg-slate-800 text-slate-400 border-2 border-slate-200 dark:border-slate-700"
                          )}
                        >
                          {currentStep > step.id ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <step.icon className="w-5 h-5" />
                          )}
                        </motion.div>
                        <span className={cn(
                          "text-xs mt-2 font-medium transition-colors",
                          currentStep >= step.id 
                            ? "text-amber-600 dark:text-amber-400" 
                            : "text-slate-400"
                        )}>
                          {step.title}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key="personal-info"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <User className="w-5 h-5 text-amber-500" />
                        <h4 className="font-semibold text-slate-900 dark:text-white">Personal Information</h4>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="space-y-2">
                          <Label htmlFor="fullName" className="text-slate-700 dark:text-slate-300">
                            Full Name <span className="text-rose-500">*</span>
                          </Label>
                          <div className="relative group">
                            <User className={cn(
                              "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors",
                              focusedField === 'fullName' ? "text-amber-500" : "text-slate-400"
                            )} />
                            <Input
                              id="fullName"
                              placeholder="Enter your full name"
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              onFocus={() => setFocusedField('fullName')}
                              onBlur={() => setFocusedField(null)}
                              className="pl-12 h-14 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-amber-500 dark:focus:border-amber-500 transition-all bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800"
                              required
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                            Email Address <span className="text-rose-500">*</span>
                          </Label>
                          <div className="relative group">
                            <Mail className={cn(
                              "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors",
                              focusedField === 'email' ? "text-amber-500" : "text-slate-400"
                            )} />
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              onFocus={() => setFocusedField('email')}
                              onBlur={() => setFocusedField(null)}
                              className="pl-12 h-14 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-amber-500 dark:focus:border-amber-500 transition-all bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800"
                              required
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300">
                            Phone Number <span className="text-rose-500">*</span>
                          </Label>
                          <div className="relative group">
                            <Phone className={cn(
                              "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors",
                              focusedField === 'phone' ? "text-amber-500" : "text-slate-400"
                            )} />
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+1 234 567 8900"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              onFocus={() => setFocusedField('phone')}
                              onBlur={() => setFocusedField(null)}
                              className="pl-12 h-14 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-amber-500 dark:focus:border-amber-500 transition-all bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800"
                              required
                            />
                          </div>
                        </div>

                        {/* Age */}
                        <div className="space-y-2">
                          <Label htmlFor="age" className="text-slate-700 dark:text-slate-300">
                            Age
                          </Label>
                          <div className="relative group">
                            <Calendar className={cn(
                              "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors",
                              focusedField === 'age' ? "text-amber-500" : "text-slate-400"
                            )} />
                            <Input
                              id="age"
                              type="number"
                              placeholder="Your age"
                              value={formData.age}
                              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                              onFocus={() => setFocusedField('age')}
                              onBlur={() => setFocusedField(null)}
                              className="pl-12 h-14 rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-amber-500 dark:focus:border-amber-500 transition-all bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800"
                              min="5"
                              max="100"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Experience & Schedule */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 text-emerald-500" />
                      <h4 className="font-semibold text-slate-900 dark:text-white">Experience & Schedule</h4>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Experience */}
                      <div className="space-y-2">
                        <Label className="text-slate-700 dark:text-slate-300">
                          Quran Learning Experience
                        </Label>
                        <Select
                          value={formData.experience}
                          onValueChange={(value) => {
                            setFormData({ ...formData, experience: value });
                            setCurrentStep(2);
                          }}
                        >
                          <SelectTrigger className="h-14 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="none" className="rounded-lg">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-slate-400" />
                                No prior experience
                              </div>
                            </SelectItem>
                            <SelectItem value="beginner" className="rounded-lg">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                Beginner (Know Arabic letters)
                              </div>
                            </SelectItem>
                            <SelectItem value="intermediate" className="rounded-lg">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-400" />
                                Intermediate (Can read Quran)
                              </div>
                            </SelectItem>
                            <SelectItem value="advanced" className="rounded-lg">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-violet-400" />
                                Advanced (Know Tajweed)
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Preferred Time */}
                      <div className="space-y-2">
                        <Label className="text-slate-700 dark:text-slate-300">
                          Preferred Class Time
                        </Label>
                        <Select
                          value={formData.preferredTime}
                          onValueChange={(value) => {
                            setFormData({ ...formData, preferredTime: value });
                            setCurrentStep(3);
                          }}
                        >
                          <SelectTrigger className="h-14 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                            <SelectValue placeholder="Select preferred time" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="morning" className="rounded-lg">
                              🌅 Morning (6AM - 12PM)
                            </SelectItem>
                            <SelectItem value="afternoon" className="rounded-lg">
                              ☀️ Afternoon (12PM - 5PM)
                            </SelectItem>
                            <SelectItem value="evening" className="rounded-lg">
                              🌙 Evening (5PM - 9PM)
                            </SelectItem>
                            <SelectItem value="flexible" className="rounded-lg">
                              ⏰ Flexible
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Timezone */}
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-slate-700 dark:text-slate-300">
                          Your Timezone
                        </Label>
                        <Select
                          value={formData.timezone}
                          onValueChange={(value) => setFormData({ ...formData, timezone: value })}
                        >
                          <SelectTrigger className="h-14 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                            <SelectValue placeholder="Select your timezone" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="est" className="rounded-lg">🇺🇸 EST (Eastern Standard Time)</SelectItem>
                            <SelectItem value="pst" className="rounded-lg">🇺🇸 PST (Pacific Standard Time)</SelectItem>
                            <SelectItem value="gmt" className="rounded-lg">🇬🇧 GMT (Greenwich Mean Time)</SelectItem>
                            <SelectItem value="cet" className="rounded-lg">🇪🇺 CET (Central European Time)</SelectItem>
                            <SelectItem value="ist" className="rounded-lg">🇮🇳 IST (India Standard Time)</SelectItem>
                            <SelectItem value="pkt" className="rounded-lg">🇵🇰 PKT (Pakistan Standard Time)</SelectItem>
                            <SelectItem value="other" className="rounded-lg">🌍 Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="message" className="text-slate-700 dark:text-slate-300">
                      Additional Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Any specific requirements, questions, or learning goals you'd like to share..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-[120px] rounded-xl border-2 border-slate-200 dark:border-slate-700 focus:border-amber-500 dark:focus:border-amber-500 transition-all bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 resize-none"
                    />
                  </motion.div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white dark:bg-slate-900 text-sm text-slate-400">
                        Ready to submit?
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                  >
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={submitting}
                      className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:via-orange-400 hover:to-amber-500 text-white rounded-2xl shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {submitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Submit Registration
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      )}
                    </Button>

                    {/* Terms */}
                    <p className="text-center text-sm text-slate-500">
                      By submitting, you agree to our{' '}
                      <Link to="/terms" className="text-amber-600 hover:underline">Terms of Service</Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-amber-600 hover:underline">Privacy Policy</Link>
                    </p>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center gap-6 pt-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Lock className="w-4 h-4 text-emerald-500" />
                        <span>Secure Form</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <BadgeCheck className="w-4 h-4 text-emerald-500" />
                        <span>Verified Academy</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Shield className="w-4 h-4 text-emerald-500" />
                        <span>Data Protected</span>
                      </div>
                    </div>
                  </motion.div>
                </form>
              </div>

              {/* Help Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 border border-emerald-200/50 dark:border-emerald-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-lg">
                    <MessageSquare className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                      Need Help with Registration?
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      Our support team is available 24/7 to assist you with any questions.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a 
                        href="mailto:support@quranacademy.com" 
                        className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                      >
                        <Mail className="w-4 h-4" />
                        support@quranacademy.com
                      </a>
                      <a 
                        href="tel:+1234567890" 
                        className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                      >
                        <Phone className="w-4 h-4" />
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}