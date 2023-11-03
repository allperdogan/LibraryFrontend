import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/books/book.service';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit{

  bookDeleteForm:FormGroup;
  books: Book[] = [];
  bookId: undefined | number;

  constructor(private formBuilder:FormBuilder, private bookService:BookService, 
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBooks();
    this.createBookDeleteForm();
  }

  createBookDeleteForm(){
    this.bookDeleteForm = this.formBuilder.group({
      id:["",Validators.required],
      bookName:[" ",Validators.required],
      summary:[" ",Validators.required]
    })
  }

  getBooks() {
    this.bookService.getBooks().subscribe((response)=>{
      this.books  = response.data
    })
  }

  delete(){
    if(this.bookDeleteForm.valid){
      let bookModel = Object.assign({},this.bookDeleteForm.value)
      this.bookService.delete(bookModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }
        }
      })
    }
    else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }


}

