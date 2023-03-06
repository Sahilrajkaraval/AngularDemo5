import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentAuthService } from '../student-auth.service';
import { StudentService } from '../student.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private studentAuthService: StudentAuthService,
    private router: Router, private studentService: StudentService){}



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.studentAuthService.getToken() !== null) {
        const role = route.data['roles'] as Array<string>;
  
        if (role) {
          const match = this.studentService.roleMatch(role);
  
          if (match) {
            return true;
          } else {
            this.router.navigate(['/forbidden']);
            return false;
          }
        }
      }
  
      this.router.navigate(['/login']);
      return false;
    }
  }

