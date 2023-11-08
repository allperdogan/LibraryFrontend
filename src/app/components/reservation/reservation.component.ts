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
    this.book = history.state.data;
    this.getBookDetailsById(this.book.id);
    this.getUserByUserId();
    this.createReservationForm();
  }

  createReservationForm(){
    this.reservationForm = this.formBuilder.group({
      userId:[null , Validators.required],
      bookId:[null ,Validators.required],
      reserveDate:["",Validators.required],
      returnDate:["",Validators.required]
    })
  }

  getUserByUserId() {
    this.userDetail = JSON.parse(localStorage.getItem("user_details") || '');
    this.userService.getUserById(this.userDetail.id).subscribe((response) => {
      console.log(response)
      this.user = response.data
      this.userLoaded = true;
      this.setFormValues();
    })
  }

  getBookDetailsById(bookId: number) {
    this.bookService.getBookDetail(bookId).subscribe((response) => {
      this.book = response.data;
      this.bookLoaded = true;
      this.setFormValues();
    });
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

  setFormValues() {
    if (this.userLoaded && this.bookLoaded) {
      this.reservationForm.patchValue({
        userId: this.user.id,
        bookId: this.book.id,
      });
    }
  }
  
}