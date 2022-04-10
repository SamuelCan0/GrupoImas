import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortafolioAdminComponent } from './portafolio-admin.component';

describe('PortafolioAdminComponent', () => {
  let component: PortafolioAdminComponent;
  let fixture: ComponentFixture<PortafolioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortafolioAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortafolioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
