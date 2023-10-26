import { Component } from '@angular/core';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/services/authors/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {
  authors: Author[] = [];
  dataLoaded = false;
  public currentAuthor: Author;
  constructor(private authorService: AuthorService) {
    
  }
  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors() {
    this.authorService.getAuthors().subscribe((response)=>{
      this.authors  = response.data
      this.dataLoaded = true;
    })
  }
  

  setCurrentAuthor(author:Author){
    this.currentAuthor = author;
  }

  getCurrentAuthorClass(author:Author){
    if(author == this.currentAuthor){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
}
