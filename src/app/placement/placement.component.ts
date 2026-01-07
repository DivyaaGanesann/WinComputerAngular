import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-placement',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.css'] 
})
export class placementComponent {
  
  // Data for Course Categories (Count represents courses within that category)
  categories = [
    { name: 'Software Development', count: '05', icon: '💻' },
    { name: 'Web Development', count: '07', icon: '🌐' },
    { name: 'Mobile Development', count: '03', icon: '📱' },
    { name: 'Cloud', count: '05', icon: '☁️' },
    { name: 'DataBase', count: '02', icon: '🗄️' }
  ];

  // Data for Trending Courses (Right Panel)
  recentCourses = [
    'SAP', 'AWS', 'AZURE', 'PYTHON', 'ORACLE', 'DEVOPS', 'IOT'
  ];

  // Data for Enquiry Form Dropdown
  courseOptions = [
    'Web Design', 'AUTOCAD', 'SAP', 'Java', 'Python', 'Dot Net',
    'Software testing', 'Selenium testing', 'Bigdata-Hadoop', 'Oracle',
    'Android', 'SQL', 'IOS', 'Azure', 'AWS'
  ];

  // Form Model
  enquiryModel = {
    name: '',
    email: '', // Note: Email input was not in HTML but is kept here for data completeness
    phone: '',
    selectedCourse: ''
  };

  /**
   * Handles the submission of the enquiry form.
   */
  submitEnquiry() {
    console.log('Enquiry Submitted:', this.enquiryModel);
    alert('Thank you! We will contact you shortly.');
  }
}