import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book';

@Pipe({
  name: 'filterPipeBook'
})
export class FilterPipeBookPipe implements PipeTransform {

  transform(value: Book[], filterText: string): Book[] {
    filterText = filterText? filterText.toLocaleLowerCase():""
    return filterText?value.filter((p:Book)=>(p.bookName).toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
