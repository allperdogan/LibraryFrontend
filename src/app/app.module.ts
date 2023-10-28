import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { NaviComponent } from './components/navi/navi.component';
import { CategoryComponent } from './components/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthorComponent } from './components/author/author.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { FilterPipeCategoryPipe } from './pipes/filter-pipe-category.pipe';
import { FilterPipeAuthorPipe } from './pipes/filter-pipe-author.pipe';
import { FilterPipeBookPipe } from './pipes/filter-pipe-book.pipe';

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
    FilterPipeBookPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
