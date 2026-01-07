import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsZoneComponent } from './students-zone.component';

describe('StudentsZoneComponent', () => {
  let component: StudentsZoneComponent;
  let fixture: ComponentFixture<StudentsZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsZoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
