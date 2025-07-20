import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactosForm } from './contactos-form';

describe('ContactosForm', () => {
  let component: ContactosForm;
  let fixture: ComponentFixture<ContactosForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactosForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactosForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
