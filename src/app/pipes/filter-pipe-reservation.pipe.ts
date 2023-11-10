import { Pipe, PipeTransform } from '@angular/core';
import { Reservation } from '../models/reservation';

@Pipe({
  name: 'filterPipeReservation'
})
export class FilterPipeReservationPipe implements PipeTransform {

  transform(value: Reservation[], filterText: string): Reservation[] {
    filterText = filterText? filterText.toLocaleLowerCase():""
    return filterText?value.filter((p:Reservation)=>p.userId.toString().toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
