import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { NaviComponent } from './components/navi/navi.component';
import { CategoryComponent } from './components/category/category.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthorComponent } from './components/author/author.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { FilterPipeCategoryPipe } from './pipes/filter-pipe-category.pipe';
import { FilterPipeAuthorPipe } from './pipes/filter-pipe-author.pipe';
import { FilterPipeBookPipe } from './pipes/filter-pipe-book.pipe';
import { BookAddComponent } from './components/book-add/book-add.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { AuthorAddComponent } from './components/author-add/author-add.component';
import { CategoryDeleteComponent } from './components/category-delete/category-delete.component';
import { AuthorDeleteComponent } from './components/author-delete/author-delete.component';
import { AuthorUpdateComponent } from './components/author-update/author-update.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';
import { BookDeleteComponent } from './components/book-delete/book-delete.component';
import { BookUpdateComponent } from './components/book-update/book-update.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    NaviComponent,
    CategoryComponent,
    AuthorComponent,
    BookDetailComponent,
    FilterPipeCategoryPipe,
    FilterPipeAuthorPipe,
    FilterPipeBookPipe,
    BookAddComponent,
    LoginComponent,
    RegisterComponent,
    CategoryAddComponent,
    AuthorAddComponent,
    CategoryDeleteComponent,
    AuthorDeleteComponent,
    AuthorUpdateComponent,
    CategoryUpdateComponent,
    BookDeleteComponent,
    BookUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
