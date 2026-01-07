import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIeeeComponent } from './add-ieee.component';

describe('AddIeeeComponent', () => {
  let component: AddIeeeComponent;
  let fixture: ComponentFixture<AddIeeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIeeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddIeeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
