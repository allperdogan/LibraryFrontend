import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookAddComponent } from './components/admin/book-add/book-add.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';
import { CategoryAddComponent } from './components/admin/category-add/category-add.component';
import { AuthorAddComponent } from './components/admin/author-add/author-add.component';
import { CategoryDeleteComponent } from './components/admin/category-delete/category-delete.component';
import { AuthorDeleteComponent } from './components/admin/author-delete/author-delete.component';
import { AuthorUpdateComponent } from './components/admin/author-update/author-update.component';
import { CategoryUpdateComponent } from './components/admin/category-update/category-update.component';
import { BookDeleteComponent } from './components/admin/book-delete/book-delete.component';
import { BookUpdateComponent } from './components/admin/book-update/book-update.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:BookComponent},
  {path:"books",component:BookComponent},
  {path:"books/:bookId",component:BookDetailComponent},
  {path:"books/category/:categoryId",component:BookComponent},
  {path:"books/author/:authorId",component:BookComponent},
  {path:"admin/book/add",component:BookAddComponent, canActivate:[LoginGuard, AdminGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"admin/category/add",component:CategoryAddComponent, canActivate:[LoginGuard, AdminGuard]},
  {path:"admin/author/add",component:AuthorAddComponent, canActivate:[LoginGuard, AdminGuard]},
  {path:"admin/category/delete",component:CategoryDeleteComponent, canActivate:[LoginGuard, AdminGuard]},
  {path:"admin/author/delete",component:AuthorDeleteComponent, canActivate:[LoginGuard, AdminGuard]},
  {path:"admin/author/update",component:AuthorUpdateComponent, canActivate:[LoginGuard, AdminGuard]},
  {path:"admin/category/update",component:CategoryUpdateComponent, canActivate:[LoginGuard, AdminGuard]},
  {path:"admin/book/delete",component:BookDeleteComponent, canActivate:[LoginGuard, AdminGuard]},
  {path:"admin/book/update",component:BookUpdateComponent, canActivate:[LoginGuard, AdminGuard]},
  {path:"profile",component:UserProfileComponent, canActivate:[LoginGuard]},
  {path:"admin",component:AdminComponent, canActivate:[LoginGuard, AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
