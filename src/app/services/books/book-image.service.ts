import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookImage } from 'src/app/models/bookImage';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BookImageService {
  apiUrl = 'https://localhost:44304/api/';
  constructor(private httpClient: HttpClient) { }

  addImage(bookImage:BookImage):Observable<ListResponseModel<BookImage>>{
    return this.httpClient.post<ListResponseModel<BookImage>>(this.apiUrl+"bookimages/add",bookImage);
  }
  
  uploadImage(image: File, bookId: number): Observable<ResponseModel> {
    let newPath = this.apiUrl + "api/bookimages/add"
    const sendForm = new FormData();
    sendForm.append('bookId', JSON.stringify(bookId))
    sendForm.append('bookImage', image, image.name)
    return this.httpClient.post<ResponseModel>(newPath, sendForm);
  }

  deleteImage(bookImage: BookImage): Observable<ResponseModel> {
    let newPath = this.apiUrl + "api/bookimages/delete";
    return this.httpClient.post<ResponseModel>(newPath, bookImage);
  }
}
