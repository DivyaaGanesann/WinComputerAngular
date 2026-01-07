import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ import CommonModule
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-courses',
  standalone: true, // ✅ standalone must be true
  imports: [CommonModule, FormsModule], // ✅ add CommonModule here
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.api.getcourses().subscribe((data: any[]) => {
      this.courses = data;
    });
  }
}
