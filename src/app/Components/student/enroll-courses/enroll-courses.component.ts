import { Component } from '@angular/core';

@Component({
  selector: 'app-enroll-courses',
  templateUrl: './enroll-courses.component.html',
  styleUrl: './enroll-courses.component.css'
})
export class EnrollCoursesComponent {
  courses = [
    {
      title: 'HTML Basics',
      subtitle: 'Introduction to HTML5',
      level: 'Beginner',
      duration: 3,
      description: 'This beginner-level course introduces the fundamentals of HTML5 for web development.',
      price: 15000,
      image: '/html.jpg'
    },
    {
      title: 'Advanced CSS',
      subtitle: 'Mastering CSS3',
      level: 'Intermediate',
      duration: 4,
      description: 'Enhance your CSS skills with advanced concepts like Flexbox, Grid, and animations.',
      price: 20000,
      image: '/html.jpg'
    },
    {
      title: 'JavaScript Essentials',
      subtitle: 'Learn JavaScript for Web Development',
      level: 'Beginner',
      duration: 5,
      description: 'A comprehensive course covering the basics of JavaScript and how it fits into modern web development.',
      price: 18000,
      image: '/html.jpg'
    }
  ];

  handleViewCourse(course: any) {
    console.log('Viewing course:', course.title);
  }

  handleFollowCourse(course: any) {
    console.log('Following course:', course.title);
  }
}
