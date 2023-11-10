import { Component } from '@angular/core';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {

  reservations: Reservation[] = [];
  filterText = "";

  constructor(private reservationService: ReservationService) {
    
  }
  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(){
    this.reservationService.getAll().subscribe(response=>{
      this.reservations = response.data;

    })
  }

}
