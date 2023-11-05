import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/books/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit{
  book: Book;
  imagePath = "https://localhost:44304/BookImages";
  
  constructor(private bookService: BookService,private activatedRoute:ActivatedRoute){
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['bookId']) {
        this.getBookDetail(params['bookId']);
      }
    });
  }

  getBookDetail(id:number){
    this.bookService.getBookDetail(id).subscribe((response) => {
      this.book = response.data;
    });
  }  
}
