import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/books/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  dataLoaded = false;
  constructor(private bookService: BookService) {
    
  }
  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe((response)=>{
      this.books  = response.data
      this.dataLoaded = true;
    })
  }
  
}
