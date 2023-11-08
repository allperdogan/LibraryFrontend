import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation';
import { UserDetail } from 'src/app/models/userDetail';
import { BookService } from 'src/app/services/books/book.service';
import { LocalService } from 'src/app/services/local.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit{
  userDetails: UserDetail;
  reservations : Reservation[] = []
  dataLoaded=false;
  bookNames: string[] = [];
  
  constructor(private localService:LocalService, private reservationService:ReservationService, private bookService:BookService) {  }

  ngOnInit(): void {
    this.getUserDetails();
    this.getByUserId();
  }

  getBookName(id: number): void {
    this.bookService.getBookDetail(id).subscribe((response) => {
      const bookName = response.data.bookName;
      this.bookNames[id] = bookName; // Store book name based on its ID
    });
  }
  
  getUserDetails() {
    this.userDetails = JSON.parse(this.localService.getItem("user_details") || '')
  }

  getByUserId() {
    this.reservationService.getByUserId(this.userDetails.id).subscribe((response) => {
      this.reservations = response.data;
      this.reservations.forEach((reservation) => {
        this.getBookName(reservation.bookId); // Fetch book names for each reservation
      });
      this.dataLoaded = true;
    });
  }

}
