import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from 'src/app/models/author';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  apiUrl = "https://localhost:44304/api/";
  constructor(private httpClient: HttpClient) { }

  getAuthors():Observable<ListResponseModel<Author>> {
    return this.httpClient.get<ListResponseModel<Author>>(this.apiUrl+"authors/getall");
  }

  add(author:Author):Observable<ListResponseModel<Author>>{
    return this.httpClient.post<ListResponseModel<Author>>(this.apiUrl+"authors/add",author);
  }
}
