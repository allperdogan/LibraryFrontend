import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Reservation } from '../models/reservation';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  apiUrl = 'https://localhost:44304/api/';

  constructor(private httpClient:HttpClient) { }

  reserve(reservation:Reservation):Observable<ListResponseModel<Reservation>>{
    return this.httpClient.post<ListResponseModel<Reservation>>(this.apiUrl+"reservations/add",reservation);
  }

  getByUserId(id:number):Observable<ListResponseModel<Reservation>>{
    return this.httpClient.get<ListResponseModel<Reservation>>(this.apiUrl+"reservations/getbyuserid?id="+id);
  }
  
}