import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentAuthService } from '../student-auth.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private studentService: StudentService, 
    private studentAuthService: StudentAuthService,
    private router: Router
    ){ }

  ngOnInit(): void {
  }
  login(loginForm:NgForm) {
  this.studentService.login(loginForm.value).subscribe(
    (response:any) => {
      console.log(response.jwtToken);
      console.log(response.user.role);

      this.studentAuthService.setRoles(response.user.role);
      this.studentAuthService.setToken(response.jwtToken);

      const role = response.user.role[0].roleName;
      if(role === 'Admin'){

        this.router.navigate(['/students']);
      }else{
        this.router.navigate(['/user']);
      }
    },
    (error) => {
      console.log(error);
    }
    )
}

}
