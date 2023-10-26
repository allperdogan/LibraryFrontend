import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  apiUrl = 'https://localhost:44304/api/';

  constructor(private httpClient: HttpClient) {}

  getBooks():Observable<ListResponseModel<Book>> {
    let newPath = this.apiUrl + "books/getbookdetails"
    return this.httpClient.get<ListResponseModel<Book>>(newPath);
  }
  getBooksByCategory(id:number):Observable<ListResponseModel<Book>> {
    let newPath = this.apiUrl + "books/getbycategory?categoryId="+id;
    return this.httpClient.get<ListResponseModel<Book>>(newPath);
  }

  getBooksByAuthor(id:number):Observable<ListResponseModel<Book>> {
    let newPath = this.apiUrl + "books/getbyauthor?authorId="+id;
    return this.httpClient.get<ListResponseModel<Book>>(newPath);
  }
}
