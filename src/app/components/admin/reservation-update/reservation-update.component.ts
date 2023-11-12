import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservation-update',
  templateUrl: './reservation-update.component.html',
  styleUrls: ['./reservation-update.component.css']
})
export class ReservationUpdateComponent {
  updateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ReservationUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reservation: Reservation },
    private formBuilder: FormBuilder, private reservationService:ReservationService,
    private toastrService:ToastrService
  ) {
    this.updateForm = this.formBuilder.group({
      reserveDate: [data.reservation.reserveDate, Validators.required],
      returnDate: [data.reservation.returnDate, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateReservation(): void {
    if (this.updateForm.valid) {
      const updatedReservation: Reservation = {
        id: this.data.reservation.id,
        userId: this.data.reservation.userId,
        bookId: this.data.reservation.bookId,
        ...this.updateForm.value
      };

      this.reservationService.updateReservation(updatedReservation).subscribe(response=>{
        this.toastrService.success("Başarılı")
      });

      this.dialogRef.close(updatedReservation); 
    }
  }
}
