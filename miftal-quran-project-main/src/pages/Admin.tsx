import type { Course } from '@/components/courses/CourseCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { db, storage } from '@/lib/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Archive,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Download,
  Edit,
  ExternalLink,
  Eye,
  Filter,
  GraduationCap,
  ImageIcon,
  Inbox,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Plus,
  RefreshCw,
  Save,
  Search,
  Send,
  Sparkles,
  Trash2,
  User,
  Users,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface Registration {
  id: string;
  courseName: string;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
}

interface ContactSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  courseInterest?: string;
  message: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
  status: 'new' | 'read' | 'replied' | 'archived';
  subscribedToNewsletter: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const sidebarLinks = [
  { name: 'Dashboard', icon: LayoutDashboard, value: 'dashboard' },
  { name: 'Courses', icon: BookOpen, value: 'courses' },
  { name: 'Registrations', icon: GraduationCap, value: 'registrations' },
  { name: 'Contact Messages', icon: MessageSquare, value: 'contacts' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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
      damping: 15
    }
  }
};

export default function AdminPage() {
  const { isAdmin, loading, currentUser, userData, logout } = useAuth();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [courses, setCourses] = useState<Course[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [isContactSheetOpen, setIsContactSheetOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    level: 'Beginner',
    price: '',
    thumbnail: '',
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  useEffect(() => {
    if (!loading && isAdmin) {
      fetchData();
    }
  }, [loading, isAdmin]);

  async function fetchData() {
    setRefreshing(true);
    try {
      // Fetch courses
      const coursesQuery = query(collection(db, 'courses'), orderBy('createdAt', 'desc'));
      const coursesSnapshot = await getDocs(coursesQuery);
      const coursesData = coursesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Course[];
      setCourses(coursesData);

      // Fetch registrations
      const registrationsQuery = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'));
      const registrationsSnapshot = await getDocs(registrationsQuery);
      const registrationsData = registrationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Registration[];
      setRegistrations(registrationsData);

      // Fetch contact submissions
      const contactsQuery = query(collection(db, 'contactSubmissions'), orderBy('createdAt', 'desc'));
      const contactsSnapshot = await getDocs(contactsQuery);
      const contactsData = contactsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ContactSubmission[];
      setContactSubmissions(contactsData);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load data. Please refresh.',
        variant: 'destructive',
      });
    } finally {
      setLoadingData(false);
      setRefreshing(false);
    }
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      instructor: '',
      duration: '',
      level: 'Beginner',
      price: '',
      thumbnail: '',
    });
    setThumbnailFile(null);
    setThumbnailPreview('');
    setEditingCourse(null);
  };

  const openEditDialog = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      price: course.price.toString(),
      thumbnail: course.thumbnail,
    });
    setThumbnailPreview(course.thumbnail);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.price) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      let thumbnailUrl = formData.thumbnail;

      if (thumbnailFile) {
        const storageRef = ref(storage, `thumbnails/${Date.now()}_${thumbnailFile.name}`);
        await uploadBytes(storageRef, thumbnailFile);
        thumbnailUrl = await getDownloadURL(storageRef);
      }

      const courseData = {
        title: formData.title,
        description: formData.description,
        instructor: formData.instructor,
        duration: formData.duration,
        level: formData.level,
        price: parseFloat(formData.price),
        thumbnail: thumbnailUrl || 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800',
        enrolled: editingCourse?.enrolled || 0,
        updatedAt: new Date().toISOString(),
      };

      if (editingCourse) {
        await updateDoc(doc(db, 'courses', editingCourse.id), courseData);
        toast({
          title: 'Course Updated',
          description: 'The course has been updated successfully.',
        });
      } else {
        await addDoc(collection(db, 'courses'), {
          ...courseData,
          createdAt: new Date().toISOString(),
        });
        toast({
          title: 'Course Added',
          description: 'The new course has been added successfully.',
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error saving course:', error);
      toast({
        title: 'Error',
        description: 'Failed to save course. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      await deleteDoc(doc(db, 'courses', courseId));
      toast({
        title: 'Course Deleted',
        description: 'The course has been deleted successfully.',
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting course:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete course.',
        variant: 'destructive',
      });
    }
  };

  const updateRegistrationStatus = async (registrationId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'registrations', registrationId), { status });
      toast({
        title: 'Status Updated',
        description: `Registration status updated to ${status}.`,
      });
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update status.',
        variant: 'destructive',
      });
    }
  };

  const updateContactStatus = async (contactId: string, status: ContactSubmission['status']) => {
    try {
      await updateDoc(doc(db, 'contactSubmissions', contactId), { 
        status,
        updatedAt: Timestamp.now()
      });
      toast({
        title: 'Status Updated',
        description: `Message marked as ${status}.`,
      });
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update status.',
        variant: 'destructive',
      });
    }
  };

  const deleteContactSubmission = async (contactId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await deleteDoc(doc(db, 'contactSubmissions', contactId));
      toast({
        title: 'Message Deleted',
        description: 'The message has been deleted successfully.',
      });
      setIsContactSheetOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete message.',
        variant: 'destructive',
      });
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

  const formatDate = (timestamp: Timestamp | string) => {
    if (!timestamp) return 'N/A';
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'read':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'replied':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'archived':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'approved':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'rejected':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getSubjectLabel = (subject: string) => {
    const subjects: Record<string, string> = {
      'general': 'General Inquiry',
      'courses': 'Course Information',
      'enrollment': 'Enrollment Help',
      'technical': 'Technical Support',
      'feedback': 'Feedback',
      'partnership': 'Partnership',
      'other': 'Other',
    };
    return subjects[subject] || subject;
  };

  // Statistics
  const stats = {
    totalCourses: courses.length,
    totalRegistrations: registrations.length,
    pendingRegistrations: registrations.filter(r => r.status === 'pending').length,
    approvedRegistrations: registrations.filter(r => r.status === 'approved').length,
    totalContacts: contactSubmissions.length,
    newContacts: contactSubmissions.filter(c => c.status === 'new').length,
    totalRevenue: courses.reduce((sum, c) => sum + (c.price || 0), 0),
    totalEnrolled: courses.reduce((sum, c) => sum + (c.enrolled || 0), 0),
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors lg:hidden"
          >
            <LayoutDashboard className="w-5 h-5 text-slate-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif font-bold text-slate-900">Miftah Al Quran</h1>
              <p className="text-xs text-slate-500">Admin Dashboard</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 h-9 rounded-lg border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
            />
          </div>

          {/* Refresh Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchData}
            disabled={refreshing}
            className="h-9 w-9 p-0 rounded-lg"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg relative">
            <Bell className="w-4 h-4" />
            {stats.newContacts > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                {stats.newContacts}
              </span>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <Avatar className="w-8 h-8 border-2 border-emerald-100">
                  <AvatarImage src={userData?.photoURL} />
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xs font-semibold">
                    {getInitials(userData?.displayName || '')}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
              <DropdownMenuLabel className="px-3 py-2">
                <p className="font-semibold text-slate-900">{userData?.displayName}</p>
                <p className="text-xs text-slate-500">{currentUser?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="px-3 py-2 rounded-lg cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="px-3 py-2 rounded-lg cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-16 bottom-0 w-74 bg-white border-r border-slate-200 z-40 transform transition-transform duration-300 ${
          sidebarCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0'
        }`}>
          <div className="p-4 space-y-2">
            {sidebarLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => setActiveTab(link.value)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === link.value
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200/50'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <link.icon className="w-5 h-5 flex-shrink-0" />
                <span className={sidebarCollapsed ? 'lg:hidden' : ''}>{link.name}</span>
                {link.value === 'contacts' && stats.newContacts > 0 && (
                  <span className={`ml-auto px-2 py-0.5 text-xs rounded-full ${
                    activeTab === link.value
                      ? 'bg-white/20 text-white'
                      : 'bg-rose-100 text-rose-600'
                  }`}>
                    {stats.newContacts}
                  </span>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-32' : 'ml-0 lg:ml-72'
        }`}>
          <div className="p-4 lg:p-8">
            <AnimatePresence mode="wait">
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-6"
                >
                  {/* Welcome Header */}
                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                        Welcome back, {userData?.displayName?.split(' ')[0] || 'Admin'}! 👋
                      </h1>
                      <p className="text-slate-500 mt-1">
                        Here's what's happening with your academy today.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="h-10 rounded-xl border-slate-200"
                        onClick={fetchData}
                      >
                        <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                        Refresh
                      </Button>
                      <Button 
                        className="h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                        onClick={() => { resetForm(); setIsDialogOpen(true); }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Course
                      </Button>
                    </div>
                  </motion.div>

                  {/* Stats Grid */}
                  <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { 
                        title: 'Total Courses', 
                        value: stats.totalCourses, 
                        icon: BookOpen, 
                        color: 'from-blue-500 to-cyan-500',
                        bgColor: 'bg-blue-50',
                        iconColor: 'text-blue-600',
                        change: '+2 this month',
                        positive: true
                      },
                      { 
                        title: 'Registrations', 
                        value: stats.totalRegistrations, 
                        icon: Users, 
                        color: 'from-emerald-500 to-teal-500',
                        bgColor: 'bg-emerald-50',
                        iconColor: 'text-emerald-600',
                        change: '+12 this week',
                        positive: true
                      },
                      { 
                        title: 'New Messages', 
                        value: stats.newContacts, 
                        icon: MessageSquare, 
                        color: 'from-amber-500 to-orange-500',
                        bgColor: 'bg-amber-50',
                        iconColor: 'text-amber-600',
                        change: `${stats.totalContacts} total`,
                        positive: true
                      },
                      { 
                        title: 'Total Revenue', 
                        value: `$${stats.totalRevenue.toLocaleString()}`, 
                        icon: DollarSign, 
                        color: 'from-purple-500 to-pink-500',
                        bgColor: 'bg-purple-50',
                        iconColor: 'text-purple-600',
                        change: '+15% vs last month',
                        positive: true
                      },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.title}
                        whileHover={{ y: -2, scale: 1.01 }}
                        className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                            <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                          </div>
                          <span className={`text-xs font-medium flex items-center gap-1 ${
                            stat.positive ? 'text-emerald-600' : 'text-rose-600'
                          }`}>
                            {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {stat.change}
                          </span>
                        </div>
                        <p className="text-2xl lg:text-3xl font-bold text-slate-900">{stat.value}</p>
                        <p className="text-sm text-slate-500 mt-1">{stat.title}</p>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Quick Actions & Recent Activity */}
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Recent Registrations */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900">Recent Registrations</h3>
                          <p className="text-sm text-slate-500">{stats.pendingRegistrations} pending approval</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-emerald-600 hover:text-emerald-700"
                          onClick={() => setActiveTab('registrations')}
                        >
                          View All
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                      <div className="divide-y divide-slate-100">
                        {registrations.slice(0, 5).map((reg) => (
                          <div key={reg.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10 border border-slate-200">
                                <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 text-sm">
                                  {getInitials(reg.fullName)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-slate-900">{reg.fullName}</p>
                                <p className="text-sm text-slate-500">{reg.courseName}</p>
                              </div>
                            </div>
                            <Badge className={`${getStatusColor(reg.status)} border`}>
                              {reg.status}
                            </Badge>
                          </div>
                        ))}
                        {registrations.length === 0 && (
                          <div className="p-8 text-center text-slate-500">
                            No registrations yet
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Recent Messages */}
                    <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900">Recent Messages</h3>
                          <p className="text-sm text-slate-500">{stats.newContacts} unread</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-emerald-600 hover:text-emerald-700"
                          onClick={() => setActiveTab('contacts')}
                        >
                          View All
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                      <div className="divide-y divide-slate-100">
                        {contactSubmissions.slice(0, 4).map((contact) => (
                          <button
                            key={contact.id}
                            onClick={() => {
                              setSelectedContact(contact);
                              setIsContactSheetOpen(true);
                            }}
                            className="w-full p-4 text-left hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                contact.status === 'new' ? 'bg-blue-500' : 'bg-slate-300'
                              }`} />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-slate-900 truncate">
                                  {contact.firstName} {contact.lastName}
                                </p>
                                <p className="text-sm text-slate-500 truncate">
                                  {getSubjectLabel(contact.subject)}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                  {formatDate(contact.createdAt)}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                        {contactSubmissions.length === 0 && (
                          <div className="p-8 text-center text-slate-500">
                            No messages yet
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Courses Tab */}
              {activeTab === 'courses' && (
                <motion.div
                  key="courses"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Courses</h1>
                      <p className="text-slate-500 mt-1">
                        Manage your academy courses
                      </p>
                    </div>
                    <Button 
                      className="h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                      onClick={() => { resetForm(); setIsDialogOpen(true); }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Course
                    </Button>
                  </motion.div>

                  <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    {/* Table Header */}
                    <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          placeholder="Search courses..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 h-10 w-full sm:w-64 rounded-xl border-slate-200"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-10 rounded-xl">
                          <Filter className="w-4 h-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                    </div>

                    {loadingData ? (
                      <div className="p-12 text-center">
                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto mb-4" />
                        <p className="text-slate-500">Loading courses...</p>
                      </div>
                    ) : courses.length > 0 ? (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-slate-50">
                              <TableHead className="font-semibold">Course</TableHead>
                              <TableHead className="font-semibold">Instructor</TableHead>
                              <TableHead className="font-semibold">Level</TableHead>
                              <TableHead className="font-semibold">Duration</TableHead>
                              <TableHead className="font-semibold">Price</TableHead>
                              <TableHead className="font-semibold">Enrolled</TableHead>
                              <TableHead className="text-right font-semibold">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {courses
                              .filter(course => 
                                course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
                              )
                              .map((course) => (
                              <TableRow key={course.id} className="hover:bg-slate-50">
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                                      <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div>
                                      <p className="font-medium text-slate-900">{course.title}</p>
                                      <p className="text-xs text-slate-500 line-clamp-1 max-w-[200px]">
                                        {course.description}
                                      </p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-slate-600">{course.instructor}</TableCell>
                                <TableCell>
                                  <Badge className={`${
                                    course.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
                                    course.level === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
                                    'bg-rose-100 text-rose-700'
                                  }`}>
                                    {course.level}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-slate-600">{course.duration}</TableCell>
                                <TableCell className="font-semibold text-slate-900">${course.price}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-slate-400" />
                                    <span className="text-slate-600">{course.enrolled || 0}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <MoreHorizontal className="w-4 h-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                                      <DropdownMenuItem 
                                        className="rounded-lg cursor-pointer"
                                        onClick={() => openEditDialog(course)}
                                      >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Course
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="rounded-lg cursor-pointer">
                                        <Eye className="w-4 h-4 mr-2" />
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem 
                                        className="rounded-lg cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50"
                                        onClick={() => handleDeleteCourse(course.id)}
                                      >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete Course
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <BookOpen className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-2">No courses yet</h3>
                        <p className="text-slate-500 mb-4">Get started by adding your first course</p>
                        <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Course
                        </Button>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )}

              {/* Registrations Tab */}
              {activeTab === 'registrations' && (
                <motion.div
                  key="registrations"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Registrations</h1>
                      <p className="text-slate-500 mt-1">
                        Manage student course registrations
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    {loadingData ? (
                      <div className="p-12 text-center">
                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto mb-4" />
                        <p className="text-slate-500">Loading registrations...</p>
                      </div>
                    ) : registrations.length > 0 ? (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-slate-50">
                              <TableHead className="font-semibold">Student</TableHead>
                              <TableHead className="font-semibold">Course</TableHead>
                              <TableHead className="font-semibold">Contact</TableHead>
                              <TableHead className="font-semibold">Date</TableHead>
                              <TableHead className="font-semibold">Status</TableHead>
                              <TableHead className="text-right font-semibold">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {registrations.map((reg) => (
                              <TableRow key={reg.id} className="hover:bg-slate-50">
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <Avatar className="w-10 h-10 border border-slate-200">
                                      <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 text-sm">
                                        {getInitials(reg.fullName)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium text-slate-900">{reg.fullName}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-slate-600">{reg.courseName}</TableCell>
                                <TableCell>
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                      <Mail className="w-3 h-3" />
                                      {reg.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                      <Phone className="w-3 h-3" />
                                      {reg.phone}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-slate-600">
                                  {new Date(reg.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                  <Badge className={`${getStatusColor(reg.status)} border`}>
                                    {reg.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Select
                                    value={reg.status}
                                    onValueChange={(value) => updateRegistrationStatus(reg.id, value)}
                                  >
                                    <SelectTrigger className="w-32 h-9 rounded-lg">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="approved">Approved</SelectItem>
                                      <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-2">No registrations yet</h3>
                        <p className="text-slate-500">Student registrations will appear here</p>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )}

              {/* Contact Messages Tab */}
              {activeTab === 'contacts' && (
                <motion.div
                  key="contacts"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Contact Messages</h1>
                      <p className="text-slate-500 mt-1">
                        Manage inquiries from the contact form
                      </p>
                    </div>

                  </motion.div>

                  <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    {/* Search Bar */}
                    <div className="p-5 border-b border-slate-100">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          placeholder="Search messages..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 h-10 w-full sm:w-80 rounded-xl border-slate-200"
                        />
                      </div>
                    </div>

                    {loadingData ? (
                      <div className="p-12 text-center">
                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto mb-4" />
                        <p className="text-slate-500">Loading messages...</p>
                      </div>
                    ) : contactSubmissions.length > 0 ? (
                      <div className="divide-y divide-slate-100">
                        {contactSubmissions
                          .filter(contact =>
                            `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            contact.message.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((contact) => (
                          <motion.div
                            key={contact.id}
                            whileHover={{ backgroundColor: 'rgb(248 250 252)' }}
                            className="p-5 cursor-pointer transition-colors"
                            onClick={() => {
                              setSelectedContact(contact);
                              setIsContactSheetOpen(true);
                              if (contact.status === 'new') {
                                updateContactStatus(contact.id, 'read');
                              }
                            }}
                          >
                            <div className="flex items-start gap-4">
                              <div className="relative flex-shrink-0">
                                <Avatar className="w-12 h-12 border-2 border-white shadow">
                                  <AvatarFallback className={`text-white text-sm font-semibold ${
                                    contact.status === 'new' 
                                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                                      : 'bg-gradient-to-br from-slate-400 to-slate-500'
                                  }`}>
                                    {getInitials(`${contact.firstName} ${contact.lastName}`)}
                                  </AvatarFallback>
                                </Avatar>
                                {contact.status === 'new' && (
                                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 mb-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className={`font-semibold ${
                                      contact.status === 'new' ? 'text-slate-900' : 'text-slate-700'
                                    }`}>
                                      {contact.firstName} {contact.lastName}
                                    </h4>
                                    <Badge className={`${getStatusColor(contact.status)} border text-xs`}>
                                      {contact.status}
                                    </Badge>
                                  </div>
                                  <span className="text-xs text-slate-400 whitespace-nowrap">
                                    {formatDate(contact.createdAt)}
                                  </span>
                                </div>

                                <p className="text-sm text-slate-500 mb-2">
                                  {contact.email} • {getSubjectLabel(contact.subject)}
                                </p>

                                <p className={`text-sm line-clamp-2 ${
                                  contact.status === 'new' ? 'text-slate-700' : 'text-slate-500'
                                }`}>
                                  {contact.message}
                                </p>

                                <div className="flex items-center gap-4 mt-3">
                                  <span className="flex items-center gap-1 text-xs text-slate-400">
                                    {contact.preferredContact === 'email' && <Mail className="w-3 h-3" />}
                                    {contact.preferredContact === 'phone' && <Phone className="w-3 h-3" />}
                                    {contact.preferredContact === 'whatsapp' && <MessageSquare className="w-3 h-3" />}
                                    Prefers {contact.preferredContact}
                                  </span>
                                  {contact.courseInterest && (
                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                      <BookOpen className="w-3 h-3" />
                                      Interested in: {contact.courseInterest}
                                    </span>
                                  )}
                                  {contact.subscribedToNewsletter && (
                                    <span className="flex items-center gap-1 text-xs text-emerald-500">
                                      <CheckCircle2 className="w-3 h-3" />
                                      Newsletter subscriber
                                    </span>
                                  )}
                                </div>
                              </div>

                              <ChevronRight className="w-5 h-5 text-slate-300 flex-shrink-0" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <MessageSquare className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-2">No messages yet</h3>
                        <p className="text-slate-500">Contact form submissions will appear here</p>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Contact Detail Sheet */}
      <Sheet open={isContactSheetOpen} onOpenChange={setIsContactSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedContact && (
            <>
              <SheetHeader className="pb-6 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <Avatar className="w-14 h-14 border-2 border-white shadow-lg">
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold">
                      {getInitials(`${selectedContact.firstName} ${selectedContact.lastName}`)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <SheetTitle className="text-xl">
                      {selectedContact.firstName} {selectedContact.lastName}
                    </SheetTitle>
                    <SheetDescription className="flex items-center gap-2 mt-1">
                      <Badge className={`${getStatusColor(selectedContact.status)} border`}>
                        {selectedContact.status}
                      </Badge>
                      <span className="text-slate-400">•</span>
                      <span>{formatDate(selectedContact.createdAt)}</span>
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="py-6 space-y-6">
                {/* Contact Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">
                    Contact Information
                  </h4>
                  <div className="space-y-2">
                    <a 
                      href={`mailto:${selectedContact.email}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-white shadow-sm">
                        <Mail className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-slate-700">{selectedContact.email}</span>
                      <ExternalLink className="w-4 h-4 text-slate-400 ml-auto" />
                    </a>
                    {selectedContact.phone && (
                      <a 
                        href={`tel:${selectedContact.phone}`}
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                      >
                        <div className="p-2 rounded-lg bg-white shadow-sm">
                          <Phone className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-slate-700">{selectedContact.phone}</span>
                        <ExternalLink className="w-4 h-4 text-slate-400 ml-auto" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">
                    Details
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50">
                      <p className="text-xs text-slate-500 mb-1">Subject</p>
                      <p className="font-medium text-slate-900">
                        {getSubjectLabel(selectedContact.subject)}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50">
                      <p className="text-xs text-slate-500 mb-1">Preferred Contact</p>
                      <p className="font-medium text-slate-900 capitalize">
                        {selectedContact.preferredContact}
                      </p>
                    </div>
                    {selectedContact.courseInterest && (
                      <div className="p-3 rounded-xl bg-slate-50 col-span-2">
                        <p className="text-xs text-slate-500 mb-1">Course Interest</p>
                        <p className="font-medium text-slate-900">{selectedContact.courseInterest}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">
                    Message
                  </h4>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>

                {/* Newsletter Status */}
                {selectedContact.subscribedToNewsletter && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-emerald-700 font-medium">
                      Subscribed to newsletter
                    </span>
                  </div>
                )}

                {/* Status Actions */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">
                    Update Status
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['new', 'read', 'replied', 'archived'].map((status) => (
                      <Button
                        key={status}
                        variant={selectedContact.status === status ? 'default' : 'outline'}
                        size="sm"
                        className={`rounded-lg capitalize ${
                          selectedContact.status === status
                            ? 'bg-emerald-500 hover:bg-emerald-600'
                            : ''
                        }`}
                        onClick={() => updateContactStatus(selectedContact.id, status as ContactSubmission['status'])}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <Button
                    className="flex-1 h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                    onClick={() => window.location.href = `mailto:${selectedContact.email}`}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Reply via Email
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11 rounded-xl border-rose-200 text-rose-600 hover:bg-rose-50"
                    onClick={() => deleteContactSubmission(selectedContact.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Add/Edit Course Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-0">
          <DialogHeader className="p-6 pb-4 border-b border-slate-100">
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </DialogTitle>
            <DialogDescription>
              {editingCourse 
                ? 'Update the course information below'
                : 'Fill in the details to create a new course'
              }
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-700 font-medium">
                Course Title <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g., Quran Recitation for Beginners"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-11 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-700 font-medium">
                Description <span className="text-rose-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Course description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 resize-none"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instructor" className="text-slate-700 font-medium">
                  Instructor Name
                </Label>
                <Input
                  id="instructor"
                  placeholder="e.g., Sheikh Ahmad"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  className="h-11 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-slate-700 font-medium">
                  Duration
                </Label>
                <Input
                  id="duration"
                  placeholder="e.g., 12 weeks"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="h-11 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level" className="text-slate-700 font-medium">
                  Level
                </Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => setFormData({ ...formData, level: value })}
                >
                  <SelectTrigger className="h-11 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="All Levels">All Levels</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-slate-700 font-medium">
                  Price ($) <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="99"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  min="0"
                  className="h-11 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Course Thumbnail</Label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-emerald-300 transition-colors">
                {thumbnailPreview ? (
                  <div className="relative inline-block">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="max-h-40 rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailFile(null);
                        setThumbnailPreview('');
                        setFormData({ ...formData, thumbnail: '' });
                      }}
                      className="absolute -top-2 -right-2 w-7 h-7 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mx-auto">
                      <ImageIcon className="w-7 h-7 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-1">
                        Upload an image
                      </p>
                      <p className="text-xs text-slate-500">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="max-w-xs mx-auto"
                    />
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-slate-400">Or</span>
                      </div>
                    </div>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={formData.thumbnail}
                                           onChange={(e) => {
                        setFormData({ ...formData, thumbnail: e.target.value });
                        setThumbnailPreview(e.target.value);
                      }}
                      className="max-w-md mx-auto h-10 rounded-xl border-slate-200"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => { setIsDialogOpen(false); resetForm(); }}
                className="flex-1 h-11 rounded-xl"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700" 
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {editingCourse ? 'Update Course' : 'Add Course'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarCollapsed(true)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}