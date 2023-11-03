import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit{

  categoryUpdateForm:FormGroup;
  categories: Category[] = [];
  categoryId: number | undefined;

  constructor(private formBuilder:FormBuilder, private categoryService:CategoryService, 
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCategories();
    this.createCategoryUpdateForm();
  }

  createCategoryUpdateForm(){
    this.categoryUpdateForm = this.formBuilder.group({
      categoryId:["",Validators.required],
      categoryName:["",Validators.required]
    })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response)=>{
      this.categories  = response.data
    })
  }

  update(){
    if(this.categoryUpdateForm.valid){
      let authorModel = Object.assign({},this.categoryUpdateForm.value)
      this.categoryService.update(authorModel).subscribe(response=>{
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
    let categoryModel = Object.assign({},this.categoryUpdateForm.value)
    this.categoryId = this.categories.find(x=>x.categoryId==categoryModel.categoryId)?.categoryId;
  }

  getCategoryName():String | undefined{
    return this.categories.find(x=>x.categoryId== this.categoryId)?.categoryName;
  }

}

