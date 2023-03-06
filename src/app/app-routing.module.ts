import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'students', component: StudentListComponent},
  {path: 'update-student/:id',component: UpdateStudentComponent},
  {path: 'create-student', component: CreateStudentComponent},
  {path: 'user',component: UserComponent, canActivate:[AuthGuard], data:{roles:['User', 'Admin']}},
  {path: 'forbidden',component: ForbiddenComponent},
  {path: 'login', component: LoginComponent},
  {path:'', redirectTo: 'login', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
