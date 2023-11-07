import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/models/author';
import { Category } from 'src/app/models/category';
import { AuthorService } from 'src/app/services/authors/author.service';
import { BookImageService } from 'src/app/services/books/book-image.service';
import { BookService } from 'src/app/services/books/book.service';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit{

  categories: Category[]=[]
  authors: Author[]=[]
  bookAddForm:FormGroup
  bookImageAddForm:FormGroup
  
  constructor(private formBuilder:FormBuilder, private bookService:BookService, private categoryService:CategoryService,
    private authorService:AuthorService ,private toastrService:ToastrService, private bookImageService:BookImageService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getAuthors();
    this.createBookAddForm();
    this.createBookImageAddForm();
  }

  createBookAddForm(){
    this.bookAddForm = this.formBuilder.group({
      bookName:["",Validators.required],
      authorId:["",Validators.required],
      categoryId:["",Validators.required],
      summary:["",Validators.required],
      publishedYear:["",Validators.required]
    })
  }
  createBookImageAddForm(){
    this.bookImageAddForm = this.formBuilder.group({
      bookId:["",Validators.required],
      imagePath:["jpg",Validators.required],
      file:["",Validators.required]
    })
  }

  add(){
    if(this.bookAddForm.valid){
      let bookModel = Object.assign({},this.bookAddForm.value)
      this.bookService.add(bookModel).subscribe(response=>{
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

  addImage(){
    if(this.bookImageAddForm.valid){
      let bookModel = Object.assign({},this.bookImageAddForm.value)
      this.bookImageService.addImage(bookModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        console.log(response)
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError; i++) {
            this.toastrService.error(responseError,"Doğrulama hatası")
            console.log(responseError)
          }
        }
        
      })
    }
    else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((response)=>{
      this.categories  = response.data
    })
  }
  getAuthors(){
    this.authorService.getAuthors().subscribe((response)=>{
      this.authors  = response.data
    })
  }
}
