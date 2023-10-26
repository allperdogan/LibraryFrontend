import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:BookComponent},
  {path:"books",component:BookComponent},
  {path:"books/:id",component:BookComponent},
  {path:"books/category/:categoryId",component:BookComponent},
  {path:"books/author/:authorId",component:BookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
