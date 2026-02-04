// src/pages/ContactPage.tsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  User,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Globe,
  Sparkles,
  ArrowRight,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Loader2,
  ChevronDown,
  HeadphonesIcon,
  Building2,
  Calendar,
  Zap
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { submitContactForm, type ContactFormData } from '@/lib/contact';

// Form validation schema
const contactFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  courseInterest: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']),
  subscribedToNewsletter: z.boolean().default(false),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const subjects = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'courses', label: 'Course Information' },
  { value: 'enrollment', label: 'Enrollment Help' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'feedback', label: 'Feedback & Suggestions' },
  { value: 'partnership', label: 'Partnership Opportunities' },
  { value: 'other', label: 'Other' },
];

const courses = [
  { value: 'quran-recitation', label: 'Quran Recitation' },
  { value: 'tajweed', label: 'Tajweed Mastery' },
  { value: 'hifz', label: 'Hifz Program' },
  { value: 'arabic', label: 'Arabic Language' },
  { value: 'islamic-studies', label: 'Islamic Studies' },
  { value: 'kids', label: 'Kids Program' },
];

const contactInfo = [
  // {
  //   icon: Phone,
  //   title: 'Phone',
  //   details: ['+1 (234) 567-890', '+1 (234) 567-891'],
  //   description: 'Mon-Fri from 8am to 6pm',
  //   color: 'from-emerald-500 to-teal-500',
  //   bgColor: 'bg-emerald-50',
  //   iconColor: 'text-emerald-600',
  // },
  // {
  //   icon: Mail,
  //   title: 'Email',
  //   details: ['info@miftahalquran.com', 'support@miftahalquran.com'],
  //   description: 'We reply within 24 hours',
  //   color: 'from-blue-500 to-cyan-500',
  //   bgColor: 'bg-blue-50',
  //   iconColor: 'text-blue-600',
  // },
  // {
  //   icon: MapPin,
  //   title: 'Office',
  //   details: ['123 Islamic Center Road', 'Your City, Country 12345'],
  //   description: 'Visit us in person',
  //   color: 'from-purple-500 to-pink-500',
  //   bgColor: 'bg-purple-50',
  //   iconColor: 'text-purple-600',
  // },
  // {
  //   icon: Clock,
  //   title: 'Working Hours',
  //   details: ['Monday - Friday: 8am - 6pm', 'Saturday: 9am - 3pm'],
  //   description: 'Sunday closed',
  //   color: 'from-amber-500 to-orange-500',
  //   bgColor: 'bg-amber-50',
  //   iconColor: 'text-amber-600',
  // },
];

