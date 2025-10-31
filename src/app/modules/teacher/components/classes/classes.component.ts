import { Component, TemplateRef } from '@angular/core';
import {NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TeacherService } from '../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtService } from '../../../../core/service/jwt-service';
import { Router } from '@angular/router';
import { ClassDataService } from '../../services/class-data/class-data';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [FormsModule,CommonModule,NgbModalModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent {
  classes: any[]=[] ;
  logedUserId: number|null = null;
  newClass = {
    className: '',
    description: '',
    dp: null as File | null
  };
   classObj = {
    className: '',
    id: 0,

  };
  constructor(private teacherService: TeacherService,
    
    private modalService: NgbModal,
    private jwtService: JwtService,
    private router: Router,
     private classDataService: ClassDataService,
  ) {

  }

  ngOnInit(): void {
        this.logedUserId = this.jwtService.getLogedUserId();  
         this.loadClasses();
  }

  loadClasses(): void {
    this.teacherService.getAllClasses(this.logedUserId!).subscribe({
      next: (res) => {
       if (res.body && Array.isArray(res.body)) {
        this.classes = res.body
          .filter((c: any) => {
            const firstChar = c.className?.charAt(0).toLowerCase();
            return firstChar !== 'f' && firstChar !== 'm' && firstChar !== 'v';
          })
          .map((c: any) => ({
            id: c.id,
            title: c.className,
            description: c.description,
            code: 'C' + c.id,
            image: c.dp ? `data:image/jpeg;base64,${c.dp}` : 'https://via.placeholder.com/200',
            nextSession: 'TBA',
            students: c.totalStudent || 0,
            reviewCompletion: 0
          }));
        }
      },
      error: (err) => {
        console.error('Error loading classes:', err);
      }
    });
  }

  // New class object



  // open modal
  openModal(templateRef: TemplateRef<any>) {
    this.modalService.open(templateRef, {
      size: 'lg',
      backdrop: 'static',
      centered: true
    });
  }

  // file select
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newClass.dp = file;
    }
  }

  // form submit
saveClass(form: NgForm): void {
  if (form.valid) {
    const formData = new FormData();
    formData.append('className', this.newClass.className);
    formData.append('description', this.newClass.description);
    formData.append('teacherId', this.logedUserId?this.logedUserId.toString():''); 
    if (this.newClass.dp) {
      formData.append('dp', this.newClass.dp); 
    }

    // Call API
    this.teacherService.createClass(formData).subscribe({
      next: (res) => {
        this.loadClasses();
        console.log(' Class created successfully:', res);
        this.modalService.dismissAll();
        form.resetForm();
        this.newClass.dp = null;
      },
      error: (err) => {
        console.error(' Error creating class:', err);
      }
    });
  } else {
    console.warn('Form is invalid');
  }
}

  goToClass(classId: number,className:string): void {
    this.classObj.className=className;
    this.classObj.id=classId;
    this.classDataService.setClass(this.classObj);
    this.router.navigate([`/app/teacher/classes/${classId}`]);
  }
}
