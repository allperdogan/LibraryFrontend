import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { User } from 'src/app/models/user';
import { UserDetail } from 'src/app/models/userDetail';
import { BookService } from 'src/app/services/books/book.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit{
  book: Book;
  imagePath = "https://localhost:44304/BookImages";
  reservationForm:FormGroup
  user: User
  userDetail: UserDetail
  bookLoaded = false;
  userLoaded = false;

  constructor(private userService: UserService, private formBuilder:FormBuilder, 
    private bookService: BookService,private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService, private reservationService: ReservationService){
    
  }

  ngOnInit(): void {
    this.getUserByUserId()
    this.activatedRoute.params.subscribe((params) => {
      if (params['bookId']) {
        this.getBookDetail(params['bookId']);
      }
    });
    this.createReservationForm();
  }

  createReservationForm(){
    this.reservationForm = this.formBuilder.group({
      userId:[this.user.id],
      bookId:[this.book.id],
      reserveDate:["",Validators.required],
      returnDate:["",Validators.required]
    })
  }

  getBookDetail(id:number){
    this.bookService.getBookDetail(id).subscribe((response) => {
      this.book = response.data;
      this.bookLoaded = true;
    });
  }

  getUserByUserId() {
    this.userDetail = JSON.parse(localStorage.getItem("user_details") || '');
    this.userService.getUserById(this.userDetail.id).subscribe((response) => {
      console.log(response)
      this.user = response.data
      this.userLoaded = true;
    })
  }

  reserve(){
    if(this.reservationForm.valid){
      let reservationModel = Object.assign({},this.reservationForm.value)
      this.reservationService.reserve(reservationModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }
        }
      })
    }
    else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
  
}