const faqs = [
  {
    question: 'How do I enroll in a course?',
    answer: 'You can enroll by creating an account, browsing our courses, and clicking the "Enroll Now" button on any course page. Our team will guide you through the process.',
  },
  {
    question: 'What are the class timings?',
    answer: 'We offer flexible scheduling to accommodate students from different time zones. Classes are available from 6 AM to 11 PM (GMT) throughout the week.',
  },
  {
    question: 'Do you offer trial classes?',
    answer: 'Yes! We offer a free trial class for all new students. This helps you experience our teaching methodology before committing to a course.',
  },
  {
    question: 'What technology do I need?',
    answer: 'You need a stable internet connection, a computer/tablet with a webcam and microphone, and Zoom installed. We provide all learning materials digitally.',
  },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:bg-blue-500 hover:border-blue-500' },
  { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:bg-pink-500 hover:border-pink-500' },
  { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:bg-red-500 hover:border-red-500' },
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:bg-sky-500 hover:border-sky-500' },
];

const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      preferredContact: 'email',
      subscribedToNewsletter: false,
    },
  });

  const watchSubject = watch('subject');

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      await submitContactForm(data as ContactFormData);
      setSubmitStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
          <div className="absolute inset-0 bg-[url('/pattern-islamic.svg')] opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Floating Elements */}
        <motion.div 
          animate={floatingAnimation}
          className="absolute top-20 left-[10%] w-32 h-32 bg-gold/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
          className="absolute top-40 right-[15%] w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
          className="absolute bottom-20 left-[20%] w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
            >
              <HeadphonesIcon className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-white/90">We're Here to Help</span>
            </motion.div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Get in{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300">
                  Touch
                </span>
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 0.8 }}
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
              Have questions about our courses or need assistance? Our dedicated team is ready 
              to help you on your Quranic learning journey. Reach out to us anytime.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 md:gap-8"
            >
              {[
                { icon: Zap, label: 'Response Time', value: '< 24 hrs' },
                { icon: Globe, label: 'Languages', value: '3+' },
                { icon: Calendar, label: 'Availability', value: '6 Days/Week' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20"
                >
                  <div className="p-2 rounded-xl bg-gradient-to-br from-amber-400/20 to-yellow-500/20">
                    <stat.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div className="text-left">
                    <p className="text-xl font-bold text-white">{stat.value}</p>
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
              d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V120Z" 
              fill="rgb(248 250 252)"
            />
          </svg>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative z-10 -mt-10 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-emerald-100/30 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                
                <div className={`w-12 h-12 rounded-xl ${info.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <info.icon className={`w-6 h-6 ${info.iconColor}`} />
                </div>
                
                <h3 className="font-semibold text-lg text-slate-900 mb-2">{info.title}</h3>
                
                <div className="space-y-1 mb-2">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-slate-600 text-sm">{detail}</p>
                  ))}
                </div>
                
                <p className="text-xs text-slate-400">{info.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                {/* Form Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-4">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">Send us a Message</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                    We'd Love to Hear From You
                  </h2>
                  <p className="text-slate-600">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                {/* Success Message */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -20, height: 0 }}
                      className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3"
                    >
                      <div className="p-1 rounded-full bg-emerald-500">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-emerald-800">Message Sent Successfully!</h4>
                        <p className="text-sm text-emerald-700">
                          Thank you for reaching out. We'll get back to you within 24 hours.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Message */}
                <AnimatePresence>
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -20, height: 0 }}
                      className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3"
                    >
                      <div className="p-1 rounded-full bg-rose-500">
                        <AlertCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-rose-800">Failed to Send Message</h4>
                        <p className="text-sm text-rose-700">{errorMessage}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-slate-700 font-medium">
                        First Name <span className="text-rose-500">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="firstName"
                          {...register('firstName')}
                          placeholder="John"
                          className={`h-12 pl-11 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all ${
                            errors.firstName ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : ''
                          }`}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-sm text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-slate-700 font-medium">
                        Last Name <span className="text-rose-500">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="lastName"
                          {...register('lastName')}
                          placeholder="Doe"
                          className={`h-12 pl-11 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all ${
                            errors.lastName ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : ''
                          }`}
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-sm text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700 font-medium">
                        Email Address <span className="text-rose-500">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="john@example.com"
                          className={`h-12 pl-11 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all ${
                            errors.email ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : ''
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700 font-medium">
                        Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="phone"
                          type="tel"
                          {...register('phone')}
                          placeholder="+1 (234) 567-890"
                          className="h-12 pl-11 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject & Course Interest */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-slate-700 font-medium">
                        Subject <span className="text-rose-500">*</span>
                      </Label>
                      <Select onValueChange={(value) => setValue('subject', value)}>
                        <SelectTrigger 
                          className={`h-12 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 ${
                            errors.subject ? 'border-rose-300' : ''
                          }`}
                        >
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {subjects.map((subject) => (
                            <SelectItem 
                              key={subject.value} 
                              value={subject.value}
                              className="rounded-lg"
                            >
                              {subject.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.subject && (
                        <p className="text-sm text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="courseInterest" className="text-slate-700 font-medium">
                        Course Interest <span className="text-slate-400 font-normal">(Optional)</span>
                      </Label>
                      <Select onValueChange={(value) => setValue('courseInterest', value)}>
                        <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20">
                          <BookOpen className="w-4 h-4 text-slate-400 mr-2" />
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {courses.map((course) => (
                            <SelectItem 
                              key={course.value} 
                              value={course.value}
                              className="rounded-lg"
                            >
                              {course.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="space-y-3">
                    <Label className="text-slate-700 font-medium">
                      Preferred Contact Method <span className="text-rose-500">*</span>
                    </Label>
                    <RadioGroup
                      defaultValue="email"
                      onValueChange={(value) => setValue('preferredContact', value as 'email' | 'phone' | 'whatsapp')}
                      className="flex flex-wrap gap-4"
                    >
                      {[
                        { value: 'email', label: 'Email', icon: Mail },
                        { value: 'phone', label: 'Phone Call', icon: Phone },
                        { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center">
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={option.value}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-200 cursor-pointer transition-all peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50 peer-data-[state=checked]:text-emerald-700 hover:border-slate-300"
                          >
                            <option.icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{option.label}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-700 font-medium">
                      Your Message <span className="text-rose-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      className={`rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 resize-none transition-all ${
                        errors.message ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : ''
                      }`}
                    />
                    {errors.message && (
                      <p className="text-sm text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Newsletter Subscription */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <Checkbox
                      id="newsletter"
                      onCheckedChange={(checked) => setValue('subscribedToNewsletter', checked as boolean)}
                      className="mt-0.5 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                    />
                    <div>
                      <Label 
                        htmlFor="newsletter" 
                        className="text-slate-700 font-medium cursor-pointer"
                      >
                        Subscribe to our newsletter
                      </Label>
                      <p className="text-sm text-slate-500 mt-0.5">
                        Get weekly Quranic insights, course updates, and exclusive offers.
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-base shadow-lg shadow-emerald-200/50 hover:shadow-emerald-300/50 transition-all duration-300 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-center text-sm text-slate-500">
                    By submitting this form, you agree to our{' '}
                    <a href="/privacy" className="text-emerald-600 hover:underline">
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a href="/terms" className="text-emerald-600 hover:underline">
                      Terms of Service
                    </a>
                    .
                  </p>
                </form>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Quick Contact Card */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10">
                  <div className="inline-flex p-3 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-3">
                    Need Immediate Help?
                  </h3>
                  <p className="text-emerald-100 mb-6">
                    Our support team is available to assist you with any urgent inquiries.
                  </p>
                  
                  <div className="space-y-4">
                    {/* <a
                      href="tel:+1234567890"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-white/20">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-emerald-100">Call Us Now</p>
                        <p className="font-semibold">+1 (234) 567-890</p>
                      </div>
                      <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    
                    <a
                      href="https://wa.me/1234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-white/20">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-emerald-100">WhatsApp</p>
                        <p className="font-semibold">Chat with Us</p>
                      </div>
                      <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a> */}
                  </div>
                </div>
              </div>

              {/* Social Links */}
              {/* <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">
                  Follow Us
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  Stay connected with us on social media for updates and inspiration.
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-white transition-all duration-300 ${social.color}`}
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div> */}

              {/* Office Hours Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-amber-100">
                    <Building2 className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    Office Hours
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {[
                    { day: 'Monday - Friday', hours: '8:00 AM - 12:00 PM', active: true },
                    { day: 'Saturday - Sunday', hours: '9:00 AM - 12:00 PM', active: true },
                  
                  ].map((schedule, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-xl ${
                        schedule.active ? 'bg-slate-50' : 'bg-rose-50'
                      }`}
                    >
                      <span className={`font-medium ${schedule.active ? 'text-slate-700' : 'text-rose-700'}`}>
                        {schedule.day}
                      </span>
                      <span className={`text-sm ${schedule.active ? 'text-slate-500' : 'text-rose-500'}`}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-6">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Frequently Asked</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Common{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                Questions
              </span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Find quick answers to the most commonly asked questions about our courses and services.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 p-1.5 rounded-lg bg-slate-100"
                  >
                    <ChevronDown className="w-4 h-4 text-slate-600" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-slate-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <p className="text-slate-600 mb-4">
              Still have questions? We're here to help!
            </p>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all"
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Us a Message
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 border border-rose-200 mb-6"> */}
              {/* <MapPin className="w-4 h-4 text-rose-600" /> */}
              {/* <span className="text-sm font-medium text-rose-700">Our Location</span> */}
            {/* </div> */}
            {/* <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Visit Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                Campus
              </span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              We welcome visitors to our main campus. Come see our facilities and meet our team in person.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-200"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648718453!2d-73.98784368459394!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629814251631!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            /> */}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}