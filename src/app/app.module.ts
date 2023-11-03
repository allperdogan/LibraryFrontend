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
    AuthorAddComponent
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
