import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

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

  getBookDetail(id:number):Observable<SingleResponseModel<Book>>{
    let newPath = this.apiUrl + "books/getbyid?bookId="+id; 
    return this.httpClient.get<SingleResponseModel<Book>>(newPath);
  }

  add(book:Book):Observable<ListResponseModel<Book>>{
    return this.httpClient.post<ListResponseModel<Book>>(this.apiUrl+"books/add",book);
  }

  delete(book:Book):Observable<ListResponseModel<Book>>{
    return this.httpClient.post<ListResponseModel<Book>>(this.apiUrl+"books/delete",book);
  }

  update(book:Book):Observable<ListResponseModel<Book>>{
    return this.httpClient.post<ListResponseModel<Book>>(this.apiUrl+"books/update",book);
  }

}
