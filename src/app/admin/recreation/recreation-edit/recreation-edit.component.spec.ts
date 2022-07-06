import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecreationEditComponent } from './recreation-edit.component';

describe('RecreationEditComponent', () => {
  let component: RecreationEditComponent;
  let fixture: ComponentFixture<RecreationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecreationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecreationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
