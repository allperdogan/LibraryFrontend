import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/services/authors/author.service';

@Component({
  selector: 'app-author-delete',
  templateUrl: './author-delete.component.html',
  styleUrls: ['./author-delete.component.css']
})
export class AuthorDeleteComponent implements OnInit{

  authorDeleteForm:FormGroup;
  authors: Author[] = [];

  constructor(private formBuilder:FormBuilder, private authorService:AuthorService, 
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAuthors();
    this.createAuthorDeleteForm();
  }

  createAuthorDeleteForm(){
    this.authorDeleteForm = this.formBuilder.group({
      authorId:["",Validators.required],
      authorFirstName:[" ",Validators.required],
      authorLastName:[" ",Validators.required]
    })
  }

  getAuthors() {
    this.authorService.getAuthors().subscribe((response)=>{
      this.authors  = response.data
    })
  }

  delete(){
    if(this.authorDeleteForm.valid){
      let authorModel = Object.assign({},this.authorDeleteForm.value)
      this.authorService.delete(authorModel).subscribe(response=>{
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



