import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherBase } from './teacher-base';

describe('TeacherBase', () => {
  let component: TeacherBase;
  let fixture: ComponentFixture<TeacherBase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherBase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherBase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
