import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-application-projects',
  standalone: true,
  imports: [CommonModule, HttpClientModule],   // <-- IMPORTANT
  templateUrl: './application-projects.component.html',
  styleUrls: ['./application-projects.component.css']
})
export class ApplicationProjectsComponent implements OnInit {

  projectCategories: any[] = [];

  formData = {
    title: '',
    description: '',
    iconUrl: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProjects();
  }
loadProjects() {
  this.http.get<any[]>('http://localhost/backend/get_projects.php')
    .subscribe(data => {
      // prepend backend URL for images
      this.projectCategories = data.map(item => ({
        ...item,
        iconUrl: 'http://localhost/backend/' + item.icon_url  // ✅ full path
      }));
    });
}



  submitForm() {
    this.http.post('http://localhost/backend/save_project.php', this.formData)
      .subscribe(res => {
        alert("Project added successfully!");
        this.formData = { title: '', description: '', iconUrl: '' }; // reset
        this.loadProjects();  
      });
  }
}
