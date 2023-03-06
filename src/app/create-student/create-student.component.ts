import { NgIfContext } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit{

student: Student = new Student();
constructor(private studentService: StudentService, private router: Router){ }
 
ngOnInit(): void {
}
saveStudent(){
  this.studentService.createStudent(this.student).subscribe( data =>{
    this.goToStudentList();
  });

}

goToStudentList(){
  this.router.navigate(['/students']);
}


onSubmit(){
console.log(this.student);
this.saveStudent();
alert("Student details Added successfully");
}
}
