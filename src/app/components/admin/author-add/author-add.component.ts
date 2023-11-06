import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/services/authors/author.service';

@Component({
  selector: 'app-author-add',
  templateUrl: './author-add.component.html',
  styleUrls: ['./author-add.component.css']
})
export class AuthorAddComponent implements OnInit{

  authorAddForm:FormGroup;
  authors: Author[] = [];

  constructor(private formBuilder:FormBuilder, private authorService:AuthorService, 
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createCategoryAddForm();
  }

  createCategoryAddForm(){
    this.authorAddForm = this.formBuilder.group({
      authorFirstName:["",Validators.required],
      authorLastName:["",Validators.required]
    })
  }

  getAuthors() {
    this.authorService.getAuthors().subscribe((response)=>{
      this.authors  = response.data
    })
  }

  add(){
    if(this.authorAddForm.valid){
      let authorModel = Object.assign({},this.authorAddForm.value)
      this.authorService.add(authorModel).subscribe(response=>{
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

