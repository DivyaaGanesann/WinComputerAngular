import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeeeComponent } from './ieee.component';

describe('IeeeComponent', () => {
  let component: IeeeComponent;
  let fixture: ComponentFixture<IeeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IeeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IeeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
