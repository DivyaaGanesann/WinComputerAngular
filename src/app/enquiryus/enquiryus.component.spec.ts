import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryusComponent } from './enquiryus.component';

describe('EnquiryusComponent', () => {
  let component: EnquiryusComponent;
  let fixture: ComponentFixture<EnquiryusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquiryusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnquiryusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
