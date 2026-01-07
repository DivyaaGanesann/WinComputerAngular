import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
 standalone: true,           // ✅ must be here
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
faqList = [
  { 
    question: "Will there be a free demo class?", 
    answer: "Yes, we provide a free demo class so you can understand our teaching style and course structure.", 
    open: false 
  },
  { 
    question: "Do You Give Placement Assistance?", 
    answer: "Yes. We offer complete placement assistance including resume building, interview preparation, and connecting you with hiring partners.",
    open: false 
  },
  { 
    question: "Do you just focus your training on the things that we face in the interviews?", 
    answer: "No. Our aim is to provide valuable software training by professionals who are successful in the IT field. We teach you a complete, systematic process that helps in real-world development as well as interviews.",
    open: false 
  },
  { 
    question: "How can I pay for my training?", 
    answer: "You can pay through UPI, bank transfer, card payment, or directly at our center.",
    open: false 
  },
  { 
    question: "Do you provide any certificate?", 
    answer: "Yes. After completing the course successfully, you will receive an industry-recognized certificate.",
    open: false 
  },
  { 
    question: "What is the duration of your internet marketing courses?", 
    answer: "The duration varies based on the module, typically ranging from 1 to 3 months with practical hands-on training.",
    open: false 
  }
];


  toggle(i: number) {
    this.faqList[i].open = !this.faqList[i].open;
  }
}
