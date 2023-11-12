import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { UserDetail } from '../models/userDetail';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';
import { OperationClaim } from '../models/operationClaim';
import { UserForUpdateDto } from '../models/userForUpdateDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://localhost:44304/api/';

  constructor(private httpClient:HttpClient) { }

  getUserById(userId:number):Observable<SingleResponseModel<User>>{
    let apiUrl = this.apiUrl + "users/getuserbyuserid?userId=" + userId
    return this.httpClient.get<SingleResponseModel<User>>(apiUrl)
  }

  getClaimsByUserId(userId:number):Observable<ListResponseModel<OperationClaim>>{
    let apiUrl = this.apiUrl + "users/getclaimsbyuserid?userId=" + userId
    return this.httpClient.get<ListResponseModel<OperationClaim>>(apiUrl)
  }

  getUserDetailsByEmail(email:string):Observable<SingleResponseModel<UserDetail>>{
    let apiUrl = this.apiUrl + "users/getuserdetailsbyemail?email=" + email
    return this.httpClient.get<SingleResponseModel<UserDetail>>(apiUrl)
  }

  update(userForUpdateDto:UserForUpdateDto):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "users/update"
    return this.httpClient.post<ResponseModel>(apiUrl , userForUpdateDto)
  }

  getAll():Observable<ListResponseModel<User>>{
    return this.httpClient.get<ListResponseModel<User>>(this.apiUrl+"users/getall");
  }

  deleteUser(user:User):Observable<ListResponseModel<User>>{
    return this.httpClient.post<ListResponseModel<User>>(this.apiUrl+"users/delete",user);
  }

  updateUser(user:User):Observable<ListResponseModel<User>>{
    return this.httpClient.post<ListResponseModel<User>>(this.apiUrl+"users/update",user);
  }

}