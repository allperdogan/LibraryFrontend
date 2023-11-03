import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit{

  categoryAddForm:FormGroup;
  categories: Category[] = [];
  categoryId: undefined | number;

  constructor(private formBuilder:FormBuilder, private categoryService:CategoryService, 
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCategories();
    this.createCategoryAddForm();
  }

  createCategoryAddForm(){
    this.categoryAddForm = this.formBuilder.group({
      categoryName:["",Validators.required],
    })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((response)=>{
      this.categories  = response.data
    })
  }

  add(){
    if(this.categoryAddForm.valid){
      let categoryModel = Object.assign({},this.categoryAddForm.value)
      this.categoryService.add(categoryModel).subscribe(response=>{
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


  getCategoryId(){
    let categoryModel = Object.assign({},this.categoryAddForm.value)
    this.categoryId = this.categories.find(x=>x.categoryName==categoryModel.categoryName)?.categoryId;
    console.log(this.categoryId)
  }
}

