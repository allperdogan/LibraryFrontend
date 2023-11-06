import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/services/authors/author.service';

@Component({
  selector: 'app-author-update',
  templateUrl: './author-update.component.html',
  styleUrls: ['./author-update.component.css']
})
export class AuthorUpdateComponent implements OnInit{

  authorUpdateForm:FormGroup;
  authors: Author[] = [];
  authorId: number | undefined;

  constructor(private formBuilder:FormBuilder, private authorService:AuthorService, 
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAuthors();
    this.createAuthorUpdateForm();
  }

  createAuthorUpdateForm(){
    this.authorUpdateForm = this.formBuilder.group({
      authorId:["",Validators.required],
      authorFirstName:["",Validators.required],
      authorLastName:["",Validators.required]
    })
  }

  getAuthors() {
    this.authorService.getAuthors().subscribe((response)=>{
      this.authors  = response.data
    })
  }

  update(){
    if(this.authorUpdateForm.valid){
      let authorModel = Object.assign({},this.authorUpdateForm.value)
      this.authorService.update(authorModel).subscribe(response=>{
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

  getById(){
    let authorModel = Object.assign({},this.authorUpdateForm.value)
    this.authorId = this.authors.find(x=>x.authorId==authorModel.authorId)?.authorId;
  }

  getFirstName():String | undefined{
    return this.authors.find(x=>x.authorId== this.authorId)?.authorFirstName;
  }
  getLastName():String | undefined{
    return this.authors.find(x=>x.authorId== this.authorId)?.authorLastName;
  }

}

