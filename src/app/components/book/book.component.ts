import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  currentBook:Book;
  filterText="";
  constructor(private bookService: BookService,private activatedRoute:ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getBooksByCategory(params["categoryId"])
      }
      else if(params["authorId"]){
        this.getBooksByAuthor(params["authorId"])
      }
      else{
        this.getBooks();
      }
    })
  }

  getBooks() {
    this.bookService.getBooks().subscribe((response)=>{
      this.books  = response.data
      this.dataLoaded = true;
    })
  }

  getBooksByCategory(categoryId:number) {
    this.bookService.getBooksByCategory(categoryId).subscribe((response) => {
      this.books = response.data;
      this.dataLoaded = true;
    });
  }

  getBooksByAuthor(authorId:number) {
    this.bookService.getBooksByAuthor(authorId).subscribe((response) => {
      this.books = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentBook(book:Book){
    this.currentBook=book;
  }

  
}
