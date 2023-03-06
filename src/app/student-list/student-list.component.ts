import { Component } from '@angular/core';
import { Student } from '../student'
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { StudentAuthService } from '../student-auth.service';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {

  students: Student[]=[];
  Name = '';
  searchName= '';
  sortByParam = '';
  sortDirection = 'asc';

  POST: any;
  page: number=1;
  count: number=0;
  tableSize: number=7;
  tableSizes: any=[5,10,15,20];

  constructor(private studentService: StudentService,
    private router: Router, private studentAuthService: StudentAuthService) { }

    
  
  ngOnInit(): void {
    this.getStudents();
  } 
     getStudents(): void{
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
  alert("Logout successfully");
}

onNameFilter(){
  this.searchName = this.Name;
}

onNameFilterClear(){
  this.searchName = '';
  this.Name = '';
}

onSortDirection(){
  if(this.sortDirection === 'desc'){
    this.sortDirection = 'asc';
  }else{
    this.sortDirection = 'desc';
  }

}

onTableDataChange(event:any){
this.page=event;
this.getStudents();

}

onTableSizeChange(event:any): void{
 this.tableSize =event.target.value;
 this.page=1;
 this.getStudents();
}



}

  


