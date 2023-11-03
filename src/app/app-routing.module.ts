import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { AuthorAddComponent } from './components/author-add/author-add.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:BookComponent},
  {path:"books",component:BookComponent},
  {path:"books/:bookId",component:BookDetailComponent},
  {path:"books/category/:categoryId",component:BookComponent},
  {path:"books/author/:authorId",component:BookComponent},
  {path:"book/add",component:BookAddComponent, canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"category/add",component:CategoryAddComponent},
  {path:"author/add",component:AuthorAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
