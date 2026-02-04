import { Link } from 'react-router-dom';
import { Clock, User, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  level: string;
  price: number;
  enrolled?: number;
  createdAt?: string;
}

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const levelColors: Record<string, string> = {
    Beginner: 'bg-emerald-light/20 text-emerald-dark',
    Intermediate: 'bg-gold/20 text-gold-dark',
    Advanced: 'bg-primary/20 text-primary',
    'All Levels': 'bg-muted text-muted-foreground',
  };

  return (
    <Card className="group overflow-hidden border-border/50 shadow-card hover:shadow-elevated transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Badge className={`absolute top-3 left-3 ${levelColors[course.level] || levelColors['All Levels']}`}>
          {course.level}
        </Badge>
        {course.price && (
          <div className="absolute top-3 right-3 bg-gold text-primary font-bold px-3 py-1 rounded-full text-sm">
            ${course.price}
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-gold" />
            <span>{course.instructor}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gold" />
            <span>{course.duration}</span>
          </div>
          {course.enrolled && (
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-gold" />
              <span>{course.enrolled.toLocaleString()} students</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button className="w-full" asChild>
          <Link to={`/course/${course.id}/register`}>
            Enroll Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
