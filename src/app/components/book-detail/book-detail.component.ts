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
  availability = true;
  returnDate: Date;

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
      console.log(this.book)
      this.getAvailable(this.book.id);
    });
  }  

  getAvailable(id:number){
    this.bookService.getAvailable(id).subscribe((response) =>{
      if(response.data.length>0){
        this.availability = false;
        this.returnDate = response.data[0].returnDate;
      }
    }
    );
  }
}
