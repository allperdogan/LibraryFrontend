import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BookResponseModel } from '../../models/bookResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  apiUrl = "https://localhost:44304/api/Books/getbookdetails";
  constructor(private httpClient: HttpClient) { }

  getBooks():Observable<BookResponseModel> {
    return this.httpClient.get<BookResponseModel>(this.apiUrl);
  }
}
