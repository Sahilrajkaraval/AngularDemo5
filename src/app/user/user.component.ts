import { Component } from '@angular/core';
import { Student } from '../student'
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { StudentAuthService } from '../student-auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  students?: Student[];

  constructor(private studentService: StudentService,
    private router: Router,private studentAuthService: StudentAuthService) { }
  
  ngOnInit(): void {
    this.getStudents();
  } 
    private getStudents(){
      this.studentService.getStudentList().subscribe(data=>{
        this.students = data;
      } );
    }
updateStudent(id:number){
this.router.navigate(['update-student', id]);
}

deleteStudent(id: number){
  if(confirm('Do you want to Delete'))
this.studentService.deleteStudent(id).subscribe( data =>{
  console.log(data);
this.getStudents();
  });
 }

 forAdmin(){
  this.studentService.forAdmin().subscribe(
    (response) => {
      console.log(response);
    },
    (error) =>{
      console.log(error);
    }
  );
}
public logout() {
  this.studentAuthService.clear();
  this.router.navigate(['/login']);
}

}
  

