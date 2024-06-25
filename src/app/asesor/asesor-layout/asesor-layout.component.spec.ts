import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesorLayoutComponent } from './asesor-layout.component';

describe('AsesorLayoutComponent', () => {
  let component: AsesorLayoutComponent;
  let fixture: ComponentFixture<AsesorLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsesorLayoutComponent]
    });
    fixture = TestBed.createComponent(AsesorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
