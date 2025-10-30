import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TeacherService } from '../../service/teacher-service';
interface ClassCard {
  code: string;
  title: string;
  description: string;
  nextSession: string;
  students: number;
  reviewCompletion: number;
  image: string;
}
@Component({
  selector: 'app-classes',
  imports: [FormsModule,CommonModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss',
})
export class Classes {
    classes: any[] = [];
    constructor(private teacherService: TeacherService) {}
    ngOnInit(): void {
      // alert("1")
    this.loadClasses();
  }
   loadClasses(): void {
    console.log("working");
    
    this.teacherService.getAllClasses(1).subscribe({
      next: (res) => (this.classes = res.body),
      error: (err) => console.error('Error fetching classes:', err),
    });
  }
  //  classes: ClassCard[] = [
  //   {
  //     code: 'CS101',
  //     title: 'Intro to CS',
  //     description: 'Introduction to Computer Science',
  //     nextSession: 'Oct 15, 10:00 AM',
  //     students: 25,
  //     reviewCompletion: 72,
  //     image: 'assets/images/cs.jpg'
  //   },
  //   {
  //     code: 'MATH201',
  //     title: 'Calculus II',
  //     description: 'Advanced mathematics for engineers',
  //     nextSession: 'Oct 16, 1:00 PM',
  //     students: 30,
  //     reviewCompletion: 85,
  //     image: 'assets/images/math.jpg'
  //   },
  //   {
  //     code: 'ENG110',
  //     title: 'Academic Writing',
  //     description: 'Improving writing and communication skills',
  //     nextSession: 'Oct 17, 9:00 AM',
  //     students: 20,
  //     reviewCompletion: 60,
  //     image: 'assets/images/eng.jpg'
  //   },
  //   {
  //     code: 'BIO101',
  //     title: 'Introduction to Biology',
  //     description: 'Fundamentals of life sciences',
  //     nextSession: 'Oct 18, 11:00 AM',
  //     students: 22,
  //     reviewCompletion: 78,
  //     image: 'assets/images/bio.jpg'
  //   },
  //   {
  //     code: 'HIST101',
  //     title: 'World History',
  //     description: 'A look into global civilization',
  //     nextSession: 'Oct 19, 2:00 PM',
  //     students: 28,
  //     reviewCompletion: 65,
  //     image: 'assets/images/history.jpg'
  //   },
  //   {
  //     code: 'PHYS201',
  //     title: 'Physics II',
  //     description: 'Advanced topics in physics',
  //     nextSession: 'Oct 20, 3:00 PM',
  //     students: 26,
  //     reviewCompletion: 90,
  //     image: 'assets/images/physics.jpg'
  //   }
  // ];

  // constructor(private modalService: Ngb) {

  // }

  openModal(): void {
    // this.modalService.open(this.addClassModal, { centered: true, size: 'lg' });
  }

  onImageSelected(event: any): void {
    // const file = event.target.files[0];
    // if (file) {
    //   this.classForm.patchValue({ dp: file });
    // }
  }

  saveClass(modal: any): void {
    // if (this.classForm.valid) {
    //   const value = this.classForm.value;
    //   this.classes.push({
    //     code: `C${this.classes.length + 1}00`,
    //     title: value.className,
    //     nextSession: 'Not scheduled',
    //     students: 0,
    //     reviewCompletion: 0
    //   });
    //   modal.close();
    //   this.classForm.reset();
    // }
  }
  addClass(){

  }

}
