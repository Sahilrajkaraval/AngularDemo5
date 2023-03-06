import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable } from 'rxjs';
import { StudentAuthService } from './student-auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  success(arg0: string) {
    throw new Error('Method not implemented.');
  }

  // private baseURL = "http://localhost:8080/list";
  // private baseURL1 = "http://localhost:8080/employees/create";
  // private baseURL2 = "http://localhost:8080//employees/edit/";
  // private baseURL3 = "http://localhost:8080/{id}";
  // private baseURL4 = "http://localhost:8080//employees/remove/{id}";

  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );

  constructor(private httpClient: HttpClient,private studentAuthService: StudentAuthService) { }

  getStudentList(): Observable<Student[]>{
    return this.httpClient.get<Student[]>("http://localhost:8080/students/list");
  }

  createStudent(student: Student): Observable<object>{
    return this.httpClient.post(("http://localhost:8080/students/create"), student);
  }

  UpdateStudent(id: number,student: Student): Observable<object>{
    return this.httpClient.put(`${"http://localhost:8080/students/edit"}/${id}`,student);
  }
  getStudentById(id: number): Observable<Object>{Student
    return this.httpClient.get<Student>(`${"http://localhost:8080/students"}/${id}`);
  }
  deleteStudent(id: number): Observable<Object>{
    return this.httpClient.delete(`${"http://localhost:8080/students/remove"}/${id}`);
  }  
  public login(loginData: any){
    return this.httpClient.post("http://localhost:8080/authenticate",loginData,{headers:this.requestHeader});
  }


  public forUser(){
    return this.httpClient.get("http://localhost:8080/students/list",{
    responseType: 'text',
    });
  }

  public forAdmin(){
    return this.httpClient.get("http://localhost:8080/students/list",{
    responseType: 'text',
    });
  }


  public roleMatch(allowedRoles: string | any[]): any {
    let isMatch = false;
    const userRoles: any = this.studentAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }

}
