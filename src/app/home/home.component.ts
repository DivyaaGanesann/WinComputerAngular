import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';

// Interfaces
interface Course {
  id: number;
  img: string;
  title: string;
  text: string;
}

interface Slide {
  img: string;
  title: string;
  time: string;
  desc: string;
}

interface Feedback {
  img: string;
  message: string;
  name: string;
  role: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],   // ✔ Correct placement
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('carousel') carousel!: ElementRef;

  enquiry = {
    name: '',
    email: '',
    mobile: '',
    message: ''
  };

  courses: Course[] = [];
  trendingCourses: Course[] = [];
  slides: Slide[] = [];
  feedbacks: Feedback[] = [];

  dynamicTexts = [
    "Best Software Training Institute in Karaikudi",
    "Learn From Industry Expert Trainers",
    "100% Placement Support",
    "Master Trending IT Courses Today"
  ];

  currentText = this.dynamicTexts[0];
  index = 0;
  fadeState = 'visible';

  partnerCount = 0;
  studentsCount = 0;
  courseCount = 0;

  tabs: ('webinar' | 'workshop' | 'placement')[] = ['webinar', 'workshop', 'placement'];
  activeTab: 'webinar' | 'workshop' | 'placement' = 'webinar';

  currentIndex = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getcourses().subscribe((data: Course[]) => {
      this.courses = data;
    });

    this.trendingCourses = [
      { id: 1, img: 'assets/images/trend1.jpg', title: 'Bigdata-Hadoop', text: 'Learn Big Data concepts, Hadoop ecosystem, HDFS, MapReduce, and real-time data processing.' },
      { id: 2, img: 'assets/images/trend2.png', title: 'AWS Training', text: 'Master cloud computing with AWS services, deployment, and architecture best practices.' },
      { id: 3, img: 'assets/images/trend3.jpg', title: 'Oracle Training', text: 'Get hands-on with Oracle databases, SQL, PL/SQL, and enterprise-level applications.' }
    ];

    this.slides = [
      { img: 'assets/images/event1.jpg', title: 'Demo Classes', time: '8:00 AM - 5:00 PM', desc: 'C, C++, Java, Python, AWS, Hadoop, Oracle, DevOps, etc.' },
      { img: 'assets/images/event2.jpg', title: 'Workshop Training', time: '10:00 AM - 3:00 PM', desc: 'Full Stack, Angular, React, Node.js' },
      { img: 'assets/images/event3.jpg', title: 'Tech Seminar', time: '11:00 AM - 1:00 PM', desc: 'AI, Machine Learning, Cyber Security' },
      { img: 'assets/images/event4.jpg', title: 'Special Offer', time: 'Limited Time', desc: 'Enroll now and get 20% off on all courses!' }
    ];

    this.feedbacks = [
      { img: "assets/images/user.png", message: "The teaching quality is excellent...", name: "Priya S", role: "Python Student" },
      { img: "assets/images/user.png", message: "This institute helped me get my first job...", name: "Arun Kumar", role: "Full Stack Student" },
      { img: "assets/images/user.png", message: "I loved the hands-on sessions...", name: "Sanjay M", role: "UI/UX Student" },
      { img: "assets/images/user.png", message: "Best mentors! They guided me...", name: "Lakshmi R", role: "Java Student" },
      { img: "assets/images/user.png", message: "Cloud computing course was awesome...", name: "Vishnu P", role: "Cloud Student" },
      { img: "assets/images/user.png", message: "Amazing experience. The digital marketing strategies...", name: "Gayathri K", role: "Digital Marketing Student" }
    ];

    setInterval(() => {
      this.fadeState = 'hidden';
      setTimeout(() => {
        this.index = (this.index + 1) % this.dynamicTexts.length;
        this.currentText = this.dynamicTexts[this.index];
        this.fadeState = 'visible';
      }, 400);
    }, 2500);

    this.startCounter('partnerCount', 50, 30);
    this.startCounter('studentsCount', 1000, 0);
    this.startCounter('courseCount', 30, 40);
  }

  ngAfterViewInit(): void {
    const container = this.carousel.nativeElement;
    setInterval(() => {
      container.scrollBy({ left: 350, behavior: 'smooth' });
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollTo({ left: 0 });
      }
    }, 2500);
  }

  scrollLeft() { this.carousel.nativeElement.scrollBy({ left: -350, behavior: 'smooth' }); }
  scrollRight() { this.carousel.nativeElement.scrollBy({ left: 350, behavior: 'smooth' }); }

  startCounter(field: 'partnerCount' | 'studentsCount' | 'courseCount', end: number, speed: number) {
    let interval = setInterval(() => {
      const current = (this as any)[field] as number;
      if (current < end) (this as any)[field] = current + 1;
      else clearInterval(interval);
    }, speed);
  }

  next() { this.currentIndex = (this.currentIndex + 1) % this.slides.length; }
  prev() { this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length; }

  nextSlide() { this.currentIndex = (this.currentIndex + 1) % this.feedbacks.length; }
  prevSlide() { this.currentIndex = (this.currentIndex - 1 + this.feedbacks.length) % this.feedbacks.length; }
  goToSlide(i: number) { this.currentIndex = i; }

  scrollToEnquiry() {
    document.getElementById('enquiryForm')?.scrollIntoView({ behavior: 'smooth' });
  }

  submitEnquiry() {
    this.api.saveEnquiry(this.enquiry).subscribe(() => {
      alert("Enquiry Submitted Successfully!");
      this.enquiry = { name: '', email: '', mobile: '', message: '' };
    });
  }
}
