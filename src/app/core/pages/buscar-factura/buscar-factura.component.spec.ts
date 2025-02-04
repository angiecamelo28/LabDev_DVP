import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarFacturaComponent } from './buscar-factura.component';

describe('BuscarFacturaComponent', () => {
  let component: BuscarFacturaComponent;
  let fixture: ComponentFixture<BuscarFacturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarFacturaComponent]
    });
    fixture = TestBed.createComponent(BuscarFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
