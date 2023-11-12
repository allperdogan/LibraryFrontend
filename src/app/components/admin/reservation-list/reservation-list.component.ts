import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Reservation } from 'src/app/models/reservation';
import { BookService } from 'src/app/services/books/book.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ReservationUpdateComponent } from '../reservation-update/reservation-update.component';


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {

  reservations: Reservation[] = [];
  filterText = "";
  users: string[] = [];
  books: string[] = [];

  constructor(private reservationService: ReservationService, private userService:UserService, 
    private bookService:BookService, private toastrService:ToastrService, private dialog: MatDialog) {
    
  }
  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(){
    this.reservationService.getAll().subscribe(response=>{
      this.reservations = response.data;
      this.reservations.forEach((reservation) => {
        this.getUserMail(reservation.userId);
        this.getBookName(reservation.bookId)
      });
    })
  }
  getUserMail(id: number): void {
    this.userService.getUserById(id).subscribe((response) => {
      const userMail = response.data.email;
      this.users[id] = userMail; // Store book name based on its ID
    });
  }
  getBookName(id: number): void {
    this.bookService.getBookDetail(id).subscribe((response) => {
      const bookName = response.data.bookName;
      this.books[id] = bookName; // Store book name based on its ID
    });
  }

  deleteReservation(reservation: Reservation): void {
    this.reservationService.deleteReservation(reservation).subscribe(response=>{
      console.log(`Rezervasyon ID ${reservation.id} silindi.`);
      this.toastrService.success("Silindi")
      window.location.reload()
    });
  }

  openUpdateDialog(reservation: Reservation): void {
    const dialogRef = this.dialog.open(ReservationUpdateComponent, {
      width: '400px', // Modalin genişliği
      data: { reservation } // Güncelleme bileşenine veriyi aktarır
    });

    dialogRef.afterClosed().subscribe(result => {
      // Modaldan dönen sonuçları işleyebilirsiniz (örneğin, başarı mesajı göstermek gibi)
      console.log('Modal kapatıldı.', result);
    });
  }
}
