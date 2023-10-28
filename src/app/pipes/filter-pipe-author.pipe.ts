import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../models/author';

@Pipe({
  name: 'filterPipeAuthor'
})
export class FilterPipeAuthorPipe implements PipeTransform {

  transform(value: Author[], filterText: string): Author[] {
    filterText = filterText? filterText.toLocaleLowerCase():""
    return filterText?value.filter((p:Author)=>((p.authorFirstName)+(p.authorLastName)).toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
