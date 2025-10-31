import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class ClassDataService {
  private selectedClass = new BehaviorSubject<any>(null);
  selectedClass$ = this.selectedClass.asObservable();
  
  setClass(classData: any) {
    this.selectedClass.next(classData);
  }
  clearClass() {
    this.selectedClass.next(null);
  }
}
