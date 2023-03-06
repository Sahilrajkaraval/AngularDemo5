import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Student } from '../student';
import { StudentAuthService } from '../student-auth.service';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  id?: number;
  student: Student = new Student();
  constructor(private studentService: StudentService, private route: ActivatedRoute,
    private router: Router, private studentAuthService: StudentAuthService){ }

   
   
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.studentService.getStudentById(this.id!).subscribe(data => {
      this.student = data;
    },error => console.log(error));
  }
  onSubmit(){
    
    
    this.studentService.UpdateStudent(this.id!,this.student).subscribe( data =>{
      this.goToStudentList();
      alert("Student details updated successfully");
      
    });
  }

  
  goToStudentList(){
    
      this.router.navigate(['/students']);
    
   
    }
  }
  
  


function showSuccess() {
  throw new Error('Function not implemented.');
}

