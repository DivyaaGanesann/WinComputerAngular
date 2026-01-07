import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-add-ieee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-ieee.component.html',
  styleUrls: ['./add-ieee.component.css']
})
export class AddIEEEComponent implements OnInit {

  title = '';
  description = '';
  selectedFile: File | null = null;
  ieeeList: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadProjects();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitIEEE() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    if (this.selectedFile) formData.append('image', this.selectedFile);

    this.api.addIEEE(formData).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          alert('Project added successfully!');
          this.title = '';
          this.description = '';
          this.selectedFile = null;
          this.loadProjects(); // reload table
        } else {
          alert('Failed: ' + (res.message || 'Unknown error'));
        }
      },
      error: (err) => console.error('HTTP error:', err)
    });
  }

  loadProjects() {
    this.api.getIEEE().subscribe(data => {
      this.ieeeList = data;

      // Initialize DataTable after Angular renders table rows
      setTimeout(() => {
        const table: any = $('#ieeeTable');

        // Destroy previous instance if exists
        if ($.fn.DataTable.isDataTable(table)) {
          table.DataTable().destroy();
        }

        // Initialize DataTable
        table.DataTable({
          paging: true,        // pagination
          searching: true,     // search box
          ordering: true,      // column sorting
          info: true,          // "Showing X of Y entries"
          responsive: true
        });
      }, 300); // wait 300ms to ensure table rows are rendered
    });
  }
}
