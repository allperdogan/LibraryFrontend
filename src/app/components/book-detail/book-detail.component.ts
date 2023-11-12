import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  returnDate: Date | string;
  defaultImagePath = 'assets/images/default-book-cover.jpg';

  constructor(private bookService: BookService,private activatedRoute:ActivatedRoute, private router:Router){
    
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
      if (!this.book.imagePath) {
        this.book.imagePath = this.defaultImagePath;
      }
      console.log(this.book)
      this.getAvailable(this.book.id);
    });
  }  

  getAvailable(id:number){
    this.bookService.getAvailable(id).subscribe((response) =>{
      if (response.data!=null) {
        if(response.data.length>0){
          this.availability = false;
          this.returnDate = response.data[0].returnDate;
          if (this.returnDate) {
            const dateWithoutTime = new Date(this.returnDate);
            const formattedDate = dateWithoutTime.toISOString().split('T')[0];
            this.returnDate = formattedDate;
          }
        }
      }
      
    }
    );
  }

  toReservationPage(){
    this.router.navigate(["/reservation"],{state:{data:this.book}})
  }

  getButton(){
    if(this.availability){
      return "btn btn-success"
    }
    else{
      return "btn btn-warning"
    }
  }
}
