import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { ListResponseModel } from 'src/app/models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl = "https://localhost:44304/api/";
  constructor(private httpClient: HttpClient) { }

  getCategories():Observable<ListResponseModel<Category>> {
    return this.httpClient.get<ListResponseModel<Category>>(this.apiUrl+"Categories/getall");
  }

  add(category:Category):Observable<ListResponseModel<Category>>{
    return this.httpClient.post<ListResponseModel<Category>>(this.apiUrl+"categories/add",category);
  }

  delete(category:Category):Observable<ListResponseModel<Category>>{
    return this.httpClient.post<ListResponseModel<Category>>(this.apiUrl+"categories/delete",category);
  }

  update(category:Category):Observable<ListResponseModel<Category>>{
    return this.httpClient.post<ListResponseModel<Category>>(this.apiUrl+"categories/update",category);
  }
}
