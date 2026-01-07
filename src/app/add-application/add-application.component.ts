import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-add-application',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.css']
})
export class AddApplicationComponent implements OnInit, AfterViewInit {

  projectCategories: any[] = [];
  title = '';
  description = '';
  img: any = null;
  editIndex: number | null = null;
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProjects();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if(this.selectedFile){
      this.img = this.selectedFile.name; // show file name
    }
  }

  submitForm() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);

    if(this.selectedFile){
      formData.append('image', this.selectedFile);
    } else if(this.editIndex !== null){
      // keep old image name
      formData.append('image', this.projectCategories[this.editIndex].icon_url);
    }

    if(this.editIndex !== null){
      const id = this.projectCategories[this.editIndex].id;
      this.http.post(`http://localhost/backend/update_project.php?id=${id}`, formData)
        .subscribe((res: any) => {
          this.projectCategories[this.editIndex!] = { ...res, id };
          this.clearForm();
          this.reloadDataTable();
        });
    } else {
      this.http.post('http://localhost/backend/save_project.php', formData)
        .subscribe((res: any) => {
          this.projectCategories.unshift(res); // newest on top
          this.clearForm();
          this.reloadDataTable();
        });
    }
  }

  editProject(index: number) {
    const project = this.projectCategories[index];
    this.title = project.title;
    this.description = project.description;
    this.img = project.icon_url; // original image
    this.editIndex = index;

    const fileInput: any = document.querySelector('input[type="file"]');
    if(fileInput) fileInput.value = '';
  }

  deleteProject(index: number) {
    if(confirm('Are you sure you want to delete this project?')){
      const id = this.projectCategories[index].id;
      this.http.post('http://localhost/backend/delete_project.php', {id})
        .subscribe(() => {
          this.projectCategories.splice(index, 1);
          this.reloadDataTable();
        });
    }
  }

  clearForm() {
    this.title = '';
    this.description = '';
    this.img = null;
    this.selectedFile = null;
    this.editIndex = null;
  }

  loadProjects() {
    this.http.get<any[]>('http://localhost/backend/get_projects.php')
      .subscribe(data => {
        this.projectCategories = data;
        setTimeout(() => this.reloadDataTable(), 500);
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      ($('#projectsTable') as any).DataTable();
    }, 500);
  }

  reloadDataTable() {
    const table: any = ($('#projectsTable') as any).DataTable();
    table.destroy();
    setTimeout(() => ($('#projectsTable') as any).DataTable(), 100);
  }

}
