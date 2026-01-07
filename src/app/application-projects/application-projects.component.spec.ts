import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationProjectsComponent } from './application-projects.component';

describe('ApplicationProjectsComponent', () => {
  let component: ApplicationProjectsComponent;
  let fixture: ComponentFixture<ApplicationProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
