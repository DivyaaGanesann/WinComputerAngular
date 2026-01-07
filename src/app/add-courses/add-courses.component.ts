import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import $ from 'jquery';
import 'datatables.net';
@Component({
  selector: 'app-add-courses',
  standalone: true,   // ✅ must be here
  imports: [CommonModule, FormsModule], // ✅ only works if standalone: true
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {
  courses: any[] = [];
  title = '';
  text = '';
  img: any = null;
  editIndex: number | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadCourses();
  }

loadCourses() {
  this.api.getcourses().subscribe(data => {
    // Sort by ID ascending
    this.courses = data
      .map((course: any) => ({
        ...course,
        uploadedAt: course.uploadedAt ? new Date(course.uploadedAt) : new Date()
      }))
      .sort((a: any, b: any) => a.id - b.id); // ascending order
  });
}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (e: any) => this.img = e.target.result;
      reader.readAsDataURL(file);
    }
  }

 submitCourse() {
  const formData = new FormData();
  formData.append('title', this.title);
  formData.append('text', this.text);

  // Only append file if a new file is selected
  const fileInput: any = document.querySelector('input[type="file"]');
  if(fileInput && fileInput.files.length > 0){
    formData.append('img', fileInput.files[0]);
  } else if(this.editIndex !== null) {
    // keep old image name for editing without changing file
    formData.append('img', this.courses[this.editIndex].img);
  }

  if(this.editIndex !== null){
    const id = this.courses[this.editIndex].id;
    this.api.updateCourse(id, formData).subscribe((res: any) => {
      this.courses[this.editIndex!] = { ...res, id };
      this.clearForm();
    });
  } else {
    this.api.addCourse(formData).subscribe((res: any) => {
      this.courses.unshift(res);
      this.clearForm();
    });
  }
}
editCourse(index: number) {
  const course = this.courses[index];
  this.title = course.title;
  this.text = course.text;
  this.img = course.img;
  this.editIndex = index;

  const fileInput: any = document.querySelector('input[type="file"]');
  if(fileInput) fileInput.value = '';
}


  deleteCourse(index: number) {
    if(confirm('Are you sure you want to delete this course?')){
      const id = this.courses[index].id;
      this.api.deleteCourse(id).subscribe(() => {
        this.courses.splice(index, 1);
      });
    }
  }

  clearForm() {
    this.title = '';
    this.text = '';
    this.img = null;
    this.editIndex = null;
  }
  ngAfterViewInit() {
    setTimeout(() => {
      ($('#coursesTable') as any).DataTable(); // initialize DataTable
    }, 500);
  }
}
