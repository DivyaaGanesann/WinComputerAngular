import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-ieee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ieee.component.html',
  styleUrls: ['./ieee.component.css']
})
export class IeeeComponent implements OnInit {

  ieeeList: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.api.getIEEE().subscribe((data: any) => {
      this.ieeeList = data;
    });
  }
}
