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
import { ReservationComponent } from './components/reservation/reservation.component';
import { MyBooksComponent } from './components/my-books/my-books.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:BookComponent},
  {path:"books",component:BookComponent},
  {path:"books/:bookId",component:BookDetailComponent},
  {path:"books/category/:categoryId",component:BookComponent},
  {path:"books/author/:authorId",component:BookComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile",component:UserProfileComponent, canActivate:[LoginGuard]},
  {
    path:"admin",component:AdminComponent, canActivate:[LoginGuard, AdminGuard], children: [
    {path:"category/add",component:CategoryAddComponent},
    {path:"author/add",component:AuthorAddComponent},
    {path:"category/delete",component:CategoryDeleteComponent},
    {path:"author/delete",component:AuthorDeleteComponent},
    {path:"author/update",component:AuthorUpdateComponent},
    {path:"category/update",component:CategoryUpdateComponent},
    {path:"book/delete",component:BookDeleteComponent},
    {path:"book/update",component:BookUpdateComponent},
    {path:"book/add",component:BookAddComponent},
    ]
  },
  {path:"reservation",component:ReservationComponent, canActivate:[LoginGuard]},
  {path:"mybooks",component:MyBooksComponent, canActivate:[LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
