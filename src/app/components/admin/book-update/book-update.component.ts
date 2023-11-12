import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { AuthorService } from 'src/app/services/authors/author.service';
import { BookService } from 'src/app/services/books/book.service';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit{

  bookUpdateForm:FormGroup;
  books: Book[] = [];
  categories: Category[] = [];
  authors: Author[] = [];
  bookId: number | undefined;
  selectedBook: Book | undefined;

  constructor(private formBuilder:FormBuilder, private bookService:BookService, 
    private toastrService:ToastrService, private categoryService:CategoryService,
    private authorService:AuthorService) { }

  ngOnInit(): void {
    this.getBooks();
    this.getCategories();
    this.getAuthors();
    this.createBookUpdateForm();
  }

  createBookUpdateForm(){
    this.bookUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      categoryId: ["",Validators.required],
      authorId: ["",Validators.required],
      bookName: ["",Validators.required],
      publishedYear: ["",Validators.required],
      summary: ["",Validators.required]
    })
  }

  getBooks() {
    this.bookService.getBooks().subscribe((response)=>{
      this.books  = response.data
    })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response)=>{
      this.categories  = response.data
    })
  }

  getAuthors() {
    this.authorService.getAuthors().subscribe((response)=>{
      this.authors  = response.data
    })
  }

  update(){
    if(this.bookUpdateForm.valid){
      let bookModel = Object.assign({}, this.bookUpdateForm.value);
      this.bookService.update(bookModel).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı");
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama hatası");
          }
        }
      });
    }
    else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }

  getById(){
    let bookModel = Object.assign({},this.bookUpdateForm.value)
    this.bookId = this.books.find(x=>x.id==bookModel.id)?.id;
    // Kitap varsa, formu doldur
    if (this.bookId) {
      this.selectedBook  = this.books.find(x => x.id == this.bookId);
      this.bookUpdateForm.patchValue({
        id: this.selectedBook?.id,
        categoryId: this.selectedBook?.categoryId,
        authorId: this.selectedBook?.authorId,
        bookName: this.selectedBook?.bookName,
        publishedYear: this.selectedBook?.publishedYear,
        summary: this.selectedBook?.summary
      });
    }
  }

  getBookName():String | undefined{
    return this.books.find(x=>x.id== this.bookId)?.bookName;
  }

  getCategoryName(){
    return this.books.find(x=>x.id== this.bookId)?.categoryName;
  }

  getAuthorName() {
    return this.books.find(x=>x.id== this.bookId)?.authorFirstName;
  }

  getLastName() {
    return this.books.find(x=>x.id== this.bookId)?.authorLastName;
  }

  getPublishedYear(){
    return this.books.find(x=>x.id== this.bookId)?.publishedYear;
  }

  getSummary(){
    return this.books.find(x=>x.id== this.bookId)?.summary;
  }

}

