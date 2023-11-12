import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'filterPipeUser'
})
export class FilterPipeUserPipe implements PipeTransform {

  transform(value: User[], filterText: string): User[] {
    filterText = filterText? filterText.toLocaleLowerCase():""
    return filterText?value.filter((p:User)=>p.email.toString().toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
