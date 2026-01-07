import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

interface Enquiry {
  id: number;
  name: string;
  email: string;
  mobile: string;
  message: string;
}

@Component({
  selector: 'app-add-enquiry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-enquiry.component.html',
  styleUrls: ['./add-enquiry.component.css']
})
export class AddEnquiryComponent implements OnInit {

  enquiries: Enquiry[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadEnquiries();
  }

  loadEnquiries() {
    this.api.getEnquiries().subscribe({
      next: (data: Enquiry[]) => {
        console.log('Enquiries:', data);
        this.enquiries = data; // now your table will show data
      },
      error: (err) => {
        console.error('Error fetching enquiries:', err);
      }
    });
  }

  deleteEnquiry(index: number) {
    const enquiry = this.enquiries[index];
    if (confirm(`Are you sure you want to delete enquiry from ${enquiry.name}?`)) {
      this.api.deleteEnquiry(enquiry.id).subscribe({
        next: () => {
          this.enquiries.splice(index, 1); // remove from array
        },
        error: (err) => console.error('Delete failed:', err)
      });
    }
  }
}
