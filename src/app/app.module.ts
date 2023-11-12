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
import { BookAddComponent } from './components/admin/book-add/book-add.component';
import { MatDialogModule } from '@angular/material/dialog';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
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
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ListboxModule  } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ReservationComponent } from './components/reservation/reservation.component';
import { MyBooksComponent } from './components/my-books/my-books.component';
import { ReservationListComponent } from './components/admin/reservation-list/reservation-list.component';
import { FilterPipeReservationPipe } from './pipes/filter-pipe-reservation.pipe';
import { ReservationUpdateComponent } from './components/admin/reservation-update/reservation-update.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { FilterPipeUserPipe } from './pipes/filter-pipe-user.pipe';
import { UserUpdateComponent } from './components/admin/user-update/user-update.component';

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
    BookUpdateComponent,
    UserProfileComponent,
    AdminComponent,
    ReservationComponent,
    MyBooksComponent,
    ReservationListComponent,
    FilterPipeReservationPipe,
    ReservationUpdateComponent,
    UserListComponent,
    FilterPipeUserPipe,
    UserUpdateComponent
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
    }),
    PanelMenuModule,
    PanelModule,
    TableModule,
    ProgressSpinnerModule,
    AutoCompleteModule,
    ListboxModule,
    CalendarModule,
    CardModule,
    DropdownModule,
    MatDialogModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
