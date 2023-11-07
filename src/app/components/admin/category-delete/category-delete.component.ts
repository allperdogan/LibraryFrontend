import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit{

  categoryDeleteForm:FormGroup;
  categories: Category[] = [];
  categoryId: undefined | number;

  constructor(private formBuilder:FormBuilder, private categoryService:CategoryService, 
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCategories();
    this.createCategoryDeleteForm();
  }

  createCategoryDeleteForm(){
    this.categoryDeleteForm = this.formBuilder.group({
      categoryId:["",Validators.required],
      categoryName:[" ",Validators.required],
    })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response)=>{
      this.categories  = response.data
    })
  }

  delete(){
    if(this.categoryDeleteForm.valid){
      let categoryModel = Object.assign({},this.categoryDeleteForm.value)
      this.categoryService.delete(categoryModel).subscribe(response=>{
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


